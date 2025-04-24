const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Blog = require('../models/blog');
const authenticateToken = require('../middleware/auth');
const mongoose = require('mongoose');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/blog-img'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 3 * 1024 * 1024 }, // 3MB limit
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('只允許上傳圖片文件'));
        }
    }
});

// 創建博客
router.post('/', authenticateToken, upload.array('images', 3), [
    body('title').trim().isLength({ min: 1 }).withMessage('標題不能為空'),
    body('content').trim().isLength({ min: 1 }).withMessage('內容不能為空')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, content } = req.body;
        const images = req.files.map(file => file.filename);

        const blog = new Blog({
            title,
            content,
            images,
            author: req.user.id
        });

        const savedBlog = await blog.save();
        res.status(201).json({ message: '博客創建成功', blog: savedBlog });
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
        const titleFilter = req.query.category && req.query.category !== 'ALL' ? req.query.category : null;

        const filter = titleFilter ? { title: { $regex: titleFilter, $options: 'i' } } : {};

        const blogs = await Blog.find(filter)
            .populate('author', 'username email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Blog.countDocuments(filter);
        
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
router.put('/:id', authenticateToken, upload.array('images', 3), async (req, res) => {
    try {
        // Ensure req.body is parsed correctly
        const { title, content } = req.body;
        const images = req.files ? req.files.map(file => file.filename) : [];

        if (!title || !content) {
            return res.status(400).json({ message: '標題和內容為必填項' });
        }

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: '博客不存在' });
        }

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ message: '無權限編輯此博客' });
        }

        blog.title = title;
        blog.content = content;
        if (images.length > 0) {
            blog.images = images; // Replace images only if new ones are uploaded
        }
        blog.updatedAt = Date.now();

        await blog.save();
        res.status(200).json({ message: '博客更新成功', blog });
    } catch (error) {
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