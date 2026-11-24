import { setupHero } from './hero.js';
import { profile } from './data.js';
import { renderSections } from './sections.js';
import { mountAboutTerminal } from './AboutTerminal.js';

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const precise = matchMedia('(hover: hover) and (pointer: fine)');
const icon = (name) => '<svg class="icon" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
renderSections();
setupHero(profile, reduced);
try {
  mountAboutTerminal($('#about-content'), reduced);
} catch {
  // O HTML da seção continua disponível se o terminal não inicializar.
}

function contactLink(label, href, className = '') {
  const a = document.createElement('a');
  a.textContent = label;
  a.href = href;
  a.className = className;
  return a;
}

const contacts = $('#contact-links');
const emailRow = document.createElement('div');
emailRow.className = 'contact__email';
emailRow.append(contactLink(profile.email, 'mailto:' + profile.email));
const copy = document.createElement('button');
copy.className = 'tool';
copy.setAttribute('aria-label', 'Copiar e-mail pessoal');
copy.innerHTML = icon('copy');
const feedback = document.createElement('span');
feedback.className = 'contact__feedback';
feedback.setAttribute('role', 'status');
copy.onclick = async () => {
  try {
    await navigator.clipboard.writeText(profile.email);
    feedback.textContent = 'E-mail copiado!';
    if (!reduced.matches) feedback.animate([{ opacity: 0 }, { opacity: 1 }], 220);
  } catch {
    feedback.textContent = 'Selecione o endereço para copiar.';
    const range = document.createRange();
    range.selectNodeContents(emailRow.firstElementChild);
    getSelection().removeAllRanges();
    getSelection().addRange(range);
  }
};
emailRow.append(copy);
const networks = document.createElement('nav');
networks.className = 'social-links';
networks.setAttribute('aria-label', 'Redes sociais e contato direto');
for (const { key, name, action, icon: logoPath } of profile.socialActions) {
  const href = key === 'whatsapp'
    ? 'https://wa.me/' + profile.whatsapp + '?text=' + encodeURIComponent(profile.whatsappMessage)
    : profile[key];
  const a = contactLink('', href, 'social-link social-link--' + key);
  const logo = document.createElement('span');
  logo.className = 'social-link__logo';
  logo.setAttribute('aria-hidden', 'true');
  logo.style.setProperty('--logo', 'url("' + new URL(logoPath, document.baseURI).href + '")');
  a.setAttribute('aria-label', name + ' — ' + action);
  a.append(logo, name);
  networks.append(a);
}
contacts.append(
  emailRow,
  feedback,
  contactLink(
    profile.emailInstitutional,
    'mailto:' + profile.emailInstitutional,
    'contact__institution',
  ),
  networks,
);

function setTheme(light) {
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  $('#theme').setAttribute('aria-label', light ? 'Ativar tema escuro' : 'Ativar tema claro');
  $('#theme').setAttribute('aria-pressed', String(light));
  $('meta[name="theme-color"]').content = light ? '#f5f6ed' : '#101310';
}
try {
  setTheme(localStorage.getItem('rtm-theme') === 'light');
} catch {
  setTheme(false);
}
$('#theme').onclick = () => {
  setTheme(document.documentElement.dataset.theme !== 'light');
  try {
    localStorage.setItem('rtm-theme', document.documentElement.dataset.theme);
  } catch {
    /* Tema ativo nesta visita. */
  }
};

const menu = $('#menu');
function toggleMenu(open) {
  $('#navigation').classList.toggle('is-open', open);
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
menu.onclick = () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true');
$('#navigation').onclick = (e) => {
  const link = e.target.closest('a');
  if (link && menu.getAttribute('aria-expanded') === 'true') {
    const target = $(link.hash);
    target.tabIndex = -1;
    target.focus({ preventScroll: true });
  }
  toggleMenu(false);
};
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header')) toggleMenu(false);
});

const palette = $('#palette');
const destinations = [
  ['inicio', 'Início'],
  ['sobre', 'Sobre'],
  ['skills', 'Skills'],
  ['bidxchange', 'TCC BidXchange'],
  ['projetos', 'Projetos'],
  ['mentorias', 'Mentorias, palestras e visitas'],
  ['certificados', 'Certificados'],
  ['hobbies', 'Hobbies'],
  ['contato', 'Contato'],
];
const normalize = (s) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
function findSections() {
  const matches = destinations.filter(([, label]) =>
    normalize(label).includes(normalize($('#search').value.trim())),
  );
  $('#matches').replaceChildren(...matches.map(([id, label]) => contactLink(label, '#' + id)));
  $('#empty').hidden = Boolean(matches.length);
}
function openPalette() {
  if ($('dialog[open]')) return;
  toggleMenu(false);
  $('#search').value = '';
  findSections();
  palette.showModal();
  $('#search').focus();
}
$('#search').oninput = findSections;
$('#search').onkeydown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    $('#matches a')?.focus();
  }
  if (e.key === 'Enter') $('#matches a')?.click();
};
$('#command').onclick = openPalette;
$('.palette__head button').onclick = () => palette.close();
$('#matches').onclick = (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  palette.close();
  const target = $(link.hash);
  target.tabIndex = -1;
  target.focus({ preventScroll: true });
};
palette.onclick = (e) => {
  if (e.target !== palette) return;
  const bounds = palette.getBoundingClientRect();
  if (
    e.clientX < bounds.left ||
    e.clientX > bounds.right ||
    e.clientY < bounds.top ||
    e.clientY > bounds.bottom
  )
    palette.close();
};
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (palette.open) palette.close();
    else openPalette();
  }
  if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    toggleMenu(false);
    menu.focus();
  }
});

