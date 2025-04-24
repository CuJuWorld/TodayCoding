# blog-api
使用 Node.js、MongoDB Compass、Express。
來嘗試開發一個有用戶登錄功能的博客系統。

## 網頁功能
```bash
- 用戶註冊
- 用戶登入
- 用戶登出
- 用戶檢視單一博客
- 用戶檢視全部博客
- 用戶新增博客
- 用戶修改博客
- 用戶刪除博客
```

## API 連接
```bash
# routes/auth.js
POST    /api/auth/register
POST    /api/auth/login
GET     /api/auth/me

# routes/blogs.js
POST    /api/blogs/
GET     /api/blogs/
GET     /api/blogs/:id
PUT     /api/blogs/:id
DELETE  /api/blogs/:id
```

## MongoDB Compass 安裝指南 (參考以下 youtube 影片)
[MongoDB Installation Made SUPER Easy!](https://www.youtube.com/watch?v=6BuRmE63ZJQ)

## ER Diagram 結構
<img width="367" alt="image" src="https://github.com/user-attachments/assets/3a201aa1-e351-476b-99d8-258d6b5c6d90" />

## 資料夾結構
```bash
blog-api/
├── config/
│   └── db.js
├── models/
│   ├── blog.js
│   └── user.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── routes/
│   ├── auth.js
│   └── blogs.js
├── public/
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── create-blog.html
│   └── edit-blog.html
├── index.js
└── package.json
```

## 項目初始化及啟動
1. 下載項目然後進入項目資料夾，執行CLI指令
```bash
npm install
npm start
```

2. 開啟 MongoDB Compass，點擊 add new connnection。

3. 在 localhost:27017 旁邊點擊 Create Database，開啟 2 個空白的 Collection。
```bash
Database Name: blogDB
Collection Name: blogs
Collection Name: users
```

<img width="230" alt="image" src="https://github.com/user-attachments/assets/7b1991a1-ce2c-4e61-80c8-590ba98dd6d0" />

4. 用瀏覽器進入以下網址測試
```bash
http://localhost:3000
```
