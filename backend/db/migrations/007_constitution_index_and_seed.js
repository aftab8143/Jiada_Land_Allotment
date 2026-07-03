import pool from '../../config/db.js';

export const up = async () => {
  // Ensure updated_at exists (safe if column already present)
  await pool.query(`
    ALTER TABLE constitutions
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `);

  // Index on name for fast lookup / uniqueness enforcement
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_constitutions_name
    ON constitutions (name)
  `);

  // Seed — common Indian business constitution types
  await pool.query(`
  INSERT INTO constitutions (id, name) VALUES
    (2, 'Proprietorship firm'),
    (3, 'Private Limited Company'),
    (4, 'Registered Partnership firm'),
    (5, 'Individual'),
    (6, 'Public Limited Company'),
    (7, 'Limited Liability Registered Partnership firm'),
    (8, 'Government Company'),
    (9, 'State/Central Public Sector Undertaking'),
    (10, 'Hindu Undivided Family (HUF)'),
    (11, 'Consortium of above applicants'),
    (12, 'Trust'),
    (13, 'Society')
  ON CONFLICT (id) DO NOTHING
`);
};
