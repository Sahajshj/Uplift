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

// Function to get a doctor by ID
export const getDoctorById = async (id) => {
    try {
        const response = await api.get(`/doctors/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching doctor:', error);
        throw error;
    }
};

// Function to get all doctors
export const getDoctors = async () => {
    try {
        const response = await api.get('/doctors');
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error;
    }
};

// Function to get an article by ID
export const getArticleById = async (id) => {
    try {
        const response = await api.get(`/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching article:', error);
        throw error;
    }
};

// Function to get user profile
export const getUserProfile = async () => {
    try {
        const response = await api.get('/profile'); // Adjust endpoint if needed
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post('/signup', userData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error.response?.data || error.message);
        throw error;
    }
};

// Export the api instance and functions
export default api;
