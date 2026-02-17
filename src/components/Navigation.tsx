import { Menu, X, Sparkles, Languages, Moon, Sun } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  lang: 'si' | 'en' | 'ta';
  setLang: (lang: 'si' | 'en' | 'ta') => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

const menuContent = {
  en: [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'rates', label: 'Rates' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' },
  ],
  si: [
    { id: 'home', label: 'මුල් පිටුව' },
    { id: 'about', label: 'අප ගැන' },
    { id: 'rates', label: 'පොලී අනුපාත' },
    { id: 'loans', label: 'ණය පහසුකම්' },
    { id: 'savings', label: 'තැන්පතු' },
    { id: 'gallery', label: 'ඡායාරූප' },
    { id: 'contact', label: 'අප අමතන්න' },
  ],
  ta: [
    { id: 'home', label: 'முகப்பு' },
    { id: 'about', label: 'எங்களை பற்றி' },
    { id: 'rates', label: 'விகிதங்கள்' },
    { id: 'loans', label: 'கடன்கள்' },
    { id: 'savings', label: 'சேமிப்பு' },
    { id: 'gallery', label: 'கேலரி' },
    { id: 'contact', label: 'தொடர்பு' },
  ]
};

export default function Navigation({ 
  currentPage, 
  setCurrentPage, 
  lang, 
  setLang, 
  darkMode, 
  setDarkMode 
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const clickCount = useRef(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = menuContent[lang] || menuContent.si;

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSecretClick = () => {
    clickCount.current += 1;
    if (clickCount.current >= 5) {
      setCurrentPage('admin');
      clickCount.current = 0;
    }
    setTimeout(() => { clickCount.current = 0; }, 2000);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-8 h-20 rounded-[2rem] transition-all duration-500 ${
          scrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-xl border border-white/20 dark:border-white/5' 
          : 'bg-transparent'
        }`}>
          
          {/* --- Brand Logo --- */}
          <div className="cursor-pointer select-none group" onClick={handleSecretClick}>
            <h1 className={`text-lg font-black leading-tight tracking-tighter italic uppercase transition-colors ${
              scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-800 dark:text-slate-200'
            }`}>
              DENIPITIYA <span className="text-green-600">WEST</span>
              <span className="block text-[9px] tracking-[0.4em] font-bold not-italic text-slate-400 group-hover:text-green-500 transition-colors">
                {lang === 'si' ? 'සනස සමිතිය' : lang === 'ta' ? 'சனச சங்கம்' : 'SANASA SOCIETY'}
              </span>
            </h1>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`relative px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  currentPage === item.id 
                  ? 'text-green-600' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div 
                    layoutId="activeNav" 
                    className="absolute inset-0 bg-green-50 dark:bg-green-500/10 rounded-xl -z-10" 
                  />
                )}
              </button>
            ))}

            {/* Language & Theme Controls */}
            <div className="ml-6 flex items-center gap-2 pl-6 border-l border-slate-200 dark:border-slate-800">
              {/* Theme Toggle */}
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-all"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Lang Toggle (Cycle through Si -> En -> Ta) */}
              <button 
                onClick={() => setLang(lang === 'si' ? 'en' : lang === 'en' ? 'ta' : 'si')}
                className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-green-600 dark:hover:bg-green-500 transition-all"
              >
                <Languages size={14} />
                {lang.toUpperCase()}
              </button>
            </div>
          </div>

          {/* --- Mobile Menu Toggle --- */}
          <div className="lg:hidden flex items-center gap-3">
             <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 text-slate-900 dark:text-yellow-400"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Drawer --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-6 right-6 mt-4 lg:hidden"
          >
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`flex items-center justify-between w-full p-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                    currentPage === item.id 
                    ? 'bg-green-600 text-white shadow-lg shadow-green-200 dark:shadow-none' 
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && <Sparkles size={16} />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}