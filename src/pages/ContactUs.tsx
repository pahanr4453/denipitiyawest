import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ArrowUpRight,
  Map as MapIcon,
  CheckCircle2,
  Globe,
  Loader2,
  ShieldCheck,
  Headphones,
  Navigation
} from 'lucide-react';
import { motion } from 'framer-motion';

const content = {
  en: {
    heroTag: 'Get In Touch',
    heroTitle: 'Contact Us',
    heroSub:
      "We're here to help with your financial needs. Reach out and our team will be ready to assist you.",
    infoTitle: 'Contact Information',
    infoSub: 'Choose the easiest way to reach us.',
    formTitle: 'Send a Message',
    formSub: 'Tell us what you need and we will get back to you.',
    labels: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      msg: 'Message',
      sub: 'Subject'
    },
    btn: 'Send Message',
    sending: 'Sending...',
    success: 'Sent Successfully',
    visitTitle: 'Visit Our Office',
    visitSub:
      'Located near the historic Welihinda Sri Sudarshanaramaya Temple, our office is ready to serve you.',
    directions: 'Open in Google Maps',
    hoursTitle: 'Opening Hours',
    days: 'Mon - Fri',
    sat: 'Saturday',
    support: 'Friendly Support',
    response: 'Quick Response'
  },
  si: {
    heroTag: 'සම්බන්ධ වන්න',
    heroTitle: 'අප අමතන්න',
    heroSub:
      'ඔබේ මූල්‍ය අවශ්‍යතා සඳහා අපගේ කණ්ඩායම සූදානම්. පහසුම ආකාරයෙන් අප හා සම්බන්ධ වන්න.',
    infoTitle: 'සම්බන්ධතා විස්තර',
    infoSub: 'ඔබට පහසුම සම්බන්ධතා ක්‍රමය තෝරන්න.',
    formTitle: 'පණිවිඩයක් එවන්න',
    formSub: 'ඔබට අවශ්‍ය දේ අපට කියන්න. අපි ඉක්මනින් ඔබව සම්බන්ධ කරගන්නෙමු.',
    labels: {
      name: 'සම්පූර්ණ නම',
      email: 'විද්‍යුත් තැපෑල',
      phone: 'දුරකථන අංකය',
      msg: 'පණිවිඩය',
      sub: 'විෂය'
    },
    btn: 'පණිවිඩය එවන්න',
    sending: 'යවමින් පවතී...',
    success: 'සාර්ථකව යවන ලදී',
    visitTitle: 'අපගේ කාර්යාලය',
    visitSub:
      'ඓතිහාසික වැලිහින්ද ශ්‍රී සුදර්ශනාරාම විහාරස්ථානය අසල පිහිටි අපගේ කාර්යාලයට පැමිණෙන්න.',
    directions: 'ගූගල් මැප්ස් හරහා බලන්න',
    hoursTitle: 'විවෘත වේලාවන්',
    days: 'සඳුදා - සිකුරාදා',
    sat: 'සෙනසුරාදා',
    support: 'මිත්‍රශීලී සේවාව',
    response: 'ඉක්මන් ප්‍රතිචාර'
  },
  ta: {
    heroTag: 'தொடர்பு கொள்ளவும்',
    heroTitle: 'எங்களைத் தொடர்பு கொள்க',
    heroSub:
      'உங்கள் நிதித் தேவைகளுக்கு உதவ எங்கள் குழு தயாராக உள்ளது. உங்களுக்கு வசதியான முறையில் எங்களைத் தொடர்பு கொள்ளுங்கள்.',
    infoTitle: 'தொடர்பு விபரங்கள்',
    infoSub: 'உங்களுக்கு எளிதான தொடர்பு முறையைத் தேர்ந்தெடுக்கவும்.',
    formTitle: 'ஒரு செய்தியை அனுப்புக',
    formSub: 'உங்கள் தேவையை எங்களிடம் கூறுங்கள். விரைவில் தொடர்புகொள்வோம்.',
    labels: {
      name: 'முழுப் பெயர்',
      email: 'மின்னஞ்சல் முகவரி',
      phone: 'தொலைபேசி எண்',
      msg: 'செய்தி',
      sub: 'பொருள்'
    },
    btn: 'செய்தியை அனுப்பவும்',
    sending: 'அனுப்பப்படுகிறது...',
    success: 'வெற்றிகரமாக அனுப்பப்பட்டது',
    visitTitle: 'எமது அலுவலகம்',
    visitSub:
      'வரலாற்றுச் சிறப்புமிக்க வெலிஹிந்த ஸ்ரீ சுதர்சனராமய விகாரைக்கு அருகில் அமைந்துள்ள எமது அலுவலகத்திற்கு வருக.',
    directions: 'கூகுள் மெப்ஸ் இல் பார்க்க',
    hoursTitle: 'திறந்திருக்கும் நேரம்',
    days: 'திங்கள் - வெள்ளி',
    sat: 'சனிக்கிழமை',
    support: 'நட்பு ஆதரவு',
    response: 'விரைவான பதில்'
  }
};

