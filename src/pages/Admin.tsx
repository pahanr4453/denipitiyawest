import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Percent,
  Briefcase,
  Trash2,
  LogOut,
  Loader2,
  Plus,
  Users,
  ArrowRight,
  Edit3,
  PiggyBank,
  Globe,
  Upload,
  ShieldCheck,
  Star,
  Bell,
  Eye,
  EyeOff
} from 'lucide-react';

import { supabase } from '../lib/supabase';

// Pages for Simulator
import Home from './Home';
import Gallery from './Gallery';
import Rates from './Rates';
import Loans from './Loans';
import AboutUs from './AboutUs';
import Savings from './Savings';

export default function Admin() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');

  const [activeTab, setActiveTab] = useState('dashboard');

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [data, setData] = useState<any[]>([]);

  // ==========================================
  // GENERAL FORM STATES
  // ==========================================

  const [title, setTitle] = useState('');
  const [rate, setRate] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [role, setRole] = useState('');
  const [features, setFeatures] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  // ==========================================
  // NOTICE STATES
  // ==========================================

  const [noticeTitle, setNoticeTitle] =
    useState('');

  const [noticeDescription, setNoticeDescription] =
    useState('');

  const [noticeImage, setNoticeImage] =
    useState<File | null>(null);

  const [noticeImagePreview, setNoticeImagePreview] =
    useState<string>('');

  const [noticeActive, setNoticeActive] =
    useState(true);

  const [editingNoticeId, setEditingNoticeId] =
    useState<string | null>(null);

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      (
        loginEmail === 'denipitiyawestsanasa11@gmail.com' &&
        loginPw === 'mr647'
      ) ||
      (
        loginEmail === 'shivajayasakara@gmail.com' &&
        loginPw === '#123Pahan'
      )
    ) {
      setIsLoggedIn(true);
    } else {
      alert("අනවසර ඇතුළුවීමක්!");
    }
  };

  // ==========================================
  // FETCH DATA
  // ==========================================

  const fetchData = async (tab: string) => {

    if (
      !isLoggedIn ||
      ['dashboard', 'simulator'].includes(tab)
    ) {
      return;
    }

    setLoading(true);

    let tableName = '';

    if (tab === 'rates') {
      tableName = 'fd_rates';
    } else if (tab === 'loans') {
      tableName = 'loan_products';
    } else if (tab === 'team') {
      tableName = 'team';
    } else if (tab === 'savings') {
      tableName = 'savings_products';
    } else if (tab === 'gallery') {
      tableName = 'gallery';
    } else if (tab === 'notice') {
      tableName = 'notices';
    }

    let orderBy = 'created_at';

    if (tab === 'team') {
      orderBy = 'order_index';
    }

    const {
      data: result,
      error
    } = await supabase
      .from(tableName)
      .select('*')
      .order(orderBy, {
        ascending: false
      });

    if (!error) {
      setData(result || []);
    } else {
      console.error(error);
      setData([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab, isLoggedIn]);

  // ==========================================
  // GENERAL EDIT
  // ==========================================

  const handleEdit = (item: any) => {

    setEditingId(item.id);

    setTitle(
      item.name ||
      item.title ||
      item.period ||
      ''
    );

    setRate(
      item.rate ||
      item.interest ||
      item.interest_rate ||
      ''
    );

    setAmount(
      item.min_amount ||
      item.max_amount ||
      item.order_index?.toString() ||
      ''
    );

    setDescription(
      item.description || ''
    );

    setCategory(
      item.category ||
      item.type ||
      ''
    );

    setRole(
      item.position || ''
    );

    setFeatures(
      Array.isArray(item.features)
        ? item.features.join(', ')
        : ''
    );

    setIsPopular(
      item.is_popular || false
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // ==========================================
  // RESET GENERAL FORM
  // ==========================================

  const resetForm = () => {

    setTitle('');
    setRate('');
    setAmount('');
    setDescription('');
    setCategory('');
    setRole('');
    setFeatures('');
    setIsPopular(false);

    setEditingId(null);
  };

  // ==========================================
  // SAVE GENERAL DATA
  // ==========================================

  const handleSaveData = async () => {

    setLoading(true);

    let tableName = '';
    let insertData: any = {};

    if (activeTab === 'rates') {

      tableName = 'fd_rates';

      insertData = {
        period: title,
        rate,
        min_amount: amount,
        is_popular: isPopular
      };

    } else if (activeTab === 'loans') {

      tableName = 'loan_products';

      insertData = {
        title,
        description,
        interest_rate: rate,
        max_amount: amount
      };

    } else if (activeTab === 'team') {

      tableName = 'team';

      insertData = {
        name: title,
        position: role,
        type: category,
        description,
        order_index:
          parseInt(amount) || 0
      };

    } else if (activeTab === 'savings') {

      tableName = 'savings_products';

      insertData = {
        name: title,
        interest: rate,
        description,
        features: features
          .split(',')
          .map(f => f.trim())
      };
    }

    const {
      error
    } = editingId
      ? await supabase
          .from(tableName)
          .update(insertData)
          .eq('id', editingId)
      : await supabase
          .from(tableName)
          .insert([insertData]);

    if (!error) {

      alert("සාර්ථකව සුරැකින ලදී!");

      resetForm();

      fetchData(activeTab);

    } else {

      alert(
        "Error: " +
        error.message
      );
    }

    setLoading(false);
  };

  // ==========================================
  // DELETE
  // ==========================================

  const handleDelete = async (
    id: any
  ) => {

    if (
      !confirm(
        "මෙය මකා දැමීමට ඔබට සහතිකද?"
      )
    ) {
      return;
    }

    let table = '';

    if (activeTab === 'rates') {
      table = 'fd_rates';
    } else if (activeTab === 'team') {
      table = 'team';
    } else if (activeTab === 'savings') {
      table = 'savings_products';
    } else if (activeTab === 'gallery') {
      table = 'gallery';
    } else if (activeTab === 'notice') {
      table = 'notices';
    } else {
      table = 'loan_products';
    }

    const {
      error
    } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) {
      alert(error.message);
    }

    fetchData(activeTab);
  };

  // ==========================================
  // GALLERY UPLOAD
  // ==========================================

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const files = e.target.files;

    if (
      !files ||
      !category
    ) {
      return alert(
        "Category එක ඇතුළත් කර පින්තූර තෝරන්න!"
      );
    }

    setUploading(true);

    try {

      for (
        const file of Array.from(files)
      ) {

        const fileName =
          `${Date.now()}-${file.name}`;

        const {
          error: uploadError
        } = await supabase.storage
          .from('gallery_photos')
          .upload(
            `gallery/${fileName}`,
            file
          );

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: {
            publicUrl
          }
        } =
          supabase.storage
            .from('gallery_photos')
            .getPublicUrl(
              `gallery/${fileName}`
            );

        await supabase
          .from('gallery')
          .insert([
            {
              title: category,
              image_url: publicUrl,
              category
            }
          ]);
      }

      alert(
        "පින්තූර සාර්ථකව එක් කරන ලදී!"
      );

      fetchData('gallery');

    } catch (err: any) {

      alert(err.message);

    }

    setUploading(false);
  };

  // ==========================================
  // NOTICE IMAGE SELECT
  // ==========================================

  const handleNoticeImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    setNoticeImage(file);

    const preview =
      URL.createObjectURL(file);

    setNoticeImagePreview(preview);
  };

  // ==========================================
  // RESET NOTICE
  // ==========================================

  const resetNoticeForm = () => {

    setNoticeTitle('');
    setNoticeDescription('');
    setNoticeImage(null);
    setNoticeImagePreview('');
    setNoticeActive(true);
    setEditingNoticeId(null);
  };

  // ==========================================
  // EDIT NOTICE
  // ==========================================

  const handleEditNotice = (
    notice: any
  ) => {

    setEditingNoticeId(
      notice.id
    );

    setNoticeTitle(
      notice.title || ''
    );

    setNoticeDescription(
      notice.description || ''
    );

    setNoticeImage(null);

    setNoticeImagePreview(
      notice.image_url || ''
    );

    setNoticeActive(
      notice.is_active !== false
    );

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // ==========================================
  // SAVE NOTICE
  // ==========================================

  const handleSaveNotice = async () => {

    if (!noticeTitle.trim()) {
      return alert(
        "Notice title එක දාන්න."
      );
    }

    if (
      !editingNoticeId &&
      !noticeImage
    ) {
      return alert(
        "Notice image එක select කරන්න."
      );
    }

    setUploading(true);

    try {

      let imageUrl =
        noticeImagePreview;

      // --------------------------------------
      // UPLOAD NEW IMAGE
      // --------------------------------------

      if (noticeImage) {

        const fileExtension =
          noticeImage.name
            .split('.')
            .pop();

        const fileName =
          `notice-${Date.now()}.${fileExtension}`;

        const filePath =
          `notices/${fileName}`;

        const {
          error: uploadError
        } = await supabase.storage
          .from('notice_images')
          .upload(
            filePath,
            noticeImage,
            {
              upsert: false
            }
          );

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: {
            publicUrl
          }
        } =
          supabase.storage
            .from('notice_images')
            .getPublicUrl(
              filePath
            );

        imageUrl = publicUrl;
      }

      // --------------------------------------
      // UPDATE
      // --------------------------------------

      if (editingNoticeId) {

        const {
          error
        } = await supabase
          .from('notices')
          .update({
            title:
              noticeTitle.trim(),

            description:
              noticeDescription.trim(),

            image_url:
              imageUrl,

            is_active:
              noticeActive
          })
          .eq(
            'id',
            editingNoticeId
          );

        if (error) {
          throw error;
        }

        alert(
          "Notice එක update කළා!"
        );

      }

      // --------------------------------------
      // INSERT
      // --------------------------------------

      else {

        const {
          error
        } = await supabase
          .from('notices')
          .insert([
            {
              title:
                noticeTitle.trim(),

              description:
                noticeDescription.trim(),

              image_url:
                imageUrl,

              is_active:
                noticeActive
            }
          ]);

        if (error) {
          throw error;
        }

        alert(
          "Notice එක සාර්ථකව publish කළා!"
        );
      }

      resetNoticeForm();

      fetchData('notice');

    } catch (err: any) {

      alert(
        "Notice Error: " +
        err.message
      );

    }

    setUploading(false);
  };

  // ==========================================
  // TOGGLE NOTICE
  // ==========================================

  const toggleNotice = async (
    notice: any
  ) => {

    const {
      error
    } = await supabase
      .from('notices')
      .update({
        is_active:
          !notice.is_active
      })
      .eq(
        'id',
        notice.id
      );

    if (error) {

      alert(error.message);

      return;
    }

    fetchData('notice');
  };

  // ==========================================
  // LOGIN SCREEN
  // ==========================================

  if (!isLoggedIn) {

    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">

        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-green-500/10 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>

        <div className="bg-[#0f172a]/80 backdrop-blur-xl p-10 md:p-14 rounded-[3rem] w-full max-w-md shadow-2xl border border-slate-800/50 relative z-10">

          <div className="flex flex-col items-center mb-10">

            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-lg shadow-green-500/20 rotate-3 hover:rotate-0 transition-transform duration-500">

              <ShieldCheck
                className="text-white"
                size={40}
              />

            </div>

            <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">

              Admin{' '}

              <span className="text-green-500">
                Portal
              </span>

            </h2>

            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mt-2 text-center">

              Denipitiya West Sanasa

            </p>

          </div>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div className="space-y-2">

              <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-widest">

                Email Address

              </label>

              <input
                type="email"
                placeholder="admin@sanasa.com"
                className="w-full bg-[#020617] border-2 border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-green-500 transition-all font-bold"
                onChange={e =>
                  setLoginEmail(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <div className="space-y-2">

              <label className="text-[10px] font-black text-slate-500 uppercase ml-4 tracking-widest">

                Secure Password

              </label>

              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-[#020617] border-2 border-slate-800 p-5 rounded-2xl text-white outline-none focus:border-green-500 transition-all font-bold"
                onChange={e =>
                  setLoginPw(
                    e.target.value
                  )
                }
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500 text-white p-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 transition-all uppercase tracking-widest shadow-xl group mt-4"
            >

              Authorize Entry

              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />

            </button>

          </form>

        </div>

      </div>
    );
  }

  // ==========================================
  // ADMIN PANEL
  // ==========================================

  return (

    <div className="flex min-h-screen bg-[#f8fafc] text-slate-900">

      {/* =====================================
          SIDEBAR
          ===================================== */}

      <aside className="w-72 bg-slate-900 text-white p-6 hidden lg:flex flex-col fixed h-screen">

        <div className="mb-10 px-4">

          <h2 className="text-2xl font-black text-green-500 italic">
            SANASA
          </h2>

          <p className="text-slate-500 font-bold text-[9px] uppercase tracking-widest">
            Denipitiya West
          </p>

        </div>

        <nav className="space-y-1 flex-1">

          <SideBtn
            icon={
              <LayoutDashboard size={18} />
            }
            label="Dashboard"
            active={
              activeTab === 'dashboard'
            }
            onClick={() =>
              setActiveTab(
                'dashboard'
              )
            }
          />

          <SideBtn
            icon={
              <Bell size={18} />
            }
            label="Notice"
            active={
              activeTab === 'notice'
            }
            onClick={() =>
              setActiveTab(
                'notice'
              )
            }
          />

          <SideBtn
            icon={
              <ImageIcon size={18} />
            }
            label="Gallery"
            active={
              activeTab === 'gallery'
            }
            onClick={() =>
              setActiveTab(
                'gallery'
              )
            }
          />

          <SideBtn
            icon={
              <PiggyBank size={18} />
            }
            label="Savings"
            active={
              activeTab === 'savings'
            }
            onClick={() =>
              setActiveTab(
                'savings'
              )
            }
          />

          <SideBtn
            icon={
              <Percent size={18} />
            }
            label="FD Rates"
            active={
              activeTab === 'rates'
            }
            onClick={() =>
              setActiveTab(
                'rates'
              )
            }
          />

          <SideBtn
            icon={
              <Briefcase size={18} />
            }
            label="Loans"
            active={
              activeTab === 'loans'
            }
            onClick={() =>
              setActiveTab(
                'loans'
              )
            }
          />

          <SideBtn
            icon={
              <Users size={18} />
            }
            label="Team"
            active={
              activeTab === 'team'
            }
            onClick={() =>
              setActiveTab(
                'team'
              )
            }
          />

          <SideBtn
            icon={
              <Globe size={18} />
            }
            label="Simulator"
            active={
              activeTab === 'simulator'
            }
            onClick={() =>
              setActiveTab(
                'simulator'
              )
            }
          />

        </nav>

        <button
          onClick={() =>
            setIsLoggedIn(false)
          }
          className="flex items-center gap-3 p-4 text-red-400 font-bold text-[10px] uppercase hover:bg-red-500/10 rounded-xl transition-colors"
        >

          <LogOut size={16} />

          Logout System

        </button>

      </aside>

      {/* =====================================
          MAIN
          ===================================== */}

      <main className="flex-1 lg:ml-72 p-8 md:p-12">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-black uppercase italic">

            {activeTab}

            <span className="text-green-600">
              {' '}Control
            </span>

          </h1>

          {editingId && (

            <button
              onClick={resetForm}
              className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-bold text-xs uppercase"
            >

              Cancel Edit

            </button>

          )}

        </div>

        {/* ===================================
            SIMULATOR
            =================================== */}

        {activeTab === 'simulator' ? (

          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-slate-200 h-[80vh] overflow-y-auto">

            <Savings />
            <Rates />
            <Loans />
            <Gallery />

          </div>

        ) :

        /* ===================================
           NOTICE
           =================================== */

        activeTab === 'notice' ? (

          <div className="space-y-10">

            {/* NOTICE FORM */}

            <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">

              <div className="flex items-center gap-4 mb-8">

                <div className="w-14 h-14 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center">

                  <Bell size={28} />

                </div>

                <div>

                  <h2 className="text-2xl font-black uppercase italic">

                    {editingNoticeId
                      ? 'Edit Notice'
                      : 'Create Notice'}

                  </h2>

                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">

                    Home Page Popup

                  </p>

                </div>

              </div>

              {/* TITLE */}

              <input
                type="text"
                placeholder="Notice Title"
                className="admin-input mb-4"
                value={noticeTitle}
                onChange={e =>
                  setNoticeTitle(
                    e.target.value
                  )
                }
              />

              {/* DESCRIPTION */}

              <textarea
                placeholder="Notice Description..."
                className="admin-input mb-4 min-h-[120px]"
                value={noticeDescription}
                onChange={e =>
                  setNoticeDescription(
                    e.target.value
                  )
                }
              />

              {/* IMAGE */}

              <label className="block mb-6">

                <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">

                  Notice Image

                </span>

                <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 cursor-pointer hover:border-green-500 transition-all">

                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400">

                    <Upload size={30} />

                    <span className="font-black text-xs uppercase">

                      {noticeImage
                        ? noticeImage.name
                        : 'Select Notice Image'}

                    </span>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={
                        handleNoticeImageChange
                      }
                    />

                  </div>

                </div>

              </label>

              {/* PREVIEW */}

              {noticeImagePreview && (

                <div className="mb-6">

                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">

                    Preview

                  </p>

                  <div className="max-w-xl rounded-3xl overflow-hidden border border-slate-200">

                    <img
                      src={
                        noticeImagePreview
                      }
                      className="w-full max-h-[400px] object-cover"
                      alt="Notice Preview"
                    />

                  </div>

                </div>

              )}

              {/* ACTIVE */}

              <button
                type="button"
                onClick={() =>
                  setNoticeActive(
                    !noticeActive
                  )
                }
                className={`w-full mb-5 p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  noticeActive
                    ? 'bg-green-50 border-green-500 text-green-700'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >

                <div className="flex items-center gap-3">

                  {noticeActive
                    ? <Eye size={20} />
                    : <EyeOff size={20} />
                  }

                  <span className="font-black uppercase text-xs tracking-widest">

                    {noticeActive
                      ? 'Published / Visible'
                      : 'Hidden'}

                  </span>

                </div>

                <span className="text-[10px] font-black uppercase">

                  {noticeActive
                    ? 'ON'
                    : 'OFF'}

                </span>

              </button>

              {/* SAVE */}

              <button
                onClick={
                  handleSaveNotice
                }
                disabled={uploading}
                className="w-full p-5 rounded-2xl bg-slate-900 hover:bg-green-600 text-white font-black uppercase flex items-center justify-center gap-3 transition-all disabled:opacity-50"
              >

                {uploading
                  ? (
                    <Loader2
                      className="animate-spin"
                    />
                  )
                  : editingNoticeId
                  ? (
                    <Edit3 size={20} />
                  )
                  : (
                    <Plus size={20} />
                  )
                }

                {editingNoticeId
                  ? 'Update Notice'
                  : 'Publish Notice'}

              </button>

              {editingNoticeId && (

                <button
                  onClick={
                    resetNoticeForm
                  }
                  className="w-full mt-3 p-4 rounded-2xl bg-orange-50 text-orange-600 font-black uppercase text-xs"
                >

                  Cancel Edit

                </button>

              )}

            </div>

            {/* EXISTING NOTICES */}

            <div>

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-xl font-black uppercase italic">

                  Published Notices

                </h2>

                {loading && (
                  <Loader2
                    size={20}
                    className="animate-spin text-green-600"
                  />
                )}

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {data.map(
                  (notice: any) => (

                    <div
                      key={notice.id}
                      className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm"
                    >

                      <div className="relative">

                        <img
                          src={
                            notice.image_url
                          }
                          className="w-full h-56 object-cover"
                          alt={
                            notice.title
                          }
                        />

                        <div className="absolute top-4 right-4">

                          <span
                            className={`px-3 py-2 rounded-full text-[9px] font-black uppercase ${
                              notice.is_active
                                ? 'bg-green-500 text-white'
                                : 'bg-slate-800 text-white'
                            }`}
                          >

                            {notice.is_active
                              ? 'LIVE'
                              : 'HIDDEN'}

                          </span>

                        </div>

                      </div>

                      <div className="p-6">

                        <h3 className="font-black text-xl mb-2">

                          {notice.title}

                        </h3>

                        <p className="text-sm text-slate-500 mb-6 line-clamp-3">

                          {
                            notice.description
                          }

                        </p>

                        <div className="flex gap-3">

                          <button
                            onClick={() =>
                              handleEditNotice(
                                notice
                              )
                            }
                            className="flex-1 p-3 bg-blue-50 text-blue-600 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all"
                          >

                            <Edit3 size={16} />

                            Edit

                          </button>

                          <button
                            onClick={() =>
                              toggleNotice(
                                notice
                              )
                            }
                            className={`flex-1 p-3 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 transition-all ${
                              notice.is_active
                                ? 'bg-orange-50 text-orange-600 hover:bg-orange-500 hover:text-white'
                                : 'bg-green-50 text-green-600 hover:bg-green-500 hover:text-white'
                            }`}
                          >

                            {notice.is_active
                              ? <EyeOff size={16} />
                              : <Eye size={16} />
                            }

                            {notice.is_active
                              ? 'Hide'
                              : 'Publish'}

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                notice.id
                              )
                            }
                            className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                          >

                            <Trash2
                              size={18}
                            />

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

              {data.length === 0 && !loading && (

                <div className="bg-white rounded-[2rem] p-12 text-center border border-slate-100">

                  <Bell
                    size={40}
                    className="mx-auto text-slate-300 mb-4"
                  />

                  <p className="font-black text-slate-400 uppercase text-xs tracking-widest">

                    No Notices Yet

                  </p>

                </div>

              )}

            </div>

          </div>

        ) :

        /* ===================================
           GALLERY
           =================================== */

        activeTab === 'gallery' ? (

          <div className="space-y-8">

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                <input
                  type="text"
                  placeholder="Category (e.g. Events)"
                  className="admin-input"
                  value={category}
                  onChange={e =>
                    setCategory(
                      e.target.value
                    )
                  }
                />

                <label className="admin-input flex items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 border-dashed border-2">

                  <Upload size={20} />

                  {uploading
                    ? 'UPLOADING...'
                    : 'SELECT PHOTOS'}

                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={
                      handleGalleryUpload
                    }
                  />

                </label>

              </div>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

              {data.map(img => (

                <div
                  key={img.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200"
                >

                  <img
                    src={img.image_url}
                    className="w-full h-full object-cover"
                    alt=""
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">

                    <button
                      onClick={() =>
                        handleDelete(
                          img.id
                        )
                      }
                      className="p-3 bg-red-600 text-white rounded-xl hover:scale-110 transition-transform"
                    >

                      <Trash2
                        size={20}
                      />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ) :

        /* ===================================
           DASHBOARD
           =================================== */

        activeTab === 'dashboard' ? (

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-slate-900 p-10 rounded-[3rem] text-white">

              <h3 className="font-black text-green-500 text-[10px] uppercase tracking-widest mb-2">

                Access Status

              </h3>

              <p className="text-4xl font-black uppercase italic leading-tight">

                Welcome Back,

                <br />

                Administrator

              </p>

            </div>

            <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-center">

              <p className="text-slate-400 font-bold text-xs uppercase mb-1">

                Quick Action

              </p>

              <button
                onClick={() =>
                  setActiveTab(
                    'notice'
                  )
                }
                className="flex items-center justify-between font-black text-xl group"
              >

                Manage Notices

                <ArrowRight
                  className="group-hover:translate-x-2 transition-transform"
                />

              </button>

            </div>

          </div>

        ) :

        /* ===================================
           OTHER TABLES
           =================================== */

        (

          <div className="space-y-10">

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                <input
                  type="text"
                  placeholder={
                    activeTab === 'team'
                      ? "Full Name"
                      : "Title / Period"
                  }
                  className="admin-input"
                  value={title}
                  onChange={e =>
                    setTitle(
                      e.target.value
                    )
                  }
                />

                {activeTab === 'team' ? (

                  <input
                    type="text"
                    placeholder="Position"
                    className="admin-input"
                    value={role}
                    onChange={e =>
                      setRole(
                        e.target.value
                      )
                    }
                  />

                ) : (

                  <input
                    type="text"
                    placeholder="Interest Rate %"
                    className="admin-input"
                    value={rate}
                    onChange={e =>
                      setRate(
                        e.target.value
                      )
                    }
                  />

                )}

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">

                {activeTab === 'rates' && (

                  <div
                    onClick={() =>
                      setIsPopular(
                        !isPopular
                      )
                    }
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl cursor-pointer border-2 transition-all ${
                      isPopular
                        ? 'bg-orange-50 border-orange-500 text-orange-600'
                        : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}
                  >

                    <Star
                      size={20}
                      fill={
                        isPopular
                          ? "currentColor"
                          : "none"
                      }
                    />

                    <span className="font-black uppercase text-[10px] tracking-widest">

                      Mark as Popular Product

                    </span>

                  </div>

                )}

                {activeTab === 'team' ? (

                  <select
                    className="admin-input"
                    value={category}
                    onChange={e =>
                      setCategory(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      Select Category
                    </option>

                    <option value="leader">
                      Leader
                    </option>

                    <option value="director">
                      Director
                    </option>

                    <option value="staff">
                      Staff Member
                    </option>

                  </select>

                ) : (

                  <input
                    type="text"
                    placeholder="Amount / Limit"
                    className="admin-input"
                    value={amount}
                    onChange={e =>
                      setAmount(
                        e.target.value
                      )
                    }
                  />

                )}

              </div>

              {activeTab === 'savings' && (

                <input
                  type="text"
                  placeholder="Benefits (Comma separated)"
                  className="admin-input mb-4"
                  value={features}
                  onChange={e =>
                    setFeatures(
                      e.target.value
                    )
                  }
                />

              )}

              <textarea
                placeholder="Description..."
                className="admin-input mb-4 min-h-[100px]"
                value={description}
                onChange={e =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <button
                onClick={
                  handleSaveData
                }
                className={`w-full p-5 rounded-2xl font-black text-white transition-all uppercase flex items-center justify-center gap-2 ${
                  editingId
                    ? 'bg-blue-600'
                    : 'bg-slate-900 hover:bg-green-600'
                }`}
              >

                {loading
                  ? (
                    <Loader2
                      className="animate-spin"
                    />
                  )
                  : editingId
                  ? (
                    <Edit3 size={20} />
                  )
                  : (
                    <Plus size={20} />
                  )
                }

                {editingId
                  ? 'Update Record'
                  : 'Save New Record'}

              </button>

            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-100">

              <table className="w-full text-left">

                <thead className="bg-slate-50 border-b border-slate-100">

                  <tr>

                    <th className="p-6 text-[10px] font-black uppercase text-slate-400">
                      Information
                    </th>

                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 text-right">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-50">

                  {data.map(
                    item => (

                      <tr
                        key={item.id}
                        className="hover:bg-slate-50/50 group transition-colors"
                      >

                        <td className="p-6">

                          <div className="flex items-center gap-2">

                            <div className="font-bold text-slate-800 text-lg">

                              {
                                item.name ||
                                item.title ||
                                item.period
                              }

                            </div>

                            {item.is_popular &&
                              activeTab === 'rates' && (

                                <span className="px-2 py-0.5 bg-orange-500 text-white text-[8px] font-black uppercase rounded-full flex items-center gap-1">

                                  <Star
                                    size={8}
                                    fill="white"
                                  />

                                  Popular

                                </span>

                            )}

                          </div>

                          <div className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">

                            {activeTab === 'team'
                              ? item.position
                              : `${item.rate || item.interest || '0'}% Interest`}

                          </div>

                        </td>

                        <td className="p-6 flex justify-end gap-3">

                          <button
                            onClick={() =>
                              handleEdit(
                                item
                              )
                            }
                            className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                          >

                            <Edit3
                              size={18}
                            />

                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                item.id
                              )
                            }
                            className="p-3 bg-red-50 text-red-500 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                          >

                            <Trash2
                              size={18}
                            />

                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </main>

      <style>{`

        .admin-input {
          padding: 1.2rem;
          border: 2px solid #f1f5f9;
          border-radius: 1.2rem;
          outline: none;
          background: #f8fafc;
          font-weight: 700;
          width: 100%;
          transition: all 0.3s;
        }

        .admin-input:focus {
          border-color: #10b981;
          background: white;
          box-shadow:
            0 10px 25px -5px
            rgba(16, 185, 129, 0.1);
        }

      `}</style>

    </div>
  );
}


// ============================================
// SIDEBAR BUTTON
// ============================================

function SideBtn({
  icon,
  label,
  active,
  onClick
}: any) {

  return (

    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
        active
          ? 'bg-green-600 text-white shadow-lg'
          : 'hover:bg-slate-800 text-slate-400'
      }`}
    >

      <span>
        {icon}
      </span>

      <span className="text-[10px] font-black uppercase tracking-widest">

        {label}

      </span>

    </button>

  );
}
