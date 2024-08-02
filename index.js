import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './Routes/user.route.js';
import postRoutes from './Routes/post.route.js';
import { error } from './middlewares/error.middleware.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors({
    origin: ["http://localhost:5000"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true
}));

app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use(error);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
