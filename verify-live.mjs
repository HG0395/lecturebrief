import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const origin='https://lecturebrief.pages.dev';
const files=(await readdir('public')).filter(x=>!x.startsWith('_')&&x!=='404.html');
for(const name of files){const route=name==='index.html'?'/':'/'+name;const res=await fetch(origin+route,{signal:AbortSignal.timeout(30000)});assert.equal(res.status,200,route);assert.equal(await res.text(),await readFile('public/'+name,'utf8'),`Content mismatch ${route}`);if(name.endsWith('.mjs')||name.endsWith('.js'))assert.match(res.headers.get('content-type'),/javascript/);console.log('200 MATCH '+route);}
const r=await fetch(origin+'/missing-page-qa',{signal:AbortSignal.timeout(30000)});assert.equal(r.status,404);assert.ok(!(await r.text()).includes('adsbygoogle'));console.log('404 verified; all public files match local source.');
for(const route of ['/ads.txt','/consent.js']){const res=await fetch(origin+route,{signal:AbortSignal.timeout(30000)});assert.equal(res.status,404,route);assert.doesNotMatch(await res.text(),/adsbygoogle|pub-2685311477810917/);console.log('404 REMOVED '+route);}
