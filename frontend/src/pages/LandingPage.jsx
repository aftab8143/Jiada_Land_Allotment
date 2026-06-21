import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import CardGrid from '../components/CardGrid';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const LandingPage = () => (
  <>
    <Navbar />
    <div id="home">
      <HeroSection />
    </div>
    <CardGrid />
    <AboutSection />
    <ContactSection />
    <Footer />
  </>
);

export default LandingPage;
