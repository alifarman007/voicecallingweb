import { Globe, CheckCircle2, ArrowRightLeft } from 'lucide-react';

export default function GlobalReach() {
  const languages1 = [
    { flag: '🇪🇸', name: 'Spanish' },
    { flag: '🇫🇷', name: 'French' },
    { flag: '🇩🇪', name: 'German' },
    { flag: '🇸🇦', name: 'Arabic' },
    { flag: '🇮🇳', name: 'Hindi' },
    { flag: '🇨🇳', name: 'Mandarin' },
    { flag: '🇯🇵', name: 'Japanese' },
    { flag: '🇰🇷', name: 'Korean' },
    { flag: '🇵🇹', name: 'Portuguese' },
    { flag: '🇮🇹', name: 'Italian' },
  ];

  const languages2 = [
    { flag: '🇷🇺', name: 'Russian' },
    { flag: '🇳🇱', name: 'Dutch' },
    { flag: '🇵🇱', name: 'Polish' },
    { flag: '🇸🇪', name: 'Swedish' },
    { flag: '🇺🇦', name: 'Ukrainian' },
    { flag: '🇬🇷', name: 'Greek' },
    { flag: '🇷🇴', name: 'Romanian' },
    { flag: '🇨🇿', name: 'Czech' },
    { flag: '🇭🇺', name: 'Hungarian' },
    { flag: '🇫🇮', name: 'Finnish' },
  ];

  return (
    <section id="features" className="relative w-full py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(108,92,231,0.04)] via-[rgba(34,211,238,0.03)] to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.08] dot-matrix-bg"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--accent-primary)] opacity-[0.06] blur-[120px] rounded-full"></div>
      </div>
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-6 flex flex-col items-center">
        <div className="text-center max-w-4xl mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Globe className="text-[var(--accent-cyan)]" size={18} />
            <span className="text-[12px] font-medium tracking-[0.15em] text-[var(--accent-cyan)] uppercase">Global Reach</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-bold leading-[1.1] text-[var(--text-primary)] mb-6 font-cabinet">
            Speak to <span className="text-gradient-purple-cyan">the World.</span> <br className="hidden md:block" />
            Master the <span className="text-[var(--accent-green)]">Local Market.</span>
          </h2>
          <p className="text-lg md:text-[20px] font-medium text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Communicate flawlessly in <span className="text-[var(--text-primary)] font-bold">50+</span> global languages — Now with <span className="text-[var(--accent-green)] font-bold">Native Bangla Support</span>.
          </p>
          <p className="text-[16px] md:text-[17px] leading-[1.7] text-[var(--text-secondary)] max-w-[720px] mx-auto">
            Your business shouldn't be limited by geography. By leveraging the combined power of the world's best voice engines — Google, ElevenLabs, Azure, and Qwen — your AI agent can instantly converse in popular languages like Spanish, French, German, Arabic, Hindi, Mandarin, and dozens more with hyper-realistic emotion and perfect accents.
          </p>
        </div>

        <div className="w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mb-20">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-[var(--bg-primary)] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-[var(--bg-primary)] to-transparent z-20 pointer-events-none"></div>
          
          <div className="flex flex-col gap-4 group">
            <div className="flex overflow-hidden">
              <div className="flex gap-3 animate-marquee whitespace-nowrap px-3">
                <div className="flex gap-3">
                  {languages1.map((lang, i) => (
                    <span key={i} className="px-5 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)] transition-colors duration-200 cursor-default text-sm font-medium">
                      {lang.flag} {lang.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {languages1.map((lang, i) => (
                    <span key={`dup-${i}`} className="px-5 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)] transition-colors duration-200 cursor-default text-sm font-medium">
                      {lang.flag} {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex overflow-hidden">
              <div className="flex gap-3 animate-marquee-reverse whitespace-nowrap px-3">
                <div className="flex gap-3">
                  {languages2.map((lang, i) => (
                    <span key={i} className="px-5 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)] transition-colors duration-200 cursor-default text-sm font-medium">
                      {lang.flag} {lang.name}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {languages2.map((lang, i) => (
                    <span key={`dup-${i}`} className="px-5 py-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-active)] transition-colors duration-200 cursor-default text-sm font-medium">
                      {lang.flag} {lang.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mb-12 opacity-40">
          <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]"></div>
          <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]"></div>
          <div className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]"></div>
        </div>

        <div className="w-full bg-[var(--bg-secondary)] border border-[rgba(16,185,129,0.15)] rounded-[20px] overflow-hidden card-glow-green relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(16,185,129,0.05)] to-[rgba(9,9,11,0)] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col lg:flex-row">
            <div className="p-8 md:p-12 lg:w-[55%] flex flex-col justify-center">
              <div className="inline-flex items-center self-start px-3 py-1 mb-6 rounded-full bg-[rgba(16,185,129,0.12)] border border-[rgba(16,185,129,0.25)]">
                <span className="text-[11px] font-bold text-[var(--accent-green)] uppercase tracking-widest">🇧🇩 The Unfair Advantage</span>
              </div>
              <h3 className="text-3xl md:text-[32px] font-bold text-[var(--text-primary)] mb-4 leading-tight font-cabinet">
                Native <span className="text-[var(--accent-green)]">বাংলা</span> That No One Else Can Match.
              </h3>
              <p className="text-[16px] text-[var(--text-secondary)] leading-[1.7] mb-8">
                While most AI platforms fail at regional nuance, we dominate it. Our specialized native Bangla integration allows you to serve one of the world's fastest-growing markets with natural, dialect-accurate fluency. Your agent can even switch between English, Bangla, and other global languages seamlessly mid-conversation.
              </p>
              <div className="space-y-3">
                {[
                  'Dialect-accurate Bangla with natural intonation',
                  'Seamless mid-call language switching',
                  'Trained on native speech patterns, not just translations'
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[var(--accent-green)] mt-0.5" size={20} />
                    <span className="text-[14px] font-medium text-[var(--text-primary)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[rgba(9,9,11,0.4)] lg:w-[45%] p-6 md:p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-[var(--border-subtle)]">
              <div className="w-full max-w-sm bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-subtle)]">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></span>
                    <span className="text-[12px] font-medium text-[var(--text-tertiary)] uppercase tracking-wide">Live Call — Greenfield Clinic</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-tertiary)] font-mono">00:42</span>
                </div>
                
                <div className="space-y-5 font-sans">
                  <div className="flex flex-col items-start space-y-1">
                    <span className="text-[10px] text-[var(--text-tertiary)] ml-1 font-mono uppercase">AI Assistant</span>
                    <div className="relative max-w-[90%] bg-[rgba(16,185,129,0.1)] text-[var(--text-primary)] text-[14px] p-3 rounded-2xl rounded-tl-none bubble-caret-left border border-[rgba(16,185,129,0.1)]">
                      হ্যালো! আমি নুসরাত, গ্রিনফিল্ড ক্লিনিক থেকে বলছি। আমি আপনাকে কীভাবে সাহায্য করতে পারি?
                      <div className="text-[10px] text-[var(--text-tertiary)] mt-1 italic opacity-70">
                        (Hello! I am Nusrat, calling from Greenfield Clinic. How can I help you today?)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-1">
                    <span className="text-[10px] text-[var(--text-tertiary)] mr-1 font-mono uppercase">User (Caller)</span>
                    <div className="relative max-w-[90%] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-[14px] p-3 rounded-2xl rounded-tr-none bubble-caret-right border border-[var(--border-active)]">
                      আমি একটি অ্যাপয়েন্টমেন্ট নিতে চাই।
                      <div className="text-[10px] text-[var(--text-tertiary)] mt-1 italic opacity-70">
                        (I'd like to book an appointment.)
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center my-2">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-md">
                      <span className="text-[10px] font-bold text-[var(--text-secondary)]">Detected:</span>
                      <span className="text-[10px] font-mono text-[var(--text-tertiary)]">EN</span>
                      <ArrowRightLeft className="text-[var(--accent-primary)]" size={10} />
                      <span className="text-[10px] font-mono text-[var(--accent-green)] font-bold">BN</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-1">
                    <span className="text-[10px] text-[var(--text-tertiary)] ml-1 font-mono uppercase">AI Assistant</span>
                    <div className="relative max-w-[90%] bg-[rgba(16,185,129,0.1)] text-[var(--text-primary)] text-[14px] p-3 rounded-2xl rounded-tl-none bubble-caret-left border border-[rgba(16,185,129,0.1)] shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      অবশ্যই! আপনার পছন্দের তারিখ ও সময় বলুন।
                      <div className="text-[10px] text-[var(--text-tertiary)] mt-1 italic opacity-70">
                        (Of course! Tell me your preferred date and time.)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center gap-1 justify-center h-4 opacity-50">
                  <div className="w-1 bg-[var(--accent-green)] h-2 rounded-full animate-pulse"></div>
                  <div className="w-1 bg-[var(--accent-green)] h-4 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 bg-[var(--accent-green)] h-3 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 bg-[var(--accent-green)] h-5 rounded-full animate-pulse" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-1 bg-[var(--accent-green)] h-2 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
