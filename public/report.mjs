import {escapeHtml} from './core.mjs';
const text=value=>escapeHtml(value||'').replaceAll('\n','<br>');
const evidence=value=>`<p class="report-evidence">원문 근거 · ${text(value||'미제공')}</p>`;
export function reportHtml(result,meta,{demo=false}={}){
 return `<header><p class="report-brand">LectureBrief · 강의 기록</p><h1>${text(meta.course||'수업')} 강의 정리</h1><p>${text([meta.date,meta.session].filter(Boolean).join(' · '))}</p>${demo?'<p class="report-note">가상 수업 예시입니다.</p>':''}</header>
 <section><h2>전체 개요</h2><p>${text(result.summary)}</p></section>
 <section><h2>주제별 상세 정리</h2>${result.sections.map((s,i)=>`<article><h3>${i+1}. ${text(s.title)}</h3><p>${text(s.body)}</p>${evidence(s.evidence)}</article>`).join('')||'<p>주제별 정리 없음</p>'}</section>
 <section><h2>공지사항</h2><p class="report-note">이 문서는 교수자 검토용 강의 기록입니다. 확인 필요 공지는 검토 후 공유하세요.</p>${result.notices.map(n=>`<article><h3>${text(n.title)} <small>[${n.confirmed?'검토 완료':'확인 필요'}]</small></h3><p>${text(n.body)}</p><p><strong>마감일:</strong> ${text(n.due||'미확정')}</p>${evidence(n.evidence)}</article>`).join('')||'<p>추출된 공지사항 없음</p>'}</section>
 <section><h2>수업 진도</h2>${[['completed','이번 수업 완료 범위'],['next','다음 수업 예정 범위'],['preparation','다음 수업 준비 사항']].map(([key,label])=>`<h3>${label}</h3><p>${text(result.progress[key])}</p>`).join('')}${evidence(result.progress.evidence)}</section>
 ${result.questions.length?`<section><h2>교수님 확인 사항</h2><ul>${result.questions.map(q=>`<li>${text(q)}</li>`).join('')}</ul></section>`:''}
 <footer>LectureBrief · AI 정리 내용은 원문과 대조하여 확인하세요.</footer>`;
}
