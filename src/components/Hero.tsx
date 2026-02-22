import { Headphones, Phone, PhoneCall, ChevronDown } from 'lucide-react';

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
          <a className="group relative bg-[var(--accent-primary)] text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(108,92,231,0.4)] flex items-center gap-2" href="#">
            Build Your Agent
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a className="px-8 py-4 rounded-xl border border-[var(--border-active)] text-[var(--text-secondary)] font-medium text-lg hover:border-[var(--accent-glow)] hover:text-white transition-colors duration-300 bg-transparent" href="#">
            Talk to Sales
          </a>
        </div>
        <div className="w-full max-w-[480px] bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 card-glow animate-fadeInUp relative group" style={{ animationDelay: '0.7s' }}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[rgba(108,92,231,0.1)] to-[rgba(34,211,238,0.1)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center">
            <label className="text-[14px] font-medium text-[var(--text-secondary)] mb-4 flex items-center gap-2">
              <Headphones className="text-[var(--accent-primary)]" size={18} />
              Don't believe us? Call our AI right now.
            </label>
            <div className="w-full flex items-center gap-2">
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]" size={20} />
                <input className="w-full bg-[var(--bg-tertiary)] text-white border border-[var(--border-subtle)] rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] placeholder-[var(--text-tertiary)] transition-all" placeholder="Enter your phone number" type="tel" />
              </div>
              <button className="bg-[var(--accent-primary)] hover:bg-[#7d6ef0] text-white font-bold px-4 py-3 rounded-lg text-sm transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-lg shadow-[rgba(108,92,231,0.2)]">
                Call Me
                <PhoneCall size={16} />
              </button>
            </div>
            <p className="text-[12px] text-[var(--text-tertiary)] mt-3">
              Free. No signup required. Takes 15 seconds.
            </p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <ChevronDown className="text-[var(--text-secondary)]" size={24} />
      </div>
    </section>
  );
}
