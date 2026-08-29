import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Loader2, ChevronLeft, ChevronRight, X, 
  Image as ImageIcon, Maximize2, Calendar, 
  Layers, Sparkles, MoveRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Photo {
  id: number;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
}

const content = {
  en: {
    museum: "GALLERY",
    archive: "Visual Archive",
    exhibits: "Exhibits",
    viewBtn: "View Artwork",
    drag: "Slide to explore",
    empty: "The vault is currently empty",
    loading: "Curation in progress..."
  },
  si: {
    museum: "කලාගාරය",
    archive: "දෘශ්‍ය එකතුව",
    exhibits: "ඡායාරූප",
    viewBtn: "නරඹන්න",
    drag: "තවත් බැලීමට",
    empty: "ඡායාරූප කිසිවක් හමු නොවීය",
    loading: "ඡායාරූප පූරණය වෙමින් පවතී..."
  },
  ta: {
    museum: "புகைப்படக்கூடம்",
    archive: "காட்சி காப்பகம்",
    exhibits: "புகைப்படங்கள்",
    viewBtn: "பார்க்க",
    drag: "பார்க்க நகர்த்தவும்",
    empty: "புகைப்படங்கள் எதுவும் இல்லை",
    loading: "புகைப்படங்கள் பதிவேற்றப்படுகின்றன..."
  }
};

