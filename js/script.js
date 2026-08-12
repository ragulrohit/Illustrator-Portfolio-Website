/* ============================================================
   STACKLY — Illustration & Creative Design Studio
   Premium interactions (vanilla JS)
   ============================================================ */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const isTouch = !finePointer;

  /* ============================================================
     1. BACKGROUND — stars & particles
     ============================================================ */
  function spawnBackground() {
    const stars = $('#stars');
    const particles = $('#particles');
    if (!stars || !particles) return;
    if (reduced) return;

    const starCount = isTouch ? 26 : 70;
    for (let i = 0; i < starCount; i++) {
      const s = document.createElement('span');
      s.className = 'star';
      const size = 1 + Math.random() * 3;
      s.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * 100}%;
        width:${size}px; height:${size}px;
        --tw:${2 + Math.random() * 3}s;
        animation-delay:${-Math.random() * 3}s;`;
      stars.appendChild(s);
    }

    const colors = ['#7C3AED', '#3B82F6', '#06B6D4', '#EC4899', '#F97316', '#FACC15'];
    const pCount = isTouch ? 12 : 26;
    for (let i = 0; i < pCount; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const c = colors[Math.floor(Math.random() * colors.length)];
      const size = 3 + Math.random() * 7;
      const dur = 14 + Math.random() * 16;
      p.style.cssText = `
        left:${Math.random() * 100}%;
        width:${size}px; height:${size}px;
        --pc:${c};
        --sw:${(Math.random() - 0.5) * 120}px;
        animation-duration:${dur}s;
        animation-delay:${-Math.random() * dur}s;`;
      particles.appendChild(p);
    }
  }

  /* ============================================================
     2. DATA — services & portfolio
     ============================================================ */
  const SERVICES = [
    { icon: '\u270E', title: 'Custom Illustration', desc: 'One-of-a-kind digital artwork crafted to your story and brand.', c1: '#7C3AED', c2: '#EC4899' },
    { icon: '\u263A', title: 'Character Design', desc: 'Memorable characters and mascots packed with personality.', c1: '#3B82F6', c2: '#06B6D4' },
    { icon: '\uD83D\uDCD6', title: 'Book Illustration', desc: 'Expressive spreads for children\u2019s books, covers and editorial.', c1: '#F97316', c2: '#FACC15' },
    { icon: '\uD83D\uDC0E', title: 'Mascot Design', desc: 'Lovable brand mascots that people instantly connect with.', c1: '#EC4899', c2: '#7C3AED' },
    { icon: '\uD83D\uDCE6', title: 'Packaging Design', desc: 'Shelf-stopping packaging artwork consumers love to pick up.', c1: '#06B6D4', c2: '#F97316' },
    { icon: '\uD83D\uDCC4', title: 'Editorial Illustration', desc: 'Impactful visuals for magazines, blogs and publications.', c1: '#FACC15', c2: '#EC4899' },
    { icon: '\uD83C\uDFAC', title: 'Motion Graphics', desc: 'Animated stories and looping visuals that bring art to life.', c1: '#7C3AED', c2: '#3B82F6' },
    { icon: '\uD83C\uDFD5', title: '3D Illustration', desc: 'Premium 3D renders and scenes for products and marketing.', c1: '#3B82F6', c2: '#F97316' }
  ];

  const FILTERS = [
    ['all', 'All'],
    ['character', 'Character Design'],
    ['vector', 'Vector Art'],
    ['branding', 'Branding'],
    ['book', 'Children\u2019s Book'],
    ['nft', 'NFT Art'],
    ['game', 'Game Art'],
    ['product', 'Product Illustration'],
    ['ui', 'UI Illustration']
  ];

  const PF = [
    { title: 'Neon Guardian', slug: 'neon-guardian', cat: ['game', 'character'], pad: '38%', c1: '#7C3AED', c2: '#06B6D4', c3: '#3B82F6', shape: 's1 s2' },
    { title: 'Berry Friends', cat: ['book', 'character'], pad: '26%', c1: '#FACC15', c2: '#EC4899', c3: '#F97316', shape: 's2 s3' },
    { title: 'TechMuse Mascot', slug: 'techmuse-mascot', cat: ['branding'], pad: '30%', c1: '#3B82F6', c2: '#7C3AED', c3: '#EC4899', shape: 'sq s3' },
    { title: 'Flora Vector Pack', cat: ['vector'], pad: '36%', c1: '#06B6D4', c2: '#F97316', c3: '#FACC15', shape: 's1 s3' },
    { title: 'Pixel Pets', cat: ['nft'], pad: '30%', c1: '#EC4899', c2: '#7C3AED', c3: '#06B6D4', shape: 's2 sq' },
    { title: 'Orbit Character', cat: ['character'], pad: '40%', c1: '#7C3AED', c2: '#3B82F6', c3: '#FACC15', shape: 's1 sq' },
    { title: 'SnackBox Label', cat: ['product', 'branding'], pad: '28%', c1: '#F97316', c2: '#FACC15', c3: '#EC4899', shape: 's1 s2 s3' },
    { title: 'Fintech Dashboard', cat: ['ui'], pad: '32%', c1: '#3B82F6', c2: '#06B6D4', c3: '#7C3AED', shape: 'sq s2' },
    { title: 'Bloom Tales', cat: ['book'], pad: '34%', c1: '#EC4899', c2: '#FACC15', c3: '#06B6D4', shape: 's3 sq' },
    { title: 'Crypto Koala', slug: 'crypto-koala', cat: ['nft', 'game'], pad: '30%', c1: '#FACC15', c2: '#06B6D4', c3: '#7C3AED', shape: 's2 s3' },
    { title: 'City Icons', cat: ['vector', 'ui'], pad: '38%', c1: '#06B6D4', c2: '#3B82F6', c3: '#EC4899', shape: 's1 sq' },
    { title: 'App Onboarding', cat: ['ui', 'product'], pad: '32%', c1: '#EC4899', c2: '#7C3AED', c3: '#3B82F6', shape: 's1 s2 s3' }
  ];

  function renderServices() {
    const grid = $('#services-grid');
    if (!grid) return;
    grid.innerHTML = SERVICES.map((s, i) => `
      <div class="service-card reveal" data-reveal data-delay="${(i % 4) * 90}">
        <div class="service-inner">
          <span class="service-tag">0${i + 1}</span>
          <div class="service-ico" style="--ic1:${s.c1};--ic2:${s.c2}">${s.icon}</div>
          <h3>${s.title}</h3>
          <p>${s.desc}</p>
        </div>
      </div>`).join('');
  }

  function renderPortfolio() {
    const grid = $('#pf-grid');
    const filters = $('#pf-filters');
    if (!grid) return;

    filters.innerHTML = FILTERS.map(([key, label]) =>
      `<button class="pf-btn ${key === 'all' ? 'active' : ''}" data-filter="${key}" type="button">${label}</button>`).join('');

    grid.innerHTML = PF.map((p, i) => `
      <article class="pf-item reveal" data-reveal data-delay="${(i % 3) * 90}" data-cat="${p.cat.join(' ')}">
        <div class="pf-media" data-tilt style="--pad:${p.pad}">
          <div class="pf-img" style="--c1:${p.c1};--c2:${p.c2};--c3:${p.c3}"></div>
          ${p.shape.split(' ').map(s => `<span class="pf-shape ${s}"></span>`).join('')}
        </div>
        <div class="pf-info">
          <div><h3>${p.title}</h3><span>${p.cat.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(' / ')}</span></div>
          <span class="pf-arrow">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>
          </span>
        </div>
      </article>`).join('');

    grid.querySelectorAll('.pf-item').forEach((item, i) => {
      if (PF[i].slug) item.id = PF[i].slug;
    });

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.pf-btn');
      if (!btn) return;
      $$('.pf-btn', filters).forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      $$('.pf-item', grid).forEach(item => {
        const show = f === 'all' || item.dataset.cat.split(' ').includes(f);
        item.classList.toggle('hide', !show);
        if (show) {
          item.classList.remove('pop');
          void item.offsetWidth;
          item.classList.add('pop');
        }
      });
    });
  }

  /* ============================================================
     3. CUSTOM CURSOR
     ============================================================ */
  function initCursor() {
    const cursor = $('#cursor');
    const glow = $('#cursor-glow');
    if (!cursor || !glow || isTouch || reduced) return;

    let mx = innerWidth / 2, my = innerHeight / 2;
    let cx = mx, cy = my, gx = mx, gy = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      document.documentElement.classList.add('has-cursor');
    });

    const hoverables = 'a, button, .pf-media, .service-card, [data-magnetic], input, select, textarea, .t-ava';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.classList.add('cursor-hover');
        glow.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.classList.remove('cursor-hover');
        glow.classList.remove('cursor-hover');
      }
    });

    const tickCursor = () => {
      cx = lerp(cx, mx, 0.4);
      cy = lerp(cy, my, 0.4);
      gx = lerp(gx, mx, 0.16);
      gy = lerp(gy, my, 0.16);
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tickCursor);
    };
    requestAnimationFrame(tickCursor);
  }

  /* ============================================================
     4. SMOOTH SCROLL (lightweight Lenis-style)
     ============================================================ */
  const Smooth = {
    current: 0,
    target: 0,
    moving: false,
    enabled: finePointer && !reduced,
    max() { return Math.max(0, document.documentElement.scrollHeight - innerHeight); },
    go() {
      if (this.moving) return;
      this.moving = true;
      const step = () => {
        this.current = lerp(this.current, this.target, 0.09);
        if (Math.abs(this.target - this.current) < 0.4) {
          this.current = this.target;
          this.moving = false;
        }
        window.scrollTo(0, this.current);
        if (this.moving) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    to(y) {
      this.target = clamp(y, 0, this.max());
      if (!this.enabled) { window.scrollTo({ top: this.target, behavior: 'smooth' }); return; }
      this.go();
    }
  };

  function initSmoothScroll() {
    Smooth.current = Smooth.target = window.scrollY;

    if (Smooth.enabled) {
      window.addEventListener('wheel', (e) => {
        if (e.ctrlKey) return;
        if (e.target.closest('textarea, select')) return;
        e.preventDefault();
        Smooth.target = clamp(Smooth.target + e.deltaY, 0, Smooth.max());
        Smooth.go();
      }, { passive: false });

      ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End'].forEach((k) => {
        window.addEventListener('keydown', (e) => {
          if (e.key !== k || e.ctrlKey || e.metaKey || e.shiftKey) return;
          if (e.target.closest('input, select, textarea')) return;
          e.preventDefault();
          const step = 110;
          if (k === 'Home') Smooth.to(0);
          else if (k === 'End') Smooth.to(Smooth.max());
          else if (k === 'PageDown') Smooth.to(Smooth.target + innerHeight * 0.9);
          else if (k === 'PageUp') Smooth.to(Smooth.target - innerHeight * 0.9);
          else if (k === 'ArrowDown') Smooth.to(Smooth.target + step);
          else Smooth.to(Smooth.target - step);
        });
      });
    }

    // sync with native scrollbar drag
    window.addEventListener('scroll', () => {
      if (!Smooth.moving) {
        Smooth.current = Smooth.target = window.scrollY;
      }
    });
    window.addEventListener('resize', () => {
      Smooth.target = clamp(Smooth.target, 0, Smooth.max());
    });

    // anchor smooth scroll
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
      let id = null;
      if (href.startsWith('#')) {
        id = href;
      } else {
        const m = href.match(/^([^#]*)#(.+)$/);
        if (m && (m[1] === '' || m[1].toLowerCase() === page)) id = '#' + m[2];
      }
      if (!id || id.length < 2) return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      Smooth.to(top);
      closeMenu();
    });
  }

  /* ============================================================
     5. LOADER
     ============================================================ */
  function initLoader() {
    const loader = $('#loader');
    const bar = $('#loader-bar');
    const pct = $('#loader-percent');
    if (!loader) {
      initReveal();
      return;
    }

    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 14 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        setTimeout(() => {
          loader.classList.add('hide');
          document.body.classList.remove('lock');
          setTimeout(() => loader.remove(), 800);
          initReveal(); // reveal only after page is visible
        }, 250);
      }
      if (bar) bar.style.width = p + '%';
      if (pct) pct.textContent = Math.floor(p) + '%';
    }, 110);
  }

  /* ============================================================
     6. NAVBAR
     ============================================================ */
  function initNav() {
    const navbar = $('#navbar');
    const toggle = $('#nav-toggle');
    const menu = $('#nav-menu');

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open);
        document.body.classList.toggle('lock', open);
      });
    }

    // active link based on the current page
    const links = $$('.nav-link');
    const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    links.forEach((l) => l.classList.toggle('active', l.dataset.page === page));
  }

  function closeMenu() {
    const toggle = $('#nav-toggle');
    const menu = $('#nav-menu');
    if (!menu) return;
    menu.classList.remove('open');
    if (toggle) toggle.classList.remove('open');
    document.body.classList.remove('lock');
  }

  /* ============================================================
     7. REVEAL ON SCROLL
     ============================================================ */
  function initReveal() {
    const els = $$('[data-reveal]');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const d = el.dataset.delay || 0;
          el.style.setProperty('--rd', d + 'ms');
          el.classList.add('in');
          io.unobserve(el);
          // release transition so element hover styles use their own timings
          const done = () => {
            el.removeAttribute('data-reveal');
            el.classList.remove('in');
            el.style.removeProperty('--rd');
          };
          el.addEventListener('transitionend', done, { once: true });
          setTimeout(done, 1400);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }

  /* ============================================================
     8. COUNTERS
     ============================================================ */
  function initCounters() {
    const nums = $$('[data-count]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = +el.dataset.count;
        const dur = 1600;
        const t0 = performance.now();
        const tick = (t) => {
          const p = clamp((t - t0) / dur, 0, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.6 });
    nums.forEach((el) => io.observe(el));
  }

  /* ============================================================
     9. MAGNETIC BUTTONS + TILT
     ============================================================ */
  function initMagnetic() {
    if (isTouch || reduced) return;
    $$('[data-magnetic]').forEach((btn) => {
      const strength = 0.35;
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  function initTilt() {
    if (isTouch || reduced) return;
    $$('[data-tilt]').forEach((el) => {
      const max = 8;
      let tx = 0, ty = 0, rx = 0, ry = 0, active = false;
      el.addEventListener('mousemove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry = px * max;
        rx = -py * max;
        tx = px * 10;
        ty = py * 10;
        active = true;
      });
      el.addEventListener('mouseleave', () => {
        rx = ry = tx = ty = 0;
        active = false;
        el.style.transform = '';
      });
      let raf = null;
      const tick = () => {
        el.style.transform = `perspective(800px) translate3d(${tx}px, ${ty}px, 0) rotateX(${rx}deg) rotateY(${ry}deg)`;
        raf = requestAnimationFrame(tick);
      };
      // only run raf while hovering
      el.addEventListener('mouseenter', () => {
        if (!raf) raf = requestAnimationFrame(tick);
      });
      el.addEventListener('mouseleave', () => {
        if (raf) { cancelAnimationFrame(raf); raf = null; }
      });
    });
  }

  /* ============================================================
     10. HERO WORKSPACE — mouse parallax
     ============================================================ */
  const workspace = {
    layers: [],
    mx: 0, my: 0,
    smx: 0, smy: 0,
    init() {
      const ws = $('#workspace');
      if (!ws || isTouch) return;
      this.layers = $$('.ws-layer', ws);
      window.addEventListener('mousemove', (e) => {
        this.mx = (e.clientX / innerWidth - 0.5) * 2;
        this.my = (e.clientY / innerHeight - 0.5) * 2;
      });
    },
    tick() {
      if (!this.layers.length) return;
      this.smx = lerp(this.smx, this.mx, 0.06);
      this.smy = lerp(this.smy, this.my, 0.06);
      this.layers.forEach((l) => {
        const d = +l.dataset.depth || 0;
        l.style.transform = `translate3d(${this.smx * d}px, ${this.smy * d * 0.7}px, 0)`;
      });
    }
  };

  /* ============================================================
     11. TESTIMONIALS CAROUSEL
     ============================================================ */
  function initTestimonials() {
    const track = $('#t-track');
    const dotsWrap = $('#t-dots');
    const prev = $('#t-prev');
    const next = $('#t-next');
    if (!track || !dotsWrap) return;

    const slides = $$('.t-slide', track);
    const count = slides.length;
    let index = 0;
    let autoTimer = null;

    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 't-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
      d.addEventListener('click', () => go(i));
      dotsWrap.appendChild(d);
    });
    const dots = $$('.t-dot', dotsWrap);

    function go(i) {
      index = (i + count) % count;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, di) => d.classList.toggle('active', di === index));
    }
    function nextSlide() { go(index + 1); }
    function prevSlide() { go(index - 1); }
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(nextSlide, 5200);
    }
    function stopAuto() { if (autoTimer) clearInterval(autoTimer); }

    next.addEventListener('click', () => { nextSlide(); startAuto(); });
    prev.addEventListener('click', () => { prevSlide(); startAuto(); });

    const viewport = track.closest('.t-viewport');
    let startX = null;
    viewport.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stopAuto(); }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 46) (dx < 0 ? nextSlide() : prevSlide());
      startX = null;
      startAuto();
    }, { passive: true });

    viewport.addEventListener('mouseenter', stopAuto);
    viewport.addEventListener('mouseleave', startAuto);

    window.addEventListener('resize', () => go(index));
    startAuto();
  }

  /* ============================================================
     12. CONTACT FORM
     ============================================================ */
  function initForm() {
    const form = $('#contact-form');
    const panel = $('#success-panel');
    const btn = $('#submit-btn');
    const note = $('#form-note');
    if (!form) return;

    const fields = { name: $('#f-name'), email: $('#f-email'), type: $('#f-type'), message: $('#f-message') };

    const setError = (field, bad) => {
      const wrap = field.closest('.form-field');
      wrap.classList.toggle('error', bad);
    };
    const validate = () => {
      let ok = true;
      setError(fields.name, fields.name.value.trim().length < 2);
      setError(fields.email, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim()));
      setError(fields.type, !fields.type.value);
      setError(fields.message, fields.message.value.trim().length < 10);
      if (fields.name.value.trim().length < 2) ok = false;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) ok = false;
      if (!fields.type.value) ok = false;
      if (fields.message.value.trim().length < 10) ok = false;
      return ok;
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (note) note.textContent = '';
      if (!validate()) {
        if (note) note.textContent = 'Please fill in the highlighted fields.';
        return;
      }
      btn.classList.add('loading');
      setTimeout(() => {
        btn.classList.remove('loading');
        form.reset();
        if (panel) panel.classList.add('show');
        if (note) note.textContent = '';
      }, 1500);
    });

    const close = $('#success-close');
    if (close) close.addEventListener('click', () => panel.classList.remove('show'));
    if (panel) panel.addEventListener('click', (e) => { if (e.target === panel) panel.classList.remove('show'); });
  }

  function initCustomSelects() {
    $$('.contact-form select').forEach((select) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'custom-form-select';
      select.parentNode.insertBefore(wrapper, select);
      wrapper.appendChild(select);
      select.classList.add('native-form-select');

      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'custom-form-select-trigger';
      trigger.textContent = select.options[select.selectedIndex]?.text || 'Select';
      trigger.setAttribute('aria-expanded', 'false');
      wrapper.appendChild(trigger);

      const menu = document.createElement('div');
      menu.className = 'custom-form-select-menu';
      [...select.options].filter((option) => option.value).forEach((option) => {
        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'custom-form-select-option';
        item.textContent = option.text;
        item.addEventListener('click', () => {
          select.value = option.value;
          trigger.textContent = option.text;
          trigger.classList.add('selected');
          menu.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');
          select.dispatchEvent(new Event('change', { bubbles: true }));
        });
        menu.appendChild(item);
      });
      wrapper.appendChild(menu);
      trigger.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
      });
    });

    document.addEventListener('click', (event) => {
      $$('.custom-form-select').forEach((wrapper) => {
        if (!wrapper.contains(event.target)) {
          wrapper.querySelector('.custom-form-select-menu')?.classList.remove('open');
          wrapper.querySelector('.custom-form-select-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Do not keep an open menu attached to a moving form while the page scrolls.
    window.addEventListener('scroll', () => {
      $$('.custom-form-select-menu.open').forEach((menu) => {
        menu.classList.remove('open');
        menu.closest('.custom-form-select')?.querySelector('.custom-form-select-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }, { passive: true });
  }

  /* ============================================================
     13. BACK TO TOP + SCROLL PROGRESS + NAVBAR STATE
     ============================================================ */
  function initMisc() {
    const top = $('#back-to-top');
    const progress = $('#scroll-progress');
    const navbar = $('#navbar');
    top.addEventListener('click', () => Smooth.to(0));

    function update() {
      const y = window.scrollY;
      const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      const p = clamp(y / max, 0, 1);
      if (progress) progress.style.width = (p * 100) + '%';
      top.classList.toggle('show', y > 600);
      navbar.classList.toggle('scrolled', y > 30);
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) { ticking = true; requestAnimationFrame(() => { update(); ticking = false; }); }
    }, { passive: true });
    update();
  }

  /* ============================================================
     14. MAIN LOOP (parallax)
     ============================================================ */
  function initParallax() {
    const els = $$('[data-parallax]');
    if (!els.length || isTouch || reduced) return;

    function tick() {
      const vh = innerHeight;
      const mid = vh / 2;
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = center - mid;
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        el.style.transform = `translate3d(0, ${dist * -speed}px, 0)`;
      });
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ============================================================
     BOOT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderPortfolio();
    spawnBackground();
    document.getElementById('year').textContent = new Date().getFullYear();

    initSmoothScroll();
    initCursor();
    initNav();
    initLoader();
    initCounters();
    initMagnetic();
    initTilt();
    initTestimonials();
    initCustomSelects();
    initForm();
    initMisc();

    workspace.init();
    initParallax();

    // global rAF loop for smooth mouse animations
    const loop = () => {
      workspace.tick();
      requestAnimationFrame(loop);
    };
    if (!reduced) requestAnimationFrame(loop);
  });
})();
