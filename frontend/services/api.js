import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Adjust this based on your backend

// Create an instance of axios with the base URL
const api = axios.create({
    baseURL: API_URL,
});

// Function to get articles
export const getArticles = async () => {
    try {
        const response = await api.get('/articles');
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

// Function to post an article
export const postArticle = async (article) => {
    try {
        const response = await api.post('/articles', article, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error) {
        console.error('Error posting article:', error);
        throw error;
    }
};

// Function to handle user login
export const login = async (credentials) => {
    try {
        const response = await api.post('/login', credentials, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data.token;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
