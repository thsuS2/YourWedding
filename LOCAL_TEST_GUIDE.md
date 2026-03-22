# 로컬 테스트 및 Vercel 환경변수 확인 가이드

## 📋 목차
1. [Vercel 환경변수 확인 방법](#vercel-환경변수-확인-방법)
2. [로컬 개발 환경 설정](#로컬-개발-환경-설정)
3. [로컬에서 화면 테스트하기](#로컬에서-화면-테스트하기)
4. [문제 해결](#문제-해결)

---

## 🔍 Vercel 환경변수 확인 방법

### 방법 1: Vercel 대시보드에서 확인 (권장)

1. **Vercel 로그인**
   - https://vercel.com 에 접속하여 로그인

2. **프로젝트 선택**
   - 대시보드에서 `jisooyusinwedding` 프로젝트 클릭

3. **Settings 메뉴로 이동**
   - 상단 메뉴에서 **Settings** 클릭

4. **Environment Variables 확인**
   - 왼쪽 사이드바에서 **Environment Variables** 클릭
   - 또는 직접 URL: `https://vercel.com/[your-team]/jisooyusinwedding/settings/environment-variables`

5. **환경변수 목록 확인**
   다음 환경변수들이 설정되어 있어야 합니다:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   VITE_KAKAO_APP_KEY
   VITE_KAKAO_MAP_API_KEY
   ```

6. **환경변수 추가/수정**
   - **Add New** 버튼 클릭
   - Key와 Value 입력
   - Environment 선택 (Production, Preview, Development)
   - **Save** 클릭

### 방법 2: Vercel CLI로 확인

터미널에서 다음 명령어 실행:

```bash
# Vercel CLI 설치 (처음 한 번만)
npm i -g vercel

# Vercel 로그인
vercel login

# 프로젝트 디렉토리로 이동
cd /Users/jisoo/Soo/Wedding

# 환경변수 목록 확인
vercel env ls

# 특정 환경변수 확인
vercel env pull .env.local
```

---

## 💻 로컬 개발 환경 설정

### 1단계: .env 파일 생성

프로젝트 루트 디렉토리(`/Users/jisoo/Soo/Wedding/`)에 `.env` 파일을 생성합니다.

```bash
# 프로젝트 루트에서 실행
touch .env
```

### 2단계: 환경변수 입력

`.env` 파일을 열고 다음 내용을 입력합니다:

```env
# Supabase 설정
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Kakao SDK 설정
VITE_KAKAO_APP_KEY=ed7b448f3a86be82c19bc527bf25f365

# Kakao Map API 설정
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

**⚠️ 중요**: 
- `your_supabase_url`, `your_supabase_anon_key`, `your_kakao_map_api_key` 부분을 실제 값으로 교체해야 합니다.
- Vercel에서 환경변수를 복사해서 사용하거나, 각 서비스에서 직접 발급받은 키를 사용하세요.

### 3단계: 의존성 설치

```bash
# node_modules가 없으면 설치
npm install
```

---

## 🚀 로컬에서 화면 테스트하기

### 개발 서버 실행

```bash
# 프로젝트 루트에서 실행
npm run dev
```

**실행 결과**:
```
  VITE v7.1.7  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 브라우저에서 확인

1. **자동으로 브라우저가 열림** (vite.config.js에 `open: true` 설정됨)
2. **수동으로 열기**: `http://localhost:5173/` 접속

### 테스트할 기능들

#### ✅ 기본 기능 테스트
- [ ] 페이지 로딩 확인
- [ ] RSVP 모달 표시 확인
- [ ] 네비게이션 메뉴 동작 확인
- [ ] 각 섹션 스크롤 확인

#### ✅ RSVP 기능 테스트
- [ ] RSVP 모달 열기/닫기
- [ ] 폼 입력 및 제출
- [ ] 성공/실패 Toast 메시지 확인
- [ ] "오늘 하루 보지 않기" 체크박스 동작

#### ✅ 메시지 보드 테스트
- [ ] 메시지 작성 및 제출
- [ ] 메시지 목록 표시
- [ ] 필터 기능 (가족, 친구, 동료, 기타)
- [ ] Toast 메시지 확인

#### ✅ 카카오맵 테스트
- [ ] 지도 로딩 확인
- [ ] 마커 및 인포윈도우 표시
- [ ] 카카오맵/네이버지도 버튼 동작
- [ ] API 키 없을 때 에러 처리 확인

#### ✅ 갤러리 테스트
- [ ] 이미지 로딩 확인
- [ ] 이미지 클릭 시 모달 표시
- [ ] Lazy Loading 동작 확인

#### ✅ 공유 기능 테스트
- [ ] 카카오톡 공유 버튼 동작
- [ ] 공유 시 메타 정보 확인

---

## 🔧 문제 해결

### 문제 1: 환경변수가 적용되지 않음

**증상**: 
- `undefined` 값이 표시됨
- API 호출 실패

**해결 방법**:
1. `.env` 파일이 프로젝트 루트에 있는지 확인
2. 환경변수 이름이 `VITE_`로 시작하는지 확인
3. 개발 서버를 재시작 (`Ctrl+C` 후 `npm run dev`)

```bash
# 개발 서버 재시작
npm run dev
```

### 문제 2: 카카오맵이 표시되지 않음

**증상**: 
- 지도 영역에 플레이스홀더 이미지만 표시됨
- 콘솔에 에러 메시지

**확인 사항**:
1. `VITE_KAKAO_MAP_API_KEY`가 `.env`에 설정되어 있는지 확인
2. 브라우저 콘솔(F12)에서 에러 메시지 확인
3. API 키가 유효한지 확인

**해결 방법**:
```bash
# .env 파일 확인
cat .env | grep KAKAO_MAP_API_KEY

# 개발 서버 재시작
npm run dev
```

### 문제 3: Supabase 연결 실패

**증상**: 
- 메시지 보드에 데이터가 표시되지 않음
- RSVP 제출 실패

**확인 사항**:
1. `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY` 확인
2. Supabase 프로젝트가 활성화되어 있는지 확인
3. 테이블 및 RLS 정책 확인

### 문제 4: 포트가 이미 사용 중

**증상**: 
```
Error: Port 5173 is already in use
```

**해결 방법**:
```bash
# 포트를 사용하는 프로세스 종료
lsof -ti:5173 | xargs kill -9

# 또는 다른 포트 사용
npm run dev -- --port 3000
```

### 문제 5: Toast 메시지가 표시되지 않음

**확인 사항**:
1. 브라우저 콘솔에서 에러 확인
2. `ToastContext`가 `App.jsx`에서 제대로 설정되었는지 확인
3. CSS 파일이 제대로 로드되었는지 확인

---

## 📝 환경변수 체크리스트

로컬 개발 전에 다음 환경변수들이 모두 설정되어 있는지 확인하세요:

- [ ] `VITE_SUPABASE_URL` - Supabase 프로젝트 URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Supabase Anon Key
- [ ] `VITE_KAKAO_APP_KEY` - Kakao JavaScript Key (이미 설정됨: `ed7b448f3a86be82c19bc527bf25f365`)
- [ ] `VITE_KAKAO_MAP_API_KEY` - Kakao Map API Key

---

## 🎯 빠른 시작 명령어

```bash
# 1. 프로젝트 디렉토리로 이동
cd /Users/jisoo/Soo/Wedding

# 2. .env 파일 생성 및 편집 (필요시)
# nano .env 또는 code .env

# 3. 의존성 설치 (처음 한 번만)
npm install

# 4. 개발 서버 실행
npm run dev

# 5. 브라우저에서 http://localhost:5173/ 접속
```

---

## 📚 추가 참고 자료

- [Vite 공식 문서](https://vitejs.dev/)
- [Vercel 환경변수 가이드](https://vercel.com/docs/concepts/projects/environment-variables)
- [Supabase 설정 가이드](./SUPABASE_COMPLETE_SETUP.md)
- [Kakao 설정 가이드](./KAKAO_SETUP.md)

---

**도움이 필요하시면 언제든지 물어보세요!** 🚀

