import api from './axios';

export const getPendingApplications = (stage) => api.get('/workflow/pending', { params: { stage } });
export const forwardApplication = (id, data) => api.post(`/workflow/${id}/forward`, data);
export const returnApplication = (id, remarks) => api.post(`/workflow/${id}/return`, { remarks });
export const approveApplication = (id, remarks) => api.post(`/workflow/${id}/approve`, { remarks });
export const rejectApplication = (id, reason) => api.post(`/workflow/${id}/reject`, { reason });
export const getWorkflowHistory = (applicationId) => api.get(`/workflow/${applicationId}/history`);
