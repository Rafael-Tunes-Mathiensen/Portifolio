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
  // A imagem continua visível até a primeira renderização bem-sucedida.
  import('./HeroScene.js').then(({ mountHeroScene }) => {
    const stage = $('.hero-scene__stage');
    let dispose;
    function mount() {
      try { dispose = mountHeroScene(stage); }
      catch { /* O navegador usa a ilustração existente. */ }
    }
    mount();
    window.addEventListener('pagehide', () => dispose?.());
    window.addEventListener('pageshow', event => { if (event.persisted) mount(); });
  }).catch(() => {});
}
