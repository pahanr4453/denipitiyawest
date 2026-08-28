import React, {
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';

import { motion } from 'framer-motion';

import {
  TrendingUp,
  Shield,
  Award,
  ArrowRight,
  Landmark,
  CheckCircle2,
  ChevronRight,
  Calculator,
  Calendar as CalendarIcon,
  Zap,
  HeartPulse,
  Gift,
  Bus,
  PhoneCall,
  Bell,
  X
} from 'lucide-react';

import { supabase } from '../lib/supabase';

interface HomeProps {
  onNavigate: (page: string) => void;
  lang: string;
}


// ============================================
// LAST SATURDAY
// ============================================

const calculateLastSaturday = (
  year: number,
  month: number
): number => {

  const lastDayOfMonth =
    new Date(
      year,
      month + 1,
      0
    );

  const dayOfWeek =
    lastDayOfMonth.getDay();

  // Saturday = 6
  const diffToSaturday =
    (dayOfWeek + 1) % 7;

  lastDayOfMonth.setDate(
    lastDayOfMonth.getDate() -
    diffToSaturday
  );

  return lastDayOfMonth.getDate();
};


// ============================================
// CONTENT
// ============================================

const content: any = {

  en: {

    heroTitle:
      "Secure Your Future With Trusted Banking",

    heroSub:
      "Building a stronger community through decades of trusted financial excellence. Your journey to prosperity starts here.",

    btnPrimary:
      "Become a Member",

    btnSecondary:
      "Our Story",

    stabilityTitle:
      "Financial Stability",

    stabilitySub:
      "Explore our tailored savings schemes designed for you.",

    exploreSavings:
      "Explore Savings",

    loanCardTitle:
      "Loans",

    loanCardSub:
      "Fast approval for your housing dreams.",

    benefitCardTitle:
      "Benefits",

    benefitCardSub:
      "Exclusive welfare for members.",

    meetingTitle:
      "Monthly Meeting",

    meetingSub:
      "Last Saturday of every month",

    welfareTitle:
      "Member Welfare & Benefits",

    welfareSub:
      "We care for our members beyond just finances.",

    inquireBtn:
      "Inquire Now",

    stats: [
      {
        val: "1000+",
        lab: "Active Members"
      },
      {
        val: "40+",
        lab: "Years of Trust"
      },
      {
        val: "Rs. 50M+",
        lab: "Funds Managed"
      }
    ],

    features: [
      {
        title:
          "Competitive Rates",
        desc:
          "Best-in-class interest rates for your hard-earned savings."
      },
      {
        title:
          "Member Welfare",
        desc:
          "We prioritize our community over corporate profits."
      },
      {
        title:
          "Fast Loans",
        desc:
          "Quick and transparent loan processing for your dreams."
      }
    ],

    welfareList: [

      {
        icon:
          <HeartPulse />,
        title:
          "Funeral Grants",
        desc:
          "Financial assistance for family members during bereavement."
      },

      {
        icon:
          <Gift />,
        title:
          "Gift Schemes",
        desc:
          "Essential item packs and annual rewards for members."
      },

      {
        icon:
          <Bus />,
        title:
          "Annual Trips",
        desc:
          "Organized community tours and pilgrimage trips."
      }

    ]
  },


  si: {

    heroTitle:
      "විශ්වාසනීය බැංකු සේවාවෙන් ඔබේ අනාගතය දිනන්න",

    heroSub:
      "දශක ගණනාවක ප්‍රජා විශ්වාසය සමඟ, ශක්තිමත් හෙටක් වෙනුවෙන් අපි ඔබව සවිබල ගන්වන්නෙමු.",

    btnPrimary:
      "සාමාජිකත්වය ගන්න",

    btnSecondary:
      "අපේ කතාව",

    stabilityTitle:
      "මූල්‍ය ස්ථාවරත්වය",

    stabilitySub:
      "ඔබ වෙනුවෙන්ම සැකසූ අපගේ ඉතුරුම් ක්‍රමවේදයන් ගවේෂණය කරන්න.",

    exploreSavings:
      "ඉතුරුම් බලන්න",

    loanCardTitle:
      "ණය පහසුකම්",

    loanCardSub:
      "ඔබේ නිවාස සිහිනය සැබෑ කරගන්න ඉක්මන් ණය.",

    benefitCardTitle:
      "ප්‍රතිලාභ",

    benefitCardSub:
      "සාමාජිකයින් සඳහාම වෙන්වූ සුභසාධන සේවා.",

    meetingTitle:
      "සමිටි රැස්වීම",

    meetingSub:
      "සෑම මසකම අවසන් සෙනසුරාදා",

    welfareTitle:
      "සාමාජික සුභසාධන ප්‍රතිලාභ",

    welfareSub:
      "මූල්‍ය සේවාවලින් එහා ගිය සැබෑ සහෝදරත්වයක රැකවරණය.",

    inquireBtn:
      "විමසන්න",

    stats: [
      {
        val: "1000+",
        lab:
          "ක්‍රියාකාරී සාමාජිකයින්"
      },
      {
        val: "40+",
        lab:
          "විශ්වාසනීය සේවය"
      },
      {
        val: "රු. මිලියන 50+",
        lab:
          "කළමනාකරණය කළ අරමුදල්"
      }
    ],

    features: [
      {
        title:
          "පොලී අනුපාත",
        desc:
          "ඔබේ ඉතුරුම් සඳහා වෙළඳපොළේ ඉහළම පොලී අනුපාත."
      },
      {
        title:
          "සාමාජික සුභසාධනය",
        desc:
          "අප සැමවිටම මුල් තැන දෙන්නේ අපේ සාමාජිකයින්ටයි."
      },
      {
        title:
          "ක්ෂණික ණය",
        desc:
          "ඔබේ සිහින වෙනුවෙන් ඉතා ඉක්මන් ණය පහසුකම්."
      }
    ],

    welfareList: [

      {
        icon:
          <HeartPulse />,
        title:
          "මරණාධාර වරප්‍රසාද",
        desc:
          "අසීරු අවස්ථාවන්හිදී පවුලේ සාමාජිකයින්ට ලබාදෙන මූල්‍ය සහයෝගය."
      },

      {
        icon:
          <Gift />,
        title:
          "බඩු මලු සහ තෑගි",
        desc:
          "වාර්ෂික අත්‍යවශ්‍ය බඩු මලු සහ විශේෂ දිරිගැන්වීමේ තෑගි."
      },

      {
        icon:
          <Bus />,
        title:
          "වාර්ෂික චාරිකා",
        desc:
          "සාමාජිකයින් අතර එකමුතුකම වෙනුවෙන් සංවිධානය කරන විනෝද චාරිකා."
      }

    ]
  },


  ta: {

    heroTitle:
      "நம்பகமான வங்கியுடன் உங்கள் எதிர்காலத்தைப் பாதுகாக்கவும்",

    heroSub:
      "பல தசாப்த கால நம்பகமான நிதிச் சிறப்பின் மூலம் வலுவான சமூகத்தை உருவாக்குதல். உங்கள் செழுமைக்கான பயணம் இங்கே தொடங்குகிறது.",

    btnPrimary:
      "உறுப்பினராகுங்கள்",

    btnSecondary:
      "எங்கள் கதை",

    stabilityTitle:
      "நிதி நிலைத்தன்மை",

    stabilitySub:
      "உங்களுக்காக வடிவமைக்கப்பட்ட எமது சேமிப்புத் திட்டங்களை ஆராயுங்கள்.",

    exploreSavings:
      "சேமிப்புகளை ஆராயுங்கள்",

    loanCardTitle:
      "கடன்கள்",

    loanCardSub:
      "உங்கள் வீட்டு கனவுகளுக்கு விரைவான அனுமதி.",

    benefitCardTitle:
      "நன்மைகள்",

    benefitCardSub:
      "உறுப்பினர்களுக்கான பிரத்தியேக நலன்புரி சேவைகள்.",

    meetingTitle:
      "சங்கக் கூட்டம்",

    meetingSub:
      "ஒவ்வொரு மாதமும் கடைசி சனிக்கிழமை",

    welfareTitle:
      "உறுப்பினர் நலன் மற்றும் நன்மைகள்",

    welfareSub:
      "நிதிக்கு அப்பால் எங்கள் உறுப்பினர்களின் நலனில் நாங்கள் அக்கறை கொள்கிறோம்.",

    inquireBtn:
      "விசாரிக்கவும்",

    stats: [
      {
        val: "1000+",
        lab:
          "செயலில் உள்ள உறுப்பினர்கள்"
      },
      {
        val: "40+",
        lab:
          "நம்பகமான சேவை"
      },
      {
        val: "ரூ. 50M+",
        lab:
          "நிர்வகிக்கப்படும் நிதி"
      }
    ],

    features: [
      {
        title:
          "போட்டி விகிதங்கள்",
        desc:
          "உங்கள் கஷ்டப்பட்டு சம்பாதித்த சேமிப்பிற்கு சிறந்த வட்டி விகிதங்கள்."
      },
      {
        title:
          "உறுப்பினர் நலன்",
        desc:
          "கார்ப்பரேட் லாபத்தை விட எங்கள் சமூகத்திற்கே நாங்கள் முன்னுரிமை அளிக்கிறோம்."
      },
      {
        title:
          "விரைவான கடன்கள்",
        desc:
          "உங்கள் கனவுகளுக்காக விரைவான மற்றும் வெளிப்படையான கடன் செயலாக்கம்."
      }
    ],

    welfareList: [

      {
        icon:
          <HeartPulse />,
        title:
          "மரண உதவி",
        desc:
          "துயரமான காலங்களில் குடும்ப உறுப்பினர்களுக்கு வழங்கப்படும் நிதி உதவி."
      },

      {
        icon:
          <Gift />,
        title:
          "பரிசு திட்டங்கள்",
        desc:
          "உறுப்பினர்களுக்கு வருடாந்த அத்தியாவசிய பொருட்கள் மற்றும் பரிசுகள்."
      },

      {
        icon:
          <Bus />,
        title:
          "வருடாந்த சுற்றுலா",
        desc:
          "உறுப்பினர்களுக்கு இடையில் ஒற்றுமையை வளர்க்க ஏற்பாடு செய்யப்படும் சுற்றுலா."
      }

    ]
  }

};


// ============================================
// HOME
// ============================================

export default function Home({
  onNavigate,
  lang
}: HomeProps) {

  const t =
    useMemo(
      () =>
        content[lang] ||
        content.en,
      [lang]
    );

  const welfareRef =
    useRef<HTMLDivElement>(
      null
    );


  // ==========================================
  // EMI
  // ==========================================

  const [amount, setAmount] =
    useState<number>(
      1000000
    );

  const [years, setYears] =
    useState<number>(
      3
    );

  const [
    monthlyInstallment,
    setMonthlyInstallment
  ] =
    useState<number>(0);


  // ==========================================
  // NOTICE
  // ==========================================

  const [notice, setNotice] =
    useState<any | null>(
      null
    );

  const [showNotice, setShowNotice] =
    useState<boolean>(
      false
    );


  const DAILY_BASIS_RATE =
    17.2;


  // ==========================================
  // FETCH NOTICE
  // ==========================================

  useEffect(() => {

    const fetchNotice =
      async () => {

        const {
          data,
          error
        } =
          await supabase
            .from('notices')
            .select('*')
            .eq(
              'is_active',
              true
            )
            .order(
              'created_at',
              {
                ascending: false
              }
            )
            .limit(1)
            .maybeSingle();

        if (
          !error &&
          data
        ) {

          setNotice(data);

          // Show each notice only once on this browser.
          // A newly-created notice gets a new key and will appear once.
          const noticeKey =
            String(
              data.id ||
              data.created_at ||
              data.title
            );

          const lastSeenNotice =
            localStorage.getItem(
              'denipitiya-west-sanasa-last-seen-notice'
            );

          setShowNotice(
            lastSeenNotice !== noticeKey
          );

        }

      };

    fetchNotice();

  }, []);


  // ==========================================
  // SCROLL WELFARE
  // ==========================================

  const scrollToWelfare =
    () => {

      welfareRef.current?.scrollIntoView(
        {
          behavior:
            'smooth'
        }
      );

    };


  // ==========================================
  // EMI
  // ==========================================

  useEffect(() => {

    const totalDays =
      years * 365;

    const totalInterest =
      (
        amount *
        totalDays *
        DAILY_BASIS_RATE
      ) / 36500;

    const emi =
      (
        amount +
        totalInterest
      ) /
      (years * 12);

    setMonthlyInstallment(
      emi
    );

  }, [
    amount,
    years
  ]);


  // ==========================================
  // CALENDAR
  // ==========================================

  const today =
    new Date();

  const currentMonthName =
    today.toLocaleString(
      lang === 'ta'
        ? 'ta-IN'
        : lang === 'si'
        ? 'si-LK'
        : 'default',
      {
        month:
          'long'
      }
    );

  const currentYear =
    today.getFullYear();

  // LAST SATURDAY
  const meetingDate =
    useMemo(
      () =>
        calculateLastSaturday(
          currentYear,
          today.getMonth()
        ),
      [
        currentYear,
        today.getMonth()
      ]
    );


  const daysInMonth =
    new Date(
      currentYear,
      today.getMonth() + 1,
      0
    ).getDate();


  const firstDayOfMonth =
    new Date(
      currentYear,
      today.getMonth(),
      1
    ).getDay();


  const blanks =
    Array(
      firstDayOfMonth === 0
        ? 6
        : firstDayOfMonth - 1
    ).fill(null);


  const days =
    Array.from(
      {
        length:
          daysInMonth
      },
      (_, i) =>
        i + 1
    );


  // ==========================================
  // CLOSE NOTICE
  // ==========================================

  const closeNotice =
    () => {

      if (notice) {

        const noticeKey =
          String(
            notice.id ||
            notice.created_at ||
            notice.title
          );

        localStorage.setItem(
          'denipitiya-west-sanasa-last-seen-notice',
          noticeKey
        );

      }

      setShowNotice(
        false
      );

    };


  return (

    <div className="flex flex-col bg-white dark:bg-slate-950 transition-colors duration-500 overflow-x-hidden">


      {/* ======================================
          NOTICE POPUP
          ====================================== */}

      {showNotice &&
        notice && (

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-sm px-4 py-6"
            onClick={
              closeNotice
            }
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 24
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 24
              }}
              onClick={
                e =>
                  e.stopPropagation()
              }
              className="relative w-full max-w-xl overflow-hidden rounded-[2rem] bg-white dark:bg-slate-900 shadow-[0_30px_90px_rgba(0,0,0,0.35)] border border-white/70 dark:border-slate-700"
            >

              {/* TOP ACCENT */}

              <div className="h-1.5 w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />


              {/* CLOSE */}

              <button
                onClick={
                  closeNotice
                }
                aria-label="Close notice"
                className="absolute z-20 right-4 top-5 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:scale-105 hover:text-red-600 transition-all"
              >

                <X
                  size={19}
                />

              </button>


              {/* IMAGE */}

              {notice.image_url && (

                <div className="relative w-full bg-slate-100 dark:bg-slate-950">

                  <img
                    src={
                      notice.image_url
                    }
                    alt={
                      notice.title || 'Notice'
                    }
                    className="w-full max-h-[42vh] object-cover"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

                </div>

              )}


              {/* CONTENT */}

              <div className="p-6 sm:p-8">

                <div className="flex items-center gap-3 mb-5 pr-12">

                  <div className="w-10 h-10 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">

                    <Bell
                      size={19}
                    />

                  </div>

                  <div>

                    <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-green-600 dark:text-green-400">

                      {lang === 'si'
                        ? 'දැනුම්දීම'
                        : lang === 'ta'
                        ? 'அறிவிப்பு'
                        : 'Notice'}

                    </span>

                    <span className="block text-xs font-semibold text-slate-400 mt-0.5">

                      {lang === 'si'
                        ? 'නවතම තොරතුරු'
                        : lang === 'ta'
                        ? 'சமீபத்திய தகவல்'
                        : 'Latest update'}

                    </span>

                  </div>

                </div>


                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-3">

                  {
                    notice.title
                  }

                </h2>


                {notice.description && (

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-7 font-medium">

                    {
                      notice.description
                    }

                  </p>

                )}


                <div className="mt-7 flex items-center justify-end">

                  <button
                    onClick={
                      closeNotice
                    }
                    className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-black uppercase tracking-wider transition-all shadow-lg shadow-green-600/20 active:scale-[0.98]"
                  >

                    {lang === 'si'
                      ? 'හරි'
                      : lang === 'ta'
                      ? 'சரி'
                      : 'Got It'}

                  </button>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}


      {/* ======================================
          HERO
          ====================================== */}

      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">

        <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />


        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">


          <motion.div
            initial={{
              opacity: 0,
              x: -50
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            transition={{
              duration:
                0.8
            }}
          >

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-black mb-6 tracking-widest uppercase border border-green-100 dark:border-green-800">

              <Shield
                size={14}
              />

              Official Denipitiya West Sanasa

            </div>


            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1] mb-8 text-slate-900 dark:text-white uppercase italic">

              {t.heroTitle}

            </h1>


            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed font-medium">

              {t.heroSub}

            </p>


            <div className="flex flex-wrap gap-4">

              <button
                onClick={() =>
                  onNavigate(
                    'contact'
                  )
                }
                className="group px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl shadow-green-600/20 active:scale-95 uppercase tracking-wider italic"
              >

                {t.btnPrimary}

                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                />

              </button>


              <button
                onClick={() =>
                  onNavigate(
                    'about'
                  )
                }
                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95 uppercase tracking-wider italic"
              >

                {t.btnSecondary}

              </button>

            </div>

          </motion.div>


          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              duration:
                0.8
            }}
            className="grid gap-6"
          >

            <div className="p-8 rounded-[2.5rem] bg-slate-900 dark:bg-gradient-to-br dark:from-green-600 dark:to-green-700 text-white shadow-2xl relative overflow-hidden group">

              <Landmark
                className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform"
              />

              <Zap
                className="mb-4 text-yellow-400 fill-yellow-400"
                size={28}
              />

              <h3 className="text-2xl font-black mb-4 uppercase italic tracking-tight">

                {t.stabilityTitle}

              </h3>

              <p className="text-slate-300 dark:text-green-50 mb-6 font-medium">

                {t.stabilitySub}

              </p>

              <button
                onClick={() =>
                  onNavigate(
                    'savings'
                  )
                }
                className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] text-green-400 dark:text-white"
              >

                {t.exploreSavings}

                <ChevronRight
                  size={16}
                />

              </button>

            </div>


            <div className="grid sm:grid-cols-2 gap-6">

              <div
                className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl cursor-pointer group hover:border-blue-500 transition-all"
                onClick={() =>
                  onNavigate(
                    'loans'
                  )
                }
              >

                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">

                  <TrendingUp
                    size={24}
                  />

                </div>

                <h4 className="font-black mb-2 text-slate-900 dark:text-white uppercase italic">

                  {t.loanCardTitle}

                </h4>

                <p className="text-xs font-bold text-slate-500 uppercase">

                  {t.loanCardSub}

                </p>

              </div>


              <div
                className="p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl cursor-pointer group hover:border-green-500 transition-all"
                onClick={
                  scrollToWelfare
                }
              >

                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">

                  <Award
                    size={24}
                  />

                </div>

                <h4 className="font-black mb-2 text-slate-900 dark:text-white uppercase italic">

                  {
                    t.benefitCardTitle
                  }

                </h4>

                <p className="text-xs font-bold text-slate-500 uppercase">

                  {
                    t.benefitCardSub
                  }

                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </section>


      {/* ======================================
          FINANCE + CALENDAR
          ====================================== */}

      <section className="py-24 bg-slate-50 dark:bg-black transition-all relative border-y border-slate-200 dark:border-white/5">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-12 gap-10">


            {/* EMI */}

            <motion.div
              whileInView={{
                opacity: 1,
                y: 0
              }}
              initial={{
                opacity: 0,
                y: 30
              }}
              viewport={{
                once: true
              }}
              className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[3rem] p-8 lg:p-12 shadow-2xl border border-slate-200 dark:border-white/5"
            >

              <div className="flex items-center gap-5 mb-10">

                <div className="p-4 bg-green-600 rounded-2xl text-white shadow-xl shadow-green-600/30">

                  <Calculator
                    size={28}
                  />

                </div>

                <div>

                  <h3 className="text-3xl font-black uppercase italic text-slate-900 dark:text-white tracking-tighter">

                    {
                      lang === 'si'
                        ? 'දෛනික පොලී ගණනය'
                        : lang === 'ta'
                        ? 'தினசரி வட்டி மதிப்பீடு'
                        : 'Daily Interest Estimator'
                    }

                  </h3>

                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">

                    Formula: (P * D * R) / 36500

                  </p>

                </div>

              </div>


              <div className="grid md:grid-cols-2 gap-12">

                <div className="space-y-10">

                  <div className="space-y-6">

                    <div className="flex justify-between items-end">

                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">

                        {
                          lang === 'si'
                            ? 'ණය මුදල'
                            : lang === 'ta'
                            ? 'கடன் தொகை'
                            : 'Loan Amount'
                        }

                      </label>

                      <span className="text-xl font-black text-green-600">

                        Rs. {amount.toLocaleString()}

                      </span>

                    </div>

                    <input
                      type="range"
                      min="10000"
                      max="2000000"
                      step="10000"
                      value={amount}
                      onChange={e =>
                        setAmount(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-green-600"
                    />

                  </div>


                  <div className="space-y-6">

                    <div className="flex justify-between items-end">

                      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">

                        {
                          lang === 'si'
                            ? 'කාලසීමාව'
                            : lang === 'ta'
                            ? 'காலம்'
                            : 'Period'
                        }

                      </label>

                      <span className="text-xl font-black text-blue-600">

                        {years}{' '}

                        {
                          lang === 'si'
                            ? 'වසර'
                            : lang === 'ta'
                            ? 'ஆண்டுகள்'
                            : 'Years'
                        }

                      </span>

                    </div>

                    <input
                      type="range"
                      min="1"
                      max="7"
                      step="1"
                      value={years}
                      onChange={e =>
                        setYears(
                          Number(
                            e.target.value
                          )
                        )
                      }
                      className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-600"
                    />

                  </div>

                </div>


                <div className="bg-slate-900 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center border-b-[8px] border-green-600 shadow-3xl">

                  <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.3em] mb-4 italic">

                    {
                      lang === 'si'
                        ? 'මාසික වාරිකය'
                        : lang === 'ta'
                        ? 'மாதாந்திர தவணை'
                        : 'Monthly EMI'
                    }

                  </p>

                  <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">

                    Rs.{' '}

                    {
                      Math.round(
                        monthlyInstallment
                      ).toLocaleString()
                    }

                  </h2>

                </div>

              </div>

            </motion.div>


            {/* ==================================
                CALENDAR
                ================================== */}

            <motion.div
              whileInView={{
                opacity: 1,
                x: 0
              }}
              initial={{
                opacity: 0,
                x: 30
              }}
              viewport={{
                once: true
              }}
              className="lg:col-span-4 bg-slate-900 rounded-[3rem] p-8 text-white flex flex-col justify-between shadow-2xl"
            >

              <div>

                <div className="flex items-center gap-4 mb-8">

                  <CalendarIcon
                    className="text-green-500"
                    size={20}
                  />

                  <h3 className="text-xl font-black uppercase tracking-tighter italic">

                    {
                      currentMonthName
                    }{' '}

                    {
                      currentYear
                    }

                  </h3>

                </div>


                <div className="grid grid-cols-7 gap-2 text-center">

                  {(

                    lang === 'si'

                      ? [
                          'සඳු',
                          'අඟ',
                          'බදා',
                          'බ්‍රහ',
                          'සිකු',
                          'සෙන',
                          'ඉරි'
                        ]

                      : lang === 'ta'

                      ? [
                          'தி',
                          'செ',
                          'பு',
                          'வி',
                          'வெ',
                          'ச',
                          'ஞா'
                        ]

                      : [
                          'M',
                          'T',
                          'W',
                          'T',
                          'F',
                          'S',
                          'S'
                        ]

                  ).map(
                    (d, i) => (

                      <div
                        key={`${d}-${i}`}
                        className="text-[10px] font-black text-slate-600 mb-2 uppercase"
                      >

                        {d}

                      </div>

                    )
                  )}


                  {blanks.map(
                    (_, i) => (

                      <div
                        key={`b-${i}`}
                        className="aspect-square"
                      />

                    )
                  )}


                  {days.map(
                    d => (

                      <div
                        key={d}
                        className={`aspect-square flex items-center justify-center text-xs font-black rounded-xl transition-all ${
                          d === meetingDate
                            ? 'bg-red-600 text-white animate-pulse shadow-lg shadow-red-600/40'
                            : 'text-slate-400'
                        } ${
                          d === today.getDate()
                            ? 'border-2 border-green-500 text-green-500'
                            : ''
                        }`}
                      >

                        {d}

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* MEETING */}

              <div className="mt-8 bg-amber-500 p-6 rounded-[2rem] border-l-4 border-white shadow-xl group">

                <p className="text-xs font-black text-white uppercase tracking-wider mb-1 opacity-90">

                  {
                    t.meetingTitle
                  }

                </p>

                <span className="text-2xl font-black italic uppercase tracking-tighter">

                  {
                    currentMonthName
                  }{' '}

                  {
                    meetingDate
                  }

                </span>

                <p className="text-[9px] font-bold opacity-80 mt-1 uppercase tracking-widest">

                  {
                    t.meetingSub
                  }

                </p>

              </div>

            </motion.div>

          </div>

        </div>

      </section>


      {/* ======================================
          WELFARE
          ====================================== */}

      <section
        ref={welfareRef}
        className="py-32 bg-white dark:bg-slate-950 transition-colors"
      >

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-20">

            <h2 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white mb-6 uppercase italic tracking-tighter">

              {
                t.welfareTitle
              }

            </h2>

            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">

              {
                t.welfareSub
              }

            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            {
              t.welfareList.map(
                (
                  b: any,
                  i: number
                ) => (

                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      y: 30
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay:
                        i * 0.1
                    }}
                    whileHover={{
                      y: -10
                    }}
                    className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 shadow-xl flex flex-col items-center text-center group hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
                  >

                    <div className="w-24 h-24 rounded-[2rem] bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">

                      {
                        React.cloneElement(
                          b.icon,
                          {
                            size: 40
                          }
                        )
                      }

                    </div>


                    <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white uppercase italic tracking-tight">

                      {
                        b.title
                      }

                    </h3>


                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-10 font-medium">

                      {
                        b.desc
                      }

                    </p>


                    <button
                      onClick={() =>
                        onNavigate(
                          'contact'
                        )
                      }
                      className="mt-auto w-full py-4 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 text-xs font-black uppercase tracking-[0.2em] border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-3 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 hover:border-green-600 transition-all shadow-sm"
                    >

                      <PhoneCall
                        size={16}
                      />

                      {
                        t.inquireBtn
                      }

                    </button>

                  </motion.div>

                )
              )
            }

          </div>

        </div>

      </section>


      {/* ======================================
          STATS
          ====================================== */}

      <section className="py-20 bg-slate-900 transition-all">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {
              t.stats.map(
                (
                  s: any,
                  i: number
                ) => (

                  <div
                    key={i}
                    className="border-l-4 border-green-500 pl-10 py-2"
                  >

                    <h2 className="text-5xl font-black text-white mb-2 tracking-tighter italic">

                      {
                        s.val
                      }

                    </h2>

                    <p className="text-[11px] font-black text-green-500 uppercase tracking-[0.4em] italic">

                      {
                        s.lab
                      }

                    </p>

                  </div>

                )
              )
            }

          </div>

        </div>

      </section>


      {/* ======================================
          FEATURES
          ====================================== */}

      <section className="py-32 bg-white dark:bg-slate-950">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">

            <div className="max-w-xl">

              <h2 className="text-5xl lg:text-6xl font-black mb-6 text-slate-900 dark:text-white uppercase italic tracking-tighter">

                Why Choose Us?

              </h2>

              <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">

                We provide more than just banking. We build long-term relationships based on trust and mutual growth.

              </p>

            </div>


            <button
              onClick={() =>
                onNavigate(
                  'rates'
                )
              }
              className="text-green-600 font-black flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-[0.2em] text-sm italic group"
            >

              Check Rates

              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />

            </button>

          </div>


          <div className="grid md:grid-cols-3 gap-10">

            {
              t.features.map(
                (
                  f: any,
                  i: number
                ) => (

                  <motion.div
                    whileHover={{
                      y: -10
                    }}
                    key={i}
                    className="p-12 rounded-[3rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group hover:bg-green-600 transition-all duration-500 shadow-lg"
                  >

                    <div className="w-16 h-16 rounded-[1.5rem] bg-white dark:bg-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-white transition-all shadow-md">

                      <CheckCircle2
                        className="text-green-600"
                        size={32}
                      />

                    </div>


                    <h3 className="text-2xl font-black mb-5 text-slate-900 dark:text-white group-hover:text-white transition-colors uppercase italic tracking-tight">

                      {
                        f.title
                      }

                    </h3>


                    <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed group-hover:text-green-50 transition-colors font-medium">

                      {
                        f.desc
                      }

                    </p>

                  </motion.div>

                )
              )
            }

          </div>

        </div>

      </section>

    </div>
  );
}
