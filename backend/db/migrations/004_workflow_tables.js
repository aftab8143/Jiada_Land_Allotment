import pool from '../../config/db.js';

export const up = async () => {
  // apply_service_statuses — lookup for apply_services status
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_statuses (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // Lookup tables referenced by apply_services
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_lhr_to_whoms (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(200) NOT NULL,
      is_active  SMALLINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_lhr_is_same_projects (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(200) NOT NULL,
      is_active  SMALLINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_cic_to_whoms (
      id         SERIAL PRIMARY KEY,
      name       VARCHAR(200) NOT NULL,
      is_active  SMALLINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_service_documents — document types per landservice
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_documents (
      id                  SERIAL PRIMARY KEY,
      landservice_id      INTEGER REFERENCES landservices(id),
      name                VARCHAR(300) NOT NULL,
      document_format     VARCHAR(50),
      document_mandatory  SMALLINT DEFAULT 0,
      is_active           SMALLINT DEFAULT 1,
      created_by          INTEGER REFERENCES users(id),
      created_at          TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_services — main service application record
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_services (
      id                              SERIAL PRIMARY KEY,
      industry_application_detail_id  INTEGER REFERENCES industry_application_details(id),
      landservice_id                  INTEGER REFERENCES landservices(id),
      apply_service_lhr_to_whom_id    INTEGER REFERENCES apply_service_lhr_to_whoms(id),
      apply_service_lhr_is_same_project_id INTEGER REFERENCES apply_service_lhr_is_same_projects(id),
      apply_service_cic_to_whom_id    INTEGER REFERENCES apply_service_cic_to_whoms(id),
      region_id                       INTEGER REFERENCES regions(id),
      district_id                     INTEGER REFERENCES districts(id),
      plot_detail_id                  INTEGER REFERENCES plot_details(id),
      industrial_area_detail_id       INTEGER REFERENCES industrial_area_details("Id"),
      apply_service_status_id         INTEGER REFERENCES apply_service_statuses(id),
      application_no                  VARCHAR(100),
      apply_service_application_no    VARCHAR(100),
      remarks                         TEXT,
      sws_regno                       VARCHAR(100),
      payment_status                  SMALLINT DEFAULT 0,
      payment_date                    DATE,
      is_active                       SMALLINT DEFAULT 1,
      created_at                      TIMESTAMP DEFAULT NOW(),
      updated_at                      TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_service_communications — per-service communication/status trail
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_communications (
      id                              SERIAL PRIMARY KEY,
      apply_service_id                INTEGER REFERENCES apply_services(id),
      industry_application_detail_id  INTEGER REFERENCES industry_application_details(id),
      landservice_id                  INTEGER REFERENCES landservices(id),
      apply_service_status_id         INTEGER REFERENCES apply_service_statuses(id),
      user_id                         INTEGER REFERENCES users(id),
      application_no                  VARCHAR(100),
      apply_service_application_no    VARCHAR(100),
      remarks                         TEXT,
      document                        TEXT,
      is_active                       SMALLINT DEFAULT 1,
      created_at                      TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_service_document_objections — matches schema hints
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_document_objections (
      id                              SERIAL PRIMARY KEY,
      apply_service_id                INTEGER REFERENCES apply_services(id),
      apply_service_document_id       INTEGER REFERENCES apply_service_documents(id),
      apply_service_communication_id  INTEGER REFERENCES apply_service_communications(id),
      apply_service_application_no    VARCHAR(100),
      document                        TEXT,
      is_document_uploaded            SMALLINT DEFAULT 0,
      objection_by                    VARCHAR(100),
      user_name                       VARCHAR(200),
      objection_date                  DATE,
      submission_date                 DATE,
      created_at                      TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_service_upload_documents — uploaded docs per service application
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_upload_documents (
      id                        SERIAL PRIMARY KEY,
      apply_service_id          INTEGER REFERENCES apply_services(id),
      apply_service_document_id INTEGER REFERENCES apply_service_documents(id),
      apply_service_application_no VARCHAR(100),
      document                  TEXT,
      sws_regno                 VARCHAR(100),
      is_active                 SMALLINT DEFAULT 1,
      created_at                TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_service_change_in_constitutions
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_change_in_constitutions (
      id                    SERIAL PRIMARY KEY,
      apply_service_id      INTEGER REFERENCES apply_services(id),
      constitution_id       INTEGER REFERENCES constitutions(id),
      nature_of_activitie_id INTEGER REFERENCES nature_of_activities(id),
      enterprise_type_id    INTEGER REFERENCES enterprise_types(id),
      enterprise_sector_id  INTEGER REFERENCES enterprise_sectors(id),
      created_at            TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_service_change_in_shareholdings
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_change_in_shareholdings (
      id               SERIAL PRIMARY KEY,
      apply_service_id INTEGER REFERENCES apply_services(id),
      created_at       TIMESTAMP DEFAULT NOW()
    )
  `);

  // apply_service_change_of_products
  await pool.query(`
    CREATE TABLE IF NOT EXISTS apply_service_change_of_products (
      id               SERIAL PRIMARY KEY,
      apply_service_id INTEGER REFERENCES apply_services(id),
      created_at       TIMESTAMP DEFAULT NOW()
    )
  `);

  // service_request_document_types
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_request_document_types (
      id             SERIAL PRIMARY KEY,
      landservice_id INTEGER REFERENCES landservices(id),
      name           VARCHAR(300) NOT NULL,
      description    TEXT,
      part           VARCHAR(50),
      "textType"     VARCHAR(50),
      flag           SMALLINT DEFAULT 0,
      status         SMALLINT DEFAULT 1,
      created_at     TIMESTAMP DEFAULT NOW()
    )
  `);

  // service_requests
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_requests (
      id                             SERIAL PRIMARY KEY,
      region_id                      INTEGER REFERENCES regions(id),
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      plot_detail_id                 INTEGER REFERENCES plot_details(id),
      landservice_id                 INTEGER REFERENCES landservices(id),
      service_request_no             VARCHAR(100),
      sws_regno                      VARCHAR(100),
      application_no                 VARCHAR(100),
      status                         SMALLINT DEFAULT 1,
      created_at                     TIMESTAMP DEFAULT NOW(),
      updated_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // service_request_final_communications
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_request_final_communications (
      id                  SERIAL PRIMARY KEY,
      service_request_id  INTEGER REFERENCES service_requests(id),
      user_id             INTEGER REFERENCES users(id),
      group_id            INTEGER REFERENCES groups(id),
      service_request_no  VARCHAR(100),
      application_no      VARCHAR(100),
      remark              TEXT,
      flag                SMALLINT DEFAULT 0,
      objection_reply     TEXT,
      sws_regno           VARCHAR(100),
      objection_reply_date DATE,
      status              SMALLINT DEFAULT 1,
      created_at          TIMESTAMP DEFAULT NOW()
    )
  `);

  // service_request_communications
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_request_communications (
      id                                   SERIAL PRIMARY KEY,
      service_request_final_communication_id INTEGER REFERENCES service_request_final_communications(id),
      service_request_id                   INTEGER REFERENCES service_requests(id),
      service_request_document_type_id     INTEGER REFERENCES service_request_document_types(id),
      user_id                              INTEGER REFERENCES users(id),
      group_id                             INTEGER REFERENCES groups(id),
      service_request_no                   VARCHAR(100),
      application_no                       VARCHAR(100),
      remark                               TEXT,
      flag                                 SMALLINT DEFAULT 0,
      document                             TEXT,
      sws_regno                            VARCHAR(100),
      objection_reply_date                 DATE,
      status                               SMALLINT DEFAULT 1,
      created_at                           TIMESTAMP DEFAULT NOW()
    )
  `);

  // service_request_documents
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_request_documents (
      id                               SERIAL PRIMARY KEY,
      service_request_id               INTEGER REFERENCES service_requests(id),
      service_request_document_type_id INTEGER REFERENCES service_request_document_types(id),
      target                           TEXT,
      status                           SMALLINT DEFAULT 1,
      created_at                       TIMESTAMP DEFAULT NOW()
    )
  `);

  // service_request_plotdetails
  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_request_plotdetails (
      id                             SERIAL PRIMARY KEY,
      service_request_id             INTEGER REFERENCES service_requests(id),
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      service_request_no             VARCHAR(100),
      khata_no                       VARCHAR(100),
      plot_no                        VARCHAR(50),
      sws_regno                      VARCHAR(100),
      application_no                 VARCHAR(100),
      flag                           SMALLINT DEFAULT 0,
      status                         SMALLINT DEFAULT 1,
      created_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // certificates
  await pool.query(`
    CREATE TABLE IF NOT EXISTS certificates (
      id                        SERIAL PRIMARY KEY,
      sws_regno                 VARCHAR(100),
      certificate_type          VARCHAR(100),
      certificate_name          VARCHAR(300),
      applicant_name            VARCHAR(300),
      designation               VARCHAR(100),
      halka                     VARCHAR(100),
      circle                    VARCHAR(100),
      name_unit                 VARCHAR(300),
      address_unit              TEXT,
      type_industry             VARCHAR(100),
      registration_no           VARCHAR(100),
      registration_date         DATE,
      gstin_no                  VARCHAR(20),
      product                   TEXT,
      cer_month                 SMALLINT,
      cer_year                  SMALLINT,
      status                    SMALLINT DEFAULT 1,
      region_id                 INTEGER REFERENCES regions(id),
      district_id               INTEGER REFERENCES districts(id),
      industrial_area_detail_id INTEGER REFERENCES industrial_area_details("Id"),
      area_type_id              INTEGER REFERENCES area_types(id),
      nature_industry           VARCHAR(100),
      file1                     TEXT,
      file2                     TEXT,
      file3                     TEXT,
      remarks                   TEXT,
      industrial_area_flag      SMALLINT DEFAULT 0,
      created_at                TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS certificate_documents (
      id             SERIAL PRIMARY KEY,
      certificate_id INTEGER NOT NULL REFERENCES certificates(id),
      document_type  VARCHAR(100),
      document       TEXT,
      created_date   TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS certificate_plotdetails (
      id             SERIAL PRIMARY KEY,
      certificate_id INTEGER NOT NULL REFERENCES certificates(id),
      khata_no       VARCHAR(100),
      plot_no        VARCHAR(50),
      created_date   TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS operational_certificates (
      id               SERIAL PRIMARY KEY,
      certificate_id   INTEGER NOT NULL REFERENCES certificates(id),
      certificate_name VARCHAR(300),
      cer_month        SMALLINT,
      cer_year         SMALLINT,
      status           SMALLINT DEFAULT 1,
      remarks          TEXT,
      created_date     TIMESTAMP DEFAULT NOW()
    )
  `);

  // notices
  await pool.query(`
    CREATE TABLE IF NOT EXISTS notices (
      id         SERIAL PRIMARY KEY,
      region_id  INTEGER REFERENCES regions(id),
      title      VARCHAR(300) NOT NULL,
      file       TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // queries
  await pool.query(`
    CREATE TABLE IF NOT EXISTS queries (
      id         SERIAL PRIMARY KEY,
      region_id  INTEGER REFERENCES regions(id),
      query      TEXT,
      attachment TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // in_out_boxes
  await pool.query(`
    CREATE TABLE IF NOT EXISTS in_out_boxes (
      id                         SERIAL PRIMARY KEY,
      region_id                  INTEGER REFERENCES regions(id),
      plot_detail_id             INTEGER REFERENCES plot_details(id),
      application_id             INTEGER REFERENCES industry_application_details(id),
      sws_regno                  VARCHAR(100),
      plot_name                  VARCHAR(200),
      application_no             VARCHAR(100),
      recievername               VARCHAR(200),
      reciever_email_address     VARCHAR(150),
      mobile                     VARCHAR(15),
      subjectline                VARCHAR(300),
      s_body_msg                 TEXT,
      r_body_msg                 TEXT,
      attachments_file           TEXT,
      req_document_attachment    SMALLINT DEFAULT 0,
      req_applicant_details_update SMALLINT DEFAULT 0,
      reference                  VARCHAR(200),
      start_date                 DATE,
      close_date                 DATE,
      created_date               TIMESTAMP DEFAULT NOW(),
      sender_status              SMALLINT DEFAULT 0,
      receiver_status            SMALLINT DEFAULT 0,
      sender_attach_document     TEXT
    )
  `);

  // topics
  await pool.query(`
    CREATE TABLE IF NOT EXISTS topics (
      id         SERIAL PRIMARY KEY,
      user_id    INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // wishlists
  await pool.query(`
    CREATE TABLE IF NOT EXISTS wishlists (
      id                        SERIAL PRIMARY KEY,
      name                      VARCHAR(200),
      region_id                 INTEGER REFERENCES regions(id),
      district_id               INTEGER REFERENCES districts(id),
      industrial_area_detail_id INTEGER REFERENCES industrial_area_details("Id"),
      plot_detail_id            INTEGER REFERENCES plot_details(id),
      land_notification_id      INTEGER REFERENCES land_notifications("Id"),
      email                     VARCHAR(150),
      created_at                TIMESTAMP DEFAULT NOW()
    )
  `);

  // land_availabilities
  await pool.query(`
    CREATE TABLE IF NOT EXISTS land_availabilities (
      id                   SERIAL PRIMARY KEY,
      region_id            INTEGER REFERENCES regions(id),
      district_id          INTEGER REFERENCES districts(id),
      enterprise_sector_id INTEGER REFERENCES enterprise_sectors(id),
      land_availability    DECIMAL(12, 4),
      sectors              TEXT,
      created_at           TIMESTAMP DEFAULT NOW()
    )
  `);

  // requirements
  await pool.query(`
    CREATE TABLE IF NOT EXISTS requirements (
      id                        SERIAL PRIMARY KEY,
      region_id                 INTEGER REFERENCES regions(id),
      district_id               INTEGER REFERENCES districts(id),
      industrial_area_detail_id INTEGER REFERENCES industrial_area_details("Id"),
      enterprise_sector_id      INTEGER REFERENCES enterprise_sectors(id),
      plot_detail_id            INTEGER REFERENCES plot_details(id),
      land_required             DECIMAL(12, 4),
      proposed_investment       DECIMAL(15, 2),
      date                      DATE,
      created_at                TIMESTAMP DEFAULT NOW()
    )
  `);

  // pcc_schedules
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pcc_schedules (
      id                   SERIAL PRIMARY KEY,
      region_id            INTEGER REFERENCES regions(id),
      land_notification_id INTEGER REFERENCES land_notifications("Id"),
      pcc_date             DATE,
      receivers            TEXT,
      status               SMALLINT DEFAULT 1,
      created_at           TIMESTAMP DEFAULT NOW()
    )
  `);

  // indarea_price_yr_masters
  await pool.query(`
    CREATE TABLE IF NOT EXISTS indarea_price_yr_masters (
      id                        SERIAL PRIMARY KEY,
      industrial_area_detail_id INTEGER REFERENCES industrial_area_details("Id"),
      financial_year_id         INTEGER REFERENCES financial_years(id),
      base_land_rate            DECIMAL(15, 2),
      base_land_rate_shade      DECIMAL(15, 2),
      base_land_rate_service    DECIMAL(15, 2),
      base_land_rate_mega       DECIMAL(15, 2),
      base_land_rate_commerical DECIMAL(15, 2),
      base_land_rate_other      DECIMAL(15, 2),
      land_annual_rent          DECIMAL(15, 2),
      land_annual_maintenance   DECIMAL(15, 2),
      possession_fees           DECIMAL(15, 2),
      created_at                TIMESTAMP DEFAULT NOW()
    )
  `);

  // plot_details_logs
  await pool.query(`
    CREATE TABLE IF NOT EXISTS plot_details_logs (
      id                        SERIAL PRIMARY KEY,
      plot_detail_id            INTEGER REFERENCES plot_details(id),
      district_id               INTEGER REFERENCES districts(id),
      industrial_area_detail_id INTEGER REFERENCES industrial_area_details("Id"),
      enterprise_sector_id      INTEGER REFERENCES enterprise_sectors(id),
      area_type_id              INTEGER REFERENCES area_types(id),
      land_notification_id      INTEGER REFERENCES land_notifications("Id"),
      region_id                 INTEGER REFERENCES regions(id),
      user_id                   INTEGER REFERENCES users(id),
      plot_name                 VARCHAR(200),
      totalarea                 DECIMAL(12, 4),
      processing_fee            DECIMAL(15, 2),
      reserve_price             DECIMAL(15, 2),
      floor_price               DECIMAL(15, 2),
      existing_infrastructure_charge DECIMAL(15, 2),
      total_trees               INTEGER,
      trees_type                VARCHAR(100),
      remarks                   TEXT,
      plot_details_status       VARCHAR(50),
      date_of_allotment         DATE,
      circle                    VARCHAR(100),
      mouja                     VARCHAR(100),
      khata_no                  VARCHAR(100),
      industry_type             VARCHAR(100),
      created_at                TIMESTAMP DEFAULT NOW()
    )
  `);

  // plot_khatas
  await pool.query(`
    CREATE TABLE IF NOT EXISTS plot_khatas (
      id         SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // plot_additionals
  await pool.query(`
    CREATE TABLE IF NOT EXISTS plot_additionals (
      id         SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // shareholders (referenced in industry_application_details hasMany)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS shareholders (
      id                             SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      name                           VARCHAR(200),
      share_percentage               DECIMAL(6, 2),
      created_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // send_fails
  await pool.query(`
    CREATE TABLE IF NOT EXISTS send_fails (
      id                             SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      message                        TEXT,
      created_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // land_tree_reports
  await pool.query(`
    CREATE TABLE IF NOT EXISTS land_tree_reports (
      id         SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  // landallotes
  await pool.query(`
    CREATE TABLE IF NOT EXISTS landallotes (
      id         SERIAL PRIMARY KEY,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);
};
