import pool from '../../config/db.js';

export const up = async () => {
  // groups — portal user roles (applicant, cc, ieo, etc.)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS groups (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
  INSERT INTO groups (id, name) VALUES
    (1, 'System Admin'),
    (2, 'Jiada Admin'),
    (3, 'RO Admin'),
    (4, 'RO Report'),
    (5, 'Applicant'),
    (6, 'Clerk'),
    (7, 'IEO'),
    (8, 'DO'),
    (9, 'Technical Person')
  ON CONFLICT (id) DO NOTHING
`);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS regions (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(150) NOT NULL,
      email      VARCHAR(150),
      contcat_no VARCHAR(50),
      address    TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS districts (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(150) NOT NULL,
      dis_code   VARCHAR(20),
      deleted    SMALLINT DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS indcategories (
      id                   SERIAL PRIMARY KEY,
      cat_name             VARCHAR(100) NOT NULL,
      category_description TEXT,
      created_at           TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS blocks (
      id            SERIAL PRIMARY KEY,
      indcategory_id INTEGER REFERENCES indcategories(id),
      district_id   INTEGER REFERENCES districts(id),
      region_id     INTEGER REFERENCES regions(id),
      block_name    VARCHAR(150) NOT NULL,
      block_name_hi VARCHAR(150),
      created_at    TIMESTAMP DEFAULT NOW()
    )
  `);

  // financial_years —  id, financial_year, start_date, end_date
  await pool.query(`
    CREATE TABLE IF NOT EXISTS financial_years (
      id             SERIAL PRIMARY KEY,
      financial_year  VARCHAR(50)  DEFAULT NULL,
      start_date     DATE         DEFAULT NULL,
      end_date       DATE         DEFAULT NULL
    )
  `);

  // nature_of_activities — matches MySQL schema: id, name only (no timestamps, no UNIQUE)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS nature_of_activities (
      id   SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  `);

  // constitutions — referenced by industry_details.constitution_id
  await pool.query(`
    CREATE TABLE IF NOT EXISTS constitutions (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // enterprise_sectors — VARCHAR(255) UNIQUE; referenced by industry_details
  await pool.query(`
    CREATE TABLE IF NOT EXISTS enterprise_sectors (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL UNIQUE
                   CONSTRAINT chk_enterprise_sectors_name
                   CHECK (name ~ '^(?![0-9]*$)[a-zA-Z0-9 /,.()''-]+$'),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // enterprise_types — same structure; referenced by industry_details
  await pool.query(`
    CREATE TABLE IF NOT EXISTS enterprise_types (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(255) NOT NULL UNIQUE
                   CONSTRAINT chk_enterprise_types_name
                   CHECK (name ~ '^(?![0-9]*$)[a-zA-Z0-9 /,.()''-]+$'),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // industrial_area_details — uses Id/IACode/IAName as per schema
  await pool.query(`
    CREATE TABLE IF NOT EXISTS industrial_area_details (
      "Id"          SERIAL PRIMARY KEY,
      "IACode"      VARCHAR(50),
      "IAName"      VARCHAR(200) NOT NULL,
      allotted_area DECIMAL(12, 4),
      vacant_area   DECIMAL(12, 4),
      admin_area    DECIMAL(12, 4),
      circle        VARCHAR(100),
      village       VARCHAR(100),
      type_indus    VARCHAR(50),
      total_area    DECIMAL(12, 4),
      "layoutMap"   TEXT,
      region_id     INTEGER REFERENCES regions(id),
      district_id   INTEGER REFERENCES districts(id),
      block_id      INTEGER REFERENCES blocks(id),
      created_at    TIMESTAMP DEFAULT NOW()
    )
  `);
};
