
import { useEffect, useState } from 'react';
import './App.css';

/* ==========================================
   ENGAGEMENT DETAILS
========================================== */

const event = {
  namesEn: 'Our Names',
  namesAr: 'أسماؤنا',
  dateTime: '2026-12-18T19:00:00+02:00',
  venueEn: '',
  venueAr: '',
  addressEn: '',
  addressAr: '',
  mapsUrl: '',
  mapsEmbedUrl: ''
};

/* ==========================================
   SUPABASE IMAGE URLS

   Confirmed .webp URLs supplied by you.
========================================== */

const flowers = {
  photoLeft:
    'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/photo-left.webp',

  photoRight:
    'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/photo-right.webp',

  section1:
    'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/section-1.webp',

  section2:
    'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/section-2.webp',

  section3:
    'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/section-3.webp',

  section4:
    'https://ggewmhvjrnibzgzhusaa.supabase.co/storage/v1/object/public/invitation-assets/section-4.webp'
};

/* ==========================================
   TRANSLATIONS
========================================== */

const translations = {
  en: {
    openingLabel: 'YOU ARE INVITED',
    openingTitle: 'A Beautiful Beginning',
    openingSubtitle: 'A special moment, made sweeter together.',
    open: 'Open Our Invitation',

    families: 'TOGETHER WITH OUR FAMILIES',
    engagement: 'Our Engagement',
    welcome: 'A Little Celebration of Us',
    message:
      'With happiness in our hearts, we invite you to share the joy of our engagement celebration.',

    celebration: 'The Celebration',
    date: 'The Date',
    time: 'The Time',
    venue: 'The Venue',
    soon: 'To be announced',

    location: 'THE LOCATION',
    findUs: 'Join Us Here',
    address: 'Venue address coming soon',
    mapPlaceholder: 'Our celebration venue will appear here',
    directions: 'Get Directions',

    countdown: 'Until Our Engagement',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    started: 'Our engagement day is here!',

    rsvp: 'Will You Join Us?',
    rsvpMessage:
      'We would be so happy to celebrate our engagement with you.',
    rsvpSoon:
      'Attendance confirmation will be available soon.',

    footer: 'Made with love',
    scroll: 'SCROLL TO EXPLORE',
    photoAlt: 'Our photograph together',
    photoMissing: 'Our photograph will appear here'
  },

  ar: {
    openingLabel: 'نتشرف بدعوتكم',
    openingTitle: 'بداية حكاية جميلة',
    openingSubtitle: 'فرحتنا تحلى بوجودكم معانا.',
    open: 'افتح دعوتنا',

    families: 'بمشاركة أهلنا وأحبابنا',
    engagement: 'حفل خطوبتنا',
    welcome: 'فرحة صغيرة وحكاية كبيرة',
    message:
      'بكل الحب والسعادة، يسعدنا دعوتكم لمشاركتنا فرحة خطوبتنا والاحتفال معانا باليوم المميز ده.',

    celebration: 'تفاصيل الحفل',
    date: 'التاريخ',
    time: 'الساعة',
    venue: 'المكان',
    soon: 'سيتم الإعلان قريبًا',

    location: 'موقع الحفل',
    findUs: 'مستنيينكم هنا',
    address: 'سيتم إضافة عنوان المكان قريبًا',
    mapPlaceholder: 'سيظهر موقع الحفل هنا',
    directions: 'افتح خرائط جوجل',

    countdown: 'العد التنازلي لخطوبتنا',
    days: 'يوم',
    hours: 'ساعة',
    minutes: 'دقيقة',
    seconds: 'ثانية',
    started: 'يوم خطوبتنا جه!',

    rsvp: 'هتنورونا؟',
    rsvpMessage:
      'وجودكم معانا هيكمل فرحتنا في يوم خطوبتنا.',
    rsvpSoon:
      'سيتم تفعيل تأكيد الحضور قريبًا.',

    footer: 'صُنع بكل حب',
    scroll: 'انزل لتكتشف باقي الدعوة',
    photoAlt: 'صورتنا مع بعض',
    photoMissing: 'صورتنا هتظهر هنا'
  }
};

