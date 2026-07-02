const STATUS_LABELS = {
  DRAFT: 'Draft',
  SUBMITTED: 'Submitted',
  UNDER_SCRUTINY: 'Under Scrutiny',
  DEFICIENT: 'Deficient',
  UNDER_BIDDING: 'Under Bidding',
  APPROVED: 'Approved',
  DEMAND_ISSUED: 'Demand Issued',
  ALLOTTED: 'Allotted',
  REJECTED: 'Rejected',
  WITHDRAWN: 'Withdrawn',
};

const STATUS_STYLES = {
  DRAFT:          { badge: 'bg-gray-100 text-gray-500',       dot: 'bg-gray-400' },
  SUBMITTED:      { badge: 'bg-blue-100 text-blue-700',       dot: 'bg-blue-500' },
  UNDER_SCRUTINY: { badge: 'bg-amber-100 text-amber-700',     dot: 'bg-amber-500' },
  DEFICIENT:      { badge: 'bg-red-100 text-red-700',         dot: 'bg-red-500' },
  UNDER_BIDDING:  { badge: 'bg-violet-100 text-violet-700',   dot: 'bg-violet-500' },
  APPROVED:       { badge: 'bg-green-100 text-green-700',     dot: 'bg-green-500' },
  DEMAND_ISSUED:  { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  ALLOTTED:       { badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  REJECTED:       { badge: 'bg-pink-100 text-pink-700',       dot: 'bg-pink-500' },
  WITHDRAWN:      { badge: 'bg-gray-100 text-gray-500',       dot: 'bg-gray-400' },
};

const StatusBadge = ({ status }) => {
  const styles = STATUS_STYLES[status] ?? STATUS_STYLES.DRAFT;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${styles.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
      {STATUS_LABELS[status] || status}
    </span>
  );
};

export default StatusBadge;
