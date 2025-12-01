import axios from "axios";

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || error.message;
        throw new Error(`Pokemon API Error: ${message}`);
    }
);