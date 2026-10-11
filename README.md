# LectureBrief

녹음 파일 또는 TXT/SRT/VTT 전사문을 선택하고 Google Gemini로 강의 정리·공지·진도를 생성하는 반응형 작업실입니다. 학교 계정 연결·자동 공지 게시·광고는 없습니다.

## 실행과 배포

Node.js 22 이상에서 npm run dev, http://127.0.0.1:4193 접속. npm 의존성 설치 불필요. 로컬 정적 서버에서는 Gemini 연결이 설정 대기로 표시됩니다. npm test는 핵심 처리와 서버 모의 검증, npm run build는 정적 파일·링크 검사입니다.

GitHub: https://github.com/HG0395/lecturebrief · 공개 사이트: https://lecturebrief.pages.dev/
Cloudflare Pages main 자동 배포, 빌드 npm run build, 출력 public, 루트 저장소 루트. functions/와 server/는 Pages Functions 서버 코드이며 public 밖에 보관합니다.

## Gemini 설정

Cloudflare → lecturebrief → Settings → Variables and secrets → Production에서 다음을 설정하고 재배포합니다. 키를 채팅·소스·GitHub에 넣지 마세요.

- GEMINI_API_KEY: 재발급한 Google AI Studio API 키, Secret 유형.
- LECTURE_ACCESS_CODE: 무작위 20자 이상의 교수자용 이용 코드, Secret 유형. 일반 사용자에게는 이 코드만 안전하게 전달합니다. 누구나 공개 API 비용을 소비하지 못하도록 필수입니다.
- GEMINI_MODEL: 선택 설정. 기본 gemini-3.8-flash. Google 프로젝트에서 제공되는 generateContent·구조화 JSON 지원 모델을 사용하세요.

채팅 등에 노출된 API 키는 폐기·재발급합니다. Google 프로젝트에서 API 제한·사용량·결제 한도를 관리하세요. 무료 이용을 보장하지 않습니다. API 키를 브라우저에 전달하거나 공개 API를 무인증으로 열지 않습니다. 이용 코드는 브라우저 저장소에 저장하지 않습니다. 유효한 키 설정 전에는 실제 생성 검증이 불가능합니다.

전사 모델은 브라우저에서 실행하며 녹음 원본을 Google로 보내지 않습니다. 정리 버튼을 누르면 전사문과 수업 정보는 서버를 거쳐 Google로 전달됩니다. 결과 공지는 항상 미검토 상태이며 원문 대조 후 공유할 수 있습니다. 기기 저장 기록은 암호화되지 않습니다. 실제 처리와 한계는 public/guide.html, public/faq.html, public/privacy.html을 참고하세요.

설정 후 가상 전사문으로 정리 생성·결과 검토·잘못된 이용 코드 거부를 확인하세요. 실제 강의와 개인정보를 테스트나 공개 저장소에 올리지 마세요. 소스와 모의 테스트만으로 실제 모델 정확성·요금을 보증하지 않습니다.
