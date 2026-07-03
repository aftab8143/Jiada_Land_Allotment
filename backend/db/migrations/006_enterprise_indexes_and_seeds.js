import pool from '../../config/db.js';

export const up = async () => {
  // ── Indexes ────────────────────────────────────────────────────────────────
  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_enterprise_sectors_name
    ON enterprise_sectors (name)
  `);

  await pool.query(`
    CREATE INDEX IF NOT EXISTS idx_enterprise_types_name
    ON enterprise_types (name)
  `);

  // ── ALTER TABLE: ensure updated_at exists on both tables ──────────────────
  // (safe no-op if column already present)
  await pool.query(`
    ALTER TABLE enterprise_sectors
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `);

  await pool.query(`
    ALTER TABLE enterprise_types
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  `);

  // ── Seed: enterprise_sectors ───────────────────────────────────────────────
 await pool.query(`
  INSERT INTO enterprise_sectors (id, name) VALUES
    (1, 'Automobile'),
    (2, 'Chemicals/ Fertilizers'),
    (3, 'Electronic Items'),
    (4, 'Food Industry'),
    (5, 'General Plastic Items'),
    (6, 'Beverages'),
    (7, 'Pharmasceutical / Gases'),
    (8, 'Ready Made Garments'),
    (9, 'Service Industry / Anciliary Purpose'),
    (10, 'Textile'),
    (11, 'Steel, Alloy and Related Items'),
    (12, 'Cement and Related Items'),
    (13, 'Ware housing and logistics'),
    (14, 'IT / ITES / Computer Industry'),
    (15, 'Fabrication and Job Work'),
    (16, 'Packing Material and Boxes'),
    (17, 'Detergent Powder/ Soaps etc'),
    (18, 'Others')
  ON CONFLICT (id) DO NOTHING
`);

  // ── Seed: enterprise_types ─────────────────────────────────────────────────
await pool.query(`
  INSERT INTO enterprise_types (id, name) VALUES
    (1, 'Micro'),
    (2, 'Small'),
    (3, 'Medium'),
    (4, 'Mega'),
    (5, 'Ultra'),
    (6, 'Large')
  ON CONFLICT (id) DO NOTHING
`);
};
