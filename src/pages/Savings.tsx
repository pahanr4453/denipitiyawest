import React, { useState, useEffect } from 'react';
import {
  PiggyBank,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Zap,
  Gift,
  Coins,
  TrendingUp
} from 'lucide-react';
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
    heroSub: "Build stronger financial habits with flexible savings options designed for everyday life.",
    badge: "High-Yield Savings",
    benefitsHeading: "Account Benefits",
    ctaBtn: "Open Account",
    whyTitle: "Why Save With Us?",
    info: [
      { t: "Best Rates", d: "Competitive returns for your savings." },
      { t: "Secure", d: "Built around trusted Sanasa protection." },
      { t: "Flexible", d: "Easy access when you need your money." },
      { t: "Zero Fees", d: "Simple saving with no hidden charges." }
    ]
  },
  si: {
    heroTitle: "බුද්ධිමත් ඉතිරිය",
    heroSub: "දිනපතා ජීවිතයට ගැලපෙන නම්‍යශීලී ඉතුරුම් විකල්ප සමඟ ශක්තිමත් මූල්‍ය පුරුදු ගොඩනඟන්න.",
    badge: "ඉහළ ප්‍රතිලාභ සහිත ඉතුරුම්",
    benefitsHeading: "ගිණුම් ප්‍රතිලාභ",
    ctaBtn: "ගිණුමක් අරඹන්න",
    whyTitle: "අප සමඟ ඉතිරි කළ යුත්තේ ඇයි?",
    info: [
      { t: "හොඳම පොලිය", d: "ඔබේ ඉතුරුම් සඳහා තරඟකාරී ප්‍රතිලාභ." },
      { t: "සුරක්ෂිත බව", d: "විශ්වාසනීය සණස ආරක්ෂාව සමඟ." },
      { t: "නම්‍යශීලී බව", d: "අවශ්‍ය වෙලාවට පහසු ප්‍රවේශය." },
      { t: "ගාස්තු රහිතයි", d: "සැඟවුණු ගාස්තු නැති සරල ඉතුරුම්." }
    ]
  },
  ta: {
    heroTitle: "புத்திசாலித்தனமான சேமிப்பு",
    heroSub: "தினசரி வாழ்க்கைக்கு ஏற்ற நெகிழ்வான சேமிப்பு விருப்பங்களுடன் வலுவான நிதி பழக்கங்களை உருவாக்குங்கள்.",
    badge: "உயர் வருமான சேமிப்பு",
    benefitsHeading: "கணக்கு நன்மைகள்",
    ctaBtn: "கணக்கைத் தொடங்கவும்",
    whyTitle: "ஏன் எங்களுடன் சேமிக்க வேண்டும்?",
    info: [
      { t: "சிறந்த வட்டி", d: "உங்கள் சேமிப்புக்கு போட்டித்திறன் வாய்ந்த வருமானம்." },
      { t: "பாதுகாப்பு", d: "நம்பகமான சனச பாதுகாப்புடன்." },
      { t: "நெகிழ்வுத்தன்மை", d: "தேவைப்படும் போது எளிதான அணுகல்." },
      { t: "கட்டணங்கள் இல்லை", d: "மறைமுக கட்டணமில்லா எளிய சேமிப்பு." }
    ]
  }
};

