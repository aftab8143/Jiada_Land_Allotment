export const validateGroup = (req, res, next) => {
  const { name } = req.body;
  const errors = [];

  if (name === undefined || name === null) {
    errors.push('name is required');
  } else if (typeof name !== 'string') {
    errors.push('name must be a string');
  } else if (name.trim().length === 0) {
    errors.push('name cannot be empty');
  } else if (name.trim().length > 100) {
    errors.push('name cannot exceed 100 characters');
  }

  if (errors.length > 0) {
    return res.status(422).json({ status: false, message: 'Validation failed', errors });
  }

  req.body.name = name.trim();
  next();
};
