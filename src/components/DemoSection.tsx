import LiveTest from './LiveTest';

export default function DemoSection() {
  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[700px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(108, 92, 231, 0.10) 0%, rgba(34, 211, 238, 0.04) 35%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      ></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(30,30,36,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,36,0.5)_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.08] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_85%)] pointer-events-none"></div>
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
