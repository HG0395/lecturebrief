import {test} from 'node:test';
import assert from 'node:assert/strict';
import {reportHtml} from '../public/report.mjs';
import {parseResult,sampleResult} from '../public/core.mjs';
test('PDF document includes all tabs, edits, evidence and explicit notice review states',()=>{
 const result=parseResult(JSON.stringify(sampleResult));result.summary='수정한 개요';result.notices.push({...result.notices[0],confirmed:true});
 const html=reportHtml(result,{course:'검증 과목',date:'2026-10-11',session:'3차시'},{demo:true});
 for(const value of ['수정한 개요','검증 과목','2026-10-11','3차시','주제별 상세 정리','수업 진도','교수님 확인 사항','확인 필요','검토 완료','[45:00]','가상 수업 예시'])assert.ok(html.includes(value),value);
});
test('PDF text escapes untrusted lecture content and course titles',()=>{
 const result=parseResult(JSON.stringify(sampleResult));result.summary='<script>alert(1)</script>';result.notices[0].body='<img src=x onerror=alert(1)>\n두 번째 줄';
 const html=reportHtml(result,{course:'<iframe src="https://evil.example">'});
 assert.doesNotMatch(html,/<script|<iframe|<img/);assert.match(html,/&lt;script&gt;/);assert.match(html,/<br>두 번째 줄/);
});
