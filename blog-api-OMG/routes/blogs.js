const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Blog = require('../models/blog');
const authenticateToken = require('../middleware/auth');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const User = require('../models/user'); // Ensure the User model is imported

// 設置 multer 存儲配置
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/userblogs-images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('僅支持 JPG 或 PNG 格式的圖片'));
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024, files: 3 } // 最大 2MB，最多 3 張圖片
}).fields([{ name: 'images', maxCount: 3 }]);

// 創建博客（支持圖片上傳）
router.post('/', authenticateToken, (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: '每張圖片大小不能超過 2MB' });
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ message: '最多只能上傳 3 張圖片' });
            }
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, [
    body('title').trim().isLength({ min: 1 }).withMessage('標題不能為空')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const imagePaths = req.files.images ? req.files.images.map(file => `/userblogs-images/${file.filename}`) : [];
        const blog = new Blog({
            title: req.body.title,
            content: req.body.content || '',
            author: req.user.id,
            images: imagePaths
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
        const titleFilter = req.query.title;

        let query = {};
        if (titleFilter) {
            query.title = titleFilter;
        }

        const blogs = await Blog.find(query)
            .populate('author', 'username email')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Blog.countDocuments(query);

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

// 更新博客（支持圖片上傳）
router.put('/:id', authenticateToken, (req, res, next) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({ message: '每張圖片大小不能超過 2MB' });
            }
            if (err.code === 'LIMIT_FILE_COUNT') {
                return res.status(400).json({ message: '最多只能上傳 3 張圖片' });
            }
        } else if (err) {
            return res.status(400).json({ message: err.message });
        }
        next();
    });
}, [
    body('title').optional().trim().isLength({ min: 1 }).withMessage('標題不能為空')
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
        if (req.files.images && req.files.images.length > 0) {
            const imagePaths = req.files.images.map(file => `/userblogs-images/${file.filename}`);
            blog.images = imagePaths;
        }
        blog.updatedAt = Date.now();

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
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

// 獲取博客列表（支持過濾）
router.get('/blogs', async (req, res) => {
    const { page = 1, limit = 10, title, username } = req.query;
    const filter = {};
    if (title) {
        filter.title = new RegExp(title, 'i');
    }
    if (username) {
        filter.author = username; // Match author with user ID
    }
    const blogs = await Blog.find(filter)
        .populate('author', 'username')
        .skip((page - 1) * limit)
        .limit(parseInt(limit));
    const total = await Blog.countDocuments(filter);
    res.json({ blogs, currentPage: parseInt(page), totalPages: Math.ceil(total / limit) });
});

// Route to fetch all usernames (actually user IDs)
router.get('/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find({}, '_id'); // Fetch only _id
        if (!users || users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        // Map _id to username for frontend compatibility
        const mappedUsers = users.map(user => ({ username: user._id }));
        res.json(mappedUsers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users', error: error.message });
    }
});

module.exports = router;