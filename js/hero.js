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
  import('./HeroScene.js').then(({ mountHeroScene }) => {
    let dispose;
    function mount() {
      setLoading(true);
      try { dispose = mountHeroScene(stage); }
      catch { setLoading(false); }
    }
    mount();
    window.addEventListener('pagehide', () => dispose?.());
    window.addEventListener('pageshow', event => { if (event.persisted) mount(); });
  }).catch(() => setLoading(false));
}
