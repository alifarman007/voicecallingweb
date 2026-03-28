import LiveTest from './LiveTest';

export default function DemoSection() {
  return (
    <section id="demo" className="py-20 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,36,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,36,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none"></div>
      <div className="max-w-[1200px] mx-auto px-6 relative z-10 flex flex-col items-center">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-cabinet">
            Experience the Magic
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            Try our live AI agent right now. Speak naturally, interrupt, and see how fast it responds.
          </p>
        </div>
        <div className="w-full max-w-[480px]">
          <LiveTest />
        </div>
      </div>
    </section>
  );
}
