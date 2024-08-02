import jwt from 'jsonwebtoken';
import { loadUsers } from '../utils/helpers.js';

const tokenKey = "1234assA@SSSS";

export const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, tokenKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const { id } = decoded;

        if (!id) {
            return res.status(403).json({ message: "Access denied" });
        }

        const users = loadUsers();
        const user = users.find((user) => user.id === id);
        if (!user) {
            return res.status(403).json({ message: "Access denied" });
        }

        req.user = user;
        next();
    });
};
