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
    body('password').matches(/^[a-zA-Z0-9]{6,}$/).withMessage('密碼必須是至少6個字母或數字的組合，且不能包含特殊字符'),
    body('email').isEmail().withMessage('請提供有效的電子郵件')
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, email, password } = req.body;

        // Check for invalid password length or invalid characters
        if (password.length < 6 || !/^[a-zA-Z0-9]+$/.test(password)) {
            return res.status(400).json({ message: '密碼必須是至少6個字母或數字的組合，且不能包含特殊字符' });
        }

        // Check for duplicate username
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Duplicated username, please use another one' });
        }

        // Check for duplicate email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'This email is already used for registration' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: '用戶創建成功' });
    } catch (error) {
        next(error); // Pass error to errorHandler middleware
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