import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  MessageSquare, ArrowUpRight, Map as MapIcon,
  CheckCircle2, Globe, Loader2
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
    sending: "Sending...",
    visitTitle: "Visit Our Office",
    visitSub: "Located near the historic Welihinda Sri Sudarshanaramaya Temple, our office is ready to serve you.",
    directions: "Open in Google Maps",
    hoursTitle: "Opening Hours",
    days: "Mon - Fri",
    sat: "Saturday"
  },
  si: {
    heroTag: "සම්බන්ධ වන්න",
    heroTitle: "අප අමතන්න",
    heroSub: "ඔබේ සියලුම මූල්‍ය අවශ්‍යතා සඳහා අප සූදානම්. අදම අපගේ කණ්ඩායම හා සම්බන්ධ වන්න.",
    infoTitle: "සම්බන්ධතා විස්තර",
    formTitle: "පණිවිඩයක් එවන්න",
    labels: { name: "සම්පූර්ණ නම", email: "විද්‍යුත් තැපෑල", phone: "දුරකථන අංකය", msg: "පණිවිඩය", sub: "විෂය" },
    btn: "පණිවිඩය එවන්න",
    sending: "යවමින් පවතී...",
    visitTitle: "අපගේ කාර්යාලය",
    visitSub: "ඓතිහාසික වැලිහින්ද ශ්‍රී සුදර්ශනාරාම විහාරස්ථානය අසල පිහිටි අපගේ කාර්යාලයට අදම පැමිණෙන්න.",
    directions: "ගූගල් මැප්ස් හරහා බලන්න",
    hoursTitle: "විවෘත වේලාවන්",
    days: "සඳුදා - සිකුරාදා",
    sat: "සෙනසුරාදා"
  },
  ta: {
    heroTag: "தொடர்பு கொள்ளவும்",
    heroTitle: "எங்களைத் தொடர்பு கொள்க",
    heroSub: "உங்கள் அனைத்து நிதித் தேவைகளுக்கும் உதவ நாங்கள் இருக்கிறோம். இன்று எமது குழுவைத் தொடர்பு கொள்ளவும்.",
    infoTitle: "தொடர்பு விபரங்கள்",
    formTitle: "ஒரு செய்தியை அனுப்புக",
    labels: { name: "முழுப் பெயர்", email: "மின்னஞ்சல் முகவரி", phone: "தொலைபேசி எண்", msg: "செய்தி", sub: "பொருள்" },
    btn: "செய்தியை அனுப்பவும்",
    sending: "அனுப்பப்படுகிறது...",
    visitTitle: "எமது அலுவலகம்",
    visitSub: "வரலாற்றுச் சிறப்புமிக்க வெலிஹிந்த ஸ்ரீ சுதர்சனராமய விகாரைக்கு அருகில் அமைந்துள்ள எமது அலுவலகம் உங்களுக்குச் சேவை செய்யத் தயாராக உள்ளது.",
    directions: "கூகுள் மெப்ஸ் இல் பார்க்க",
    hoursTitle: "திறந்திருக்கும் நேரம்",
    days: "திங்கள் - வெள்ளி",
    sat: "சனிக்கிழமை"
  }
};

