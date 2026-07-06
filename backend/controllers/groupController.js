import pool from '../config/db.js';
import { logAction } from '../utils/auditLog.js';

// GET /api/groups
export const index = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, default_role, created_at FROM groups ORDER BY id');
    return res.json({ status: true, groups: result.rows });
  } catch (err) {
    console.error('Group index error:', err);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

// GET /api/groups/:id
export const view = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, default_role, created_at FROM groups WHERE id = $1',
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ status: false, message: 'Group not found' });
    return res.json({ status: true, group: result.rows[0] });
  } catch (err) {
    console.error('Group view error:', err);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

// POST /api/groups  (admin only)
export const add = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ status: false, message: 'name is required' });
    }

    const result = await pool.query(
      'INSERT INTO groups (name, default_role) VALUES ($1, FALSE) RETURNING id, name, default_role, created_at',
      [name]
    );
    const group = result.rows[0];

    await logAction({
      user_id: req.user?.id,
      action: 'GROUP_ADD',
      entity_name: 'groups',
      entity_id: group.id,
      ip_address: req.ip,
      remarks: `Added group '${group.name}'`,
    });

    return res.status(201).json({ status: true, message: 'Group created', group });
  } catch (err) {
    console.error('Group add error:', err);
    if (err.code === '23505') {
      return res.status(409).json({ status: false, message: 'Group name already exists' });
    }
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

// PUT /api/groups/:id  (admin only)
export const edit = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ status: false, message: 'name is required' });
    }

    const result = await pool.query(
      'UPDATE groups SET name = $1, default_role = FALSE WHERE id = $2 RETURNING id, name, default_role, created_at',
      [name, req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ status: false, message: 'Group not found' });
    const group = result.rows[0];

    await logAction({
      user_id: req.user?.id,
      action: 'GROUP_EDIT',
      entity_name: 'groups',
      entity_id: group.id,
      ip_address: req.ip,
      remarks: `Edited group '${group.name}'`,
    });

    return res.json({ status: true, message: 'Group updated', group });
  } catch (err) {
    console.error('Group edit error:', err);
    if (err.code === '23505') {
      return res.status(409).json({ status: false, message: 'Group name already exists' });
    }
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

// DELETE /api/groups/:id  (admin only)
export const deleteGroup = async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM groups WHERE id = $1 RETURNING id, name',
      [req.params.id]
    );
    if (!result.rows[0]) return res.status(404).json({ status: false, message: 'Group not found' });
    const group = result.rows[0];

    await logAction({
      user_id: req.user?.id,
      action: 'GROUP_DELETE',
      entity_name: 'groups',
      entity_id: group.id,
      ip_address: req.ip,
      remarks: `Deleted group '${group.name}'`,
    });

    return res.json({ status: true, message: 'Group deleted' });
  } catch (err) {
    console.error('Group delete error:', err);
    if (err.code === '23503') {
      return res.status(409).json({ status: false, message: 'Cannot delete: group is referenced by existing users' });
    }
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
