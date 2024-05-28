// src/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/';

const register = (username, password) => {
  return axios.post(API_URL + 'register', { username, password });
};

const login = (username, password) => {
  return axios.post(API_URL + 'login', { username, password }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  let token=localStorage.getItem('token');
  return token;
};

export default {
  register,
  login,
  logout,
  getCurrentUser
};
