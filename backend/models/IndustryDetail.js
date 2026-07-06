import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize.js';

class IndustryDetail extends Model {}

IndustryDetail.init(
  {
    id: {
      type:          DataTypes.INTEGER,
      primaryKey:    true,
      autoIncrement: true,
    },
    industry_application_detail_id: {
      type:      DataTypes.INTEGER,
      allowNull: false,
    },
    enterprise_name: {
      type: DataTypes.STRING(300),
    },
    enterprise_sector_id: {
      type:       DataTypes.INTEGER,
      references: { model: 'enterprise_sectors', key: 'id' },
    },
    enterprise_type_id: {
      type:       DataTypes.INTEGER,
      references: { model: 'enterprise_types', key: 'id' },
    },
    constitution_id:        { type: DataTypes.INTEGER },
    nature_of_activity_id:  { type: DataTypes.INTEGER },
    cin:                    { type: DataTypes.STRING(30) },
    investment_total:       { type: DataTypes.DECIMAL(15, 2) },
    totemployee:            { type: DataTypes.INTEGER },
  },
  {
    sequelize,
    modelName:  'IndustryDetail',
    tableName:  'industry_details',
    timestamps: true,
    createdAt:  'created_at',
    updatedAt:  'updated_at',
  }
);

export default IndustryDetail;
