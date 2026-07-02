const features = [
  'Government of Jharkhand initiative',
  'Single-window clearance',
  'Transparent land allotment process',
  'Dedicated investor support',
];

const pillars = [
  { icon: '🔒', title: 'Secure', desc: 'End-to-end encrypted data with highest security standards.' },
  { icon: '⚡', title: 'Fast', desc: '75-day guaranteed service delivery timeline for all applications.' },
  { icon: '🌐', title: 'Transparent', desc: 'Track your application status at every workflow stage in real-time.' },
  { icon: '📊', title: 'Fair', desc: 'Closed bidding ensures equal opportunity for all eligible investors.' },
];

const AboutSection = () => (
  <section className="py-20 bg-white" id="about">
    <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
      {/* Left: Text content */}
      <div>
        <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">About JIADA</div>
        <h2 className="text-3xl font-bold text-primary mb-4">
          Empowering Industrial Growth in Jharkhand
        </h2>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          JIADA (Jharkhand Industrial Area Development Authority) is the nodal agency for industrial land allotment in Jharkhand. This portal digitises the entire land allotment process — from plot search and application to payment, workflow approvals, and post-allotment services.
        </p>
        <p className="text-gray-600 text-base leading-relaxed mb-6">
          Our mission is to eliminate manual paperwork, ensure timeline compliance, and bring governance to investors through a single secure digital platform.
        </p>

        {/* Feature list */}
        <div className="flex flex-col gap-3">
          {features.map((f) => (
            <div key={f} className="flex items-center gap-3 text-sm text-gray-700">
              <span className="w-5 h-5 rounded-full bg-green-100 text-gov-green flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </span>
              {f}
            </div>
          ))}
        </div>
      </div>

      {/* Right: Visual card */}
      <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 text-white text-center">
        <div className="text-6xl font-black text-accent mb-2">25+</div>
        <div className="text-base font-semibold mb-8 text-blue-200">Years of Industrial Development</div>

        {/* 2x2 stat grid */}
        <div className="grid grid-cols-2 gap-4">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white/10 rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{p.icon}</div>
              <div className="text-sm font-bold text-white">{p.title}</div>
              <div className="text-xs text-blue-200 mt-1 leading-snug">{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Quick stats row */}
        <div className="flex justify-between mt-6 pt-6 border-t border-white/20">
          <div>
            <div className="text-2xl font-bold text-accent">500+</div>
            <div className="text-xs text-blue-200">Plots Available</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">75</div>
            <div className="text-xs text-blue-200">Day SLA</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">8</div>
            <div className="text-xs text-blue-200">User Roles</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
