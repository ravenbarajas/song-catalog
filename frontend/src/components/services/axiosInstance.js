// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/', // Adjust the API base URL
    timeout: 1000, // Timeout duration in milliseconds (optional)
    headers: {
        'Content-Type': 'application/json',
        // You can add other headers here as needed
    },
});

export default axiosInstance;