export default function ContactUs({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const isTamil = lang === 'ta';
  const t = content[lang as keyof typeof content] || content.si;
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // පණිවිඩය යැවීමේ ක්‍රියාවලිය
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(e.currentTarget);
    
    // ඔබ ලබාදුන් Access Key එක මෙහි ඇතුළත් කර ඇත
    formData.append("access_key", "bde2aee0-b674-41b2-9720-5a7fc48fd176");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        e.currentTarget.reset(); // පෝරමය හිස් කරයි
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSending(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
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
          <h1 className={`${isTamil ? 'text-6xl md:text-8xl' : 'text-7xl md:text-9xl'} font-black text-slate-900 dark:text-white mb-8 italic uppercase tracking-tighter leading-[0.8]`}>
            {t.heroTitle}<span className="text-green-600">.</span>
          </h1>
          <p className={`${isTamil ? 'text-lg' : 'text-xl'} text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed`}>
            {t.heroSub}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          {/* --- Contact Info Grid --- */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className={`${isTamil ? 'text-2xl' : 'text-3xl'} font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-10`}>
              {t.infoTitle}
            </h2>
            
            <div className="space-y-4">
              <ContactCard 
                icon={<Mail />} 
                title="Email" 
                value="info@denipitiyawest.lk" 
                sub={isTamil ? "எந்த நேரத்திலும் மின்னஞ்சல் அனுப்புங்கள்" : "Send us an email anytime"}
                link="mailto:info@denipitiyawest.lk"
                isTamil={isTamil}
              />
              <ContactCard 
                icon={<Phone />} 
                title="Phone" 
                value="+94 41 225 2003" 
                sub={isTamil ? "வேலை நேரங்களில் எங்களை அழைக்கவும்" : "Call us during business hours"}
                link="tel:+94412252003"
                isTamil={isTamil}
              />
              <ContactCard 
                icon={<MapPin />} 
                title="Address" 
                value={isTamil ? "தெனிபிட்டிய மேற்கு சණச, வெலிஹிந்த, மாத்தறை." : "Denipitiya West SANASA, Welihinda, Matara."} 
                sub={isTamil ? "ஸ்ரீ சுதர்சனராமய விகாரைக்கு அருகில்" : "Near Sri Sudarshanaramaya Temple"}
                isTamil={isTamil}
              />
              
              <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group shadow-2xl">
                <Clock className="absolute -right-4 -top-4 w-32 h-32 text-white/5 rotate-12" />
                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-4 flex items-center gap-3 text-green-500">
                  <Clock size={20} /> {t.hoursTitle}
                </h4>
                <div className="space-y-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>{t.days}</span> <span className="text-white">8:30 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.sat}</span> <span className="text-white">8:30 AM - 12:30 PM</span>
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
            <h2 className={`${isTamil ? 'text-3xl' : 'text-4xl'} font-black text-slate-900 dark:text-white italic uppercase tracking-tighter mb-12 flex items-center gap-4`}>
              {t.formTitle} <MessageSquare size={30} className="text-green-600" />
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t.labels.name}</label>
                  <input name="Name" type="text" required className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full px-8 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all font-bold" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t.labels.email}</label>
                  <input name="Email" type="email" required className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-full px-8 py-5 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all font-bold" placeholder="john@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">{t.labels.msg}</label>
                <textarea name="Message" rows={4} required className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-[2.5rem] px-8 py-6 text-slate-900 dark:text-white focus:outline-none focus:border-green-500 transition-all font-bold resize-none" placeholder="..." />
              </div>
              
              <button 
                type="submit"
                disabled={isSending || submitted}
                className={`w-full py-8 rounded-full font-black uppercase text-xs tracking-[0.4em] transition-all flex items-center justify-center gap-3 shadow-2xl ${submitted ? 'bg-green-600 text-white' : 'bg-slate-900 dark:bg-green-600 text-white hover:scale-[1.02]'}`}
              >
                {isSending ? (
                  <><Loader2 className="animate-spin" size={20} /> {t.sending}</>
                ) : submitted ? (
                  <><CheckCircle2 size={20} /> {isTamil ? 'வெற்றிகரமாக அனுப்பப்பட்டது' : 'Sent Successfully'}</>
                ) : (
                  <>{t.btn} <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* --- MAP SECTION --- */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-[5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-slate-900 rounded-[4.5rem] p-10 md:p-20 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest mb-6">
                <MapPin size={12} /> Office Location
              </div>
              <h2 className={`${isTamil ? 'text-4xl md:text-6xl' : 'text-5xl md:text-7xl'} font-black text-white italic uppercase tracking-tighter mb-8 leading-none`}>
                {t.visitTitle}<span className="text-green-500">.</span>
              </h2>
              <p className={`${isTamil ? 'text-base' : 'text-lg'} text-slate-400 font-bold mb-10 leading-relaxed uppercase tracking-tight`}>
                {t.visitSub}
              </p>
              <a 
                href="https://maps.google.com/?q=Denipitiya+West+SANASA+Matara" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex bg-white text-slate-900 px-12 py-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-green-500 hover:text-white transition-all items-center gap-4 group"
              >
                <MapIcon size={20} /> {t.directions} <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="w-full lg:w-[500px] h-[500px] bg-slate-800 rounded-[3.5rem] border border-white/10 overflow-hidden relative shadow-inner">
               {/* මෙහි පවතින SRC එක ඔබගේ සැබෑ Google Map Embed Link එකෙන් වෙනස් කරන්න */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15870.78168234857!2d80.4444584!3d5.968037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1158564035619%3A0x6336335359a9307c!2sDenipitiya%20West!5e0!3m2!1sen!2slk!4v1700000000000"
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

function ContactCard({ icon, title, value, sub, link, isTamil }: any) {
  const Wrapper = link ? 'a' : 'div';
  return (
    <Wrapper 
      href={link} 
      className="flex items-center p-6 rounded-[2rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 group cursor-pointer hover:border-green-500 transition-all duration-500 shadow-sm"
    >
      <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-green-500 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shrink-0">
        {React.cloneElement(icon, { size: 28, strokeWidth: 1.5 })}
      </div>
      <div className="ml-6 overflow-hidden">
        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{title}</p>
        <h4 className={`${isTamil ? 'text-lg' : 'text-xl'} font-black text-slate-900 dark:text-white leading-tight italic tracking-tighter uppercase break-words`}>
          {value}
        </h4>
        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold mt-1 uppercase tracking-wider line-clamp-1">{sub}</p>
      </div>
    </Wrapper>
  );
}