import bcrypt from 'bcryptjs';
import pool   from '../../config/db.js';

// Default credentials — change immediately after first login
const DEFAULT_USERS = [
  {
    group_name: 'System Admin',
    name:       'System Administrator',
    username:   'sysadmin',
    email:      'sysadmin@jiada.gov.in',
    phone:      '9000000001',
    password:   'Admin@1234',
  },
  {
    group_name: 'Jiada Admin',
    name:       'JIADA Administrator',
    username:   'jiadaadmin',
    email:      'jiadaadmin@jiada.gov.in',
    phone:      '9000000002',
    password:   'Admin@1234',
  },
];

export const up = async () => {
  for (const user of DEFAULT_USERS) {
    // Resolve group_id by name so this is not tied to hardcoded ids
    const { rows: groupRows } = await pool.query(
      `SELECT id FROM groups WHERE name = $1`,
      [user.group_name]
    );

    if (!groupRows.length) {
      console.warn(`  ⚠ Group "${user.group_name}" not found — skipping default user "${user.username}"`);
      continue;
    }

    // Idempotency check: skip if username OR email already taken
    const { rows: existing } = await pool.query(
      `SELECT id FROM users WHERE username = $1 OR email = $2`,
      [user.username, user.email]
    );

    if (existing.length > 0) {
      console.log(`  → Default user "${user.username}" already exists, skipping`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);

    await pool.query(
      `INSERT INTO users (group_id, name, username, password, email, phone, status)
       VALUES ($1, $2, $3, $4, $5, $6, 1)`,
      [groupRows[0].id, user.name, user.username, hashedPassword, user.email, user.phone]
    );

    console.log(`  ✓ Default user "${user.username}" (${user.group_name}) created`);
  }
};
