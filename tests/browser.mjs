import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {pathToFileURL} from 'node:url';
import {resolve} from 'node:path';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({channel:process.env.BROWSER_CHANNEL||'chrome',headless:true});
const context=await browser.newContext({acceptDownloads:true,viewport:{width:1440,height:1000}});
const page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
const url=pathToFileURL(resolve('index.html')).href;
const tab=label=>label==='Полка'?page.locator('#libraryTab'):page.getByRole('navigation',{name:'Разделы'}).getByRole('button',{name:label,exact:true});
async function go(label){await tab(label).click();await page.waitForTimeout(50)}
try{
 await page.goto(url);await page.waitForSelector('#challenge-math');
 assert.deepEqual(errors,[]);
 assert.equal(await page.locator('.v7-challenge').count(),7);
 await go('Программа');
 assert.equal(await page.locator('#module-dx12-core').count(),1);
 assert.equal(await page.locator('#module-vk-core').count(),0);
 await go('Старт');
 await page.locator('#apiTrack').selectOption('vulkan');
 assert.equal(await page.evaluate(()=>STUDY.track),'vulkan');
 // Placement certifies only its block and keeps individual lesson flags intact.
 await page.locator('#challenge-math > summary').click();
 assert.equal(await page.locator('[data-placement-pass="math"]').isDisabled(),true);
 for(let i=0;i<3;i++)await page.locator(`[data-placement="math"][data-check="${i}"]`).check();
 await page.locator('[data-placement-note="math"]').fill('commit abc123; tests/math.cpp; projection/picking и edge cases проверены');
 await page.locator('[data-placement-pass="math"]').click();
 assert.equal(await page.evaluate(()=>completed(MOD.math)),true);
 assert.equal(await page.evaluate(()=>Object.keys(STUDY.lessons).filter(k=>k.startsWith('math-')).length),0);
 await page.reload();await page.waitForSelector('#challenge-math');
 assert.equal(await page.evaluate(()=>completed(MOD.math)),true);
 assert.equal(await page.evaluate(()=>STUDY.track),'vulkan');
 // Both path filters work; unrelated API and legacy lessons remain navigable.
 await go('Программа');
 assert.equal(await page.locator('#module-vk-core').count(),1);
 assert.equal(await page.locator('#module-dx12-core').count(),0);
 await page.locator('#routeSearch').fill('compaction');
 assert.ok(await page.locator('.s-route').count()>0);
 await page.locator('#routeSearch').fill('');
 await page.locator('#routeTrack').selectOption('optional');
 assert.equal(await page.locator('#module-gameplay').count(),1);
 await go('Дерево');
 assert.equal(await page.locator('.v7-tree-lane').count(),6);
 await page.locator('.v7-node-title[data-open-module="vk-core"]').click();
 await page.waitForSelector('#module-vk-core[open]');
 // Project completion includes baseline, strong rubric, common quality and evidence.
 await go('Проекты');
 assert.equal(await page.locator('[data-project]').count(),8);
 await page.locator('[data-project="renderer"]').click();
 await page.waitForSelector('#projectEvidence');
 await page.locator('[data-project-select="renderer"]').click();
 const keys=await page.locator('[data-project-check="renderer"]').evaluateAll(es=>es.map(e=>e.dataset.key));
 for(const key of keys)await page.locator(`[data-project-check="renderer"][data-key="${key}"]`).check();
 assert.equal(await page.evaluate(()=>projectProgress(PROJECT_BY_ID.renderer).done),false);
 await page.locator('#projectEvidence').fill('repo/commit abc123; demo.mp4; captures/frame.rdc; results/benchmark.csv; README reproduction');
 assert.equal(await page.evaluate(()=>projectProgress(PROJECT_BY_ID.renderer).done),true);
 await page.reload();await page.waitForSelector('#challenge-math');
 assert.equal(await page.evaluate(()=>projectProgress(PROJECT_BY_ID.renderer).done),true);
 await go('Готовность');
 assert.ok((await page.locator('#studyContent').innerText()).includes('1 проектов'));
 // New state round-trips and older v6 progress merges without losing projects.
 const downloadPromise=page.waitForEvent('download');await page.locator('#exportBtn').click();const download=await downloadPromise;
 assert.equal(download.suggestedFilename(),'graphics-roadmap-progress-v7.json');
 const downloadPath=await download.path();
 const {readFile}=await import('node:fs/promises');const saved=JSON.parse(await readFile(downloadPath,'utf8'));
 assert.equal(saved.version,7);assert.equal(saved.learning.placement.math.passed,true);assert.equal(saved.learning.projects.renderer.selected,true);
 const old={app:'graphics-roadmap',version:6,statuses:{coords:'done'},resourceStates:{fcg:true},learning:{current:'audit',lessons:{'audit-01-understand':true,'audit-01-build':true},notes:{return:'старый прогресс'}}};
 await page.locator('#fileInput').setInputFiles({name:'v6.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(old))});
 await page.waitForTimeout(100);
 assert.equal(await page.evaluate(()=>STUDY.lessons['audit-01-build']),true);
 assert.equal(await page.evaluate(()=>STUDY.projects.renderer.selected),true);
 assert.equal(await page.evaluate(()=>STUDY.track),'vulkan');
 await page.locator('#fileInput').setInputFiles({name:'v7.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(saved))});
 await page.waitForTimeout(100);
 assert.equal(await page.evaluate(()=>STUDY.placement.math.passed),true);
 // Notes are escaped, not interpreted as markup after import.
 await page.evaluate(()=>{STUDY.notes.return='<img src=x onerror="window.injected=true">';saveStudy()});
 await go('Сегодня');assert.equal(await page.evaluate(()=>window.injected),undefined);
 await go('Главы');assert.ok(await page.locator('.s-book').count()>20);
 await go('5–20 минут');assert.ok(await page.locator('.s-break').count()>0);
 await go('Полка');assert.ok(await page.locator('.lib-card').count()>170);
 await go('Дерево');await page.locator('[data-legacy-map]').click();assert.equal(await page.locator('.node').count(),57);
 await go('Старт');
 await mkdir('test-results',{recursive:true});await page.screenshot({path:'test-results/start-desktop.png',fullPage:true});
 // Small screens retain reachable navigation and no document-level overflow.
 await page.setViewportSize({width:390,height:844});
 for(const name of ['Старт','Сегодня','Программа','Дерево','Проекты','Готовность','Главы']){await go(name);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`${name}: horizontal overflow`)}
 await go('Проекты');await page.locator('[data-project="renderer"]').first().click();await page.waitForSelector('#projectEvidence');
 await page.screenshot({path:'test-results/project-mobile.png',fullPage:true});
 // Cancelling reset preserves records; accepting clears v6 and v7 state together.
 page.once('dialog',d=>d.dismiss());await page.locator('#resetBtn').click();
 assert.equal(await page.evaluate(()=>STUDY.projects.renderer.selected),true);
 page.once('dialog',d=>d.accept());await page.locator('#resetBtn').click();
 assert.equal(await page.evaluate(()=>Object.keys(STUDY.projects).length),0);
 assert.equal(await page.evaluate(()=>Object.keys(STUDY.placement).length),0);
 assert.equal(await page.evaluate(()=>Object.keys(statuses).length),0);
 assert.equal(await page.evaluate(()=>STUDY.current),'cpp-runtime');
 assert.deepEqual(errors,[]);
 console.log('Browser checks passed: file://, all views, both paths, placement, projects, persistence, v6/v7 import/export, escaped notes, mobile and legacy graph.');
}finally{await browser.close()}
