import api from './axios';

export const login = (credentials) => api.post('/users/login', credentials);
// export const register = (userData) => api.post('/auth/signup', userData);
export const getMe = () => api.get('/users/me');
export const logout = () => api.post('/users/logout');
