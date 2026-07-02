import api from './axios';

export const getUsers = (filters) => api.get('/admin/users', { params: filters });
export const createUser = (data) => api.post('/admin/users', data);
export const updateUser = (id, data) => api.put(`/admin/users/${id}`, data);
export const deactivateUser = (id) => api.patch(`/admin/users/${id}/deactivate`);

export const getMasterData = (type) => api.get(`/admin/master-data/${type}`);
export const updateMasterData = (type, data) => api.put(`/admin/master-data/${type}`, data);

export const createPlotNotification = (data) => api.post('/admin/plot-notifications', data);
export const getPlotNotifications = () => api.get('/admin/plot-notifications');
