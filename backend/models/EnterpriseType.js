import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

const NAME_REGEX = /^(?![0-9]*$)[a-zA-Z0-9 /,.()''-]+$/;

class EnterpriseType extends Model {}

EnterpriseType.init(
  {
    id: {
      type:          DataTypes.INTEGER,
      primaryKey:    true,
      autoIncrement: true,
    },
    name: {
      type:      DataTypes.STRING(255),
      allowNull: false,
      unique:    { name: 'enterprise_types_name_key', msg: 'Type name already exists' },
      validate: {
        notNull:  { msg: 'name is required' },
        notEmpty: { msg: 'name cannot be empty' },
        len:      { args: [1, 255], msg: 'name must be between 1 and 255 characters' },
        is: {
          args: NAME_REGEX,
          msg:  'name may only contain letters, numbers, spaces, and /  ,  .  (  )  -',
        },
      },
    },
  },
  {
    sequelize,
    modelName:   'EnterpriseType',
    tableName:   'enterprise_types',
    timestamps:  true,
    createdAt:   'created_at',
    updatedAt:   'updated_at',
    underscored: true,
  }
);

export default EnterpriseType;
