import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Shield, Award, 
  ArrowRight, Landmark, CheckCircle2, ChevronRight,
  Calculator, Calendar as CalendarIcon, Zap
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  lang: string;
}

const content: any = {
  en: {
    heroTitle: "Secure Your Future With Trusted Banking",
    heroSub: "Building a stronger community through decades of trusted financial excellence. Your journey to prosperity starts here.",
    btnPrimary: "Become a Member",
    btnSecondary: "Our Story",
    stats: [
      { val: "1000+", lab: "Active Members" },
      { val: "40+", lab: "Years of Trust" },
      { val: "Rs. 50M+", lab: "Funds Managed" }
    ],
    features: [
      { title: "Competitive Rates", desc: "Best-in-class interest rates for your hard-earned savings." },
      { title: "Member Welfare", desc: "We prioritize our community over corporate profits." },
      { title: "Fast Loans", desc: "Quick and transparent loan processing for your dreams." }
    ]
  },
  si: {
    heroTitle: "විශ්වාසනීය බැංකු සේවාවෙන් ඔබේ අනාගතය දිනන්න",
    heroSub: "දශක ගණනාවක ප්‍රජා විශ්වාසය සමඟ, ශක්තිමත් හෙටක් වෙනුවෙන් අපි ඔබව සවිබල ගන්වන්නෙමු.",
    btnPrimary: "සාමාජිකත්වය ගන්න",
    btnSecondary: "අපේ කතාව",
    stats: [
      { val: "1000+", lab: "ක්‍රියාකාරී සාමාජිකයින්" },
      { val: "40+", lab: "විශ්වාසනීය සේවය" },
      { val: "රු. මිලියන 50+", lab: "කළමනාකරණය කළ අරමුදල්" }
    ],
    features: [
      { title: "පොලී අනුපාත", desc: "ඔබේ ඉතුරුම් සඳහා වෙළඳපොළේ ඉහළම පොලී අනුපාත." },
      { title: "සාමාජික සුභසාධනය", desc: "අප සැමවිටම මුල් තැන දෙන්නේ අපේ සාමාජිකයින්ටයි." },
      { title: "ක්ෂණික ණය", desc: "ඔබේ සිහින වෙනුවෙන් ඉතා ඉක්මන් ණය පහසුකම්." }
    ]
  }
};

export default function Home({ onNavigate, lang }: HomeProps) {
  const t = content[lang] || content.en;
  
  // --- Calculator & Calendar State ---
  const [activeTab, setActiveTab] = useState<'calc' | 'cal'>('calc');
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(3);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const rate = 14.5 / 12 / 100;
    const n = years * 12;
    const emi = (amount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    setMonthly(emi);
  }, [amount, years]);

  return (
    <div className="flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-white dark:bg-[#020617] transition-colors duration-500">
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center py-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-green-100 dark:border-green-900/30">
              <Shield size={14} /> Official Denipitiya West Sanasa
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-8 dark:text-white italic uppercase">
              {t.heroTitle.split(' ').map((word: string, i: number) => (
                <span key={i} className={i % 3 === 0 ? "text-green-600" : ""}>{word} </span>
              ))}
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                className="px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-[2rem] font-black uppercase text-xs tracking-widest flex items-center gap-3 transition-all shadow-2xl shadow-green-600/20 active:scale-95"
              >
                {t.btnPrimary} <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>

          {/* Right Content: Animated Interactive Card (Calculator/Calendar) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-slate-50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-[4rem] p-8 md:p-12 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              
              {/* Tab Toggles */}
              <div className="flex bg-slate-200/50 dark:bg-black/40 p-1.5 rounded-3xl mb-10 w-fit mx-auto border border-white/5">
                <button 
                  onClick={() => setActiveTab('calc')}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'calc' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500'}`}
                >
                  <Calculator size={14} /> Calculator
                </button>
                <button 
                  onClick={() => setActiveTab('cal')}
                  className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'cal' ? 'bg-green-600 text-white shadow-lg' : 'text-slate-500'}`}
                >
                  <CalendarIcon size={14} /> Events
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'calc' ? (
                  <motion.div 
                    key="calc" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-end">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Loan Amount</p>
                        <p className="text-3xl font-black text-slate-900 dark:text-white italic">Rs. {amount.toLocaleString()}</p>
                      </div>
                      <input 
                        type="range" min="10000" max="2000000" step="10000" value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-white/10 rounded-full appearance-none cursor-pointer accent-green-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-white/5 p-5 rounded-[2rem] border border-slate-100 dark:border-white/5">
                        <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Years</p>
                        <select value={years} onChange={(e) => setYears(Number(e.target.value))} className="bg-transparent text-slate-900 dark:text-white font-black w-full outline-none">
                          {[1,2,3,4,5].map(y => <option key={y} value={y} className="dark:bg-slate-900">{y} Years</option>)}
                        </select>
                      </div>
                      <div className="bg-green-600 p-5 rounded-[2rem] text-center text-white shadow-xl shadow-green-600/20">
                        <p className="text-[9px] font-black uppercase mb-1 opacity-80">Monthly EMI</p>
                        <p className="text-xl font-black italic">Rs. {Math.round(monthly).toLocaleString()}</p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="cal" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                     <div className="grid grid-cols-7 gap-1 text-center">
                        {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[8px] font-black text-slate-400">{d}</div>)}
                        {Array.from({length: 31}).map((_, i) => (
                          <div key={i} className={`aspect-square flex items-center justify-center text-[10px] font-bold rounded-xl ${i+1 === 18 ? 'bg-green-600 text-white shadow-lg scale-110' : 'text-slate-400 hover:bg-green-500/10 hover:text-green-500'}`}>
                            {i+1}
                          </div>
                        ))}
                     </div>
                     <div className="bg-white dark:bg-white/5 p-5 rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500"><Zap size={16}/></div>
                        <div>
                          <p className="text-[9px] font-black text-green-500 uppercase tracking-widest">Next Meeting</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">සමිටි රැස්වීම - පෙබරවාරි 20</p>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- (මෙහි වෙනසක් නැත) */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.stats.map((s: any, i: number) => (
              <div key={i} className="text-center md:text-left border-l-4 border-green-600 pl-8">
                <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tighter">{s.val}</h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[3px]">{s.lab}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- (මෙහි වෙනසක් නැත) */}
      <section className="py-32 bg-white dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black mb-6 dark:text-white italic uppercase tracking-tighter">Why Choose <span className="text-green-600">Us?</span></h2>
              <p className="text-lg text-slate-500 font-medium">We provide more than just banking. We build long-term relationships based on trust and mutual growth.</p>
            </div>
            <button onClick={() => onNavigate('rates')} className="px-8 py-4 bg-slate-900 dark:bg-white dark:text-black text-white rounded-full font-black flex items-center gap-3 hover:scale-105 transition-all uppercase tracking-widest text-[10px]">
              Check Interest Rates <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {t.features.map((f: any, i: number) => (
              <motion.div 
                whileHover={{ y: -15 }}
                key={i} 
                className="p-10 rounded-[3rem] bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 group hover:bg-green-600 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-all">
                  <CheckCircle2 size={30} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors italic uppercase tracking-tight">{f.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed group-hover:text-green-50 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}