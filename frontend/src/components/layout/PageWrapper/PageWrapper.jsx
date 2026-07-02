import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

const PageWrapper = ({ children }) => (
  <div className="flex flex-col min-h-screen bg-bg">
    <Header /> {/* top bar (JIADA logo, user name, logout) */}
    <div className="flex flex-1">
      <Sidebar /> {/* left bar (navigation menu) */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children} {/* content of the page (dashboard, settings, etc.) */}
      </main>
    </div>
    <Footer /> {/* bottom bar (copyright, version, etc.) */}
  </div>
);

export default PageWrapper;
