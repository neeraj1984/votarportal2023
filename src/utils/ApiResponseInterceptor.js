import axios from 'axios';

// Create an Axios instance
const apiResponseInterceptor = axios.create({
    baseURL: 'http://localhost:3000',
});

// Add a response interceptor
apiResponseInterceptor.interceptors.response.use(
    response => response,
    error => {
        // Check for a 401 Unauthorized status
        if (error.response && error.response.status === 401) {
            alert('Your session has expired. Please log in again.');
            // Optionally redirect to login page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiResponseInterceptor;