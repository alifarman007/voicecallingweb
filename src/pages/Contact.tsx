import { useState } from 'react';
import { Mail, Phone, MessageCircle, ClipboardCheck, Monitor, Rocket, Globe, Zap, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    useCase: 'Inbound Call Handling (Receptionist)',
    volume: 'Not sure yet',
    message: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValid = formData.name.trim() !== '' && 
                  formData.company.trim() !== '' && 
                  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

  const handleSubmit = async () => {
    if (!isValid) return;
    
    setIsSubmitting(true);
    setError('');

    try {
      // Get credentials (checking both with and without VITE_ prefix just in case)
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

      if (SERVICE_ID === 'YOUR_SERVICE_ID' || !SERVICE_ID) {
        throw new Error("EmailJS credentials are missing. Please make sure you added them with the 'VITE_' prefix in the Secrets menu.");
      }

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        company: formData.company,
        use_case: formData.useCase,
        volume: formData.volume,
        message: formData.message,
        to_name: 'KOTHA AI Team'
      };

      // In EmailJS v4+, the 4th argument must be an object containing the publicKey
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
      });
      
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Failed to send email:', err);
      setError(err.message || 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    {
      name: 'Alif Arman',
      role: 'Managing Director',
      email: 'alifarman.3027@gmail.com',
      phone: '+8801671300377',
      whatsapp: '+8801671300377',
      image: 'https://i.ibb.co.com/1GcjWXVQ/Gemini-Generated-Image-32zx9932zx9932zx.png',
    },
    {
      name: 'Salman MD Abdullah',
      role: 'Managing Director',
      email: '',
      phone: '+8801710589662',
      whatsapp: '+8801710589662',
      image: 'https://i.ibb.co.com/R4Vs64Y8/Gemini-Generated-Image-loudc1loudc1loud.png',
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-satoshi relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-[rgba(108,92,231,0.04)] via-transparent to-transparent pointer-events-none z-0"></div>

      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-24 relative z-10">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center text-[var(--text-secondary)] hover:text-white mb-12 transition-colors text-sm font-medium">
          ← Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center max-w-[700px] mx-auto mb-16 animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-6 font-cabinet">
            Let's Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-cyan)]">AI Agent</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Tell us about your business and we'll set up the perfect voice AI solution — or reach out directly to our team.
          </p>
        </div>

        {/* Main Content: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* LEFT COLUMN: Contact Form */}
          <div className="lg:col-span-7 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 card-glow">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 bg-[rgba(16,185,129,0.1)] rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-[var(--accent-green)]" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold font-cabinet mb-2">Request Received</h3>
                  <p className="text-[var(--text-secondary)]">Thanks! We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Full Name <span className="text-[var(--accent-primary)]">*</span></label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Work Email <span className="text-[var(--accent-primary)]">*</span></label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Company Name <span className="text-[var(--accent-primary)]">*</span></label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                      placeholder="Acme Corp"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Use Case</label>
                      <select 
                        value={formData.useCase}
                        onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors appearance-none"
                      >
                        <option>Inbound Call Handling (Receptionist)</option>
                        <option>Outbound Sales Calls</option>
                        <option>Appointment Booking</option>
                        <option>Customer Support</option>
                        <option>Lead Follow-up</option>
                        <option>Custom / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Expected Monthly Volume</label>
                      <select 
                        value={formData.volume}
                        onChange={(e) => setFormData({...formData, volume: e.target.value})}
                        className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors appearance-none"
                      >
                        <option>Less than 500</option>
                        <option>500 - 2,000</option>
                        <option>2,000 - 10,000</option>
                        <option>10,000+</option>
                        <option>Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Message (Optional)</label>
                    <textarea 
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] rounded-xl py-3 px-4 text-white focus:outline-none focus:border-[var(--accent-primary)] transition-colors resize-none"
                      placeholder="Tell us a bit more about what you're looking to build..."
                    ></textarea>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <button 
                    onClick={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    className="w-full bg-[var(--accent-primary)] text-white py-4 rounded-xl font-medium hover:shadow-[0_0_20px_rgba(108,92,231,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none mt-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending Request...
                      </>
                    ) : (
                      "Get Your Free Consultation →"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Trust & Context */}
          <div className="lg:col-span-5 space-y-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            
            {/* Card 1: What Happens Next */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8">
              <h3 className="text-xl font-bold font-cabinet mb-6">What Happens Next</h3>
              
              <div className="relative">
                {/* Dotted Line */}
                <div className="absolute left-[15px] top-[30px] bottom-[30px] w-px border-l-2 border-dashed border-[var(--border-subtle)]"></div>
                
                <div className="space-y-8 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-sm font-bold text-[var(--accent-primary)]">1</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <ClipboardCheck size={16} className="text-[var(--accent-primary)]" />
                        <h4 className="font-bold text-[var(--text-primary)]">We review your requirements</h4>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">Within 24 hours of your submission</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-sm font-bold text-[var(--accent-cyan)]">2</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Monitor size={16} className="text-[var(--accent-cyan)]" />
                        <h4 className="font-bold text-[var(--text-primary)]">Custom demo & proposal</h4>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">Tailored to your industry and use case</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-sm font-bold text-[var(--accent-green)]">3</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Rocket size={16} className="text-[var(--accent-green)]" />
                        <h4 className="font-bold text-[var(--text-primary)]">Your agent goes live</h4>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">Most clients are live within one week</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Quick Stats */}
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-6 grid grid-cols-3 gap-4 text-center divide-x divide-[var(--border-subtle)]">
              <div>
                <Globe className="mx-auto mb-2 text-[var(--accent-primary)]" size={20}/>
                <div className="text-xs font-medium text-[var(--text-secondary)]">50+ Languages</div>
              </div>
              <div>
                <Zap className="mx-auto mb-2 text-[var(--accent-cyan)]" size={20}/>
                <div className="text-xs font-medium text-[var(--text-secondary)]">Sub-500ms Latency</div>
              </div>
              <div>
                <ShieldCheck className="mx-auto mb-2 text-[var(--accent-green)]" size={20}/>
                <div className="text-xs font-medium text-[var(--text-secondary)]">99.9% Uptime SLA</div>
              </div>
            </div>

          </div>
        </div>

        {/* Direct Contact Section */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div className="h-px w-full bg-[var(--border-subtle)] mb-12"></div>
          
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold font-cabinet mb-2">Prefer a direct conversation?</h3>
            <p className="text-[var(--text-secondary)] text-sm">Our Managing Directors are available for a personal consultation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl p-8 flex flex-col items-center text-center hover:border-[var(--border-active)] transition-colors">
                <img 
                  src={contact.image} 
                  alt={contact.name} 
                  className="w-28 h-28 rounded-full object-cover border-4 border-[var(--bg-tertiary)] mb-4"
                />
                <h4 className="font-bold text-xl font-cabinet">{contact.name}</h4>
                <p className="text-sm text-[var(--accent-primary)] font-medium uppercase tracking-wider mb-6">{contact.role}</p>
                
                <div className="w-full space-y-3">
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] hover:text-white text-[var(--text-secondary)] transition-all group/btn">
                      <Mail size={18} className="group-hover/btn:text-[var(--accent-primary)] transition-colors" />
                      <span className="font-medium text-sm">{contact.email}</span>
                    </a>
                  )}
                  <a href={`tel:${contact.phone}`} className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] hover:text-white text-[var(--text-secondary)] transition-all group/btn">
                    <Phone size={18} className="group-hover/btn:text-[var(--accent-cyan)] transition-colors" />
                    <span className="font-medium text-sm">{contact.phone}</span>
                  </a>
                  <a href={`https://wa.me/${contact.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-3 px-4 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] hover:bg-[rgba(16,185,129,0.2)] hover:border-[rgba(16,185,129,0.4)] text-[var(--text-primary)] transition-all group/btn">
                    <MessageCircle size={18} className="text-[var(--accent-green)]" />
                    <span className="font-medium text-sm">Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="text-center mt-16 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <p className="text-xs text-[var(--text-tertiary)]">
            🔒 Your information is secure and will never be shared with third parties.
          </p>
        </div>

      </div>
    </div>
  );
}
