import FinancialYear from '../models/FinancialYear.js';

// GET /api/financial-year
export const index = async (_req, res) => {
  try {
    const years = await FinancialYear.findAll({ order: [['id', 'ASC']] });
    return res.json(years);
  } catch (err) {
    console.error('FinancialYear index error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /api/financial-year/:id
export const view = async (req, res) => {
  try {
    const year = await FinancialYear.findByPk(req.params.id);
    if (!year) return res.status(404).json({ message: 'Financial year not found' });
    return res.json(year);
  } catch (err) {
    console.error('FinancialYear view error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /api/financial-year
export const add = async (req, res) => {
  try {
    const { financial_year, start_date, end_date } = req.body;
    const year = await FinancialYear.create({
      financial_year: financial_year ?? null,
      start_date:     start_date     ?? null,
      end_date:       end_date       ?? null,
    });
    return res.status(201).json({ message: 'Financial year created', year });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('FinancialYear add error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /api/financial-year/:id
export const edit = async (req, res) => {
  try {
    const year = await FinancialYear.findByPk(req.params.id);
    if (!year) return res.status(404).json({ message: 'Financial year not found' });
    const { financial_year, start_date, end_date } = req.body;
    await year.update({
      financial_year: financial_year ?? year.financial_year,
      start_date:     start_date     ?? year.start_date,
      end_date:       end_date       ?? year.end_date,
    });
    return res.json({ message: 'Financial year updated', year });
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(422).json({ message: 'Validation failed', errors: err.errors.map(e => e.message) });
    }
    console.error('FinancialYear edit error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /api/financial-year/:id
export const deleteFinancialYear = async (req, res) => {
  try {
    const year = await FinancialYear.findByPk(req.params.id);
    if (!year) return res.status(404).json({ message: 'Financial year not found' });
    await year.destroy();
    return res.json({ message: 'Financial year deleted' });
  } catch (err) {
    if (err.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(409).json({ message: 'Cannot delete: financial year is referenced by other records' });
    }
    console.error('FinancialYear delete error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
