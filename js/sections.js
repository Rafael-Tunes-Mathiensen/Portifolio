import {
  skills,
  tcc,
  projects,
  events,
  gallery,
  certificates,
  hobbies,
  githubAccount,
} from './data.js';

const shapes = {
  folder: 'M3 7h7l2 2h9v10H3z M3 7V5h7l2 2h7v2',
  arrow: 'M6 18 18 6M6 6h12v12',
  next: 'm9 5 7 7-7 7',
  back: 'm15 5-7 7 7 7',
  close: 'm6 6 12 12M18 6 6 18',
  code: 'm7 7-5 5 5 5m10-10 5 5-5 5m-4-12-2 14',
  game: 'M5 7h14l3 10-2 2-5-4H9l-5 4-2-2z M7 9v4m-2-2h4m7-1h1m2 2h1',
  cube: 'm12 2 9 5v10l-9 5-9-5V7z M3 7l9 5 9-5m-9 5v10',
  pen: 'm4 16 12-12 4 4L8 20l-5 1z M13 7l4 4',
  weight: 'M2 9v6m3-9v12m3-9v6m0-3h8m0-3v6m3-9v12m3-9v6',
  book: 'M12 7q-4-3-10-2v13q6-1 10 2 4-3 10-2V5q-6-1-10 2v13',
  ball: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M8 10l4-3 4 3-2 5h-4z M12 7V3m4 7 5-1m-7 6 3 5m-7-5-3 5m1-10L3 9',
  film: 'M3 6h18v14H3z M3 10h18M7 6l2 4m4-4 2 4m4-4 2 4',
};
function icon(name) {
  return `<svg class="folio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${shapes[name]}"/></svg>`;
}
function link(label, url, kind = '') {
  return `<a class="folio-link ${kind}" href="${url}" target="_blank" rel="noopener noreferrer">${label}${icon('arrow')}</a>`;
}
function tags(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}
function filters(name, items) {
  return `<div class="folio-filters" role="group" aria-label="Filtrar ${name}">${['Todos', ...items].map((v, i) => `<button type="button" data-filter="${v}" aria-pressed="${i === 0}">${v}</button>`).join('')}</div>`;
}
function marquee(items) {
  const group = `<ul>${tags(items)}</ul>`;
  return `<div class="folio-marquee"><div class="folio-marquee__track">${group}<ul aria-hidden="true">${tags(items)}</ul></div></div>`;
}
function sectionSkills() {
  const groups = [
    ['Conhecimentos', skills.declared, 'declared'],
    ['Aplicados no BidXchange', skills.applied, 'applied'],
  ];
  const renderGroup = ([label, items, key]) => {
    const brands = items.filter(name => skills.logos[name]);
    const otherSkills = items.filter(name => !skills.logos[name]);
    const marks = brands.map(name => {
      const logo = skills.logos[name];
      return `<li class="skills__item"><img class="skills__logo skills__logo--${logo}" src="./assets/tecnologias/${logo}.svg" width="42" height="42" alt="" loading="lazy" decoding="async"><span>${name}</span></li>`;
    }).join('');
    return `<div class="skills__group skills__group--${key}"><h3>${label}</h3><ul class="skills__marks">${marks}</ul>${otherSkills.length ? `<ul class="skills__fields">${tags(otherSkills)}</ul>` : ''}</div>`;
  };
  return `<section id="skills" class="folio-section skills"><div class="wrap"><h2>Skills</h2><div class="skills__groups">${groups.map(renderGroup).join('')}</div></div></section>`;
}
function caseDiagram(active = 0) {
  const words = tcc.flow.illustration;
  let drawing;
  if (active === 0) {
    drawing = `<g class="case-flow__source">
      <path fill="#304678" stroke="#a696c3" d="m41 94 56-30 56 30v7H41z"/><path stroke="#e1ccff" d="m46 93 51-26 51 26"/>
      <path stroke="#aa9cb8" fill="#20345b" d="M49 103h95v50H49zM42 153h108v7H42z"/><path stroke="#c7b8d6" stroke-width="6" d="M62 108v39m22-39v39m24-39v39m23-39v39"/>
      <circle cx="97" cy="85" r="4" fill="#b3c8ff"/></g>
      <path class="case-flow__wire" d="M151 125h42l20-20h28"/><path stroke="#c9d8ff" d="m232 99 8 6-8 6"/>
      <g class="case-flow__paper"><path fill="#263958" stroke="#725e86" d="M255 41h69l28 28v96h-97z"/>
      <path fill="#f2f0e6" stroke="#fffdf1" d="M246 34h70l27 27v94h-97z"/><path fill="#aab8d7" d="M316 34v27h27z"/>
      <text class="case-flow__ink" x="259" y="81">${words.quote}</text><path stroke="#81768e" stroke-width="3" d="M260 94h57m-57 11h66m-66 11h38"/>
      <g class="case-flow__stamp"><circle cx="337" cy="146" r="17" fill="#c9d8ff" stroke="#172019"/><path d="m330 146 5 5 9-11" stroke="#263420" stroke-width="3"/></g></g>`;
  } else if (active === 1) {
    const proposal = (x,y,rotation,index) => `<g transform="translate(${x} ${y}) rotate(${rotation})"><g class="case-flow__offer" style="--delay:${index*65}ms">
      <rect width="108" height="52" rx="4" fill="#263958" stroke="#a896c4"/><path d="m10 12 5-3 5 3v6l-5 3-5-3z" fill="#b3c8ff"/>
      <text x="26" y="20">${words.proposal}</text><path d="M12 33h77m-77 8h45" stroke="#8d809e"/></g></g>`;
    drawing = `<path class="case-flow__wire" d="M157 48h38l28 40h29m-92 23h92m-103 48h47l28-31h28"/>
      ${proposal(47,30,-5,0)}${proposal(58,78,0,1)}${proposal(41,128,4,2)}
      <g class="case-flow__inbox"><path fill="#263958" stroke="#a996c6" d="m257 108 23-38h52l25 38v31l-11 9h-79l-10-9z"/>
      <path fill="#425e99" stroke="#c3aadf" d="M257 108h27l6 10h34l7-10h26"/><path class="case-flow__deposit" d="M307 42v48m-14-14 14 14 14-14" stroke="#c9d8ff" stroke-width="4"/></g>`;
  } else if (active === 2) {
    drawing = `<g class="case-flow__table"><rect x="51" y="37" width="296" height="111" rx="6" fill="#20345b" stroke="#9a89ac"/>
      <path d="M51 71h296M51 97h296M51 122h296M147 38v109m95-109v109" stroke="#594f67"/>
      <text x="64" y="59">${words.price}</text><text x="162" y="59">${words.term}</text><text x="255" y="59">${words.terms}</text>
      <g class="case-flow__criteria" stroke="#ad9fbf" stroke-width="4"><path d="M64 84h41m57 0h24m68 0h56M64 110h57m41 0h45m48 0h28M64 135h22m76 0h55m38 0h39"/></g></g>
      <g class="case-flow__ballot"><rect x="232" y="135" width="145" height="34" rx="5" fill="#c9d8ff"/>
      <path d="M243 146h11v11h-11z" stroke="#263420"/><path d="m245 151 2 2 5-5" stroke="#263420" stroke-width="1.7"/>
      <text class="case-flow__ink" x="261" y="157">${words.vote}</text></g>`;
  } else {
    drawing = `<g class="case-flow__message case-flow__message--first"><path d="M61 49h194v57H100l-24 18v-18H61z" fill="#263958" stroke="#b39bce"/>
      <circle cx="86" cy="76" r="10" fill="#b3c8ff"/><path d="M108 69h104m-104 13h71" stroke="#d8cce4" stroke-width="3"/></g>
      <g class="case-flow__message case-flow__message--reply"><path d="M156 101h185v49h-15v18l-25-18H156z" fill="#3c588d" stroke="#cddaff"/>
      <path d="M171 120h89m-89 12h59" stroke="#e1e9ff" stroke-width="3"/><circle cx="316" cy="126" r="9" fill="#bdcdf4"/></g>
      <g class="case-flow__lock"><rect x="238" y="31" width="124" height="32" rx="16" fill="#c9d8ff"/>
      <path stroke="#253520" d="M251 45h10v8h-10zm2 0v-3a3 3 0 0 1 6 0v3"/><text class="case-flow__ink" x="268" y="52">${words.chat}</text></g>`;
  }
  return `<svg class="case-flow__svg" viewBox="0 0 408 200" fill="none" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">
    <defs><pattern id="flow-grid" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".8" fill="#a8bffa" opacity=".32"/></pattern></defs>
    <rect width="408" height="200" fill="url(#flow-grid)"/><path stroke="#8da3d6" d="M14 28V15h13m354 0h13v13M14 172v13h13m354 0h13v-13"/>
    ${drawing}</svg>`;
}
function audienceView(role) {
  return `<div class="case-audience__view"><p class="case-audience__question">${tcc.roleHeadlines[role]}</p><ul>${tags(tcc.audiences[role])}</ul></div>`;
}
function sectionCase() {
  const audience = Object.keys(tcc.audiences);
  return `<section id="bidxchange" class="folio-section case"><div class="wrap">
    <header class="case-cover">
      <div class="case-cover__story">
        <div class="case-cover__identity"><h2><img src="${tcc.preview.logo}" alt="${tcc.name}" width="170" height="108" loading="lazy"></h2><span class="case__seal">TCC</span></div>
        <h3>${tcc.pitch}</h3><p>${tcc.overview}</p><p class="case__authors">Por ${tcc.authors}</p>
        <div class="case-cover__links">${link('Acessar plataforma', tcc.live, 'case-cover__primary magnetic')}${link('Ver documentação', tcc.docs, 'case-cover__secondary')}</div>
      </div>
      <figure class="case-showcase">
        <a class="case-showcase__devices" href="${tcc.live}" target="_blank" rel="noopener noreferrer" aria-label="Visitar a página inicial do BidXchange">
          <span class="case-showcase__desktop"><span class="case-showcase__chrome"><i aria-hidden="true"></i>${new URL(tcc.live).hostname}</span><img src="${tcc.preview.desktop}" alt="${tcc.preview.desktopAlt}" width="1440" height="900" loading="lazy"></span>
          <span class="case-showcase__phone"><img src="${tcc.preview.mobile}" alt="${tcc.preview.mobileAlt}" width="390" height="844" loading="lazy"></span>
        </a>
      </figure>
    </header>
    <div class="case__panels"><div class="case-flow"><h3>Da cotação à negociação</h3>
    <div class="case-flow__screen" id="flow-view"><div class="case-flow__screen-head"><span>${tcc.flow.label}</span><span data-step-position>01 / 04</span></div><div class="case-flow__drawing">${caseDiagram()}</div></div>
    <div class="case-flow__steps" role="group" aria-label="Etapas da cotação">${tcc.steps.map(([s], i) => `<button type="button" data-step="${i}" aria-controls="flow-view" aria-pressed="${i === 0}" tabindex="${i === 0 ? 0 : -1}"><span aria-hidden="true">0${i+1}</span>${s}</button>`).join('')}</div>
    <div class="case-flow__caption"><div aria-live="off" aria-atomic="true"><h4 data-step-title>${tcc.flow.scenes[0]}</h4><p id="flow-description">${tcc.steps[0][1]}</p></div>
    <div class="case-flow__arrows"><button type="button" data-flow-back aria-label="Etapa anterior" aria-disabled="true">${icon('back')}</button><button type="button" data-flow-next aria-label="Próxima etapa" aria-disabled="false">${icon('next')}</button></div></div></div>
    <div class="case-audience"><h3>Funcionalidades por perfil</h3><div class="folio-filters" role="tablist" aria-label="Perfil de usuário">${audience.map((v, i) => `<button type="button" role="tab" id="aud-${i}" aria-selected="${i === 0}" aria-controls="aud-panel" tabindex="${i === 0 ? 0 : -1}">${v}</button>`).join('')}</div><div id="aud-panel" role="tabpanel" tabindex="0" aria-labelledby="aud-0">${audienceView(audience[0])}</div></div></div>
    </div></section>`;
}
function projectArt(type) {
  if (type === 'vinyl')
    return `<img src="assets/trackbox.webp" alt="" width="520" height="484" loading="lazy">`;
  return `<svg viewBox="0 0 480 180" aria-hidden="true"><g fill="none" stroke="currentColor" opacity=".4"><path d="m0 153 70-47 47 30 87-59 60 42 80-53 136 94M0 173l80-39 42 19 79-45 69 34 77-47 133 75"/></g><g transform="translate(185 13) scale(4)" shape-rendering="crispEdges"><path d="M25 1h5v6h-2v4h-3v3h-3v3h-3v3h-3v3h-3l-2-2v-3h3v-3h3v-3h3V9h3V6h2z" fill="#d9d5ff"/><path d="M28 4h2v3h-2v4h-3v3h-3v3h-3v3h-3v3h-3v-3h3v-3h3v-3h3v-3h3V8h3z" fill="#a39fef"/><path d="M7 17h3v3h3v3h3v3h-3v-2h-3v-3H7z" fill="#c8fa78"/><path d="M8 23h3v3H8v3H5v-3h3zM3 28h3v3H3z" fill="#a293e2"/></g></svg>`;
}
function sectionProjects() {
  return `<section id="projetos" class="folio-section"><div class="wrap"><h2>Outros projetos</h2><div class="project-grid">${projects.map((p) => `<article class="project-card tilt"><a href="${p.url}" target="_blank" rel="noopener noreferrer"><div class="project-art project-art--${p.art}">${projectArt(p.art)}</div><div class="project-card__body"><span class="folio-meta" data-language="${p.repo}">${p.language}</span><h3>${p.name}${icon('arrow')}</h3><p>${p.description}</p><span class="project-card__link">Ver projeto no GitHub</span></div></a></article>`).join('')}</div></div></section>`;
}
function sectionEvents() {
  const categories = ['Mentoria', 'Palestra', 'Visita', 'Monitoria'];
  const metrics = [
    ['Mentoria', 'ciclos de mentoria'],
    ['Palestra', 'palestra'],
    ['Visita', 'visita técnica'],
  ];
  const album = gallery.length ? `<section class="gallery" aria-labelledby="gallery-title" aria-roledescription="carrossel">
    <div class="gallery__header"><h3 id="gallery-title">Álbum de encontros</h3>
      <div class="gallery__controls"><span class="gallery__status" aria-live="polite" aria-atomic="true">Foto 1 de ${gallery.length}</span>
        <button type="button" data-prev aria-controls="gallery-stage" aria-label="Foto anterior">${icon('back')}</button>
        <button type="button" data-next aria-controls="gallery-stage" aria-label="Próxima foto">${icon('next')}</button>
      </div>
    </div>
    <div id="gallery-stage" class="gallery__stage" tabindex="0" role="group" aria-label="Fotos dos encontros. Use as setas para navegar.">
      ${gallery.map((photo, i) => `<div class="gallery__slide${i === 0 ? ' is-current' : ''}" aria-hidden="${i !== 0}">
        <img class="gallery__wash" loading="lazy" src="${photo.src}" alt="">
        <img class="gallery__photo" loading="lazy" src="${photo.src}" alt="${photo.alt}" draggable="false">
      </div>`).join('')}
    </div>
    <div class="gallery__thumbs" role="group" aria-label="Escolher foto">
      ${gallery.map((photo, i) => `<button class="gallery__thumb" type="button" aria-controls="gallery-stage" aria-label="Foto ${i+1}. ${photo.alt}" aria-current="${i === 0}">
        <img src="${photo.src}" loading="lazy" alt="">
      </button>`).join('')}
    </div></section>` : '';
  return `<section id="mentorias" class="folio-section"><div class="wrap"><h2>Mentorias e palestras</h2>
    <div class="events__metrics">${metrics
      .map(([cat, label]) => {
        const n = events.filter((e) => e.category === cat && e.count).length;
        return `<span><b data-count="${n}">${n}</b> ${label}</span>`;
      })
      .join('')}</div>
    ${album}<div class="events__timeline">${filters('atividades', categories)}<div class="events__reader" role="region" aria-label="Relatos das atividades" tabindex="0" data-lenis-prevent><div class="events__list"><span class="folio-rail" aria-hidden="true"></span>${events.map((e) => `<article class="event" data-category="${e.category}"><div class="folio-meta">${[e.category, e.date].filter(Boolean).join(' · ')}</div><h3>${e.title}</h3>${e.org ? `<strong>${e.org}</strong>` : ''}<p>${e.body}</p></article>`).join('')}</div></div></div></div></section>`;
}
const dateFormatter = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' });
function certMeta(c) {
  return [
    dateFormatter.format(new Date(c.date + 'T12:00:00Z')),
    c.hours ? c.hours + ' h' : 'Carga horária não informada',
    c.city,
  ]
    .filter(Boolean)
    .join(' · ');
}
function certImage(c, large = false) {
  return `<img src="${large ? c.image : c.preview}" alt="${large ? 'Certificado de ' + c.title + ' emitido por ' + c.issuer : ''}" width="600" height="425" ${large ? '' : 'loading="lazy"'} data-cert-image>`;
}
function certCard(c) {
  return `<article class="cert-card tilt"><div class="cert-card__preview">${certImage(c)}</div><div class="cert-card__body"><span class="folio-meta">${c.issuer}</span><h3>${c.title}</h3><p>${certMeta(c)}</p><button type="button" data-open-cert="${c.id}">Ver certificado ${icon('next')}</button></div></article>`;
}
function sectionCerts() {
  const categories = [...new Set(certificates.map((c) => c.category))];
  const issuers = [...new Set(certificates.map((c) => c.issuer))];
  return `<section id="certificados" class="folio-section"><div class="wrap"><h2>Certificados <sup data-count="${certificates.length}">${certificates.length}</sup></h2><div class="certs__controls">${filters('certificados', categories)}<label>Ordenar <select aria-label="Ordenar certificados por data"><option value="desc">Mais recentes</option><option value="asc">Mais antigos</option></select></label></div><div class="cert-grid"></div><div class="certs__issuers">${marquee(issuers)}</div>
    <dialog class="cert-dialog" aria-labelledby="cert-title" data-lenis-prevent><div class="cert-dialog__header"><div><h3 id="cert-title"></h3><p></p></div><button data-close-cert aria-label="Fechar certificado">${icon('close')}</button></div><div class="cert-dialog__content"></div></dialog></div></section>`;
}
function sectionHobbies() {
  return `<section id="hobbies" class="folio-section"><div class="wrap"><h2>Fora do código</h2><ul class="hobbies">${hobbies.map(([label, symbol]) => `<li><span class="hobbies__stage"><img src="assets/hobbies/${symbol}.svg" alt="" loading="lazy" width="96" height="78"></span><span>${label}</span></li>`).join('')}</ul></div></section>`;
}

