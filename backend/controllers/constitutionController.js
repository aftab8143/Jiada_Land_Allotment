import Constitution   from '../models/Constitution.js';
import IndustryDetail from '../models/IndustryDetail.js';

// GET /api/constitutions
export const index = async (req, res) => {
  try {
    const constitutions = await Constitution.findAll({ order: [['name', 'ASC']] });
    return res.json(constitutions);
  } catch (err) {
    console.error('Constitution index error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/constitutions/:id
export const view = async (req, res) => {
  try {
    const constitution = await Constitution.findByPk(req.params.id, {
      include: [{ model: IndustryDetail, as: 'industryDetails', attributes: ['id', 'enterprise_name'] }],
    });
    if (!constitution) return res.status(404).json({ message: 'Constitution not found' });
    return res.json(constitution);
  } catch (err) {
    console.error('Constitution view error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/constitutions
export const add = async (req, res) => {
  try {
    const constitution = await Constitution.create({ name: req.body.name });
    return res.status(201).json({ message: 'Constitution created', constitution });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Constitution name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('Constitution add error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/constitutions/:id
export const edit = async (req, res) => {
  try {
    const constitution = await Constitution.findByPk(req.params.id);
    if (!constitution) return res.status(404).json({ message: 'Constitution not found' });
    await constitution.update({ name: req.body.name });
    return res.json({ message: 'Constitution updated', constitution });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Constitution name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('Constitution edit error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/constitutions/:id
export const deleteConstitution = async (req, res) => {
  try {
    const constitution = await Constitution.findByPk(req.params.id);
    if (!constitution) return res.status(404).json({ message: 'Constitution not found' });
    await constitution.destroy();
    return res.json({ message: 'Constitution deleted' });
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ message: 'Cannot delete: constitution is referenced by existing industry details' });
    }
    console.error('Constitution delete error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
