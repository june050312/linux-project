// routes/goods.js
const express = require('express');
const router = express.Router();
const supabase = require('../db/supabaseClient'); 

// 전체 상품 리스트 API
router.get('/all', async (req, res) => {
    try {
        const { data: goods, error } = await supabase.from('goods').select('*');
        if (error) {
            console.error('Supabase 쿼리 오류:', error);
            return res.status(500).json({ message: 'DB 오류', error: error.message });
        }
        res.status(200).json(goods);
    } catch (err) {
        console.error('서버 에러:', err);
        res.status(500).json({ message: '서버 에러' });
    }
});

// 상품 상세 정보 API
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id); 
    try {
        const { data: item, error } = await supabase
            .from('goods')
            .select('*')
            .eq('id', id)
            .single();

        if (error || !item) {
            return res.status(404).json({ message: "상품 없음" });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: '서버 에러' });
    }
});

module.exports = router;