const NAME_REGEX = /^(?![0-9]*$)[a-zA-Z0-9 /,.()''-]+$/;

export const validateEnterpriseSector = (req, res, next) => {
  const { name } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim() === '') {
    errors.push('name is required and cannot be empty');
  } else if (name.trim().length > 255) {
    errors.push('name must not exceed 255 characters');
  } else if (!NAME_REGEX.test(name.trim())) {
    errors.push('name may only contain letters, numbers, spaces, and /  ,  .  (  )  -');
  }

  if (errors.length > 0) {
    return res.status(422).json({ message: 'Validation failed', errors });
  }

  req.body.name = name.trim();
  next();
};
