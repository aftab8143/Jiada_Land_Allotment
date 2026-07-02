import PageWrapper from '../../components/layout/PageWrapper';

const Showcase = () => (
  <PageWrapper>
    <h1>Component Showcase</h1>
    <p>Visual gallery of all reusable UI components used across the JIADA Portal.</p>

    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>Buttons</h2>
      {/* Button variants will be rendered here */}
    </section>

    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>Status Badges</h2>
      {/* StatusBadge variants will be rendered here */}
    </section>

    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>Form Inputs</h2>
      {/* Input variants will be rendered here */}
    </section>

    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>Modals</h2>
      {/* Modal variants will be rendered here */}
    </section>

    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>Timeline</h2>
      {/* Timeline component will be rendered here */}
    </section>

    <section style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '1rem' }}>Data Table</h2>
      {/* Table component will be rendered here */}
    </section>
  </PageWrapper>
);

export default Showcase;
