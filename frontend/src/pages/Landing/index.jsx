import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CardGrid from './components/CardGrid';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackgroundMesh from './components/BackgroundMesh';

const LandingPage = () => (
  <div className="relative">
    <BackgroundMesh />
    <Navbar />
    <div id="home">
      <HeroSection />
    </div>
    <CardGrid />
    <AboutSection />
    <ContactSection />
    <Footer />
  </div>
);

export default LandingPage;
