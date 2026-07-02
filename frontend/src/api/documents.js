import api from './axios';

export const getDocuments = (applicationId) => api.get('/documents', { params: { applicationId } });
export const uploadDocument = (applicationId, formData) =>
  api.post(`/documents/${applicationId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteDocument = (docId) => api.delete(`/documents/${docId}`);
export const verifyDocument = (docId) => api.post(`/documents/${docId}/verify`);
