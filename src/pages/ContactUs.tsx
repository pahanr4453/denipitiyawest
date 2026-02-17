import { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  MessageSquare, Globe, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { motion } from 'framer-motion';

const content = {
  en: {
    heroTitle: "Get in Touch",
    heroSub: "We're here to help you navigate your financial journey.",
    formTitle: "Send a Message",
    infoTitle: "Contact Information",
    hoursTitle: "Business Hours",
    statusOpen: "Open Now",
    statusClosed: "Closed",
    fields: { name: "Your Name", email: "Email Address", msg: "How can we help?", send: "Send Message" }
  },
  si: {
    heroTitle: "අපව අමතන්න",
    heroSub: "ඔබේ මූල්‍ය ගමන සාර්ථක කරගැනීමට අපි සැමවිටම සූදානම්.",
    formTitle: "පණිවිඩයක් යොමු කරන්න",
    infoTitle: "සම්බන්ධීකරණ තොරතුරු",
    hoursTitle: "සේවා කාලය",
    statusOpen: "දැන් විවෘතයි",
    statusClosed: "දැන් වසා ඇත",
    fields: { name: "ඔබේ නම", email: "ඊමේල් ලිපිනය", msg: "අපෙන් විය යුතු සේවාව?", send: "පණිවිඩය යවන්න" }
  }
};

export default function Contact({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const t = content[lang as keyof typeof content] || content.si;
  const [isSubmitted, setIsSubmitted] = useState(false);

  // සරලව ශාඛාව විවෘතද කියලා බලන Logic එක (9 AM - 4 PM)
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const hour = new Date().getHours();
    setIsOpen(hour >= 9 && hour < 16);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-all duration-1000 pb-40">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 dark:bg-white/5 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10"
          >
            <Globe size={14} className="text-green-500" /> Connect With Us
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] dark:text-white">
            {t.heroTitle}<span className="text-green-600">.</span>
          </h1>
          
          <p className="mt-10 text-xl text-slate-500 dark:text-slate-400 max-w-xl mx-auto font-medium leading-relaxed">
            {t.heroSub}
          </p>
        </div>
      </section>

      {/* --- CONTACT GRID --- */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
        
        {/* LEFT: Info & Details (5 Columns) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest ${isOpen ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${isOpen ? 'bg-green-600' : 'bg-red-600'}`} />
            {isOpen ? t.statusOpen : t.statusClosed}
          </div>

          <div className="grid grid-cols-1 gap-4">
            <ContactCard icon={<Phone />} label="Phone" value="+94 41 222 3344" href="tel:+94412223344" />
            <ContactCard icon={<Mail />} label="Email" value="info@denipitiyasanasa.lk" href="mailto:info@denipitiyasanasa.lk" />
            <ContactCard icon={<MapPin />} label="Address" value="Main Street, Denipitiya, Sri Lanka" href="#" />
          </div>

          {/* Business Hours Card */}
          <div className="p-10 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden group">
            <Clock className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12" />
            <h4 className="text-xl font-black uppercase italic tracking-tighter mb-6 flex items-center gap-3">
              <Clock size={20} className="text-green-500" /> {t.hoursTitle}
            </h4>
            <div className="space-y-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Mon - Fri</span> <span className="text-white text-right">09:00 AM - 04:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Saturday</span> <span className="text-white text-right">09:00 AM - 01:00 PM</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Sunday</span> <span className="text-right italic underline">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Contact Form (7 Columns) */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-16 rounded-[4rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 relative overflow-hidden">
            <h3 className="text-4xl font-black tracking-tighter uppercase italic dark:text-white mb-10 flex items-center gap-4">
               {t.formTitle} <MessageSquare size={28} className="text-green-600" />
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label={t.fields.name} type="text" placeholder="John Doe" />
                <InputGroup label={t.fields.email} type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t.fields.msg}</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2rem] px-8 py-6 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all resize-none font-medium"
                  placeholder="..."
                />
              </div>

              <button 
                disabled={isSubmitted}
                className={`w-full py-7 rounded-[2.5rem] font-black uppercase text-[11px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-2xl ${isSubmitted ? 'bg-green-600 text-white' : 'bg-slate-900 dark:bg-green-600 text-white hover:scale-[1.02]'}`}
              >
                {isSubmitted ? <><CheckCircle2 size={18} /> Success</> : <>{t.fields.send} <Send size={16} /> </>}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* --- MAP SECTION --- */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="h-[500px] w-full bg-slate-100 dark:bg-white/5 rounded-[4rem] overflow-hidden border border-slate-200 dark:border-white/10 relative group">
           {/* Placeholder for Map - මෙතනට Google Map Iframe එක දාන්න පුළුවන් */}
           <div className="absolute inset-0 flex items-center justify-center text-slate-300 dark:text-slate-700 font-black uppercase tracking-[1em] italic text-4xl">
              Location Map
           </div>
           <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15872.2345!2d80.4433!3d5.9544" 
              className="w-full h-full grayscale-[100%] contrast-[1.2] invert-[0] dark:invert-[0.9] opacity-50 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000"
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
           />
        </div>
      </section>
    </div>
  );
}

// UI Components for the page
function ContactCard({ icon, label, value, href }: { icon: any, label: string, value: string, href: string }) {
  return (
    <a href={href} className="group p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/5 hover:border-green-500 transition-all flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-6">
        <div className="w-14 h-14 bg-slate-50 dark:bg-slate-900 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
          {icon}
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
          <p className="text-lg font-black text-slate-900 dark:text-white tracking-tighter italic">{value}</p>
        </div>
      </div>
      <ArrowUpRight className="text-slate-300 group-hover:text-green-600 transition-all" />
    </a>
  );
}

function InputGroup({ label, type, placeholder }: { label: string, type: string, placeholder: string }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full px-8 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all font-medium"
      />
    </div>
  );
}