/* ==========================================
   REVERSIBLE SCROLL ANIMATION

   Scroll down: flowers slide in.
   Scroll up: flowers slide back.

   Each image stays inside its own side rail.
========================================== */

function useScrollFlowers(active) {
  useEffect(() => {
    if (!active) return;

    const sections = Array.from(
      document.querySelectorAll('[data-flower-section]')
    );

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );

    let frame = null;

    function update() {
      frame = null;

      const viewportHeight = window.innerHeight;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        const start = viewportHeight * 0.92;
        const finish = viewportHeight * 0.35;

        const raw = (start - rect.top) / (start - finish);

        const progress = reduceMotion.matches
          ? 1
          : Math.max(0, Math.min(1, raw));

        const smooth =
          progress * progress * (3 - 2 * progress);

        section.style.setProperty(
          '--flower-progress',
          smooth.toFixed(4)
        );
      });
    }

    function scheduleUpdate() {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(update);
    }

    update();

    window.addEventListener('scroll', scheduleUpdate, {
      passive: true
    });

    window.addEventListener('resize', scheduleUpdate);

    reduceMotion.addEventListener?.(
      'change',
      scheduleUpdate
    );

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);

      reduceMotion.removeEventListener?.(
        'change',
        scheduleUpdate
      );

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [active]);
}

/* ==========================================
   DECORATIVE SIDE RAIL

   The rail clips the image so it cannot
   cover the central text or event cards.
========================================== */

function FlowerRail({
  image,
  side,
  className = '',
  lazy = true
}) {
  return (
    <div
      className={`flower-rail flower-rail-${side} ${className}`}
      aria-hidden="true"
    >
      <img
        src={image}
        alt=""
        className="rail-flower"
        draggable="false"
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
      />
    </div>
  );
}

/* ==========================================
   REUSABLE DECORATED SECTION
========================================== */

function FloralSection({
  children,
  className = '',
  leftImage,
  rightImage
}) {
  return (
    <section
      className={`content-section floral-section ${className}`}
      data-flower-section
    >
      <FlowerRail
        image={leftImage}
        side="left"
      />

      <FlowerRail
        image={rightImage}
        side="right"
      />

      <div className="section-inner">
        {children}
      </div>
    </section>
  );
}

/* ==========================================
   COUNTDOWN
========================================== */

function calculateRemaining() {
  const target = new Date(event.dateTime).getTime();

  if (!Number.isFinite(target)) return null;

  const difference = Math.max(0, target - Date.now());

  return {
    days: Math.floor(difference / 86400000),
    hours: Math.floor(difference / 3600000) % 24,
    minutes: Math.floor(difference / 60000) % 60,
    seconds: Math.floor(difference / 1000) % 60,
    finished: difference === 0
  };
}

