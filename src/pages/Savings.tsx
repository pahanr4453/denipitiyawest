import { useState, useEffect } from 'react';
import { PiggyBank, Star, Loader2, ShieldCheck, ArrowRight, Zap, Gift, Coins, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface SavingsProduct {
  id: number;
  name: string;
  description: string;
  interest: string;
  features: string[];
}

const content = {
  en: {
    heroTitle: "Smart Savings",
    heroSub: "The foundation of your financial freedom starts here",
    benefitsHeading: "Account Benefits",
    ctaBtn: "Open Account",
    whyTitle: "Why Save With Us?",
    info: [
      { t: "Best Rates", d: "Leading market interest" },
      { t: "Secure", d: "Protected by Sanasa" },
      { t: "Flexible", d: "Instant withdrawals" },
      { t: "Zero Fees", d: "No hidden charges" }
    ]
  },
  si: {
    heroTitle: "බුද්ධිමත් ඉතිරිය",
    heroSub: "ඔබේ මූල්‍ය නිදහසේ අඩිතාලම මෙතැනින් ආරම්භ වේ",
    benefitsHeading: "ගිණුම් ප්‍රතිලාභ",
    ctaBtn: "ගිණුමක් අරඹන්න",
    whyTitle: "අප සමඟ ඉතිරි කළ යුත්තේ ඇයි?",
    info: [
      { t: "හොඳම පොලිය", d: "වෙළඳපොලේ ඉහළම අනුපාත" },
      { t: "සුරක්ෂිත බව", d: "සණස සහතිකලත් ආරක්ෂාව" },
      { t: "නම්‍යශීලී බව", d: "ඕනෑම වෙලාවක මුදල් ලබාගැනීම" },
      { t: "ගාස්තු රහිතයි", d: "සැඟවුණු ගාස්තු කිසිවක් නැත" }
    ]
  }
};

export default function Savings({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const [savingsTypes, setSavingsTypes] = useState<SavingsProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const t = content[lang as keyof typeof content] || content.si;

  useEffect(() => {
    async function fetchSavings() {
      const { data, error } = await supabase.from('savings_products').select('*').order('id', { ascending: true });
      if (!error) setSavingsTypes(data || []);
      setLoading(false);
    }
    fetchSavings();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-all duration-1000 pb-40">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
          >
            <TrendingUp size={14} /> High-Yield Savings
          </motion.div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-[0.8] dark:text-white">
            {t.heroTitle}<span className="text-blue-600">.</span>
          </h1>
          
          <p className="mt-10 text-xl text-slate-500 dark:text-slate-400 max-w-xl font-medium leading-relaxed">
            {t.heroSub}
          </p>
        </div>
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-0" />
      </section>

      {/* --- SAVINGS GRID --- */}
      <section className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="flex justify-center py-40">
             <Loader2 className="animate-spin text-blue-500" size={40} strokeWidth={1} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savingsTypes.map((savings, idx) => (
              <motion.div
                key={savings.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative flex flex-col rounded-[3.5rem] bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/5 overflow-hidden hover:border-blue-500/40 transition-all duration-500"
              >
                {/* Interest Badge */}
                <div className="absolute top-8 right-8 z-20">
                  <div className="bg-white dark:bg-slate-900 shadow-xl px-4 py-2 rounded-2xl border border-slate-100 dark:border-white/10">
                    <p className="text-[8px] font-black uppercase text-slate-400 mb-1">Up to</p>
                    <p className="text-lg font-black text-blue-600 italic leading-none">{savings.interest}</p>
                  </div>
                </div>

                {/* Top Section */}
                <div className="p-10 pt-12">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-blue-600/20 mb-8">
                    <PiggyBank size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black tracking-tighter uppercase italic dark:text-white mb-4 leading-tight">
                    {savings.name}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {savings.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="px-10 pb-10 flex-grow">
                  <div className="pt-8 border-t border-slate-200 dark:border-white/5">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">{t.benefitsHeading}</p>
                    <ul className="space-y-4">
                      {savings.features?.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600 dark:text-slate-300">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="p-4 pt-0">
                  <button className="w-full bg-white dark:bg-white/5 dark:text-white py-6 rounded-[2.5rem] font-black uppercase text-[11px] tracking-widest border border-slate-200 dark:border-white/10 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-500 flex items-center justify-center gap-3">
                    {t.ctaBtn} <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- WHY US (GRID STYLE) --- */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.info.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-slate-950 text-white relative overflow-hidden group transition-all"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {i === 0 ? <Coins size={24} /> : i === 1 ? <ShieldCheck size={24} /> : i === 2 ? <Zap size={24} /> : <Gift size={24} />}
                </div>
                <h4 className="text-lg font-black uppercase italic tracking-widest mb-2">{item.t}</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">{item.d}</p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full" />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}