import api from './axios';

export const getPlots = (filters) => api.get('/land-bank/plots', { params: filters });
export const getPlotById = (id) => api.get(`/land-bank/plots/${id}`);
export const getWishlist = () => api.get('/land-bank/wishlist');
export const addToWishlist = (plotId) => api.post('/land-bank/wishlist', { plotId });
export const removeFromWishlist = (plotId) => api.delete(`/land-bank/wishlist/${plotId}`);
