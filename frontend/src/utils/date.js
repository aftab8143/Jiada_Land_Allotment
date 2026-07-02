export const formatDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatDateTime = (dateStr) =>
  new Date(dateStr).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export const daysDiff = (from, to = new Date()) =>
  Math.floor((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24));
