import { useEffect, useMemo, useState } from 'react';
import {
  TrendingUp,
  CalendarDays,
  Loader2,
  ShieldCheck,
  ArrowRight,
  Coins,
  RefreshCw,
  BadgeCheck,
  Sparkles,
  Star
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
    badge: 'Market Leading Rates 2026',
    heroTitle: 'Grow Wealth',
    heroSub: 'Secure your future with industry-leading interest rates.',
    ratesTitle: 'Fixed Deposit Rates',
    ratesSub: 'Attractive returns for your hard-earned savings.',
    periodLabel: 'Investment Period',
    rateLabel: 'Annual Rate',
    minLabel: 'Minimum Deposit',
    perAnnum: 'per annum',
    popular: 'Most Popular',
    ctaBtn: 'Invest Now',
    ctaTitle: 'Ready to grow your wealth?',
    ctaSub: 'Open a fixed deposit today and enjoy attractive returns.',
    notice: 'Rates are per annum and subject to change',
    features: [
      { t: 'High Returns', d: 'Maximum profit for your savings' },
      { t: 'Flexibility', d: 'Terms from 3 to 60 months' },
      { t: 'Secure', d: 'Trusted deposit protection' },
      { t: 'Auto-Renewal', d: 'Seamless reinvestment options' }
    ]
  },
  si: {
    badge: 'ආකර්ශනීය පොලී අනුපාත 2026',
    heroTitle: 'ධනය වර්ධනය',
    heroSub: 'ආකර්ශනීය පොලී අනුපාත සමඟ ඔබේ අනාගතය සුරක්ෂිත කරගන්න.',
    ratesTitle: 'ස්ථාවර තැන්පතු අනුපාත',
    ratesSub: 'ඔබේ ඉතුරුම් සඳහා ආකර්ශනීය ප්‍රතිලාභ.',
    periodLabel: 'ආයෝජන කාලය',
    rateLabel: 'වාර්ෂික පොලිය',
    minLabel: 'අවම තැන්පතුව',
    perAnnum: 'වසරකට',
    popular: 'වැඩිම ජනප්‍රිය',
    ctaBtn: 'දැන්ම ආයෝජනය කරන්න',
    ctaTitle: 'ඔබේ ධනය වර්ධනය කිරීමට සූදානම්ද?',
    ctaSub: 'අදම ස්ථාවර තැන්පතුවක් ආරම්භ කර ආකර්ශනීය ප්‍රතිලාභ ලබාගන්න.',
    notice: 'පොලී අනුපාත වාර්ෂික වන අතර වෙනස් විය හැක.',
    features: [
      { t: 'ඉහළ ප්‍රතිලාභ', d: 'ඔබේ ඉතුරුම් සඳහා වැඩි ප්‍රතිලාභ' },
      { t: 'නම්‍යශීලී බව', d: 'මාස 3 සිට 60 දක්වා කාලසීමා' },
      { t: 'සුරක්ෂිත බව', d: 'විශ්වාසනීය තැන්පතු ආරක්ෂාව' },
      { t: 'ස්වයංක්‍රීය අලුත් කිරීම', d: 'පහසු නැවත ආයෝජන විකල්ප' }
    ]
  },
  ta: {
    badge: 'சிறந்த வட்டி விகிதங்கள் 2026',
    heroTitle: 'செல்வத்தை வளருங்கள்',
    heroSub: 'கவர்ச்சிகரமான வட்டி விகிதங்களுடன் உங்கள் எதிர்காலத்தை பாதுகாக்கவும்.',
    ratesTitle: 'நிலையான வைப்பு விகிதங்கள்',
    ratesSub: 'உங்கள் சேமிப்பிற்கு கவர்ச்சிகரமான வருமானம்.',
    periodLabel: 'முதலீட்டு காலம்',
    rateLabel: 'ஆண்டு வட்டி',
    minLabel: 'குறைந்தபட்ச வைப்பு',
    perAnnum: 'ஆண்டுதோறும்',
    popular: 'மிகப் பிரபலமானது',
    ctaBtn: 'இப்போதே முதலீடு செய்க',
    ctaTitle: 'உங்கள் செல்வத்தை வளர்க்க தயாரா?',
    ctaSub: 'இன்றே நிலையான வைப்பை தொடங்கி கவர்ச்சிகரமான வருமானத்தைப் பெறுங்கள்.',
    notice: 'வட்டி விகிதங்கள் ஆண்டுதோறும் மற்றும் மாற்றத்திற்குட்பட்டவை.',
    features: [
      { t: 'அதிக வருமானம்', d: 'உங்கள் சேமிப்பிற்கு அதிக பலன்' },
      { t: 'நெகிழ்வுத்தன்மை', d: '3 முதல் 60 மாத காலங்கள்' },
      { t: 'பாதுகாப்பு', d: 'நம்பகமான வைப்பு பாதுகாப்பு' },
      { t: 'தானியங்கி புதுப்பித்தல்', d: 'எளிதான மறுமுதலீட்டு விருப்பங்கள்' }
    ]
  }
};

