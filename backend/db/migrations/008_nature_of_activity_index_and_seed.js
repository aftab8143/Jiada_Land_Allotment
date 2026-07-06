import pool from '../../config/db.js';

export const up = async () => {
  // Ensure updated_at exists (safe if already present)
  await pool.query(`
    ALTER TABLE nature_of_activities
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `);

  // Index on name for fast lookup
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_nature_of_activities_name
    ON nature_of_activities (name)
  `);

  // Seed — common industry nature-of-activity types
 await pool.query(`
  INSERT INTO nature_of_activities (id, name) VALUES
    (1, 'Manufacturing'),
    (2, 'Service'),
    (3, 'Ancilliary Activity'),
    (4, 'Commercial')
  ON CONFLICT (id) DO NOTHING
`);
};
