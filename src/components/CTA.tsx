import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[var(--bg-primary)] via-[#0F0A1A] to-[var(--bg-primary)]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--accent-primary)] rounded-full blur-[150px] opacity-10 animate-pulse pointer-events-none z-0"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute w-1 h-1 bg-[var(--accent-glow)] rounded-full top-[20%] left-[10%] opacity-20 animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute w-2 h-2 bg-[var(--accent-glow)] rounded-full top-[60%] left-[80%] opacity-10 animate-bounce" style={{ animationDuration: '6s' }}></div>
        <div className="absolute w-1 h-1 bg-[var(--accent-glow)] rounded-full top-[80%] left-[20%] opacity-20 animate-bounce" style={{ animationDuration: '5s' }}></div>
        <div className="absolute w-1.5 h-1.5 bg-[var(--accent-glow)] rounded-full top-[30%] right-[15%] opacity-15 animate-bounce" style={{ animationDuration: '7s' }}></div>
      </div>
      <div className="relative z-10 max-w-4xl px-6">
        <h2 className="text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] mb-6 tracking-tight leading-tight font-cabinet">
          Ready to Put Your Calls<br />on <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--text-secondary)]">Autopilot?</span>
        </h2>
        <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
          Join hundreds of businesses using AI voice agents to save time, close more deals, and never miss a call.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="btn-primary px-8 py-4 rounded-xl text-base font-semibold tracking-wide flex items-center gap-2 group">
            Build Your Free Agent
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>
          <button className="btn-ghost px-8 py-4 rounded-xl text-base font-medium flex items-center gap-2">
            Talk to Sales
          </button>
        </div>
      </div>
    </section>
  );
}
