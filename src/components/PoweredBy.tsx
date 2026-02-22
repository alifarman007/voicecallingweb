export default function PoweredBy() {
  return (
    <section className="border-t border-[var(--border-subtle)] py-12 bg-[var(--bg-primary)] relative z-20">
      <div className="w-full max-w-[1000px] mx-auto text-center px-6">
        <p className="text-[13px] font-medium text-[var(--text-tertiary)] uppercase tracking-[0.1em] mb-8">
          Powered by the world's best AI infrastructure
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 hover:opacity-100 transition-opacity duration-500">
          <span className="text-xl md:text-2xl font-bold font-cabinet tracking-wide">Google</span>
          <span className="text-xl md:text-2xl font-bold font-cabinet tracking-wide">ElevenLabs</span>
          <span className="text-xl md:text-2xl font-bold font-cabinet tracking-wide">Azure</span>
          <span className="text-xl md:text-2xl font-bold font-cabinet tracking-wide">Qwen</span>
          <span className="text-xl md:text-2xl font-bold font-cabinet tracking-wide">Deepgram</span>
        </div>
      </div>
    </section>
  );
}
