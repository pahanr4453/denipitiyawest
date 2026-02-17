import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, Shield, Award, 
  ArrowRight, Landmark, CheckCircle2, ChevronRight,
  Calculator, Calendar as CalendarIcon, Info, Zap,
  Briefcase, Heart, Star, Target, Layers
} from 'lucide-react';

/**
 * Interface for Component Props
 */
interface HomeProps {
  onNavigate: (page: string) => void;
  lang: string;
}

/**
 * ---------------------------------------------------------
 * UTILITY FUNCTIONS
 * ---------------------------------------------------------
 */

// Function to calculate the last Monday of the current month
const calculateLastMonday = (year: number, month: number): number => {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const dayOfWeek = lastDayOfMonth.getDay(); 
  const diffToMonday = (dayOfWeek < 1) ? 6 : dayOfWeek - 1;
  lastDayOfMonth.setDate(lastDayOfMonth.getDate() - diffToMonday);
  return lastDayOfMonth.getDate();
};

/**
 * ---------------------------------------------------------
 * MULTI-LANGUAGE CONTENT OBJECT
 * ---------------------------------------------------------
 */
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

/**
 * ---------------------------------------------------------
 * MAIN HOME COMPONENT
 * ---------------------------------------------------------
 */
export default function Home({ onNavigate, lang }: HomeProps) {
  const t = useMemo(() => content[lang] || content.si, [lang]);
  
  // --- CALCULATOR STATES ---
  const [amount, setAmount] = useState<number>(1000000); 
  const [years, setYears] = useState<number>(5);         
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0);
  const FLAT_RATE = 17; // Fixed 17% Interest

  // --- CALENDAR LOGIC ---
  const today = new Date();
  const currentMonthName = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const meetingDate = useMemo(() => calculateLastMonday(currentYear, today.getMonth()), [currentYear]);

  useEffect(() => {
    const totalInterest = amount * (FLAT_RATE / 100) * years;
    const totalPayable = amount + totalInterest;
    const totalMonths = years * 12;
    const calculatedEmi = totalPayable / totalMonths;
    setMonthlyInstallment(calculatedEmi);
  }, [amount, years]);

  return (
    <div className="flex flex-col bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500 pb-20">
      
      {/* --- SECTION 1: HERO SECTION --- */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-24 pb-12">
        <div className="absolute top-0 -left-20 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-black mb-8 tracking-[0.2em] uppercase border border-green-100 dark:border-green-800/30">
              <Shield size={16} strokeWidth={2.5} /> Official Denipitiya West Sanasa
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-8 dark:text-white uppercase italic">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-5">
              <button onClick={() => onNavigate('contact')} className="group px-10 py-5 bg-green-600 hover:bg-green-700 text-white rounded-3xl font-black flex items-center gap-3 shadow-2xl shadow-green-600/30 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest text-xs">
                {t.btnPrimary} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <button onClick={() => onNavigate('about')} className="px-10 py-5 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-3xl font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 uppercase tracking-widest text-xs">
                {t.btnSecondary}
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="grid gap-8">
            <div className="p-10 rounded-[3.5rem] bg-gradient-to-br from-green-600 to-emerald-700 text-white shadow-3xl relative overflow-hidden group">
              <Landmark className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700" />
              <div className="relative z-10">
                <Zap className="mb-6 text-yellow-300 fill-yellow-300" size={32} />
                <h3 className="text-3xl font-black mb-4 italic uppercase tracking-tighter">Financial Stability</h3>
                <p className="text-green-50 text-lg opacity-90 mb-8 font-medium leading-snug max-w-sm">Explore our tailored savings schemes designed for every stage of your life.</p>
                <button onClick={() => onNavigate('savings')} className="flex items-center gap-3 text-sm font-black uppercase tracking-[0.3em] hover:gap-5 transition-all">
                  Explore Savings <ChevronRight size={18} />
                </button>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-blue-500/50 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp size={28} />
                </div>
                <h4 className="text-xl font-black mb-2 dark:text-white uppercase italic">Loans</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">Fast approval for your housing & business dreams.</p>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-amber-500/50 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <h4 className="text-xl font-black mb-2 dark:text-white uppercase italic">Benefits</h4>
                <p className="text-xs text-slate-500 font-bold leading-relaxed">Exclusive welfare and medical support for members.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 2: FINANCE HUB (CALCULATOR & CALENDAR) --- */}
      <section className="py-28 bg-slate-50 dark:bg-black transition-all relative border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10">
            <motion.div whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 30 }} viewport={{ once: true }} className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[4rem] p-12 shadow-2xl border border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-5 mb-12">
                <div className="p-4 bg-green-600 rounded-[1.5rem] text-white shadow-xl shadow-green-600/30"><Calculator size={32} strokeWidth={2.5} /></div>
                <div>
                  <h3 className="text-3xl font-black italic uppercase dark:text-white tracking-tighter">Loan Estimator</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Institutional Rate: 17% Fixed</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-16">
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Total Loan Amount</label>
                      <span className="text-2xl font-black dark:text-white italic text-green-600">Rs. {amount.toLocaleString()}</span>
                    </div>
                    <input type="range" min="10000" max="2000000" step="10000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-green-600" />
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 p-8 rounded-[2.5rem] border border-slate-100 dark:border-white/5 group hover:border-green-500/50 transition-all">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-4">Repayment Term</label>
                    <select value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-full bg-transparent font-black text-xl dark:text-white outline-none cursor-pointer appearance-none">
                      {[1, 2, 3, 4, 5, 6, 7].map(y => <option key={y} value={y} className="dark:bg-slate-900">{y} Years Term</option>)}
                    </select>
                  </div>
                </div>
                <div className="bg-slate-900 dark:bg-[#020617] rounded-[3rem] p-12 flex flex-col justify-center items-center text-center border-b-[10px] border-green-600 shadow-3xl relative overflow-hidden group">
                  <p className="text-xs font-black text-green-500 uppercase tracking-[0.3em] mb-6 relative z-10">Estimated Monthly EMI</p>
                  <h2 className="text-6xl font-black text-white italic tracking-tighter relative z-10">Rs. {Math.round(monthlyInstallment).toLocaleString()}</h2>
                  <div className="mt-8 pt-8 border-t border-white/5 w-full">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500 tracking-widest">
                      <span>Interest Type</span>
                      <span className="text-white">Flat Rate</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} viewport={{ once: true }} className="lg:col-span-4 bg-slate-900 rounded-[4rem] p-12 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div>
                <div className="flex items-center gap-4 mb-10 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-green-500"><CalendarIcon size={24} /></div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter">{currentMonthName} {currentYear}</h3>
                </div>
                <div className="grid grid-cols-7 gap-3 mb-10 relative z-10 text-center">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="text-xs font-black text-slate-600">{d}</div>)}
                  {Array.from({ length: 31 }).map((_, i) => (
                    <div key={i} className={`aspect-square flex items-center justify-center text-sm font-bold rounded-xl transition-all cursor-default ${i + 1 === meetingDate ? 'bg-red-600 text-white shadow-lg animate-pulse scale-110' : 'hover:bg-white/5 text-slate-400'} ${i + 1 === today.getDate() ? 'border-2 border-green-500' : ''}`}>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5 relative z-10">
                <div className="bg-white/5 p-6 rounded-[2.5rem] border-l-8 border-red-600 backdrop-blur-md">
                  <div className="flex items-center gap-3 text-red-500 mb-2"><Info size={18} strokeWidth={3} /><span className="text-xs font-black uppercase tracking-widest">Meeting Schedule</span></div>
                  <p className="text-sm font-bold text-slate-200 leading-relaxed italic">සමිටි රැස්වීම: <br /> <span className="text-green-500 text-lg uppercase font-black tracking-tight">{currentMonthName} {meetingDate} වන සඳුදා</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: KEY STATISTICS --- */}
      <section className="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          {t.stats.map((s: any, i: number) => (
            <motion.div key={i} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: -20 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center md:text-left border-l-[6px] border-green-600 pl-10">
              <h2 className="text-6xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tighter transition-all hover:text-green-600">{s.val}</h2>
              <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em] font-bold">{s.lab}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- SECTION 4: SERVICES / FEATURES --- */}
      <section className="py-32 bg-slate-50 dark:bg-[#020617] transition-all relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-slate-200/20 dark:text-slate-800/10 pointer-events-none select-none italic uppercase -rotate-12">SANASA</div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <h2 className="text-6xl font-black mb-8 dark:text-white italic uppercase tracking-tighter leading-none">Why Choose <br /> <span className="text-green-600">Our Society?</span></h2>
              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">We provide more than just banking services. We focus on community empowerment and long-term financial prosperity for all members.</p>
            </div>
            <button onClick={() => onNavigate('rates')} className="px-10 py-5 bg-slate-900 dark:bg-white dark:text-black text-white rounded-full font-black flex items-center gap-4 hover:scale-110 transition-all uppercase tracking-[0.2em] text-[10px] shadow-2xl">Check Interest Rates <ArrowRight size={18} /></button>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {t.features.map((f: any, i: number) => (
              <motion.div whileHover={{ y: -20, scale: 1.02 }} key={i} className="p-12 rounded-[3.5rem] bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 group hover:bg-green-600 transition-all duration-700 shadow-sm hover:shadow-3xl">
                <div className="w-20 h-20 rounded-[2rem] bg-slate-50 dark:bg-slate-800 shadow-inner flex items-center justify-center mb-10 group-hover:bg-white group-hover:rotate-12 transition-all duration-500"><CheckCircle2 size={36} strokeWidth={2.5} className="text-green-600" /></div>
                <h3 className="text-3xl font-black mb-6 group-hover:text-white transition-colors italic uppercase tracking-tighter">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed group-hover:text-green-50 transition-colors">{f.desc}</p>
                <div className="mt-10 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <span className="text-white text-xs font-black uppercase tracking-widest flex items-center gap-2 cursor-pointer">Learn More <ChevronRight size={14} /></span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}