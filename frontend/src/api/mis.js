import api from './axios';

export const getMISSummary = () => api.get('/mis/summary');
export const getApplicationReport = (filters) => api.get('/mis/applications', { params: filters });
export const getRevenueReport = (filters) => api.get('/mis/revenue', { params: filters });
export const getLandBankReport = (filters) => api.get('/mis/land-bank', { params: filters });
export const exportReport = (type, filters) => api.get(`/mis/export/${type}`, { params: filters, responseType: 'blob' });
