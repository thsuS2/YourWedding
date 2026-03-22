# 📱 Kakao SDK 설정 가이드

카카오톡 공유 기능을 사용하기 위한 Kakao SDK 설정 방법입니다.

---

## 📋 단계별 설정

### Step 1: Kakao Developers 앱 등록

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 로그인 (카카오 계정)
3. **"내 애플리케이션"** 메뉴 클릭
4. **"애플리케이션 추가하기"** 클릭

### Step 2: 앱 정보 입력

1. **앱 이름**: `지수유신 청첩장` (또는 원하는 이름)
2. **사업자명**: 개인 이름 또는 선택사항
3. **"저장"** 클릭

### Step 3: JavaScript 키 발급

1. 생성한 앱 클릭
2. **"앱 키"** 섹션에서 **JavaScript 키** 복사
   - 예: `1234567890abcdef1234567890abcdef`
3. ⚠️ **이 키를 메모장에 임시 저장** (나중에 사용)

### Step 4: 플랫폼 등록 (중요!)

1. 좌측 메뉴 → **"플랫폼"** 선택
2. **"Web 플랫폼 등록"** 클릭
3. 사이트 도메인 입력:

#### 개발 환경 (로컬 테스트용)
```
http://localhost:5173
```

#### 배포 환경 (Vercel 배포 URL)
```
https://your-project-name.vercel.app
```

⚠️ **중요**: 
- Vercel 배포 후 실제 URL로 변경 필요
- 여러 도메인 등록 가능 (개발용 + 배포용)

4. **"저장"** 클릭

### Step 5: 카카오 로그인 활성화 (공유 기능용)

1. 좌측 메뉴 → **"카카오 로그인"** 선택
2. **"활성화 설정"** ON으로 변경
   - 카카오톡 공유는 자동으로 활성화됨
3. **"저장"** 클릭

---

## 🔑 환경 변수 설정

### .env 파일에 추가

프로젝트 루트의 `.env` 파일에 다음을 추가:

```env
# Kakao SDK
VITE_KAKAO_APP_KEY=여기에_JavaScript_키_붙여넣기
```

**예시:**
```env
# Kakao SDK
VITE_KAKAO_APP_KEY=1234567890abcdef1234567890abcdef
```

⚠️ **주의**: 
- 따옴표 없이 키만 입력
- `VITE_` 접두사 필수
- `.env` 파일은 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다

---

## ✅ 설정 확인

### Step 1: 개발 서버 재시작
```bash
# 개발 서버 중지 (Ctrl+C)
# 다시 시작
npm run dev
```

### Step 2: 기능 테스트
1. 청첩장 사이트 접속
2. 하단 "카카오톡 공유하기" 버튼 클릭
3. 카카오톡 공유 창이 열리는지 확인

---

## 🔧 문제 해결

### "카카오톡 공유 기능을 사용할 수 없습니다" 오류

**원인 1: 플랫폼 미등록**
- 해결: Kakao Developers → 플랫폼 → Web 플랫폼 등록 확인
- 현재 접속 중인 URL이 등록된 도메인과 일치하는지 확인

**원인 2: JavaScript 키 오류**
- 해결: `.env` 파일의 `VITE_KAKAO_APP_KEY` 확인
- 개발 서버 재시작 확인

**원인 3: 카카오 로그인 미활성화**
- 해결: Kakao Developers → 카카오 로그인 → 활성화 설정 ON

### 공유 시 썸네일이 안 나올 때

1. `index.html`의 `og:image` 메타 태그 확인
2. 이미지 경로가 올바른지 확인
3. 이미지 파일이 `public/` 폴더에 있는지 확인

---

## 📝 Vercel 배포 시 추가 설정

### 환경 변수 설정

1. Vercel 대시보드 → 프로젝트 선택
2. **Settings** → **Environment Variables**
3. 다음 추가:
   - **Name**: `VITE_KAKAO_APP_KEY`
   - **Value**: JavaScript 키
   - **Environment**: Production, Preview 모두 체크
4. **Save** 클릭
5. **재배포** 필요 (Deployments → Redeploy)

---

## 🎯 체크리스트

설정 완료 후 확인:

- [ ] Kakao Developers 앱 생성
- [ ] JavaScript 키 발급
- [ ] Web 플랫폼 등록 (localhost + 배포 URL)
- [ ] 카카오 로그인 활성화
- [ ] `.env` 파일에 `VITE_KAKAO_APP_KEY` 추가
- [ ] 개발 서버 재시작
- [ ] 카카오톡 공유 기능 테스트
- [ ] Vercel 배포 시 환경 변수 설정 (배포 후)

---

## 💡 팁

### 여러 도메인 등록
- 개발용: `http://localhost:5173`
- 배포용: `https://your-project.vercel.app`
- 둘 다 등록하면 개발/배포 모두에서 사용 가능

### 테스트 방법
1. 모바일에서 실제 카카오톡으로 공유 테스트
2. 공유된 링크 클릭하여 정상 접속 확인
3. 썸네일 이미지 표시 확인

---

**설정 완료 후 카카오톡 공유 기능이 정상 작동합니다!** 📱

