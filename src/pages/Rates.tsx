import { useEffect, useState } from 'react';
import {
  TrendingUp,
  Loader2,
  ShieldCheck,
  ArrowUpRight,
  Info,
  CheckCircle2,
  CalendarDays,
  Coins,
  RefreshCw,
  BadgeCheck
} from 'lucide-react';
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
    heroTitle: 'Fixed Deposits',
    heroSub: 'Grow your savings with secure terms and attractive returns.',
    badge: 'Market Leading Rates',
    mainHeading: 'Fixed Deposit Rates',
    subHeading: 'Choose the term that matches your savings goal.',
    periodLabel: 'Investment Period',
    rateLabel: 'Annual Rate',
    minLabel: 'Minimum Deposit',
    perAnnum: 'per annum',
    ctaBtn: 'Invest Now',
    popular: 'Most Popular',
    whyTitle: 'Why Save With Us?',
    whySub: 'Simple, secure and rewarding fixed deposit options.',
    readyTitle: 'Ready to start?',
    readySub: 'Talk to our team and choose the right deposit plan.',
    features: [
      { t: 'High Returns', d: 'Competitive returns for your savings.' },
      { t: 'Flexible Terms', d: 'Choose from short and long-term options.' },
      { t: 'Secure', d: 'Trusted deposit protection and support.' },
      { t: 'Auto-Renewal', d: 'Easy reinvestment when your term ends.' }
    ]
  },
  si: {
    heroTitle: 'ස්ථාවර තැන්පතු',
    heroSub: 'ආරක්ෂිත කාලසීමා සහ ආකර්ශනීය ප්‍රතිලාභ සමඟ ඔබේ ඉතුරුම් වර්ධනය කරන්න.',
    badge: 'ආකර්ශනීය පොලී අනුපාත',
    mainHeading: 'ස්ථාවර තැන්පතු අනුපාත',
    subHeading: 'ඔබේ ඉතුරුම් ඉලක්කයට ගැලපෙන කාලසීමාව තෝරන්න.',
    periodLabel: 'ආයෝජන කාලය',
    rateLabel: 'වාර්ෂික පොලිය',
    minLabel: 'අවම තැන්පතුව',
    perAnnum: 'වසරකට',
    ctaBtn: 'දැන්ම ආයෝජනය කරන්න',
    popular: 'වැඩිම ජනප්‍රිය',
    whyTitle: 'අප සමඟ ඉතිරි කළ යුත්තේ ඇයි?',
    whySub: 'සරල, සුරක්ෂිත සහ වටිනා ස්ථාවර තැන්පතු විකල්ප.',
    readyTitle: 'ආරම්භ කිරීමට සූදානම්ද?',
    readySub: 'ඔබට ගැලපෙන තැන්පතු සැලැස්ම තෝරාගැනීමට අපගේ කණ්ඩායම අමතන්න.',
    features: [
      { t: 'ඉහළ ප්‍රතිලාභ', d: 'ඔබේ ඉතිරිකිරීම් සඳහා තරඟකාරී ප්‍රතිලාභ.' },
      { t: 'නම්‍යශීලී කාලසීමා', d: 'කෙටි සහ දිගු කාලීන විකල්ප තෝරන්න.' },
      { t: 'සුරක්ෂිත බව', d: 'විශ්වාසනීය තැන්පතු ආරක්ෂාව සහ සහාය.' },
      { t: 'ස්වයංක්‍රීය අලුත් කිරීම', d: 'කාලය අවසන් වූ විට පහසු නැවත ආයෝජනය.' }
    ]
  },
  ta: {
    heroTitle: 'நிலையான வைப்புகள்',
    heroSub: 'பாதுகாப்பான காலவரம்புகள் மற்றும் கவர்ச்சிகரமான வருமானத்துடன் உங்கள் சேமிப்பை வளர்த்திடுங்கள்.',
    badge: 'சிறந்த வட்டி விகிதங்கள்',
    mainHeading: 'நிலையான வைப்பு விகிதங்கள்',
    subHeading: 'உங்கள் சேமிப்பு இலக்குக்கு ஏற்ற காலத்தைத் தேர்ந்தெடுக்கவும்.',
    periodLabel: 'முதலீட்டு காலம்',
    rateLabel: 'ஆண்டு வட்டி',
    minLabel: 'குறைந்தபட்ச வைப்பு',
    perAnnum: 'ஆண்டுதோறும்',
    ctaBtn: 'இப்போதே முதலீடு செய்க',
    popular: 'மிகப் பிரபலமானது',
    whyTitle: 'ஏன் எங்களுடன் சேமிக்க வேண்டும்?',
    whySub: 'எளிமையான, பாதுகாப்பான மற்றும் பலனளிக்கும் நிலையான வைப்பு விருப்பங்கள்.',
    readyTitle: 'தொடங்க தயாரா?',
    readySub: 'உங்களுக்கு ஏற்ற வைப்பு திட்டத்தைத் தேர்ந்தெடுக்க எங்கள் குழுவை அணுகவும்.',
    features: [
      { t: 'அதிக வருமானம்', d: 'உங்கள் சேமிப்புக்கு போட்டித்திறன் வாய்ந்த வருமானம்.' },
      { t: 'நெகிழ்வான காலம்', d: 'குறுகிய மற்றும் நீண்டகால விருப்பங்கள்.' },
      { t: 'பாதுகாப்பு', d: 'நம்பகமான வைப்பு பாதுகாப்பு மற்றும் ஆதரவு.' },
      { t: 'தானியங்கி புதுப்பித்தல்', d: 'காலம் முடியும் போது எளிதான மறுமுதலீடு.' }
    ]
  }
};

