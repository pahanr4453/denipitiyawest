import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'; 
import { 
  Moon, 
  Sun, 
  ShieldCheck, 
  Landmark, 
  ArrowUpCircle, 
  Zap, 
  Shield, 
  ChevronRight, 
  Cpu, 
  Activity, 
  Lock, 
  Globe, 
  ExternalLink, 
  Layout,
  FileText,
  ShieldAlert,
  Cookie
} from 'lucide-react'; 

// --- TYPES & INTERFACES ---
interface Dictionary {
  [key: string]: {
    footer_tag: string;
    rights: string;
    brand: string;
    top: string;
    status: string;
    secure_msg: string;
  };
}

// --- PAGES & COMPONENTS ---
import Navigation from './components/Navigation';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Rates from './pages/Rates';
import Loans from './pages/Loans';
import Savings from './pages/Savings';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import Admin from './pages/Admin';

// --- DICTIONARY DATA ---
const dictionary: Dictionary = {
  en: { 
    footer_tag: "Official Community Banking Portal", 
    rights: "All Rights Reserved", 
    brand: "Denipitiya West Sanasa", 
    top: "TOP", 
    status: "System Operational",
    secure_msg: "Enterprise Grade Encryption Active"
  },
  si: { 
    footer_tag: "නිල ප්‍රජා බැංකු පද්ධතිය", 
    rights: "සියලුම හිමිකම් ඇවිරිණි", 
    brand: "දෙණිපිටිය බටහිර සණස", 
    top: "ඉහළට", 
    status: "පද්ධතිය ක්‍රියාත්මකයි",
    secure_msg: "ඉහළම මට්ටමේ දත්ත ආරක්ෂාව"
  },
  ta: { 
    footer_tag: "வங்கி போர்டல்", 
    rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை", 
    brand: "தெனிபிட்டிய வெஸ்ட் சனச", 
    top: "மேலே", 
    status: "செயல்பாட்டில் உள்ளது",
    secure_msg: "பாதுகாப்பான தரவு குறியாக்கம்"
  }
};