export default function Gallery({ lang = 'si' }: { lang?: 'si' | 'en' | 'ta' }) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [groupedPhotos, setGroupedPhotos] = useState<Record<string, Photo[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<{cat: string, index: number} | null>(null);

  const isTamil = lang === 'ta';
  const t = content[lang as keyof typeof content] || content.si;

  useEffect(() => { fetchPhotos(); }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      
      const allPhotos = data || [];
      setPhotos(allPhotos);

      const grouped = allPhotos.reduce((acc: any, photo) => {
        if (!acc[photo.category]) acc[photo.category] = [];
        acc[photo.category].push(photo);
        return acc;
      }, {});
      setGroupedPhotos(grouped);
    } catch (error: any) { console.error('Error:', error.message); } 
    finally { setLoading(false); }
  };

  const navigate = (dir: number) => {
    if (!selectedImage) return;
    const items = groupedPhotos[selectedImage.cat];
    setSelectedImage({ 
      cat: selectedImage.cat, 
      index: (selectedImage.index + dir + items.length) % items.length 
    });
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#020617]">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-green-600 animate-spin" strokeWidth={1} />
        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
      </div>
      <p className="mt-8 text-slate-400 dark:text-slate-600 font-black uppercase text-[10px] tracking-[0.5em]">{t.loading}</p>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-[#020617] transition-all duration-1000">

      {/* --- AMBIENT BACKGROUND ANIMATION --- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 80, 10, 0], y: [0, 30, 90, 0], scale: [1, 1.08, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 h-[320px] w-[320px] rounded-full bg-green-500/10 blur-[90px] dark:bg-green-500/10"
        />
        <motion.div
          animate={{ x: [0, -70, -20, 0], y: [0, 60, -10, 0], scale: [1, 0.92, 1.08, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[28%] -right-28 h-[380px] w-[380px] rounded-full bg-cyan-500/10 blur-[110px] dark:bg-cyan-400/10"
        />
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.96, 1] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-120px] left-[30%] h-[420px] w-[420px] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/10"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.025)_1px,transparent_1px)] [background-size:26px_26px] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.035)_1px,transparent_1px)]" />
      </div>

      <div className="relative z-10">
      {/* --- HERO HEADER --- */}
      <header className="pt-28 md:pt-32 pb-14 md:pb-16 px-5 md:px-8 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 text-green-600 mb-5 font-bold uppercase text-[10px] tracking-[0.28em] border-l-2 border-green-600 pl-3.5"
        >
          {t.archive}
        </motion.div>
        
        <div className="max-w-4xl">
          <h2 className={`${isTamil ? 'text-4xl md:text-5xl' : 'text-4xl sm:text-5xl md:text-6xl'} font-extrabold text-slate-900 dark:text-white tracking-[-0.04em] leading-none mb-5`}>
            <span className="text-green-600">{t.museum}</span>
          </h2>
          <p className="max-w-2xl text-sm md:text-base leading-7 text-slate-500 dark:text-slate-400 font-medium">
            {lang === 'si'
              ? 'අපගේ විශේෂ අවස්ථා, වැඩසටහන් සහ මතකයන් එක තැනකින් නරඹන්න.'
              : lang === 'ta'
              ? 'எங்கள் சிறப்பு தருணங்கள், நிகழ்வுகள் மற்றும் நினைவுகளை ஒரே இடத்தில் பாருங்கள்.'
              : 'Explore our special moments, events and memories in one refined collection.'}
          </p>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-5 md:px-8 pb-32">
        {Object.keys(groupedPhotos).length === 0 ? (
          <div className="py-40 text-center bg-slate-50 dark:bg-white/[0.02] rounded-[4rem] border border-dashed border-slate-200 dark:border-white/10">
            <ImageIcon className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-6" strokeWidth={1} />
            <h3 className="text-slate-400 font-black uppercase text-xs tracking-[0.3em]">{t.empty}</h3>
          </div>
        ) : (
          <div className="space-y-24 md:space-y-28">
            {Object.entries(groupedPhotos).map(([category, items], albumIdx) => (
              <section key={category} className="relative">
                {/* Album Title Block */}
                <div className="flex flex-col md:flex-row md:items-end gap-5 mb-8 md:mb-10">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl md:text-6xl font-extrabold text-slate-100 dark:text-white/5 leading-none">0{albumIdx + 1}</span>
                    <h3 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-2xl md:text-3xl'} font-extrabold text-slate-900 dark:text-white tracking-tight`}>{category}</h3>
                  </div>
                  <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 mb-4 hidden md:block" />
                  <div className="flex items-center gap-2.5 bg-slate-900 dark:bg-green-600 text-white px-4 py-2.5 rounded-xl shadow-lg self-start">
                    <Sparkles size={14} className="text-green-400 dark:text-white" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em]">{items.length} {t.exhibits}</span>
                  </div>
                </div>

                {/* Horizontal Cinematic Slider */}
                <div className="relative group/slider">
                  <div className="flex overflow-x-auto gap-4 md:gap-5 pb-9 scrollbar-hide snap-x px-1">
                    {items.map((photo, index) => (
                      <motion.div 
                        key={photo.id}
                        whileHover={{ y: -10 }}
                        className="group relative min-w-[240px] sm:min-w-[300px] md:min-w-[420px] lg:min-w-[460px] aspect-[4/3] bg-slate-100 dark:bg-white/5 rounded-[1.6rem] overflow-hidden cursor-pointer snap-start border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-700"
                        onClick={() => setSelectedImage({ cat: category, index })}
                      >
                        <img 
                          src={photo.image_url} 
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105 grayscale-[18%] group-hover:grayscale-0"
                          loading="lazy"
                        />
                        
                        {/* Overlay Information */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/10 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                            <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                              <p className="text-green-400 font-bold text-[9px] uppercase tracking-[0.28em] mb-2">{t.viewBtn}</p>
                              <h4 className={`${isTamil ? 'text-xl md:text-2xl' : 'text-xl md:text-2xl'} text-white font-extrabold tracking-tight leading-tight mb-3`}>{photo.title}</h4>
                              <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                <Calendar size={14} className="text-green-500" /> 
                                {new Date(photo.created_at).toLocaleDateString(lang === 'si' ? 'si-LK' : lang === 'ta' ? 'ta-LK' : 'en-GB')}
                              </div>
                            </div>
                        </div>

                        {/* Centered Icon on Hover */}
                        <div className="absolute top-5 right-5 w-11 h-11 bg-black/25 backdrop-blur-xl rounded-full hidden md:flex items-center justify-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 border border-white/15">
                            <Maximize2 className="text-white" size={18} strokeWidth={1.8} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Slider hint */}
                  <div className="absolute -bottom-4 left-2 flex items-center gap-3 text-slate-400 dark:text-slate-600 text-[10px] font-black uppercase tracking-widest opacity-0 group-hover/slider:opacity-100 transition-opacity">
                    <MoveRight size={14} /> {t.drag}
                  </div>
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* --- LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 dark:bg-slate-950/98 flex items-center justify-center p-6 backdrop-blur-3xl"
          >
            <button 
              onClick={() => setSelectedImage(null)} 
              className="absolute top-10 right-10 text-slate-900 dark:text-white/40 hover:text-green-600 dark:hover:text-white p-4 z-[110] transition-colors"
            >
              <X size={40} strokeWidth={1} />
            </button>

            <div className="absolute inset-x-4 md:inset-x-12 flex justify-between items-center z-[105] pointer-events-none">
              <button onClick={() => navigate(-1)} className="pointer-events-auto p-6 text-slate-900 dark:text-white/20 hover:text-green-600 dark:hover:text-green-500 transition-all bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group">
                <ChevronLeft size={48} strokeWidth={1} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button onClick={() => navigate(1)} className="pointer-events-auto p-6 text-slate-900 dark:text-white/20 hover:text-green-600 dark:hover:text-green-500 transition-all bg-slate-100 dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 group">
                <ChevronRight size={48} strokeWidth={1} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="max-w-7xl w-full flex flex-col items-center">
              <motion.div 
                layoutId={`img-${groupedPhotos[selectedImage.cat][selectedImage.index].id}`}
                className="relative group px-2 md:px-10"
              >
                <img 
                  src={groupedPhotos[selectedImage.cat][selectedImage.index].image_url} 
                  className="max-h-[72vh] w-full object-contain rounded-[1.75rem] shadow-[0_35px_80px_-25px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10" 
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mt-7 md:mt-9 text-center px-6"
              >
                <span className="text-green-600 font-black text-xs tracking-[0.6em] uppercase mb-4 block">
                  {selectedImage.cat} — {selectedImage.index + 1}/{groupedPhotos[selectedImage.cat].length}
                </span>
                <h4 className={`${isTamil ? 'text-2xl md:text-4xl' : 'text-2xl md:text-4xl'} text-slate-900 dark:text-white font-extrabold tracking-tight leading-tight`}>
                  {groupedPhotos[selectedImage.cat][selectedImage.index].title}
                </h4>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      </div>
    </div>
  );
}