const tones = [
  {
    icon: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    rate: 'text-blue-600 dark:text-blue-400',
    ring: 'ring-blue-500/15',
    border: 'border-blue-500/20',
    button:
      'border-blue-500/40 text-blue-600 hover:bg-blue-600 hover:text-white dark:text-blue-400'
  },
  {
    icon: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    rate: 'text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-500/20',
    border: 'border-emerald-500/30',
    button:
      'border-emerald-500/40 text-emerald-600 hover:bg-emerald-600 hover:text-white dark:text-emerald-400'
  },
  {
    icon: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    rate: 'text-violet-600 dark:text-violet-400',
    ring: 'ring-violet-500/15',
    border: 'border-violet-500/20',
    button:
      'border-violet-500/40 text-violet-600 hover:bg-violet-600 hover:text-white dark:text-violet-400'
  },
  {
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    rate: 'text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-500/15',
    border: 'border-amber-500/20',
    button:
      'border-amber-500/40 text-amber-600 hover:bg-amber-500 hover:text-white dark:text-amber-400'
  }
];

export default function Rates({
  lang = 'si'
}: {
  lang?: 'si' | 'en' | 'ta';
}) {
  const [fdRates, setFdRates] = useState<FDRate[]>([]);
  const [loading, setLoading] = useState(true);

  const t = content[lang as keyof typeof content] || content.si;
  const isTamil = lang === 'ta';

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

  const featureIcons = useMemo(
    () => [
      <TrendingUp size={19} />,
      <CalendarDays size={19} />,
      <ShieldCheck size={19} />,
      <RefreshCw size={19} />
    ],
    []
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f8fbff] text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">
      {/* ===== PREMIUM ANIMATED BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 70, 15, 0], y: [0, 30, 70, 0], scale: [1, 1.07, 0.96, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 -top-28 h-[330px] w-[330px] rounded-full bg-blue-400/15 blur-[110px] dark:bg-blue-500/10"
        />

        <motion.div
          animate={{ x: [0, -60, -10, 0], y: [0, 60, -15, 0], scale: [1, 0.95, 1.08, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-24 top-[5%] h-[430px] w-[430px] rounded-full bg-violet-400/15 blur-[130px] dark:bg-violet-500/10"
        />

        <motion.div
          animate={{ x: [0, 40, -25, 0], y: [0, -25, 35, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-130px] left-[35%] h-[430px] w-[430px] rounded-full bg-emerald-400/10 blur-[130px] dark:bg-emerald-500/10"
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.04)_1px,transparent_1px)] [background-size:26px_26px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)]" />

        {/* Animated wave lines */}
        <motion.div
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[-10%] top-12 h-64 w-[75%] opacity-40 dark:opacity-55"
        >
          <div className="absolute inset-x-0 top-8 h-px rotate-[-4deg] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />
          <div className="absolute inset-x-0 top-16 h-px rotate-[2deg] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
          <div className="absolute inset-x-0 top-24 h-px rotate-[-1deg] bg-gradient-to-r from-transparent via-cyan-500/45 to-transparent" />
          <div className="absolute inset-x-0 top-32 h-px rotate-[4deg] bg-gradient-to-r from-transparent via-blue-500/35 to-transparent" />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* ===== HERO ===== */}
        <section className="px-5 pb-10 pt-28 md:px-8 md:pb-12 md:pt-32">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-700 shadow-sm backdrop-blur-xl dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300"
              >
                <TrendingUp size={14} />
                {t.badge}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className={`${isTamil ? 'text-4xl md:text-5xl' : 'text-5xl sm:text-6xl md:text-7xl'} max-w-3xl font-extrabold leading-[0.98] tracking-[-0.055em] text-slate-950 dark:text-white`}
              >
                {t.heroTitle}
                <span className="text-blue-600">.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-5 max-w-lg text-sm font-medium leading-7 text-slate-600 md:text-base dark:text-slate-400"
              >
                {t.heroSub}
              </motion.p>

              {/* Benefits under hero */}
              <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
                {t.features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.14 + i * 0.05 }}
                    className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tones[i].icon}`}>
                        {featureIcons[i]}
                      </div>

                      <div>
                        <p className="text-[11px] font-extrabold text-slate-950 dark:text-white">
                          {feature.t}
                        </p>
                        <p className="mt-1 text-[9px] font-medium leading-4 text-slate-500 dark:text-slate-400">
                          {feature.d}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decorative 3D-ish growth visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative hidden min-h-[330px] items-end justify-center lg:flex"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-[90px]" />

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative flex h-[250px] w-[330px] items-end justify-center"
              >
                <div className="absolute bottom-5 h-12 w-64 rounded-[45%] border border-blue-300/40 bg-white/30 shadow-[0_30px_70px_rgba(59,130,246,0.22)] backdrop-blur-2xl dark:border-blue-400/20 dark:bg-blue-500/5" />

                {[95, 140, 195].map((h, i) => (
                  <div
                    key={i}
                    className="relative mx-2 w-16 rounded-t-xl border border-white/50 bg-gradient-to-b from-white/70 to-blue-400/10 shadow-xl backdrop-blur-2xl dark:border-white/15 dark:from-white/10 dark:to-blue-500/10"
                    style={{ height: h }}
                  >
                    <div className="absolute inset-x-2 top-2 h-px bg-white/80 dark:bg-white/20" />
                    <div className="absolute inset-y-2 left-2 w-px bg-white/70 dark:bg-white/15" />
                  </div>
                ))}

                <div className="absolute bottom-24 right-12 h-28 w-[3px] rotate-[38deg] rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,.8)]" />
                <div className="absolute right-[43px] top-[33px] h-7 w-7 rotate-45 border-r-4 border-t-4 border-emerald-400" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== RATES SECTION ===== */}
        <section className="px-5 pb-10 md:px-8 md:pb-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-extrabold tracking-[-0.04em] text-slate-950 dark:text-white`}>
                  {t.ratesTitle}
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {t.ratesSub}
                </p>
              </div>

              <div className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200/80 bg-white/75 px-4 py-3 text-[10px] font-semibold text-slate-500 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.035] dark:text-slate-400 md:self-auto">
                <ShieldCheck size={15} className="text-blue-600 dark:text-blue-400" />
                {t.notice}
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 py-24">
                <Loader2 className="animate-spin text-blue-600" size={36} strokeWidth={1.7} />
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Accessing live rates
                </p>
              </div>
            ) : (
              <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {fdRates.map((rate, idx) => {
                  const tone = tones[idx % tones.length];

                  return (
                    <motion.div
                      key={rate.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ y: -6 }}
                      className="group relative pt-4"
                    >
                      {rate.is_popular && (
                        <div className="absolute left-1/2 top-0 z-30 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-400/30 bg-emerald-600 px-4 py-2 text-[9px] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_-10px_rgba(5,150,105,0.8)]">
                          <Star size={12} fill="currentColor" />
                          <span>{t.popular}</span>
                        </div>
                      )}

                      <div className={`relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_18px_55px_-28px_rgba(15,23,42,0.32)] backdrop-blur-xl transition-all duration-400 md:p-7 ${
                        rate.is_popular
                          ? 'border-emerald-500/40 bg-emerald-50/85 ring-2 ring-emerald-500/15 dark:bg-emerald-500/[0.075]'
                          : `border-slate-200/80 bg-white/82 ring-1 ${tone.ring} dark:border-white/10 dark:bg-white/[0.04]`
                      }`}>
                        <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            {t.periodLabel}
                          </p>
                          <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.045em] text-slate-950 dark:text-white">
                            {rate.period}
                          </h3>
                        </div>

                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}>
                          <CalendarDays size={19} />
                        </div>
                      </div>

                      <div className="my-6 border-y border-slate-200/70 py-5 dark:border-white/10">
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                          {t.rateLabel}
                        </p>

                        <div className="mt-2 flex items-end gap-1">
                          <span className={`text-4xl font-extrabold tracking-[-0.05em] ${rate.is_popular ? 'text-emerald-600 dark:text-emerald-400' : tone.rate}`}>
                            {rate.rate}
                          </span>
                          <span className={`mb-1 text-sm font-bold ${rate.is_popular ? 'text-emerald-600 dark:text-emerald-400' : tone.rate}`}>
                            %
                          </span>
                        </div>

                        <p className="mt-1 text-[9px] font-semibold text-slate-500 dark:text-slate-400">
                          {t.perAnnum}
                        </p>
                      </div>

                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                          {t.minLabel}
                        </p>
                        <p className="mt-2 text-base font-extrabold text-slate-950 dark:text-white">
                          {rate.min_amount}
                        </p>
                      </div>

                        <div className="mt-auto pt-7">
                          <button
                            className={`flex w-full items-center justify-center gap-2 rounded-xl border bg-transparent px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.13em] transition-all duration-300 ${
                              rate.is_popular
                                ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500'
                                : tone.button
                            }`}
                          >
                            {t.ctaBtn}
                            <ArrowRight size={15} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="px-5 pb-32 pt-4 md:px-8 md:pb-40">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-blue-500/20 bg-[#061128] px-6 py-7 shadow-2xl md:px-8">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-16 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-blue-500/15 blur-[70px]" />
                <div className="absolute right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[70px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
              </div>

              <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 ring-1 ring-inset ring-blue-400/20">
                    <BadgeCheck size={25} />
                  </div>

                  <div>
                    <h3 className={`${isTamil ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'} font-extrabold tracking-[-0.035em] text-white`}>
                      {t.ctaTitle}
                    </h3>
                    <p className="mt-2 text-sm font-medium text-slate-400">
                      {t.ctaSub}
                    </p>
                  </div>
                </div>

                <button className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-950 transition-all hover:bg-blue-600 hover:text-white md:w-auto">
                  {t.ctaBtn}
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
