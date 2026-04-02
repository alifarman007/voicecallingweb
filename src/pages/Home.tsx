import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DemoSection from '../components/DemoSection';
import PoweredBy from '../components/PoweredBy';
import GlobalReach from '../components/GlobalReach';
import Templates from '../components/Templates';
import AutomatedActionEngine from '../components/AutomatedActionEngine';
import IntelligentVoiceCore from '../components/IntelligentVoiceCore';
import HowItWorks from '../components/HowItWorks';
import Architecture from '../components/Architecture';
import NativeS2S from '../components/NativeS2S';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [showIntelligentCore, setShowIntelligentCore] = useState(false);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Hero />
        <DemoSection />
        <PoweredBy />
        <GlobalReach />
        <Templates />
        <AutomatedActionEngine />
        
        <div className="bg-black py-12 flex justify-center border-b border-gray-900">
          <button 
            onClick={() => setShowIntelligentCore(!showIntelligentCore)}
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-blue-500"
          >
            <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
            {showIntelligentCore ? "Hide Intelligent Voice Core" : "Discover The Intelligent Voice Core"}
            <div className="absolute inset-0 h-full w-full rounded-xl group-hover:animate-ping opacity-20 bg-blue-400"></div>
          </button>
        </div>

        <AnimatePresence>
          {showIntelligentCore && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <IntelligentVoiceCore />
            </motion.div>
          )}
        </AnimatePresence>

        <HowItWorks />
        <Architecture />
        <NativeS2S />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