export default function Savings({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const [savingsTypes, setSavingsTypes] = useState<SavingsProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const isTamil = lang === 'ta';
  const t = content[lang as keyof typeof content] || content.si;

  useEffect(() => {
    async function fetchSavings() {
      const { data, error } = await supabase
        .from('savings_products')
        .select('*')
        .order('id', { ascending: true });

      if (!error) setSavingsTypes(data || []);
      setLoading(false);
    }

    fetchSavings();
  }, [lang]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900 transition-colors duration-500 dark:bg-[#020617] dark:text-white">

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 70, 10, 0], y: [0, 40, 90, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-28 -left-24 h-[340px] w-[340px] rounded-full bg-blue-500/10 blur-[100px] dark:bg-blue-500/10"
        />
        <motion.div
          animate={{ x: [0, -60, -15, 0], y: [0, 70, -20, 0], scale: [1, 0.94, 1.08, 1] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] -right-28 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[120px] dark:bg-cyan-400/10"
        />
        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -35, 25, 0], scale: [1, 1.1, 0.95, 1] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-130px] left-[28%] h-[460px] w-[460px] rounded-full bg-indigo-400/10 blur-[130px] dark:bg-indigo-500/10"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.035)_1px,transparent_1px)] [background-size:28px_28px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)]" />
      </div>

      <div className="relative z-10 pb-32 md:pb-40">

        {/* HERO */}
        <section className="px-5 pt-28 pb-14 md:px-8 md:pt-32 md:pb-16">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-blue-700 backdrop-blur-xl dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
            >
              <TrendingUp size={14} />
              {t.badge}
            </motion.div>

            <div className="max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className={`${isTamil ? 'text-4xl md:text-5xl' : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'} max-w-4xl font-extrabold leading-[1.02] tracking-[-0.045em] text-slate-950 dark:text-white`}
              >
                {t.heroTitle}
                <span className="text-blue-600">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 max-w-2xl text-sm font-medium leading-7 text-slate-600 md:text-base dark:text-slate-400"
              >
                {t.heroSub}
              </motion.p>
            </div>
          </div>
        </section>

        {/* SAVINGS GRID */}
        <section className="mx-auto max-w-7xl px-5 md:px-8">
          {loading ? (
            <div className="flex justify-center py-32">
              <div className="relative">
                <Loader2 className="animate-spin text-blue-600" size={38} strokeWidth={1.6} />
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {savingsTypes.map((savings, idx) => (
                <motion.div
                  key={savings.id}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative flex min-h-[430px] flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/75 shadow-[0_18px_60px_-34px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-500 hover:border-blue-500/30 hover:shadow-[0_24px_80px_-30px_rgba(37,99,235,0.28)] dark:border-white/8 dark:bg-white/[0.035]"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />

                  <div className="absolute right-6 top-6 z-20">
                    <div className="rounded-2xl border border-slate-200/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85">
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">Up to</p>
                      <p className="mt-1 text-xl font-extrabold leading-none tracking-tight text-blue-600">
                        {savings.interest}
                      </p>
                    </div>
                  </div>

                  <div className="p-7 pb-5 md:p-8 md:pb-6">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-transform duration-500 group-hover:scale-105">
                      <PiggyBank size={28} strokeWidth={1.8} />
                    </div>

                    <h3 className={`${isTamil ? 'text-xl md:text-2xl' : 'text-2xl'} max-w-[75%] font-extrabold leading-tight tracking-[-0.03em] text-slate-950 dark:text-white`}>
                      {savings.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">
                      {savings.description}
                    </p>
                  </div>

                  <div className="flex-grow px-7 pb-7 md:px-8 md:pb-8">
                    <div className="border-t border-slate-200/80 pt-6 dark:border-white/8">
                      <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {t.benefitsHeading}
                      </p>

                      <ul className="space-y-3.5">
                        {savings.features?.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
                            <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                            <span className={isTamil ? 'text-[13px] leading-6' : 'text-sm leading-6'}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button className="flex w-full items-center justify-center gap-2.5 rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-900 shadow-sm transition-all duration-500 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:group-hover:border-blue-600 dark:group-hover:bg-blue-600">
                      {t.ctaBtn}
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* WHY US */}
          <div className="mt-24 md:mt-28">
            <div className="mb-8 max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-blue-600 dark:text-blue-400">
                Sanasa Savings
              </p>
              <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} mt-3 font-extrabold tracking-[-0.035em] text-slate-950 dark:text-white`}>
                {t.whyTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {t.info.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-950 p-7 text-white shadow-xl dark:border-white/8 dark:bg-slate-950"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl transition-all duration-500 group-hover:bg-blue-500/20" />

                  <div className="relative z-10">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-400/10 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white">
                      {i === 0 ? (
                        <Coins size={22} />
                      ) : i === 1 ? (
                        <ShieldCheck size={22} />
                      ) : i === 2 ? (
                        <Zap size={22} />
                      ) : (
                        <Gift size={22} />
                      )}
                    </div>

                    <h4 className={`${isTamil ? 'text-base' : 'text-lg'} font-extrabold tracking-tight`}>
                      {item.t}
                    </h4>
                    <p className="mt-2 text-xs font-medium leading-5 text-slate-400">
                      {item.d}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
