// app.js

require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');

// JSON 파싱 미들웨어 추가 (Body 데이터를 읽기 위해 필수)
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

// ------------------------------------------------------------------
// 상품 라우터 파일 불러오기
// 이 경로는 app.js 파일 기준으로 'routes/goods.js' 파일의 위치를 지정
const goodsRouter = require('./routes/goods'); 
// ------------------------------------------------------------------


const port = process.env.PORT || 8080; // 기존 포트 8080 유지

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 1. 메인 화면
app.get('/', (req, res) => {
  res.render('index');
});

// ----------------------------------------------------
// 라우터 연결: /api/goods 경로로 들어오는 모든 요청을 goodsRouter로 전달
// 이제 '/all'이나 '/:id'는 goodsRouter.js에서 처리
app.use('/api/goods', goodsRouter); 
// ----------------------------------------------------


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});