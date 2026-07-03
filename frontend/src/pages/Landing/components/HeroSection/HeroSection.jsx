import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuth } from '../../../../context/AuthContext';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const HeroSection = () => {
  const { user } = useAuth();
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center relative overflow-hidden"
      id="home"
    >
      {/* Decorative circles */}
      <motion.div
        className="absolute top-[-5rem] right-[-5rem] w-[28rem] h-[28rem] rounded-full border-[60px] border-white/10 pointer-events-none"
        animate={reduceMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-[-6rem] w-[36rem] h-[36rem] rounded-full border-[80px] border-white/5 pointer-events-none"
        animate={reduceMotion ? undefined : { rotate: -360 }}
        transition={{ duration: 110, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-8 py-20 text-white"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Badge chip */}
        <motion.div
          variants={item}
          className="glass-dark inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-accent text-xs font-bold uppercase tracking-wider mb-8"
        >
          <span>🏛️</span>
          Government of Jharkhand Initiative
        </motion.div>

        {/* Heading */}
        <motion.h1 variants={item} className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Industrial Land Allotment<br />
          Through{' '}
          <span className="text-accent">Digital Governance</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={item} className="text-xl text-blue-200 max-w-2xl mb-10">
          Apply for industrial plots, track your application status, and manage allotted land — all through a single transparent digital platform.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-wrap gap-4 mb-16">
          {user ? (
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/dashboard"
                className="bg-accent text-white rounded-full px-8 py-3.5 font-bold text-base shadow-lg transition-colors inline-block"
              >
                Go to Dashboard
              </Link>
            </motion.div>
          ) : (
            <>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/signup"
                  className="bg-accent text-white rounded-full px-8 py-3.5 font-bold text-base shadow-lg transition-colors inline-block"
                >
                  Apply for Land
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/login"
                  className="glass-dark text-white rounded-full px-8 py-3.5 font-bold text-base transition-colors inline-block"
                >
                  Explore Land Bank
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Stats row */}
        <motion.div variants={item} className="glass-dark flex flex-wrap gap-10 rounded-2xl px-8 py-6">
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
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
