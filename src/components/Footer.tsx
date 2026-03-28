import { AudioLines } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <AudioLines className="text-[var(--accent-primary)]" size={24} />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white font-cabinet leading-none">KOTHA AI</span>
              <span className="text-[9px] text-[var(--text-tertiary)] uppercase tracking-[0.2em] mt-1 font-medium">Your Voice, Automated</span>
            </div>
          </div>
          <p className="text-[var(--text-secondary)] text-sm mb-6">The most flexible voice AI platform.</p>
          <div className="flex gap-4">
            <div className="w-5 h-5 bg-[var(--text-tertiary)] hover:bg-white transition-colors cursor-pointer rounded-sm"></div>
            <div className="w-5 h-5 bg-[var(--text-tertiary)] hover:bg-white transition-colors cursor-pointer rounded-sm"></div>
            <div className="w-5 h-5 bg-[var(--text-tertiary)] hover:bg-white transition-colors cursor-pointer rounded-sm"></div>
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 text-sm font-cabinet">Product</h4>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li><Link to="/contact" className="hover:text-white transition-colors block">Features</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">Templates</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">API Docs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 text-sm font-cabinet">Company</h4>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li><Link to="/contact" className="hover:text-white transition-colors block">About</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">Careers</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 text-sm font-cabinet">Legal</h4>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li><Link to="/contact" className="hover:text-white transition-colors block">Privacy Policy</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">Terms of Service</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors block">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between text-xs text-[var(--text-tertiary)]">
        <p>© 2026 KOTHA AI Platform. All rights reserved.</p>
        <p>Made with 💜 in Bangladesh</p>
      </div>
    </footer>
  );
}
