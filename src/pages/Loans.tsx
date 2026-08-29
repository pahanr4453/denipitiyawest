import { useEffect, useState } from 'react';
import {
  Banknote,
  Loader2,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileCheck2,
  BadgeCheck,
  WalletCards
} from 'lucide-react';
import { motion } from 'framer-motion';
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
    heroTitle: 'Smart Loans',
    heroSub: 'Flexible credit solutions designed to support your goals with clarity and confidence.',
    badge: 'Trusted Credit Solutions',
    productsTitle: 'Loan Solutions',
    productsSub: 'Choose the option that fits your financial needs.',
    processTitle: 'Simple 4-Step Process',
    processSub: 'A clear path from application to funding.',
    applyBtn: 'Apply Now',
    rateLabel: 'Interest Rate',
    limitLabel: 'Maximum Limit',
    steps: [
      { t: 'Apply', d: 'Online or Branch' },
      { t: 'Verify', d: 'Quick Document Check' },
      { t: 'Approve', d: 'Fast Credit Decision' },
      { t: 'Fund', d: 'Direct Transfer' }
    ]
  },
  si: {
    heroTitle: 'ස්මාර්ට් ණය සේවා',
    heroSub: 'ඔබේ ඉලක්ක ඉටු කරගැනීමට පැහැදිලි, නම්‍යශීලී සහ විශ්වාසනීය ණය විසඳුම්.',
    badge: 'විශ්වාසනීය ණය විසඳුම්',
    productsTitle: 'අපගේ ණය පහසුකම්',
    productsSub: 'ඔබේ මූල්‍ය අවශ්‍යතාවයට ගැලපෙන පහසුකම තෝරන්න.',
    processTitle: 'සරල පියවර 4කින්',
    processSub: 'අයදුම් කිරීමේ සිට මුදල් ලබාගැනීම දක්වා පැහැදිලි ක්‍රියාවලියක්.',
    applyBtn: 'දැන්ම අයදුම් කරන්න',
    rateLabel: 'පොලී අනුපාතය',
    limitLabel: 'උපරිම සීමාව',
    steps: [
      { t: 'අයදුම් කරන්න', d: 'අන්තර්ජාලයෙන් හෝ ශාඛාවෙන්' },
      { t: 'සහතික කිරීම', d: 'ලේඛන ඉක්මනින් පරීක්ෂා කිරීම' },
      { t: 'අනුමැතිය', d: 'වේගවත් ණය තීරණය' },
      { t: 'මුදල් ලබාදීම', d: 'සෘජුවම ගිණුමට' }
    ]
  },
  ta: {
    heroTitle: 'ஸ்மார்ட் கடன்கள்',
    heroSub: 'உங்கள் இலக்குகளுக்கு ஏற்ற தெளிவான, நெகிழ்வான மற்றும் நம்பகமான கடன் தீர்வுகள்.',
    badge: 'நம்பகமான கடன் தீர்வுகள்',
    productsTitle: 'எங்கள் கடன் வசதிகள்',
    productsSub: 'உங்கள் நிதி தேவைக்கு ஏற்ற விருப்பத்தைத் தேர்ந்தெடுக்கவும்.',
    processTitle: 'எளிய 4 படிகள்',
    processSub: 'விண்ணப்பத்திலிருந்து நிதி பெறும் வரை தெளிவான நடைமுறை.',
    applyBtn: 'இப்போதே விண்ணப்பிக்கவும்',
    rateLabel: 'வட்டி விகிதம்',
    limitLabel: 'அதிகபட்ச எல்லை',
    steps: [
      { t: 'விண்ணப்பிக்க', d: 'ஆன்லைன் அல்லது கிளை மூலம்' },
      { t: 'சரிபார்ப்பு', d: 'ஆவணங்கள் விரைவாக சரிபார்ப்பு' },
      { t: 'அங்கீகாரம்', d: 'வேகமான கடன் முடிவு' },
      { t: 'நிதி வழங்கல்', d: 'நேரடியாக கணக்கிற்கு' }
    ]
  }
};

const accents = [
  {
    soft: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/20',
    glow: 'from-emerald-500/20 via-transparent to-transparent',
    button:
      'hover:bg-emerald-600 hover:border-emerald-600 dark:hover:bg-emerald-600'
  },
  {
    soft: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/20',
    glow: 'from-blue-500/20 via-transparent to-transparent',
    button:
      'hover:bg-blue-600 hover:border-blue-600 dark:hover:bg-blue-600'
  },
  {
    soft: 'bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    border: 'border-violet-500/20',
    glow: 'from-violet-500/20 via-transparent to-transparent',
    button:
      'hover:bg-violet-600 hover:border-violet-600 dark:hover:bg-violet-600'
  }
];

