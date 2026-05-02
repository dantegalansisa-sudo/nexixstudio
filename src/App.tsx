import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ClientsMarquee from './components/ClientsMarquee';
import Stats from './components/Stats';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Team from './components/Team';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import CustomCursor from './components/CustomCursor';
import LenisProvider from './components/LenisProvider';

function App() {
  return (
    <LenisProvider>
      <CustomCursor />
      <Navbar />
      <Hero />
      <ClientsMarquee />
      <Stats />
      <Services />
      <Process />
      <Portfolio />
      <Team />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <WhatsAppFAB />
    </LenisProvider>
  );
}

export default App;
