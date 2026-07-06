const FY_PATTERN  = /^\d{4}-\d{4}$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export const validateFinancialYear = (req, res, next) => {
  const { financial_year, start_date, end_date } = req.body;
  const errors = [];

  if (financial_year !== undefined && financial_year !== null && financial_year !== '') {
    if (typeof financial_year !== 'string') {
      errors.push('financial_year must be a string');
    } else if (!FY_PATTERN.test(financial_year.trim())) {
      errors.push('financial_year must be in format YYYY-YYYY (e.g. 2024-2025)');
    } else {
      const [start, end] = financial_year.trim().split('-').map(Number);
      if (end !== start + 1) {
        errors.push('financial_year end year must be exactly one more than start year');
      }
    }
  }

  if (start_date !== undefined && start_date !== null && start_date !== '') {
    if (!DATE_PATTERN.test(String(start_date))) {
      errors.push('start_date must be in format YYYY-MM-DD');
    }
  }

  if (end_date !== undefined && end_date !== null && end_date !== '') {
    if (!DATE_PATTERN.test(String(end_date))) {
      errors.push('end_date must be in format YYYY-MM-DD');
    }
  }

  if (errors.length > 0) {
    return res.status(422).json({ message: 'Validation failed', errors });
  }

  if (typeof financial_year === 'string') req.body.financial_year = financial_year.trim();
  next();
};
