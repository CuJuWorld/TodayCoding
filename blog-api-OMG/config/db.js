const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogDB');
        console.log('MongoDB 連接成功');
    } catch (err) {
        console.error('MongoDB 連接失敗:', err);
        process.exit(1);
    }
};

module.exports = connectDB;