import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Loader2, History, Users2, ShieldCheck, Target } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  type: 'leader' | 'director' | 'staff';
  description?: string;
}

interface AboutProps {
  lang: string;
}

const translations: any = {
  en: {
    title: "Our Legacy & Leadership",
    sub: "Dedicated to empowering our community through transparent and cooperative financial excellence since 1987.",
    history: "Our History",
    historyDesc: "Denipitiya West SANASA Society was established with a vision to provide accessible financial services. Over the years, we have remained true to our core values of transparency and member welfare. Today, we stand as a testament to the success of the cooperative movement.",
    leadership: "Leadership",
    board: "Board of Directors",
    staff: "Dedicated Staff"
  },
  si: {
    title: "අපගේ උරුමය සහ නායකත්වය",
    sub: "1987 වසරේ සිට විනිවිදභාවයෙන් යුත් සමුපකාර මූල්‍ය විශිෂ්ටත්වය තුළින් අපගේ ප්‍රජාව සවිබල ගැන්වීමට කැපවී සිටින්නෙමු.",
    history: "අපගේ ඉතිහාසය",
    historyDesc: "දෙනිපිටිය බටහිර සනස සමිතිය ආරම්භ කරන ලද්දේ ප්‍රජාවට පහසුවෙන් ප්‍රවේශ විය හැකි මූල්‍ය සේවාවන් සැපයීමේ දැක්ම ඇතිවය. වසර ගණනාවක් පුරා විනිවිදභාවය සහ සාමාජික සුභසාධනය වෙනුවෙන් අප කැපවී සිටිමු.",
    leadership: "නායකත්වය",
    board: "අධ්‍යක්ෂ මණ්ඩලය",
    staff: "කැපවූ කාර්ය මණ්ඩලය"
  },
  ta: {
    title: "எங்கள் பாரம்பரியம் மற்றும் தலைமை",
    sub: "1987 முதல் வெளிப்படையான மற்றும் கூட்டுறவு நிதிச் சிறப்பின் மூலம் எமது சமூகத்திற்கு அதிகாரம் அளிக்க அர்ப்பணிக்கப்பட்டுள்ளது.",
    history: "எங்கள் வரலாறு",
    historyDesc: "தெனிபிட்டிய மேற்கு சனச சங்கம் சமூகத்திற்கு அணுகக்கூடிய நிதி சேவைகளை வழங்கும் நோக்கத்துடன் நிறுவப்பட்டது. பல ஆண்டுகளாக, நாங்கள் வெளிப்படைத்தன்மை மற்றும் உறுப்பினர் நலன்களுக்கு உண்மையாக இருக்கிறோம்.",
    leadership: "தலைமைத்துவம்",
    board: "இயக்குனர் சபை",
    staff: "அர்ப்பணிப்புள்ள ஊழியர்கள்"
  }
};

// Animation settings
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  }
};

export default function AboutUs({ lang }: AboutProps) {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const t = translations[lang] || translations.en;

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase
        .from('team')
        .select('*')
        .order('order_index', { ascending: true });
      if (!error) setTeam(data || []);
      // loading animation එක පේන්න පොඩි delay එකක්
      setTimeout(() => setLoading(false), 1000);
    }
    fetchTeam();
  }, []);

  const chairman = team.find(m => m.position.toLowerCase().includes('chairman'));
  const manager = team.find(m => m.position.toLowerCase().includes('manager'));
  const directors = team.filter(m => m.type === 'director');
  const employees = team.filter(m => m.type === 'staff');

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020617]">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="relative"
      >
        <Loader2 className="text-green-600" size={50} />
      </motion.div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mt-6 text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase"
      >
        Loading History
      </motion.p>
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden">
      
      <section className="relative pt-20 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.2 } } }}>
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
              Established 1987
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
              {t.title}
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t.sub}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        
        {/* --- HISTORY --- */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="bg-white dark:bg-slate-900/50 backdrop-blur-md rounded-[3rem] border border-slate-100 dark:border-white/5 p-8 md:p-16 mb-24 shadow-xl"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 text-green-600 mb-6">
                <History size={28} />
                <h2 className="text-2xl font-black uppercase tracking-widest">{t.history}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{t.historyDesc}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ y: -5 }} className="aspect-square rounded-3xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center p-6 text-center group transition-colors hover:bg-green-600">
                <Target className="text-green-600 group-hover:text-white mb-4" size={32} />
                <span className="text-[10px] font-bold uppercase tracking-widest dark:text-white group-hover:text-white">Our Vision</span>
              </motion.div>
              <motion.div whileHover={{ y: -5 }} className="aspect-square rounded-3xl bg-green-600 flex flex-col items-center justify-center p-6 text-center text-white">
                <ShieldCheck className="mb-4" size={32} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Trust First</span>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* --- LEADERSHIP CARDS --- */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {[chairman, manager].map((member, idx) => member && (
            <motion.div 
              key={member.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              className={`p-10 rounded-[2.5rem] border transition-all ${
                idx === 0 
                ? 'bg-slate-900 border-slate-800 text-white shadow-2xl' 
                : 'bg-white dark:bg-slate-900/80 border-slate-100 dark:border-white/5 text-slate-900 dark:text-white'
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${idx === 0 ? 'bg-green-600' : 'bg-green-100 dark:bg-green-900/30 text-green-600'}`}>
                  {idx === 0 ? <User size={24} /> : <Briefcase size={24} />}
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-black">{member.name}</h3>
                  <p className="text-green-500 font-bold text-[9px] uppercase tracking-[0.2em]">{member.position}</p>
                </div>
              </div>
              <p className={`italic opacity-70 ${idx === 0 ? 'text-slate-300' : 'text-slate-500'}`}>
                "{member.description || 'Committed to excellence.'}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* --- LISTS --- */}
        <div className="grid lg:grid-cols-2 gap-12 mb-32">
          {/* Board */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-widest mb-8 dark:text-white">
              <Users2 className="text-green-600" /> {t.board}
            </h3>
            <div className="space-y-4">
              {directors.map(d => (
                <div key={d.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 flex justify-between items-center group hover:border-green-500/50 transition-all">
                  <div>
                    <h4 className="font-bold dark:text-white group-hover:text-green-600 transition-colors">{d.name}</h4>
                    <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">{d.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Staff */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h3 className="flex items-center gap-3 text-lg font-black uppercase tracking-widest mb-8 dark:text-white">
              <Briefcase className="text-blue-600" /> {t.staff}
            </h3>
            <div className="space-y-4">
              {employees.map(e => (
                <div key={e.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-white/5 flex justify-between items-center group hover:border-blue-600/50 transition-all">
                  <div>
                    <h4 className="font-bold dark:text-white group-hover:text-blue-600 transition-colors">{e.name}</h4>
                    <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">{e.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}