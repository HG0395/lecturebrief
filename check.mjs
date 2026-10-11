import {readFile,readdir,access} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const files=await readdir('public');let links=0;
for(const f of files.filter(x=>x.endsWith('.html'))){const text=await readFile('public/'+f,'utf8');assert.match(text,/<html lang="ko">/);assert.match(text,/name="viewport"/);for(const match of text.matchAll(/(?:href|src)="(\/[^"#?]*)(?:[#?][^"]*)?"/g)){const p=match[1]==='/'?'index.html':match[1].slice(1);await access(path.join('public',p));links++;}}
assert.ok(!files.includes('ads.txt'));assert.ok(!files.includes('consent.js'));
for(const f of files){const text=await readFile('public/'+f,'utf8');assert.doesNotMatch(text,/adsbygoogle|google-adsense-account|ca-pub-|pagead2\.googlesyndication|data-ads=|\/consent\.js/,f);}
console.log(`PASS ${files.length} public files; ${links} internal links and assets; no advertising code or account tags.`);
