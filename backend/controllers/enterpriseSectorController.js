import EnterpriseSector from '../models/EnterpriseSector.js';
import IndustryDetail   from '../models/IndustryDetail.js';

// GET /api/enterprise-sectors
export const index = async (_req, res) => {
  try {
    const sectors = await EnterpriseSector.findAll({ order: [['id', 'ASC']] });
    return res.json(sectors);
  } catch (err) {
    console.error('EnterpriseSector index error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/enterprise-sectors/:id
export const view = async (req, res) => {
  try {
    const sector = await EnterpriseSector.findByPk(req.params.id, {
      include: [{ model: IndustryDetail, as: 'industryDetails', attributes: ['id', 'enterprise_name'] }],
    });
    if (!sector) return res.status(404).json({ message: 'Enterprise sector not found' });
    return res.json(sector);
  } catch (err) {
    console.error('EnterpriseSector view error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/enterprise-sectors
export const add = async (req, res) => {
  try {
    const sector = await EnterpriseSector.create({ name: req.body.name });
    return res.status(201).json({ message: 'Enterprise sector created', sector });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Enterprise sector name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('EnterpriseSector add error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/enterprise-sectors/:id
export const edit = async (req, res) => {
  try {
    const sector = await EnterpriseSector.findByPk(req.params.id);
    if (!sector) return res.status(404).json({ message: 'Enterprise sector not found' });
    await sector.update({ name: req.body.name ?? sector.name });
    return res.json({ message: 'Enterprise sector updated', sector });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Enterprise sector name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('EnterpriseSector edit error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/enterprise-sectors/:id
export const deleteEnterpriseSector = async (req, res) => {
  try {
    const sector = await EnterpriseSector.findByPk(req.params.id);
    if (!sector) return res.status(404).json({ message: 'Enterprise sector not found' });
    await sector.destroy();
    return res.json({ message: 'Enterprise sector deleted' });
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ message: 'Cannot delete: sector is referenced by industry records' });
    }
    console.error('EnterpriseSector delete error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
