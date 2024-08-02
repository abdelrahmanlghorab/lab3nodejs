import { Router } from 'express';
import { body, query } from 'express-validator';
import { createUser, login, getUsers, updateUser, deleteUser } from '../Controllers/user.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

const userValidationRules = [
    body('name').isString().withMessage('Name must be a string'),
    body('age').isInt({ min: 0 }).withMessage('Age must be a positive integer'),
    body('country').isString().withMessage('Country must be a string'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const userIdValidationRules = [
    query('id').isUUID().withMessage('Invalid ID format')
];

router.post('/login', login);
router.post('/create', userValidationRules, createUser);
router.get('/list', auth, getUsers);
router.put('/update', userIdValidationRules.concat(userValidationRules), updateUser);
router.delete('/delete', userIdValidationRules, deleteUser);

export default router;
