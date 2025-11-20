const express = require('express'); 
const app = express();
const path = require('path');

const port = process.env.PORT || 8080;

// body 파서
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 정적 파일 (필요하면 public 폴더 사용)
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ==============================
//   history 배열 (메모리 저장)
// ==============================
let history = [
  {
    id: 1,
    keyword: 'apple',
    created_at: new Date().toISOString()
  }
];

let nextId = 2;

// 메인 페이지
app.get('/', (req, res) => {
  res.render('index');  // 너가 준 index.ejs
});

// ==============================
//   /api/search  라우트들
// ==============================

// 검색 + 히스토리 조회
app.post('/api/search', (req, res) => {
  const { keyword } = req.body || {};

  // 1) keyword가 비어있으면: 히스토리만 보내기 (초기 로딩용)
  if (!keyword || !keyword.trim()) {
    return res.json({
      history   // [{id, keyword, created_at}, ...]
    });
  }

  // 2) 실제 검색어가 들어온 경우
  const trimmed = keyword.trim();

  // 실제 검색 로직 대신 예시 텍스트
  const resultText = `『${trimmed}』 에 대한 검색 결과 예시입니다.`;

  const newItem = {
    id: nextId++,
    keyword: trimmed,
    created_at: new Date().toISOString()
  };

  // 최근 검색이 위로 오게 하고 싶으면 unshift, 아니면 push
  history.unshift(newItem);

  return res.json({
    result: resultText,
    history
  });
});

// 검색 기록 삭제
app.delete('/api/search', (req, res) => {
  const { id } = req.body || {};

  const numericId = Number(id);
  if (!numericId) {
    return res.status(400).json({ error: '유효한 id가 필요합니다.' });
  }

  history = history.filter(item => item.id !== numericId);

  return res.json({
    history
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});