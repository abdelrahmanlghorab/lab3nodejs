import { Router } from 'express';
import { body, param } from 'express-validator';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../Controllers/post.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

const postValidationRules = [
    body('title').isString().withMessage('Title must be a string'),
    body('content').isString().withMessage('Content must be a string')
];

const postIdValidationRules = [
    param('id').isUUID().withMessage('Invalid ID format')
];

router.post('/create', auth, postValidationRules, createPost);
router.get('/', auth, getPosts);
router.get('/:id', auth, getPostById);
router.put('/:id', auth, postIdValidationRules.concat(postValidationRules), updatePost);
router.delete('/:id', auth, postIdValidationRules, deletePost);

export default router;
