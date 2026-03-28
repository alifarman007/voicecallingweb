import { Headphones, Rocket, ClipboardCheck, CreditCard, ArrowRight } from 'lucide-react';

export default function Templates() {
  const templates = [
    {
      title: 'Receptionist',
      desc: 'Handles FAQs, routes calls intelligently, and takes messages 24/7.',
      tags: ['Clinics', 'Salons'],
      voice: 'Sarah (US)',
      color: 'green',
      hex: '#10B981',
      icon: <Headphones className="text-white" size={24} />,
      img: 'https://i.ibb.co.com/s9NhQSqk/Gemini-Generated-Image-elafmcelafmcelaf-1.png'
    },
    {
      title: 'Sales Agent',
      desc: 'Dials 1,000+ leads/hr, qualifies prospects, and books meetings.',
      tags: ['B2B', 'Real Estate'],
      voice: 'Marcus (UK)',
      color: 'amber',
      hex: '#F59E0B',
      icon: <Rocket className="text-white" size={24} />,
      img: 'https://i.ibb.co.com/gMsmD0gd/Gemini-Generated-Image-xi89jzxi89jzxi89-1.png'
    },
    {
      title: 'Appointment Booking Agent',
      desc: 'Seamlessly schedules, reschedules, and manages calendar appointments 24/7.',
      tags: ['Healthcare', 'Services'],
      voice: 'Emma (AU)',
      color: 'cyan',
      hex: '#22D3EE',
      icon: <ClipboardCheck className="text-white" size={24} />,
      img: 'https://i.ibb.co.com/bg0sXZ95/Chat-GPT-Image-Mar-28-2026-03-36-52-PM-1.png'
    },
    {
      title: 'Follow Up Agent',
      desc: 'Automatically reaches out to leads, gathers feedback, and nurtures relationships.',
      tags: ['Sales', 'Real Estate'],
      voice: 'David (US)',
      color: 'red',
      hex: '#EF4444',
      icon: <CreditCard className="text-white" size={24} />,
      img: 'https://i.ibb.co.com/VWtGGqbc/Chat-GPT-Image-Mar-28-2026-03-39-25-PM-1.png'
    }
  ];

  return (
    <section id="templates" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--accent-primary)] rounded-full blur-[120px] opacity-[0.04]"></div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
            <span className="text-xs font-medium tracking-[0.15em] text-[var(--accent-primary)] uppercase">Templates</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6 leading-tight font-cabinet">
            Ready-to-Work Agents for <br /> Every Industry.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Don't start from scratch. Deploy battle-tested, pre-built agents in one click and customize them to your brand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((tpl, i) => (
            <div key={i} className={`group agent-card relative rounded-3xl overflow-hidden border border-[var(--border-subtle)] h-[440px] cursor-pointer card-${tpl.title.toLowerCase().split(' ')[0]}`}>
              <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: `${tpl.hex}05` }}></div>
              <div className="h-[260px] w-full relative overflow-hidden bg-[#151518]">
                <img alt={`Portrait of ${tpl.title} AI agent`} className="agent-img w-full h-full object-cover object-center" src={tpl.img} loading="lazy" decoding="async" />
                <div className="agent-overlay absolute inset-0"></div>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: tpl.hex }}></div>
                  <span className="text-[10px] font-medium text-white uppercase tracking-wider">Active</span>
                </div>
                <div className="audio-visualizer absolute bottom-4 left-4 right-4 flex items-end justify-center gap-1 h-6 opacity-0 transition-opacity duration-300">
                  {[0.1, 0.2, 0.3, 0.1, 0.4].map((delay, j) => (
                    <div key={j} className="audio-wave-bar w-1" style={{ backgroundColor: tpl.hex, animationDelay: `${delay}s` }}></div>
                  ))}
                </div>
              </div>
              <div className="relative z-10 p-6 -mt-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mb-4 border group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: tpl.hex, borderColor: `${tpl.hex}44`, boxShadow: `0 10px 15px -3px ${tpl.hex}33` }}>
                  {tpl.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 transition-colors font-cabinet" style={{ color: `var(--text-primary)` }} onMouseEnter={(e) => e.currentTarget.style.color = tpl.hex} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}>{tpl.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed line-clamp-2">
                  {tpl.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tpl.tags.map((tag, j) => (
                    <span key={j} className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide" style={{ backgroundColor: `${tpl.hex}14`, borderColor: `${tpl.hex}26`, color: tpl.hex, borderWidth: '1px' }}>{tag}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-[var(--border-subtle)] flex justify-between items-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] text-[var(--text-tertiary)] uppercase font-medium tracking-wider">Voice: {tpl.voice}</span>
                  <ArrowRight className="text-[var(--text-secondary)] group-hover:translate-x-1 transition-transform" size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a className="inline-flex items-center gap-2 text-[var(--accent-primary)] font-semibold text-sm hover:underline group" href="#">
            Explore All Templates 
            <ArrowRight className="transition-transform group-hover:translate-x-1" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
