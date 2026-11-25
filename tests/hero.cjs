// Execute with Playwright available to Node via NODE_PATH.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', args: ['--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1300, height: 850 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/^https:/, route => route.abort());
    await page.goto(process.argv[2] || 'http://127.0.0.1:8000');
    const canvas = page.locator('.hero-scene canvas');
    await canvas.waitFor({timeout: 10000});
    if (process.env.HERO_SCREENSHOT) await page.screenshot({path: process.env.HERO_SCREENSHOT});
    // Sample the actual rendered camera and raycaster in one animation frame.
    const ids = await canvas.evaluate(canvas => {
      const box = canvas.getBoundingClientRect();
      const tip = document.querySelector('.hero-scene__tip');
      const selected = new Set();
      for (const link of document.querySelectorAll('.hero-scene__links a')) {
        document.querySelector(link.hash).scrollIntoView = () => selected.add(link.hash);
      }
      const labels = new Set();
      for (let y=5; y<box.height && selected.size<5; y+=6) {
        for (let x=5; x<box.width; x+=6) {
          const coordinates = { clientX: Math.round(box.left+x), clientY: Math.round(box.top+y), pointerType: 'mouse' };
          canvas.dispatchEvent(new PointerEvent('pointermove', coordinates));
          if (tip.hidden || labels.has(tip.textContent)) continue;
          labels.add(tip.textContent);
          canvas.dispatchEvent(new MouseEvent('click', coordinates));
          const link = [...document.querySelectorAll('.hero-scene__links a')].find(a => a.textContent+' ↗' === tip.textContent);
          if (!selected.has(link.hash)) throw new Error(link.hash);
        }
      }
      return [...selected].sort();
    });
    assert.deepEqual(ids, ['#bidxchange','#contato','#projetos','#skills','#sobre']);
    // Inspect live frame data without adding test hooks to the production module.
    await page.evaluate(async () => {
      const { Scene } = await import('/js/vendor/three/three.module.min.js');
      Scene.prototype.onAfterRender = function () {
        this.traverse(mesh => {
          if (mesh.isInstancedMesh && mesh.instanceMatrix.count === 40) {
            window.heroVoxelCount = mesh.count;
            window.heroVoxelX = mesh.instanceMatrix.array[12];
          }
          if (mesh.material?.map?.isCanvasTexture) {
            const ctx = mesh.material.map.image.getContext('2d');
            window.heroScreen = [...ctx.getImageData(0, 0, 1, 1).data];
            window.heroInk = ctx.fillStyle;
          }
        });
      };
    });
    await page.waitForFunction(() => window.heroVoxelCount === 40);
    const restingX = await page.evaluate(() => window.heroVoxelX);
    await canvas.click({position:{x:3,y:3}});
    await page.waitForFunction(() => window.heroScreen[0] > 50);
    await page.waitForFunction(x => Math.abs(window.heroVoxelX-x) > .2, restingX);
    await page.waitForFunction(x => Math.abs(window.heroVoxelX-x) < .04 && window.heroInk === '#c3a2ff', restingX);
    await page.locator('#theme').click();
    assert.equal(await page.locator('html').getAttribute('data-theme'), 'light');
    await page.emulateMedia({reducedMotion:'reduce'});
    await page.setViewportSize({width:375,height:812});
    await page.waitForFunction(() => document.querySelector('.hero-scene canvas').clientHeight === 320);
    await page.waitForFunction(() => window.heroVoxelCount === 15);
    assert(await page.evaluate(() => document.documentElement.scrollWidth === innerWidth));
    await page.locator('.hero-scene__links a').first().focus();
    assert(await page.locator('.hero-scene__links').evaluate(el => el.offsetWidth > 1));
    await canvas.evaluate(c => c.getContext('webgl2').getExtension('WEBGL_lose_context').loseContext());
    await page.locator('.hero-scene img').waitFor();
    assert.equal(await canvas.count(),0);
    assert.deepEqual(errors,[]);
    console.log('HeroScene OK', ids);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode=1; });
