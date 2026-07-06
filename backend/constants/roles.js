// Numeric group IDs — mirrors the seed data in db/migrations/001_master_tables.js.
// Prefer these over the `groups.name` string: name is editable via groupController.edit,
// so authorizing against it can silently break or misassign access if a group is renamed.
export const ROLES = {
  SYSTEM_ADMIN:      1,
  JIADA_ADMIN:       2,
  RO_ADMIN:          3,
  RO_REPORT:         4,
  APPLICANT:         5,
  CLERK:             6,
  IEO:               7,
  DO:                8,
  TECHNICAL_PERSON:  9,
};
