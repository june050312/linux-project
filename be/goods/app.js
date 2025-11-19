const express = require('express');
const app = express();
const path = require('path');

// dumy.js 데이터를 가져옴
const goodsData = require('./dumy'); 

const port = process.env.PORT || 8080;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 1. 메인 화면
app.get('/', (req, res) => {
  res.render('index');
});

// 2. 전체 상품 리스트 API (노션 명세: /api/goods/all)
app.get('/api/goods/all', (req, res) => {
  // 상태코드 200(성공)과 함께 goodsData(더미데이터)를 JSON 형식으로 응답
  res.status(200).json(goodsData);
});

// 3. 상품 상세 정보 API (노션 명세: /api/goods/{id})
app.get('/api/goods/:id', (req, res) => {
  // URL에 있는 :id 값을 가져옴! (예: /api/goods/1 -> id는 1)
  const id = parseInt(req.params.id);
  
  // goodsData 배열에서 id가 일치하는 상품을 찾아냄
  const item = goodsData.find(g => g.id === id);

  if (item) {
    // 찾았으면 성공(200)과 함께 데이터를 주게 됨
    res.status(200).json(item);
  } else {
    // 없으면 에러(404)를 보냄
    res.status(404).json({ message: "상품을 찾을 수 없습니다." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});