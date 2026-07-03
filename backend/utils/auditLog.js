import pool from '../config/db.js';

// Writes an immutable audit entry (FR-21).
// Never throws — a logging failure must not break the main request.
export const logAction = async ({ user_id = null, action, entity_name = null, entity_id = null, ip_address = null, remarks = null }) => {
  try {
    await pool.query(
      `INSERT INTO audit_log (user_id, action, entity_name, entity_id, ip_address, remarks)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [user_id, action, entity_name, entity_id, ip_address, remarks]
    );
  } catch (err) {
    console.error('Audit log write failed:', err.message);
  }
};
