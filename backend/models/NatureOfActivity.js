import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class NatureOfActivity extends Model {}

NatureOfActivity.init(
  {
    id: {
      type:          DataTypes.INTEGER,
      primaryKey:    true,
      autoIncrement: true,
    },
    name: {
      type:      DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull:  { msg: 'name is required' },
        notEmpty: { msg: 'name cannot be empty' },
        len:      { args: [1, 100], msg: 'name must be between 1 and 100 characters' },
      },
    },
  },
  {
    sequelize,
    modelName:   'NatureOfActivity',
    tableName:   'nature_of_activities',
    timestamps:  false,
    underscored: true,
  }
);

export default NatureOfActivity;
