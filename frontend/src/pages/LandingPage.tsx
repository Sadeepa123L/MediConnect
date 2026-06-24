import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import Footer from '../components/landing/Footer';
import ServicesSection from '../components/landing/ServicePage';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      <Header />
      
      <main className="grow">
        <HeroSection />
        <AboutSection />
        <ServicesSection/>
      </main>

      <Footer />
    </div>
  );
}