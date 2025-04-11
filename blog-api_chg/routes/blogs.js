const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/blog');
const authenticateToken = require('../middleware/auth');
const mongoose = require('mongoose');

// 創建博客
router.post('/', authenticateToken, [
    body('title').trim().isLength({ min: 1 }).withMessage('標題不能為空'),
    body('content').trim().isLength({ min: 1 }).withMessage('內容不能為空')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content,
            author: req.user.id
        });
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// 獲取博客列表（帶分頁）
router.get('/', authenticateToken, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const blogs = await Blog.find()
            .populate('author', 'username email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Blog.countDocuments();
        
        res.json({
            blogs,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalBlogs: total
        });
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// 獲取單篇博客
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username email');
        if (!blog) {
            return res.status(404).json({ message: '博客不存在' });
        }
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// 更新博客
router.put('/:id', authenticateToken, [
    body('title').optional().trim().isLength({ min: 1 }).withMessage('標題不能為空'),
    body('content').optional().trim().isLength({ min: 1 }).withMessage('內容不能為空')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const blogId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: '無效的博客 ID' });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: '博客不存在' });
        }
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: '無權修改此博客' });
        }

        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.updatedAt = Date.now();
        
        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } catch (error) {
        console.error('更新博客錯誤:', error);
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

// 刪除博客
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const blogId = req.params.id;
        console.log('嘗試刪除博客 ID:', blogId, '用戶 ID:', req.user.id);

        if (!mongoose.Types.ObjectId.isValid(blogId)) {
            return res.status(400).json({ message: '無效的博客 ID' });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: '博客不存在' });
        }

        console.log('博客作者:', blog.author.toString());
        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: '無權刪除此博客' });
        }

        await Blog.findByIdAndDelete(blogId);
        res.json({ message: '博客已刪除' });
    } catch (error) {
        console.error('刪除博客錯誤:', error);
        res.status(500).json({ message: '服務器錯誤', error: error.message });
    }
});

module.exports = router;