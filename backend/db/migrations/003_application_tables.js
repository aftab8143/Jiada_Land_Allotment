import pool from '../../config/db.js';

export const up = async () => {
  // land_notifications — matches schema: Id, region_id, notification_no,
  //   description, start_date, end_date, status, added_by
  await pool.query(`
    CREATE TABLE IF NOT EXISTS land_notifications (
      "Id"              SERIAL PRIMARY KEY,
      region_id         INTEGER REFERENCES regions(id),
      notification_no   VARCHAR(100),
      description       TEXT,
      start_date        DATE,
      end_date          DATE,
      status            SMALLINT DEFAULT 1,
      added_by          INTEGER REFERENCES users(id),
      created_at        TIMESTAMP DEFAULT NOW()
    )
  `);

  // area_types — referenced by plot_details and certificates
  await pool.query(`
    CREATE TABLE IF NOT EXISTS area_types (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // banks — referenced by industry_documents
  await pool.query(`
    CREATE TABLE IF NOT EXISTS banks (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(200) NOT NULL,
      status     SMALLINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // landservices — referenced by apply_services and service_requests
  await pool.query(`
    CREATE TABLE IF NOT EXISTS landservices (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(200) NOT NULL,
      status     SMALLINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // feemasters — referenced by demand_dues
  await pool.query(`
    CREATE TABLE IF NOT EXISTS feemasters (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(200) NOT NULL,
      amount     DECIMAL(15, 2),
      status     SMALLINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // plot_details — matches schema: id, totalarea_type, date_of_allotment,
  //   region_id, district_id, industrial_area_detail_id, name, area_type_id,
  //   totalarea, land_notification_date, image_url, status,
  //   enterprise_sector_id, land_notification_id
  await pool.query(`
    CREATE TABLE IF NOT EXISTS plot_details (
      id                       SERIAL PRIMARY KEY,
      totalarea_type           VARCHAR(50),
      date_of_allotment        DATE,
      region_id                INTEGER REFERENCES regions(id),
      district_id              INTEGER REFERENCES districts(id),
      industrial_area_detail_id INTEGER REFERENCES industrial_area_details("Id"),
      name                     VARCHAR(200),
      area_type_id             INTEGER REFERENCES area_types(id),
      totalarea                DECIMAL(12, 4),
      land_notification_date   DATE,
      image_url                TEXT,
      status                   VARCHAR(50) DEFAULT 'available',
      enterprise_sector_id     INTEGER REFERENCES enterprise_sectors(id),
      land_notification_id     INTEGER REFERENCES land_notifications("Id"),
      created_at               TIMESTAMP DEFAULT NOW(),
      updated_at               TIMESTAMP DEFAULT NOW()
    )
  `);

  // plot_emds — referenced by bidder_emds and bidders
  await pool.query(`
    CREATE TABLE IF NOT EXISTS plot_emds (
      id           SERIAL PRIMARY KEY,
      region_id    INTEGER REFERENCES regions(id),
      plot_detail_id INTEGER REFERENCES plot_details(id),
      emd_amount   DECIMAL(15, 2),
      start_date   DATE,
      end_date     DATE,
      status       SMALLINT DEFAULT 1,
      created_date TIMESTAMP DEFAULT NOW()
    )
  `);

  // industry_application_details — matches schema hints (key applicant fields)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS industry_application_details (
      id                        SERIAL PRIMARY KEY,
      sws_regno                 VARCHAR(100),
      application_no            VARCHAR(100) UNIQUE,
      name                      VARCHAR(200),
      lname                     VARCHAR(200),
      father                    VARCHAR(200),
      designation               VARCHAR(100),
      name1                     VARCHAR(200),
      lname1                    VARCHAR(200),
      country                   VARCHAR(100),
      country1                  VARCHAR(100),
      address                   TEXT,
      address1                  TEXT,
      city                      VARCHAR(100),
      city1                     VARCHAR(100),
      state                     VARCHAR(100),
      state1                    VARCHAR(100),
      pin                       VARCHAR(10),
      pin1                      VARCHAR(10),
      phone                     VARCHAR(20),
      phone1                    VARCHAR(20),
      mobile                    VARCHAR(15),
      mobile1                   VARCHAR(15),
      email                     VARCHAR(150),
      email1                    VARCHAR(150),
      fax                       VARCHAR(30),
      fax1                      VARCHAR(30),
      identity_type             VARCHAR(50),
      identity_type1            VARCHAR(50),
      identity_value            VARCHAR(100),
      identity_value1           VARCHAR(100),
      gender                    VARCHAR(10),
      gender1                   VARCHAR(10),
      category                  VARCHAR(50),
      category1                 VARCHAR(50),
      father1                   VARCHAR(200),
      designation1              VARCHAR(100),
      ex_service                SMALLINT DEFAULT 0,
      ex_service1               SMALLINT DEFAULT 0,
      pstatus                   VARCHAR(50),
      "sessionId"               VARCHAR(200),
      date_of_allotment         DATE,
      region_id                 INTEGER REFERENCES regions(id),
      district_id               INTEGER REFERENCES districts(id),
      industrial_area_detail_id INTEGER REFERENCES industrial_area_details("Id"),
      plot_detail_id            INTEGER REFERENCES plot_details(id),
      land_notification_id      INTEGER REFERENCES land_notifications("Id"),
      created_at                TIMESTAMP DEFAULT NOW(),
      updated_at                TIMESTAMP DEFAULT NOW()
    )
  `);

  // industry_details — matches schema hints (enterprise & project fields)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS industry_details (
      id                            SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER NOT NULL UNIQUE
                                      REFERENCES industry_application_details(id),
      enterprise_name               VARCHAR(300),
      constitution_id               INTEGER REFERENCES constitutions(id),
      nature_of_activity_id         INTEGER REFERENCES nature_of_activities(id),
      enterprise_type_id            INTEGER REFERENCES enterprise_types(id),
      enterprise_sector_id          INTEGER REFERENCES enterprise_sectors(id),
      cin                           VARCHAR(30),
      item_name2                    VARCHAR(200),
      no_of_unit2                   DECIMAL(12,2),
      unit2                         VARCHAR(50),
      item_name3                    VARCHAR(200),
      no_of_unit3                   DECIMAL(12,2),
      unit3                         VARCHAR(50),
      item_name4                    VARCHAR(200),
      no_of_unit4                   DECIMAL(12,2),
      unit4                         VARCHAR(50),
      item_name5                    VARCHAR(200),
      no_of_unit5                   DECIMAL(12,2),
      unit5                         VARCHAR(50),
      manegerial                    INTEGER,
      skilled                       INTEGER,
      semiskilled                   INTEGER,
      unskilled                     INTEGER,
      time_for_implementation       VARCHAR(100),
      power                         DECIMAL(12,2),
      water                         DECIMAL(12,2),
      investment_land               DECIMAL(15,2),
      investment_sheds              DECIMAL(15,2),
      investment_plant              DECIMAL(15,2),
      investment_others             DECIMAL(15,2),
      investment_working            DECIMAL(15,2),
      investment_total              DECIMAL(15,2),
      details_factory               DECIMAL(12,4),
      details_godown                DECIMAL(12,4),
      details_office                DECIMAL(12,4),
      details_guard                 DECIMAL(12,4),
      details_others                DECIMAL(12,4),
      details_open_space            DECIMAL(12,4),
      details_total                 DECIMAL(12,4),
      existing_ind_name             VARCHAR(200),
      existing_area                 VARCHAR(100),
      existing_phase                VARCHAR(50),
      existing_item                 VARCHAR(200),
      existing_plot                 VARCHAR(50),
      totemployee                   INTEGER,
      f_capital                     DECIMAL(15,2),
      f_debt                        DECIMAL(15,2),
      f_others                      DECIMAL(15,2),
      f_total                       DECIMAL(15,2),
      region_id                     INTEGER REFERENCES regions(id),
      created_at                    TIMESTAMP DEFAULT NOW(),
      updated_at                    TIMESTAMP DEFAULT NOW()
    )
  `);

  // industry_documents — matches schema: id, industry_application_detail_id,
  //   bank_id, file_raw_material
  await pool.query(`
    CREATE TABLE IF NOT EXISTS industry_documents (
      id                            SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER NOT NULL UNIQUE
                                      REFERENCES industry_application_details(id),
      bank_id                       INTEGER REFERENCES banks(id),
      file_raw_material             TEXT,
      created_at                    TIMESTAMP DEFAULT NOW(),
      updated_at                    TIMESTAMP DEFAULT NOW()
    )
  `);
};
