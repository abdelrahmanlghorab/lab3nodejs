import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';
import { saveUsers, loadUsers } from '../utils/helpers.js';
import jwt from 'jsonwebtoken';

const tokenKey = "1234assA@SSSS";

export const createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, age, country, email, password } = req.body;
    const id = uuid();
    const newUser = { id, name, age, country, email, password };

    let users = loadUsers();
    users.push(newUser);
    saveUsers(users);

    res.status(201).json({ id, name, age, country, email });
};

export const login = (req, res) => {
    const { email, password } = req.body;
    let users = loadUsers();

    const user = users.find(u => u.email === email);
    if (!user || password !== user.password) {
        return res.status(403).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, tokenKey, { expiresIn: '1h' });
    res.status(200).json({ token });
};

export const getUsers = (req, res) => {
    const result = loadUsers();
    res.status(200).json(result);
};

export const updateUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.query;
    let users = loadUsers();

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;
    saveUsers(users);

    res.status(200).json(updatedUser);
};

export const deleteUser = (req, res) => {
    const { id } = req.query;
    let users = loadUsers();

    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    users.splice(userIndex, 1);
    saveUsers(users);

    res.status(200).json({ message: "User deleted successfully" });
};
