const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogs');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');

const app = express();
const port = 3000;

// 中間件
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// 提供靜態文件
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// 錯誤處理
app.use(errorHandler);

connectDB();

// 啟動服務器
app.listen(port, () => {
    console.log(`服務器運行在 http://localhost:${port}`);
});