import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Image as ImageIcon, Percent, 
  Briefcase, Wallet, Plus, Trash2, LogOut, Loader2, 
  Users, Upload, Lock, Shield, ArrowRight, HardDrive, 
  Settings, Database, Bell, Search, Filter, ChevronRight,
  Eye, Globe, Info, Clock, CheckCircle2, Home as HomeIcon,
  Wifi, Battery, Signal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

// Pages for Simulator/Preview
import Home from './Home';
import Gallery from './Gallery';
import Rates from './Rates';
import Loans from './Loans';
import AboutUs from './AboutUs';

// කිසිම Prop එකක් ගන්නේ නැත (App.tsx එකේ Error එක අයින් වීමට)
export default function Admin() {
  // Auth & UI States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0); 
  
  // සිමියුලේටර් එකට විතරක් වෙනම භාෂාව මෙතන තියාගමු
  const [previewLang, setPreviewLang] = useState<'en' | 'si' | 'ta'>('si');
  
  // Form States
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');
  const [period, setPeriod] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((loginEmail === 'denipitiyawestsanasa11@gmail.com' && loginPw === 'mr647') || 
        (loginEmail === 'shivajayasakara@gmail.com' && loginPw === '#123Pahan')) {
      setIsLoggedIn(true);
    } else {
      alert("අනවසර ඇතුළුවීමක්!");
    }
  };

  // Generic Data Fetcher
  const fetchData = async (tab: string) => {
    if (!isLoggedIn || tab === 'simulator' || tab === 'dashboard') return;
    setLoading(true);
    
    let tableName = '';
    switch(tab) {
      case 'gallery': tableName = 'gallery'; break;
      case 'rates': tableName = 'fd_rates'; break;
      case 'loans': tableName = 'loan_products'; break;
      case 'team': tableName = 'team'; break;
      default: tableName = 'gallery';
    }
    
    const { data: result, error } = await supabase
      .from(tableName)
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) setData(result || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(activeTab); }, [activeTab, isLoggedIn]);

  // Gallery Upload Logic
  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const bucketName = 'gallery_photos'; 

    if (!files || files.length === 0) return;
    if (!category.trim()) {
      alert("කරුණාකර මුලින්ම Event Name එක ඇතුළත් කරන්න!");
      return;
    }

    setUploading(true);
    setUploadProgress(10); 

    const timer = setInterval(() => {
      setUploadProgress((prev) => (prev < 90 ? prev + 5 : prev));
    }, 200);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = `${Date.now()}_${file.name}`;
        
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filePath);

        const { error: dbError } = await supabase.from('gallery').insert([{
          title: file.name.split('.')[0],
          image_url: publicUrl,
          description: description || 'No description',
          category: category
        }]);

        if (dbError) throw dbError;
      }
      
      setUploadProgress(100);
      setTimeout(() => {
        alert("සාර්ථකව එක් විය!");
        setUploading(false);
        setUploadProgress(0);
        setCategory('');
        setDescription('');
        fetchData('gallery');
      }, 500);

    } catch (err: any) { 
      alert("Error: " + err.message);
      setUploading(false);
    } finally {
      clearInterval(timer);
      if (e.target) e.target.value = ''; 
    }
  };

  const handleAddData = async () => {
    setLoading(true);
    let tableName = activeTab === 'rates' ? 'fd_rates' : 'loan_products';
    let insertData = activeTab === 'rates' 
      ? { period, rate, min_amount: amount } 
      : { title, description, interest_rate: rate, max_amount: amount };

    const { error } = await supabase.from(tableName).insert([insertData]);
    if (!error) {
      alert("දත්ත සාර්ථකව ඇතුළත් කළා!");
      setTitle(''); setRate(''); setPeriod(''); setAmount(''); setDescription('');
      fetchData(activeTab);
    } else { alert(error.message); }
    setLoading(false);
  };

  const handleDelete = async (id: any) => {
    if (!confirm("මෙය මැකීමට අවශ්‍ය බව සහතිකද?")) return;
    let tableName = activeTab === 'gallery' ? 'gallery' : activeTab === 'rates' ? 'fd_rates' : 'loan_products';
    await supabase.from(tableName).delete().eq('id', id);
    fetchData(activeTab);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0c10] flex items-center justify-center p-6 font-sans">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-12 rounded-[3.5rem] w-full max-w-md shadow-2xl">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-8 rotate-3 shadow-xl">
            <Lock className="text-green-500" size={32} />
          </div>
          <h2 className="text-3xl font-black text-center mb-8 uppercase tracking-tighter text-slate-900">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" className="admin-input" onChange={e => setLoginEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="admin-input" onChange={e => setLoginPw(e.target.value)} required />
            <button className="w-full bg-slate-900 text-white p-6 rounded-2xl font-black hover:bg-green-600 transition-all flex items-center justify-center gap-3">
              ENTER SYSTEM <ArrowRight size={20} />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white p-6 hidden lg:flex flex-col fixed h-screen z-50">
        <div className="mb-10 px-4 text-center">
          <h2 className="text-2xl font-black text-green-500 italic tracking-tighter">SANASA</h2>
          <p className="text-slate-500 font-bold text-[9px] tracking-[0.3em] uppercase mt-1">Denipitiya West</p>
        </div>
        <nav className="space-y-1.5 flex-1">
          <SideBtn icon={<LayoutDashboard size={18}/>} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <div className="pt-6 pb-2 px-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">Management</div>
          <SideBtn icon={<ImageIcon size={18}/>} label="Gallery Sync" active={activeTab === 'gallery'} onClick={() => setActiveTab('gallery')} />
          <SideBtn icon={<Percent size={18}/>} label="FD Interest" active={activeTab === 'rates'} onClick={() => setActiveTab('rates')} />
          <SideBtn icon={<Briefcase size={18}/>} label="Loan Products" active={activeTab === 'loans'} onClick={() => setActiveTab('loans')} />
          <SideBtn icon={<Users size={18}/>} label="Our Team" active={activeTab === 'team'} onClick={() => setActiveTab('team')} />
          <div className="pt-6 pb-2 px-4 text-[9px] font-black text-slate-600 uppercase tracking-widest">Preview</div>
          <SideBtn icon={<Globe size={18}/>} label="Live Simulator" active={activeTab === 'simulator'} onClick={() => setActiveTab('simulator')} />
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-3 p-4 rounded-xl bg-red-500/10 text-red-400 font-black uppercase text-[10px] tracking-widest hover:bg-red-500 hover:text-white transition-all">
          <LogOut size={16} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 p-10">
        {activeTab === 'simulator' ? (
          <div className="flex flex-col h-[90vh] gap-6">
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-black italic uppercase text-slate-700 tracking-tighter">Cloud Simulator</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Viewing Live Production Environment</p>
              </div>
              <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
                {(['si', 'en', 'ta'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setPreviewLang(l)}
                    className={`px-5 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${
                      previewLang === l ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* iPhone Frame */}
            <div className="bg-[#0f1115] rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] flex-1 relative max-w-[450px] mx-auto border-[12px] border-[#1a1c22] overflow-hidden ring-1 ring-slate-800">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-[#1a1c22] rounded-b-[1.5rem] z-[60] flex items-center justify-center gap-3">
                  <div className="w-10 h-1 bg-[#2a2c32] rounded-full" />
                  <div className="w-2.5 h-2.5 bg-[#2a2c32] rounded-full shadow-inner" />
               </div>
               
               <div className="absolute top-3 w-full px-10 flex justify-between items-center z-50 text-white/40 font-bold text-[10px]">
                 <span>9:41</span>
                 <div className="flex gap-1.5 items-center">
                   <Signal size={10} /> <Wifi size={10} /> <Battery size={10} />
                 </div>
               </div>

               <div className="h-full overflow-y-auto bg-white scroll-smooth pt-8">
                 <Home lang={previewLang} onNavigate={() => {}} />
                 <AboutUs lang={previewLang} />
                 <Loans lang={previewLang} />
                 <Rates lang={previewLang} />
                 <Gallery lang={previewLang} />
               </div>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <header className="flex justify-between items-center mb-12">
              <h1 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800 flex items-center gap-3">
                {activeTab} <ChevronRight size={24} className="text-slate-300" /> <span className="text-green-600">Sync</span>
              </h1>
              <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Entries</p>
                  <p className="text-xl font-black text-slate-800 leading-none">{data.length}</p>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-8">
              {activeTab === 'gallery' ? (
                <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="grid md:grid-cols-2 gap-5 mb-6">
                    <input type="text" placeholder="Event Name (e.g. AGM 2024)" className="admin-input" value={category} onChange={e => setCategory(e.target.value)} />
                    <input type="text" placeholder="Short Caption" className="admin-input" value={description} onChange={e => setDescription(e.target.value)} />
                  </div>
                  <div className={`relative p-16 border-2 border-dashed rounded-[2rem] transition-all flex flex-col items-center justify-center ${uploading ? 'bg-green-50 border-green-500' : 'border-slate-100 hover:border-green-400'}`}>
                    {uploading ? (
                      <div className="text-center">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="font-black text-green-600 uppercase text-[10px] tracking-widest">Pushing to Cloud {uploadProgress}%</p>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} className="text-slate-300 mb-3" />
                        <span className="font-black text-slate-400 uppercase text-xs tracking-widest">Select Visual Assets</span>
                        <input type="file" multiple className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleGalleryUpload} />
                      </>
                    )}
                  </div>
                </section>
              ) : (activeTab === 'rates' || activeTab === 'loans') && (
                <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                  <div className="grid md:grid-cols-3 gap-5 mb-5">
                    <input type="text" placeholder={activeTab === 'rates' ? "Period (Months)" : "Title"} className="admin-input" value={activeTab === 'rates' ? period : title} onChange={e => activeTab === 'rates' ? setPeriod(e.target.value) : setTitle(e.target.value)} />
                    <input type="text" placeholder="Rate %" className="admin-input" value={rate} onChange={e => setRate(e.target.value)} />
                    <input type="text" placeholder="Amount Limit" className="admin-input" value={amount} onChange={e => setAmount(e.target.value)} />
                  </div>
                  <button onClick={handleAddData} className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black hover:bg-green-600 transition-all uppercase text-xs tracking-widest">Add New Record</button>
                </section>
              )}

              {/* Data Table */}
              <section className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="p-8 text-[9px] font-black uppercase text-slate-400 tracking-widest">Item / Category</th>
                      <th className="p-8 text-[9px] font-black uppercase text-slate-400 text-center tracking-widest">Metric</th>
                      <th className="p-8 text-right pr-12 text-[9px] font-black uppercase text-slate-400 tracking-widest">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {data.map((item) => (
                      <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="p-8">
                          <div className="flex items-center gap-5">
                            {activeTab === 'gallery' && <img src={item.image_url} className="w-16 h-16 rounded-xl object-cover shadow-md" alt="" />}
                            <div>
                              <p className="font-black text-slate-800 text-lg tracking-tighter uppercase">{item.title || item.period || item.name}</p>
                              <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{item.category || item.description || 'System Entry'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-8 text-center">
                          <span className="bg-slate-100 px-4 py-1.5 rounded-lg text-slate-500 font-black text-[9px] uppercase group-hover:bg-slate-900 group-hover:text-white transition-all">
                            {item.rate || item.interest_rate ? `${item.rate || item.interest_rate}%` : 'Asset'}
                          </span>
                        </td>
                        <td className="p-8 text-right pr-12">
                          <button onClick={() => handleDelete(item.id)} className="w-10 h-10 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all ml-auto">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          </div>
        )}
      </main>

      <style>{`
        .admin-input { padding: 1.25rem; border: 2px solid #f1f5f9; border-radius: 1.25rem; outline: none; background: #f8fafc; font-weight: 700; color: #1e293b; width: 100%; transition: all 0.2s; font-size: 0.875rem; }
        .admin-input:focus { border-color: #10b981; background: white; }
      `}</style>
    </div>
  );
}

function SideBtn({ icon, label, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 relative group ${active ? 'bg-green-600 text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'}`}>
      <span>{icon}</span>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      {active && <motion.div layoutId="activeInd" className="absolute right-3 w-1 h-1 bg-white rounded-full"></motion.div>}
    </button>
  );
}