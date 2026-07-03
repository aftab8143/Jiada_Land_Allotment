import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class FinancialYear extends Model {}

FinancialYear.init(
  {
    id: {
      type:          DataTypes.INTEGER,
      primaryKey:    true,
      autoIncrement: true,
    },
    financial_year: {
      type:      DataTypes.STRING(50),
      allowNull: true,
      validate: {
        isValidFormat(value) {
          if (value !== null && value !== undefined && value !== '') {
            if (!/^\d{4}-\d{4}$/.test(value)) {
              throw new Error('financial_year must be in format YYYY-YYYY (e.g. 2024-2025)');
            }
            const [start, end] = value.split('-').map(Number);
            if (end !== start + 1) {
              throw new Error('financial_year end year must be exactly one more than start year');
            }
          }
        },
      },
    },
    start_date: {
      type:      DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type:      DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName:   'FinancialYear',
    tableName:   'financial_year',
    timestamps:  false,
    underscored: true,
  }
);

export default FinancialYear;