export default function ContactUs({
  lang = 'si'
}: {
  lang?: 'si' | 'en' | 'ta';
}) {
  const isTamil = lang === 'ta';
  const t = content[lang as keyof typeof content] || content.si;

  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Keep your existing Web3Forms key here.
    formData.append('access_key', 'bde2aee0-b674-41b2-9720-5a7fc48fd176');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        form.reset();
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSending(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbfdfc] text-slate-900 transition-colors duration-500 dark:bg-[#020817] dark:text-white">
      {/* AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 70, 10, 0],
            y: [0, 35, 80, 0],
            scale: [1, 1.08, 0.96, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -left-28 -top-32 h-[360px] w-[360px] rounded-full bg-emerald-500/10 blur-[110px] dark:bg-emerald-500/10"
        />

        <motion.div
          animate={{
            x: [0, -70, -20, 0],
            y: [0, 70, -15, 0],
            scale: [1, 0.94, 1.08, 1]
          }}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -right-28 top-[18%] h-[430px] w-[430px] rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/10"
        />

        <motion.div
          animate={{
            x: [0, 55, -35, 0],
            y: [0, -35, 30, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-150px] left-[30%] h-[460px] w-[460px] rounded-full bg-violet-500/10 blur-[140px] dark:bg-violet-500/10"
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
              <Globe size={14} />
              {t.heroTag}
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
                <MiniStat
                  icon={<Headphones size={19} />}
                  title={t.support}
                  text="SANASA"
                  tone="emerald"
                />
                <MiniStat
                  icon={<ShieldCheck size={19} />}
                  title={t.response}
                  text="Trusted"
                  tone="blue"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CONTACT CONTENT */}
        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
              {/* LEFT INFO */}
              <div className="lg:col-span-5">
                <div className="mb-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-400">
                    Contact Details
                  </p>
                  <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} mt-3 font-extrabold tracking-[-0.04em]`}>
                    {t.infoTitle}
                  </h2>
                  <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {t.infoSub}
                  </p>
                </div>

                <div className="space-y-4">
                  <ContactCard
                    icon={<Mail />}
                    title="Email"
                    value="info@denipitiyawest.lk"
                    sub={isTamil ? 'எந்த நேரத்திலும் மின்னஞ்சல் அனுப்புங்கள்' : 'Send us an email anytime'}
                    link="mailto:info@denipitiyawest.lk"
                    accent="emerald"
                    isTamil={isTamil}
                  />

                  <ContactCard
                    icon={<Phone />}
                    title="Phone"
                    value="+94 41 225 2003"
                    sub={isTamil ? 'வேலை நேரங்களில் எங்களை அழைக்கவும்' : 'Call us during business hours'}
                    link="tel:+94412252003"
                    accent="blue"
                    isTamil={isTamil}
                  />

                  <ContactCard
                    icon={<MapPin />}
                    title="Address"
                    value={
                      isTamil
                        ? 'தெனிபிட்டிய மேற்கு சனச, வெலிஹிந்த, மாத்தறை.'
                        : 'Denipitiya West SANASA, Welihinda, Matara.'
                    }
                    sub={isTamil ? 'ஸ்ரீ சுதர்சனராமய விகாரைக்கு அருகில்' : 'Near Sri Sudarshanaramaya Temple'}
                    accent="violet"
                    isTamil={isTamil}
                  />

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-[#07111f] p-6 text-white shadow-xl dark:border-white/10 dark:bg-[#020914]"
                  >
                    <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl" />

                    <div className="relative z-10">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                          <Clock size={20} />
                        </div>
                        <h4 className="text-base font-extrabold tracking-tight">
                          {t.hoursTitle}
                        </h4>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
                          <span className="font-medium text-slate-400">{t.days}</span>
                          <span className="font-bold text-white">8:30 AM - 4:30 PM</span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="font-medium text-slate-400">{t.sat}</span>
                          <span className="font-bold text-white">8:30 AM - 12:30 PM</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* FORM */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_70px_-35px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] md:p-8 lg:col-span-7 lg:p-10"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-emerald-500/10 blur-[70px]" />

                <div className="relative z-10">
                  <div className="mb-8">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      <MessageSquare size={23} />
                    </div>

                    <h2 className={`${isTamil ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} font-extrabold tracking-[-0.04em]`}>
                      {t.formTitle}
                    </h2>

                    <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-slate-500 dark:text-slate-400">
                      {t.formSub}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <Field
                        label={t.labels.name}
                        name="Name"
                        type="text"
                        placeholder="John Doe"
                        required
                      />

                      <Field
                        label={t.labels.email}
                        name="Email"
                        type="email"
                        placeholder="john@email.com"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <Field
                        label={t.labels.phone}
                        name="Phone"
                        type="tel"
                        placeholder="+94 ..."
                      />

                      <Field
                        label={t.labels.sub}
                        name="Subject"
                        type="text"
                        placeholder="..."
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                        {t.labels.msg}
                      </label>

                      <textarea
                        name="Message"
                        rows={6}
                        required
                        placeholder="..."
                        className="w-full resize-none rounded-[1.4rem] border border-slate-200 bg-white/80 px-5 py-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending || submitted}
                      className={`flex w-full items-center justify-center gap-3 rounded-[1.25rem] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-lg transition-all duration-300 ${
                        submitted
                          ? 'bg-emerald-600'
                          : 'bg-slate-950 hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-500'
                      } disabled:cursor-not-allowed disabled:opacity-70`}
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="animate-spin" size={18} />
                          {t.sending}
                        </>
                      ) : submitted ? (
                        <>
                          <CheckCircle2 size={18} />
                          {t.success}
                        </>
                      ) : (
                        <>
                          {t.btn}
                          <Send size={17} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MAP / OFFICE */}
        <section className="px-5 pb-32 md:px-8 md:pb-40">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-[#07111f] p-6 shadow-2xl dark:border-white/10 dark:bg-[#020914] md:p-8 lg:p-10">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[90px]" />
                <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-blue-500/10 blur-[100px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:26px_26px]" />
              </div>

              <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-10">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                    <Navigation size={13} />
                    Office Location
                  </div>

                  <h2 className={`${isTamil ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'} font-extrabold tracking-[-0.045em] text-white`}>
                    {t.visitTitle}
                    <span className="text-emerald-500">.</span>
                  </h2>

                  <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-slate-400 md:text-base">
                    {t.visitSub}
                  </p>

                  <a
                    href="https://maps.google.com/?q=Denipitiya+West+SANASA+Matara"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-950 transition-all hover:bg-emerald-500 hover:text-white"
                  >
                    <MapIcon size={18} />
                    {t.directions}
                    <ArrowUpRight size={17} />
                  </a>
                </div>

                <div className="h-[340px] w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-900 shadow-2xl sm:h-[420px] lg:h-[460px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15870.78168234857!2d80.4444584!3d5.968037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1158564035619%3A0x6336335359a9307c!2sDenipitiya%20West!5e0!3m2!1sen!2slk!4v1700000000000"
                    title="Denipitiya West SANASA location"
                    className="h-full w-full opacity-85 grayscale-[20%] transition-all duration-700 hover:opacity-100 hover:grayscale-0"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function MiniStat({
  icon,
  title,
  text,
  tone
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  tone: 'emerald' | 'blue';
}) {
  const toneClass =
    tone === 'emerald'
      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400';

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/75 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClass}`}>
          {icon}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-extrabold">{title}</p>
          <p className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  ...props
}: {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </label>

      <input
        {...props}
        className="w-full rounded-[1.2rem] border border-slate-200 bg-white/80 px-5 py-4 text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-600"
      />
    </div>
  );
}

function ContactCard({
  icon,
  title,
  value,
  sub,
  link,
  accent,
  isTamil
}: any) {
  const Wrapper = link ? 'a' : 'div';

  const tones: Record<string, string> = {
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
  };

  return (
    <Wrapper
      href={link}
      className="group flex items-center gap-4 rounded-[1.6rem] border border-slate-200/80 bg-white/75 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-lg dark:border-white/10 dark:bg-white/[0.035]"
    >
      <div className={`flex h-13 w-13 min-h-[52px] min-w-[52px] items-center justify-center rounded-2xl ${tones[accent]}`}>
        {React.cloneElement(icon, { size: 22, strokeWidth: 1.8 })}
      </div>

      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-400">
          {title}
        </p>

        <h4 className={`${isTamil ? 'text-sm md:text-base' : 'text-base md:text-lg'} mt-1 break-words font-extrabold leading-tight tracking-tight text-slate-950 dark:text-white`}>
          {value}
        </h4>

        <p className="mt-1 line-clamp-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
          {sub}
        </p>
      </div>
    </Wrapper>
  );
}
