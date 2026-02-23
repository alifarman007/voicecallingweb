import { Mail, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  const contacts = [
    {
      name: 'Alif Arman',
      role: 'Managerial Director',
      email: 'alifarman.3021@gmail.com',
      phone: '+8801671300377',
      whatsapp: '+8801671300377',
      image: 'https://images.unsplash.com/photo-1618077360395-f3068be8e001?q=80&w=2080&auto=format&fit=crop', // Handsome full beard
    },
    {
      name: 'Salman MD Abdullah',
      role: 'Managerial Director',
      email: '',
      phone: '+8801710589662',
      whatsapp: '+8801710589662',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2080&auto=format&fit=crop', // Clean beard with glasses
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] pt-24 pb-12 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(108,92,231,0.04)] via-transparent to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--accent-primary)] opacity-[0.05] blur-[150px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8">
          <Link to="/" className="text-[var(--text-secondary)] hover:text-white transition-colors flex items-center gap-2 text-sm font-medium w-fit">
            ← Back to Home
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-cabinet">
            Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-cyan)]">AI Agent</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            To get started with our voice AI platform, please reach out directly to our Managing Directors. We'll help you set up the perfect solution for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {contacts.map((contact, index) => (
            <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 hover:border-[var(--border-active)] transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(108,92,231,0.05)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-[var(--bg-tertiary)] shadow-xl">
                  <img 
                    src={contact.image} 
                    alt={contact.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-1 font-cabinet">{contact.name}</h3>
                <p className="text-[var(--accent-primary)] font-medium text-sm mb-8 tracking-wide uppercase">{contact.role}</p>
                
                <div className="w-full space-y-4">
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:text-white text-[var(--text-secondary)] transition-all group/btn">
                      <Mail size={18} className="group-hover/btn:text-[var(--accent-primary)] transition-colors" />
                      <span className="font-medium text-sm">{contact.email}</span>
                    </a>
                  )}
                  
                  <a href={`tel:${contact.phone}`} className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-green)] hover:text-white text-[var(--text-secondary)] transition-all group/btn">
                    <Phone size={18} className="group-hover/btn:text-[var(--accent-green)] transition-colors" />
                    <span className="font-medium text-sm">{contact.phone}</span>
                  </a>
                  
                  <a href={`https://wa.me/${contact.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] hover:bg-[rgba(16,185,129,0.2)] hover:border-[rgba(16,185,129,0.4)] text-[var(--text-primary)] transition-all group/btn">
                    <MessageCircle size={18} className="text-[var(--accent-green)]" />
                    <span className="font-medium text-sm">Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
