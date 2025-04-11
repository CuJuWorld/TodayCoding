const { body } = require('express-validator');

// ...existing code...

exports.validateUser = [
    body('UserName').notEmpty().withMessage('UserName is required'),
    body('UserEmail').isEmail().withMessage('Invalid email format'),
    body('UserPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('UserAddress.street').optional().isString(),
    body('UserAddress.city').optional().isString(),
    body('UserAddress.state').optional().isString(),
    body('UserAddress.zip').optional().isString(),
    body('UserAddress.country').optional().isString(),
    body('UserRole').optional().isIn(['user', 'admin']).withMessage('Invalid role'),
    body('UserPhoneNumber').optional().matches(/^(?:\+852[569]\d{7}|\+861[0-9]{10})$/).withMessage('Invalid phone number'),
];

// ...existing code...