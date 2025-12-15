import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Projects API
export const projectsAPI = {
    getAll: async () => {
        const response = await api.get('/projects');
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/projects/${id}`);
        return response.data;
    },
};

// Contact API
export const contactAPI = {
    send: async (formData) => {
        const response = await api.post('/contact', formData);
        return response.data;
    },
    getAll: async () => {
        const response = await api.get('/contact');
        return response.data;
    },
};

export default api;
