import React from 'react';
import { Mail, Phone, Globe, MapPin, Clock, Send, MessageSquare, ArrowRight, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const content = {
  en: {
    heroTag: "Get In Touch",
    heroTitle: "Contact Us",
    heroSub: "We're here to help you with all your financial needs. Reach out to our team today.",
    infoTitle: "Contact Information",
    formTitle: "Send a Message",
    labels: { name: "Full Name", email: "Email Address", phone: "Phone Number", msg: "Message", sub: "Subject" },
    btn: "Send Message",
    visitTitle: "Visit Us Today",
    visitSub: "We welcome you to visit our main office in Denipitiya. Our staff is ready to assist you.",
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
    visitTitle: "අදම පැමිණෙන්න",
    visitSub: "දෙණිපිටිය පිහිටි අපගේ ප්‍රධාන කාර්යාලයට පැමිණෙන්න. අපගේ කාර්ය මණ්ඩලය ඔබව සාදරයෙන් පිළිගනී.",
    directions: "ගූගල් මැප්ස් හරහා බලන්න"
  }
};

export default function ContactUs({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const t = content[lang as keyof typeof content] || content.si;

  return (
    <div className="py-24 bg-[#fcfdfe] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Hero Section --- */}
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6"
          >
            <MessageSquare size={14} /> {t.heroTag}
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-6 italic uppercase tracking-tighter">
            {t.heroTitle}<span className="text-green-600">.</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            {t.heroSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* --- Contact Info Grid --- */}
          <div className="lg:col-span-5 space-y-10">
            <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter mb-8">{t.infoTitle}</h2>
            
            <div className="space-y-8">
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
                value="+94 412252003" 
                sub="Call us during business hours"
                link="tel:+94412252003"
              />
              <ContactCard 
                icon={<MapPin />} 
                title="Address" 
                value="Denipitiya West SANASA Society, Welihinda, Matara." 
                sub="Visit our main office"
              />
              <ContactCard 
                icon={<Clock />} 
                title="Hours" 
                value="Mon - Fri: 8:30 AM - 4:30 PM" 
                sub="Sat: 8:30 AM - 12:30 PM"
              />
            </div>
          </div>

          {/* --- Contact Form --- */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-7 bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 p-10 md:p-16 border border-slate-100 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-green-50 rounded-full blur-3xl -mr-20 -mt-20 opacity-50" />
            
            <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter mb-10">{t.formTitle}</h2>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t.labels.name}</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 transition-all font-bold text-slate-700" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t.labels.email}</label>
                <input type="email" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 transition-all font-bold text-slate-700" placeholder="john@example.com" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t.labels.sub}</label>
                <input type="text" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 transition-all font-bold text-slate-700" placeholder="Business Inquiry" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">{t.labels.msg}</label>
                <textarea rows={4} className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-green-500 transition-all font-bold text-slate-700 resize-none" placeholder="Your message here..." />
              </div>
              
              <button className="md:col-span-2 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-green-600 transition-all flex items-center justify-center gap-3 shadow-xl group">
                {t.btn} <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* --- Footer CTA / Map --- */}
        <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-6">{t.visitTitle}</h2>
            <p className="text-slate-400 font-medium text-lg mb-8 leading-relaxed">
              {t.visitSub}
            </p>
            <button className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-500 hover:text-white transition-all flex items-center gap-3 mx-auto md:mx-0">
              <MapIcon size={18} /> {t.directions}
            </button>
          </div>
          <div className="relative z-10 w-full md:w-auto">
            <div className="w-full md:w-80 h-80 bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center group cursor-pointer hover:bg-white/10 transition-all">
               <MapPin size={80} className="text-green-500 animate-bounce" />
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-[120px] -mr-40 -mt-40" />
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, value, sub, link }: any) {
  const Wrapper = link ? 'a' : 'div';
  return (
    <Wrapper href={link} className="flex items-center group cursor-pointer">
      <div className="w-16 h-16 bg-white shadow-xl shadow-slate-200/50 rounded-2xl flex items-center justify-center text-slate-900 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <div className="ml-6">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-green-600 transition-colors">{value}</h4>
        <p className="text-sm text-slate-500 font-medium mt-1">{sub}</p>
      </div>
    </Wrapper>
  );
}