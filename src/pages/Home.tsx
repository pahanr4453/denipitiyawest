import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, Shield, Award, 
  ArrowRight, Landmark, CheckCircle2, ChevronRight 
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
  lang: string;
}

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
  },
  ta: {
    heroTitle: "நம்பகமான வங்கியுடன் உங்கள் எதிர்காலத்தைப் பாதுகாக்கவும்",
    heroSub: "தசாப்த கால சமூக நம்பிக்கையுடன், ஒரு வலுவான நாளைக்காக நாங்கள் உங்களுக்கு அதிகாரம் அளிக்கிறோம்.",
    btnPrimary: "உறுப்பினராகுங்கள்",
    btnSecondary: "எங்கள் கதை",
    stats: [
      { val: "1000+", lab: "செயலில் உள்ள உறுப்பினர்கள்" },
      { val: "40+", lab: "நம்பகமான சேவை" },
      { val: "ரூ. 50M+", lab: "நிர்வகிக்கப்படும் நிதி" }
    ],
    features: [
      { title: "போட்டி விகிதங்கள்", desc: "உங்கள் சேமிப்பிற்கு சந்தையில் சிறந்த வட்டி விகிதங்கள்." },
      { title: "உறுப்பினர் நலன்", desc: "நாங்கள் எப்போதும் எங்கள் உறுப்பினர்களுக்கே முன்னுரிமை அளிக்கிறோம்." },
      { title: "விரைவான கடன்கள்", desc: "உங்கள் கனவுகளுக்காக மிக விரைவான கடன் வசதிகள்." }
    ]
  }
};

export default function Home({ onNavigate, lang }: HomeProps) {
  const t = content[lang] || content.en;

  return (
    <div className="flex flex-col">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-green-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold mb-6 tracking-widest uppercase">
              <Shield size={14} /> Official Denipitiya West Sanasa
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8 dark:text-white">
              {t.heroTitle}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              {t.heroSub}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onNavigate('contact')}
                className="group px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold flex items-center gap-3 transition-all shadow-xl shadow-green-600/20 active:scale-95"
              >
                {t.btnPrimary} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
              >
                {t.btnSecondary}
              </button>
            </div>
          </motion.div>

          {/* Hero Feature Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="grid gap-6"
          >
            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-green-600 to-green-700 text-white shadow-2xl relative overflow-hidden group">
              <Landmark className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-4">Financial Stability</h3>
              <p className="text-green-50 opacity-80 mb-6">Explore our tailored savings schemes designed for every stage of your life.</p>
              <button onClick={() => onNavigate('savings')} className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                Explore Savings <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-4">
                  <TrendingUp size={24} />
                </div>
                <h4 className="font-bold mb-2 dark:text-white">Loans</h4>
                <p className="text-xs text-slate-500">Fast approval for your housing & business needs.</p>
              </div>
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center mb-4">
                  <Award size={24} />
                </div>
                <h4 className="font-bold mb-2 dark:text-white">Benefits</h4>
                <p className="text-xs text-slate-500">Exclusive welfare for our members.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {t.stats.map((s: any, i: number) => (
              <div key={i} className="text-center md:text-left border-l-2 border-green-500 pl-8">
                <h2 className="text-4xl font-black text-slate-800 dark:text-white mb-2">{s.val}</h2>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-[2px]">{s.lab}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SERVICES SECTION --- */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-black mb-4 dark:text-white">Why Choose Our Society?</h2>
              <p className="text-slate-500">We provide more than just banking. We build long-term relationships based on trust and mutual growth.</p>
            </div>
            <button onClick={() => onNavigate('rates')} className="text-green-600 font-bold flex items-center gap-2 hover:gap-4 transition-all uppercase tracking-widest text-sm">
              Check Interest Rates <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.features.map((f: any, i: number) => (
              <motion.div 
                whileHover={{ y: -10 }}
                key={i} 
                className="p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 group hover:bg-green-600 transition-colors duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-green-100 transition-colors">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}