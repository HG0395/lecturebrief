import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const origin='https://lecturebrief.pages.dev';
const normalize=text=>text.replace(/\r\n/g,'\n');
const files=(await readdir('public')).filter(x=>!x.startsWith('_')&&x!=='404.html');
for(const name of files){const route=name==='index.html'?'/':'/'+name;const res=await fetch(origin+route,{signal:AbortSignal.timeout(30000)});assert.equal(res.status,200,route);assert.equal(normalize(await res.text()),normalize(await readFile('public/'+name,'utf8')),`Content mismatch ${route}`);if(name.endsWith('.mjs')||name.endsWith('.js'))assert.match(res.headers.get('content-type'),/javascript/);console.log('200 MATCH '+route);}
const r=await fetch(origin+'/missing-page-qa',{signal:AbortSignal.timeout(30000)});assert.equal(r.status,404);assert.ok(!(await r.text()).includes('adsbygoogle'));console.log('404 verified; all public files match local source.');
const status=await fetch(origin+'/api/ai/status');assert.equal(status.status,200);assert.equal(status.headers.get('cache-control'),'no-store');const config=await status.json();assert.equal(typeof config.configured,'boolean');assert.deepEqual(Object.keys(config),['configured']);
const denied=await fetch(origin+'/api/ai/summarize',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({transcript:''})});assert.equal(denied.status,config.configured?400:503);console.log('Gemini configuration status and invalid-request rejection verified.');
