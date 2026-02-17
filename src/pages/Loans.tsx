import { useState, useEffect } from 'react';
import { Banknote, CheckCircle, Loader2, ArrowRight, Calculator, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface LoanProduct {
  id: number;
  title: string;
  description: string;
  interest_rate: string;
  max_amount: string;
}

const content = {
  en: {
    heroTitle: "Financial Empowering",
    heroSub: "Loans tailored for your dreams",
    processTitle: "Simple 4-Step Process",
    applyBtn: "Apply Now",
    rateLabel: "Interest Rate",
    limitLabel: "Maximum Limit",
    steps: [
      { t: "Apply", d: "Online or Branch" },
      { t: "Verify", d: "Quick Document Check" },
      { t: "Approve", d: "Instant Decision" },
      { t: "Fund", d: "Direct Transfer" }
    ]
  },
  si: {
    heroTitle: "මූල්‍ය ශක්තිය",
    heroSub: "ඔබේ සිහින වෙනුවෙන් සැකසූ ණය සේවා",
    processTitle: "සරල පියවර 4කින්",
    applyBtn: "දැන්ම අයදුම් කරන්න",
    rateLabel: "පොලී අනුපාතය",
    limitLabel: "උපරිම සීමාව",
    steps: [
      { t: "අයදුම් කරන්න", d: "අන්තර්ජාලයෙන් හෝ ශාඛාවෙන්" },
      { t: "සහතික කිරීම", d: "ලේඛන පරීක්ෂාව" },
      { t: "අනුමැතිය", d: "ක්ෂණික තීරණය" },
      { t: "මුදල් ලබාදීම", d: "සෘජුවම ගිණුමට" }
    ]
  }
};

export default function Loans({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const t = content[lang as keyof typeof content] || content.si;

  useEffect(() => {
    async function fetchLoans() {
      const { data, error } = await supabase
        .from('loan_products')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error) setLoanProducts(data || []);
      setLoading(false);
    }
    fetchLoans();
  }, []);

  return (
    <div className="py-20 bg-white dark:bg-[#020617] min-h-screen overflow-hidden transition-colors duration-1000">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- Advanced Hero Section --- */}
        <div className="relative mb-28 text-center pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-green-500/10 dark:bg-green-500/5 text-green-600 dark:text-green-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-green-500/20"
          >
            <ShieldCheck size={14} /> Trusted Credit Solutions
          </motion.div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter italic uppercase leading-[0.9]">
            {t.heroTitle} <span className="text-green-600 animate-pulse">.</span>
          </h1>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium">
            {t.heroSub}
          </p>
          
          {/* Background Decorative Elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-96 bg-green-500/5 blur-[120px] rounded-full -z-10" />
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 gap-6">
            <div className="relative">
                <Loader2 className="animate-spin text-green-500" size={50} strokeWidth={1} />
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 dark:text-slate-600">Syncing database</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
            {loanProducts.map((loan, idx) => (
              <motion.div
                key={loan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-slate-50/50 dark:bg-white/[0.03] rounded-[3rem] p-10 shadow-sm hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-700 border border-slate-100 dark:border-white/5 flex flex-col"
              >
                {/* Floating Badge */}
                <div className="absolute -top-4 right-10 bg-slate-900 dark:bg-green-600 text-white text-[9px] font-black px-5 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-xl">
                  {loan.interest_rate} APR
                </div>

                <div className="mb-10">
                  <div className="w-20 h-20 bg-white dark:bg-slate-950 text-green-600 rounded-[1.8rem] flex items-center justify-center mb-8 group-hover:bg-green-600 group-hover:text-white transition-all duration-500 shadow-sm border border-slate-100 dark:border-white/5">
                    <Banknote size={36} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-800 dark:text-white uppercase italic tracking-tighter mb-4 leading-tight">{loan.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium line-clamp-3">
                    {loan.description}
                  </p>
                </div>

                <div className="space-y-5 mb-10 pt-8 border-t border-slate-200/50 dark:border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.rateLabel}</span>
                    <span className="text-xl font-black text-green-600 italic">{loan.interest_rate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t.limitLabel}</span>
                    <span className="text-slate-800 dark:text-white font-black text-lg">{loan.max_amount}</span>
                  </div>
                </div>

                <button className="w-full bg-white dark:bg-white/5 text-slate-900 dark:text-white py-6 rounded-[1.8rem] font-black uppercase text-[11px] tracking-[0.2em] border border-slate-200 dark:border-white/10 hover:bg-green-600 hover:border-green-600 hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                  {t.applyBtn} <ArrowRight size={18} />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- Premium Process Stepper --- */}
        <div className="bg-slate-950 dark:bg-black rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-2xl">
          {/* Abstract Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/10 blur-[120px] rounded-full" />

          <div className="relative z-10 text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter mb-6">{t.processTitle}</h2>
            <div className="w-24 h-2 bg-green-600 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-16 relative z-10">
            {t.steps.map((step, i) => (
              <div key={i} className="text-center group">
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-3xl border border-white/10 text-green-500 rounded-[2.2rem] flex items-center justify-center text-4xl font-black italic transition-all duration-500 group-hover:bg-green-600 group-hover:text-white group-hover:scale-110 shadow-2xl">
                    0{i + 1}
                  </div>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-12 w-8 h-[1px] bg-white/20" />
                  )}
                </div>
                <h3 className="text-white font-black uppercase italic tracking-[0.2em] mb-4 text-lg">{step.t}</h3>
                <p className="text-slate-400 text-[11px] font-bold leading-relaxed uppercase tracking-wider px-4">{step.d}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}