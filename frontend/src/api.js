import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Ensure this URL matches your backend configuration
});

export default api;