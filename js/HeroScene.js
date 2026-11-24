import * as T from './vendor/three/three.module.min.js';

export function mountHeroScene(stage) {
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  const canvas = renderer.domElement;
  const fallback = stage.querySelector('.hero-scene__placeholder');
  const tip = stage.querySelector('.hero-scene__tip');
  const links = stage.parentElement.querySelector('.hero-scene__links');
  const events = new AbortController();
  const options = { signal: events.signal };
  const geometries = new Set();
  const materials = new Set();
  const instances = [];
  const observers = [];
  let texture, frame = 0, disposed = false;

  function dispose() {
    if (disposed) return;
    disposed = true;
    cancelAnimationFrame(frame);
    events.abort();
    observers.forEach(observer => observer.disconnect());
    instances.forEach(mesh => mesh.dispose());
    geometries.forEach(geometry => geometry.dispose());
    materials.forEach(material => material.dispose());
    texture?.dispose();
    renderer.dispose();
    if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
    canvas.remove();
    tip.hidden = true;
    stage.classList.remove('is-loading');
    fallback.querySelector('[data-scene-status]').textContent = 'Cena 3D indisponível.';
    fallback.hidden = false;
  }

  try {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', 'Bancada 3D com computador retrô, teclado, torre, planta e caneca. Os atalhos a seguir levam às seções do portfólio.');
    const scene = new T.Scene();
    const camera = new T.OrthographicCamera(-4, 4, 3, -3, .1, 50);
    camera.position.set(3.6, 3.4, 10);
    camera.lookAt(0, .12, 0);
    const rig = new T.Group();
    scene.add(rig);
    const desk = new T.Group();
    desk.position.y = -1.1;
    rig.add(desk);
    const cube = new T.BoxGeometry();
    const cylinder = new T.CylinderGeometry(.5, .5, 1, 12);
    const leaf = new T.IcosahedronGeometry(.5);
    const plane = new T.PlaneGeometry();
    for (const shape of [cube, cylinder, leaf, plane]) geometries.add(shape);

    function paint(color) {
      const material = new T.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .06, flatShading: true, roughness: .86 });
      materials.add(material);
      return material;
    }
    function part(id, x, z) {
      const group = new T.Group();
      group.userData.link = links.querySelector('a[href="#' + id + '"]');
      group.position.set(x, 0, z);
      desk.add(group);
      return group;
    }
    function solid(parent, shape, mat, x, y, z, w, h, d) {
      const mesh = new T.Mesh(shape, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(w, h, d);
      parent.add(mesh);
      return mesh;
    }
    const wood = paint('#6b2f6e'), edge = paint('#442345');
    solid(desk, cube, wood, 0, -.13, 0, 6.2, .26, 3.15);
    solid(desk, cube, edge, 0, -.32, 0, 5.95, .14, 2.92);
    const monitor = part('projetos', -.48, -.35);
    const shell = paint('#9d7be0'), bezel = paint('#453350'), base = paint('#8566cc');
    solid(monitor, cube, base, 0, .12, 0, 1.85, .24, 1.14);
    solid(monitor, cube, base, 0, .36, 0, .85, .43, .67);
    solid(monitor, cube, base, 0, 1.49, -.56, 2.04, 1.58, .73);
    solid(monitor, cube, shell, 0, 1.54, 0, 2.6, 2.02, .83);
    solid(monitor, cube, bezel, 0, 1.59, .43, 2.29, 1.73, .10);
    const screen = document.createElement('canvas');
    screen.width = 256;
    screen.height = 192;
    const ctx = screen.getContext('2d');
    texture = new T.CanvasTexture(screen);
    texture.magFilter = texture.minFilter = T.NearestFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = T.SRGBColorSpace;
    const display = new T.MeshBasicMaterial({ map: texture });
    materials.add(display);
    solid(monitor, plane, display, 0, 1.59, .49, 2.13, 1.60, 1);
    solid(monitor, cube, paint('#b6f06a'), .98, .64, .425, .15, .045, .024);

    const tower = part('bidxchange', 1.62, -.35);
    const lilac = paint('#b79df0'), slots = paint('#534060');
    solid(tower, cube, lilac, 0, 1.04, 0, 1.13, 2.08, 1.22);
    for (const y of [1.72, 1.48]) solid(tower, cube, slots, 0, y, .62, .83, .10, .025);
    for (let i = 0; i < 5; i++) solid(tower, cube, slots, .574, .42 + i*.13, -.10, .025, .046, .70);
    solid(tower, cylinder, slots, .25, .73, .62, .18, .05, .18).rotation.x = Math.PI / 2;
    solid(tower, cube, paint('#b6f06a'), -.27, .71, .63, .16, .06, .045);

    const keyboard = part('skills', -.38, 1.01);
    solid(keyboard, cube, paint('#8566cc'), 0, .095, 0, 2.42, .19, .84);
    const keyMat = paint('#ffffff');
    const keys = new T.InstancedMesh(cube, keyMat, 32);
    instances.push(keys);
    keyboard.add(keys);
    const stamp = new T.Object3D();
    stamp.scale.set(.247, .09, .136);
    for (let i = 0; i < 32; i++) {
      stamp.position.set((i%8 - 3.5)*.286, .225, (Math.floor(i/8)-1.5)*.185);
      stamp.updateMatrix();
      keys.setMatrixAt(i, stamp.matrix);
      keys.setColorAt(i, new T.Color(i >= 24 ? '#b6f06a' : '#c5abea'));
    }
    const mug = part('contato', 2.32, .96);
    const cream = paint('#f2f0e6');
    solid(mug, cylinder, cream, 0, .27, 0, .52, .54, .52);
    solid(mug, cylinder, paint('#483343'), 0, .541, 0, .426, .008, .426);
    for (const y of [.14, .43]) solid(mug, cube, cream, .30, y, 0, .23, .08, .09);
    solid(mug, cube, cream, .397, .284, 0, .08, .34, .09);
    const steam = Array.from({ length: 7 }, (_, index) => {
      const material = new T.MeshBasicMaterial({
        color: '#eadfff', transparent: true, opacity: 0, depthWrite: false,
      });
      materials.add(material);
      const puff = new T.Mesh(leaf, material);
      // O vapor não intercepta os cliques na caneca ou nos outros atalhos.
      puff.raycast = () => {};
      mug.add(puff);
      return { puff, mote: index >= 4, cycle: -1, x: 0, z: 0, drift: 0 };
    });
    const plant = part('sobre', -2.35, -.15);
    const pot = paint('#d1b0b7');
    solid(plant, cylinder, pot, 0, .30, 0, .62, .60, .62);
    solid(plant, cylinder, pot, 0, .57, 0, .70, .14, .70);
    for (const [x,y,z,angle,color] of [[-.21,.96,.04,.5,'#72ad56'],[.04,1.15,-.10,-.14,'#b6f06a'],[.24,.89,.10,-.72,'#86c562']]) {
      solid(plant, leaf, paint(color), x,y,z,.45,.96,.43).rotation.z = angle;
    }

    const ambient = new T.AmbientLight('#e0ceff', 1.55);
    const sun = new T.DirectionalLight('#e2ffce', 2.35);
    sun.position.set(-3, 6, 5);
    const rim = new T.PointLight('#b58aff', 26);
    rim.position.set(4, 3, -2);
    const glow = new T.PointLight('#b6f06a', 1.7);
    glow.position.set(0, 1.58, 1);
    monitor.add(glow);
    scene.add(ambient, sun, rim);

    const voxels = new T.InstancedMesh(cube, paint('#ffffff'), 40);
    instances.push(voxels);
    voxels.frustumCulled = false;
    rig.add(voxels);
    const particles = Array.from({length: 40}, (_, i) => {
      const a = i * 2.4, radius = 2.85 + .78*Math.random();
      const x = Math.cos(a)*radius, y = .45 + (Math.random()-.5)*3.4, z = Math.sin(a)*1.7;
      voxels.setColorAt(i, new T.Color(i%3 ? '#9d7be0' : '#b6f06a'));
      return {x,y,z, size: .037 + Math.random()*.095, phase: a, offset: 0, speed: 0};
    });
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = matchMedia('(max-width: 720px)');
    const pointer = new T.Vector2();
    const ray = new T.Raycaster();
    let hovered, inside = false, active = false, elapsed = 0, previous = 0;
    let purple = false, flash = 0, drawn = -1;

    function drawScreen(t) {
      ctx.fillStyle = '#10251d';
      ctx.fillRect(0, 0, 256, 192);
      ctx.fillStyle = purple ? '#c3a2ff' : '#b6f06a';
      ctx.font = 'bold 18px monospace';
      ctx.fillText('> rafael.exe', 12, 24);
      if (Math.floor(t*2)%2 === 0) ctx.fillRect(148, 23, 10, 3);
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 38, 256, 154);
      ctx.clip();
      for (let i=0; i<17; i++) {
        const y = 38 + ((i*12 - t*13)%204 + 204)%204 - 12;
        const indent = 13 + (i%4)*8;
        ctx.globalAlpha = .45 + (i%3)*.21;
        ctx.fillRect(indent, Math.floor(y), 24 + i*29%92, 4);
        ctx.fillRect(indent + 32 + i*29%92, Math.floor(y), 10 + i*7%46, 4);
      }
      ctx.restore();
      if (flash > 0) {
        ctx.fillStyle = 'rgba(255,255,255,' + flash + ')';
        ctx.fillRect(0, 0, 256, 192);
      }
      texture.needsUpdate = true;
    }
    function highlight(group) {
      if (hovered === group) return;
      for (const [item, level] of [[hovered,.06],[group,.37]]) {
        item?.traverse(mesh => { if (mesh.material?.emissive) mesh.material.emissiveIntensity = level; });
      }
      hovered = group;
      canvas.style.cursor = group ? 'pointer' : 'default';
      tip.hidden = !group;
      if (group) tip.textContent = group.userData.link.textContent + ' ↗';
    }
    function pick() {
      ray.setFromCamera(pointer, camera);
      let obj = ray.intersectObjects(desk.children, true)[0]?.object;
      while (obj && !obj.userData.link) obj = obj.parent;
      return obj;
    }
    function point(event) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left, y = event.clientY - rect.top;
      pointer.set(x/rect.width*2-1, 1-y/rect.height*2);
      highlight(pick());
      tip.style.left = Math.max(0, Math.min(rect.width-tip.offsetWidth, x+12)) + 'px';
      tip.style.top = Math.max(0, Math.min(rect.height-tip.offsetHeight, y+10)) + 'px';
    }
    const interaction = stage.closest('.hero');
    const tilt = new T.Vector2();
    interaction.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const rect = stage.getBoundingClientRect();
      const halfHeight = Math.min(rect.width, rect.height) * .55;
      const halfWidth = halfHeight * 1.30;
      const x = event.clientX - (rect.left + rect.width / 2);
      const y = rect.top + rect.height / 2 - event.clientY;
      if (!halfHeight || Math.abs(x) > halfWidth || Math.abs(y) > halfHeight) {
        tilt.set(0, 0);
        return;
      }
      tilt.set(x / halfWidth, y / halfHeight);
    }, options);
    interaction.addEventListener('pointerleave', () => tilt.set(0, 0), options);
    canvas.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      inside = true;
      point(event);
    }, options);
    canvas.addEventListener('pointerleave', () => {
      inside = false;
      highlight(null);
    }, options);
    canvas.addEventListener('click', event => {
      point(event);
      if (hovered) {
        const target = document.querySelector(hovered.userData.link.hash);
        target.scrollIntoView({behavior: reduced.matches ? 'instant' : 'smooth'});
      } else {
        purple = !purple;
        glow.color.set(purple ? '#b79df0' : '#b6f06a');
        if (!reduced.matches && !document.body.classList.contains('motion-paused')) {
          flash = .82;
          particles.forEach(p => { p.speed = 5 + Math.random()*3; });
        }
        drawn = -1;
      }
      if (!inside) { pointer.set(0,0); highlight(null); }
    }, options);

    let motion = reduced.matches || document.body.classList.contains('motion-paused') ? 0 : 1;
    let lift = 0;
    function render(dt) {
      const still = reduced.matches || document.body.classList.contains('motion-paused');
      motion = reduced.matches ? 0 : T.MathUtils.damp(motion, still ? 0 : 1, 7, dt);
      if (motion < .001) motion = 0;
      elapsed += dt * motion;
      steam.forEach((particle, index) => {
        const { puff, mote } = particle;
        const time = elapsed / (mote ? 5.8 : 3.2) + index / (mote ? 3 : 4);
        const cycle = Math.floor(time);
        // Sorteia na passagem pelo ponto invisível para evitar saltos no vapor.
        if (cycle !== particle.cycle) {
          particle.cycle = cycle;
          particle.x = (Math.random() - .5) * (mote ? .48 : .22);
          particle.z = (Math.random() - .5) * (mote ? .36 : .22);
          particle.drift = (Math.random() - .5) * .45;
        }
        const phase = Math.min(1, (time - cycle) * (mote ? 4 : 1));
        puff.position.set(
          particle.x + Math.sin(phase * 3) * particle.drift,
          (mote ? .75 : .56) + phase * (mote ? .68 : .96),
          particle.z - phase * .1,
        );
        if (mote) puff.scale.setScalar(.045);
        else puff.scale.set(.12 + phase * .23, .16 + phase * .3, .12 + phase * .23);
        puff.material.opacity = Math.sin(Math.PI * phase) ** 2 * (mote ? .55 : .24) * motion;
      });
      const follow = 1 - Math.exp(-(tilt.lengthSq() ? 7 : 1.1)*dt);
      rig.rotation.y += (tilt.x*.56*motion-rig.rotation.y)*follow;
      rig.rotation.x += (-tilt.y*.27*motion-rig.rotation.x)*follow;
      lift = T.MathUtils.damp(lift, Math.sin(elapsed*1.1)*.055*motion, 7, dt);
      rig.position.y = lift;
      flash = Math.max(0, flash-dt*5);
      const tick = Math.floor(elapsed*12);
      if (drawn !== tick || flash > 0) {
        drawScreen(elapsed);
        drawn = flash > 0 ? -1 : tick;
      }
      for (let i=0; i<voxels.count; i++) {
        const p = particles[i];
        if (reduced.matches) { p.offset = p.speed = 0; }
        else if (p.offset || p.speed) {
          p.speed += (-20*p.offset - 5*p.speed)*dt;
          p.offset += p.speed*dt;
          if (Math.abs(p.offset) + Math.abs(p.speed) < .001) p.offset = p.speed = 0;
        }
        const spread = 1+p.offset*.50;
        stamp.position.set(p.x*spread, p.y*spread + Math.sin(elapsed+p.phase)*.10, p.z*spread);
        stamp.rotation.set(p.phase + elapsed*.18, p.phase + elapsed*.24, p.phase);
        stamp.scale.setScalar(p.size);
        stamp.updateMatrix();
        voxels.setMatrixAt(i, stamp.matrix);
      }
      voxels.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      if (inside) highlight(pick());
    }
    function resize() {
      const w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h) return;
      const aspect = w/h, halfHeight = Math.max(2.48, 3.77/aspect);
      Object.assign(camera, {left: -halfHeight*aspect, right: halfHeight*aspect, top: halfHeight, bottom: -halfHeight});
      camera.updateProjectionMatrix();
      renderer.setSize(w,h,false);
      voxels.count = mobile.matches ? 15 : 40;
    }
    function theme() {
      const light = document.documentElement.dataset.theme === 'light';
      ambient.intensity = light ? 2.15 : 1.55;
      glow.intensity = light ? .45 : 1.7;
      display.color.setScalar(light ? .78 : 1);
    }
    function animate(now) {
      try {
        render(previous ? Math.min((now-previous)/1000,.04) : 0);
        previous = now;
        frame = requestAnimationFrame(animate);
      } catch { dispose(); }
    }
    function visibility() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (!disposed && active && !document.hidden) frame = requestAnimationFrame(animate);
    }
    canvas.addEventListener('webglcontextlost', dispose, options);
    stage.append(canvas);
    theme();
    resize();
    render(0);
    stage.classList.remove('is-loading');
    fallback.hidden = true;
    const sizeObserver = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; visibility(); });
    const themeObserver = new MutationObserver(theme);
    observers.push(sizeObserver, intersection, themeObserver);
    sizeObserver.observe(stage);
    intersection.observe(stage.closest('.hero'));
    themeObserver.observe(document.documentElement, {attributes: true, attributeFilter: ['data-theme']});
    document.addEventListener('visibilitychange', visibility, options);
    return dispose;
  } catch (error) {
    dispose();
    throw error;
  }
}
