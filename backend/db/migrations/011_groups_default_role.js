import pool from '../../config/db.js';

export const up = async () => {
  // default_role — TRUE for the 9 system-seeded groups, FALSE for anything
  // created or edited afterward via groupController.
  await pool.query(`
    ALTER TABLE groups
    ADD COLUMN IF NOT EXISTS default_role BOOLEAN NOT NULL DEFAULT FALSE
  `);

  await pool.query(`
    UPDATE groups SET default_role = TRUE
    WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9)
  `);
};
