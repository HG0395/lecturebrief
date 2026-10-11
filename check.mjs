import {readFile,readdir,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const files=await readdir('public');let links=0;
for(const f of files.filter(x=>x.endsWith('.html'))){const text=await readFile('public/'+f,'utf8');assert.match(text,/<html lang="ko">/);assert.match(text,/name="viewport"/);for(const match of text.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)){const p=match[1]==='/'?'index.html':match[1].slice(1);await access(path.join('public',p));links++;}if(f!=='404.html'){assert.match(text,/ca-pub-2685311477810917/);assert.match(text,/consent\.js/);}else assert.ok(!text.includes('adsbygoogle'));}
assert.equal((await readFile('public/ads.txt','utf8')).trim(),'google.com, pub-2685311477810917, DIRECT, f08c47fec0942fa0');
console.log(`PASS ${files.length} public files; ${links} internal links and assets; AdSense metadata, ads.txt and 404.`);
