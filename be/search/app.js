const express = require('express');
const app = express()
const path = require('path');

const port = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

// 다음 형식을 맞추어서 저장해야합니다.
history = [
  {
    id: 1,
    keyword: 'apple',
    created_at: new Date().toISOString()
  }
];

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})