const accents = [
  {
    soft: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20',
    glow: 'from-blue-500/20 via-transparent to-transparent'
  },
  {
    soft: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'from-emerald-500/20 via-transparent to-transparent'
  },
  {
    soft: 'bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/20',
    glow: 'from-violet-500/20 via-transparent to-transparent'
  },
  {
    soft: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/20',
    glow: 'from-amber-500/20 via-transparent to-transparent'
  }
];

export default function Rates({
  lang = 'si'
}: {
  lang?: 'si' | 'en' | 'ta';
}) {
  const [fdRates, setFdRates] = useState<FDRate[]>([]);
  const [loading, setLoading] = useState(true);

  const isTamil = lang === 'ta';
  const t = content[lang as keyof typeof content] || content.si;

  useEffect(() => {
    async function fetchRates() {
      setLoading(true);

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
    <div className="relative min-h-screen overflow-hidden bg-[#fbfdff] text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">
      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 70, 15, 0], y: [0, 35, 80, 0], scale: [1, 1.08, 0.96, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-28 -top-32 h-[360px] w-[360px] rounded-full bg-blue-500/10 blur-[110px] dark:bg-blue-500/10"
        />

        <motion.div
          animate={{ x: [0, -70, -20, 0], y: [0, 70, -15, 0], scale: [1, 0.94, 1.08, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-28 top-[20%] h-[430px] w-[430px] rounded-full bg-violet-500/10 blur-[130px] dark:bg-violet-500/10"
        />

        <motion.div
          animate={{ x: [0, 55, -35, 0], y: [0, -35, 30, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-150px] left-[32%] h-[460px] w-[460px] rounded-full bg-emerald-500/10 blur-[140px] dark:bg-emerald-500/10"
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

            <div className="max-w-4xl">
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className={`${isTamil ? 'text-4xl md:text-5xl' : 'text-5xl sm:text-6xl md:text-7xl'} font-extrabold leading-[0.98] tracking-[-0.05em] text-slate-950 dark:text-white`}
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

        {/* RATES */}
        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center md:mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">
                SANASA Fixed Deposits
              </p>

              <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} mt-3 font-extrabold tracking-[-0.04em]`}>
                {t.mainHeading}
              </h2>

              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                {t.subHeading}
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-5 py-28">
                <Loader2 className="animate-spin text-blue-600" size={38} strokeWidth={1.6} />
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                  Accessing live rates
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {fdRates.map((rate, idx) => {
                  const accent = accents[idx % accents.length];

                  return (
                    <motion.div
                      key={rate.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: idx * 0.07 }}
                      whileHover={{ y: -6 }}
                      className={`group relative overflow-hidden rounded-[1.8rem] border p-6 backdrop-blur-xl transition-all duration-500 md:p-7 ${
                        rate.is_popular
                          ? 'border-blue-500/30 bg-slate-950 text-white shadow-[0_28px_80px_-35px_rgba(37,99,235,0.45)] dark:bg-blue-600/15'
                          : 'border-slate-200/80 bg-white/78 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.25)] hover:shadow-[0_25px_80px_-35px_rgba(37,99,235,0.25)] dark:border-white/10 dark:bg-white/[0.04]'
                      }`}
                    >
                      <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${accent.glow} opacity-70`} />

                      {rate.is_popular && (
                        <div className="absolute right-5 top-5 rounded-full border border-blue-400/20 bg-blue-500/15 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-blue-300">
                          {t.popular}
                        </div>
                      )}

                      <div className="relative z-10">
                        <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${accent.soft} ${accent.text}`}>
                          <CalendarDays size={22} />
                        </div>

                        <p className={`text-[9px] font-bold uppercase tracking-[0.18em] ${rate.is_popular ? 'text-slate-400' : 'text-slate-400'}`}>
                          {t.periodLabel}
                        </p>

                        <h3 className={`${isTamil ? 'text-xl' : 'text-2xl'} mt-2 font-extrabold tracking-tight ${rate.is_popular ? 'text-white' : 'text-slate-950 dark:text-white'}`}>
                          {rate.period}
                        </h3>

                        <div className="my-7">
                          <div className="flex items-end gap-2">
                            <span className={`text-5xl font-extrabold tracking-[-0.055em] ${rate.is_popular ? 'text-white' : accent.text}`}>
                              {rate.rate}
                            </span>
                            <span className={`mb-1 text-sm font-bold ${rate.is_popular ? 'text-blue-300' : accent.text}`}>
                              %
                            </span>
                          </div>

                          <p className={`mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] ${rate.is_popular ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
                            {t.perAnnum}
                          </p>
                        </div>

                        <div className={`border-t pt-5 ${rate.is_popular ? 'border-white/10' : 'border-slate-200/80 dark:border-white/10'}`}>
                          <p className={`text-[9px] font-bold uppercase tracking-[0.16em] ${rate.is_popular ? 'text-slate-500' : 'text-slate-400'}`}>
                            {t.minLabel}
                          </p>

                          <p className={`mt-2 text-base font-extrabold ${rate.is_popular ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                            {rate.min_amount}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* BENEFITS */}
        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center">
              <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-extrabold tracking-[-0.04em]`}>
                {t.whyTitle}
              </h2>
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                {t.whySub}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {t.features.map((f, i) => {
                const icons = [
                  <Coins size={22} />,
                  <CalendarDays size={22} />,
                  <ShieldCheck size={22} />,
                  <RefreshCw size={22} />
                ];

                const tones = [
                  'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                  'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                  'bg-violet-500/10 text-violet-600 dark:text-violet-400',
                  'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                ];

                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="rounded-[1.5rem] border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur-xl transition-all dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tones[i]}`}>
                        {icons[i]}
                      </div>

                      <div>
                        <h4 className="text-sm font-extrabold tracking-tight">
                          {f.t}
                        </h4>
                        <p className="mt-1.5 text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">
                          {f.d}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-32 md:px-8 md:pb-40">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#07111f] p-7 shadow-2xl dark:border-white/10 dark:bg-[#020914] md:p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]" />
                <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-[100px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
              </div>

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                    <Info size={23} />
                  </div>

                  <h3 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-extrabold tracking-[-0.04em] text-white`}>
                    {t.readyTitle}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-400">
                    {t.readySub}
                  </p>
                </div>

                <button className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-950 transition-all hover:bg-blue-600 hover:text-white sm:w-auto">
                  {t.ctaBtn}
                  <ArrowUpRight size={18} />
                </button>
              </div>

              <div className="relative z-10 mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-6">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-2 text-[9px] font-semibold text-slate-400">
                  <BadgeCheck size={14} className="text-emerald-400" />
                  Trusted Savings
                </span>

                <span className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] px-3 py-2 text-[9px] font-semibold text-slate-400">
                  <CheckCircle2 size={14} className="text-blue-400" />
                  Clear Rates
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
