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
  const stage = document.querySelector('.hero-scene__stage');
  const close = () => { if (dialog.open) dialog.close(); };
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const minimum = setTimeout(() => {
    if (!stage.classList.contains('is-loading')) reveal();
    else observer.observe(stage, { attributes: true, attributeFilter: ['class'] });
  }, 800);
  const deadline = setTimeout(reveal, 2000);
  let completion;
  const observer = new MutationObserver(() => {
    if (!stage.classList.contains('is-loading')) reveal();
  });

  function reveal() {
    if (!dialog.open || dialog.classList.contains('is-revealing')) return;
    dialog.classList.add('is-revealing');
    completion = setTimeout(close, 760);
  }

  motion.addEventListener('change', close, options);
  window.addEventListener('pagehide', close, options);
  dialog.addEventListener('close', () => {
    clearTimeout(minimum);
    clearTimeout(deadline);
    clearTimeout(completion);
    observer.disconnect();
    controller.abort();
  }, { once: true });
}
