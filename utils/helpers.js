import * as fs from 'fs';

const userFilePath = './users.json';
const postFilePath = './posts.json';

export const loadUsers = () => {
    try {
        const fileData = fs.readFileSync(userFilePath, 'utf8');
        const parsedData = JSON.parse(fileData);
        if (!Array.isArray(parsedData)) {
            throw new Error('Users data format is incorrect');
        }
        return parsedData;
    } catch (error) {
        return [];
    }
};

export const saveUsers = (data) => {
    if (!Array.isArray(data)) {
        throw new Error('Users data must be an array');
    }
    fs.writeFileSync(userFilePath, JSON.stringify(data, null, 2));
};

export const loadPosts = () => {
    try {
        const fileData = fs.readFileSync(postFilePath, 'utf8');
        const parsedData = JSON.parse(fileData);
        if (!Array.isArray(parsedData)) {
            throw new Error('Posts data format is incorrect');
        }
        return parsedData;
    } catch (error) {
        return [];
    }
};

export const savePosts = (data) => {
    if (!Array.isArray(data)) {
        throw new Error('Posts data must be an array');
    }
    fs.writeFileSync(postFilePath, JSON.stringify(data, null, 2));
};
