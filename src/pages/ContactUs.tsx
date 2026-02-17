import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  MessageSquare, ArrowUpRight, Map as MapIcon,
  CheckCircle2, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const content = {
  en: {
    heroTag: "Get In Touch",
    heroTitle: "Contact Us",
    heroSub: "We're here to help you with all your financial needs. Reach out to our team today.",
    infoTitle: "Contact Information",
    formTitle: "Send a Message",
    labels: { name: "Full Name", email: "Email Address", phone: "Phone Number", msg: "Message", sub: "Subject" },
    btn: "Send Message",
    visitTitle: "Visit Our Office",
    visitSub: "Located near the historic Welihinda Sri Sudarshanaramaya Temple, our office is ready to serve you.",
    directions: "Open in Google Maps"
  },
  si: {
    heroTag: "සම්බන්ධ වන්න",
    heroTitle: "අප අමතන්න",
    heroSub: "ඔබේ සියලුම මූල්‍ය අවශ්‍යතා සඳහා අප සූදානම්. අදම අපගේ කණ්ඩායම හා සම්බන්ධ වන්න.",
    infoTitle: "සම්බන්ධතා විස්තර",
    formTitle: "පණිවිඩයක් එවන්න",
    labels: { name: "සම්පූර්ණ නම", email: "විද්‍යුත් තැපෑල", phone: "දුරකථන අංකය", msg: "පණිවිඩය", sub: "විෂය" },
    btn: "පණිවිඩය එවන්න",
    visitTitle: "අපගේ කාර්යාලය",
    visitSub: "ඓතිහාසික වැලිහින්ද ශ්‍රී සුදර්ශනාරාම විහාරස්ථානය අසල පිහිටි අපගේ කාර්යාලයට අදම පැමිණෙන්න.",
    directions: "ගූගල් මැප්ස් හරහා බලන්න"
  }
};

export default function ContactUs({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const t = content[lang as keyof typeof content] || content.si;
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-24 bg-white dark:bg-[#020617] min-h-screen transition-all duration-700">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* --- Hero Section --- */}
        <div className="mb-24 relative">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-green-600 mb-6 font-black uppercase text-[10px] tracking-[0.4em] border-l-2 border-green-600 pl-4"
          >
            <Globe size={14} /> {t.heroTag}
          </motion.div>
          <h1 className="text-7xl md:text-9xl font-black text-slate-900 dark:text-white mb-8 italic uppercase tracking-tighter leading-[0.8]">
            {t.heroTitle}<span className="text-green-600">.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
            {t.heroSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          {/* --- Contact Info Grid --- */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-10">{t.infoTitle}</h2>
            
            <div className="space-y-4">
              <ContactCard 
                icon={<Mail />} 
                title="Email" 
                value="info@denipitiyawest.lk" 
                sub="Send us an email anytime"
                link="mailto:info@denipitiyawest.lk"
              />
              <ContactCard 
                icon={<Phone />} 
                title="Phone" 
                value="+94 41 225 2003" 
                sub="Call us during business hours"
                link="tel:+94412252003"
              />
              <ContactCard 
                icon={<MapPin />} 
                title="Address" 
                value="Denipitiya West SANASA, Welihinda, Matara." 
                sub="Near Sri Sudarshanaramaya Temple"
              />
              <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
                <Clock className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12" />
                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-4 flex items-center gap-3 text-green-500">
                  <Clock size={20} /> Opening Hours
                </h4>
                <div className="space-y-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Mon - Fri</span> <span className="text-white">8:30 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span> <span className="text-white">8:30 AM - 12:30 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Contact Form --- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-slate-50 dark:bg-white/[0.02] rounded-[4rem] p-10 md:p-16 border border-slate-100 dark:border-white/5 relative overflow-hidden"
          >
            <h2 className="text-4xl font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-12 flex items-center gap-4">
              {t.formTitle} <MessageSquare size={30} className="text-green-600" />
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t.labels.name}</label>
                  <input type="text" required className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full px-8 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all font-bold" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t.labels.email}</label>
                  <input type="email" required className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full px-8 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all font-bold" placeholder="john@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t.labels.msg}</label>
                <textarea rows={4} required className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] px-8 py-6 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all font-bold resize-none" placeholder="..." />
              </div>
              
              <button 
                disabled={submitted}
                className={`w-full py-8 rounded-full font-black uppercase text-xs tracking-[0.4em] transition-all flex items-center justify-center gap-3 shadow-2xl ${submitted ? 'bg-green-600 text-white' : 'bg-slate-900 dark:bg-green-600 text-white hover:scale-[1.02]'}`}
              >
                {submitted ? <><CheckCircle2 size={20} /> Sent Successfully</> : <>{t.btn} <Send size={18} /></>}
              </button>
            </form>
          </motion.div>
        </div>

        {/* --- MAP SECTION (Welihinda Temple Area) --- */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-[5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-slate-900 rounded-[4.5rem] p-10 md:p-20 overflow-hidden flex flex-col lg:row items-center justify-between gap-16">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                <MapPin size={12} /> Office Location
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                {t.visitTitle}<span className="text-green-500">.</span>
              </h2>
              <p className="text-slate-400 font-bold text-lg mb-10 leading-relaxed uppercase tracking-tight">
                {t.visitSub}
              </p>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=Sri+Sudarshanaramaya+Welihinda" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex bg-white text-slate-900 px-12 py-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-green-500 hover:text-white transition-all items-center gap-4 group"
              >
                <MapIcon size={20} /> {t.directions} <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Live Interactive Map Frame */}
            <div className="w-full lg:w-[500px] h-[500px] bg-slate-800 rounded-[3.5rem] border border-white/10 overflow-hidden relative shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.625345634567!2d80.465123!3d5.987654!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae140016f643e6d%3A0xed37cf4ac8ca97a7!2sSri%20Sudarshanaramaya%20Welihinda!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                className="w-full h-full grayscale-[100%] contrast-[1.2] invert-[0.9] opacity-40 hover:opacity-100 hover:grayscale-0 hover:invert-0 transition-all duration-1000"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, value, sub, link }: any) {
  const Wrapper = link ? 'a' : 'div';
  return (
    <Wrapper 
      href={link} 
      className="flex items-center p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 group cursor-pointer hover:border-green-500 transition-all duration-500 shadow-sm"
    >
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-green-500 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
        {React.cloneElement(icon, { size: 28, strokeWidth: 1.5 })}
      </div>
      <div className="ml-6">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</p>
        <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight italic tracking-tighter uppercase">{value}</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1 uppercase tracking-wider">{sub}</p>
      </div>
    </Wrapper>
  );
}