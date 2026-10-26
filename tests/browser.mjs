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
const tab=label=>label==='Полка'?page.locator('#libraryTab'):page.locator('.topbar').getByRole('button',{name:label,exact:true});
async function menu(){if(!await page.locator('#site-menu').evaluate(e=>e.open))await page.locator('#site-menu > summary').click();}
async function go(label){if(['Проекты','Готовность','Главы','5–20 минут'].includes(label))await menu();await tab(label).click();await page.waitForTimeout(50)}
try{
 await page.goto(url);await page.waitForSelector('.focus-card');
 assert.equal(await page.locator('.focus-card [data-activate]').getAttribute('data-activate'),'cpp-start');
 assert.equal(await page.locator('#apiTrack').isVisible(),false);
 assert.equal(await page.locator('#challenge-math').isVisible(),false);
 await page.locator('.focus-card [data-activate]').click();
 assert.equal(await page.evaluate(()=>STUDY.current),'cpp-start');
 await page.locator('[data-lesson-read="cpp-start-01"]').check();
 assert.equal(await page.evaluate(()=>lessonDone(L_BY_ID['cpp-start-01'])),false);
 await page.locator('[data-lesson-understand="cpp-start-01"]').check();
 await page.locator('[data-study-note="cpp-start-01"]').fill('CMake build; input validation checked.');
 // Completing the lesson replaces its checkbox with the next lesson immediately.
 await page.locator('[data-lesson-build="cpp-start-01"]').click();
 assert.equal(await page.evaluate(()=>lessonDone(L_BY_ID['cpp-start-01'])),true);
 assert.equal(await page.locator('.s-lesson-head h3').textContent(),'Значения, ссылки и время жизни');
 await go('Старт');
 assert.deepEqual(errors,[]);
 assert.equal(await page.locator('.v7-challenge').count(),7);
 await go('Программа');
 assert.equal(await page.locator('#module-dx12-core').count(),1);
 assert.equal(await page.locator('#module-vk-core').count(),0);
 await go('Старт');
 await page.locator('#route-settings > summary').click();
 await page.locator('#apiTrack').selectOption('vulkan');
 assert.equal(await page.evaluate(()=>STUDY.track),'vulkan');
 // Placement certifies only its block and keeps individual lesson flags intact.
 await page.locator('#known-basics > summary').click();
 await page.locator('#challenge-math > summary').click();
 assert.equal(await page.locator('[data-placement-pass="math"]').isDisabled(),true);
 for(let i=0;i<3;i++)await page.locator(`[data-placement="math"][data-check="${i}"]`).check();
 await page.locator('[data-placement-note="math"]').fill('commit abc123; tests/math.cpp; projection/picking и edge cases проверены');
 await page.locator('[data-placement-pass="math"]').click();
 assert.equal(await page.evaluate(()=>completed(MOD.math)),true);
 assert.equal(await page.evaluate(()=>Object.keys(STUDY.lessons).filter(k=>k.startsWith('math-')).length),0);
 await page.reload();await page.waitForSelector('.focus-card');
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
 assert.equal(await page.locator('.tree-stage').count(),11);
 assert.ok(await page.locator('.tree-connectors .tree-branch').count()>30);
 await page.locator('[data-tree-zoom="-1"]').click();
 assert.equal(await page.locator('.tree-toolbar output').textContent(),'90%');
 await page.locator('[data-tree-focus]').click();
 await page.locator('.tree-leaf[data-open-module="vk-core"]').click();
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
 await page.reload();await page.waitForSelector('.focus-card');
 assert.equal(await page.evaluate(()=>projectProgress(PROJECT_BY_ID.renderer).done),true);
 await go('Готовность');
 assert.ok((await page.locator('#studyContent').innerText()).includes('1 проектов'));
 // New state round-trips and older v6 progress merges without losing projects.
 await menu();const downloadPromise=page.waitForEvent('download');await page.locator('#exportBtn').click();const download=await downloadPromise;
 assert.equal(download.suggestedFilename(),'graphics-roadmap-progress-v8.json');
 const downloadPath=await download.path();
 const {readFile}=await import('node:fs/promises');const saved=JSON.parse(await readFile(downloadPath,'utf8'));
 assert.equal(saved.version,8);assert.equal(saved.learning.curriculumRevision,8);assert.equal(saved.learning.placement.math.passed,true);assert.equal(saved.learning.projects.renderer.selected,true);
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
 await page.locator('[data-lib-node="coords"]').first().click();
 await page.waitForSelector('#module-math[open]');
 assert.equal(await page.locator('.shell').evaluate(e=>e.classList.contains('study-mode')),true);
 await go('Дерево');await page.locator('.advanced-entry > summary').click();await page.locator('[data-legacy-map]').click();assert.equal(await page.locator('.node').count(),57);
 await go('Старт');
 await mkdir('test-results',{recursive:true});await page.screenshot({path:'test-results/start-desktop.png',fullPage:true});
 // Small screens retain reachable navigation and no document-level overflow.
 await page.setViewportSize({width:390,height:844});
 for(const name of ['Старт','Сегодня','Программа','Дерево','Проекты','Готовность','Главы']){await go(name);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),`${name}: horizontal overflow`)}
 await go('Проекты');await page.locator('[data-project="renderer"]').first().click();await page.waitForSelector('#projectEvidence');
 await page.screenshot({path:'test-results/project-mobile.png',fullPage:true});
 // Cancelling reset preserves records; accepting clears v6 and v7 state together.
 await menu();page.once('dialog',d=>d.dismiss());await page.locator('#resetBtn').click();
 assert.equal(await page.evaluate(()=>STUDY.projects.renderer.selected),true);
 page.once('dialog',d=>d.accept());await page.locator('#resetBtn').click();
 assert.equal(await page.evaluate(()=>Object.keys(STUDY.projects).length),0);
 assert.equal(await page.evaluate(()=>Object.keys(STUDY.placement).length),0);
 assert.equal(await page.evaluate(()=>Object.keys(statuses).length),0);
 assert.equal(await page.evaluate(()=>STUDY.current),'cpp-start');
 // v7 module-level certificates are not applied to regrouped topics, but
 // lesson evidence, bookmarks and notes still use their original IDs.
 const previous={app:'graphics-roadmap',version:7,statuses:{},learning:{current:'pbr',lessons:{'pbr-03-read':true,'pbr-03-understand':true,'pbr-03-build':true},notes:{'pbr-03':'inverse transpose CPU tests'},placement:{math:{checks:[true,true,true],passed:true,evidence:'old math certificate; test commands and results'}}}};
 await page.locator('#fileInput').setInputFiles({name:'v7.json',mimeType:'application/json',buffer:Buffer.from(JSON.stringify(previous))});
 await page.waitForTimeout(100);
 assert.equal(await page.evaluate(()=>L_BY_ID['pbr-03'].module),'math-rotation');
 assert.equal(await page.evaluate(()=>lessonDone(L_BY_ID['pbr-03'])),true);
 assert.equal(await page.evaluate(()=>STUDY.notes['pbr-03']),'inverse transpose CPU tests');
 assert.equal(await page.evaluate(()=>STUDY.placement.math.passed),false);
 assert.ok((await page.evaluate(()=>STUDY.placement.math.evidence)).startsWith('old math'));
 assert.deepEqual(errors,[]);
 console.log('Browser checks passed: file://, lesson flow, both API paths, SVG tree, projects, persistence, v6/v7 migration, v8 export/import, escaped notes, mobile and legacy graph.');
}finally{await browser.close()}
