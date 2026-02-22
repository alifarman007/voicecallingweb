import { AudioLines } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-[var(--border-subtle)] glass-nav z-40 flex items-center justify-center">
      <div className="w-full max-w-[1200px] px-6 flex items-center justify-between">
        <a className="flex items-center gap-2 group" href="#">
          <div className="w-6 h-6 flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform duration-300">
            <AudioLines size={24} />
          </div>
          <span className="font-cabinet font-bold text-white text-lg tracking-wide">VOICE AI</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[
            { name: 'Features', href: '#features' },
            { name: 'Templates', href: '#templates' },
            { name: 'Architecture', href: '#architecture' },
            { name: 'Pricing', href: '#pricing' }
          ].map((item) => (
            <a key={item.name} className="text-[var(--text-secondary)] font-medium text-[15px] hover:text-white transition-colors relative group" href={item.href}>
              {item.name}
              <span className="absolute -bottom-[23px] left-0 w-full h-[2px] bg-[var(--accent-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <a className="hidden md:block text-[var(--text-secondary)] font-medium text-[15px] hover:text-white transition-colors" href="#">Log In</a>
          <a className="bg-[var(--accent-primary)] hover:bg-[#7d6ef0] text-white font-bold text-[15px] px-5 py-2.5 rounded-lg transition-all duration-300 btn-glow" href="#">
            Get Started Free
          </a>
        </div>
      </div>
    </nav>
  );
}
