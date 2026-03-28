import { Zap, MessageSquare, Cable, AudioLines } from 'lucide-react';

export default function Architecture() {
  return (
    <section id="architecture" className="py-20 lg:py-32 relative bg-[var(--bg-primary)] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE708] to-transparent pointer-events-none"></div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="lg:w-[55%] space-y-8">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]"></span>
              <span className="text-xs font-medium tracking-[0.15em] text-[var(--accent-primary)] uppercase">Architecture</span>
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight font-cabinet">
                Your Language Stack. <br /> Your Rules.
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg">
                Build your agent your way. Swap STT, LLM, and TTS engines in real-time — balance cost, speed, and intelligence with a single click.
              </p>
            </div>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#22D3EE1A] flex items-center justify-center">
                  <Zap className="text-[var(--accent-cyan)]" size={20} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1 font-cabinet">Sub-500ms Latency</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Engineered for ultra-fast, natural conversation without awkward pauses.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#10B9811A] flex items-center justify-center">
                  <MessageSquare className="text-[var(--accent-green)]" size={20} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1 font-cabinet">Seamless Interruptions</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Advanced barge-in technology lets humans interrupt the AI mid-sentence, naturally.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#F59E0B1A] flex items-center justify-center">
                  <Cable className="text-[var(--accent-amber)]" size={20} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white mb-1 font-cabinet">Dynamic API Calling</h4>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Connect to your CRM, calendar, or any custom database mid-conversation in real time.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-[45%] w-full">
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <div className="w-full h-full relative">
                <div className="absolute top-0 left-0 w-full flex justify-center gap-4 z-20">
                  <div className="diagram-node w-20 h-10 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[10px] font-mono text-[var(--text-secondary)] cursor-pointer">GPT-4o</div>
                  <div className="diagram-node active w-20 h-10 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[10px] font-mono text-[var(--text-primary)] cursor-pointer">Qwen 2.5</div>
                  <div className="diagram-node w-20 h-10 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[10px] font-mono text-[var(--text-secondary)] cursor-pointer">Claude</div>
                </div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-40 h-40">
                  <div className="w-full h-full bg-[var(--bg-secondary)] border border-[var(--accent-primary)]/40 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_60px_rgba(108,92,231,0.15)] relative overflow-hidden" style={{ animation: 'pulse-glow 3s infinite ease-in-out' }}>
                    <div className="absolute inset-0 bg-[var(--accent-primary)]/5"></div>
                    <AudioLines className="text-[var(--accent-primary)] mb-2 animate-pulse" size={36} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider text-center px-2">Voice AI<br />Engine</span>
                  </div>
                </div>
                
                <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                  <div className="diagram-node active w-24 h-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[11px] font-medium text-[var(--text-primary)] cursor-pointer">Deepgram</div>
                  <div className="diagram-node w-24 h-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[11px] font-medium text-[var(--text-secondary)] cursor-pointer">Google STT</div>
                  <div className="diagram-node w-24 h-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[11px] font-medium text-[var(--text-secondary)] cursor-pointer">Whisper</div>
                </div>
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                  <div className="diagram-node active w-24 h-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[11px] font-medium text-[var(--text-primary)] cursor-pointer">ElevenLabs</div>
                  <div className="diagram-node w-24 h-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[11px] font-medium text-[var(--text-secondary)] cursor-pointer">Google TTS</div>
                  <div className="diagram-node w-24 h-12 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-lg flex items-center justify-center text-[11px] font-medium text-[var(--text-secondary)] cursor-pointer">Kokoro</div>
                </div>
                
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="line-gradient-left" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#333"></stop>
                      <stop offset="100%" stopColor="#6C5CE7"></stop>
                    </linearGradient>
                    <linearGradient id="line-gradient-right" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#6C5CE7"></stop>
                      <stop offset="100%" stopColor="#333"></stop>
                    </linearGradient>
                    <linearGradient id="line-gradient-top" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#333"></stop>
                      <stop offset="100%" stopColor="#6C5CE7"></stop>
                    </linearGradient>
                  </defs>
                  {/* Top to Center */}
                  <line x1="25%" y1="10%" x2="50%" y2="50%" stroke="url(#line-gradient-top)" strokeOpacity="0.3" strokeWidth="1.5" />
                  <line className="diagram-line" x1="50%" y1="10%" x2="50%" y2="50%" stroke="url(#line-gradient-top)" strokeWidth="2" />
                  <line x1="75%" y1="10%" x2="50%" y2="50%" stroke="url(#line-gradient-top)" strokeOpacity="0.3" strokeWidth="1.5" />
                  
                  {/* Left to Center */}
                  <line className="diagram-line" x1="20%" y1="25%" x2="50%" y2="50%" stroke="url(#line-gradient-left)" strokeWidth="2" />
                  <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="url(#line-gradient-left)" strokeOpacity="0.3" strokeWidth="1.5" />
                  <line x1="20%" y1="75%" x2="50%" y2="50%" stroke="url(#line-gradient-left)" strokeOpacity="0.3" strokeWidth="1.5" />

                  {/* Center to Right */}
                  <line className="diagram-line" x1="50%" y1="50%" x2="80%" y2="25%" stroke="url(#line-gradient-right)" strokeWidth="2" />
                  <line x1="50%" y1="50%" x2="80%" y2="50%" stroke="url(#line-gradient-right)" strokeOpacity="0.3" strokeWidth="1.5" />
                  <line x1="50%" y1="50%" x2="80%" y2="75%" stroke="url(#line-gradient-right)" strokeOpacity="0.3" strokeWidth="1.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
