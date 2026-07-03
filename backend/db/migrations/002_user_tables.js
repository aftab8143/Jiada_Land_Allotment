import pool from '../../config/db.js';

export const up = async () => {
  // users — matches schema: id, group_id, name, username, old_password, password,
  //         password2, email, phone, status, region_id
  // Extra auth-safety columns appended: login_attempts, locked_until, last_login_at
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id             SERIAL PRIMARY KEY,
      group_id       INTEGER NOT NULL REFERENCES groups(id),
      name           VARCHAR(200) NOT NULL,
      username       VARCHAR(100) UNIQUE NOT NULL,
      old_password   TEXT,
      password       TEXT NOT NULL,
      email          VARCHAR(150) UNIQUE NOT NULL,
      phone          VARCHAR(15) UNIQUE NOT NULL,
      status         SMALLINT DEFAULT 1,
      login_status   BOOLEAN DEFAULT FALSE,
      region_id      INTEGER REFERENCES regions(id),
      login_attempts INTEGER DEFAULT 0,
      locked_until   TIMESTAMP,
      last_login_at  TIMESTAMP,
      created_at     TIMESTAMP DEFAULT NOW(),
      updated_at     TIMESTAMP DEFAULT NOW()
    )
  `);

  // audit_log — immutable action trail
  await pool.query(`
    CREATE TABLE IF NOT EXISTS audit_log (
      log_id      SERIAL PRIMARY KEY,
      user_id     INTEGER REFERENCES users(id),
      action      VARCHAR(100) NOT NULL,
      entity_name VARCHAR(100),
      entity_id   INTEGER,
      ip_address  VARCHAR(45),
      remarks     TEXT,
      created_at  TIMESTAMP DEFAULT NOW()
    )
  `);
};
