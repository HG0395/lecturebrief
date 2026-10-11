# LectureBrief · 강의 정리 작업실

API 키 없이 녹음 전사 → 교수님의 Claude 웹/앱 → 강의 전체 정리·검토된 공지·진도 기록으로 이어지는 어두운 테마의 반응형 도구입니다. Claude 또는 Anthropic의 공식 제품이 아닙니다.

## 실행

Node.js 22 이상에서 `npm run dev` 후 http://127.0.0.1:4193 을 엽니다. `npm test`는 핵심 처리 검증, `npm run build`는 정적 파일·내부 링크 검사입니다. 설치할 npm 의존성은 없습니다. 파일 더블클릭 대신 HTTP 서버를 사용하세요.

## 실제 기능

- 오디오 파일(최대 100MB, 2시간) 브라우저 전사: Transformers.js 2.17.2 / Whisper Tiny·Base, 한국어, Web Worker, 중단 지원. 모델은 첫 실행 때 외부 CDN에서 다운로드합니다.
- TXT/SRT/VTT 가져오기, 타임스탬프 유지, 편집과 전사문 다운로드
- 과목·날짜·주차·선택한 강의계획서가 포함된 Claude 요청문 복사. 계정·API 연결이나 자동 메시지 전송은 없습니다.
- 구조화된 JSON 결과 가져오기, 전체 요약·주제별 상세 정리·공지·진도 편집
- 원문 대조 후 검토 완료한 공지만 일반 텍스트/LMS HTML 복사, TXT·종일 ICS 저장, 기기 공유 메뉴
- 명시적으로 저장한 강의만 localStorage 보관, 다시 열기·삭제. 오디오 원본은 저장하지 않습니다.
- 모바일·키보드 탭 탐색, 입력 레이블, 상태 안내, 데이터 안내·가이드·FAQ·공개 GitHub 문의

AI 요약은 사용자의 Claude에서 수행합니다. Claude 요금제 제한과 인터넷 데이터 비용은 별개입니다. 전사와 결과의 정확성을 보장하지 않습니다. 실제 수업 녹음·개인정보를 이 공개 저장소에 올리지 마세요.

## Cloudflare Pages

- GitHub repository: https://github.com/HG0395/lecturebrief
- Production branch: `main`
- Framework preset: None
- Build command: `npm run build`
- Build output directory: `public`
- Root directory: repository root (empty)
- GitHub 자동 배포 활성화. 별도의 추론 API나 환경변수는 필요 없습니다.

모든 실행 파일은 `public/`에 있습니다. 생성된 HTML도 커밋하므로 Cloudflare 빌드가 콘텐츠를 생성할 필요는 없습니다. 설명 페이지 수정은 `create-pages.mjs`에 반영한 뒤 `node create-pages.mjs`로 HTML을 갱신하세요.

## 광고

제공된 게시자 ID의 확인 메타 태그, 광고 스크립트(허용 선택 후 head에 삽입), 루트 ads.txt가 반영되어 있습니다. 광고 선택은 인증 CMP가 아니며 필요한 지역별 CMP 설정·사이트 심사 요청은 AdSense 계정에서 운영자가 진행해야 합니다. 404에는 광고가 없습니다. 광고 승인이나 수익을 보장하지 않습니다. 임의 광고 슬롯 ID를 만들지 않았습니다.

공식 품질 도움말의 실제 기능 우선·유용한 고유 콘텐츠·명확한 탐색·광고 균형 원칙을 반영했습니다:
https://adsense-ko.googleblog.com/2012/09/2.html
https://adsense.googleblog.com/2012/04/tips-for-creating-high-quality-sites.html
