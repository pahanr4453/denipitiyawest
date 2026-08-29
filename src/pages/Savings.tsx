import React, { useEffect, useState } from 'react';
import {
  PiggyBank,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Zap,
  Gift,
  Coins,
  TrendingUp,
  UsersRound
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
    heroTitle: 'Savings',
    heroSub: 'Smart today, secure tomorrow. Build your future with every save.',
    badge: 'High-Yield Savings',
    accountsTitle: 'Our Savings Accounts',
    accountsSub: 'Choose the account that fits your goals.',
    benefitsHeading: 'Account Benefits',
    ctaBtn: 'Open Account',
    whyTitle: 'Why Save With Us?',
    whySub: 'Benefits that make your savings smarter.',
    happySavers: 'Happy Savers',
    secureLabel: 'Secure & Protected',
    info: [
      { t: 'Best Rates', d: 'Get the best interest rates in the market.' },
      { t: 'Secure', d: 'Your money is safe and protected.' },
      { t: 'Flexible', d: 'Instant access to your money, anytime.' },
      { t: 'Zero Fees', d: 'No hidden charges, ever.' }
    ]
  },
  si: {
    heroTitle: 'ඉතුරුම්',
    heroSub: 'අද බුද්ධිමත්ව ඉතිරි කරන්න. හෙට සුරක්ෂිත කරන්න.',
    badge: 'ඉහළ ප්‍රතිලාභ සහිත ඉතුරුම්',
    accountsTitle: 'අපගේ ඉතුරුම් ගිණුම්',
    accountsSub: 'ඔබේ ඉලක්කයට ගැලපෙන ගිණුම තෝරන්න.',
    benefitsHeading: 'ගිණුම් ප්‍රතිලාභ',
    ctaBtn: 'ගිණුමක් අරඹන්න',
    whyTitle: 'අප සමඟ ඉතිරි කළ යුත්තේ ඇයි?',
    whySub: 'ඔබේ ඉතුරුම් තවත් හොඳ කරන වාසි.',
    happySavers: 'සතුටු සාමාජිකයින්',
    secureLabel: 'සුරක්ෂිත සහ ආරක්ෂිත',
    info: [
      { t: 'හොඳම පොලිය', d: 'වෙළඳපොලේ තරඟකාරී පොලී අනුපාත.' },
      { t: 'සුරක්ෂිත බව', d: 'ඔබේ මුදල් ආරක්ෂිතව තබා ගන්න.' },
      { t: 'නම්‍යශීලී බව', d: 'අවශ්‍ය විට පහසු මුදල් ප්‍රවේශය.' },
      { t: 'ගාස්තු රහිතයි', d: 'සැඟවුණු ගාස්තු කිසිවක් නැත.' }
    ]
  },
  ta: {
    heroTitle: 'சேமிப்பு',
    heroSub: 'இன்று புத்திசாலித்தனமாக சேமியுங்கள். நாளையை பாதுகாப்பாக கட்டியெழுப்புங்கள்.',
    badge: 'உயர் வருமான சேமிப்பு',
    accountsTitle: 'எங்கள் சேமிப்பு கணக்குகள்',
    accountsSub: 'உங்கள் இலக்குகளுக்கு ஏற்ற கணக்கைத் தேர்ந்தெடுக்கவும்.',
    benefitsHeading: 'கணக்கு நன்மைகள்',
    ctaBtn: 'கணக்கைத் தொடங்கவும்',
    whyTitle: 'ஏன் எங்களுடன் சேமிக்க வேண்டும்?',
    whySub: 'உங்கள் சேமிப்பை புத்திசாலித்தனமாக்கும் நன்மைகள்.',
    happySavers: 'மகிழ்ச்சியான சேமிப்பாளர்கள்',
    secureLabel: 'பாதுகாப்பானது',
    info: [
      { t: 'சிறந்த வட்டி', d: 'சந்தையில் போட்டித்திறன் வாய்ந்த வட்டி விகிதங்கள்.' },
      { t: 'பாதுகாப்பு', d: 'உங்கள் பணம் பாதுகாப்பாக வைக்கப்படுகிறது.' },
      { t: 'நெகிழ்வு', d: 'தேவைப்படும் போது எளிதான அணுகல்.' },
      { t: 'கட்டணமில்லை', d: 'மறைமுக கட்டணங்கள் எதுவும் இல்லை.' }
    ]
  }
};

const accents = [
  {
    ring: 'ring-blue-500/15',
    iconBg: 'bg-blue-500/10',
    iconText: 'text-blue-600 dark:text-blue-400',
    rateText: 'text-blue-600 dark:text-blue-400',
    rateBorder: 'border-blue-500/20',
    bullet: 'text-blue-600 dark:text-blue-400',
    button:
      'border-blue-500/30 text-blue-700 hover:bg-blue-600 hover:text-white dark:text-blue-300'
  },
  {
    ring: 'ring-emerald-500/15',
    iconBg: 'bg-emerald-500/10',
    iconText: 'text-emerald-600 dark:text-emerald-400',
    rateText: 'text-emerald-600 dark:text-emerald-400',
    rateBorder: 'border-emerald-500/20',
    bullet: 'text-emerald-600 dark:text-emerald-400',
    button:
      'border-emerald-500/30 text-emerald-700 hover:bg-emerald-600 hover:text-white dark:text-emerald-300'
  },
  {
    ring: 'ring-violet-500/15',
    iconBg: 'bg-violet-500/10',
    iconText: 'text-violet-600 dark:text-violet-400',
    rateText: 'text-violet-600 dark:text-violet-400',
    rateBorder: 'border-violet-500/20',
    bullet: 'text-violet-600 dark:text-violet-400',
    button:
      'border-violet-500/30 text-violet-700 hover:bg-violet-600 hover:text-white dark:text-violet-300'
  }
];

