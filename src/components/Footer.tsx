import { AudioLines } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-4">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <AudioLines className="text-[var(--accent-primary)]" size={24} />
            <span className="font-bold text-xl text-white font-cabinet">Voice AI</span>
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
            <li className="hover:text-white cursor-pointer transition-colors">Features</li>
            <li className="hover:text-white cursor-pointer transition-colors">Templates</li>
            <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
            <li className="hover:text-white cursor-pointer transition-colors">API Docs</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 text-sm font-cabinet">Company</h4>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="hover:text-white cursor-pointer transition-colors">About</li>
            <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
            <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4 text-sm font-cabinet">Legal</h4>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
            <li className="hover:text-white cursor-pointer transition-colors">Security</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[var(--border-subtle)] flex flex-col md:flex-row justify-between text-xs text-[var(--text-tertiary)]">
        <p>© 2025 Voice AI Platform. All rights reserved.</p>
        <p>Made with 💜 in Bangladesh</p>
      </div>
    </footer>
  );
}
