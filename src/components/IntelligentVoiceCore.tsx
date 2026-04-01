import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Smartphone, User, FileText, Table, Network, Search, CheckCircle } from 'lucide-react';

export default function IntelligentVoiceCore() {
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    let startTime = Date.now();
    let animationFrame: number;
    const loopDuration = 10000;

    const tick = () => {
      const elapsed = (Date.now() - startTime) % loopDuration;
      if (elapsed < 2000) setPhase(1);
      else if (elapsed < 4000) setPhase(2);
      else if (elapsed < 7000) setPhase(3);
      else setPhase(4);
      animationFrame = requestAnimationFrame(tick);
    };
    
    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="py-24 bg-[#121212] text-white overflow-hidden relative border-t border-gray-800">
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#1e3a8a1a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            The Intelligent Voice Core
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From First Hello to Final Resolution—Automatically.
          </p>
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto min-h-[500px] gap-12 lg:gap-0">
          
          {/* Left Hub (Input) */}
          <div className="relative w-full lg:w-1/4 flex justify-center z-20">
            <motion.div 
              animate={phase === 1 ? { rotate: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.5, repeat: phase === 1 ? Infinity : 0, repeatDelay: 1 }}
              className="relative"
            >
              <div className={`absolute inset-0 bg-blue-500/20 blur-2xl rounded-full transition-opacity duration-500 ${phase === 1 ? 'opacity-100' : 'opacity-30'}`}></div>
              <div className="bg-[#1a1c23] border border-gray-700 p-6 rounded-3xl shadow-[0_0_30px_rgba(59,130,246,0.15)] relative z-10">
                <Smartphone className="w-16 h-16 text-blue-400" />
              </div>
              
              {/* Phase 4: Caller Text Bubble */}
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={phase === 4 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
                className="absolute -top-16 -left-12 bg-gray-800 border border-gray-700 rounded-2xl rounded-br-none px-4 py-2 text-sm text-gray-200 whitespace-nowrap shadow-xl"
              >
                "Can I talk to Sales?"
              </motion.div>
            </motion.div>
          </div>

          {/* Center Hub (Processing) */}
          <div className="relative w-full lg:w-1/2 flex justify-center z-20">
            {/* Connection Lines from Left to Center */}
            <div className="absolute top-1/2 left-0 w-1/2 h-0.5 -translate-y-1/2 -z-10 hidden lg:block">
              <div className="w-full h-full bg-gray-800 relative overflow-hidden">
                {phase === 1 && (
                  <motion.div 
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                  />
                )}
                {phase === 2 && (
                  <motion.div 
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-full flex items-center justify-around"
                  >
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-4 w-1 bg-blue-500/50 rounded-full" style={{ height: `${Math.random() * 20 + 4}px` }}></div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>

            {/* The Brain */}
            <div className="relative">
              <motion.div 
                animate={phase === 2 ? { scale: [1, 1.05, 1] } : { scale: [1, 1.02, 1] }}
                transition={{ duration: phase === 2 ? 0.5 : 2, repeat: Infinity }}
                className="w-48 h-48 rounded-full backdrop-blur-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center relative shadow-[0_0_50px_rgba(59,130,246,0.2)]"
              >
                {/* Neural paths simulation */}
                <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 100 100">
                  <path d="M50,20 L60,40 L80,50 L60,60 L50,80 L40,60 L20,50 L40,40 Z" fill="none" stroke="#3b82f6" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="15" fill="none" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" />
                  <circle cx="50" cy="50" r="5" fill="#60a5fa" />
                </svg>
                <div className="text-blue-400 font-bold tracking-widest text-sm z-10 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm border border-blue-500/20">KOTHA</div>
              </motion.div>

              {/* Phase 2: Intent Text Bubble */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={phase === 2 ? { opacity: 1, y: -20 } : { opacity: 0, y: 10 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#1a1c23] border border-blue-500/30 rounded-2xl px-5 py-3 text-sm text-gray-300 whitespace-nowrap shadow-[0_0_20px_rgba(59,130,246,0.15)]"
              >
                "I'm having a <span className="text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">login</span> <span className="text-blue-400 font-semibold drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]">issue</span>."
              </motion.div>
            </div>
          </div>

          {/* Right Hub (The Ecosystem) */}
          <div className="relative w-full lg:w-1/4 flex flex-col gap-4 z-20">
            {/* Connection Lines from Center to Right */}
            <div className="absolute top-1/2 right-full w-full h-full -translate-y-1/2 -z-10 hidden lg:block">
              {/* Top Line to CRM */}
              <div className="absolute top-[15%] left-0 w-full h-0.5 bg-gray-800 origin-left transform -rotate-12">
                {phase === 3 && <motion.div animate={{ left: ['-100%', '100%'] }} transition={{ duration: 0.6 }} className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />}
              </div>
              {/* Middle Line to Ticket */}
              <div className="absolute top-[40%] left-0 w-full h-0.5 bg-gray-800">
                {phase === 3 && <motion.div animate={{ left: ['-100%', '100%'] }} transition={{ duration: 0.6, delay: 0.1 }} className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />}
              </div>
              {/* Bottom Line to Sheet */}
              <div className="absolute top-[65%] left-0 w-full h-0.5 bg-gray-800 origin-left transform rotate-12">
                {phase === 3 && <motion.div animate={{ left: ['-100%', '100%'] }} transition={{ duration: 0.6, delay: 0.2 }} className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />}
              </div>
            </div>

            {/* Phase 4 Direct Bridge from Phone to Routing */}
            {phase === 4 && (
              <svg className="absolute top-1/2 right-full w-[300%] h-[120%] -translate-y-1/2 -z-10 hidden lg:block pointer-events-none" style={{ left: '-300%' }}>
                <motion.path 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  d="M 50,50 Q 150,120 300,90" 
                  fill="none" 
                  stroke="#3b82f6" 
                  strokeWidth="3" 
                  strokeDasharray="6 6"
                />
              </svg>
            )}

            {/* Card 1: CRM Status */}
            <motion.div 
              animate={{ 
                opacity: phase === 4 ? 0.4 : 1,
                boxShadow: phase === 1 ? "0 0 20px rgba(59,130,246,0.4)" : "0 0 0px rgba(0,0,0,0)"
              }}
              className="bg-[#1a1c23]/80 backdrop-blur-sm border border-gray-700 p-4 rounded-xl relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gray-800 rounded-lg"><User className="w-4 h-4 text-gray-400" /></div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">CRM Status</span>
              </div>
              
              <div className="h-10 relative flex items-center">
                {phase === 1 && (
                  <motion.div 
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                      <Search className="w-5 h-5 text-blue-400" />
                    </motion.div>
                  </motion.div>
                )}
                
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
                  transition={{ delay: phase === 1 ? 1 : 0 }}
                  className="flex items-center gap-3 w-full"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold">AF</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Ali Farman</div>
                    <div className={`text-xs ${phase >= 3 ? 'text-red-400' : 'text-green-400'}`}>
                      {phase >= 3 ? 'Active Issue' : 'Online'}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Card 2: Ticketing System */}
            <motion.div 
              animate={{ opacity: phase === 4 ? 0.4 : 1 }}
              className="bg-[#1a1c23]/80 backdrop-blur-sm border border-gray-700 p-4 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gray-800 rounded-lg"><FileText className="w-4 h-4 text-gray-400" /></div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Ticketing</span>
              </div>
              <div className="h-8 flex items-center">
                {phase >= 3 ? (
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-lg w-full"
                  >
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-mono text-blue-300">#TK-8832</span>
                  </motion.div>
                ) : (
                  <div className="text-xs text-gray-600 italic">Awaiting input...</div>
                )}
              </div>
            </motion.div>

            {/* Card 3: Real-time Sheet */}
            <motion.div 
              animate={{ opacity: phase === 4 ? 0.4 : 1 }}
              className="bg-[#1a1c23]/80 backdrop-blur-sm border border-gray-700 p-4 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gray-800 rounded-lg"><Table className="w-4 h-4 text-gray-400" /></div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Live Sheet</span>
              </div>
              <div className="h-8 flex items-center bg-gray-900/50 rounded px-2 border border-gray-800">
                {phase >= 3 ? (
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1 }}
                    className="overflow-hidden whitespace-nowrap text-xs font-mono text-gray-300"
                  >
                    [Ali | Login Issue | Open]
                  </motion.div>
                ) : (
                  <div className="w-full h-1 bg-gray-800 rounded-full"></div>
                )}
              </div>
            </motion.div>

            {/* Card 4: Department Routing */}
            <motion.div 
              animate={{ 
                boxShadow: phase === 4 ? "0 0 20px rgba(59,130,246,0.3)" : "0 0 0px rgba(0,0,0,0)",
                borderColor: phase === 4 ? "rgba(59,130,246,0.5)" : "rgba(55,65,81,1)"
              }}
              className="bg-[#1a1c23]/80 backdrop-blur-sm border p-4 rounded-xl transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gray-800 rounded-lg"><Network className="w-4 h-4 text-gray-400" /></div>
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Routing</span>
              </div>
              <div className="h-10 flex items-center">
                {phase === 4 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-3 w-full"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center"
                    >
                      <User className="w-4 h-4 text-blue-400" />
                    </motion.div>
                    <div>
                      <div className="text-sm font-medium text-white">Sales Team</div>
                      <div className="text-xs text-blue-400 animate-pulse">Transferring... 📞</div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-xs text-gray-600 italic">Standby...</div>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
