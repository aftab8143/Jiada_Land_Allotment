import api from './axios';

export const getBidEvents = (filters) => api.get('/bidding/events', { params: filters });
export const getBidEventById = (id) => api.get(`/bidding/events/${id}`);
export const submitBid = (eventId, bidData) => api.post(`/bidding/events/${eventId}/bids`, bidData);
export const getMyBids = () => api.get('/bidding/my-bids');
export const createBidEvent = (data) => api.post('/bidding/events', data);
export const closeBidEvent = (id) => api.post(`/bidding/events/${id}/close`);
