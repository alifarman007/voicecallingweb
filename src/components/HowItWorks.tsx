import { LayoutTemplate, Cable, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: 'Pick a Template',
      description: 'Choose from battle-tested agent templates — receptionist, sales, appointment booking, follow-up — or build your own from scratch.',
      icon: LayoutTemplate,
      colorClass: 'text-[var(--accent-primary)]',
      bgClass: 'bg-[var(--accent-primary)]/10',
      borderClass: 'border-[var(--accent-primary)]/20',
    },
    {
      id: 2,
      title: 'Connect Your Stack',
      description: 'Link your phone number, CRM, calendar, and any custom tools. Choose your preferred STT, LLM, and TTS engines.',
      icon: Cable,
      colorClass: 'text-[var(--accent-cyan)]',
      bgClass: 'bg-[var(--accent-cyan)]/10',
      borderClass: 'border-[var(--accent-cyan)]/20',
    },
    {
      id: 3,
      title: 'Go Live',
      description: 'Your AI agent starts handling calls instantly — 24/7, in 50+ languages, with real-time analytics.',
      icon: Rocket,
      colorClass: 'text-[var(--accent-green)]',
      bgClass: 'bg-[var(--accent-green)]/10',
      borderClass: 'border-[var(--accent-green)]/20',
    }
  ];

  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-[var(--bg-primary)] relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></span>
            <span className="text-[12px] font-medium tracking-[0.15em] text-[var(--accent-primary)] uppercase">How It Works</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-cabinet leading-[1.1]">
            Three Steps to Your First AI Agent.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-[44px] left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-[var(--border-subtle)] z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className="group relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-active)] hover:-translate-y-1 transition-all duration-300 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${step.bgClass} ${step.borderClass} border transition-colors duration-300`}>
                    <step.icon className={step.colorClass} size={28} />
                  </div>
                  <span className={`text-6xl font-cabinet font-bold opacity-10 ${step.colorClass} group-hover:opacity-20 transition-opacity duration-300 leading-none`}>
                    0{step.id}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4 font-cabinet">{step.title}</h3>
                <p className="text-[16px] text-[var(--text-secondary)] leading-relaxed font-satoshi">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
