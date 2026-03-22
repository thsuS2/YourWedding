# 🔧 Vercel 404 오류 해결 가이드

## 문제 원인
Vercel에서 빌드할 때 이전 `base: '/MyWedding/'` 설정이 캐시되어 사용되었을 가능성이 높습니다.

## 해결 방법

### 방법 1: Vercel에서 빌드 캐시 클리어 후 재배포 (권장)

1. **Vercel 대시보드 접속**
   - 프로젝트 선택
   - "Deployments" 탭 클릭

2. **최신 배포 선택**
   - 실패한 배포 또는 최신 배포 클릭

3. **재배포 (캐시 클리어)**
   - "..." 메뉴 클릭
   - **"Redeploy"** 선택
   - ⚠️ **중요**: "Use existing Build Cache" 체크 해제
   - "Redeploy" 클릭

### 방법 2: Vercel 프로젝트 설정 확인

1. **Settings → General**
   - "Build & Development Settings" 확인
   - Framework Preset: `Vite` 확인
   - Build Command: `npm run build` 확인
   - Output Directory: `dist` 확인

2. **Root Directory 확인**
   - Root Directory가 `.` 또는 비어있는지 확인

### 방법 3: 환경 변수로 base 경로 강제 설정

Vercel 대시보드 → Settings → Environment Variables에 추가:

```
VITE_BASE_PATH=/
```

그리고 `vite.config.js` 수정:
```javascript
base: import.meta.env.VITE_BASE_PATH || '/',
```

### 방법 4: Vercel CLI로 로컬 빌드 확인 후 배포

```bash
# 로컬에서 빌드 확인
npm run build

# 빌드된 파일 확인
ls -la dist/

# Vercel CLI로 배포 (캐시 무시)
vercel --prod --force
```

---

## 즉시 해결 단계 (가장 빠름)

1. **Vercel 대시보드** → 프로젝트 선택
2. **Deployments** 탭 → 최신 배포 클릭
3. **"..." 메뉴** → **"Redeploy"**
4. **"Use existing Build Cache" 체크 해제** ⚠️ 중요!
5. **"Redeploy" 클릭**

이렇게 하면 새로운 빌드가 실행되며 `base: '/'` 설정이 제대로 적용됩니다.

---

## 확인 사항

재배포 후 확인:
- [ ] 빌드 로그에서 `base: '/'` 확인
- [ ] 배포된 사이트에서 네트워크 탭 확인
- [ ] 리소스 경로가 `/assets/...`로 시작하는지 확인
- [ ] `/MyWedding/` 경로가 없는지 확인

---

## 추가 문제 해결

### 여전히 404 오류가 발생하면

1. **브라우저 캐시 클리어**
   - Chrome: Ctrl+Shift+Delete (또는 Cmd+Shift+Delete)
   - 시크릿 모드로 테스트

2. **Vercel 빌드 로그 확인**
   - Deployments → 배포 클릭 → "Build Logs" 탭
   - 에러 메시지 확인

3. **로컬 빌드 테스트**
   ```bash
   npm run build
   npm run preview
   ```
   - 로컬에서 정상 작동하는지 확인

---

## 예상 결과

재배포 후:
- ✅ 리소스 경로: `/assets/react-vendor-xxx.js` (정상)
- ✅ 리소스 경로: `/assets/index-xxx.css` (정상)
- ✅ 아이콘 경로: `/vite.svg` (정상)
- ❌ `/MyWedding/` 경로 없음

