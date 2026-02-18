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
    <div className="min-h-screen bg-white dark:bg-[#020617] transition-all duration-1000">
      
      {/* --- HERO HEADER --- */}
      <header className="pt-32 pb-20 px-6 max-w-[1800px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 text-green-600 mb-8 font-black uppercase text-[10px] tracking-[0.4em] border-l-2 border-green-600 pl-4"
        >
          {t.archive}
        </motion.div>
        
        <h2 className={`${isTamil ? 'text-6xl md:text-8xl' : 'text-7xl md:text-9xl'} font-black text-slate-900 dark:text-white italic uppercase tracking-tighter leading-[0.8] mb-12`}>
          PHOTO <br /> <span className="text-green-600">{t.museum}</span>
        </h2>
      </header>

      <main className="max-w-[1800px] mx-auto px-6 pb-40">
        {Object.keys(groupedPhotos).length === 0 ? (
          <div className="py-40 text-center bg-slate-50 dark:bg-white/[0.02] rounded-[4rem] border border-dashed border-slate-200 dark:border-white/10">
            <ImageIcon className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-6" strokeWidth={1} />
            <h3 className="text-slate-400 font-black uppercase text-xs tracking-[0.3em]">{t.empty}</h3>
          </div>
        ) : (
          <div className="space-y-40">
            {Object.entries(groupedPhotos).map(([category, items], albumIdx) => (
              <section key={category} className="relative">
                {/* Album Title Block */}
                <div className="flex flex-col md:flex-row md:items-end gap-6 mb-12">
                  <div className="flex items-baseline gap-4">
                    <span className="text-7xl font-black text-slate-100 dark:text-white/5 italic leading-none">0{albumIdx + 1}</span>
                    <h3 className={`${isTamil ? 'text-3xl' : 'text-4xl'} font-black text-slate-900 dark:text-white uppercase italic tracking-tighter`}>{category}</h3>
                  </div>
                  <div className="flex-1 h-[1px] bg-slate-200 dark:bg-white/10 mb-4 hidden md:block" />
                  <div className="flex items-center gap-3 bg-slate-900 dark:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl self-start">
                    <Sparkles size={14} className="text-green-400 dark:text-white" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{items.length} {t.exhibits}</span>
                  </div>
                </div>

                {/* Horizontal Cinematic Slider */}
                <div className="relative group/slider">
                  <div className="flex overflow-x-auto gap-10 pb-12 scrollbar-hide snap-x px-2">
                    {items.map((photo, index) => (
                      <motion.div 
                        key={photo.id}
                        whileHover={{ y: -10 }}
                        className="group relative min-w-[320px] md:min-w-[650px] aspect-[16/10] bg-slate-100 dark:bg-white/5 rounded-[3rem] overflow-hidden cursor-pointer snap-start border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl transition-all duration-700"
                        onClick={() => setSelectedImage({ cat: category, index })}
                      >
                        <img 
                          src={photo.image_url} 
                          alt={photo.title}
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale-[40%] group-hover:grayscale-0"
                          loading="lazy"
                        />
                        
                        {/* Overlay Information */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                            <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                              <p className="text-green-500 font-black text-[9px] uppercase tracking-[0.4em] mb-3">{t.viewBtn}</p>
                              <h4 className={`${isTamil ? 'text-3xl' : 'text-4xl'} text-white font-black uppercase italic tracking-tighter leading-tight mb-4`}>{photo.title}</h4>
                              <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest">
                                <Calendar size={14} className="text-green-500" /> 
                                {new Date(photo.created_at).toLocaleDateString(lang === 'si' ? 'si-LK' : lang === 'ta' ? 'ta-LK' : 'en-GB')}
                              </div>
                            </div>
                        </div>

                        {/* Centered Icon on Hover */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 border border-white/20">
                            <Maximize2 className="text-white" size={28} strokeWidth={1.5} />
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
                className="relative group"
              >
                <img 
                  src={groupedPhotos[selectedImage.cat][selectedImage.index].image_url} 
                  className="max-h-[75vh] w-full object-contain rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10" 
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="mt-12 text-center"
              >
                <span className="text-green-600 font-black text-xs tracking-[0.6em] uppercase mb-4 block">
                  {selectedImage.cat} — {selectedImage.index + 1}/{groupedPhotos[selectedImage.cat].length}
                </span>
                <h4 className={`${isTamil ? 'text-3xl md:text-5xl' : 'text-4xl md:text-6xl'} text-slate-900 dark:text-white font-black italic uppercase tracking-tighter leading-tight`}>
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
  );
}