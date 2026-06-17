/* ============================================================
   AGR Ar Condicionado — main.js
   Módulos: Tema, Menu, Carrossel, Depoimentos, Scroll Reveal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════
     1. TEMA CLARO / ESCURO
  ════════════════════════════════════════════ */
  const html        = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon   = document.getElementById('themeIcon');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('agr-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
      themeToggle.setAttribute('aria-label',
        theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro');
    }
  }

  // Detecta preferência: localStorage > sistema > claro
  const savedTheme  = localStorage.getItem('agr-theme');
  const systemDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // Reage à mudança de preferência do sistema (sem override manual)
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('agr-theme')) applyTheme(e.matches ? 'dark' : 'light');
  });


  /* ══════════════════════════════════════════
     2. MENU MOBILE
  ════════════════════════════════════════════ */
  const btnHamburguer = document.getElementById('btnHamburguer');
  const menuMobile    = document.getElementById('menuMobile');
  const hamburgerIcon = document.getElementById('hamburger-icon');

  function closeMenu() {
    if (!menuMobile) return;
    menuMobile.classList.remove('active');
    if (hamburgerIcon) hamburgerIcon.innerHTML = '&#9776;';
    btnHamburguer?.setAttribute('aria-expanded', 'false');
    menuMobile.setAttribute('aria-hidden', 'true');
  }

  if (btnHamburguer && menuMobile) {
    btnHamburguer.addEventListener('click', e => {
      e.stopPropagation();
      const isOpen = menuMobile.classList.toggle('active');
      if (hamburgerIcon) hamburgerIcon.innerHTML = isOpen ? '&times;' : '&#9776;';
      btnHamburguer.setAttribute('aria-expanded', String(isOpen));
      menuMobile.setAttribute('aria-hidden', String(!isOpen));
    });

    document.addEventListener('click', e => {
      if (!menuMobile.contains(e.target) && !btnHamburguer.contains(e.target)) closeMenu();
    });

    menuMobile.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  }


  /* ══════════════════════════════════════════
     3. CARROSSEL DE BANNERS
  ════════════════════════════════════════════ */
  const bannerItems  = document.querySelectorAll('.banner-item');
  const nextBtn      = document.querySelector('.btn-carousel.next');
  const prevBtn      = document.querySelector('.btn-carousel.prev');
  const indicators   = document.querySelectorAll('.carousel-indicators button');
  let   slideIndex   = 0;
  let   autoInterval = null;

  function goToSlide(i) {
    bannerItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === i);
    });
    indicators.forEach((btn, idx) => {
      const active = idx === i;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  }

  function nextSlide() { slideIndex = (slideIndex + 1) % bannerItems.length; goToSlide(slideIndex); }
  function prevSlide() { slideIndex = (slideIndex - 1 + bannerItems.length) % bannerItems.length; goToSlide(slideIndex); }

  function startAutoplay()  { autoInterval = setInterval(nextSlide, 8000); }
  function resetAutoplay()  { clearInterval(autoInterval); startAutoplay(); }

  if (bannerItems.length > 0) {
    nextBtn?.addEventListener('click', () => { nextSlide(); resetAutoplay(); pulse(nextBtn); });
    prevBtn?.addEventListener('click', () => { prevSlide(); resetAutoplay(); pulse(prevBtn); });
    indicators.forEach((btn, idx) => {
      btn.addEventListener('click', () => { slideIndex = idx; goToSlide(idx); resetAutoplay(); });
    });
    goToSlide(0);
    startAutoplay();
  }

  function pulse(el) {
    el.classList.add('clicked');
    setTimeout(() => el.classList.remove('clicked'), 150);
  }


  /* ══════════════════════════════════════════
     4. SLIDER DE DEPOIMENTOS
  ════════════════════════════════════════════ */
  const depoimentos    = document.querySelectorAll('.depoimentos-slider .depoimento');
  let   depoIdx        = 0;

  function showDepo(i) {
    depoimentos.forEach((d, idx) => d.classList.toggle('active', idx === i));
  }

  if (depoimentos.length > 0) {
    showDepo(0);
    setInterval(() => { depoIdx = (depoIdx + 1) % depoimentos.length; showDepo(depoIdx); }, 5000);
  }


  /* ══════════════════════════════════════════
     5. SCROLL REVEAL
  ════════════════════════════════════════════ */
  const reveals  = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

});
