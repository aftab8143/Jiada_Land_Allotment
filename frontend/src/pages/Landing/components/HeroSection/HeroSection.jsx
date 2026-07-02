import { Link } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center relative overflow-hidden"
      id="home"
    >
      {/* Decorative circles */}
      <div className="absolute top-[-5rem] right-[-5rem] w-[28rem] h-[28rem] rounded-full border-[60px] border-white/10 pointer-events-none" />
      <div className="absolute bottom-[-8rem] left-[-6rem] w-[36rem] h-[36rem] rounded-full border-[80px] border-white/5 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-20 text-white">
        {/* Badge chip */}
        <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 text-accent text-xs font-bold uppercase tracking-wider mb-8">
          <span>🏛️</span>
          Government of Jharkhand Initiative
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Industrial Land Allotment<br />
          Through{' '}
          <span className="text-accent">Digital Governance</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-blue-200 max-w-2xl mb-10">
          Apply for industrial plots, track your application status, and manage allotted land — all through a single transparent digital platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          {user ? (
            <Link
              to="/dashboard"
              className="bg-accent text-white rounded-full px-8 py-3.5 font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/signup"
                className="bg-accent text-white rounded-full px-8 py-3.5 font-bold text-base shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Apply for Land
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white rounded-full px-8 py-3.5 font-bold text-base hover:bg-white/10 transition-all"
              >
                Explore Land Bank
              </Link>
            </>
          )}
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-10">
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-accent">500+</span>
            <span className="text-xs text-blue-200 mt-1">Plots Available</span>
          </div>
          <div className="w-px bg-white/20 self-stretch" />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-accent">75 Days</span>
            <span className="text-xs text-blue-200 mt-1">Guaranteed Timeline</span>
          </div>
          <div className="w-px bg-white/20 self-stretch" />
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-accent">100%</span>
            <span className="text-xs text-blue-200 mt-1">Digital Process</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
