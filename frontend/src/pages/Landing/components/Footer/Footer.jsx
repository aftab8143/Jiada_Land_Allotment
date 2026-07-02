import jharLogo from '../../../../assets/images/jharlogo.png';

const Footer = () => (
  <footer className="bg-[#001a4d] text-[#8aaec9]">
    {/* Top section */}
    <div className="max-w-6xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-8">
      {/* Col 1: Brand */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <img src={jharLogo} alt="JIADA Logo" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-bold text-white text-lg">JIADA Portal</span>
        </div>
        <p className="text-sm leading-relaxed">
          Jharkhand Industrial Area Development Authority's digital platform for transparent and efficient industrial land allotment.
        </p>
      </div>

      {/* Col 2: Quick Links */}
      <div>
        <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Quick Links</h4>
        <ul className="flex flex-col gap-2 text-sm">
          {['Land Bank', 'Apply for Plot', 'Bid on Plot', 'Post-Allotment', 'Application Status', 'Payment Portal'].map((l) => (
            <li key={l}>
              <a href="#" className="hover:text-white transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Col 3: Contact summary */}
      <div>
        <h4 className="font-bold text-white text-sm mb-4 uppercase tracking-wider">Contact</h4>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-start gap-2">
            <span>📞</span>
            <div>
              <div className="text-white font-medium">1800-345-6789</div>
              <div>Toll Free | Mon–Sat 9AM–6PM</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span>📧</span>
            <div>support@jiada.jharkhand.gov.in</div>
          </div>
          <div className="flex items-start gap-2">
            <span>🏛️</span>
            <div>JIADA Bhawan, Ranchi, Jharkhand – 834001</div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="tricolor-stripe" />
    <div className="flex flex-col sm:flex-row justify-between items-center px-8 py-3 text-xs text-[#4a6894] gap-1">
      <span>&copy; 2026 JIADA, Government of Jharkhand. All Rights Reserved.</span>
      <span>Content managed by Jharkhand Industrial Area Development Authority</span>
    </div>
  </footer>
);

export default Footer;