function Countdown({ t }) {
  const [remaining, setRemaining] = useState(
    calculateRemaining
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(calculateRemaining());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  if (!remaining) return null;

  if (remaining.finished) {
    return (
      <p className="countdown-finished">
        {t.started}
      </p>
    );
  }

  const units = [
    ['days', remaining.days, t.days],
    ['hours', remaining.hours, t.hours],
    ['minutes', remaining.minutes, t.minutes],
    ['seconds', remaining.seconds, t.seconds]
  ];

  return (
    <div className="countdown-grid">
      {units.map(([key, value, label]) => (
        <div className="countdown-box" key={key}>
          <strong>
            {String(value).padStart(2, '0')}
          </strong>

          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ==========================================
   PHOTOGRAPH

   The photo bouquets animate independently
   when the invitation screen appears.
========================================== */

function CouplePhoto({ t }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="photo-scene">
      <img
        src={flowers.photoLeft}
        alt=""
        className="photo-bouquet photo-bouquet-left"
        aria-hidden="true"
        draggable="false"
        decoding="async"
      />

      <img
        src={flowers.photoRight}
        alt=""
        className="photo-bouquet photo-bouquet-right"
        aria-hidden="true"
        draggable="false"
        decoding="async"
      />

      <div className="photo-frame">
        {failed ? (
          <div className="photo-fallback">
            <span>♡</span>
            <p>{t.photoMissing}</p>
          </div>
        ) : (
          <img
            src="/couple-photo.png"
            alt={t.photoAlt}
            onError={() => setFailed(true)}
            decoding="async"
            fetchPriority="high"
          />
        )}
      </div>

      <span
        className="photo-sparkle photo-sparkle-left"
        aria-hidden="true"
      >
        ✧
      </span>

      <span
        className="photo-sparkle photo-sparkle-right"
        aria-hidden="true"
      >
        ✦
      </span>
    </div>
  );
}

/* ==========================================
   MAIN APPLICATION
========================================== */

function App() {
  const [language, setLanguage] = useState('en');
  const [screen, setScreen] = useState('cover');

  const isArabic = language === 'ar';
  const t = translations[language];

  const names = isArabic
    ? event.namesAr
    : event.namesEn;

  const venue = isArabic
    ? event.venueAr
    : event.venueEn;

  const address = isArabic
    ? event.addressAr
    : event.addressEn;

  const date = new Date(event.dateTime);

  const formattedDate = new Intl.DateTimeFormat(
    isArabic ? 'ar-EG' : 'en-GB',
    {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Africa/Cairo'
    }
  ).format(date);

  const formattedTime = new Intl.DateTimeFormat(
    isArabic ? 'ar-EG' : 'en-US',
    {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Africa/Cairo'
    }
  ).format(date);

  useScrollFlowers(screen === 'invitation');

  useEffect(() => {
    if (screen !== 'opening') return;

    const timer = window.setTimeout(() => {
      window.scrollTo(0, 0);
      setScreen('invitation');
    }, 1750);

    return () => window.clearTimeout(timer);
  }, [screen]);

  function openInvitation() {
    if (screen !== 'cover') return;

    // Start loading photo flowers as the envelope opens.
    [flowers.photoLeft, flowers.photoRight].forEach((url) => {
      const image = new Image();
      image.src = url;
    });

    setScreen('opening');
  }

  function toggleLanguage() {
    setLanguage((current) =>
      current === 'en' ? 'ar' : 'en'
    );
  }

  return (
    <main
      className={`invitation-site ${screen}`}
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={language}
    >
      {/* LANGUAGE BUTTON */}

      <button
        className="language-button"
        type="button"
        onClick={toggleLanguage}
        aria-label={
          isArabic
            ? 'Switch to English'
            : 'Switch to Arabic'
        }
      >
        <span aria-hidden="true">◎</span>
        {isArabic ? 'English' : 'العربية'}
      </button>

      {screen !== 'invitation' ? (

        /* SCREEN 1 — ENVELOPE */

        <section className="cover-screen">
          <div className="cover-side cover-side-left">
            <img
              src={flowers.section1}
              alt=""
              aria-hidden="true"
              decoding="async"
            />
          </div>

          <div className="cover-side cover-side-right">
            <img
              src={flowers.section2}
              alt=""
              aria-hidden="true"
              decoding="async"
            />
          </div>

          <div className="cover-content">
            <div className="ornament">
              ✦ ─── ♡ ─── ✦
            </div>

            <p className="eyebrow">
              {t.openingLabel}
            </p>

            <h1>{t.openingTitle}</h1>

            <p className="cover-subtitle">
              {t.openingSubtitle}
            </p>

            <div
              className={`envelope-stage ${
                screen === 'opening'
                  ? 'is-opening'
                  : ''
              }`}
            >
              <div className="new-envelope">
                <div className="envelope-back" />

                <div className="envelope-paper">
                  <span>✦</span>
                  <b>{names}</b>
                  <span>♡</span>
                </div>

                <div className="envelope-flap" />
                <div className="envelope-pocket" />
                <div className="wax-seal">♡</div>
              </div>
            </div>

            <button
              className="primary-button"
              type="button"
              onClick={openInvitation}
              disabled={screen === 'opening'}
            >
              {t.open}
              <span aria-hidden="true">✧</span>
            </button>

            <div className="bottom-ornament">
              ✧ ❦ ✧
            </div>
          </div>
        </section>

      ) : (

        /* SCREEN 2 — ENGAGEMENT INVITATION */

        <div className="invitation-content">

          {/* INTRODUCTION */}

          <section className="intro-section">
            <div className="intro-heading">
              <p className="eyebrow">
                {t.families}
              </p>

              <div className="ornament">
                ✦ ─── ♡ ─── ✦
              </div>

              <h1 className="couple-names">
                {names}
              </h1>

              <p className="script-heading">
                {t.engagement}
              </p>
            </div>

            <CouplePhoto t={t} />

            <div className="intro-message-area">
              <h2>{t.welcome}</h2>

              <p className="intro-message">
                {t.message}
              </p>

              <div className="ornament">
                ❦
              </div>

              <p className="scroll-hint">
                {t.scroll}
              </p>

              <span
                className="scroll-arrow"
                aria-hidden="true"
              >
                ↓
              </span>
            </div>
          </section>

          {/* EVENT DETAILS */}

          <FloralSection
            className="celebration-section"
            leftImage={flowers.section1}
            rightImage={flowers.section3}
          >
            <p className="eyebrow">
              ✦ {t.engagement} ✦
            </p>

            <h2>{t.celebration}</h2>

            <div className="info-grid">
              <article className="info-card">
                <span className="detail-symbol">✧</span>
                <h3>{t.date}</h3>
                <p>{formattedDate}</p>
              </article>

              <article className="info-card">
                <span className="detail-symbol">◷</span>
                <h3>{t.time}</h3>
                <p>{formattedTime}</p>
              </article>

              <article className="info-card">
                <span className="detail-symbol">⌖</span>
                <h3>{t.venue}</h3>
                <p>{venue || t.soon}</p>
              </article>
            </div>
          </FloralSection>

          {/* LOCATION AND GOOGLE MAPS */}

          <FloralSection
            className="location-section"
            leftImage={flowers.section2}
            rightImage={flowers.section4}
          >
            <p className="eyebrow">{t.location}</p>

            <h2>{t.findUs}</h2>

            <div className="ornament">
              ✧ ❦ ✧
            </div>

            <div className="venue-card">
              <div className="venue-map">
                {event.mapsEmbedUrl ? (
                  <iframe
                    src={event.mapsEmbedUrl}
                    title={t.findUs}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                ) : (
                  <div className="map-empty">
                    <span>⌖</span>
                    <p>{t.mapPlaceholder}</p>
                  </div>
                )}
              </div>

              <div className="venue-details">
                <span className="detail-symbol">⌖</span>
                <h3>{venue || t.soon}</h3>
                <p>{address || t.address}</p>

                {event.mapsUrl && (
                  <a
                    className="primary-button"
                    href={event.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.directions}
                  </a>
                )}
              </div>
            </div>
          </FloralSection>

          {/* LIVE COUNTDOWN */}

          <FloralSection
            className="countdown-section"
            leftImage={flowers.section3}
            rightImage={flowers.section2}
          >
            <p className="eyebrow">✦ ♡ ✦</p>

            <h2>{t.countdown}</h2>

            <Countdown t={t} />
          </FloralSection>

          {/* RSVP PLACEHOLDER */}

          <FloralSection
            className="rsvp-section"
            leftImage={flowers.section4}
            rightImage={flowers.section1}
          >
            <div className="ornament">❦</div>

            <h2>{t.rsvp}</h2>

            <p>{t.rsvpMessage}</p>

            <p className="rsvp-note">
              {t.rsvpSoon}
            </p>
          </FloralSection>

          {/* FOOTER */}

          <footer className="site-footer">
            <div className="ornament">
              ✦ ─── ♡ ─── ✦
            </div>

            <p>{t.footer} ♡</p>
          </footer>

        </div>
      )}
    </main>
  );
}

export default App;
