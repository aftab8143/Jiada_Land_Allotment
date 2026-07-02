import { useState } from 'react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';
import Badge from '../../components/ui/Badge';
import Loading from '../../components/ui/Loading';
import StatusBadge from '../../components/ui/StatusBadge';
import Table from '../../components/ui/Table';
import Timeline from '../../components/ui/Timeline';
import ProgressBar from '../../components/feedback/ProgressBar';
import EmptyState from '../../components/feedback/EmptyState';
import Toggle from '../../components/ui/Toggle/Toggle';
import SearchField from '../../components/ui/SearchField';

/* ─── tiny section wrapper ─────────────────────────────────────── */
const Section = ({ title, description, children }) => (
  <div className="mb-12">
    <div className="mb-4 pb-3 border-b-2 border-primary/10">
      <h2 className="text-lg font-bold text-primary">{title}</h2>
      {description && <p className="text-sm text-gray-400 mt-0.5">{description}</p>}
    </div>
    {children}
  </div>
);

/* ─── table that wraps demo cells ──────────────────────────────── */
const DemoTable = ({ rows }) => (
  <div className="w-full overflow-x-auto rounded-xl border border-border">
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr className="bg-gray-50">
          <th className="text-left px-5 py-3 font-bold text-gray-600 border-b border-gray-200 w-44">Name / Prop</th>
          <th className="text-left px-5 py-3 font-bold text-gray-600 border-b border-gray-200 w-80">Preview</th>
          <th className="text-left px-5 py-3 font-bold text-gray-600 border-b border-gray-200">Usage (copy-paste)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60">
            <td className="px-5 py-4 font-semibold text-navy align-top">{row.name}</td>
            <td className="px-5 py-4 align-middle">{row.preview}</td>
            <td className="px-5 py-4 align-top">
              <code className="block text-[0.72rem] bg-gray-100 rounded-md px-3 py-2 text-gray-600 font-mono whitespace-pre-wrap break-all leading-relaxed">
                {row.code}
              </code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ════════════════════════════════════════════════════════════════ */
export default function UIDemo() {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [searchVal, setSearchVal] = useState('');

  /* ── Toggle states ── */
  const [togPrimary, setTogPrimary] = useState(true);
  const [togAccent,  setTogAccent]  = useState(false);
  const [togTeal,    setTogTeal]    = useState(true);
  const [togDanger,  setTogDanger]  = useState(false);
  const [togSm,      setTogSm]      = useState(true);
  const [togMd,      setTogMd]      = useState(true);
  const [togLg,      setTogLg]      = useState(true);
  const [togLabelR,  setTogLabelR]  = useState(true);
  const [togLabelL,  setTogLabelL]  = useState(false);
  const [togDis,     setTogDis]     = useState(false);

  /* ── Button rows ── */
  const W = 'min-w-[200px]'; // consistent preview width for all variant buttons
  const buttonRows = [
    {
      name: 'primary',
      preview: <Button variant="primary" size="md" className={W}>Submit Application</Button>,
      code: `<Button variant="primary" size="md">Submit Application</Button>`,
    },
    {
      name: 'accent',
      preview: <Button variant="accent" size="md" className={W}>Apply Now</Button>,
      code: `<Button variant="accent" size="md">Apply Now</Button>`,
    },
    {
      name: 'teal',
      preview: <Button variant="teal" size="md" className={W}>Confirm Details</Button>,
      code: `<Button variant="teal" size="md">Confirm Details</Button>`,
    },
    {
      name: 'danger',
      preview: <Button variant="danger" size="md" className={W}>Delete Record</Button>,
      code: `<Button variant="danger" size="md">Delete Record</Button>`,
    },
    {
      name: 'secondary',
      preview: <Button variant="secondary" size="md" className={W}>Cancel</Button>,
      code: `<Button variant="secondary" size="md">Cancel</Button>`,
    },
    {
      name: 'outline-accent',
      preview: <Button variant="outline-accent" size="md" className={W}>Save as Draft</Button>,
      code: `<Button variant="outline-accent" size="md">Save as Draft</Button>`,
    },
    {
      name: 'ghost',
      preview: <Button variant="ghost" size="md" className={W}>← Go Back</Button>,
      code: `<Button variant="ghost" size="md">← Go Back</Button>`,
    },
    {
      name: 'sizes — sm / md / lg',
      preview: (
        <div className="flex flex-col gap-3 items-start">
          <Button variant="primary" size="sm"  className="min-w-[120px]">Small</Button>
          <Button variant="primary" size="md"  className="min-w-[160px]">Medium</Button>
          <Button variant="primary" size="lg"  className="min-w-[200px]">Large</Button>
        </div>
      ),
      code: `<Button variant="primary" size="sm">Small</Button>\n<Button variant="primary" size="md">Medium</Button>\n<Button variant="primary" size="lg">Large</Button>`,
    },
    {
      name: 'loading',
      preview: <Button variant="primary" size="md" className={W} loading>Saving…</Button>,
      code: `<Button variant="primary" loading>Saving…</Button>`,
    },
    {
      name: 'disabled',
      preview: <Button variant="primary" size="md" className={W} disabled>Disabled</Button>,
      code: `<Button variant="primary" disabled>Disabled</Button>`,
    },
    {
      name: 'block — full width',
      preview: <div className="w-64"><Button variant="primary" block className="min-h-[64px]">Full Width Button</Button></div>,
      code: `<Button variant="primary" block>Full Width Button</Button>`,
    },
    {
      name: 'icon left',
      preview: <Button variant="primary" size="md" className={W} iconLeft="📄">New Application</Button>,
      code: `<Button variant="primary" iconLeft="📄">New Application</Button>`,
    },
    {
      name: 'icon right',
      preview: <Button variant="accent" size="md" className={W} iconRight="→">Next Step</Button>,
      code: `<Button variant="accent" iconRight="→">Next Step</Button>`,
    },
  ];

  /* ── Toggle rows ── */
  const toggleRows = [
    {
      name: 'primary',
      preview: <Toggle checked={togPrimary} onChange={setTogPrimary} color="primary" />,
      code: `<Toggle checked={on} onChange={setOn} color="primary" />`,
    },
    {
      name: 'accent',
      preview: <Toggle checked={togAccent} onChange={setTogAccent} color="accent" />,
      code: `<Toggle checked={on} onChange={setOn} color="accent" />`,
    },
    {
      name: 'teal',
      preview: <Toggle checked={togTeal} onChange={setTogTeal} color="teal" />,
      code: `<Toggle checked={on} onChange={setOn} color="teal" />`,
    },
    {
      name: 'danger',
      preview: <Toggle checked={togDanger} onChange={setTogDanger} color="danger" />,
      code: `<Toggle checked={on} onChange={setOn} color="danger" />`,
    },
    {
      name: 'sizes — sm / md / lg',
      preview: (
        <div className="flex flex-col gap-3">
          <Toggle checked={togSm} onChange={setTogSm} color="primary" size="sm" label="Small" />
          <Toggle checked={togMd} onChange={setTogMd} color="primary" size="md" label="Medium" />
          <Toggle checked={togLg} onChange={setTogLg} color="primary" size="lg" label="Large" />
        </div>
      ),
      code: `<Toggle checked={on} onChange={setOn} size="sm" label="Small" />\n<Toggle checked={on} onChange={setOn} size="md" label="Medium" />\n<Toggle checked={on} onChange={setOn} size="lg" label="Large" />`,
    },
    {
      name: 'label — right',
      preview: <Toggle checked={togLabelR} onChange={setTogLabelR} color="primary" label="Receive notifications" />,
      code: `<Toggle checked={on} onChange={setOn} label="Receive notifications" />`,
    },
    {
      name: 'label — left',
      preview: <Toggle checked={togLabelL} onChange={setTogLabelL} color="teal" label="Enable alerts" labelPosition="left" />,
      code: `<Toggle checked={on} onChange={setOn} color="teal"\n  label="Enable alerts" labelPosition="left" />`,
    },
    {
      name: 'disabled',
      preview: (
        <div className="flex flex-col gap-3">
          <Toggle checked={false} onChange={() => {}} disabled label="Disabled — off" />
          <Toggle checked={true}  onChange={() => {}} color="primary" disabled label="Disabled — on" />
        </div>
      ),
      code: `<Toggle checked={on} onChange={setOn} disabled />`,
    },
  ];

  /* ── Modal rows ── */
  const modalRows = [
    {
      name: 'Basic Modal',
      preview: (
        <>
          <Button variant="primary" size="md" className="min-w-[160px]" onClick={() => setModal1(true)}>Open Basic Modal</Button>
          <Modal
            isOpen={modal1}
            onClose={() => setModal1(false)}
            title="Application Submitted"
            headerColor="bg-primary-dark"
          >
            <p className="text-sm text-gray-600">Your application has been submitted successfully and is under review.</p>
          </Modal>
        </>
      ),
      code: `<Modal\n  isOpen={open}\n  onClose={() => setOpen(false)}\n  title="Application Submitted"\n  headerColor="bg-primary-dark"\n>\n  <p>Your content here</p>\n</Modal>`,
    },
    {
      name: 'Modal with Footer',
      preview: (
        <>
          <Button variant="danger" size="md" className="min-w-[160px]" onClick={() => setModal2(true)}>Open Confirm Dialog</Button>
          <Modal
            isOpen={modal2}
            onClose={() => setModal2(false)}
            title="Confirm Withdrawal"
            headerColor="bg-coral"
            footer={
              <>
                <Button variant="secondary" size="sm" className="min-w-[144px]" onClick={() => setModal2(false)}>Cancel</Button>
                <Button variant="danger" size="sm" className="min-w-[144px]" onClick={() => setModal2(false)}>Yes, Withdraw</Button>
              </>
            }
          >
            <p className="text-sm text-gray-600">Are you sure you want to withdraw this application? This action cannot be undone.</p>
          </Modal>
        </>
      ),
      code: `<Modal\n  isOpen={open}\n  onClose={() => setOpen(false)}\n  title="Confirm Withdrawal"\n  headerColor="bg-coral"\n  footer={\n    <>\n      <Button variant="secondary" size="sm" className="min-w-[144px]"\n        onClick={() => setOpen(false)}>Cancel</Button>\n      <Button variant="danger" size="sm" className="min-w-[144px]"\n        onClick={handleAction}>Yes, Withdraw</Button>\n    </>\n  }\n>\n  <p>Are you sure?</p>\n</Modal>`,
    },
    {
      name: 'Modal with Form',
      preview: (
        <>
          <Button variant="teal" size="md" className="min-w-[160px]" onClick={() => setModal3(true)}>Open Form Modal</Button>
          <Modal
            isOpen={modal3}
            onClose={() => setModal3(false)}
            title="Update Contact"
            headerColor="bg-teal-dark"
            footer={
              <>
                <Button variant="secondary" size="sm" className="min-w-[144px]" onClick={() => setModal3(false)}>Cancel</Button>
                <Button variant="teal" size="sm" className="min-w-[144px]" onClick={() => setModal3(false)}>Save</Button>
              </>
            }
          >
            <div className="flex flex-col gap-4">
              <Input label="Full Name" placeholder="Enter name" />
              <Input label="Email" type="email" placeholder="name@example.com" />
            </div>
          </Modal>
        </>
      ),
      code: `<Modal\n  isOpen={open}\n  onClose={() => setOpen(false)}\n  title="Update Contact"\n  headerColor="bg-teal-dark"\n  footer={\n    <>\n      <Button variant="secondary" size="sm" className="min-w-[144px]"\n        onClick={() => setOpen(false)}>Cancel</Button>\n      <Button variant="teal" size="sm" className="min-w-[144px]"\n        onClick={handleSubmit}>Save</Button>\n    </>\n  }\n>\n  <Input label="Full Name" />\n  <Input label="Email" type="email" />\n</Modal>`,
    },
  ];

  /* ── Alert rows ── */
  const alertRows = [
    {
      name: 'info',
      preview: <Alert type="info">Your application is being reviewed by the scrutiny committee.</Alert>,
      code: `<Alert type="info">Your message here.</Alert>`,
    },
    {
      name: 'success',
      preview: <Alert type="success">Payment of ₹1,25,000 received successfully.</Alert>,
      code: `<Alert type="success">Payment received.</Alert>`,
    },
    {
      name: 'warning',
      preview: <Alert type="warning">Your documents will expire in 7 days. Please renew them.</Alert>,
      code: `<Alert type="warning">Documents expiring soon.</Alert>`,
    },
    {
      name: 'error',
      preview: <Alert type="error">Failed to submit application. Please try again.</Alert>,
      code: `<Alert type="error">Something went wrong.</Alert>`,
    },
  ];

  /* ── Badge rows ── */
  const badgeRows = [
    { name: 'blue',    preview: <Badge color="blue">Industrial</Badge>,   code: `<Badge color="blue">Industrial</Badge>` },
    { name: 'green',   preview: <Badge color="green">Available</Badge>,   code: `<Badge color="green">Available</Badge>` },
    { name: 'saffron', preview: <Badge color="saffron">Pending</Badge>,   code: `<Badge color="saffron">Pending</Badge>` },
    { name: 'red',     preview: <Badge color="red">Urgent</Badge>,        code: `<Badge color="red">Urgent</Badge>` },
    { name: 'gray',    preview: <Badge color="gray">Archived</Badge>,     code: `<Badge color="gray">Archived</Badge>` },
    { name: 'purple',  preview: <Badge color="purple">Priority</Badge>,   code: `<Badge color="purple">Priority</Badge>` },
  ];

  /* ── StatusBadge rows ── */
  const statusRows = Object.entries({
    DRAFT: 'Draft', SUBMITTED: 'Submitted', UNDER_SCRUTINY: 'Under Scrutiny',
    DEFICIENT: 'Deficient', UNDER_BIDDING: 'Under Bidding', APPROVED: 'Approved',
    DEMAND_ISSUED: 'Demand Issued', ALLOTTED: 'Allotted', REJECTED: 'Rejected', WITHDRAWN: 'Withdrawn',
  }).map(([key]) => ({
    name: key,
    preview: <StatusBadge status={key} />,
    code: `<StatusBadge status="${key}" />`,
  }));

  /* ── Input rows ── */
  const inputRows = [
    {
      name: 'Basic input',
      preview: <Input label="Full Name" placeholder="Enter your full name" value={inputVal} onChange={e => setInputVal(e.target.value)} />,
      code: `<Input\n  label="Full Name"\n  placeholder="Enter your full name"\n  value={value}\n  onChange={e => setValue(e.target.value)}\n/>`,
    },
    {
      name: 'With error',
      preview: <Input label="PAN Number" placeholder="ABCDE1234F" error="PAN number is required" />,
      code: `<Input\n  label="PAN Number"\n  placeholder="ABCDE1234F"\n  error="PAN number is required"\n/>`,
    },
    {
      name: 'Password type',
      preview: <Input label="Password" type="password" placeholder="••••••••" />,
      code: `<Input label="Password" type="password" />`,
    },
    {
      name: 'Disabled',
      preview: <Input label="Application ID" value="JIADA-2026-00123" disabled />,
      code: `<Input label="Application ID" value="JIADA-2026-00123" disabled />`,
    },
  ];

  /* ── SearchField rows ── */
  const searchRows = [
    {
      name: 'Basic search',
      preview: <SearchField value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search applications…" />,
      code: `<SearchField\n  value={query}\n  onChange={e => setQuery(e.target.value)}\n  placeholder="Search applications…"\n/>`,
    },
    {
      name: 'With label',
      preview: <SearchField label="Search land records" value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Enter survey number or owner name" />,
      code: `<SearchField\n  label="Search land records"\n  value={query}\n  onChange={e => setQuery(e.target.value)}\n  placeholder="Enter survey number or owner name"\n/>`,
    },
    {
      name: 'With clear button (type to see it)',
      preview: <SearchField value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Type something to see ✕" />,
      code: `<SearchField value={query} onChange={e => setQuery(e.target.value)} />`,
    },
    {
      name: 'Disabled',
      preview: <SearchField value="" onChange={() => {}} placeholder="Search disabled" disabled />,
      code: `<SearchField value={query} onChange={e => setQuery(e.target.value)} disabled />`,
    },
  ];

  /* ── Loading rows ── */
  const loadingRows = [
    {
      name: 'Inline spinner',
      preview: <Loading />,
      code: `<Loading />`,
    },
    {
      name: 'Full-page spinner',
      preview: <div className="text-sm text-gray-400 italic">(fills 60vh — shown on data-fetch pages)</div>,
      code: `<Loading fullPage />`,
    },
  ];

  /* ── ProgressBar rows ── */
  const progressRows = [
    {
      name: '25%',
      preview: <div className="w-56"><ProgressBar value={25} label="Documents Uploaded" /></div>,
      code: `<ProgressBar value={25} label="Documents Uploaded" />`,
    },
    {
      name: '60%',
      preview: <div className="w-56"><ProgressBar value={60} label="Application Progress" /></div>,
      code: `<ProgressBar value={60} label="Application Progress" />`,
    },
    {
      name: '100%',
      preview: <div className="w-56"><ProgressBar value={100} label="Completed" /></div>,
      code: `<ProgressBar value={100} label="Completed" />`,
    },
  ];

  /* ── EmptyState rows ── */
  const emptyRows = [
    {
      name: 'No data',
      preview: <div className="border border-dashed border-gray-200 rounded-xl"><EmptyState icon="📭" title="No Applications Found" description="You haven't submitted any applications yet." action={<Button variant="primary" size="sm">Start Application</Button>} /></div>,
      code: `<EmptyState\n  icon="📭"\n  title="No Applications Found"\n  description="You haven't submitted any yet."\n  action={\n    <Button variant="primary" size="sm">\n      Start Application\n    </Button>\n  }\n/>`,
    },
    {
      name: 'No documents',
      preview: <div className="border border-dashed border-gray-200 rounded-xl"><EmptyState icon="📄" title="No Documents" description="Upload required documents to proceed." /></div>,
      code: `<EmptyState\n  icon="📄"\n  title="No Documents"\n  description="Upload required docs to proceed."\n/>`,
    },
  ];

  /* ── Table rows ── */
  const tableColumns = [
    { key: 'id',     label: 'App ID' },
    { key: 'name',   label: 'Applicant' },
    { key: 'plot',   label: 'Plot Size' },
    { key: 'status', label: 'Status', render: row => <StatusBadge status={row.status} /> },
    { key: 'date',   label: 'Submitted On' },
  ];
  const tableData = [
    { id: 'JIADA-001', name: 'Ravi Kumar',   plot: '500 sqm', status: 'APPROVED',       date: '15 Jun 2026' },
    { id: 'JIADA-002', name: 'Priya Singh',  plot: '1000 sqm', status: 'UNDER_SCRUTINY', date: '20 Jun 2026' },
    { id: 'JIADA-003', name: 'Arjun Mehta',  plot: '250 sqm', status: 'SUBMITTED',       date: '25 Jun 2026' },
    { id: 'JIADA-004', name: 'Sunita Devi',  plot: '750 sqm', status: 'DEFICIENT',       date: '28 Jun 2026' },
  ];

  /* ── Timeline rows ── */
  const timelineSteps = [
    { label: 'Application Submitted', meta: '10 Jun 2026', status: 'completed' },
    { label: 'CC Scrutiny', meta: '12 Jun 2026', status: 'completed' },
    { label: 'IEO Verification', meta: 'In progress…', status: 'active' },
    { label: 'RD Approval', status: 'pending' },
    { label: 'Allotment Letter Issued', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-primary to-primary-light text-white px-10 py-8">
        <div className="tricolor-stripe absolute top-0 left-0 right-0" />
        <h1 className="text-3xl font-bold mb-1">UI Component Library</h1>
        <p className="text-blue-200 text-sm">All reusable components with live previews and copy-paste usage code</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {['Buttons', 'Toggle', 'Modals', 'Alerts', 'Badges', 'StatusBadge', 'Input', 'SearchField', 'Loading', 'ProgressBar', 'EmptyState', 'Table', 'Timeline'].map(name => (
            <a key={name} href={`#${name}`} className="text-xs bg-white/10 hover:bg-white/20 border border-white/20 rounded-full px-3 py-1 text-white no-underline transition-colors">
              {name}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* BUTTONS */}
        <div id="Buttons">
          <Section title="Buttons" description="7 visual variants × 3 sizes. All are pill-shaped (rounded-full) with shine effect.">
            <DemoTable rows={buttonRows} />
          </Section>
        </div>

        {/* TOGGLE */}
        <div id="Toggle">
          <Section title="Toggle" description="On/off switch. 4 colour variants × 3 sizes. Matches button colour palette.">
            <DemoTable rows={toggleRows} />
          </Section>
        </div>

        {/* MODALS */}
        <div id="Modals">
          <Section title="Modals" description="Overlay dialogs. Pass isOpen, onClose, title. Optional footer for action buttons.">
            <DemoTable rows={modalRows} />
          </Section>
        </div>

        {/* ALERTS */}
        <div id="Alerts">
          <Section title="Alerts" description="Inline notification banners. 4 types: info, success, warning, error.">
            <DemoTable rows={alertRows} />
          </Section>
        </div>

        {/* BADGES */}
        <div id="Badges">
          <Section title="Badge" description="Small pill labels for categories and tags. 6 colour options.">
            <DemoTable rows={badgeRows} />
          </Section>
        </div>

        {/* STATUS BADGE */}
        <div id="StatusBadge">
          <Section title="StatusBadge" description="Application status indicator with colour-coded dot. 10 statuses mapped to colours.">
            <DemoTable rows={statusRows} />
          </Section>
        </div>

        {/* INPUTS */}
        <div id="Input">
          <Section title="Input" description="Form text field with label, placeholder, error state, and disabled state.">
            <DemoTable rows={inputRows} />
          </Section>
        </div>

        {/* SEARCH FIELD */}
        <div id="SearchField">
          <Section title="SearchField" description="Search input with built-in icon and clear (✕) button. Matches Input styling.">
            <DemoTable rows={searchRows} />
          </Section>
        </div>

        {/* LOADING */}
        <div id="Loading">
          <Section title="Loading" description="Spinner indicator. Use fullPage prop to centre it in the viewport during data fetch.">
            <DemoTable rows={loadingRows} />
          </Section>
        </div>

        {/* PROGRESS BAR */}
        <div id="ProgressBar">
          <Section title="ProgressBar" description="Horizontal progress bar with label and percentage. Pass value (0–100).">
            <DemoTable rows={progressRows} />
          </Section>
        </div>

        {/* EMPTY STATE */}
        <div id="EmptyState">
          <Section title="EmptyState" description="Placeholder shown when a list or section has no data. Supports icon, title, description, and action button.">
            <DemoTable rows={emptyRows} />
          </Section>
        </div>

        {/* TABLE */}
        <div id="Table">
          <Section title="Table" description="Data table. Pass columns (key + label + optional render) and data (array of objects).">
            <div className="mb-3">
              <Table columns={tableColumns} data={tableData} />
            </div>
            <code className="block text-[0.72rem] bg-gray-100 rounded-md px-4 py-3 text-gray-600 font-mono whitespace-pre-wrap leading-relaxed">
{`const columns = [
  { key: 'id',     label: 'App ID' },
  { key: 'name',   label: 'Applicant' },
  { key: 'status', label: 'Status', render: row => <StatusBadge status={row.status} /> },
];
const data = [
  { id: 'JIADA-001', name: 'Ravi Kumar', status: 'APPROVED' },
];

<Table columns={columns} data={data} />`}
            </code>
          </Section>
        </div>

        {/* TIMELINE */}
        <div id="Timeline">
          <Section title="Timeline" description="Vertical step tracker. Each step has label, optional meta text, and status: 'completed' | 'active' | 'pending'.">
            <div className="flex gap-8 flex-wrap">
              <div className="bg-white rounded-xl border border-border p-6 min-w-[260px]">
                <Timeline steps={timelineSteps} />
              </div>
              <code className="flex-1 min-w-[280px] text-[0.72rem] bg-gray-100 rounded-md px-4 py-3 text-gray-600 font-mono whitespace-pre-wrap leading-relaxed self-start">
{`const steps = [
  { label: 'Application Submitted',
    meta: '10 Jun 2026', status: 'completed' },
  { label: 'CC Scrutiny',
    meta: '12 Jun 2026', status: 'completed' },
  { label: 'IEO Verification',
    meta: 'In progress…', status: 'active' },
  { label: 'RD Approval', status: 'pending' },
];

<Timeline steps={steps} />`}
              </code>
            </div>
          </Section>
        </div>

        {/* Colour tokens */}
        <Section title="Design Tokens — Colours" description="All custom colours defined in @theme. Use as Tailwind classes: bg-primary, text-accent, border-teal, etc.">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: 'primary', hex: '#003087', cls: 'bg-primary' },
              { name: 'primary-dark', hex: '#002060', cls: 'bg-primary-dark' },
              { name: 'primary-light', hex: '#0047AB', cls: 'bg-primary-light' },
              { name: 'primary-lightest', hex: '#286FB4', cls: 'bg-primary-lightest' },
              { name: 'accent', hex: '#FF9933', cls: 'bg-accent' },
              { name: 'accent-dark', hex: '#e8871c', cls: 'bg-accent-dark' },
              { name: 'gov-green', hex: '#138808', cls: 'bg-gov-green' },
              { name: 'teal', hex: '#45B7B2', cls: 'bg-teal' },
              { name: 'teal-dark', hex: '#3AA09C', cls: 'bg-teal-dark' },
              { name: 'coral', hex: '#EE7C71', cls: 'bg-coral' },
              { name: 'navy', hex: '#222533', cls: 'bg-navy' },
              { name: 'kk-yellow', hex: '#FCBF2B', cls: 'bg-kk-yellow' },
              { name: 'kk-purple', hex: '#6C74F5', cls: 'bg-kk-purple' },
            ].map(c => (
              <div key={c.name} className="flex items-center gap-3 bg-white rounded-lg border border-border p-3">
                <div className={`w-9 h-9 rounded-lg shrink-0 ${c.cls}`} />
                <div>
                  <div className="text-xs font-bold text-gray-800">{c.name}</div>
                  <div className="text-[0.65rem] text-gray-400 font-mono">{c.hex}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
