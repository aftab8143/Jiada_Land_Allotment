import { motion } from 'framer-motion';
import InteractiveGlassCard from '../../../../components/ui/InteractiveGlassCard';

const services = [
  { icon: '🏭', title: 'Land Bank', desc: 'Browse available industrial plots across Jharkhand by zone, size, and category.' },
  { icon: '📝', title: 'Online Applications', desc: 'Apply for land allotment fully digitally, track status in real time.' },
  { icon: '💰', title: 'Payment Gateway', desc: 'Pay allotment fees, EMIs, and dues through secure online payments.' },
  { icon: '📄', title: 'Document Management', desc: 'Upload, manage, and track all required documents for your application.' },
  { icon: '📊', title: 'Application Tracking', desc: 'Real-time tracking of your application from submission to allotment.' },
  { icon: '🤝', title: 'Grievance Redressal', desc: 'Raise and track grievances with the authority through a dedicated portal.' },
];

const announcements = [
  { date: '20 Jun 2026', text: 'New industrial plots available in Adityapur Phase-III.' },
  { date: '15 Jun 2026', text: 'Bid event for Plot Zone-B opens on 1st July 2026.' },
  { date: '10 Jun 2026', text: 'Online payment gateway upgraded for faster processing.' },
];

const quickLinks = ['Land Bank Map', 'Application Status', 'Bid Events', 'Payment Portal', 'Grievance Portal'];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const CardGrid = () => (
  <section className="py-20" id="services">
    {/* Section header */}
    <div className="text-center mb-12 px-8">
      <h2 className="text-3xl font-bold text-primary mb-3">Our Services</h2>
      <p className="text-gray-500 text-base max-w-xl mx-auto">
        End-to-end digital services for industrial land allotment in Jharkhand
      </p>
    </div>

    {/* Services grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-8 mb-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {services.map((s) => (
        <motion.div key={s.title} variants={item}>
          <InteractiveGlassCard className="glass hover:bg-white/60 rounded-2xl p-6 transition-colors duration-200">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 bg-accent/10">
              {s.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
            <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
              Know More &rarr;
            </button>
          </InteractiveGlassCard>
        </motion.div>
      ))}
    </motion.div>

    {/* Info boxes */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Announcements */}
      <motion.div variants={item} className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 font-bold text-gray-800 mb-4">
          <span className="w-3 h-3 rounded-full bg-accent shrink-0" />
          Latest Announcements
        </div>
        <ul className="flex flex-col gap-3">
          {announcements.map((a) => (
            <li key={a.date} className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-accent">{a.date}</span>
              <span className="text-sm text-gray-600">{a.text}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Quick Links */}
      <motion.div variants={item} className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 font-bold text-gray-800 mb-4">
          <span className="w-3 h-3 rounded-full bg-gov-green shrink-0" />
          Quick Links
        </div>
        <ul className="flex flex-col gap-2">
          {quickLinks.map((l) => (
            <li key={l} className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary cursor-pointer transition-colors">
              <span className="text-accent text-xs">&#9658;</span> {l}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Helpline */}
      <motion.div variants={item} className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 font-bold text-gray-800 mb-4">
          <span className="w-3 h-3 rounded-full bg-primary shrink-0" />
          Helpline
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold text-primary">1800-345-6789</div>
          <div className="text-xs text-gray-500">Toll Free | Mon–Sat 9AM–6PM</div>
          <hr className="my-2 border-border" />
          <p className="text-sm text-gray-500 leading-relaxed">
            For queries about plot allotment, application status, or any JIADA service, contact our helpline.
          </p>
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default CardGrid;
