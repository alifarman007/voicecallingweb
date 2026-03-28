import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveTest from './LiveTest';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 z-10 overflow-hidden">
      <div className="hero-glow"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,36,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,36,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-20 pointer-events-none"></div>
      <div className="w-full max-w-[1200px] px-6 relative flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[rgba(108,92,231,0.3)] bg-[rgba(108,92,231,0.15)] mb-8 shimmer cursor-default animate-fadeInDown">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-glow)] animate-pulse"></span>
          <span className="text-[13px] font-medium text-[var(--accent-glow)] tracking-wide">
            ✨ Now with Native Bangla Support
          </span>
        </div>
        <h1 className="max-w-[860px] font-cabinet font-extrabold text-5xl md:text-[72px] leading-[1.05] tracking-tight text-white mb-8">
          <span className="block animate-fadeInUp" style={{ animationDelay: '0.1s' }}>Stop Losing Leads.</span>
          <span className="block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>Automate Your Phone Calls</span>
          <span className="block animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            with <span className="gradient-text">Human-Like AI.</span>
          </span>
        </h1>
        <p className="max-w-[640px] text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed mb-10 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          The most flexible voice AI platform. Build, deploy, and scale inbound & outbound agents in minutes. Fluent in Many Languages. Zero vendor lock-in.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <Link to="/contact" className="group relative bg-[var(--accent-primary)] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(108,92,231,0.4)] flex items-center gap-2">
            Build Your Agent
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <Link to="/contact" className="px-8 py-4 rounded-xl border border-[var(--border-active)] text-[var(--text-secondary)] font-medium text-lg hover:border-[var(--accent-glow)] hover:text-white transition-colors duration-300 bg-transparent">
            Talk to Sales
          </Link>
        </div>
        <div className="w-full max-w-[480px] animate-fadeInUp" style={{ animationDelay: '0.7s' }}>
          <LiveTest />
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ChevronDown className="text-[var(--text-secondary)]" size={24} />
      </div>
    </section>
  );
}
