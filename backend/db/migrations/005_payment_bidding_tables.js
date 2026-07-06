import pool from '../../config/db.js';

export const up = async () => {
  // allotments — matches schema: id, region_id, plot_detail_id,
  //   industry_application_detail_id, provisional_letter, allotment_sector,
  //   industry_category
  await pool.query(`
    CREATE TABLE IF NOT EXISTS allotments (
      id                             SERIAL PRIMARY KEY,
      region_id                      INTEGER REFERENCES regions(id),
      plot_detail_id                 INTEGER REFERENCES plot_details(id),
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      provisional_letter             TEXT,
      allotment_sector               VARCHAR(100),
      industry_category              VARCHAR(100),
      created_at                     TIMESTAMP DEFAULT NOW(),
      updated_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // demand_dues — matches schema: id, industry_application_detail_id, feemaster_id,
  //   allotment_id, plot_detail_id, financial_year_id, plus financial fields
  await pool.query(`
    CREATE TABLE IF NOT EXISTS demand_dues (
      id                             SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      feemaster_id                   INTEGER REFERENCES feemasters(id),
      allotment_id                   INTEGER REFERENCES allotments(id),
      plot_detail_id                 INTEGER REFERENCES plot_details(id),
      financial_year_id              INTEGER REFERENCES financial_years(id),
      descriptions_remarks           TEXT,
      land_incentive                 DECIMAL(15, 2),
      amount_payable                 DECIMAL(15, 2),
      gst_flag                       SMALLINT DEFAULT 0,
      interest_flag_5_SI             SMALLINT DEFAULT 0,
      "pInterest_flag_15_CI"         SMALLINT DEFAULT 0,
      net_emi                        DECIMAL(15, 2),
      total_instalments_no           INTEGER,
      no_installment_paid            INTEGER DEFAULT 0,
      net_amount_payable             DECIMAL(15, 2),
      status                         SMALLINT DEFAULT 0,
      created_at                     TIMESTAMP DEFAULT NOW(),
      updated_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // installments — matches schema: id, allotment_id, net_emi, status
  await pool.query(`
    CREATE TABLE IF NOT EXISTS installments (
      id           SERIAL PRIMARY KEY,
      allotment_id INTEGER REFERENCES allotments(id),
      net_emi      DECIMAL(15, 2),
      status       SMALLINT DEFAULT 0,
      created_at   TIMESTAMP DEFAULT NOW()
    )
  `);

  // transactions — matches schema: id, industry_application_detail_id,
  //   txnid, txnstatus, amount, pgtxnno, issuerrefno, authidcode,
  //   firstname, lastname, pgrespcode, pincode, signature, status
  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id                             SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      txnid                          VARCHAR(200),
      txnstatus                      VARCHAR(50),
      amount                         DECIMAL(15, 2),
      pgtxnno                        VARCHAR(200),
      issuerrefno                    VARCHAR(200),
      authidcode                     VARCHAR(200),
      firstname                      VARCHAR(200),
      lastname                       VARCHAR(200),
      pgrespcode                     VARCHAR(50),
      pincode                        VARCHAR(10),
      signature                      TEXT,
      status                         SMALLINT DEFAULT 0,
      created_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // rtgs_details — matches schema: id, industry_application_detail_id, region_id,
  //   totalarea_type, ifsc_code, branch, bank, utr_no, amount, payment_date
  await pool.query(`
    CREATE TABLE IF NOT EXISTS rtgs_details (
      id                             SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      region_id                      INTEGER REFERENCES regions(id),
      totalarea_type                 VARCHAR(50),
      ifsc_code                      VARCHAR(20),
      branch                         VARCHAR(200),
      bank                           VARCHAR(200),
      utr_no                         VARCHAR(100),
      amount                         DECIMAL(15, 2),
      payment_date                   DATE,
      created_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // biddings — matches schema: id, region_id, plot_detail_id,
  //   emd_amount, start_date, end_date, status, created_date
  await pool.query(`
    CREATE TABLE IF NOT EXISTS biddings (
      id             SERIAL PRIMARY KEY,
      region_id      INTEGER REFERENCES regions(id),
      plot_detail_id INTEGER REFERENCES plot_details(id),
      emd_amount     DECIMAL(15, 2),
      start_date     DATE,
      end_date       DATE,
      status         SMALLINT DEFAULT 1,
      created_date   TIMESTAMP DEFAULT NOW()
    )
  `);

  // bidder_emds — matches schema: id, region_id, plot_emd_id,
  //   industry_application_detail_id, emd_submit, emd_submit_date, created_date
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bidder_emds (
      id                             SERIAL PRIMARY KEY,
      region_id                      INTEGER REFERENCES regions(id),
      plot_emd_id                    INTEGER REFERENCES plot_emds(id),
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      emd_submit                     SMALLINT DEFAULT 0,
      emd_submit_date                DATE,
      created_date                   TIMESTAMP DEFAULT NOW()
    )
  `);

  // bidders — matches schema: id, region_id, plot_emd_id,
  //   industry_application_detail_id, bidding_id, emd_submit, emd_submit_date, created_date
  await pool.query(`
    CREATE TABLE IF NOT EXISTS bidders (
      id                             SERIAL PRIMARY KEY,
      region_id                      INTEGER REFERENCES regions(id),
      plot_emd_id                    INTEGER REFERENCES plot_emds(id),
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      bidding_id                     INTEGER REFERENCES biddings(id),
      emd_submit                     SMALLINT DEFAULT 0,
      emd_submit_date                DATE,
      created_date                   TIMESTAMP DEFAULT NOW()
    )
  `);

  // advances — matches schema: id, industry_application_detail_id, sws_reg_no,
  //   total_advance_amount, adjusted_amount, current_bal_amount, descriptions, date
  await pool.query(`
    CREATE TABLE IF NOT EXISTS advances (
      id                             SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      sws_reg_no                     VARCHAR(100),
      total_advance_amount           DECIMAL(15, 2),
      adjusted_amount                DECIMAL(15, 2),
      current_bal_amount             DECIMAL(15, 2),
      descriptions                   TEXT,
      date                           DATE,
      created_at                     TIMESTAMP DEFAULT NOW()
    )
  `);

  // balances — matches schema: id, industry_application_detail_id, sws_reg_no,
  //   total_advance_amount, adjusted_amount, current_bal_amount, date, created_date
  await pool.query(`
    CREATE TABLE IF NOT EXISTS balances (
      id                             SERIAL PRIMARY KEY,
      industry_application_detail_id INTEGER REFERENCES industry_application_details(id),
      sws_reg_no                     VARCHAR(100),
      total_advance_amount           DECIMAL(15, 2),
      adjusted_amount                DECIMAL(15, 2),
      current_bal_amount             DECIMAL(15, 2),
      date                           DATE,
      created_date                   TIMESTAMP DEFAULT NOW()
    )
  `);
};
