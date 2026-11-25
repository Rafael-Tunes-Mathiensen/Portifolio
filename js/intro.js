const dialog = document.querySelector('.loading-preview');
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const key = 'rtm-abertura-pixels';

function firstVisit() {
  try {
    return !localStorage.getItem(key);
  } catch {
    return false;
  }
}

if (!motion.matches && !location.hash && firstVisit()) {
  dialog.showModal();
  try { localStorage.setItem(key, '1'); } catch { /* Abertura disponível nesta visita. */ }
  const close = () => dialog.close();
  const timeout = setTimeout(close, 4700);
  motion.addEventListener('change', close);
  window.addEventListener('pagehide', close);
  dialog.addEventListener('close', () => {
    clearTimeout(timeout);
    motion.removeEventListener('change', close);
    window.removeEventListener('pagehide', close);
  }, { once: true });

  const shownAt = performance.now();
  function reveal() {
    setTimeout(() => {
      if (!dialog.open) return;
      dialog.classList.add('is-revealing');
      setTimeout(close, 720);
    }, Math.max(0, 1650 - (performance.now() - shownAt)));
  }
  if (document.readyState === 'complete') reveal();
  else window.addEventListener('load', reveal, { once: true });
}
