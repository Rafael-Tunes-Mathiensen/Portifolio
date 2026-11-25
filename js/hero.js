function startIntro(reduced) {
  const dialog = document.querySelector('.intro');
  try {
    if (localStorage.getItem('rtm-intro-seen')) return;
    localStorage.setItem('rtm-intro-seen', '1');
  } catch { return; }
  if (reduced.matches || location.hash || scrollY || !dialog.showModal) return;
  dialog.showModal();
  const close = () => dialog.close();
  const timeout = setTimeout(close, 3200);
  const animations = [];
  const events = new AbortController();
  const options = { signal: events.signal };
  reduced.addEventListener('change', close, options);
  window.addEventListener('pagehide', close, options);
  window.addEventListener('orientationchange', close, options);
  dialog.addEventListener('close', () => {
    clearTimeout(timeout);
    events.abort();
    animations.forEach(animation => animation.cancel());
  }, { once: true });
  const started = performance.now();
  return (canvas, point) => {
    if (!dialog.open) return;
    const box = canvas.getBoundingClientRect();
    const x = box.width * (1 + point.x) / 2;
    const y = box.height * (1 - point.y) / 2;
    const delay = Math.max(0, 1150 - (performance.now() - started));
    const timing = { duration: 1150, delay, fill: 'both', easing: 'cubic-bezier(.32,0,.15,1)' };
    const move = (element, frames) => {
      const animation = element.animate(frames, timing);
      animations.push(animation);
      return animation;
    };
    move(canvas, [
      { transformOrigin: '0 0', transform: 'translate(' + (innerWidth / 2 - box.left - x * 7) + 'px,' + (innerHeight / 2 - box.top - y * 7) + 'px) scale(7)' },
      { transformOrigin: '0 0', transform: 'none' },
    ]);
    const screen = dialog.querySelector('.intro__screen');
    move(screen, [{ opacity: 1 }, { opacity: 0 }]);
    const dot = document.querySelector('#hero-name .accent').getBoundingClientRect();
    move(dialog.querySelector('.intro__dot'), [
      { opacity: 0 }, { opacity: 1, offset: .12 },
      { left: (dot.left + dot.width / 2) + 'px', top: (dot.bottom - dot.height * .22) + 'px', opacity: 0 },
    ]).onfinish = close;
  };
}

export function setupHero(profile, reduced) {
  const $ = selector => document.querySelector(selector);
  const heading = $('#hero-name');
  const words = profile.name.split(' ');
  const surname = words.pop();
  heading.firstElementChild.textContent = words.join(' ');
  heading.lastElementChild.firstChild.textContent = surname;
  $('#role').textContent = profile.role;
  $('#tagline').textContent = profile.tagline;

  if (!reduced.matches) {
    [...heading.children].forEach((span, i) =>
      span.animate(
        [
          { transform: 'translateY(12px)', opacity: 0.6 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 400, delay: i * 60 },
      ),
    );
  }
  const terminal = $('#terminal');
  const specialties = profile.specialties;
  if (specialties?.length) {
    terminal.textContent = specialties[0];
    let term = 0;
    function typeNext() {
      if (reduced.matches) {
        terminal.textContent = specialties[0];
        return;
      }
      if (document.body.classList.contains('motion-paused')) {
        setTimeout(typeNext, 500);
        return;
      }
      term = (term + 1) % specialties.length;
      const word = specialties[term];
      let n = 0;
      function type() {
        if (document.body.classList.contains('motion-paused')) {
          terminal.textContent = word;
          setTimeout(typeNext, 1000);
          return;
        }
        terminal.textContent = word.slice(0, ++n);
        setTimeout(n < word.length ? type : typeNext, n < word.length ? 47 : 3800);
      }
      type();
    }
    if (!reduced.matches) setTimeout(typeNext, 3600);
  }
  const stage = $('.hero-scene__stage');
  const status = stage.querySelector('[data-scene-status]');
  function setLoading(loading) {
    stage.classList.toggle('is-loading', loading);
    status.textContent = loading ? 'Carregando a bancada 3D…' : 'Cena 3D indisponível.';
  }
  setLoading(true);
  const intro = startIntro(reduced);
  import('./HeroScene.js').then(({ mountHeroScene }) => {
    let dispose;
    function mount() {
      setLoading(true);
      try { dispose = mountHeroScene(stage, intro); }
      catch { setLoading(false); }
    }
    mount();
    window.addEventListener('pagehide', () => dispose?.());
    window.addEventListener('pageshow', event => { if (event.persisted) mount(); });
  }).catch(() => setLoading(false));
}
