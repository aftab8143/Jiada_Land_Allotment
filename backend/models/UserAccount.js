import pool from '../config/db.js';

export const findByUsername = async (username) => {
  const result = await pool.query(
    `SELECT u.id, u.username, u.password, u.phone, u.email,
            u.name, u.group_id, u.region_id, u.status,
            u.login_attempts, u.locked_until, u.last_login_at,
            u.created_at, g.name AS group_name
     FROM users u
     JOIN groups g ON u.group_id = g.id
     WHERE LOWER(u.username) = LOWER($1)`,
    [username]
  );
  return result.rows[0] || null;
};

export const findByEmail = async (email) => {
  const result = await pool.query(
    `SELECT u.id, u.username, u.password, u.phone, u.email,
            u.name, u.group_id, u.region_id, u.status,
            u.login_attempts, u.locked_until, u.last_login_at,
            u.created_at, g.name AS group_name
     FROM users u
     JOIN groups g ON u.group_id = g.id
     WHERE u.email = $1`,
    [email]
  );
  return result.rows[0] || null;
};

export const findByPhone = async (phone) => {
  const result = await pool.query(
    'SELECT id FROM users WHERE phone = $1',
    [phone]
  );
  return result.rows[0] || null;
};

export const findById = async (userId) => {
  const result = await pool.query(
    `SELECT u.id, u.username, u.email, u.phone, u.name,
            u.status, u.last_login_at, u.created_at,
            g.name AS group_name, g.id AS group_id
     FROM users u
     JOIN groups g ON u.group_id = g.id
     WHERE u.id = $1`,
    [userId]
  );
  return result.rows[0] || null;
};

export const createApplicant = async ({ username, password, phone, email, name }) => {
  const groupResult = await pool.query(
    "SELECT id FROM groups WHERE name = 'Applicant'"
  );
  const group_id = groupResult.rows[0].id;

  const result = await pool.query(
    `INSERT INTO users (username, password, phone, email, name, group_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, username, email, phone, name, group_id, created_at`,
    [username, password, phone, email, name, group_id]
  );
  return result.rows[0];
};

// Locks account for 30 min after 5 consecutive failures
export const incrementLoginAttempts = async (userId) => {
  await pool.query(
    `UPDATE users
     SET login_attempts = login_attempts + 1,
         locked_until   = CASE WHEN login_attempts + 1 >= 5
                            THEN NOW() + INTERVAL '30 minutes'
                            ELSE locked_until
                          END,
         updated_at     = NOW()
     WHERE id = $1`,
    [userId]
  );
};

export const resetLoginAttempts = async (userId) => {
  await pool.query(
    `UPDATE users
     SET login_attempts = 0,
         locked_until   = NULL,
         last_login_at  = NOW(),
         updated_at     = NOW()
     WHERE id = $1`,
    [userId]
  );
};
