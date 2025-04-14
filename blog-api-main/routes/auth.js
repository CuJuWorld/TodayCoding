const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const authenticateToken = require('../middleware/auth');

const SECRET_KEY = 'your-secret-key';

// 註冊
router.post('/register', [
    body('username').trim().isLength({ min: 3 }).withMessage('用戶名至少3個字符'),
    body('password').isLength({ min: 6 }).withMessage('密碼至少6個字符'),
    body('email').isEmail().withMessage('請提供有效的電子郵件')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        });
        await user.save();
        res.status(201).json({ message: '用戶創建成功' });
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// 登錄
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: '用戶不存在' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(500).json({ message: '密碼錯誤' });
        }
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// 獲取當前用戶信息
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: '用戶不存在' });
        }
        res.json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

module.exports = router;