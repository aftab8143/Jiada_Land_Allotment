export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone);

export const isValidPAN = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);

export const isValidGST = (gst) =>
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(gst);

export const required = (value) => (value ? '' : 'This field is required.');

export const minLength = (min) => (value) =>
  value.length >= min ? '' : `Minimum ${min} characters required.`;
