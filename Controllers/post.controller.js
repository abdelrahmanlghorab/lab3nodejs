import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';
import { savePosts, loadPosts } from '../utils/helpers.js';

export const createPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, content } = req.body;
    const author = req.user.id;
    const newPost = { id: uuid(), title, content, author, createdAt: new Date() };

    let posts = loadPosts();
    posts.push(newPost);
    savePosts(posts);

    res.status(201).json(newPost);
};

export const getPosts = (req, res) => {
    const posts = loadPosts();
    res.status(200).json(posts);
};

export const getPostById = (req, res) => {
    const { id } = req.params;
    const posts = loadPosts();
    const post = posts.find(p => p.id === id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
};

export const updatePost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, content } = req.body;

    let posts = loadPosts();
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    if (posts[postIndex].author !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    posts[postIndex] = { ...posts[postIndex], title, content };
    savePosts(posts);

    res.status(200).json(posts[postIndex]);
};

export const deletePost = (req, res) => {
    const { id } = req.params;

    let posts = loadPosts();
    const postIndex = posts.findIndex(p => p.id === id);

    if (postIndex === -1) {
        return res.status(404).json({ message: 'Post not found' });
    }

    if (posts[postIndex].author !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    posts.splice(postIndex, 1);
    savePosts(posts);

    res.status(200).json({ message: 'Post deleted successfully' });
};
