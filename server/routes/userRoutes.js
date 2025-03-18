const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    res.send('User routes are working!');
});


router.post(
    '/register',
    [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isLength({ min: 3 }).withMessage('Name should be at least 3 characters'),

       
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format')
            .normalizeEmail(),

      
        body('mobile')
            .notEmpty().withMessage('Mobile number is required')
            .isNumeric().withMessage('Mobile number should be numeric')
            .isLength({ min: 10, max: 10 }).withMessage('Mobile number should be exactly 10 digits'),

      
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
    ],
    async (req, res) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, email, mobile, password } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            const user = new User({ name, email, mobile, password });
            await user.save();

            const token = jwt.sign(
                { _id: user._id.toString() },
                process.env.JWT_SECRET_KEY
            );

            res.status(201).send({ user, token, message: 'User Created Successfully' });
        } catch (err) {
            res.status(500).send({ error: err.message });
        }
    }
);

router.post(
    '/login',
    [
      
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Invalid email format'),

       
        body('password')
            .notEmpty().withMessage('Password is required')
            .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    ],
    async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

           
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }

           
            const token = jwt.sign(
                { _id: user._id.toString() },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '1d' }
            );

            res.status(200).send({
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    mobile: user.mobile,
                    password: user.password
                },
                token,
                message: 'Login successfull'
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

module.exports = router;