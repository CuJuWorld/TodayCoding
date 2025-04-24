const errorHandler = (err, req, res, next) => {
    res.status(500).json({ message: '服務器發生未知錯誤', error: err.message });
};

module.exports = errorHandler;