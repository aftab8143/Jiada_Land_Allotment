import api from './axios';

export const getApplications = (filters) => api.get('/applications', { params: filters });
export const getApplicationById = (id) => api.get(`/applications/${id}`);
export const createApplication = (data) => api.post('/applications', data);
export const updateApplication = (id, data) => api.put(`/applications/${id}`, data);
export const submitApplication = (id) => api.post(`/applications/${id}/submit`);
export const withdrawApplication = (id, reason) => api.post(`/applications/${id}/withdraw`, { reason });
