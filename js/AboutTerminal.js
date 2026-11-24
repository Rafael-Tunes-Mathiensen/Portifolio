import { comandos } from './data.js';

export function mountAboutTerminal(host, reducedMotion) {
  const terminal = document.createElement('div');
  terminal.className = 'about-terminal';
  terminal.innerHTML = `
    <div class="about-terminal__window">
      <div class="about-terminal__bar"><span aria-hidden="true"><i></i><i></i><i></i></span>~/rafael</div>
      <div class="about-terminal__scroll" data-lenis-prevent>
        <div role="log" aria-live="polite" aria-label="Saída do terminal"></div>
      </div>
      <div class="about-terminal__controls">
        <form><span class="about-terminal__prompt" aria-hidden="true">❯</span><input aria-label="Digite um comando" placeholder="digite help e tecle enter" autocomplete="off" autocapitalize="off" spellcheck="false"><span class="about-terminal__waiting" aria-hidden="true"><i>.</i><i>.</i><i>.</i></span></form>
        <div class="about-terminal__chips" role="group" aria-label="Comandos do terminal"></div>
      </div>
    </div>`;
  const scroll = terminal.querySelector('.about-terminal__scroll');
  const output = terminal.querySelector('[role="log"]');
  const input = terminal.querySelector('input');
  const chips = terminal.querySelector('.about-terminal__chips');
  const commands = Object.keys(comandos).filter((name) => !comandos[name].hidden);
  const history = [];
  let historyIndex = 0;
  let draft = '';
  let busy = false;
  let runId = 0;
  let started = false;
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const follow = () => { scroll.scrollTop = scroll.scrollHeight; };

  function write(line, kind = '') {
    const row = document.createElement('div');
    if (kind) row.className = 'about-terminal__' + kind;
    if (Array.isArray(line)) {
      const [label, href] = line;
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (href.startsWith('https:')) {
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
      }
      row.append(link);
    } else row.textContent = line;
    output.append(row);
    follow();
  }

  function clear() {
    runId++;
    busy = false;
    input.readOnly = false;
    input.value = '';
    output.replaceChildren();
  }

  async function execute(value, type = false, intro = false) {
    const name = value.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!name || busy) return;
    started = true;
    busy = true;
    input.readOnly = true;
    const id = ++runId;
    history.push(value.trim());
    historyIndex = history.length;
    draft = '';
    if (type && !intro && !reducedMotion.matches) {
      input.value = '';
      for (const char of name) {
        if (id !== runId) return;
        input.value += char;
        await wait(35);
      }
    }
    if (id !== runId) return;
    if (name === 'clear') return clear();
    input.value = '';
    if (!intro) write('❯ ' + name, 'echo');
    const command = Object.hasOwn(comandos, name) ? comandos[name] : null;
    const lines = name === 'help'
      ? commands.map((key) => key + ' · ' + comandos[key].description)
      : command?.lines ?? ['comando não encontrado. Digite help para ver os comandos.'];
    for (const [index, line] of lines.entries()) {
      if (index && !reducedMotion.matches) await wait(120);
      if (id !== runId) return;
      write(line, command ? '' : 'error');
    }
    busy = false;
    input.readOnly = false;
  }

  commands.forEach((name) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = name;
    button.addEventListener('click', () => execute(name, true));
    chips.append(button);
  });
  terminal.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    execute(input.value);
  });
  input.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      clear();
    } else if (!busy && ['ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault();
      if (historyIndex === history.length) draft = input.value;
      historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === 'ArrowUp' ? -1 : 1)));
      input.value = history[historyIndex] ?? draft;
    } else if (!busy && event.key === 'Tab' && !event.shiftKey) {
      const prefix = input.value.trim().toLowerCase();
      const match = commands.find((name) => name.startsWith(prefix));
      // A second Tab leaves the input after completing a command.
      if (prefix && match && match !== prefix) {
        event.preventDefault();
        input.value = match;
      }
    }
  });
  terminal.querySelector('.about-terminal__window').addEventListener('click', (event) => {
    if (!event.target.closest('a,input') && !window.getSelection()?.toString()) input.focus({ preventScroll: true });
  });
  output.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector(link.hash);
    if (!target) return;
    event.preventDefault();
    if (location.hash !== link.hash) window.history.pushState(null, '', link.hash);
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
  });
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    if (!started) execute('sobre', false, true);
  });
  observer.observe(terminal);
  host.replaceChildren(terminal);
}
