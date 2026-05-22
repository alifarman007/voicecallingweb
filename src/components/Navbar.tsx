import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 border-b border-[var(--border-subtle)] glass-nav z-40 flex items-center justify-center">
      <div className="w-full max-w-[1200px] px-6 flex items-center justify-between">
        <a className="flex items-center gap-2.5 group" href="#" aria-label="KOTHA AI Home">
          <img
            src="/logo-symbol.svg"
            alt=""
            aria-hidden="true"
            className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
          />
          <img
            src="/kotha_ai_logo_wordmark_white.svg"
            alt="KOTHA AI"
            className="h-5 w-auto"
          />
        </a>
        
        {/* Desktop Navigation */}
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
        
        <div className="hidden md:flex items-center gap-4">
          <Link to="/contact" className="bg-[var(--accent-primary)] hover:bg-[#7d6ef0] text-white font-bold text-[15px] px-5 py-2.5 rounded-lg transition-all duration-300 btn-glow">
            Get Started Free
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-[var(--text-secondary)] hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] shadow-xl md:hidden flex flex-col px-6 py-4 gap-4 animate-fadeInDown">
          {[
            { name: 'Features', href: '#features' },
            { name: 'Templates', href: '#templates' },
            { name: 'Architecture', href: '#architecture' },
            { name: 'Pricing', href: '#pricing' }
          ].map((item) => (
            <a 
              key={item.name} 
              className="text-[var(--text-secondary)] font-medium text-lg hover:text-white transition-colors py-2 border-b border-[var(--border-subtle)]" 
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-2">
            <Link
              to="/contact"
              className="text-center bg-[var(--accent-primary)] hover:bg-[#7d6ef0] text-white font-bold text-lg px-5 py-3 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
