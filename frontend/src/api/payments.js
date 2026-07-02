import api from './axios';

export const getPayments = (applicationId) => api.get('/payments', { params: { applicationId } });
export const initiatePayment = (data) => api.post('/payments/initiate', data);
export const verifyPayment = (transactionId) => api.post('/payments/verify', { transactionId });
export const getDemandLetter = (applicationId) => api.get(`/payments/demand-letter/${applicationId}`);
export const getReceipt = (paymentId) => api.get(`/payments/receipt/${paymentId}`);