export default function Loans({
  lang = 'si'
}: {
  lang?: 'si' | 'en' | 'ta';
}) {
  const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const isTamil = lang === 'ta';
  const t = content[lang as keyof typeof content] || content.si;

  useEffect(() => {
    async function fetchLoans() {
      setLoading(true);

      const { data, error } = await supabase
        .from('loan_products')
        .select('*')
        .order('created_at', { ascending: true });

      if (!error) setLoanProducts(data || []);
      setLoading(false);
    }

    fetchLoans();
  }, [lang]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbfdfc] text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">

      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 70, 15, 0],
            y: [0, 40, 85, 0],
            scale: [1, 1.07, 0.96, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-24 -top-32 h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[110px] dark:bg-emerald-500/10"
        />

        <motion.div
          animate={{
            x: [0, -70, -20, 0],
            y: [0, 65, -20, 0],
            scale: [1, 0.94, 1.07, 1]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-28 top-[14%] h-[430px] w-[430px] rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/10"
        />

        <motion.div
          animate={{
            x: [0, 50, -35, 0],
            y: [0, -35, 30, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-160px] left-[30%] h-[470px] w-[470px] rounded-full bg-violet-500/10 blur-[140px] dark:bg-violet-500/10"
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
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200/80 bg-white/75 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 shadow-sm backdrop-blur-xl dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
            >
              <ShieldCheck size={14} />
              {t.badge}
            </motion.div>

            <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 }}
                  className={`${isTamil ? 'text-4xl md:text-5xl' : 'text-5xl sm:text-6xl md:text-7xl'} max-w-4xl font-extrabold leading-[0.98] tracking-[-0.05em] text-slate-950 dark:text-white`}
                >
                  {t.heroTitle}
                  <span className="text-emerald-600">.</span>
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

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.14 }}
                className="grid grid-cols-2 gap-3 sm:max-w-md lg:ml-auto"
              >
                <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <Zap size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold">Fast</p>
                      <p className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        Credit Review
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <ShieldCheck size={19} />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold">Trusted</p>
                      <p className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        Secure Process
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 text-center md:mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                Sanasa Credit
              </p>

              <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} mt-3 font-extrabold tracking-[-0.04em]`}>
                {t.productsTitle}
              </h2>

              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                {t.productsSub}
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-5 py-28">
                <Loader2
                  className="animate-spin text-emerald-600"
                  size={38}
                  strokeWidth={1.6}
                />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Syncing database
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {loanProducts.map((loan, idx) => {
                  const accent = accents[idx % accents.length];

                  return (
                    <motion.div
                      key={loan.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ y: -6 }}
                      className="group relative flex min-h-[445px] flex-col overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/78 p-6 shadow-[0_18px_55px_-30px_rgba(15,23,42,0.25)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_28px_90px_-40px_rgba(16,185,129,0.35)] dark:border-white/10 dark:bg-white/[0.04] md:p-7"
                    >
                      <div
                        className={`absolute inset-x-0 top-0 h-20 bg-gradient-to-b ${accent.glow} opacity-70`}
                      />

                      <div className="relative z-10 flex items-start justify-between gap-4">
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-[1.35rem] ${accent.soft} ${accent.text}`}
                        >
                          <Banknote size={30} strokeWidth={1.7} />
                        </div>

                        <div
                          className={`rounded-2xl border ${accent.border} bg-white/85 px-4 py-3 text-right shadow-sm backdrop-blur-xl dark:bg-slate-950/70`}
                        >
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            APR
                          </p>
                          <p className={`mt-1 text-xl font-extrabold ${accent.text}`}>
                            {loan.interest_rate}
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 mt-7">
                        <h3 className={`${isTamil ? 'text-xl' : 'text-2xl'} font-extrabold leading-tight tracking-[-0.03em] text-slate-950 dark:text-white`}>
                          {loan.title}
                        </h3>

                        <p className="mt-3 min-h-[66px] text-sm font-medium leading-6 text-slate-600 dark:text-slate-400">
                          {loan.description}
                        </p>
                      </div>

                      <div className="relative z-10 mt-6 space-y-4 border-t border-slate-200/80 pt-6 dark:border-white/10">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            {t.rateLabel}
                          </span>
                          <span className={`text-base font-extrabold ${accent.text}`}>
                            {loan.interest_rate}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                            {t.limitLabel}
                          </span>
                          <span className="text-right text-base font-extrabold text-slate-900 dark:text-white">
                            {loan.max_amount}
                          </span>
                        </div>
                      </div>

                      <div className="relative z-10 mt-auto pt-7">
                        <button
                          className={`flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-900 transition-all duration-300 hover:text-white dark:border-white/10 dark:bg-white/[0.035] dark:text-white ${accent.button}`}
                        >
                          {t.applyBtn}
                          <ArrowRight size={17} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* PROCESS */}
        <section className="px-5 pb-32 md:px-8 md:pb-40">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#07111f] px-6 py-10 shadow-2xl md:rounded-[2.5rem] md:px-10 md:py-14 dark:border-white/10 dark:bg-[#020914]">

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-[90px]" />
                <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
              </div>

              <div className="relative z-10 mx-auto mb-10 max-w-2xl text-center md:mb-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-400">
                  Loan Journey
                </p>

                <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} mt-3 font-extrabold tracking-[-0.04em] text-white`}>
                  {t.processTitle}
                </h2>

                <p className="mt-3 text-sm font-medium text-slate-400">
                  {t.processSub}
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {t.steps.map((step, i) => {
                  const icons = [
                    <FileCheck2 size={21} />,
                    <ShieldCheck size={21} />,
                    <BadgeCheck size={21} />,
                    <WalletCards size={21} />
                  ];

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -5 }}
                      className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition-all hover:bg-white/[0.06]"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 ring-1 ring-inset ring-emerald-400/10">
                          {icons[i]}
                        </div>

                        <span className="text-3xl font-extrabold tracking-[-0.05em] text-white/10">
                          0{i + 1}
                        </span>
                      </div>

                      <h3 className={`${isTamil ? 'text-base' : 'text-lg'} font-extrabold tracking-tight text-white`}>
                        {step.t}
                      </h3>

                      <p className="mt-2 text-xs font-medium leading-5 text-slate-400">
                        {step.d}
                      </p>

                      {i < 3 && (
                        <div className="absolute -right-2 top-1/2 hidden h-px w-4 bg-white/15 xl:block" />
                      )}
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