// --- INTERNAL LEGAL COMPONENT (Premium Content) ---
const LegalView = ({ type, darkMode }: { type: string, darkMode: boolean }) => {
  const data = {
    terms: { 
      title: "Terms & Conditions", 
      icon: <FileText size={48} />, 
      content: "These terms govern the use of Denipitiya West Sanasa's digital portal. Users are expected to maintain account security and report any unauthorized access. All services are subject to the financial regulations of the Central Bank of Sri Lanka." 
    },
    privacy: { 
      title: "Privacy Policy", 
      icon: <ShieldAlert size={48} />, 
      content: "We prioritize your data sovereignty. Personal identification and financial records are stored using AES-256 bit encryption. We do not sell or share user data with third-party marketing agencies." 
    },
    cookies: { 
      title: "Cookie Policy", 
      icon: <Cookie size={48} />, 
      content: "Our system uses 'Strictly Necessary' cookies to manage secure login sessions. No tracking or advertising cookies are utilized without explicit user consent. You can manage your preferences via your browser settings." 
    },
    fraud: { 
      title: "Anti-Fraud Policy", 
      icon: <ShieldCheck size={48} />, 
      content: "Our AI-driven security infrastructure monitors for suspicious transaction patterns. Users are advised never to share OTPs or passwords via telephone or email." 
    }
  }[type] || { title: "Documentation", icon: <Lock size={48} />, content: "Please select a valid legal document from the footer menu." };

  return (
    <div className="max-w-5xl mx-auto px-10 py-24">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative overflow-hidden p-16 rounded-[4rem] border transition-all duration-700 ${
          darkMode ? 'bg-slate-900/40 border-white/10' : 'bg-white border-slate-200 shadow-2xl shadow-slate-200/50'
        }`}
      >
        <div className="absolute top-0 right-0 p-10 opacity-10 text-green-500 transform rotate-12 scale-150">
          {data.icon}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 shadow-inner">
              {data.icon}
            </div>
            <div>
              <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none">{data.title}</h1>
              <div className="h-1 w-24 bg-green-500 mt-4 rounded-full" />
            </div>
          </div>
          <div className={`text-xl leading-relaxed opacity-70 mb-12 max-w-3xl ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            {data.content}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-40 text-sm italic font-medium">
             <p className="flex gap-3 items-center"><Shield size={14} className="text-green-500" /> Enterprise-grade data protection</p>
             <p className="flex gap-3 items-center"><Zap size={14} className="text-green-500" /> Real-time security monitoring</p>
             <p className="flex gap-3 items-center"><Globe size={14} className="text-green-500" /> Compliance with local regulations</p>
             <p className="flex gap-3 items-center"><Activity size={14} className="text-green-500" /> Continuous infrastructure auditing</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function App() {
  // --- STATES ---
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [lang, setLang] = useState<'en' | 'si' | 'ta'>('en'); 
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scrollPerc, setScrollPerc] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isButtonsVisible, setIsButtonsVisible] = useState(true);
  const [navHidden, setNavHidden] = useState(false);
  
  const { scrollY } = useScroll();

  // --- SCROLL HIDE LOGIC FOR NAV & SIDE BUTTONS ---
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Hide Navigation & Side Buttons on scroll down
    if (latest > previous && latest > 150) {
      setNavHidden(true);
      setIsButtonsVisible(false);
    } else {
      setNavHidden(false);
      setIsButtonsVisible(true);
    }
  });

  // --- ADMIN SHORTCUT LOGIC ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        navigateTo('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- EFFECTS ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollPerc(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => { 
      clearTimeout(timer); 
      window.removeEventListener('scroll', handleScroll); 
    };
  }, []);

  // --- MEMOIZED DATA ---
  const t = useMemo(() => dictionary[lang], [lang]);

  // --- HANDLERS ---
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };

  const isAdminPage = currentPage === 'admin';

  return (
    <div className={`notranslate min-h-screen transition-all duration-1000 ${
      darkMode ? 'dark bg-[#020617] text-white' : 'bg-white text-slate-900'
    }`}>
      
      <AnimatePresence mode="wait">
        {isLoading ? (
          /* --- MINIMAL PREMIUM WELCOME SCREEN --- */
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#020817] px-6 text-white"
          >
            {/* Soft ambient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ x: [0, 60, 0], y: [0, 35, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-28 -top-28 h-[360px] w-[360px] rounded-full bg-green-500/10 blur-[120px]"
              />
              <motion.div
                animate={{ x: [0, -45, 0], y: [0, -25, 0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-32 -right-24 h-[420px] w-[420px] rounded-full bg-cyan-500/8 blur-[140px]"
              />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:30px_30px]" />

              <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]" />
              <div className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-400/[0.05]" />
            </div>

            <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.86 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative mb-8"
              >
                <div className="absolute inset-0 rounded-full bg-green-400/15 blur-3xl" />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-5 rounded-full border border-dashed border-green-400/15"
                />

                <div className="relative flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white/[0.07] bg-white/[0.035] backdrop-blur-xl">
                  <img
                    src="/sf.png"
                    className="w-20 h-auto drop-shadow-[0_0_24px_rgba(34,197,94,0.25)]"
                    alt="Denipitiya West Sanasa Logo"
                  />
                </div>
              </motion.div>

              {/* Copy */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-3 text-[9px] font-bold uppercase tracking-[0.28em] text-green-400"
              >
                Welcome
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="text-3xl font-extrabold tracking-[-0.045em] text-white sm:text-4xl"
              >
                Denipitiya West
                <span className="ml-2 text-green-400">SANASA</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.22 }}
                className="mt-3 text-xs font-medium text-slate-500 sm:text-sm"
              >
                Trusted community banking
              </motion.p>

              {/* Minimal loader */}
              <div className="mt-9 w-full max-w-xs">
                <div className="h-[3px] overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.7, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-green-600 via-emerald-400 to-cyan-400"
                  />
                </div>

                <div className="mt-3 flex items-center justify-center gap-2 text-[8px] font-semibold uppercase tracking-[0.18em] text-slate-600">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  Secure session
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          /* --- MAIN CONTENT LAYOUT --- */
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full relative"
          >
            
            {!isAdminPage && (
              <>
                <div 
                  className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-600 via-emerald-400 to-green-600 z-[10000] shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                  style={{ width: `${scrollPerc}%` }}
                />
                
                {/* --- NAVIGATION WITH HIDE LOGIC --- */}
                <motion.div
                  animate={{ y: navHidden ? "-100%" : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed top-0 left-0 right-0 z-[9999]"
                >
                  <Navigation 
                    currentPage={currentPage} 
                    setCurrentPage={navigateTo} 
                    lang={lang} 
                    setLang={setLang} 
                    darkMode={darkMode} 
                    setDarkMode={setDarkMode} 
                  />
                </motion.div>
              </>
            )}

            {/* --- SIDE BUTTONS WITH HIDE LOGIC --- */}
            {!isAdminPage && (
              <motion.div 
                animate={{ x: isButtonsVisible ? 0 : 100, opacity: isButtonsVisible ? 1 : 0 }}
                transition={{ duration: 0.5, ease: "circOut" }}
                className="fixed bottom-10 right-10 z-[1000] flex flex-col gap-5"
              >
                <AnimatePresence>
                  {scrollPerc > 15 && (
                    <motion.button 
                      initial={{ scale: 0, x: 20 }} 
                      animate={{ scale: 1, x: 0 }} 
                      exit={{ scale: 0, x: 20 }} 
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                      className="w-14 h-14 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-green-500 hover:-translate-y-1 transition-all active:scale-90 shadow-green-900/40"
                    >
                      <ArrowUpCircle size={26} />
                    </motion.button>
                  )}
                </AnimatePresence>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setDarkMode(!darkMode)} 
                  className={`w-14 h-14 shadow-2xl rounded-full flex items-center justify-center border transition-all duration-500 ${
                    darkMode 
                    ? 'bg-slate-900 border-white/10 text-yellow-400 shadow-yellow-500/10' 
                    : 'bg-white border-slate-200 text-slate-600 shadow-xl shadow-slate-200'
                  }`}
                >
                  {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                </motion.button>

                <div className={`shadow-2xl rounded-[2rem] p-2 border flex flex-col gap-3 transition-all duration-500 ${
                  darkMode 
                  ? 'bg-slate-900/80 border-white/10 backdrop-blur-2xl' 
                  : 'bg-white/90 border-slate-200 backdrop-blur-2xl'
                }`}>
                  {(['en', 'si', 'ta'] as const).map(l => (
                    <button 
                      key={l} 
                      onClick={() => setLang(l)} 
                      className={`w-11 h-11 rounded-full text-[10px] font-black transition-all flex items-center justify-center ${
                        lang === l 
                        ? 'bg-green-600 text-white shadow-lg shadow-green-900/20' 
                        : 'text-slate-500 hover:text-green-500'
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <main className={isAdminPage ? "min-h-screen" : "pt-28 min-h-screen"}>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentPage + lang} 
                  initial={{ opacity: 0, y: 40 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -40 }} 
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {currentPage === 'home' && <Home onNavigate={navigateTo} lang={lang} />}
                  {currentPage === 'about' && <AboutUs lang={lang} />}
                  {currentPage === 'rates' && <Rates lang={lang} />}
                  {currentPage === 'loans' && <Loans lang={lang} />}
                  {currentPage === 'savings' && <Savings lang={lang} />}
                  {currentPage === 'gallery' && <Gallery lang={lang} />}
                  {currentPage === 'contact' && <ContactUs lang={lang} />}
                  {currentPage === 'admin' && <Admin />}
                  {/* --- NEW LEGAL PAGES --- */}
                  {['terms', 'privacy', 'cookies', 'fraud'].includes(currentPage) && (
                    <LegalView type={currentPage} darkMode={darkMode} />
                  )}
                </motion.div>
              </AnimatePresence>
            </main>

            {!isAdminPage && (
              /* --- FOOTER (UNTOUCHED PREMIUM STYLE) --- */
              <footer className={`pt-40 pb-16 relative overflow-hidden transition-all duration-1000 ${
                darkMode ? 'bg-[#01040a] text-white border-t border-white/5' : 'bg-slate-50 text-slate-900 border-t border-slate-200'
              }`}>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
                <div className="absolute -bottom-48 -right-48 w-128 h-128 bg-green-600/5 blur-[150px] rounded-full" />
                
                <div className="max-w-7xl mx-auto px-10 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-32">
                    <div className="lg:col-span-2 space-y-10">
                      <div className="flex items-center gap-6">
                        <div className="w-18 h-18 bg-gradient-to-br from-green-600 to-emerald-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-green-900/20">
                          <Landmark size={36} className="text-white" />
                        </div>
                        <div>
                          <h2 className="text-4xl font-black tracking-tighter uppercase italic leading-none">{t.brand}</h2>
                          <p className="text-[11px] tracking-[0.5em] opacity-40 font-bold mt-3 uppercase">{t.footer_tag}</p>
                        </div>
                      </div>
                      <p className="text-base opacity-50 max-w-md leading-loose">
                        Empowering rural communities through sustainable financial growth and trusted banking since 1978. Join us in building a prosperous future.
                      </p>
                      <div className="flex items-center gap-5">
                         {[Globe, Activity, Shield].map((Icon, i) => (
                           <div key={i} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500/20 transition-colors cursor-pointer group">
                             <Icon size={20} className="group-hover:text-green-500 transition-colors" />
                           </div>
                         ))}
                      </div>
                    </div>

                    <div className="space-y-10">
                      <h4 className="text-sm font-black uppercase tracking-[0.3em] text-green-500 flex items-center gap-3">
                        <Lock size={16} /> Legal & Compliance
                      </h4>
                      <ul className="space-y-5">
                        {[
                          { name: 'Terms & Conditions', id: 'terms' },
                          { name: 'Privacy Policy', id: 'privacy' },
                          { name: 'Cookie Policy', id: 'cookies' },
                          { name: 'Anti-Fraud Policy', id: 'fraud' }
                        ].map((item) => (
                          <li 
                            key={item.id} 
                            onClick={() => navigateTo(item.id)}
                            className="group flex items-center gap-4 text-xs font-bold opacity-40 hover:opacity-100 cursor-pointer transition-all duration-300"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 scale-0 group-hover:scale-100 transition-transform" />
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-10">
                      <h4 className="text-sm font-black uppercase tracking-[0.3em] text-green-500 flex items-center gap-3">
                        <Cpu size={16} /> System Infrastructure
                      </h4>
                      <div className={`p-8 rounded-[2.5rem] border ${
                        darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200 shadow-2xl'
                      }`}>
                         <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 shadow-inner">
                               <ShieldCheck size={24} />
                            </div>
                            <div>
                               <p className="text-[10px] font-black opacity-30 uppercase tracking-widest">Security</p>
                               <p className="text-xs font-bold text-emerald-500">Tier 4 Verified</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-3 text-[11px] font-black text-green-500 uppercase">
                            <div className="flex gap-1">
                               <span className="w-1 h-3 bg-green-500 rounded-full animate-pulse" />
                               <span className="w-1 h-3 bg-green-500/50 rounded-full animate-pulse delay-75" />
                               <span className="w-1 h-3 bg-green-500/20 rounded-full animate-pulse delay-150" />
                            </div>
                            {t.status}
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-16 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-12">
                    <div className="order-2 lg:order-1 text-center lg:text-left">
                      <div className="flex items-center gap-3 opacity-30 mb-2 justify-center lg:justify-start">
                         <Layout size={14} />
                         <p className="text-[10px] font-bold uppercase tracking-[0.4em] italic">V2.4.0 Deployment Package</p>
                      </div>
                      
                      <div onDoubleClick={() => navigateTo('admin')} className="cursor-pointer select-none">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 italic hover:opacity-100 transition-opacity">
                          © 2026 {t.brand}. {t.rights}
                        </p>
                      </div>
                    </div>

                    {/* --- ARCHITECTED BY SENESH PAHAN (LAYOUT SAVED) --- */}
                    <motion.div 
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{ y: -8 }}
                        className={`relative px-12 py-7 rounded-[3rem] border transition-all duration-700 order-1 lg:order-2 ${
                          darkMode 
                          ? 'bg-black border-green-500/10 shadow-[0_0_80px_rgba(0,0,0,1)]' 
                          : 'bg-slate-900 border-slate-800 text-white shadow-2xl'
                        }`}
                    >
                        <div className={`absolute inset-0 rounded-[3rem] transition-opacity duration-1000 bg-green-500/5 blur-2xl ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                        
                        <div className="relative flex items-center gap-8">
                            <div className="text-right">
                                <p className="text-[9px] font-black tracking-[0.6em] text-slate-500 uppercase mb-2">Architected by</p>
                                <p className="text-xl font-black tracking-tighter text-white uppercase flex items-center gap-1">
                                    SP <span className="text-green-500 px-2 bg-green-500/10 rounded-lg">Developers</span>
                                </p>
                            </div>
                            
                            <div className="w-[1px] h-14 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                            
                            <div className="relative flex items-center justify-center w-14 h-14">
                                <div className="absolute inset-0 border border-white/5 rounded-full" />
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-4px] border border-dashed border-green-500/40 rounded-full"
                                />
                                
                                <motion.div 
                                    animate={{ 
                                      scale: isHovered ? [1, 1.2, 1] : 1,
                                      opacity: isHovered ? [0.7, 1, 0.7] : 1
                                    }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="relative z-10"
                                >
                                    <Activity size={28} className="text-green-500 group-hover:drop-shadow-[0_0_10px_#22c55e]" />
                                </motion.div>
                                
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0"
                                >
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_15px_white]" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                  </div>
                </div>
              </footer>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

