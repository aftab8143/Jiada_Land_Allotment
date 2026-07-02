export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

export const formatArea = (sqMeters) =>
  `${sqMeters.toLocaleString('en-IN')} sq.m`;

export const padId = (id, length = 6) => String(id).padStart(length, '0');
