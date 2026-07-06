import EnterpriseSector from './EnterpriseSector.js';
import EnterpriseType   from './EnterpriseType.js';
import IndustryDetail   from './IndustryDetail.js';
import Constitution     from './Constitution.js';
import NatureOfActivity from './NatureOfActivity.js';

// EnterpriseSector hasMany IndustryDetail
EnterpriseSector.hasMany(IndustryDetail, {
  foreignKey: 'enterprise_sector_id',
  as:         'industryDetails',
  onDelete:   'RESTRICT',
  onUpdate:   'CASCADE',
});
IndustryDetail.belongsTo(EnterpriseSector, {
  foreignKey: 'enterprise_sector_id',
  as:         'enterpriseSector',
});

// EnterpriseType hasMany IndustryDetail
EnterpriseType.hasMany(IndustryDetail, {
  foreignKey: 'enterprise_type_id',
  as:         'industryDetails',
  onDelete:   'RESTRICT',
  onUpdate:   'CASCADE',
});
IndustryDetail.belongsTo(EnterpriseType, {
  foreignKey: 'enterprise_type_id',
  as:         'enterpriseType',
});

// Constitution hasMany IndustryDetail
Constitution.hasMany(IndustryDetail, {
  foreignKey: 'constitution_id',
  as:         'industryDetails',
  onDelete:   'RESTRICT',
  onUpdate:   'CASCADE',
});
IndustryDetail.belongsTo(Constitution, {
  foreignKey: 'constitution_id',
  as:         'constitution',
});

// NatureOfActivity hasMany IndustryDetail
NatureOfActivity.hasMany(IndustryDetail, {
  foreignKey: 'nature_of_activity_id',
  as:         'industryDetails',
  onDelete:   'RESTRICT',
  onUpdate:   'CASCADE',
});
IndustryDetail.belongsTo(NatureOfActivity, {
  foreignKey: 'nature_of_activity_id',
  as:         'natureOfActivity',
});

export { EnterpriseSector, EnterpriseType, IndustryDetail, Constitution, NatureOfActivity };
