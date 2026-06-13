import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import LiveTest from './LiveTest';

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center pt-8 pb-20 z-10 overflow-hidden">
      <div className="hero-glow"></div>
      {/* subtle dot/line grid, masked */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,36,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,36,0.5)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,#000_20%,transparent_100%)] opacity-20 pointer-events-none"></div>
      {/* ambient glow behind the demo card */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[680px] h-[680px] pointer-events-none hidden lg:block"
        style={{
          background:
            'radial-gradient(circle, rgba(108,92,231,0.13) 0%, rgba(34,211,238,0.05) 42%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      ></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative grid lg:grid-cols-[1.08fr_0.92fr] gap-10 lg:gap-14 items-center">
        {/* LEFT — the words */}
        <div className="flex flex-col items-start text-left max-w-[640px]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--border-active)] bg-[rgba(108,92,231,0.08)] mb-7 animate-fadeInDown">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-glow)] animate-pulse"></span>
            <span className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide">
              ✨ Now with Native Bangla Support
            </span>
          </div>

          <h1 className="font-cabinet font-extrabold text-[32px] sm:text-[40px] lg:text-[52px] leading-[1.06] tracking-tight text-white mb-6">
            <span className="block animate-fadeInUp" style={{ animationDelay: '0.1s' }}>Stop Losing Leads.</span>
            <span className="block animate-fadeInUp" style={{ animationDelay: '0.18s' }}>Automate Your Phone Calls</span>
            <span className="block animate-fadeInUp" style={{ animationDelay: '0.26s' }}>
              with <span className="gradient-text">Human-Like AI.</span>
            </span>
          </h1>

          <p className="max-w-[540px] text-base lg:text-lg text-[var(--text-secondary)] leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '0.34s' }}>
            Voice agents in 50+ languages — fluent in Bangla, Hindi, Tamil, and Banglish code-switching.
            ~250–500&nbsp;ms responses. Zero vendor lock-in.
          </p>

          <div className="animate-fadeInUp" style={{ animationDelay: '0.42s' }}>
            <Link
              to="/contact"
              style={{ background: 'linear-gradient(135deg,#6C5CE7 0%,#22D3EE 100%)' }}
              className="group inline-flex items-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(108,92,231,0.45)]"
            >
              Build Your Agent
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-[13px] text-[var(--text-tertiary)] animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
            <span className="flex items-center gap-1.5"><span className="text-[var(--accent-cyan)]">●</span> ~300ms median response</span>
            <span className="flex items-center gap-1.5"><span className="text-[var(--accent-glow)]">●</span> 50+ languages</span>
            <span className="flex items-center gap-1.5"><span className="text-[var(--accent-green)]">●</span> No vendor lock-in</span>
          </div>
        </div>

        {/* RIGHT — the proof (live demo) */}
        <div className="flex justify-center lg:justify-end w-full animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <LiveTest />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hidden md:block">
        <ChevronDown className="text-[var(--text-secondary)]" size={22} />
      </div>
    </section>
  );
}
