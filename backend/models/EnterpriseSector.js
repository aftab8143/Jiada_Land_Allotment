import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

// Allows letters, digits, spaces, and common punctuation (/  ,  .  (  )  -)
// Must contain at least one letter (rejects pure-numeric names)
const NAME_REGEX = /^(?![0-9]*$)[a-zA-Z0-9 /,.()''-]+$/;

class EnterpriseSector extends Model {}

EnterpriseSector.init(
  {
    id: {
      type:          DataTypes.INTEGER,
      primaryKey:    true,
      autoIncrement: true,
    },
    name: {
      type:      DataTypes.STRING(255),
      allowNull: false,
      unique:    { name: 'enterprise_sectors_name_key', msg: 'Sector name already exists' },
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
    modelName:   'EnterpriseSector',
    tableName:   'enterprise_sectors',
    timestamps:  true,
    createdAt:   'created_at',
    updatedAt:   'updated_at',
    underscored: true,
  }
);

export default EnterpriseSector;
