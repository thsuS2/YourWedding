# 🚀 Vercel 배포 가이드

## 📋 사전 준비사항

- [x] ✅ `vite.config.js` base 경로 수정 완료
- [x] ✅ `vercel.json` 파일 생성 완료
- [ ] Vercel 계정 생성
- [ ] GitHub 리포지토리 준비

---

## Step 1: Vercel 계정 생성

1. [vercel.com](https://vercel.com) 접속
2. "Sign Up" 클릭
3. **GitHub 계정으로 로그인** (권장)
   - GitHub 리포지토리와 자동 연동
   - 자동 배포 설정 쉬움

---

## Step 2: 프로젝트 배포

### 방법 1: Vercel 대시보드에서 (권장)

1. Vercel 대시보드 접속
2. "Add New Project" 클릭
3. GitHub 리포지토리 선택
   - `MyWedding` (또는 실제 리포지토리명) 선택
4. 프로젝트 설정 확인:
   - **Framework Preset**: `Vite` (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 감지됨)
   - **Output Directory**: `dist` (자동 감지됨)
   - **Install Command**: `npm install` (기본값)
5. "Deploy" 클릭

### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 디렉토리에서 실행
vercel

# 프로덕션 배포
vercel --prod
```

---

## Step 3: 환경 변수 설정

배포 후 Vercel 대시보드에서 환경 변수를 설정해야 합니다.

### 설정 위치
1. Vercel 대시보드 → 프로젝트 선택
2. "Settings" 탭 클릭
3. "Environment Variables" 메뉴 선택

### 추가할 환경 변수

```
VITE_KAKAO_APP_KEY=your_kakao_javascript_key
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 환경 변수 적용 범위
- **Production**: 프로덕션 배포에 적용
- **Preview**: PR 프리뷰 배포에 적용
- **Development**: 로컬 개발에 적용

**권장**: Production과 Preview 모두 체크

### 환경 변수 추가 후
- "Save" 클릭
- **중요**: 환경 변수 추가 후 재배포 필요
  - "Deployments" 탭 → 최신 배포 → "Redeploy" 클릭

---

## Step 4: 배포 확인

### 배포 완료 후
1. Vercel 대시보드에서 배포 상태 확인
2. 배포 완료 시 URL 제공:
   - 예: `https://my-wedding.vercel.app`
3. URL 클릭하여 사이트 확인

### 기능 테스트
- [ ] 메인 페이지 로딩 확인
- [ ] 네비게이션 동작 확인
- [ ] 갤러리 이미지 표시 확인
- [ ] 축하 메시지 작성 및 표시 확인
- [ ] 카카오톡 공유 기능 확인

---

## Step 5: 자동 배포 설정 (이미 활성화됨)

Vercel은 기본적으로 자동 배포가 활성화되어 있습니다:

### 자동 배포 동작
- ✅ `main` 브랜치에 push → 프로덕션 자동 배포
- ✅ PR 생성 → 프리뷰 자동 배포
- ✅ PR 머지 → 프로덕션 자동 배포

### 배포 알림 설정
1. Settings → Git
2. "Deploy Hooks" 설정 (선택사항)
3. Slack, Discord 등으로 알림 받기 가능

---

## Step 6: 커스텀 도메인 연결 (선택사항)

### 도메인 추가
1. Settings → Domains
2. "Add Domain" 클릭
3. 도메인 입력 (예: `wedding.yourname.com`)
4. DNS 설정 안내 따르기

### 무료 도메인 옵션
- Vercel 자체 도메인: `my-wedding.vercel.app` (무료)
- 커스텀 도메인: 구매 필요 (예: Namecheap, GoDaddy)

---

## 🔧 문제 해결

### 빌드 실패 시

1. **환경 변수 확인**
   - Settings → Environment Variables
   - 모든 변수가 올바르게 설정되었는지 확인

2. **빌드 로그 확인**
   - Deployments → 실패한 배포 클릭
   - "Build Logs" 탭에서 에러 확인

3. **로컬 빌드 테스트**
   ```bash
   npm run build
   ```
   - 로컬에서 빌드 성공 확인

### 환경 변수가 적용되지 않을 때

1. 환경 변수 추가 후 **재배포 필요**
2. Deployments → 최신 배포 → "Redeploy" 클릭
3. 또는 코드를 다시 push

### 404 에러 발생 시

- `vercel.json` 파일이 올바르게 생성되었는지 확인
- SPA 라우팅 설정 확인

---

## 📊 배포 상태 확인

### Vercel 대시보드에서 확인 가능한 정보
- ✅ 배포 상태 (성공/실패)
- ✅ 배포 시간
- ✅ 빌드 로그
- ✅ 환경 변수
- ✅ 도메인 설정
- ✅ 분석 데이터 (선택사항)

---

## 🎉 배포 완료!

배포가 완료되면:
- ✅ 자동 HTTPS 적용
- ✅ 글로벌 CDN 배포
- ✅ 빠른 로딩 속도
- ✅ 무료 호스팅

**배포 URL 예시:**
```
https://jisooyusinwedding.vercel.app/
```

---

## 📝 다음 단계

### 배포 후 확인사항
1. [ ] 모든 페이지 정상 작동 확인
2. [ ] 모바일에서 테스트
3. [ ] 카카오톡 공유 기능 테스트
4. [ ] 축하 메시지 작성/조회 테스트
5. [ ] 이미지 로딩 확인

### 추가 최적화 (선택사항)
- [ ] 커스텀 도메인 연결
- [ ] Google Analytics 추가
- [ ] 성능 모니터링 설정

---

## 💡 팁

### 빠른 재배포
```bash
# 로컬에서
git commit --allow-empty -m "trigger redeploy"
git push
```

### 프리뷰 배포 확인
- PR 생성 시 자동으로 프리뷰 URL 생성
- PR 댓글로 프리뷰 URL 확인 가능
- 배포 전 테스트에 유용

### 환경 변수 관리
- 프로덕션과 프리뷰 환경 분리 가능
- 각 환경별로 다른 값 설정 가능

---

**문제가 발생하면 Vercel 대시보드의 "Deployments" 탭에서 빌드 로그를 확인하세요!**