const navLinks = $$('.nav a');
const sections = destinations.map(([id]) => document.getElementById(id)).filter(Boolean);
const progress = $('.progress');
let scheduled = false;
function scrollState() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = 'scaleX(' + Math.min(1, Math.max(0, scrollY / (max || 1))) + ')';
  const current = sections.filter((s) => s.getBoundingClientRect().top <= innerHeight * 0.38).at(-1)?.id;
  const group = { certificados: 'mentorias', hobbies: 'mentorias' };
  navLinks.forEach((a) => {
    if (a.hash === '#' + (group[current] || current)) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
  scheduled = false;
}
document.addEventListener(
  'scroll',
  () => {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(scrollState);
    }
  },
  { passive: true },
);
scrollState();

// Core navigation and content are ready before optional motion libraries load.
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.append(script);
  });
}
async function enhanceMotion() {
  if (reduced.matches) return;
  try {
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js').then(() =>
        loadScript('https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js'),
      ),
      loadScript('https://cdn.jsdelivr.net/npm/lenis@1.3.15/dist/lenis.min.js'),
    ]);
    if (reduced.matches) return;
    const { gsap, ScrollTrigger, Lenis } = window;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      anchors: false,
      prevent: (el) => Boolean(el.closest('dialog,[data-lenis-prevent]')),
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    const ctx = gsap.context(() => {
      for (const section of sections.filter((s) => s.id !== 'inicio' && s.id !== 'sobre')) {
        const nodes = section.querySelectorAll('h2');
        if (nodes.length)
          gsap.from(nodes, {
            y: 12,
            opacity: 0.72,
            duration: 0.48,
            stagger: 0.06,
            scrollTrigger: { trigger: section, start: 'top 94%', once: true },
            clearProps: 'transform,opacity',
          });
      }
    });
    reduced.addEventListener(
      'change',
      () => {
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      },
      { once: true },
    );
  } catch {
    /* Navegação e rolagem nativas continuam disponíveis. */
  }
}
function syncMotionPreference() {
  document.body.classList.toggle('motion-paused', reduced.matches);
  document.dispatchEvent(new Event('portfolio-motion'));
}
syncMotionPreference();
reduced.addEventListener('change', syncMotionPreference);
if (precise.matches && !reduced.matches) {
  const cursor = $('.cursor');
  let releaseTimer;
  let pressedAt;
  window.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    clearTimeout(releaseTimer);
    pressedAt = performance.now();
    cursor.classList.add('is-pressed');
  });
  for (const type of ['pointerup', 'pointercancel', 'blur']) {
    window.addEventListener(type, () => {
      if (!cursor.classList.contains('is-pressed')) return;
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => cursor.classList.remove('is-pressed'),
        Math.max(0, 150 - (performance.now() - pressedAt)));
    });
  }
  let x = 0,
    y = 0,
    tx = 0,
    ty = 0,
    frame = 0,
    over = false;
  function follow() {
    x += (tx - x) * 0.28;
    y += (ty - y) * 0.28;
    cursor.style.transform =
      'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%) scale(' + (over ? 2.1 : 1) + ')';
    frame = Math.abs(x - tx) + Math.abs(y - ty) > 0.5 ? requestAnimationFrame(follow) : 0;
  }
  document.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType !== 'mouse' || reduced.matches) {
        cursor.classList.remove('is-visible');
        return;
      }
      if (!cursor.classList.contains('is-visible')) {
        x = e.clientX;
        y = e.clientY;
      }
      tx = e.clientX;
      ty = e.clientY;
      over = Boolean(e.target.closest('a,button,select'));
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-over', over);
      if (!frame) frame = requestAnimationFrame(follow);
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
  for (const el of $$('.magnetic')) {
    el.onpointermove = (e) => {
      if (reduced.matches) return;
      const r = el.getBoundingClientRect();
      el.style.translate =
        ((e.clientX - r.left) / r.width - 0.5) * 7 +
        'px ' +
        ((e.clientY - r.top) / r.height - 0.5) * 5 +
        'px';
    };
    el.onpointerleave = () => el.style.removeProperty('translate');
  }
}
// Scroll enhancements are needed only after the visitor starts exploring.
window.addEventListener('scroll', enhanceMotion, { once: true, passive: true });
