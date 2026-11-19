import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import './App.css';

const event = {
  namesEn: 'Youssef & Razan',
  namesAr: 'يوسف و رزان',
  dateTime: '2026-12-18T19:00:00+02:00',
  venueEn: 'The Garden Venue', venueAr: 'ذا جاردن فينيو',
  addressEn: 'Family Park area, New Cairo, near Al Rehab Gate 20',
  addressAr: 'منطقة فاميلي بارك، القاهرة الجديدة، بالقرب من بوابة ٢٠ بالرحاب',
  mapsUrl: 'https://maps.app.goo.gl/wg4kvvk8ax3k1CS3A',
  mapsEmbedUrl: 'https://www.google.com/maps?q=30.0759239,31.4993514&z=16&output=embed',
  venuePhoto: 'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/the-garden-venue-card.webp'
};

const assetBase = 'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/';
const backgroundMusicUrl = assetBase + 'background-music.mp3';
const flowers = {
  photoLeft: assetBase + 'photo-left.webp',
  photoRight: assetBase + 'photo-right.webp',
  section1: assetBase + 'section-1.webp',
  section2: assetBase + 'section-2.webp',
  section3: assetBase + 'section-3.webp',
  section4: assetBase + 'section-4.webp'
};

const storyPhotos = {
  teen: assetBase + 'teen-story.webp',
  current: assetBase + 'current-story.webp'
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

const translations = {
  en: {
    openingLabel: 'YOU ARE INVITED', openingTitle: 'A Beautiful Beginning',
    openingSubtitle: 'A special moment, made sweeter together.', open: 'Open Our Invitation',
    families: 'TOGETHER WITH OUR FAMILIES', engagement: 'Our Engagement',
    welcome: 'A Little Celebration of Us',
    message: 'With happiness in our hearts, we invite you to share the joy of our engagement celebration.',
    celebration: 'The Celebration', date: 'The Date', time: 'The Time', venue: 'The Venue',
    calendarMonth: 'DECEMBER 2026', calendarDays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    soon: 'To be announced', location: 'THE LOCATION', findUs: 'Join Us Here',
    address: 'Venue address coming soon', mapPlaceholder: 'Our celebration venue will appear here',
    directions: 'Get Directions', countdown: 'Until Our Engagement',
    days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds',
    started: 'Our engagement day is here!',
    rsvp: 'Will You Join Us?', rsvpMessage: 'We would be so happy to celebrate our engagement with you.',
    guestName: 'Your full name', guestNamePlaceholder: 'Enter your name',
    attendance: 'Will you attend?', attending: 'Joyfully accepts',
    notAttending: 'Regretfully declines', maybe: 'Not sure yet',
    guests: 'Number of attendees (including you)',
    guestNote: 'Please include yourself in this number.',
    messageLabel: 'A little message (optional)', messagePlaceholder: 'Leave us a note...',
    submit: 'Send RSVP', sending: 'Sending...',
    successTitle: 'Thank you for replying!',
    successText: 'Your response has been received. We look forward to celebrating with you!',
    declineText: 'Your response has been received. Thank you for letting us know.',
    submitAgain: 'Send another response',
    errorText: 'We could not save your response. Please try again.',
    configError: 'RSVP is not connected yet. Please check the Supabase environment settings.',
    invalidName: 'Please enter a name between 2 and 120 characters.',
    invalidCount: 'Please select between 1 and 20 attendees.',
    footer: 'Made with love', scroll: 'SCROLL TO EXPLORE',
    photoAlt: 'Our photograph together', photoMissing: 'Our photograph will appear here',
    musicOn: 'Pause music', musicOff: 'Play music', musicUnavailable: 'Music could not play. Try a properly encoded MP3 file.',
    storyLabel: 'A Beautiful Chapter', storyTeenAlt: 'A photograph from our teenage years',
    storyCurrentAlt: 'A recent photograph of us together'
  },
  ar: {
    openingLabel: 'نتشرف بدعوتكم', openingTitle: 'بداية حكاية جميلة',
    openingSubtitle: 'فرحتنا تحلى بوجودكم معانا.', open: 'افتح دعوتنا',
    families: 'بمشاركة أهلنا وأحبابنا', engagement: 'حفل خطوبتنا',
    welcome: 'نحتفل بخطوبتنا',
    message: 'بكل الحب والسعادة، يسعدنا دعوتكم لمشاركتنا فرحة خطوبتنا والاحتفال معانا باليوم المميز ده.',
    celebration: 'تفاصيل الحفل', date: 'التاريخ', time: 'الساعة', venue: 'المكان',
    calendarMonth: 'ديسمبر ٢٠٢٦', calendarDays: ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'],
    soon: 'سيتم الإعلان قريبًا', location: 'موقع الحفل', findUs: 'مستنيينكم هنا',
    address: 'سيتم إضافة عنوان المكان قريبًا', mapPlaceholder: 'سيظهر موقع الحفل هنا',
    directions: 'افتح خرائط جوجل', countdown: 'العد التنازلي لخطوبتنا',
    days: 'يوم', hours: 'ساعة', minutes: 'دقيقة', seconds: 'ثانية',
    started: 'يوم خطوبتنا جه!',
    rsvp: 'هتنورونا؟', rsvpMessage: 'وجودكم معانا هيكمل فرحتنا في يوم خطوبتنا.',
    guestName: 'الاسم بالكامل', guestNamePlaceholder: 'اكتب اسمك هنا',
    attendance: 'هتحضر معانا؟', attending: 'أكيد هحضر',
    notAttending: 'للأسف مش هقدر أحضر', maybe: 'لسه مش متأكد',
    guests: 'عدد الحاضرين (شامل حضرتك)',
    guestNote: 'من فضلك احسب نفسك ضمن العدد.',
    messageLabel: 'رسالة لينا (اختياري)', messagePlaceholder: 'اكتب رسالة لطيفة...',
    submit: 'تأكيد الرد', sending: 'جارٍ الإرسال...',
    successTitle: 'شكرًا على ردك!',
    successText: 'وصلنا تأكيدك، ومستنيين نشوفك في يوم فرحتنا!',
    declineText: 'وصلنا ردك، وشكرًا إنك بلغتنا.',
    submitAgain: 'إرسال رد آخر',
    errorText: 'حصلت مشكلة أثناء حفظ الرد. حاول مرة تانية.',
    configError: 'تأكيد الحضور مش متوصل بقاعدة البيانات لسه. راجع إعدادات Supabase.',
    invalidName: 'من فضلك اكتب اسم من حرفين إلى ١٢٠ حرف.',
    invalidCount: 'اختار عدد الحاضرين من ١ إلى ٢٠.',
    footer: 'صُنع بكل حب', scroll: 'انزل لتكتشف باقي الدعوة',
    photoAlt: 'صورتنا مع بعض', photoMissing: 'صورتنا هتظهر هنا',
    musicOn: 'إيقاف الموسيقى', musicOff: 'تشغيل الموسيقى', musicUnavailable: 'تعذر تشغيل الموسيقى. جرّب رفع ملف MP3 بصيغة صوتية صحيحة.',
    storyLabel: 'فصل جميل من حكايتنا', storyTeenAlt: 'صورة من فترة المراهقة',
    storyCurrentAlt: 'صورة حديثة لنا'
  }
};

function useScrollFlowers(active) {
  useEffect(() => {
    if (!active) return;
    const sections = [...document.querySelectorAll('[data-flower-section]')];
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = null;
    function update() {
      frame = null;
      const h = window.innerHeight;
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        const raw = (h * 0.92 - top) / (h * 0.92 - h * 0.35);
        const p = motion.matches ? 1 : Math.max(0, Math.min(1, raw));
        section.style.setProperty('--flower-progress', (p * p * (3 - 2 * p)).toFixed(4));
      });
    }
    function schedule() {
      if (frame === null) frame = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    motion.addEventListener?.('change', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      motion.removeEventListener?.('change', schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [active]);
}

function FlowerRail({ image, side, eager = false }) {
  return (
    <div className={`flower-rail flower-rail-${side}`} aria-hidden="true">
      <img src={image} alt="" className="rail-flower" draggable="false" loading={eager ? "eager" : "lazy"} decoding="async" />
    </div>
  );
}

function FloralSection({ children, className = '', leftImage, rightImage, eagerFlowers = false }) {
  return (
    <section className={`content-section floral-section ${className}`} data-flower-section>
      <FlowerRail image={leftImage} side="left" eager={eagerFlowers} />
      <FlowerRail image={rightImage} side="right" eager={eagerFlowers} />
      <div className="section-inner">{children}</div>
    </section>
  );
}

function calculateRemaining() {
  const target = new Date(event.dateTime).getTime();
  if (!Number.isFinite(target)) return null;
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24,
    minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60,
    finished: diff === 0
  };
}

function Countdown({ t }) {
  const [remaining, setRemaining] = useState(calculateRemaining);
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(calculateRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);
  if (!remaining) return null;
  if (remaining.finished) return <p className="countdown-finished">{t.started}</p>;
  const units = [
    ['days', remaining.days, t.days], ['hours', remaining.hours, t.hours],
    ['minutes', remaining.minutes, t.minutes], ['seconds', remaining.seconds, t.seconds]
  ];
  return (
    <div className="countdown-grid">
      {units.map(([id, value, label]) => (
        <div className="countdown-box" key={id}>
          <strong>{String(value).padStart(2, '0')}</strong><span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* A small illustrated calendar, Monday-first. 1 December 2026 is Tuesday. */
function EngagementCalendar({ t }) {
  const cells = [null, ...Array.from({ length: 31 }, (_, i) => i + 1)];

  return (
    <div className="engagement-calendar" aria-label="18 December 2026">
      <div className="calendar-month">{t.calendarMonth}</div>
      <div className="calendar-grid" aria-hidden="true">
        {t.calendarDays.map((day, i) => (
          <span className="calendar-weekday" key={`weekday-${i}`}>{day}</span>
        ))}
        {cells.map((day, i) => (
          <span
            key={`date-${i}`}
            className={`calendar-day ${day === 18 ? 'calendar-engagement-day' : ''}`}
          >
            {day === 18 ? <span className="calendar-ring">18</span> : day ?? ''}
          </span>
        ))}
      </div>
    </div>
  );
}

/* A decorative analogue clock fixed at 7:00 PM. No image is needed. */
function EngagementClock() {
  return (
    <div className="engagement-clock-panel" role="img" aria-label="Decorative clock showing 7:00 PM">
      <svg className="engagement-clock" viewBox="0 0 220 220" aria-hidden="true" focusable="false">
        <circle cx="110" cy="110" r="101" fill="#f9f7ee" stroke="#b49a65" strokeWidth="1.7" />
        <circle cx="110" cy="110" r="94" fill="none" stroke="#dfd3b9" strokeWidth="1" />
        {Array.from({ length: 12 }, (_, i) => (
          <line
            key={i}
            x1="110" y1="19"
            x2="110" y2={i % 3 === 0 ? '31' : '25'}
            stroke="#b49a65"
            strokeWidth={i % 3 === 0 ? 1.8 : 1}
            transform={`rotate(${i * 30} 110 110)`}
          />
        ))}
        <g fill="#495a40" fontFamily="Georgia, serif" fontSize="14" textAnchor="middle">
          <text x="110" y="51">XII</text>
          <text x="170" y="115">III</text>
          <text x="110" y="179">VI</text>
          <text x="49" y="115">IX</text>
        </g>
        {/* At 7:00 the short hand points down-left to VII; the long hand points straight up. */}
        <circle cx="73" cy="170" r="20" fill="#fffdf7" stroke="#b49a65" strokeWidth="2" />
        <circle cx="73" cy="170" r="16.5" fill="none" stroke="#e4d5b4" strokeWidth="1" />
        <path d="M73 145 l4 5 -4 5 -4 -5 z" fill="#b49a65" />
        <text x="73" y="175" fontFamily="Georgia, serif" fontSize="12.5"
          textAnchor="middle" fontWeight="bold" fill="#495a40">VII</text>
        <line x1="110" y1="110" x2="87" y2="150"
          stroke="#495a40" strokeWidth="5.2" strokeLinecap="round" />
        <line x1="110" y1="110" x2="110" y2="55"
          stroke="#b49a65" strokeWidth="3" strokeLinecap="round" />
        <circle cx="110" cy="110" r="6" fill="#b49a65" />
        <circle cx="110" cy="110" r="2" fill="#fffdf7" />
        <path d="M97 160 Q110 153 123 160" fill="none" stroke="#c6b28a" strokeWidth="1" />
      </svg>
      <span className="clock-panel-ornament" aria-hidden="true">✧ ♡ ✧</span>
    </div>
  );
}

function CouplePhoto({ t }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="photo-scene">
      <img src={flowers.photoLeft} alt="" className="photo-bouquet photo-bouquet-left" aria-hidden="true" draggable="false" decoding="async" />
      <img src={flowers.photoRight} alt="" className="photo-bouquet photo-bouquet-right-top" aria-hidden="true" draggable="false" decoding="async" />
      <img src={flowers.photoRight} alt="" className="photo-bouquet photo-bouquet-right-bottom" aria-hidden="true" draggable="false" decoding="async" />
      <div className="photo-frame">
        {failed ? (
          <div className="photo-fallback"><span>♡</span><p>{t.photoMissing}</p></div>
        ) : (
          <img
            src="/couple-photo.webp"
            alt={t.photoAlt}
            onError={() => setFailed(true)}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width="1280"
            height="800"
          />
        )}
      </div>
      <span className="photo-sparkle photo-sparkle-left" aria-hidden="true">✧</span>
      <span className="photo-sparkle photo-sparkle-right" aria-hidden="true">✦</span>
    </div>
  );
}

function StoryMoments({ t, isArabic }) {
  return (
    <section className="content-section floral-section celebration-section story-journey-inline"
      data-flower-section aria-label={t.storyLabel}>
      <FlowerRail image={flowers.section1} side="left" eager />
      <FlowerRail image={flowers.section3} side="right" eager />
      <div className="story-journey-inner">
        <article className="story-card story-card-teen">
          <div className="story-photo-frame">
            <img src={storyPhotos.teen} alt={t.storyTeenAlt} className="story-photo" loading="lazy" decoding="async" width="960" height="1200" />
          </div>
        </article>

        <div className={`story-connector ${isArabic ? 'story-connector-ar' : ''}`}>
          <svg viewBox="0 0 320 160" className="story-arrow-svg" aria-hidden="true" focusable="false">
            <defs>
              <marker id="storyArrowHead" markerWidth="12" markerHeight="12" refX="8.2" refY="6" orient="auto">
                <path d="M0,0 L12,6 L0,12 z" fill="#b49a65" />
              </marker>
            </defs>
            <path
              d={isArabic ? 'M294 30 C246 8, 161 10, 132 58 S72 145, 26 130' : 'M26 30 C74 8, 159 10, 188 58 S248 145, 294 130'}
              fill="none" stroke="#b49a65" strokeWidth="3" strokeLinecap="round"
              markerEnd="url(#storyArrowHead)"
            />
            <circle cx={isArabic ? '294' : '26'} cy="30" r="4" fill="#b49a65" opacity=".92" />
          </svg>
          <p className="story-caption">{t.storyLabel}</p>
        </div>

        <article className="story-card story-card-current">
          <div className="story-photo-frame">
            <img src={storyPhotos.current} alt={t.storyCurrentAlt} className="story-photo" loading="lazy" decoding="async" width="1200" height="1500" />
          </div>
        </article>
      </div>
    </section>
  );
}

/* The database only allows INSERT for public guests.
   Do not add .select() after insert: that would require read access. */
function RSVPForm({ t, language }) {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('attending');
  const [guestCount, setGuestCount] = useState('1');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [sentStatus, setSentStatus] = useState('attending');

  async function submitRSVP(e) {
    e.preventDefault();
    if (busy) return;
    setError('');
    const cleanName = name.trim();
    const cleanMessage = message.trim();
    const count = attendance === 'attending' ? Number(guestCount) : 0;
    if (cleanName.length < 2 || cleanName.length > 120) {
      setError(t.invalidName);
      return;
    }
    if (attendance === 'attending' && (!Number.isInteger(count) || count < 1 || count > 20)) {
      setError(t.invalidCount);
      return;
    }
    if (!supabase) {
      setError(t.configError);
      return;
    }
    setBusy(true);
    try {
      const { error: insertError } = await supabase.from('engagement_rsvps').insert({
        guest_name: cleanName,
        attendance_status: attendance,
        guest_count: count,
        message: cleanMessage || null
      });
      if (insertError) throw insertError;
      setSentStatus(attendance);
      setSent(true);
    } catch (err) {
      console.error('RSVP submission failed:', err);
      setError(t.errorText);
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rsvp-form rsvp-success" role="status" aria-live="polite">
        <div className="success-icon" aria-hidden="true">♡</div>
        <h3>{t.successTitle}</h3>
        <p>{sentStatus === 'attending' ? t.successText : t.declineText}</p>
        <button type="button" className="secondary-button" onClick={() => {
          setName(''); setAttendance('attending'); setGuestCount('1');
          setMessage(''); setError(''); setSent(false);
        }}>{t.submitAgain}</button>
      </div>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={submitRSVP}>
      <div className="rsvp-field">
        <label htmlFor="rsvp-name">{t.guestName} <span aria-hidden="true">*</span></label>
        <input id="rsvp-name" type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder={t.guestNamePlaceholder} minLength={2} maxLength={120} autoComplete="name" required disabled={busy} />
      </div>

      <fieldset className="rsvp-field attendance-field" disabled={busy}>
        <legend>{t.attendance} <span aria-hidden="true">*</span></legend>
        <div className="attendance-options">
          {[
            ['attending', t.attending],
            ['not_attending', t.notAttending],
            ['maybe', t.maybe]
          ].map(([value, label]) => (
            <label className={`attendance-option ${attendance === value ? 'selected' : ''}`} key={value}>
              <input type="radio" name="attendance" value={value} checked={attendance === value}
                onChange={() => setAttendance(value)} />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {attendance === 'attending' && (
        <div className="rsvp-field guest-count-field">
          <label htmlFor="rsvp-count">{t.guests}</label>
          <select id="rsvp-count" value={guestCount} onChange={(e) => setGuestCount(e.target.value)} disabled={busy}>
            {Array.from({ length: 20 }, (_, i) => i + 1).map((count) => (
              <option key={count} value={count}>{new Intl.NumberFormat(language).format(count)}</option>
            ))}
          </select>
          <small>{t.guestNote}</small>
        </div>
      )}

      <div className="rsvp-field">
        <label htmlFor="rsvp-message">{t.messageLabel}</label>
        <textarea id="rsvp-message" rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder} maxLength={500} disabled={busy} />
      </div>

      {error && <p className="rsvp-error" role="alert">{error}</p>}
      <button className="primary-button rsvp-submit" type="submit" disabled={busy}>
        {busy ? t.sending : t.submit} <span aria-hidden="true">✧</span>
      </button>
    </form>
  );
}


/* ============================================================
   PRIVATE ADMIN DASHBOARD
   URL: yoursite/#admin
   Supabase Row Level Security protects the actual records.
============================================================ */

const adminText = {
  en: {
    heading: 'RSVP Dashboard', subtitle: 'Private engagement attendance manager',
    back: 'Back to invitation', signIn: 'Sign in', signingIn: 'Signing in...',
    signOut: 'Sign out', email: 'Email address', password: 'Password',
    loginHelp: 'Only authorized organizers can access guest responses.',
    unauthorized: 'This account is not authorized to view guest responses.',
    loginError: 'Could not sign in. Please check your email and password.',
    notConfigured: 'Supabase configuration is missing. Check the .env file.',
    loadError: 'Could not load guest responses. Check admin permissions.',
    total: 'Responses', yes: 'Attending responses', guests: 'Expected guests',
    no: 'Declined', maybe: 'Unsure', search: 'Search guest names or messages',
    all: 'All statuses', status: 'Attendance status', attending: 'Attending', declined: 'Declined', unsure: 'Unsure',
    refresh: 'Refresh', export: 'Export CSV', guest: 'Guest', status: 'Status',
    count: 'Attendees', message: 'Message', submitted: 'Received', actions: 'Actions',
    remove: 'Delete', deleteAsk: 'Permanently delete the RSVP from',
    empty: 'No matching RSVP responses yet.', loading: 'Loading responses...',
    lastUpdated: 'Last refreshed', deletionError: 'Deletion failed. Please try again.',
    showing: 'Showing', noMessage: '—'
  },
  ar: {
    heading: 'لوحة تأكيد الحضور', subtitle: 'إدارة ردود حضور الخطوبة بشكل خاص',
    back: 'العودة للدعوة', signIn: 'تسجيل الدخول', signingIn: 'جارٍ الدخول...',
    signOut: 'تسجيل الخروج', email: 'البريد الإلكتروني', password: 'كلمة المرور',
    loginHelp: 'يمكن فقط للمنظمين المصرح لهم مشاهدة ردود الضيوف.',
    unauthorized: 'هذا الحساب غير مصرح له بمشاهدة ردود الضيوف.',
    loginError: 'تعذر تسجيل الدخول. راجع البريد الإلكتروني وكلمة المرور.',
    notConfigured: 'إعدادات Supabase غير موجودة. راجع ملف .env.',
    loadError: 'تعذر تحميل الردود. راجع صلاحيات المسؤول.',
    total: 'إجمالي الردود', yes: 'الردود بالموافقة', guests: 'الحضور المتوقع',
    no: 'اعتذار', maybe: 'غير متأكد', search: 'ابحث بالاسم أو الرسالة',
    all: 'كل الحالات', status: 'حالة الحضور', attending: 'سيحضر', declined: 'اعتذر', unsure: 'غير متأكد',
    refresh: 'تحديث', export: 'تصدير CSV', guest: 'الضيف', status: 'الحالة',
    count: 'الحضور', message: 'الرسالة', submitted: 'وقت الرد', actions: 'إجراءات',
    remove: 'حذف', deleteAsk: 'هل تريد حذف رد الضيف نهائيًا:',
    empty: 'لا توجد ردود مطابقة حتى الآن.', loading: 'جارٍ تحميل الردود...',
    lastUpdated: 'آخر تحديث', deletionError: 'تعذر حذف الرد. حاول مرة أخرى.',
    showing: 'المعروض', noMessage: '—'
  }
};

function csvField(value) {
  let valueText = String(value ?? '');
  // Prevent spreadsheet applications from interpreting guest text as formulas.
  if (/^[\s]*[=+@\-\t\r]/.test(valueText)) valueText = "'" + valueText;
  return '"' + valueText.replaceAll('"', '""') + '"';
}

function AdminDashboard({ language, changeLanguage }) {
  const t = adminText[language];
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);
  const [loadingRows, setLoadingRows] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [lastLoaded, setLastLoaded] = useState(null);

  useEffect(() => {
    if (!supabase) {
      setChecking(false);
      setError(t.notConfigured);
      return;
    }
    let alive = true;
    async function restore() {
      const { data: { user: activeUser }, error: userError } =
        await supabase.auth.getUser();
      if (!alive) return;
      if (userError || !activeUser) {
        setUser(null);
        setAuthorized(false);
        setChecking(false);
        return;
      }
      const { data, error: authorizationError } = await supabase
        .from('engagement_admins')
        .select('user_id')
        .eq('user_id', activeUser.id)
        .maybeSingle();
      if (!alive) return;
      setUser(activeUser);
      setAuthorized(!authorizationError && Boolean(data));
      setChecking(false);
    }
    restore();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (!authorized || !user || !supabase) return;
    let cancelled = false;
    async function fetchRows() {
      setLoadingRows(true);
      setError('');
      try {
        const all = [];
        const pageSize = 500;
        for (let start = 0; ; start += pageSize) {
          const { data, error: queryError } = await supabase
            .from('engagement_rsvps')
            .select('id, guest_name, attendance_status, guest_count, message, created_at')
            .order('created_at', { ascending: false })
            .range(start, start + pageSize - 1);
          if (queryError) throw queryError;
          all.push(...(data || []));
          if (!data || data.length < pageSize) break;
        }
        if (!cancelled) {
          setRows(all);
          setLastLoaded(new Date());
        }
      } catch (err) {
        console.error('Admin load error:', err);
        if (!cancelled) setError(t.loadError);
      } finally {
        if (!cancelled) setLoadingRows(false);
      }
    }
    // Refresh the dashboard by dispatching the local custom event.
    const refresh = () => { fetchRows(); };
    window.addEventListener('engagement:refresh', refresh);
    fetchRows();
    return () => {
      cancelled = true;
      window.removeEventListener('engagement:refresh', refresh);
    };
  }, [authorized, user]);

  async function login(event) {
    event.preventDefault();
    if (!supabase || busy) return;
    setBusy(true);
    setError('');
    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email: email.trim(), password
    });
    setBusy(false);
    setPassword('');
    if (loginError || !data.user) {
      setError(t.loginError);
      return;
    }
    const { data: membership, error: memberError } = await supabase
      .from('engagement_admins')
      .select('user_id')
      .eq('user_id', data.user.id)
      .maybeSingle();
    setUser(data.user);
    setAuthorized(!memberError && Boolean(membership));
    if (memberError || !membership) setError(t.unauthorized);
  }

  async function logout() {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
    setAuthorized(false);
    setRows([]);
    setError('');
  }

  async function removeRow(row) {
    if (!supabase || !window.confirm(`${t.deleteAsk} ${row.guest_name}?`)) return;
    setError('');
    const { data, error: deleteError } = await supabase
      .from('engagement_rsvps')
      .delete()
      .eq('id', row.id)
      .select('id');
    if (deleteError || !data || data.length !== 1) {
      setError(t.deletionError);
      return;
    }
    setRows((existing) => existing.filter((item) => item.id !== row.id));
  }

  function downloadCsv() {
    const cols = ['Guest name', 'Attendance status', 'Number of attendees', 'Message', 'Submitted at'];
    const lines = [cols.map(csvField).join(',')];
    visibleRows.forEach((row) => {
      lines.push([
        row.guest_name, row.attendance_status, row.guest_count,
        row.message || '', row.created_at
      ].map(csvField).join(','));
    });
    const csv = '\ufeff' + lines.join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'engagement-rsvps.csv';
    anchor.click();
    URL.revokeObjectURL(url);
  }

  const visibleRows = rows.filter((row) => {
    const matchesStatus = status === 'all' || row.attendance_status === status;
    const haystack = `${row.guest_name} ${row.message || ''}`.toLowerCase();
    return matchesStatus && haystack.includes(search.trim().toLowerCase());
  });
  const attendingRows = rows.filter((r) => r.attendance_status === 'attending');
  const totals = {
    responses: rows.length,
    attending: attendingRows.length,
    guests: attendingRows.reduce((sum, r) => sum + r.guest_count, 0),
    declined: rows.filter((r) => r.attendance_status === 'not_attending').length,
    unsure: rows.filter((r) => r.attendance_status === 'maybe').length
  };

  const statusLabel = (s) => s === 'attending'
    ? t.attending : s === 'not_attending' ? t.declined : t.unsure;
  const dateFormat = (raw) => new Intl.DateTimeFormat(language === 'ar' ? 'ar-EG' : 'en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    timeZone: 'Africa/Cairo'
  }).format(new Date(raw));

  return (
    <main className="admin-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <header className="admin-header">
        <div><p className="admin-eyebrow">✦ ENGAGEMENT ✦</p><h1>{t.heading}</h1><p>{t.subtitle}</p></div>
        <div className="admin-header-actions">
          <button type="button" className="admin-outline" onClick={changeLanguage}>
            {language === 'ar' ? 'English' : 'العربية'}
          </button>
          <a className="admin-outline" href="#">{t.back}</a>
          {user && <button className="admin-outline" type="button" onClick={logout}>{t.signOut}</button>}
        </div>
      </header>

      {checking ? <p className="admin-center">{t.loading}</p> : !user ? (
        <form className="admin-login" onSubmit={login}>
          <h2>{t.signIn}</h2><p>{t.loginHelp}</p>
          <label htmlFor="admin-email">{t.email}</label>
          <input id="admin-email" type="email" autoComplete="username" value={email}
            onChange={(e) => setEmail(e.target.value)} required />
          <label htmlFor="admin-password">{t.password}</label>
          <input id="admin-password" type="password" autoComplete="current-password" value={password}
            onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="admin-error" role="alert">{error}</p>}
          <button className="admin-primary" type="submit" disabled={busy || !supabase}>
            {busy ? t.signingIn : t.signIn}
          </button>
        </form>
      ) : !authorized ? (
        <div className="admin-login"><p className="admin-error" role="alert">{t.unauthorized}</p></div>
      ) : (
        <div className="admin-content">
          <div className="admin-stats">
            {[
              [t.total, totals.responses], [t.yes, totals.attending],
              [t.guests, totals.guests], [t.no, totals.declined], [t.maybe, totals.unsure]
            ].map(([label, value]) => (
              <div className="admin-stat" key={label}><span>{label}</span><strong>{value}</strong></div>
            ))}
          </div>
          <div className="admin-toolbar">
            <input type="search" aria-label={t.search} placeholder={t.search} value={search}
              onChange={(e) => setSearch(e.target.value)} />
            <select aria-label={t.status} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="all">{t.all}</option>
              <option value="attending">{t.attending}</option>
              <option value="not_attending">{t.declined}</option>
              <option value="maybe">{t.unsure}</option>
            </select>
            <button type="button" className="admin-outline" disabled={loadingRows}
              onClick={() => window.dispatchEvent(new Event('engagement:refresh'))}>{t.refresh}</button>
            <button type="button" className="admin-primary" onClick={downloadCsv}
              disabled={loadingRows || !visibleRows.length}>{t.export}</button>
          </div>
          {lastLoaded && <p className="admin-meta">{t.lastUpdated}: {dateFormat(lastLoaded)} · {t.showing}: {visibleRows.length}</p>}
          {error && <p className="admin-error" role="alert">{error}</p>}
          {loadingRows ? <p className="admin-center">{t.loading}</p> : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr>
                  <th>{t.guest}</th><th>{t.status}</th><th>{t.count}</th>
                  <th>{t.message}</th><th>{t.submitted}</th><th>{t.actions}</th>
                </tr></thead>
                <tbody>
                  {!visibleRows.length ? (
                    <tr><td colSpan={6} className="admin-center">{t.empty}</td></tr>
                  ) : visibleRows.map((row) => (
                    <tr key={row.id}>
                      <td className="admin-guest-name">{row.guest_name}</td>
                      <td><span className={`admin-status admin-status-${row.attendance_status}`}>
                        {statusLabel(row.attendance_status)}</span></td>
                      <td>{row.guest_count}</td>
                      <td className="admin-message">{row.message || t.noMessage}</td>
                      <td>{dateFormat(row.created_at)}</td>
                      <td><button type="button" className="admin-delete" onClick={() => removeRow(row)}>{t.remove}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function App() {
  const [language, setLanguage] = useState('en');
  const [screen, setScreen] = useState('cover');
  const [adminRoute, setAdminRoute] = useState(() => window.location.hash === '#admin');
  const musicRef = useRef(null);
  const fadeFrameRef = useRef(null);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicError, setMusicError] = useState(false);
  useEffect(() => {
    const sync = () => setAdminRoute(window.location.hash === '#admin');
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  const isArabic = language === 'ar';
  const t = translations[language];
  const names = isArabic ? event.namesAr : event.namesEn;
  const venue = isArabic ? event.venueAr : event.venueEn;
  const address = isArabic ? event.addressAr : event.addressEn;
  const date = new Date(event.dateTime);
  const formattedDate = new Intl.DateTimeFormat(isArabic ? 'ar-EG' : 'en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Cairo'
  }).format(date);
  const formattedTime = new Intl.DateTimeFormat(isArabic ? 'ar-EG' : 'en-US', {
    hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'Africa/Cairo'
  }).format(date);

  // Prepare the artwork used immediately after the envelope opens.
  // Other photos and lower-page decorations remain lazy-loaded.
  useEffect(() => {
    if (adminRoute) return;
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://ggewmhvjrnibzgzhusaa.supabase.co';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    const warm = ['/couple-photo.webp', flowers.photoLeft, flowers.photoRight];
    const warmedImages = warm.map((url) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = url;
      return image;
    });
    return () => {
      // Keep the warmed images in the browser cache; remove only the hint.
      if (link.parentNode) link.parentNode.removeChild(link);
      void warmedImages;
    };
  }, [adminRoute]);

  useScrollFlowers(screen === 'invitation' && !adminRoute);
  useEffect(() => {
    if (screen !== 'opening') return;
    const timer = window.setTimeout(() => {
      window.scrollTo(0, 0);
      setScreen('invitation');
    }, 1750);
    return () => window.clearTimeout(timer);
  }, [screen]);

  // Audio is started directly from the envelope button's click handler.
  // This is important because mobile browsers block unprompted autoplay.
  function cancelMusicFade() {
    if (fadeFrameRef.current !== null) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }

  function fadeMusicIn(audio) {
    cancelMusicFade();
    audio.volume = 0;
    const started = performance.now();
    const duration = 1800;
    const targetVolume = 0.38;
    function tick(now) {
      if (audio.paused) {
        fadeFrameRef.current = null;
        return;
      }
      const progress = Math.min(1, (now - started) / duration);
      audio.volume = targetVolume * (progress * (2 - progress));
      if (progress < 1) fadeFrameRef.current = window.requestAnimationFrame(tick);
      else fadeFrameRef.current = null;
    }
    fadeFrameRef.current = window.requestAnimationFrame(tick);
  }

  function playMusic() {
    const audio = musicRef.current;
    if (!audio) return;
    setMusicError(false);
    cancelMusicFade();
    audio.muted = false;
    audio.volume = 0;
    try {
      const promise = audio.play();
      if (promise && typeof promise.then === 'function') {
        promise.then(() => {
          setMusicPlaying(true);
          fadeMusicIn(audio);
        }).catch((error) => {
          console.warn('Invitation music could not play:', error);
          setMusicPlaying(false);
          setMusicError(true);
        });
      } else {
        setMusicPlaying(true);
        fadeMusicIn(audio);
      }
    } catch (error) {
      console.warn('Invitation music could not play:', error);
      setMusicPlaying(false);
      setMusicError(true);
    }
  }

  function toggleMusic() {
    const audio = musicRef.current;
    if (!audio) return;
    if (!audio.paused) {
      cancelMusicFade();
      audio.pause();
      setMusicPlaying(false);
    } else {
      playMusic();
    }
  }

  useEffect(() => () => {
    if (fadeFrameRef.current !== null) window.cancelAnimationFrame(fadeFrameRef.current);
  }, []);

  function openInvitation() {
    if (screen !== 'cover') return;
    playMusic();
    setScreen('opening');
  }

  if (adminRoute) {
    return <AdminDashboard language={language} changeLanguage={() => setLanguage(isArabic ? 'en' : 'ar')} />;
  }

  return (
    <main className={`invitation-site ${screen}`} dir={isArabic ? 'rtl' : 'ltr'} lang={language}>
      <audio
        ref={musicRef}
        src={backgroundMusicUrl}
        preload="auto"
        loop
        onError={() => { setMusicPlaying(false); setMusicError(true); }}
        onPause={() => setMusicPlaying(false)}
        onPlay={() => setMusicPlaying(true)}
        aria-hidden="true"
      />
      {screen !== 'cover' && (
        <div className="music-controls">
          <button
            className={`music-toggle ${musicPlaying ? 'music-toggle-active' : ''}`}
            type="button"
            onClick={toggleMusic}
            aria-label={musicPlaying ? t.musicOn : t.musicOff}
            title={musicPlaying ? t.musicOn : t.musicOff}
            aria-pressed={musicPlaying}
          >
            <span className="music-icon" aria-hidden="true">{musicPlaying ? '♫' : '♪'}</span>
            <span className="music-text">{musicPlaying ? t.musicOn : t.musicOff}</span>
          </button>
          {musicError && <p className="music-error" role="status">{t.musicUnavailable}</p>}
        </div>
      )}
      <button className="language-button" type="button"
        onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
        aria-label={isArabic ? 'Switch to English' : 'Switch to Arabic'}>
        <span aria-hidden="true">◎</span> {isArabic ? 'English' : 'العربية'}
      </button>

      {screen !== 'invitation' ? (
        <section className="cover-screen">
          <div className="cover-side cover-side-left">
            <img src={flowers.section1} alt="" aria-hidden="true" decoding="async" loading="eager" fetchPriority="high" />
          </div>
          <div className="cover-side cover-side-right">
            <img src={flowers.section1} className="cover-mirror-image" alt="" aria-hidden="true" decoding="async" loading="eager" fetchPriority="high" />
          </div>
          <div className="cover-content">
            <div className="ornament">✦ ─── ♡ ─── ✦</div>
            <p className="eyebrow">{t.openingLabel}</p>
            <h1>{t.openingTitle}</h1>
            <p className="cover-subtitle">{t.openingSubtitle}</p>
            <div className={`envelope-stage ${screen === 'opening' ? 'is-opening' : ''}`}>
              <div className="new-envelope">
                <div className="envelope-back" />
                <div className="envelope-paper"><span>✦</span><b>{names}</b><span>♡</span></div>
                <div className="envelope-flap" /><div className="envelope-pocket" />
                <div className="wax-seal">♡</div>
              </div>
            </div>
            <button className="primary-button" type="button" onClick={openInvitation} disabled={screen === 'opening'}>
              {t.open}<span aria-hidden="true">✧</span>
            </button>
            <div className="bottom-ornament">✧ ❦ ✧</div>
          </div>
        </section>
      ) : (
        <div className="invitation-content">
          <section className="intro-section">
            <div className="intro-heading">
              <p className="eyebrow">{t.families}</p>
              <div className="ornament">✦ ─── ♡ ─── ✦</div>
              <h1 className="couple-names">{names}</h1>
              <p className="script-heading">{t.engagement}</p>
            </div>
            <CouplePhoto t={t} />
            <div className="intro-message-area">
              <h2>{t.welcome}</h2>
              <p className="intro-message">{t.message}</p>
              <div className="ornament">❦</div>
              <p className="scroll-hint">{t.scroll}</p>
              <span className="scroll-arrow" aria-hidden="true">↓</span>
            </div>
          </section>

          <StoryMoments t={t} isArabic={isArabic} />

          <FloralSection className="celebration-section" leftImage={flowers.section1} rightImage={flowers.section3} eagerFlowers>
            <p className="eyebrow">✦ {t.engagement} ✦</p><h2>{t.celebration}</h2>
            <div className="info-grid">
              <article className="info-card info-card-date">
                <span className="detail-symbol">✧</span>
                <h3>{t.date}</h3>
                <p>{formattedDate}</p>
                <div className="info-card-visual"><EngagementCalendar t={t} /></div>
              </article>
              <article className="info-card info-card-time">
                <span className="detail-symbol">◷</span>
                <h3>{t.time}</h3>
                <p>{formattedTime}</p>
                <div className="info-card-visual"><EngagementClock /></div>
              </article>
              <article className="info-card info-card-venue">
                <span className="detail-symbol">⌖</span>
                <h3>{t.venue}</h3>
                <p>{venue || t.soon}</p>
                <div className="info-card-visual venue-photo-wrap">
                  <img
                    src={event.venuePhoto}
                    alt={venue || 'The Garden Venue'}
                    className="venue-preview-image"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </div>
          </FloralSection>

          <FloralSection className="location-section location-symmetric" leftImage={flowers.section1} rightImage={flowers.section1}>
            <p className="eyebrow">{t.location}</p><h2>{t.findUs}</h2>
            <div className="ornament">✧ ❦ ✧</div>
            <div className="venue-card">
              <div className="venue-map">
                {event.mapsEmbedUrl ? (
                  <iframe src={event.mapsEmbedUrl} title={t.findUs} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
                ) : (
                  <div className="map-empty"><span>⌖</span><p>{t.mapPlaceholder}</p></div>
                )}
              </div>
              <div className="venue-details">
                <span className="detail-symbol">⌖</span>
                <h3>{venue || t.soon}</h3><p>{address || t.address}</p>
                {event.mapsUrl && <a className="primary-button" href={event.mapsUrl} target="_blank" rel="noopener noreferrer">{t.directions}</a>}
              </div>
            </div>
          </FloralSection>

          <FloralSection className="countdown-section countdown-symmetric" leftImage={flowers.section4} rightImage={flowers.section4}>
            <p className="eyebrow">✦ ♡ ✦</p><h2>{t.countdown}</h2><Countdown t={t} />
          </FloralSection>

          <FloralSection className="rsvp-section rsvp-symmetric" leftImage={flowers.section1} rightImage={flowers.section1}>
            <div className="ornament">❦</div>
            <h2>{t.rsvp}</h2><p>{t.rsvpMessage}</p>
            <RSVPForm t={t} language={language} />
          </FloralSection>

          <footer className="site-footer">
            <div className="ornament">✦ ─── ♡ ─── ✦</div><p>{t.footer} ♡</p>
          </footer>
        </div>
      )}
    </main>
  );
}

export default App;
