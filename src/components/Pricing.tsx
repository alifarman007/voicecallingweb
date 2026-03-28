import { Check, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 md:py-32 px-4 md:px-8 border-t border-[var(--border-subtle)]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb w-[600px] h-[600px] top-[-200px] left-1/2 -translate-x-1/2 opacity-10 bg-[var(--accent-primary)] blur-[120px]"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-active)] mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></span>
            <span className="text-xs font-medium tracking-widest text-[var(--accent-glow)] uppercase">Pricing</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-[var(--text-primary)] mb-6 leading-[1.1] font-cabinet">
            Pay Only For <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-cyan)]">What You Use.</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)]">
            No hidden fees. No contracts. Start free and scale as you grow.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="group relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-active)] transition-all duration-300 hover:-translate-y-1">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2 font-cabinet">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-[var(--text-primary)]">$0</span>
                <span className="text-[var(--text-secondary)]">/mo</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-2">Free API credits to build & test</p>
            </div>
            <ul className="space-y-4 mb-8">
              {['10 free minutes included', 'Access to all AI engines', '1 phone number', 'Community support'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                  <Check className="text-[var(--accent-green)] mt-0.5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="block text-center w-full py-3 px-4 rounded-lg border border-[var(--border-active)] text-[var(--text-primary)] font-medium text-sm hover:border-[var(--accent-primary)] hover:text-white hover:shadow-[0_0_15px_rgba(108,92,231,0.2)] transition-all duration-300">
              Start Building Free
            </Link>
          </div>
          
          <div className="relative bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/40 rounded-2xl p-8 shadow-[0_0_40px_rgba(108,92,231,0.15)] transform md:-translate-y-4">
            <div className="absolute -top-3 right-6 bg-[var(--accent-primary)] text-white text-[10px] font-bold tracking-wider px-3 py-1 rounded-full uppercase shadow-lg shimmer">
              Most Popular
            </div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2 font-cabinet">Pay-as-you-Go</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[var(--accent-glow)]">$0.09</span>
                <span className="text-[var(--text-secondary)]">/min</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-2">STT + LLM + TTS bundled</p>
              <p className="text-[10px] text-[var(--text-tertiary)] mt-1 italic">* Price may vary depending on the models</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-[var(--text-primary)] text-sm font-medium">
                <CheckCircle2 className="text-[var(--accent-primary)] mt-0.5" size={18} />
                <span>Everything in Starter</span>
              </li>
              {['Unlimited minutes', '10 phone numbers', 'CRM integrations (HubSpot, Salesforce)', 'Priority email support'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                  <Check className="text-[var(--accent-primary)] mt-0.5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="block text-center w-full py-3 px-4 rounded-lg bg-[var(--accent-primary)] text-white font-semibold text-sm hover:bg-[var(--accent-glow)] hover:shadow-[0_0_25px_rgba(108,92,231,0.5)] transition-all duration-300 transform hover:scale-[1.02]">
              Get Started →
            </Link>
          </div>
          
          <div className="group relative bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-active)] transition-all duration-300 hover:-translate-y-1">
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[var(--text-primary)] mb-2 font-cabinet">Enterprise</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-[var(--text-primary)]">Custom</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-2">Volume discounts & dedicated infra</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-[var(--text-primary)] text-sm font-medium">
                <CheckCircle2 className="text-[var(--text-tertiary)] mt-0.5" size={18} />
                <span>Everything in Pay-as-you-Go</span>
              </li>
              {['Dedicated servers (GPU)', 'SLA guarantee (99.9% uptime)', 'Dedicated account manager'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[var(--text-secondary)] text-sm">
                  <Check className="text-[var(--text-tertiary)] mt-0.5" size={18} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="block text-center w-full py-3 px-4 rounded-lg border border-[var(--border-active)] text-[var(--text-primary)] font-medium text-sm hover:border-[var(--accent-primary)] hover:text-white hover:shadow-[0_0_15px_rgba(108,92,231,0.2)] transition-all duration-300">
              Talk to Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
