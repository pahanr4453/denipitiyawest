import { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Loader2, ShieldCheck, ArrowUpRight, Info, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface FDRate {
  id: number;
  period: string;
  rate: string;
  min_amount: string;
  is_popular: boolean;
}

const content = {
  en: {
    heroTitle: "Grow Wealth",
    heroSub: "Secure your future with industry-leading interest rates",
    mainHeading: "Fixed Deposit Rates",
    subHeading: "Attractive returns for your hard-earned savings",
    periodLabel: "Investment Period",
    rateLabel: "Annual Rate",
    minLabel: "Minimum Deposit",
    perAnnum: "per annum",
    ctaBtn: "Invest Now",
    features: [
      { t: "High Returns", d: "Maximum profit for your savings" },
      { t: "Flexibility", d: "Terms from 3 to 60 months" },
      { t: "Secure", d: "Government backed protection" },
      { t: "Auto-Renewal", d: "Seamless reinvestment options" }
    ]
  },
  si: {
    heroTitle: "ධනය වර්ධනය",
    heroSub: "ඉහළම පොලී අනුපාත සමඟ ඔබේ අනාගතය සුරක්ෂිත කරගන්න",
    mainHeading: "ස්ථාවර තැන්පතු අනුපාත",
    subHeading: "ඔබේ ඉතිරි කිරීම් සඳහා ආකර්ශනීය ප්‍රතිලාභ",
    periodLabel: "ආයෝජන කාලය",
    rateLabel: "වාර්ෂික පොලිය",
    minLabel: "අවම තැන්පතුව",
    perAnnum: "වසරකට",
    ctaBtn: "දැන්ම ආයෝජනය කරන්න",
    features: [
      { t: "ඉහළ ප්‍රතිලාභ", d: "ඉතිරි කිරීම් සඳහා උපරිම ලාභයක්" },
      { t: "නම්‍යශීලී බව", d: "මාස 3 සිට 60 දක්වා කාල සීමාවන්" },
      { t: "සුරක්ෂිත බව", d: "රාජ්‍ය සහතිකලත් ආරක්ෂාව" },
      { t: "ස්වයංක්‍රීය අලුත් කිරීම", d: "නැවත ආයෝජනයට පහසුකම්" }
    ]
  },
  ta: {
    heroTitle: "செல்வத்தை பெருக்குங்கள்",
    heroSub: "சந்தையில் முன்னணியில் உள்ள வட்டி விகிதங்களுடன் உங்கள் எதிர்காலத்தைப் பாதுகாக்கவும்",
    mainHeading: "நிலையான வைப்பு விகிதங்கள்",
    subHeading: "உங்கள் கஷ்டப்பட்டு சம்பாதித்த சேமிப்பிற்கு கவர்ச்சிகரமான வருமானம்",
    periodLabel: "முதலீட்டு காலம்",
    rateLabel: "ஆண்டு வட்டி",
    minLabel: "குறைந்தபட்ச வைப்பு",
    perAnnum: "ஆண்டுதோறும்",
    ctaBtn: "இப்போதே முதலீடு செய்க",
    features: [
      { t: "அதிக வருமானம்", d: "உங்கள் சேமிப்பிற்கு அதிகபட்ச லாபம்" },
      { t: "நெகிழ்வுத்தன்மை", d: "3 முதல் 60 மாதங்கள் வரையிலான கால அளவு" },
      { t: "பாதுகாப்பு", d: "அரசாங்கத்தால் அங்கீகரிக்கப்பட்ட பாதுகாப்பு" },
      { t: "தானியங்கி புதுப்பித்தல்", d: "தடையற்ற மறுமுதலீட்டு விருப்பங்கள்" }
    ]
  }
};

export default function Rates({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const [fdRates, setFdRates] = useState<FDRate[]>([]);
  const [loading, setLoading] = useState(true);
  
  const isTamil = lang === 'ta';
  const t = content[lang as keyof typeof content] || content.si;

  useEffect(() => {
    async function fetchRates() {
      const { data, error } = await supabase
        .from('fd_rates')
        .select('*')
        .order('id', { ascending: true });

      if (!error) setFdRates(data || []);
      setLoading(false);
    }
    fetchRates();
  }, [lang]);

  return (
    <div className="py-24 bg-[#f8fafc] dark:bg-[#020617] min-h-screen transition-colors duration-500 relative overflow-hidden">
      
      {/* --- DECORATIVE ELEMENTS --- */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-600/5 blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] dark:opacity-[0.05] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- Hero Section --- */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100 dark:border-blue-800/50 shadow-sm"
          >
            <TrendingUp size={14} /> Market Leading Rates 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`${isTamil ? 'text-5xl md:text-6xl' : 'text-6xl md:text-7xl'} font-black text-slate-900 dark:text-white mb-6 tracking-tighter italic uppercase`}
          >
            {t.heroTitle}<span className="text-blue-600">.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`${isTamil ? 'text-base' : 'text-lg'} text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed`}
          >
            {t.heroSub}
          </motion.p>
        </div>

        {/* --- Rates Grid --- */}
        {loading ? (
          <div className="flex flex-col justify-center items-center py-40 gap-4">
            <Loader2 className="animate-spin text-blue-600" size={50} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic animate-pulse">Accessing Live Rates...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {fdRates.map((rate, idx) => (
              <motion.div
                key={rate.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -12, transition: { duration: 0.3 } }}
                className={`relative group p-8 rounded-[3rem] border transition-all duration-500 ${
                  rate.is_popular 
                  ? 'bg-slate-900 dark:bg-blue-600 border-slate-900 dark:border-blue-500 shadow-2xl scale-105 z-10' 
                  : 'bg-white/80 dark:bg-slate-900/50 backdrop-blur-md border-white dark:border-white/5 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-blue-300 dark:hover:border-blue-500/50'
                }`}
              >
                {rate.is_popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-white text-white dark:text-blue-600 text-[9px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="text-center">
                  <p className={`text-[10px] font-black uppercase tracking-widest mb-4 ${rate.is_popular ? 'text-blue-400' : 'text-slate-400'}`}>
                    {t.periodLabel}
                  </p>
                  <h3 className={`${isTamil ? 'text-2xl' : 'text-3xl'} font-black italic uppercase tracking-tighter mb-8 ${rate.is_popular ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                    {rate.period}
                  </h3>
                  
                  <div className="mb-8 relative inline-block">
                    <span className={`text-6xl font-black italic tracking-tighter ${rate.is_popular ? 'text-white' : 'text-blue-600'}`}>
                      {rate.rate}
                    </span>
                    <span className={`block text-[10px] font-bold uppercase mt-2 ${rate.is_popular ? 'text-slate-400 dark:text-blue-100' : 'text-slate-500'}`}>
                      % {t.perAnnum}
                    </span>
                  </div>

                  <div className={`pt-8 border-t ${rate.is_popular ? 'border-white/10' : 'border-slate-50 dark:border-white/5'} space-y-2`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest ${rate.is_popular ? 'text-slate-500' : 'text-slate-400'}`}>
                      {t.minLabel}
                    </p>
                    <p className={`text-lg font-black ${rate.is_popular ? 'text-blue-400 dark:text-white' : 'text-slate-800 dark:text-slate-200'}`}>
                      {rate.min_amount}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* --- Info Sections --- */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden shadow-2xl shadow-blue-500/30"
          >
            <div className="absolute -right-10 -bottom-10 opacity-10 rotate-12">
              <ShieldCheck size={300} />
            </div>
            <h2 className={`${isTamil ? 'text-3xl' : 'text-4xl'} font-black italic uppercase tracking-tighter mb-10 relative z-10 leading-[0.9]`}>
              Why Save With <br/><span className="text-blue-200">Denipitiya West?</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8 relative z-10">
              {t.features.map((f, i) => (
                <div key={i} className="group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-blue-600 transition-all">
                    <CheckCircle2 size={20} />
                  </div>
                  <h4 className={`${isTamil ? 'text-[11px]' : 'text-xs'} font-black uppercase italic tracking-widest mb-2`}>{f.t}</h4>
                  <p className="text-blue-100/80 text-[11px] leading-relaxed">{f.d}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="bg-white dark:bg-slate-900 border-4 border-slate-50 dark:border-white/5 rounded-[4rem] p-12 md:p-16 flex flex-col justify-between shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <div className="flex items-start gap-6 mb-12">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-3xl flex items-center justify-center text-blue-600">
                 <Info size={32} />
              </div>
              <div>
                <h3 className={`${isTamil ? 'text-xl' : 'text-2xl'} font-black italic uppercase text-slate-800 dark:text-white tracking-tighter mb-2`}>Ready to start?</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Talk to our experts today.</p>
              </div>
            </div>
            <div className="space-y-6">
              <button className="w-full bg-slate-900 dark:bg-blue-600 text-white py-6 rounded-3xl font-black uppercase text-[11px] tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95">
                  {t.ctaBtn} <ArrowUpRight size={18} />
              </button>
              <div className="flex justify-center gap-4 text-[9px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                <span>• Trusted since 1987</span>
                <span>• Central Bank Regulated</span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}