// routes/goods.js

const express = require('express');
const router = express.Router();
const supabase = require('../db/supabaseClient'); // 1단계에서 만든 Supabase 클라이언트 불러오기

// ----------------------------------------------------------------------
// 💡 2. 전체 상품 리스트 API (노션 명세: /all)
// app.js에서 이미 /api/goods로 연결했으므로, 여기는 '/all'만 정의
router.get('/all', async (req, res) => {
    try {
        // 'goods' 테이블에서 모든 데이터를 조회
        const { data: goods, error } = await supabase
            .from('goods') 
            .select('*');

        if (error) {
            console.error('Supabase 쿼리 오류:', error);
            return res.status(500).json({ 
                message: 'DB에서 상품 정보를 불러오는 데 실패했습니다.', 
                error: error.message 
            });
        }

        // 성공 응답: HTTP 200 OK와 함께 데이터 전송
        res.status(200).json(goods);

    } catch (err) {
        console.error('서버 내부 오류:', err);
        res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
    }
});

// 상품 상세 정보 API (노션 명세: /:id)
router.get('/:id', async (req, res) => {
    // URL에서 :id 값을 가져옴 (문자열로 들어오므로 숫자로 변환)
    const id = parseInt(req.params.id); 

    try {
        // 'goods' 테이블에서 id가 일치하는 단 하나의 항목을 조회
        const { data: item, error } = await supabase
            .from('goods')
            .select('*')
            .eq('id', id) // DB의 id 컬럼이 요청 id와 같은지 확인
            .single();    // 단 하나의 결과만 예상할 때 사용

        if (error && error.code !== 'PGRST116') { // PGRST116은 데이터가 없을 때 발생하는 코드
            console.error('Supabase 쿼리 오류:', error);
            return res.status(500).json({ message: 'DB 조회 중 오류가 발생했습니다.' });
        }
        
        if (!item) {
            // 상품을 찾을 수 없을 때 (404)
            return res.status(404).json({ message: "상품을 찾을 수 없습니다." });
        }

        // 성공 응답
        res.status(200).json(item);

    } catch (err) {
        console.error('서버 내부 오류:', err);
        res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
    }
});

module.exports = router; // app.js에서 사용할 수 있도록 router 객체를 내보냄