export default function Savings({
  lang = 'si'
}: {
  lang?: 'si' | 'en' | 'ta';
}) {
  const [savingsTypes, setSavingsTypes] = useState<SavingsProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const t = content[lang as keyof typeof content] || content.si;
  const isTamil = lang === 'ta';

  useEffect(() => {
    async function fetchSavings() {
      setLoading(true);

      const { data, error } = await supabase
        .from('savings_products')
        .select('*')
        .order('id', { ascending: true });

      if (!error) {
        setSavingsTypes(data || []);
      }

      setLoading(false);
    }

    fetchSavings();
  }, [lang]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbfdff] text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">
      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 20, 0], y: [0, 30, 75, 0], scale: [1, 1.05, 0.96, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 -top-28 h-[340px] w-[340px] rounded-full bg-blue-500/12 blur-[110px] dark:bg-blue-500/10"
        />

        <motion.div
          animate={{ x: [0, -80, -20, 0], y: [0, 70, -10, 0], scale: [1, 0.94, 1.08, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-28 top-[8%] h-[440px] w-[440px] rounded-full bg-violet-500/10 blur-[130px] dark:bg-violet-500/10"
        />

        <motion.div
          animate={{ x: [0, 50, -30, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-160px] left-[35%] h-[460px] w-[460px] rounded-full bg-cyan-400/10 blur-[140px] dark:bg-cyan-400/10"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:28px_28px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)]" />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section className="px-5 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-blue-700 shadow-sm backdrop-blur-xl dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
            >
              <TrendingUp size={14} />
              {t.badge}
            </motion.div>

            <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`${isTamil ? 'text-4xl md:text-5xl' : 'text-5xl sm:text-6xl md:text-7xl'} max-w-3xl font-extrabold leading-[0.98] tracking-[-0.05em] text-slate-950 dark:text-white`}
                >
                  {t.heroTitle}
                  <span className="text-blue-600">.</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mt-5 max-w-xl text-sm font-medium leading-7 text-slate-600 md:text-base dark:text-slate-400"
                >
                  {t.heroSub}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="grid grid-cols-2 gap-3 sm:max-w-md lg:ml-auto"
              >
                <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <UsersRound size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold leading-none">3,000+</p>
                      <p className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        {t.happySavers}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <p className="text-lg font-extrabold leading-none">100%</p>
                      <p className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        {t.secureLabel}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ACCOUNTS */}
        <section className="px-5 pb-28 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center md:mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                Sanasa Savings
              </p>
              <h2
                className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} mt-3 font-extrabold tracking-[-0.04em]`}
              >
                {t.accountsTitle}
              </h2>
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                {t.accountsSub}
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-28">
                <Loader2
                  className="animate-spin text-blue-600"
                  size={38}
                  strokeWidth={1.6}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {savingsTypes.map((savings, idx) => {
                  const accent = accents[idx % accents.length];

                  return (
                    <motion.div
                      key={savings.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ y: -6 }}
                      className={`group relative flex min-h-[450px] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/78 p-6 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl ring-1 ${accent.ring} transition-all duration-500 hover:shadow-[0_25px_80px_-35px_rgba(37,99,235,0.35)] dark:border-white/10 dark:bg-white/[0.04] md:p-7`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-[1.4rem] ${accent.iconBg} ${accent.iconText}`}
                        >
                          <PiggyBank size={30} strokeWidth={1.7} />
                        </div>

                        <div
                          className={`rounded-2xl border ${accent.rateBorder} bg-white/85 px-4 py-3 text-right shadow-sm backdrop-blur-xl dark:bg-slate-950/70`}
                        >
                          <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
                            Up to
                          </p>
                          <p className={`mt-1 text-xl font-extrabold ${accent.rateText}`}>
                            {savings.interest}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7">
                        <h3
                          className={`${isTamil ? 'text-xl' : 'text-2xl'} font-extrabold leading-tight tracking-[-0.03em] text-slate-950 dark:text-white`}
                        >
                          {savings.name}
                        </h3>

                        <p className="mt-3 min-h-[48px] text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">
                          {savings.description}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-slate-200/80 pt-6 dark:border-white/10">
                        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                          {t.benefitsHeading}
                        </p>

                        <ul className="space-y-3">
                          {savings.features?.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300"
                            >
                              <ShieldCheck
                                size={17}
                                className={`mt-0.5 shrink-0 ${accent.bullet}`}
                                strokeWidth={2}
                              />
                              <span className="leading-6">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-auto pt-7">
                        <button
                          className={`flex w-full items-center justify-center gap-2 rounded-xl border bg-transparent px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${accent.button}`}
                        >
                          {t.ctaBtn}
                          <ArrowRight size={17} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* WHY SAVE WITH US */}
            <div className="mt-24 md:mt-28">
              <div className="mb-8 text-center">
                <h2
                  className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-extrabold tracking-[-0.04em]`}
                >
                  {t.whyTitle}
                </h2>
                <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t.whySub}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {t.info.map((item, i) => {
                  const icons = [
                    <Coins size={22} />,
                    <ShieldCheck size={22} />,
                    <Zap size={22} />,
                    <Gift size={22} />
                  ];

                  const tones = [
                    'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                    'bg-violet-500/10 text-violet-600 dark:text-violet-400'
                  ];

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur-xl transition-all dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[i]}`}
                        >
                          {icons[i]}
                        </div>

                        <div>
                          <h4 className="text-sm font-extrabold tracking-tight">
                            {item.t}
                          </h4>
                          <p className="mt-1.5 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                            {item.d}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
