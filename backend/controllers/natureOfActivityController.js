import NatureOfActivity from '../models/NatureOfActivity.js';
import IndustryDetail   from '../models/IndustryDetail.js';

// GET /api/nature-of-activities
export const index = async (req, res) => {
  try {
    const activities = await NatureOfActivity.findAll({ order: [['name', 'ASC']] });
    return res.json(activities);
  } catch (err) {
    console.error('NatureOfActivity index error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/nature-of-activities/:id
export const view = async (req, res) => {
  try {
    const activity = await NatureOfActivity.findByPk(req.params.id, {
      include: [{
        model:      IndustryDetail,
        as:         'industryDetails',
        attributes: ['id', 'enterprise_name'],
      }],
    });
    if (!activity) return res.status(404).json({ message: 'Nature of activity not found' });
    return res.json(activity);
  } catch (err) {
    console.error('NatureOfActivity view error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/nature-of-activities
export const add = async (req, res) => {
  try {
    const activity = await NatureOfActivity.create({ name: req.body.name });
    return res.status(201).json({ message: 'Nature of activity created', activity });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Nature of activity name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('NatureOfActivity add error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/nature-of-activities/:id
export const edit = async (req, res) => {
  try {
    const activity = await NatureOfActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Nature of activity not found' });
    await activity.update({ name: req.body.name });
    return res.json({ message: 'Nature of activity updated', activity });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Nature of activity name already exists' });
    }
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('NatureOfActivity edit error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/nature-of-activities/:id
export const deleteActivity = async (req, res) => {
  try {
    const activity = await NatureOfActivity.findByPk(req.params.id);
    if (!activity) return res.status(404).json({ message: 'Nature of activity not found' });
    await activity.destroy();
    return res.json({ message: 'Nature of activity deleted' });
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ message: 'Cannot delete: activity is referenced by existing industry details' });
    }
    console.error('NatureOfActivity delete error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
