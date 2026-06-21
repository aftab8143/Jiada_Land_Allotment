import pool from '../config/db.js';

export const getMe = async (req, res) => {
  const result = await pool.query(
    'SELECT id, name, email, created_at FROM users WHERE id = $1',
    [req.user.id]
  );
  const user = result.rows[0];
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};
