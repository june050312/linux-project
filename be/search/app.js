const express = require('express'); 
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const loginVerify = require('../middleware/loginVerify')
const promClient = require('prom-client')

promClient.collectDefaultMetrics()

// ==============================
//   supabase
// ==============================
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'OK' : 'MISSING');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'OK' : 'MISSING');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const port = process.env.PORT || 8080;

app.use(cors({
  origin: process.env.FE_URL,
  credentials: true,
}));

// body 파서
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// 정적 파일
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 메인 페이지
app.get('/', (req, res) => {
  res.render('index');  // index.ejs
});

// ==============================
//   /api/search  라우트들
// ==============================

app.get('/api/search', loginVerify, async (req, res) => {
  const { data, error } = await supabase
    .from('search_history')
    .select('*')
    .eq('user_id', req.user.id)
    .order('id', { ascending: false });
  return res.json({ history: data });
});

// 검색 + 히스토리 조회
app.post('/api/search', loginVerify, async (req, res) => {
  const { keyword } = req.body || {};
  console.log('[/api/search:POST] body.keyword =', keyword);

  // 1) keyword 비어있으면: 전체 히스토리만 반환
  if (!keyword || !keyword.trim()) {
    console.log('[/api/search:POST] 히스토리 전체 조회 요청');

    const { data, error } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', req.user.id)
      .order('id', { ascending: false });

    if (error) {
      console.error('[/api/search:POST] 히스토리 조회 에러:', error);
      return res.status(500).json({ error: '히스토리 조회 실패' });
    }

    return res.json({ history: data });
  }

  // 2) 실제 검색어가 들어온 경우
  const trimmed = keyword.trim();

  
  const resultText = `『${trimmed}』 에 대한 검색 결과 예시입니다.`;
  console.log('[/api/search:POST] 검색어 insert 시도:', trimmed);

  // user_id는 bigint이므로 숫자로
  const { error: insertError } = await supabase
    .from('search_history')
    .insert({
      user_id: req.user.id,        // 임시 고정 유저
      keyword: trimmed
    });

  if (insertError) {
    console.error('[/api/search:POST] INSERT 에러:', insertError);
    return res.status(500).json({ error: '기록 저장 실패' });
  }

  console.log('[/api/search:POST] INSERT 성공:', trimmed);

  const { data: historyData, error: historyError } = await supabase
    .from('search_history')
    .select('*')
    .eq('user_id', req.user.id)
    .order('id', { ascending: false });

  if (historyError) {
    console.error('[/api/search:POST] 히스토리 재조회 에러:', historyError);
    return res.status(500).json({ error: '히스토리 조회 실패' });
  }

  return res.json({
    result: resultText,
    history: historyData
  });
});

// 검색 기록 삭제
app.delete('/api/search', loginVerify, async (req, res) => {
  const { id } = req.body || {};
  console.log('[/api/search:DELETE] body.id =', id);

  // 프론트에서 넘어오는 id는 문자열이므로 숫자로 변환
  const numericId = parseInt(id, 10);

  
  if (!numericId) {
    console.log('[/api/search:DELETE] 잘못된 id 값:', id);
    return res.status(400).json({ error: '유효한 id가 필요합니다.' });
  }

  // Supabase에서 삭제
  const { error: deleteError } = await supabase
    .from('search_history')
    .delete()
    .eq('id', numericId);

  if (deleteError) {
    console.error('[/api/search:DELETE] 삭제 에러:', deleteError);
    return res.status(500).json({ error: '삭제 실패' });
  }

  console.log('[/api/search:DELETE] 삭제 성공, id =', numericId);

  // 삭제 후 전체 히스토리 다시 조회
  const { data: historyData, error: historyError } = await supabase
    .from('search_history')
    .select('*')
    .eq('user_id', req.user.id)
    .order('id', { ascending: false });

  if (historyError) {
    console.error('[/api/search:DELETE] 히스토리 재조회 에러:', historyError);
    return res.status(500).json({ error: '히스토리 조회 실패' });
  }

  return res.json({ history: historyData });
});

app.get('/api/search/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType)
    res.end(await promClient.register.metrics())
  } catch (error) {
    res.status(500).send('Error fetching metrics')
  }
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});