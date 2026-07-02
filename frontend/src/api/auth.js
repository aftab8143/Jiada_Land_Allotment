import api from './axios';

export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/signup', userData);
export const getMe = () => api.get('/user/me');
export const logout = () => api.post('/auth/logout');
