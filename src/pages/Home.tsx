import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DemoSection from '../components/DemoSection';
import PoweredBy from '../components/PoweredBy';
import GlobalReach from '../components/GlobalReach';
import Templates from '../components/Templates';
import Architecture from '../components/Architecture';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <DemoSection />
        <PoweredBy />
        <GlobalReach />
        <Templates />
        <Architecture />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
