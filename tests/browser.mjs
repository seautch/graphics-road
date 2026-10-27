import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve,extname,sep} from 'node:path';
import {mkdir,readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
const context=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1000}});
const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
const url=pathToFileURL(resolve('index.html')).href;
const nav=async view=>{await page.locator(`.main-tabs [data-knowledge-view="${view}"]`).click();};
const topic=async id=>{await page.evaluate(id=>kOpenTopic(id),id);};
const menu=async()=>{if(!await page.locator('#site-menu').evaluate(e=>e.open))await page.locator('#site-menu > summary').click();};
const importJSON=async payload=>{await page.locator('#fileInput').setInputFiles({name:'progress.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(payload))});await page.waitForTimeout(50);};
let server;
try{
 await page.goto(url);await page.waitForSelector('.k-direction');
 assert.equal(await page.locator('.k-direction').count(),15);assert.equal(await page.locator('.k-direction[open]').count(),0);
 assert.equal(await page.evaluate(()=>STUDY.track),'vulkan');assert.equal(await page.evaluate(()=>kNext()),'vk-instance');
 // Topic navigation exposes actual acceptance criteria and independent paths.
 await page.locator('#direction-geometry > summary').click();await page.locator('.k-node[data-topic="bvh"]').click();
 assert.equal(await page.locator('.k-heading h2').textContent(),'Bounding Volume Hierarchy (BVH)');
 assert.match(await page.locator('#studyContent').innerText(),/median-split/);
 assert.match(await page.locator('#studyContent').innerText(),/Ограничения/);
 await page.locator('[data-path-topic="bvh"]').click();
 assert.ok(await page.locator('.k-route').getByText('Axis-aligned bounding box (AABB)',{exact:false}).count());
 assert.equal(await page.locator('.k-route').getByText('Skeletal animation',{exact:true}).count(),0);
 const initialLength=await page.locator('.k-route li').count();
 await topic('vectors');await page.locator('[data-topic-status]').selectOption('familiar');
 assert.equal(await page.evaluate(()=>kState('vectors').verified),false);
 await nav('path');assert.equal(await page.locator('.k-route li').count(),initialLength-1);
 // Evidence and notes remain distinct from status and survive reload.
 await topic('bvh');await page.locator('[data-topic-status]').selectOption('learning');
 assert.equal(await page.locator('[data-topic-verified]').isDisabled(),true);
 await page.locator('[data-topic-evidence]').fill('commit abc123; triangles and parent bounds validated');
 await page.locator('[data-topic-verified]').check();
 await page.locator('[data-topic-note]').fill('<img src=x onerror="window.injected=true"> next: compare SAH');
 await page.reload();await page.waitForSelector('.k-heading');await topic('bvh');
 assert.equal(await page.locator('[data-topic-verified]').isChecked(),true);assert.match(await page.locator('[data-topic-note]').inputValue(),/compare SAH/);assert.equal(await page.evaluate(()=>window.injected),undefined);
 // Search includes source titles; filters and map navigation retain usable controls.
 await nav('tree');await page.locator('#knowledgeSearch').fill('GGX');await page.waitForTimeout(240);
 assert.ok(await page.locator('.k-node[data-topic="ggx"]').isVisible());
 await page.locator('#knowledgeSearch').fill('The Book of Shaders');await page.waitForTimeout(240);
 assert.ok(await page.locator('.k-node[data-topic="noise"]').isVisible());
 await page.locator('[data-overview]').click();await page.locator('#knowledge-filters > summary').click();await page.locator('[data-k-filter="direction"]').selectOption('geometry');
 assert.equal(await page.locator('.k-direction').count(),1);assert.ok(await page.locator('.k-node').count()>10);
 await page.locator('[data-k-zoom="-1"]').click();assert.equal(await page.locator('.k-map-controls output').textContent(),'90%');
 await topic('bvh');await page.locator('[data-highlight-topic]').click();assert.ok(await page.locator('#direction-math.highlight').count());assert.ok(await page.locator('#direction-geometry.highlight').count());
 await page.locator('[data-overview]').click();
 const viewport=page.locator('.k-map-viewport');await viewport.scrollIntoViewIfNeeded();const box=await viewport.boundingBox();await page.mouse.move(box.x+8,box.y+30);await page.mouse.down();await page.mouse.move(box.x+8,box.y-140,{steps:8});await page.mouse.up();assert.ok(await viewport.evaluate(e=>e.scrollTop>0));
 // Direct topic links and source-to-topics navigation share the same knowledge data.
 await page.goto(url+'#topic=ggx');await page.waitForSelector('[data-topic-status="ggx"]');assert.equal(await page.locator('.k-heading h2').textContent(),'GGX / Trowbridge–Reitz NDF');
 await page.locator('[data-reference="pbrt"]').first().click();assert.ok(await page.locator('[data-topic="bvh"]').count());
 await nav('library');await page.locator('#sourceSearch').fill('Real-Time Rendering');await page.waitForTimeout(240);assert.ok(await page.locator('.k-source').count());
 await page.locator('#sourceSearch').fill('');await page.waitForTimeout(240);await page.locator('#sourceScope').selectOption('service');assert.equal(await page.locator('.k-source a').count(),0);
 await page.locator('#sourceScope').selectOption('archive');assert.ok(await page.locator('.k-source').count());
 // Today advances a small checkpoint without inventing topic mastery.
 await nav('today');const current=await page.locator('[data-today-step]').getAttribute('data-today-step');await page.locator('[data-today-step]').click();assert.equal(await page.evaluate(id=>kState(id).steps.read,current),true);assert.equal(await page.evaluate(id=>kState(id).status,current),'learning');
 await nav('projects');assert.equal(await page.locator('.k-milestones>details').count(),12);await page.locator('#milestone-vk-start > summary').click();await page.locator('[data-milestone="vk-start"]').fill('commit init; resize and minimize checked');
 // Export v9 includes all older fields; older imports cannot delete new knowledge.
 await menu();const downloaded=page.waitForEvent('download');await page.locator('#exportBtn').click();const download=await downloaded;assert.equal(download.suggestedFilename(),'graphics-roadmap-progress-v9.json');const saved=JSON.parse(await readFile(await download.path(),'utf8'));
 assert.equal(saved.version,9);assert.equal(saved.learning.knowledge.topics.bvh.verified,true);assert.match(saved.learning.knowledge.milestones['vk-start'],/resize/);
 const v6={app:'graphics-roadmap',version:6,statuses:{coords:'done'},resourceStates:{fcg:true},learning:{current:'audit',lessons:{'audit-01-understand':true,'audit-01-build':true},notes:{return:'old progress'}}};
 await importJSON(v6);assert.equal(await page.evaluate(()=>STUDY.lessons['audit-01-build']),true);assert.equal(await page.evaluate(()=>kState('bvh').verified),true);assert.match(await page.evaluate(()=>ks().milestones['vk-start']),/resize/);
 const v7={app:'graphics-roadmap',version:7,statuses:{},learning:{lessons:{'pbr-03-understand':true,'pbr-03-build':true},notes:{'pbr-03':'inverse-transpose CPU test'},placement:{math:{checks:[true,true,true],passed:true,evidence:'old module certificate'}}}};
 await importJSON(v7);assert.equal(await page.evaluate(()=>kState('normal-matrix').status),'mastered');assert.equal(await page.evaluate(()=>kState('ggx').status),'unseen');assert.equal(await page.evaluate(()=>STUDY.placement.math.passed),false);
 await importJSON(saved);assert.equal(await page.evaluate(()=>kState('bvh').verified),true);
 // Archive remains executable, including old lessons, project evidence and the shelf.
 await menu();await page.getByRole('button',{name:'Архив прежней программы',exact:true}).click();assert.equal(await page.locator('.s-route').count(),52);
 await page.locator('#module-cpp-start > summary').click();await page.locator('[data-lesson-read="cpp-start-01"]').check();assert.equal(await page.evaluate(()=>lessonDone(L_BY_ID['cpp-start-01'])),false);
 await nav('projects');await page.locator('[data-legacy-projects]').evaluate(e=>e.closest('details').open=true);await page.locator('[data-legacy-projects]').click();assert.equal(await page.locator('[data-project]').count(),8);await page.locator('[data-project="renderer"]').click();await page.waitForSelector('#projectEvidence');
 await page.locator('#projectEvidence').fill('repo/commit abc; capture, benchmark and commands');assert.match(await page.evaluate(()=>STUDY.projects.renderer.evidence),/benchmark/);
 const keys=await page.locator('[data-project-check="renderer"]').evaluateAll(es=>es.map(e=>e.dataset.key));for(const key of keys)await page.locator(`[data-project-check="renderer"][data-key="${key}"]`).check();assert.equal(await page.evaluate(()=>projectProgress(PROJECT_BY_ID.renderer).done),true);
 await nav('library');await page.locator('[data-old-shelf]').click();assert.ok(await page.locator('.lib-card').count()>170);await page.locator('[data-lib-node="coords"]').first().click();await page.waitForSelector('#module-math[open]');
 // The new route is not controlled by old API selection.
 assert.equal(await page.evaluate(()=>STUDY.track),'vulkan');
 await mkdir('test-results',{recursive:true});await nav('tree');await page.screenshot({path:'test-results/knowledge-desktop.png',fullPage:true});await topic('bvh');await page.screenshot({path:'test-results/topic-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 for(const view of ['tree','path','today','library','projects']){await nav(view);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),view+': horizontal overflow');}
 await topic('ggx');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));await page.screenshot({path:'test-results/topic-mobile.png',fullPage:true});
 // Reset cancellation is harmless; an accepted reset clears both generations.
 await menu();page.once('dialog',d=>d.dismiss());await page.locator('#resetBtn').click();assert.equal(await page.evaluate(()=>kState('bvh').verified),true);
 page.once('dialog',d=>d.accept());await page.locator('#resetBtn').click();assert.equal(await page.evaluate(()=>Object.keys(ks().topics).length),0);assert.equal(await page.evaluate(()=>Object.keys(STUDY.lessons).length),0);
 // Static hosting works below the actual GitHub Pages prefix.
 const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css'};
 server=createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!path.startsWith('/graphics-road/')){res.writeHead(404).end();return;}const relative=path.slice('/graphics-road/'.length)||'index.html',absolute=resolve(relative);if(!absolute.startsWith(resolve('.')+sep)){res.writeHead(403).end();return;}res.setHeader('Content-Type',mime[extname(absolute)]||'text/plain');res.end(await readFile(absolute));}catch{res.writeHead(404).end();}});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const hosted=await context.newPage();hosted.on('pageerror',e=>errors.push(e.message));await hosted.goto(`http://127.0.0.1:${server.address().port}/graphics-road/index.html#topic=bvh`);await hosted.waitForSelector('[data-topic-status]');assert.match(await hosted.locator('.k-heading h2').textContent(),/BVH/);await hosted.goto(`http://127.0.0.1:${server.address().port}/graphics-road/topics.html`);assert.equal(await hosted.locator('#topic-list a').count(),207);
 assert.deepEqual(errors,[]);console.log('Browser checks passed: adaptive DAG route, map search/filter/zoom/drag, cards, sources, evidence, v6/v7/v9 migration, archive, projects, mobile, file:// and /graphics-road/.');
}finally{await browser.close();if(server){server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}}
