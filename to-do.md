# ✅ 할 일 목록 (To-Do List)

> 모바일 청첩장 프로젝트 완료를 위한 체크리스트

---

## 📱 1. Kakao Developers 설정

### 1-1. 앱 등록
- [ ] [Kakao Developers](https://developers.kakao.com/) 접속 및 로그인
- [ ] "내 애플리케이션" → "애플리케이션 추가하기" 클릭
- [ ] 앱 이름 입력 (예: "지수유신 청첩장")
- [ ] 앱 생성 완료

### 1-2. JavaScript 키 발급
- [ ] 생성한 앱 클릭
- [ ] "앱 키" 섹션에서 **JavaScript 키** 복사
- [ ] 복사한 키를 메모장에 임시 저장

### 1-3. 플랫폼 등록
- [ ] 좌측 메뉴 → "플랫폼" 선택
- [ ] "Web 플랫폼 등록" 클릭
- [ ] **개발용 도메인 등록**: `http://localhost:5173`
- [ ] **배포용 도메인 등록**: `https://yourusername.github.io` (실제 GitHub 계정명으로 변경)
- [ ] 저장 완료

### 1-4. 카카오 로그인 활성화
- [ ] 좌측 메뉴 → "카카오 로그인" 선택
- [ ] "활성화 설정" ON으로 변경

---

## 🗄️ 2. Supabase 설정

### 2-1. 프로젝트 생성
- [ ] [Supabase](https://supabase.com/) 접속 및 회원가입/로그인
- [ ] "New Project" 클릭
- [ ] 프로젝트 정보 입력:
  - [ ] Name: `my-wedding` (또는 원하는 이름)
  - [ ] Database Password: 안전한 비밀번호 설정 (메모 필수!)
  - [ ] Region: **Northeast Asia (Seoul)** 선택
- [ ] 프로젝트 생성 완료 (1~2분 소요)

### 2-2. API 키 확인
- [ ] 프로젝트 대시보드 → "Settings" → "API" 메뉴
- [ ] **Project URL** 복사 및 메모
- [ ] **anon public key** 복사 및 메모

### 2-3. messages 테이블 생성
- [ ] 좌측 메뉴 → "Table Editor" 선택
- [ ] "New Table" 클릭
- [ ] 테이블 이름: `messages`
- [ ] 다음 컬럼 추가:
  - [ ] `id` (int8, Primary Key, Auto-increment) - 자동 생성됨
  - [ ] `created_at` (timestamptz, Default: now()) - 자동 생성됨
  - [ ] `name` (text, NOT NULL)
  - [ ] `relationship` (text, NOT NULL)
  - [ ] `message` (text, NOT NULL)
- [ ] "Save" 클릭

### 2-4. RLS (Row Level Security) 정책 설정
- [ ] "Authentication" → "Policies" 메뉴
- [ ] `messages` 테이블 선택
- [ ] "New Policy" 클릭

**읽기 정책 생성:**
- [ ] Policy name: `Enable read access for all users`
- [ ] Policy command: SELECT
- [ ] Target roles: public
- [ ] USING expression: `true`
- [ ] "Save" 클릭

**쓰기 정책 생성:**
- [ ] Policy name: `Enable insert access for all users`
- [ ] Policy command: INSERT
- [ ] Target roles: public
- [ ] WITH CHECK expression: `true`
- [ ] "Save" 클릭

---

## 🔑 3. 환경 변수 설정

### 3-1. .env 파일 생성
- [ ] 프로젝트 루트 폴더에서 `.env` 파일 생성
- [ ] 다음 내용 입력:

```env
# Kakao SDK (1-2에서 복사한 키)
VITE_KAKAO_APP_KEY=여기에_카카오_자바스크립트_키_붙여넣기

# Supabase (2-2에서 복사한 정보)
VITE_SUPABASE_URL=여기에_supabase_프로젝트_url_붙여넣기
VITE_SUPABASE_ANON_KEY=여기에_supabase_anon_key_붙여넣기
```

- [ ] 파일 저장
- [ ] ⚠️ `.env` 파일이 `.gitignore`에 포함되어 있는지 확인 (자동 설정됨)

---

## 📝 4. 실제 데이터 교체

### 4-1. IntroSection.jsx 수정
- [ ] 파일 열기: `src/components/IntroSection.jsx`
- [ ] 결혼식 날짜 변경:
```javascript
<p className="intro-date">2025년 00월 00일 오후 0시</p>
```
→ 실제 날짜로 변경 (예: `2025년 5월 10일 오후 2시`)

### 4-2. MainSection.jsx 수정
- [ ] 파일 열기: `src/components/MainSection.jsx`
- [ ] 부모님 성함 변경:
```javascript
<p>아버지 <strong>김○○</strong> · 어머니 <strong>이○○</strong> 의 장녀</p>
<p className="couple-name">김지수</p>
```
- [ ] 신부 측 부모님 성함 입력
- [ ] 신부 이름 입력

```javascript
<p>아버지 <strong>박○○</strong> · 어머니 <strong>최○○</strong> 의 장남</p>
<p className="couple-name">박유신</p>
```
- [ ] 신랑 측 부모님 성함 입력
- [ ] 신랑 이름 입력

- [ ] 예식 정보 변경:
```javascript
<p><strong>일시:</strong> 2025년 00월 00일 (요일) 오후 0시</p>
<p><strong>장소:</strong> ○○웨딩홀 ○층 ○○홀</p>
<p><strong>주소:</strong> 서울시 ○○구 ○○동 123-45</p>
```
- [ ] 실제 일시, 장소, 주소로 변경

### 4-3. MapSection.jsx 수정
- [ ] 파일 열기: `src/components/MapSection.jsx`
- [ ] 주소 정보 변경 (2곳):
```javascript
const address = '서울시 ○○구 ○○동 123-45'; // 19번 라인
const placeName = '○○웨딩홀'; // 20번 라인
```

```javascript
<h3>○○웨딩홀 ○층 ○○홀</h3>
<p>서울시 ○○구 ○○동 123-45</p>
```
- [ ] 실제 주소로 변경

- [ ] 교통 정보 변경:
```javascript
<strong>지하철:</strong> ○○역 3번 출구 도보 5분<br/>
<strong>버스:</strong> ○○번, ○○번<br/>
<strong>주차:</strong> 3시간 무료 (건물 내 주차장 이용)
```
- [ ] 실제 교통 정보로 변경

- [ ] 계좌번호 변경:
```javascript
const accounts = [
  { name: '신랑', bank: '○○은행', number: '1234-5678-9012', holder: '박유신' },
  { name: '신부', bank: '○○은행', number: '9876-5432-1098', holder: '김지수' }
];
```
- [ ] 신랑 계좌 정보 입력
- [ ] 신부 계좌 정보 입력

### 4-4. index.html 메타 태그 수정
- [ ] 파일 열기: `index.html`
- [ ] 날짜 정보 변경:
```html
<meta property="og:description" content="2025년 00월 00일 - 봄날의 정원 속, 우리의 약속" />
```
- [ ] 실제 날짜로 변경

- [ ] URL 변경 (배포 후):
```html
<meta property="og:url" content="https://yourdomain.github.io/MyWedding/" />
```
- [ ] 실제 GitHub Pages URL로 변경

---

## 🖼️ 5. 이미지 준비 및 교체

### 5-1. 이미지 준비
- [ ] **메인 커플 사진** (3:4 비율, 1200x1600px 권장)
  - 파일명: `main-couple.jpg`
- [ ] **갤러리 사진 9장** (1:1 또는 3:4 비율, 800x800px 이상)
  - 파일명: `gallery-1.jpg ~ gallery-9.jpg`
- [ ] **카카오톡 공유 썸네일** (1.91:1 또는 1:1, 800x400px 권장)
  - 파일명: `wedding-thumbnail.jpg`

### 5-2. 이미지 업로드
- [ ] `public/` 폴더에 이미지 파일들 복사
- [ ] 파일명이 정확한지 확인

### 5-3. GallerySection.jsx 수정 (선택사항)
- [ ] 파일 열기: `src/components/GallerySection.jsx`
- [ ] 플레이스홀더 URL을 실제 이미지로 변경:
```javascript
const images = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `사진 ${i + 1}`,
  url: `/gallery-${i + 1}.jpg`  // 실제 이미지 경로로 변경
}));
```

---

## 🐙 6. GitHub 설정 및 배포

### 6-1. GitHub 리포지토리 생성
- [ ] [GitHub](https://github.com) 접속 및 로그인
- [ ] "New repository" 클릭
- [ ] 리포지토리 이름: `MyWedding` (또는 원하는 이름)
- [ ] Public 선택
- [ ] "Create repository" 클릭

### 6-2. GitHub Secrets 설정
- [ ] 생성한 리포지토리 → "Settings" 탭
- [ ] 좌측 메뉴 → "Secrets and variables" → "Actions"
- [ ] "New repository secret" 클릭하여 다음 3개 추가:

**Secret 1:**
- [ ] Name: `VITE_KAKAO_APP_KEY`
- [ ] Secret: (1-2에서 복사한 Kakao JavaScript 키)

**Secret 2:**
- [ ] Name: `VITE_SUPABASE_URL`
- [ ] Secret: (2-2에서 복사한 Supabase URL)

**Secret 3:**
- [ ] Name: `VITE_SUPABASE_ANON_KEY`
- [ ] Secret: (2-2에서 복사한 Supabase anon key)

### 6-3. vite.config.js 확인
- [ ] 파일 열기: `vite.config.js`
- [ ] `base` 값이 리포지토리명과 일치하는지 확인:
```javascript
base: '/MyWedding/', // 리포지토리명과 동일해야 함
```

### 6-4. 로컬 Git 설정
- [ ] 터미널에서 프로젝트 폴더로 이동
- [ ] 다음 명령어 실행:

```bash
git init
git add .
git commit -m "Initial commit: 지수 🫶 유신 청첩장"
git branch -M main
git remote add origin https://github.com/yourusername/MyWedding.git
# ⚠️ yourusername을 실제 GitHub 계정명으로 변경!
git push -u origin main
```

### 6-5. GitHub Pages 설정
- [ ] GitHub 리포지토리 → "Settings" 탭
- [ ] 좌측 메뉴 → "Pages"
- [ ] Source: "Deploy from a branch"
- [ ] Branch: `gh-pages` 선택
- [ ] Folder: `/ (root)` 선택
- [ ] "Save" 클릭

### 6-6. 배포 확인
- [ ] GitHub Actions 탭에서 배포 진행 상황 확인
- [ ] 배포 완료 후 `https://yourusername.github.io/MyWedding/` 접속
- [ ] 정상 작동 확인

---

## ✅ 7. 최종 테스트

### 7-1. 기능 테스트
- [ ] 네비게이션 이동 확인
- [ ] 꽃잎 애니메이션 확인
- [ ] 갤러리 모달 열기/닫기 확인
- [ ] 갤러리 좌우 네비게이션 확인
- [ ] 카카오톡 공유 버튼 동작 확인
- [ ] 계좌번호 복사 기능 확인
- [ ] 축하 메시지 작성 및 표시 확인
- [ ] 관계별 필터 확인

### 7-2. 모바일 테스트
- [ ] 모바일 Safari에서 확인 (iOS)
- [ ] 모바일 Chrome에서 확인 (Android)
- [ ] 카카오톡 인앱 브라우저에서 확인
- [ ] 가로/세로 모드 확인

### 7-3. 공유 테스트
- [ ] 카카오톡으로 공유해보기
- [ ] 공유된 링크 클릭하여 정상 접속 확인
- [ ] 썸네일 이미지 표시 확인

---

## 📋 8. 선택사항 (추가 개선)

### 8-1. SEO 최적화
- [ ] `public/sitemap.xml` 생성
- [ ] Google Search Console 등록
- [ ] 메타 태그 추가 최적화

### 8-2. 성능 최적화
- [ ] 이미지 압축 (TinyPNG 등 사용)
- [ ] WebP 포맷으로 변환
- [ ] Lighthouse 점수 확인

### 8-3. 추가 기능
- [ ] D-Day 카운터 추가
- [ ] 배경 음악 추가 (자동재생 주의)
- [ ] 참석 여부 확인 기능 추가
- [ ] 방명록 삭제 기능 추가 (관리자 전용)

---

## 🆘 문제 해결

### 빌드 오류 발생 시
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 환경 변수가 적용되지 않을 때
- [ ] `.env` 파일이 프로젝트 루트에 있는지 확인
- [ ] `VITE_` 접두사가 붙어있는지 확인
- [ ] 개발 서버 재시작 (`npm run dev`)

### GitHub Pages에서 404 에러
- [ ] `vite.config.js`의 `base` 값 확인
- [ ] 리포지토리 Settings → Pages에서 Source 설정 확인
- [ ] `gh-pages` 브랜치가 생성되었는지 확인

---

## 🎉 완료!

모든 체크박스를 완료하셨다면 축하합니다! 🎊

**배포 URL:** `https://yourusername.github.io/MyWedding/`

문제가 발생하면:
- `SETUP_GUIDE.md` 참고
- `README.md` 참고
- `.Work/2025-11-02.md` 개발 일지 참고

---

**행복한 결혼 준비 되세요! 💐**

_Made with 💕 by AI Assistant_