function setupCase(section) {
  const groups = Object.keys(tcc.audiences);
  const tabs = [...section.querySelectorAll('[role=tab]')];
  const panel = section.querySelector('[role=tabpanel]');
  function selectTab(index) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(index === i));
      tab.tabIndex = i === index ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tabs[index].id);
    panel.innerHTML = audienceView(groups[index]);
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(index));
    tab.addEventListener('keydown', (event) => {
      const keys = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (!(event.key in keys)) return;
      event.preventDefault();
      tabs[keys[event.key]].focus();
      selectTab(keys[event.key]);
    });
  });
  const flow = section.querySelector('.case-flow');
  const steps = [...flow.querySelectorAll('[data-step]')];
  const previous = flow.querySelector('[data-flow-back]');
  const next = flow.querySelector('[data-flow-next]');
  let current = 0;
  function showStep(index) {
    if (index < 0 || index >= steps.length || index === current) return;
    current = index;
    steps.forEach((button,i) => {
      button.setAttribute('aria-pressed', String(i === current));
      button.tabIndex = i === current ? 0 : -1;
    });
    previous.setAttribute('aria-disabled',String(current === 0));
    next.setAttribute('aria-disabled',String(current === steps.length - 1));
    flow.querySelector('[data-step-position]').textContent = String(current + 1).padStart(2,'0')+' / '+String(steps.length).padStart(2,'0');
    flow.querySelector('.case-flow__drawing').innerHTML = caseDiagram(current);
    flow.querySelector('[data-step-title]').textContent = tcc.flow.scenes[current];
    flow.querySelector('#flow-description').textContent = tcc.steps[current][1];
  }
  let timer;
  let visible = false;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function syncPlayback() {
    clearInterval(timer);
    const playing = visible && !document.hidden && !flow.contains(document.activeElement)
      && !reducedMotion.matches && !document.body.classList.contains('motion-paused');
    flow.querySelector('[aria-live]').setAttribute('aria-live', playing ? 'off' : 'polite');
    if (playing) timer = setInterval(() => showStep((current + 1) % steps.length), 5000);
  }
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= .35;
    syncPlayback();
  }, { threshold: .35 }).observe(flow);
  flow.addEventListener('focusin', syncPlayback);
  flow.addEventListener('focusout', () => queueMicrotask(syncPlayback));
  document.addEventListener('visibilitychange', syncPlayback);
  document.addEventListener('portfolio-motion', syncPlayback);
  reducedMotion.addEventListener('change', syncPlayback);
  steps.forEach((button,index) => button.addEventListener('click',() => showStep(index)));
  flow.querySelector('.case-flow__steps').addEventListener('keydown',event => {
    const destinations = { ArrowLeft: Math.max(0,current-1), ArrowRight: Math.min(steps.length-1,current+1), Home:0, End:steps.length-1 };
    if (!Object.hasOwn(destinations,event.key)) return;
    event.preventDefault();
    showStep(destinations[event.key]);
    steps[current].focus();
  });
  previous.addEventListener('click',() => showStep(current - 1));
  next.addEventListener('click',() => showStep(current + 1));
}
function setupFilters(section, apply) {
  const buttons = [...section.querySelectorAll('[data-filter]')];
  buttons.forEach((button) =>
    button.addEventListener('click', () => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b === button)));
      apply(button.dataset.filter);
    }),
  );
}
function setupGallery(section) {
  const album = section.querySelector('.gallery');
  if (!album) return;
  const slides = [...album.querySelectorAll('.gallery__slide')];
  const thumbs = [...album.querySelectorAll('.gallery__thumb')];
  const stage = album.querySelector('.gallery__stage');
  const status = album.querySelector('.gallery__status');
  let active = 0;
  function select(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const selected = i === active;
      slide.classList.toggle('is-current', selected);
      slide.setAttribute('aria-hidden', String(!selected));
      thumbs[i].setAttribute('aria-current', String(selected));
    });
    status.textContent = `Foto ${active + 1} de ${slides.length}`;
  }
  album.querySelector('[data-prev]').onclick = () => select(active - 1);
  album.querySelector('[data-next]').onclick = () => select(active + 1);
  thumbs.forEach((thumb, i) => thumb.onclick = () => select(i));
  album.addEventListener('keydown', (event) => {
    const destination = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: slides.length - 1 }[event.key];
    if (destination === undefined) return;
    event.preventDefault();
    select(destination);
    if (thumbs.includes(event.target)) thumbs[active].focus();
  });
  let start;
  stage.addEventListener('pointerdown', (event) => {
    if (event.isPrimary && event.button === 0) {
      start = { x: event.clientX, y: event.clientY };
      stage.setPointerCapture(event.pointerId);
    }
  });
  stage.addEventListener('pointercancel', () => { start = null; });
  stage.addEventListener('pointerup', (event) => {
    if (!start || !event.isPrimary) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) select(active + (dx < 0 ? 1 : -1));
  });
}
function setupCerts(section) {
  let category = 'Todos';
  const select = section.querySelector('select');
  const grid = section.querySelector('.cert-grid');
  const modal = section.querySelector('dialog');
  function draw() {
    const visible = certificates.filter((c) => category === 'Todos' || c.category === category);
    visible.sort((a, b) =>
      select.value === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    );
    grid.innerHTML = visible.map(certCard).join('');
  }
  setupFilters(section, (value) => {
    category = value;
    draw();
  });
  select.addEventListener('change', draw);
  draw();
  grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-cert]');
    if (!trigger) return;
    const cert = certificates.find((c) => c.id === trigger.dataset.openCert);
    modal.querySelector('h3').textContent = cert.title;
    modal.querySelector('p').textContent = cert.issuer + ' · ' + certMeta(cert);
    modal.querySelector('.cert-dialog__content').innerHTML =
      certImage(cert, true) +
      `<div class="cert-dialog__links">${cert.original ? link('Abrir PDF original', cert.original) : ''}${cert.verify ? link('Verificar autenticidade', cert.verify) : ''}</div>`;
    modal.showModal();
    modal.querySelector('[data-close-cert]').focus();
    modal.addEventListener('close', () => trigger.focus(), { once: true });
  });
  modal.querySelector('[data-close-cert]').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      const r = modal.getBoundingClientRect();
      if (
        event.clientX < r.left ||
        event.clientX > r.right ||
        event.clientY < r.top ||
        event.clientY > r.bottom
      )
        modal.close();
    }
  });
  // The placeholder is inline, so a missing image never causes a second request.
  section.addEventListener(
    'error',
    (e) => {
      const img = e.target;
      if (!img.matches?.('img[data-cert-image]')) return;
      const fallback = document.createElement('div');
      fallback.className = 'cert-placeholder';
      fallback.innerHTML = icon('folder') + '<span>Prévia indisponível</span>';
      img.replaceWith(fallback);
    },
    true,
  );
}
function setupMotion(container) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!motion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries
          .filter((e) => e.isIntersecting)
          .forEach(({ target }) => {
            observer.unobserve(target);
            const version = target.dataset.version?.split('.');
            const finalValue = Number(target.dataset.count ?? version?.[0]);
            const start = performance.now();
            const tick = (now) => {
              const fraction = motion.matches ? 1 : Math.min(1, (now - start) / 550);
              const current = Math.round(finalValue * (1 - (1 - fraction) ** 2));
              target.textContent = version ? [current, ...version.slice(1)].join('.') : String(current);
              if (fraction < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }),
      { threshold: 0.6 },
    );
    container.querySelectorAll('[data-count],[data-version]').forEach((el) => observer.observe(el));
  }
  container.addEventListener(
    'pointermove',
    (e) => {
      if (motion.matches || e.pointerType !== 'mouse') return;
      const card = e.target.closest('.tilt');
      if (!card) return;
      const box = card.getBoundingClientRect();
      const x = (e.clientX - box.left) / box.width,
        y = (e.clientY - box.top) / box.height;
      card.style.setProperty('--rx', (0.5 - y) * 5 + 'deg');
      card.style.setProperty('--ry', (x - 0.5) * 5 + 'deg');
      card.style.setProperty('--spot-x', x * 100 + '%');
      card.style.setProperty('--spot-y', y * 100 + '%');
    },
    { passive: true },
  );
  container.addEventListener('pointerout', (e) => {
    const card = e.target.closest('.tilt');
    if (!card || card.contains(e.relatedTarget)) return;
    card.style.removeProperty('--rx');
    card.style.removeProperty('--ry');
  });
}
async function refreshGitHub(container) {
  // The anonymous public listing omits private repositories and needs no token.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3500);
  try {
    const response = await fetch(
      'https://api.github.com/users/' + githubAccount + '/repos?per_page=100',
      { signal: controller.signal, credentials: 'omit' },
    );
    if (!response.ok) return;
    const repositories = await response.json();
    if (!Array.isArray(repositories)) return;
    for (const label of container.querySelectorAll('[data-language]')) {
      const remote = repositories.find((r) => r.name === label.dataset.language);
      if (typeof remote?.language === 'string' && remote.language) label.textContent = remote.language;
    }
  } catch {
    // Os textos verificados do data.js permanecem disponíveis offline.
  } finally {
    clearTimeout(timer);
  }
}
export function renderSections() {
  const container = document.getElementById('sections');
  container.innerHTML = [
    sectionSkills(),
    sectionCase(),
    sectionProjects(),
    sectionEvents(),
    sectionCerts(),
    sectionHobbies(),
  ].join('');
  setupCase(container.querySelector('#bidxchange'));
  const timeline = container.querySelector('#mentorias');
  const reader = timeline.querySelector('.events__reader');
  const reducedScroll = matchMedia('(prefers-reduced-motion: reduce)');
  let pageDelta = 0;
  let pageFrame = 0;
  let lastFrame = 0;
  function easePageScroll(now) {
    const elapsed = lastFrame ? Math.min(now - lastFrame, 32) : 16;
    const step = Math.abs(pageDelta) <= 2 ? pageDelta : pageDelta * (1 - Math.exp(-elapsed / 75));
    const before = window.scrollY;
    window.scrollBy({ top: step, behavior: 'instant' });
    pageDelta -= step;
    if (Math.abs(step) >= 1 && window.scrollY === before) pageDelta = 0;
    lastFrame = now;
    pageFrame = pageDelta ? requestAnimationFrame(easePageScroll) : 0;
  }
  function stopPageScroll() {
    cancelAnimationFrame(pageFrame);
    pageFrame = pageDelta = lastFrame = 0;
  }
  window.addEventListener('wheel', (event) => {
    if (!reader.contains(event.target)) stopPageScroll();
  }, { capture: true, passive: true });
  reader.addEventListener('wheel', (event) => {
    if (!event.cancelable || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (!event.deltaY) return;
    // Own the wheel gesture from its first event so it can cross the panel boundary.
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? reader.clientHeight : 1;
    const delta = event.deltaY * unit;
    if (delta * pageDelta < 0) stopPageScroll();
    const start = reader.scrollTop;
    const limit = reader.scrollHeight - reader.clientHeight;
    const target = Math.min(limit, Math.max(0, start + delta));
    reader.scrollTop = target;
    const remaining = delta - (target - start);
    if (Math.abs(remaining) <= .01) return;
    if (reducedScroll.matches) {
      window.scrollBy({ top: remaining, behavior: 'instant' });
      return;
    }
    pageDelta += remaining;
    if (!pageFrame) {
      lastFrame = 0;
      pageFrame = requestAnimationFrame(easePageScroll);
    }
  }, { passive: false });
  function updateReadingProgress() {
    const limit = reader.scrollHeight - reader.clientHeight;
    const progress = reader.scrollTop >= limit - 1 ? 1 : Math.max(0, reader.scrollTop / limit);
    reader.style.setProperty('--reading-progress', progress);
  }
  reader.addEventListener('scroll', updateReadingProgress, { passive: true });
  const readingSize = new ResizeObserver(updateReadingProgress);
  readingSize.observe(reader);
  readingSize.observe(reader.querySelector('.events__list'));
  setupFilters(timeline, (value) => {
    stopPageScroll();
    timeline.querySelectorAll('.event').forEach((e) => {
      e.hidden = value !== 'Todos' && value !== e.dataset.category;
    });
    reader.scrollTop = 0;
    updateReadingProgress();
  });
  setupGallery(timeline);
  setupCerts(container.querySelector('#certificados'));
  setupMotion(container);
  const projectsSection = container.querySelector('#projetos');
  const nearProjects = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      nearProjects.disconnect();
      refreshGitHub(container);
    }
  }, { rootMargin: '400px' });
  nearProjects.observe(projectsSection);
}
