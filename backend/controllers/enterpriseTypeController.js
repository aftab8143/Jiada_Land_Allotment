import EnterpriseType from '../models/EnterpriseType.js';
import IndustryDetail  from '../models/IndustryDetail.js';

// GET /api/enterprise-types
export const index = async (_req, res) => {
  try {
    const types = await EnterpriseType.findAll({ order: [['id', 'ASC']] });
    return res.json(types);
  } catch (err) {
    console.error('EnterpriseType index error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/enterprise-types/:id
export const view = async (req, res) => {
  try {
    const type = await EnterpriseType.findByPk(req.params.id, {
      include: [{ model: IndustryDetail, as: 'industryDetails', attributes: ['id', 'enterprise_name'] }],
    });
    if (!type) return res.status(404).json({ message: 'Enterprise type not found' });
    return res.json(type);
  } catch (err) {
    console.error('EnterpriseType view error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/enterprise-types
export const add = async (req, res) => {
  try {
    const type = await EnterpriseType.create({ name: req.body.name });
    return res.status(201).json({ message: 'Enterprise type created', type });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Enterprise type name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('EnterpriseType add error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/enterprise-types/:id
export const edit = async (req, res) => {
  try {
    const type = await EnterpriseType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Enterprise type not found' });
    await type.update({ name: req.body.name ?? type.name });
    return res.json({ message: 'Enterprise type updated', type });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Enterprise type name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('EnterpriseType edit error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/enterprise-types/:id
export const deleteEnterpriseType = async (req, res) => {
  try {
    const type = await EnterpriseType.findByPk(req.params.id);
    if (!type) return res.status(404).json({ message: 'Enterprise type not found' });
    await type.destroy();
    return res.json({ message: 'Enterprise type deleted' });
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ message: 'Cannot delete: type is referenced by industry records' });
    }
    console.error('EnterpriseType delete error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
