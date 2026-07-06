import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class Constitution extends Model {}

Constitution.init(
  {
    id: {
      type:          DataTypes.INTEGER,
      primaryKey:    true,
      autoIncrement: true,
    },
    name: {
      type:      DataTypes.STRING(255),
      allowNull: false,
      unique:    { name: 'constitutions_name_key', msg: 'Constitution name already exists' },
      validate: {
        notNull:  { msg: 'name is required' },
        notEmpty: { msg: 'name cannot be empty' },
        len:      { args: [1, 255], msg: 'name must be between 1 and 255 characters' },
      },
    },
  },
  {
    sequelize,
    modelName:   'Constitution',
    tableName:   'constitutions',
    timestamps:  true,
    createdAt:   'created_at',
    updatedAt:   'updated_at',
    underscored: true,
  }
);

export default Constitution;
