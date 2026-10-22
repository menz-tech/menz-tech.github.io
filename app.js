/* Menz Tech site: renders everything from content.json (edit it via /admin/). */
(() => {
  'use strict';

  /* ---------- Fixed interface strings (not edited from the admin) ---------- */
  const STR = {
    ar: {
      dir: 'rtl', switchTo: 'English', menu: 'القائمة',
      nav: { services: 'الخدمات', why: 'ليش منز', process: 'طريقة العمل', gallery: 'أعمالنا', faq: 'أسئلة', contact: 'تواصل' },
      wa: 'واتساب', request: 'اطلب هذي الخدمة', cover: 'نغطي',
      form: {
        name: 'الاسم', service: 'الخدمة المطلوبة', pick: 'اختار الخدمة', multi: 'أكثر من خدمة',
        date: 'تاريخ الفعالية', place: 'مكان الفعالية', guests: 'عدد الحضور', notes: 'تفاصيل إضافية',
        send: 'أرسل الطلب على واتساب', hint: 'يفتح واتساب والرسالة جاهزة، بس اضغط إرسال.'
      },
      msg: {
        hello: 'هلا منز تك، أريد أطلب خدمة:', name: 'الاسم', service: 'الخدمة', date: 'التاريخ',
        place: 'المكان', guests: 'عدد الحضور', notes: 'تفاصيل'
      },
      info: { whatsapp: 'واتساب', phone: 'اتصال', email: 'البريد', instagram: 'انستغرام', address: 'العنوان', hours: 'الدوام', map: 'الموقع' },
      openMap: 'افتح الخريطة', rights: 'جميع الحقوق محفوظة', close: 'إغلاق',
      loadErr: 'ما كدرنا نحمّل محتوى الموقع. افتح الموقع من رابط GitHub Pages، وتأكد إن الملف content.json موجود.'
    },
    en: {
      dir: 'ltr', switchTo: 'عربي', menu: 'Menu',
      nav: { services: 'Services', why: 'Why Menz', process: 'How it works', gallery: 'Our work', faq: 'FAQ', contact: 'Contact' },
      wa: 'WhatsApp', request: 'Request this service', cover: 'We cover',
      form: {
        name: 'Name', service: 'Service needed', pick: 'Choose a service', multi: 'More than one service',
        date: 'Event date', place: 'Event venue', guests: 'Number of guests', notes: 'Extra details',
        send: 'Send request on WhatsApp', hint: 'WhatsApp opens with your message ready. Just press send.'
      },
      msg: {
        hello: 'Hello Menz Tech, I would like to request a service:', name: 'Name', service: 'Service', date: 'Date',
        place: 'Venue', guests: 'Guests', notes: 'Details'
      },
      info: { whatsapp: 'WhatsApp', phone: 'Phone', email: 'Email', instagram: 'Instagram', address: 'Address', hours: 'Hours', map: 'Map' },
      openMap: 'Open the map', rights: 'All rights reserved', close: 'Close',
      loadErr: 'Could not load the site content. Open the site from its GitHub Pages link and make sure content.json exists.'
    }
  };

  /* ---------- Icons ---------- */
  const ICONS = {
    record: '<rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/>',
    live: '<circle cx="12" cy="12" r="2"/><path d="M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2"/>',
    screen: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
    audio: '<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/>',
    robot: '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 8V4"/><circle cx="12" cy="3.5" r=".6"/><circle cx="9.5" cy="13" r="1"/><circle cx="14.5" cy="13" r="1"/><path d="M9.5 16.5h5M3 12v3M21 12v3"/>',
    signage: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/>',
    code: '<path d="M8 8l-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>',
    event: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    support: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',
    light: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/><circle cx="12" cy="13.5" r="3.5"/>'
  };
  const icon = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k] || ICONS.event}</svg>`;
  const WA_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5.2A8.5 8.5 0 1 1 21 11.5z"/><path d="M8.5 9.5c0 3 3 6 6 6l1.2-1.5-2-1-.9.7c-.8-.4-1.600-1.200-2-2l.7-.9-1-2z" fill="currentColor" stroke="none"/></svg>';
  const MARK_SVG = '<svg viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" rx="14" fill="#2547F0"/><path d="M24 18l22 14-22 14z" fill="#fff"/></svg>';
  const MENU_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';

  /* ---------- State and helpers ---------- */
  let DATA = null;
  let lang = 'ar';
  const startedAt = Date.now();

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const t = (o) => {
    if (o == null) return '';
    if (typeof o === 'string') return o;
    return o[lang] || o.ar || o.en || '';
  };

  const asset = (p) => {
    if (!p) return '';
    if (/^(https?:|data:)/i.test(p)) return p;
    return p.replace(/^\/+/, '');
  };

  const list = (x) => (Array.isArray(x) ? x : []);

  function waNumber(S) {
    let n = String(S.whatsapp || '').replace(/\D/g, '');
    if (n.startsWith('00')) n = n.slice(2);
    if (n.startsWith('07') && n.length === 11) n = '964' + n.slice(1);
    if (n.startsWith('7') && n.length === 10) n = '964' + n;
    return n.length >= 10 ? n : '';
  }

  function igHandle(S) {
    return String(S.instagram || '').trim().replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/.*$/, '');
  }

  function waLink(S, text) {
    const n = waNumber(S);
    if (n) return `https://wa.me/${n}${text ? '?text=' + encodeURIComponent(text) : ''}`;
    const ig = igHandle(S);
    return ig ? `https://ig.me/m/${ig}` : '#contact';
  }

  /* ---------- Section renderers ---------- */
  function renderHeader(S, visible) {
    const s = STR[lang];
    const logo = S.logo
      ? `<img src="${esc(asset(S.logo))}" alt="${esc(t(S.brand))}">`
      : `${MARK_SVG}<span>${esc(t(S.brand))}</span>`;
    const links = visible.map((id) => `<a href="#${id}">${esc(s.nav[id])}</a>`).join('');
    return `
      <header class="top">
        <div class="wrap">
          <a class="brand" href="#top" aria-label="${esc(t(S.brand))}">${logo}</a>
          <button class="menu-btn" type="button" data-menu aria-label="${esc(s.menu)}" aria-expanded="false">${MENU_SVG}</button>
          <nav class="nav" id="nav">
            ${links}
            <button class="lang-btn" type="button" data-lang-toggle>${esc(s.switchTo)}</button>
            <a class="btn wa small" href="${esc(waLink(S))}" target="_blank" rel="noopener">${WA_SVG}${esc(s.wa)}</a>
          </nav>
        </div>
      </header>`;
  }

  function renderHero(S, H, E) {
    const s = STR[lang];
    const visual = H.image
      ? `<img class="shot" src="${esc(asset(H.image))}" alt="">`
      : `<div class="bars"></div>
         <div class="plate"><b>${esc(t(S.brand))}</b><span>${esc(t(S.tagline))}</span></div>`;
    const chips = list(E && E.items).map((i) => `<li class="chip">${esc(t(i))}</li>`).join('');
    const covers = chips
      ? `<div class="wrap"><ul class="covers" aria-label="${esc(t(E.title) || s.cover)}"><li><strong>${esc(t(E.title) || s.cover)}</strong></li>${chips}</ul></div>`
      : '';
    return `
      <section class="hero on-paper" id="top">
        <div class="wrap hero-grid">
          <div>
            <h1>${esc(t(H.title))}</h1>
            <p class="sub">${esc(t(H.subtitle))}</p>
            <div class="actions">
              <a class="btn" href="#contact">${esc(t(H.cta1))}</a>
              <a class="btn ghost" href="#services">${esc(t(H.cta2))}</a>
            </div>
          </div>
          <div class="monitor" role="img" aria-label="${esc(t(S.brand))}">
            ${visual}
            <span class="tag-live"><i></i>LIVE</span>
            <span class="tag-rec"><i></i>REC <b id="tc">00:00:00</b></span>
          </div>
        </div>
        ${covers}
      </section>`;
  }

  function renderServices(V) {
    const s = STR[lang];
    const items = list(V.items).map((it, idx) => {
      const pts = list(it.points).map((p) => `<li>${esc(t(p))}</li>`).join('');
      return `
        <article class="svc">
          <div class="ico">${icon(it.icon)}</div>
          <h3>${esc(t(it.title))}</h3>
          <p>${esc(t(it.desc))}</p>
          ${pts ? `<ul class="pts">${pts}</ul>` : ''}
          <a class="btn ghost small" href="#contact" data-svc="${idx}">${esc(s.request)}</a>
        </article>`;
    }).join('');
    return `
      <section class="s on-white" id="services">
        <div class="wrap">
          <div class="s-head"><h2>${esc(t(V.title))}</h2>${V.intro ? `<p class="lead">${esc(t(V.intro))}</p>` : ''}</div>
          <div class="svc-grid">${items}</div>
        </div>
      </section>`;
  }

  function renderWhy(W) {
    const items = list(W.items).map((i) => `<li><h3>${esc(t(i.title))}</h3><p>${esc(t(i.desc))}</p></li>`).join('');
    return `
      <section class="s on-paper" id="why">
        <div class="wrap why-grid">
          <div class="s-head"><h2>${esc(t(W.title))}</h2></div>
          <ul class="why-list">${items}</ul>
        </div>
      </section>`;
  }

  function renderProcess(P) {
    const digits = lang === 'ar' ? ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] : ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const steps = list(P.steps).map((st, i) => `
      <li class="step"><div class="n">${digits[i] || i + 1}</div><h3>${esc(t(st.title))}</h3><p>${esc(t(st.desc))}</p></li>`).join('');
    return `
      <section class="s on-ink" id="process">
        <div class="wrap">
          <div class="s-head"><h2>${esc(t(P.title))}</h2></div>
          <ol class="steps">${steps}</ol>
        </div>
      </section>`;
  }

  function renderGallery(G) {
    const imgs = list(G.items).filter((i) => i.image);
    if (!imgs.length) return '';
    const tiles = imgs.map((i) => {
      const cap = t(i.caption);
      return `<button type="button" data-lb="${esc(asset(i.image))}" data-cap="${esc(cap)}" aria-label="${esc(cap || 'Image')}">
        <img src="${esc(asset(i.image))}" alt="${esc(cap)}" loading="lazy">
        ${cap ? `<span class="cap">${esc(cap)}</span>` : ''}
      </button>`;
    }).join('');
    return `
      <section class="s on-paper" id="gallery">
        <div class="wrap">
          <div class="s-head"><h2>${esc(t(G.title))}</h2>${G.intro ? `<p class="lead">${esc(t(G.intro))}</p>` : ''}</div>
          <div class="gallery">${tiles}</div>
        </div>
      </section>`;
  }

  function renderClients(C) {
    const items = list(C.items).filter((i) => i.logo || t(i.name));
    if (!items.length) return '';
    const logos = items.map((i) => i.logo
      ? `<img src="${esc(asset(i.logo))}" alt="${esc(t(i.name))}" loading="lazy">`
      : `<span>${esc(t(i.name))}</span>`).join('');
    return `
      <section class="s on-white" id="clients">
        <div class="wrap">
          <div class="s-head"><h2>${esc(t(C.title))}</h2></div>
          <div class="clients">${logos}</div>
        </div>
      </section>`;
  }

  function renderFaq(F) {
    const items = list(F.items).map((i) => `
      <details><summary>${esc(t(i.q))}</summary><p>${esc(t(i.a))}</p></details>`).join('');
    if (!items) return '';
    return `
      <section class="s on-white" id="faq">
        <div class="wrap">
          <div class="s-head"><h2>${esc(t(F.title))}</h2></div>
          <div class="faq">${items}</div>
        </div>
      </section>`;
  }

  function renderContact(S, C, V) {
    const s = STR[lang];
    const rows = [];
    const n = waNumber(S);
    if (n) rows.push(`<li><span class="k">${esc(s.info.whatsapp)}</span><a href="${esc(waLink(S))}" target="_blank" rel="noopener"><bdi dir="ltr">+${esc(n)}</bdi></a></li>`);
    if (S.phone) rows.push(`<li><span class="k">${esc(s.info.phone)}</span><a href="tel:${esc(String(S.phone).replace(/[^\d+]/g, ''))}"><bdi dir="ltr">${esc(S.phone)}</bdi></a></li>`);
    if (S.email) rows.push(`<li><span class="k">${esc(s.info.email)}</span><a href="mailto:${esc(S.email)}"><bdi dir="ltr">${esc(S.email)}</bdi></a></li>`);
    const ig = igHandle(S);
    if (ig) rows.push(`<li><span class="k">${esc(s.info.instagram)}</span><a href="https://instagram.com/${esc(ig)}" target="_blank" rel="noopener"><bdi dir="ltr">@${esc(ig)}</bdi></a></li>`);
    if (t(S.address)) rows.push(`<li><span class="k">${esc(s.info.address)}</span><span class="val">${esc(t(S.address))}</span>${S.mapUrl ? ` <a href="${esc(S.mapUrl)}" target="_blank" rel="noopener">${esc(s.openMap)}</a>` : ''}</li>`);
    if (t(S.hours)) rows.push(`<li><span class="k">${esc(s.info.hours)}</span><span class="val">${esc(t(S.hours))}</span></li>`);

    const opts = list(V.items).map((it, i) => `<option value="${i}">${esc(t(it.title))}</option>`).join('');
    const f = s.form;
    return `
      <section class="s on-paper" id="contact">
        <div class="wrap contact-grid">
          <div>
            <div class="s-head"><h2>${esc(t(C.title))}</h2><p class="lead">${esc(t(C.intro))}</p></div>
            <ul class="info">${rows.join('')}</ul>
            <div class="contact-cta"><a class="btn wa" href="${esc(waLink(S))}" target="_blank" rel="noopener">${WA_SVG}${esc(s.wa)}</a></div>
          </div>
          <form class="req" id="reqForm" novalidate>
            <label>${esc(f.name)}<input name="name" autocomplete="name"></label>
            <label>${esc(f.service)}
              <select name="service"><option value="">${esc(f.pick)}</option>${opts}<option value="multi">${esc(f.multi)}</option></select>
            </label>
            <label>${esc(f.date)}<input name="date" type="date"></label>
            <label>${esc(f.guests)}<input name="guests" type="number" min="1" inputmode="numeric"></label>
            <label class="full">${esc(f.place)}<input name="place"></label>
            <label class="full">${esc(f.notes)}<textarea name="notes" rows="3"></textarea></label>
            <button class="btn wa full" type="submit">${WA_SVG}${esc(f.send)}</button>
            <p class="hint full">${esc(f.hint)}</p>
          </form>
        </div>
      </section>`;
  }

  function renderFooter(S) {
    const s = STR[lang];
    const ig = igHandle(S);
    const links = [];
    if (ig) links.push(`<a href="https://instagram.com/${esc(ig)}" target="_blank" rel="noopener">Instagram</a>`);
    if (S.facebook) {
      const fb = /^https?:/i.test(S.facebook) ? S.facebook : 'https://facebook.com/' + S.facebook;
      links.push(`<a href="${esc(fb)}" target="_blank" rel="noopener">Facebook</a>`);
    }
    return `
      <footer>
        <div class="wrap">
          <a class="brand" href="#top">${MARK_SVG}<span>${esc(t(S.brand))}</span></a>
          <div class="links">${links.join('')}</div>
          <small>&copy; ${new Date().getFullYear()} ${esc(t(S.brand))}. ${esc(s.rights)}.</small>
        </div>
      </footer>
      <a class="float-wa" href="${esc(waLink(S))}" target="_blank" rel="noopener" aria-label="${esc(s.wa)}">${WA_SVG}</a>`;
  }

  /* ---------- Meta tags ---------- */
  function setMeta(S) {
    const title = t(S.seoTitle) || `${t(S.brand)} | ${t(S.tagline)}`;
    const desc = t(S.seoDescription) || t(S.tagline);
    document.title = title;
    const set = (attr, name, value) => {
      let el = document.head.querySelector(`meta[${attr}="${name}"]`);
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', value);
    };
    set('name', 'description', desc);
    set('property', 'og:title', title);
    set('property', 'og:description', desc);
    set('property', 'og:type', 'website');
    set('property', 'og:locale', lang === 'ar' ? 'ar_IQ' : 'en_US');
    const img = S.ogImage || S.logo;
    if (img) set('property', 'og:image', new URL(asset(img), location.href).href);

    const ld = {
      '@context': 'https://schema.org', '@type': 'LocalBusiness',
      name: t(S.brand), description: desc, url: location.origin + location.pathname,
      address: { '@type': 'PostalAddress', addressLocality: 'Baghdad', addressCountry: 'IQ' }
    };
    if (S.phone) ld.telephone = S.phone;
    if (S.email) ld.email = S.email;
    const same = [];
    if (igHandle(S)) same.push('https://instagram.com/' + igHandle(S));
    if (/^https?:/i.test(S.facebook || '')) same.push(S.facebook);
    if (same.length) ld.sameAs = same;
    document.getElementById('ld').textContent = JSON.stringify(ld);
  }

  /* ---------- Render ---------- */
  function render() {
    const s = STR[lang];
    const root = document.documentElement;
    root.lang = lang;
    root.dir = s.dir;

    const app = document.getElementById('app');
    if (!DATA) { app.innerHTML = `<p style="padding:32px">${esc(s.loadErr)}</p>`; return; }

    // keep what the visitor already typed in the request form
    const saved = {};
    document.querySelectorAll('#reqForm [name]').forEach((e) => { saved[e.name] = e.value; });

    const S = DATA.settings || {};
    const hasGallery = list(DATA.gallery && DATA.gallery.items).some((i) => i.image);
    const visible = ['services', 'why', 'process'];
    if (hasGallery) visible.push('gallery');
    if (list(DATA.faq && DATA.faq.items).length) visible.push('faq');
    visible.push('contact');

    app.innerHTML =
      renderHeader(S, visible) +
      '<main>' +
      renderHero(S, DATA.hero || {}, DATA.eventTypes) +
      renderServices(DATA.services || {}) +
      renderWhy(DATA.why || {}) +
      renderProcess(DATA.process || {}) +
      renderGallery(DATA.gallery || {}) +
      renderClients(DATA.clients || {}) +
      renderFaq(DATA.faq || {}) +
      renderContact(S, DATA.contact || {}, DATA.services || {}) +
      '</main>' +
      renderFooter(S);

    Object.keys(saved).forEach((k) => {
      const el = document.querySelector(`#reqForm [name="${k}"]`);
      if (el) el.value = saved[k];
    });
    setMeta(S);
    tick();
  }

  /* ---------- Timecode in the hero monitor ---------- */
  function tick() {
    const el = document.getElementById('tc');
    if (!el) return;
    const sec = Math.floor((Date.now() - startedAt) / 1000);
    const p = (n) => String(n).padStart(2, '0');
    el.textContent = `${p(Math.floor(sec / 3600) % 100)}:${p(Math.floor(sec / 60) % 60)}:${p(sec % 60)}`;
  }
  setInterval(tick, 1000);

  /* ---------- Events (delegated, so they survive re-rendering) ---------- */
  document.addEventListener('click', (e) => {
    const toggle = e.target.closest('[data-lang-toggle]');
    if (toggle) {
      lang = lang === 'ar' ? 'en' : 'ar';
      try { localStorage.setItem('menz_lang', lang); } catch (_) { /* private mode */ }
      render();
      return;
    }
    const menu = e.target.closest('[data-menu]');
    if (menu) {
      const nav = document.getElementById('nav');
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(open));
      return;
    }
    if (e.target.closest('#nav a')) document.getElementById('nav').classList.remove('open');

    const svc = e.target.closest('[data-svc]');
    if (svc) {
      const sel = document.querySelector('#reqForm [name="service"]');
      if (sel) sel.value = svc.getAttribute('data-svc');
    }

    const lb = e.target.closest('[data-lb]');
    if (lb) {
      const d = document.getElementById('lightbox');
      d.querySelector('img').src = lb.getAttribute('data-lb');
      d.querySelector('p').textContent = lb.getAttribute('data-cap') || '';
      if (d.showModal) d.showModal();
      return;
    }
    if (e.target.closest('[data-lb-close]') || e.target.id === 'lightbox') {
      const d = document.getElementById('lightbox');
      if (d.close) d.close();
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id !== 'reqForm') return;
    e.preventDefault();
    const s = STR[lang];
    const fd = new FormData(e.target);
    const V = (DATA.services && DATA.services.items) || [];
    let service = '';
    const sv = fd.get('service');
    if (sv === 'multi') service = s.form.multi;
    else if (sv !== '' && V[Number(sv)]) service = t(V[Number(sv)].title);

    const lines = [s.msg.hello];
    const add = (label, val) => { if (val) lines.push(`${label}: ${val}`); };
    add(s.msg.name, String(fd.get('name') || '').trim());
    add(s.msg.service, service);
    add(s.msg.date, fd.get('date'));
    add(s.msg.place, String(fd.get('place') || '').trim());
    add(s.msg.guests, fd.get('guests'));
    add(s.msg.notes, String(fd.get('notes') || '').trim());

    const url = waLink(DATA.settings || {}, lines.join('\n'));
    if (url === '#contact') return;
    window.open(url, '_blank', 'noopener');
  });

  /* ---------- Boot ---------- */
  function initialLang() {
    const q = new URLSearchParams(location.search).get('lang');
    if (q === 'ar' || q === 'en') return q;
    try {
      const saved = localStorage.getItem('menz_lang');
      if (saved === 'ar' || saved === 'en') return saved;
    } catch (_) { /* ignore */ }
    return 'ar';
  }

  lang = initialLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = STR[lang].dir;

  fetch('content.json?v=' + Date.now(), { cache: 'no-store' })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((json) => { DATA = json; render(); })
    .catch(() => { DATA = null; render(); });
})();
