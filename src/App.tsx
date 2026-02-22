import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PoweredBy from './components/PoweredBy';
import GlobalReach from './components/GlobalReach';
import Templates from './components/Templates';
import Architecture from './components/Architecture';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-satoshi selection:bg-[var(--accent-primary)] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <PoweredBy />
        <GlobalReach />
        <Templates />
        <Architecture />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
