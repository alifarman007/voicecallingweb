import { motion, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Calendar, CheckCircle2, Phone, User, Activity } from 'lucide-react';

export default function AutomatedActionEngine() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (isInView) {
      const sequence = async () => {
        // Scene 1: Dashboard slides in, call is active (step 0 to 1)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStep(1);
        
        // Scene 2: Live Insights populating (step 1 to 2)
        await new Promise(resolve => setTimeout(resolve, 2500));
        setStep(2);

        // Scene 3: Call concludes, appointment booked (step 2 to 3)
        await new Promise(resolve => setTimeout(resolve, 2500));
        setStep(3);

        // Scene 4: Text fades in (step 3 to 4)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStep(4);
      };
      sequence();
    }
  }, [isInView]);

  return (
    <section className="py-24 bg-black text-white overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold mb-6 tracking-tight"
          >
            The Automated Action Engine
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            More than just voice. Our AI understands context and performs automated tasks instantly.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Dashboard Container */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-[#0f1115] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[500px]"
          >
            {/* Left Panel: Active Call */}
            <div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-800 flex flex-col relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${step < 3 ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`}></div>
                  <span className="text-gray-300 font-medium">
                    {step < 3 ? 'Live Call Active' : 'Call Concluded'}
                  </span>
                </div>
                <div className="text-gray-500 font-mono text-sm">02:45</div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center py-12 md:py-0">
                <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center mb-12 relative">
                  {step < 3 && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 rounded-full border border-blue-500/30"
                    ></motion.div>
                  )}
                  <Phone className={`w-10 h-10 ${step < 3 ? 'text-blue-400' : 'text-gray-500'}`} />
                </div>
                
                {/* Soundwave Animation */}
                <div className="flex items-center space-x-1.5 h-16 w-full max-w-[200px] justify-center">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={
                        step < 3 
                          ? { height: ['20%', '100%', '20%'] } 
                          : { height: '10%' }
                      }
                      transition={
                        step < 3 
                          ? { 
                              repeat: Infinity, 
                              duration: 0.8 + Math.random() * 0.5,
                              delay: i * 0.1,
                              ease: "easeInOut"
                            }
                          : { duration: 0.5 }
                      }
                      className={`w-2 rounded-full ${step < 3 ? 'bg-blue-500' : 'bg-gray-700'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Panel: Live Insights */}
            <div className="w-full md:w-1/2 p-8 bg-[#14161b] relative flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Live Insights
              </h3>

              <div className="space-y-4">
                {/* Name Extraction */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#1c1f26] p-4 rounded-xl border border-gray-800/50"
                >
                  <div className="flex items-center text-gray-400 text-xs uppercase tracking-wider mb-2">
                    <User className="w-3 h-3 mr-1" /> Caller Identity
                  </div>
                  <div className="text-white font-medium">Sarah Jenkins</div>
                  <div className="text-gray-500 text-sm">Existing Customer</div>
                </motion.div>

                {/* Intent Extraction */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-[#1c1f26] p-4 rounded-xl border border-gray-800/50"
                >
                  <div className="flex items-center text-gray-400 text-xs uppercase tracking-wider mb-2">
                    <Activity className="w-3 h-3 mr-1" /> Primary Intent
                  </div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Schedule Consultation
                  </div>
                </motion.div>

                {/* JSON Data / Summary */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={step >= 2 ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-[#0a0b0e] p-4 rounded-xl border border-gray-800 font-mono text-sm overflow-hidden relative"
                >
                  <div className="text-gray-500 mb-2">// Extracted Data</div>
                  <div className="text-gray-300">
                    <span className="text-pink-400">{"{"}</span><br/>
                    &nbsp;&nbsp;<span className="text-blue-300">"action"</span>: <span className="text-green-300">"book_appointment"</span>,<br/>
                    &nbsp;&nbsp;<span className="text-blue-300">"date"</span>: <span className="text-green-300">"Tomorrow"</span>,<br/>
                    &nbsp;&nbsp;<span className="text-blue-300">"time"</span>: <span className="text-green-300">"2:00 PM"</span><br/>
                    <span className="text-pink-400">{"}"}</span>
                  </div>
                  
                  {/* Scanning effect */}
                  {step === 2 && (
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                      className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent pointer-events-none"
                    />
                  )}
                </motion.div>
              </div>

              {/* Connecting Line (Scene 3) - Only visible on desktop */}
              {step >= 3 && (
                <svg className="absolute top-1/2 -left-12 w-24 h-24 pointer-events-none z-10 hidden md:block" style={{ transform: 'translateY(-50%)' }}>
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    d="M 0,50 C 40,50 60,50 100,50"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <motion.circle
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.3 }}
                    cx="100" cy="50" r="4" fill="#3b82f6"
                  />
                </svg>
              )}

              {/* Appointment Booked Notification (Scene 3) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={step >= 3 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="absolute -bottom-12 md:-right-12 md:top-1/2 md:transform md:-translate-y-1/2 bg-white text-black p-4 rounded-xl shadow-2xl border border-gray-200 w-64 z-20 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0"
              >
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Appointment Booked</h4>
                    <p className="text-xs text-gray-600 mt-1">Tomorrow at 2:00 PM with Sarah Jenkins</p>
                    <div className="mt-3 flex items-center text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded inline-flex">
                      <Calendar className="w-3 h-3 mr-1" /> Added to Calendar
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Final Text (Scene 4) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={step >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="mt-24 md:mt-16 text-center"
          >
            <p className="text-2xl md:text-3xl font-medium text-white">
              More than just voice. <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Automated workflows and seamless integrations.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
