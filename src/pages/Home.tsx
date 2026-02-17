import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Shield, Award, 
  ArrowRight, Landmark, CheckCircle2, ChevronRight,
  Calculator, Calendar as CalendarIcon, Info, Zap, 
  Star, Heart, Target
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  lang: string;
}

// --- Utility: Find Last Monday of the Month ---
const getLastMonday = (year: number, month: number) => {
  const lastDay = new Date(year, month + 1, 0);
  const day = lastDay.getDay();
  const diff = (day < 1) ? 6 : day - 1;
  lastDay.setDate(lastDay.getDate() - diff);
  return lastDay.getDate();
};

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
  const t = content[lang] || content.si;
  
  // Calculator Logic
  const [amount, setAmount] = useState(100000);
  const [years, setYears] = useState(3);
  const [monthly, setMonthly] = useState(0);

  // Calendar Logic
  const today = new Date();
  const lastMonday = getLastMonday(today.getFullYear(), today.getMonth());

  useEffect(() => {
    const rate = 14.5 / 12 / 100;
    const n = years * 12;
    const emi = (amount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    setMonthly(emi);
  }, [amount, years]);

  return (
    <div className="flex flex-col bg-white dark:bg-slate-950 transition-colors duration-500">
      
      {/* --- SECTION 1: HERO (THE ORIGINAL LAYOUT) --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold mb-6 tracking-widest uppercase">
              <Shield size={14} /> Official Denipitiya West Sanasa
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8 dark:text-white uppercase italic">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                className="group px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-green-600/20 active:scale-95"
              >
                {t.btnPrimary} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95 uppercase text-xs tracking-widest"
              >
                {t.btnSecondary}
              </button>
            </div>
          </motion.div>

          {/* Hero Side Cards */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="grid gap-6">
            <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-green-600 to-green-700 text-white shadow-2xl relative overflow-hidden group">
              <Landmark className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-black mb-4 italic uppercase tracking-tighter">Financial Stability</h3>
              <p className="text-green-50 opacity-80 mb-6 font-medium">Explore our tailored savings schemes designed for every stage of your life.</p>
              <button onClick={() => onNavigate('savings')} className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em]">
                Explore Savings <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl group hover:border-green-500 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
                <h4 className="font-black mb-2 dark:text-white italic uppercase tracking-tighter">Loans</h4>
                <p className="text-xs text-slate-500 font-bold">Fast approval for your housing & business needs.</p>
              </div>
              <div className="p-6 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl group hover:border-green-500 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award size={24} />
                </div>
                <h4 className="font-black mb-2 dark:text-white italic uppercase tracking-tighter">Benefits</h4>
                <p className="text-xs text-slate-500 font-bold">Exclusive welfare for our members.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: SMART HUB (CALCULATOR & CALENDAR) --- */}
      <section className="py-24 bg-slate-50 dark:bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Calculator Panel */}
            <motion.div 
              whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }}
              className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[3rem] p-10 shadow-xl border border-slate-100 dark:border-white/5"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="p-3 bg-green-600 rounded-2xl text-white shadow-lg shadow-green-600/20"><Calculator size={24} /></div>
                <h3 className="text-3xl font-black italic uppercase dark:text-white tracking-tighter">Loan Estimator</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amount (LKR)</label>
                      <span className="text-xl font-black dark:text-white italic">Rs. {amount.toLocaleString()}</span>
                    </div>
                    <input type="range" min="10000" max="2000000" step="10000" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none accent-green-600" />
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-3">Period</label>
                    <select value={years} onChange={(e)=>setYears(Number(e.target.value))} className="w-full bg-transparent font-black dark:text-white outline-none">
                      {[1,2,3,4,5].map(y => <option key={y} value={y} className="dark:bg-slate-900">{y} Years</option>)}
                    </select>
                  </div>
                </div>
                <div className="bg-slate-900 dark:bg-black rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center border-b-8 border-green-600 shadow-2xl">
                  <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-4">Estimated Monthly EMI</p>
                  <h2 className="text-5xl font-black text-white italic tracking-tighter">Rs. {Math.round(monthly).toLocaleString()}</h2>
                </div>
              </div>
            </motion.div>

            {/* Calendar Panel */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }}
              className="lg:col-span-4 bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden"
            >
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <CalendarIcon className="text-green-500" />
                <h3 className="text-xl font-black italic uppercase tracking-tighter">{today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}</h3>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-8 relative z-10 text-center">
                {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[10px] font-black text-slate-500">{d}</div>)}
                {Array.from({length: 31}).map((_, i) => (
                  <div key={i} className={`aspect-square flex items-center justify-center text-xs font-bold rounded-xl transition-all ${i+1 === lastMonday ? 'bg-red-600 text-white shadow-lg animate-pulse scale-110' : 'hover:bg-white/10 text-slate-400'}`}>
                    {i+1}
                  </div>
                ))}
              </div>
              <div className="space-y-4 relative z-10">
                <div className="bg-white/5 p-5 rounded-[2rem] border-l-4 border-red-500 backdrop-blur-md">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">Important Event</p>
                  <p className="text-sm font-bold">මාසික කමිටු රැස්වීම</p>
                  <p className="text-[11px] text-slate-400 mt-1 uppercase font-black">{today.toLocaleString('default', { month: 'long' })} {lastMonday} වන සඳුදා</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-600/10 rounded-full blur-[60px]" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- SECTION 3: STATS --- */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.stats.map((s: any, i: number) => (
              <motion.div key={i} whileInView={{ opacity: 1 }} initial={{ opacity: 0 }} className="text-center md:text-left border-l-4 border-green-600 pl-8">
                <h2 className="text-5xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tighter">{s.val}</h2>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[3px] font-bold">{s.lab}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: WHY CHOOSE US (SERVICES) --- */}
      <section className="py-32 bg-slate-50 dark:bg-[#020617]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-black mb-6 dark:text-white italic uppercase tracking-tighter leading-none">Why Choose <span className="text-green-600">Our Society?</span></h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">We provide more than just banking. We build long-term relationships based on trust and mutual growth.</p>
            </div>
            <button onClick={() => onNavigate('rates')} className="px-8 py-4 bg-slate-900 dark:bg-white dark:text-black text-white rounded-full font-black flex items-center gap-3 hover:scale-105 transition-all uppercase tracking-[0.2em] text-[10px]">
              Check Interest Rates <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {t.features.map((f: any, i: number) => (
              <motion.div 
                whileHover={{ y: -15 }} key={i} 
                className="p-10 rounded-[3rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 group hover:bg-green-600 transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 shadow-lg flex items-center justify-center mb-8 group-hover:rotate-12 group-hover:bg-white transition-all">
                  <CheckCircle2 size={30} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors italic uppercase tracking-tighter">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed group-hover:text-green-50 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}