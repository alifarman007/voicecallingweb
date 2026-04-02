import { motion } from 'motion/react';
import { Zap, Globe2, AudioLines, ArrowRightLeft } from 'lucide-react';

export default function NativeS2S() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: "Zero-Friction Latency",
      desc: "By eliminating the STT and TTS processing hops, our native engine achieves blazing-fast response times. Experience instantaneous conversational turn-taking without awkward robotic pauses."
    },
    {
      icon: <Globe2 className="w-6 h-6 text-purple-400" />,
      title: "15+ Native Languages",
      desc: "Field-tested and production-ready across more than 15 global languages. The model understands and responds with flawless native accents, colloquialisms, and cultural nuances out of the box."
    },
    {
      icon: <AudioLines className="w-6 h-6 text-emerald-400" />,
      title: "Uncompromising Accuracy",
      desc: "Direct audio processing means no context is lost in text translation. The engine captures tone, interruptions, and intent with hyper-realistic precision, ensuring seamless dialogue flow."
    }
  ];

  return (
    <section className="py-24 bg-[#050507] text-white relative overflow-hidden border-t border-gray-900">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              New Architecture
            </div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6 tracking-tight leading-tight"
            >
              Beyond the Stack: <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                True Native Speech-to-Speech.
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-300 mb-6 font-medium"
            >
              Bypass the text layer entirely. Deliver ultra-low latency, human-grade conversational fluidity for your most demanding production workloads.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 leading-relaxed mb-10"
            >
              Traditional voice AI relies on a fragmented pipeline—transcribing speech to text, processing logic, and synthesizing audio back. Kotha AI’s Native S2S architecture eliminates these intermediary steps. By processing audio-in to audio-out directly, we eradicate translation latency and preserve the nuanced emotional intelligence of the speaker, resulting in real-time interactions that are indistinguishable from a live human agent.
            </motion.p>

            <div className="flex items-center gap-4 text-sm font-mono text-gray-500 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
              <div className="flex items-center gap-2 line-through opacity-50">
                <span>Audio</span> <ArrowRightLeft className="w-3 h-3" /> <span>Text</span> <ArrowRightLeft className="w-3 h-3" /> <span>Audio</span>
              </div>
              <div className="w-px h-6 bg-gray-700"></div>
              <div className="flex items-center gap-2 text-blue-400 font-bold">
                <span>Audio</span> <ArrowRightLeft className="w-4 h-4" /> <span>Audio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-[#12141a] border border-gray-800 hover:border-gray-700 transition-colors p-6 rounded-2xl shadow-lg"
              >
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
