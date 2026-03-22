# Vercel 카카오 관련 환경변수 설정 가이드

## 📋 필요한 환경변수

Vercel 대시보드에서 다음 환경변수들을 설정해야 합니다:

### 1. Kakao SDK (JavaScript Key)
```
VITE_KAKAO_APP_KEY=ed7b448f3a86be82c19bc527bf25f365
```
- **용도**: 카카오톡 공유 기능
- **위치**: Kakao Developers → 내 애플리케이션 → 앱 키 → JavaScript 키

### 2. Kakao Map API Key
```
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```
- **용도**: 지도 표시 기능
- **위치**: Kakao Developers → 내 애플리케이션 → 앱 키 → REST API 키 (또는 JavaScript 키)

### 3. Supabase 설정 (이미 설정되어 있을 수 있음)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```
- **용도**: 메시지 보드, RSVP 기능

---

## 🔧 Vercel 환경변수 설정 방법

### Step 1: Vercel 대시보드 접속
1. https://vercel.com 접속
2. 로그인
3. 프로젝트 `jisooyusinwedding` 선택

### Step 2: Settings 메뉴로 이동
1. 상단 메뉴에서 **Settings** 클릭
2. 왼쪽 사이드바에서 **Environment Variables** 클릭

### Step 3: 환경변수 추가
각 환경변수를 추가합니다:

#### Kakao SDK Key 추가
1. **Add New** 버튼 클릭
2. **Key**: `VITE_KAKAO_APP_KEY`
3. **Value**: `ed7b448f3a86be82c19bc527bf25f365`
4. **Environment**: 
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. **Save** 클릭

#### Kakao Map API Key 추가
1. **Add New** 버튼 클릭
2. **Key**: `VITE_KAKAO_MAP_API_KEY`
3. **Value**: `ed7b448f3a86be82c19bc527bf25f365`
4. **Environment**: 
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. **Save** 클릭

---

## ✅ 환경변수 확인 체크리스트

다음 환경변수들이 모두 설정되어 있는지 확인하세요:

- [ ] `VITE_KAKAO_APP_KEY` - Kakao SDK JavaScript Key
- [ ] `VITE_KAKAO_MAP_API_KEY` - Kakao Map API Key
- [ ] `VITE_SUPABASE_URL` - Supabase 프로젝트 URL
- [ ] `VITE_SUPABASE_ANON_KEY` - Supabase Anon Key

---

## 🔄 환경변수 적용 방법

### 방법 1: 자동 적용 (권장)
환경변수를 추가/수정한 후:
1. **Redeploy** 버튼 클릭
2. 또는 새로운 커밋을 푸시하면 자동으로 재배포됨

### 방법 2: 수동 재배포
1. Vercel 대시보드 → 프로젝트 선택
2. **Deployments** 탭 클릭
3. 최신 배포 옆 **⋯** 메뉴 클릭
4. **Redeploy** 선택

---

## 🧪 테스트 방법

환경변수 설정 후 배포가 완료되면:

### 1. 카카오톡 공유 기능 테스트
- 사이트에서 공유 버튼 클릭
- 카카오톡 공유 창이 정상적으로 열리는지 확인

### 2. 카카오맵 테스트
- "오시는 길" 섹션으로 스크롤
- 지도가 정상적으로 표시되는지 확인
- 마커와 인포윈도우가 표시되는지 확인

### 3. 에러 확인
- 브라우저 콘솔(F12)에서 에러 메시지 확인
- 환경변수가 제대로 로드되었는지 확인

---

## ⚠️ 주의사항

### Kakao Developers 플랫폼 설정
환경변수만 설정하는 것이 아니라, **Kakao Developers**에서도 플랫폼 도메인을 등록해야 합니다:

1. https://developers.kakao.com 접속
2. 내 애플리케이션 선택
3. **앱 설정** → **플랫폼** 메뉴
4. **Web 플랫폼 등록** 클릭
5. 사이트 도메인 추가:
   - `https://jisooyusinwedding.vercel.app`
   - `https://*.vercel.app` (모든 Vercel 서브도메인 허용)

### Kakao Map API 설정
1. Kakao Developers → 내 애플리케이션
2. **앱 설정** → **플랫폼** 메뉴
3. Web 플랫폼이 등록되어 있는지 확인
4. **제품 설정** → **Kakao 로그인** 활성화 (필요시)
5. **제품 설정** → **JavaScript 키** 확인

---

## 🔍 환경변수 확인 방법

### Vercel 대시보드에서
1. Settings → Environment Variables
2. 각 환경변수가 올바르게 설정되어 있는지 확인

### 배포 로그에서
1. Deployments → 최신 배포 클릭
2. Build Logs 확인
3. 환경변수가 제대로 주입되었는지 확인

### 런타임에서 (개발자 도구)
브라우저 콘솔에서:
```javascript
// 환경변수는 빌드 타임에 주입되므로 직접 확인 불가
// 대신 기능이 동작하는지로 확인
```

---

## 📝 현재 설정 상태

### 이미 설정된 것으로 예상되는 항목
- ✅ `VITE_KAKAO_APP_KEY` - 이미 설정되어 있을 가능성 높음
- ❓ `VITE_KAKAO_MAP_API_KEY` - 확인 필요
- ✅ `VITE_SUPABASE_URL` - 이미 설정되어 있을 가능성 높음
- ✅ `VITE_SUPABASE_ANON_KEY` - 이미 설정되어 있을 가능성 높음

---

## 🚀 빠른 체크리스트

배포 전 확인:
- [ ] Vercel 환경변수 모두 설정됨
- [ ] Kakao Developers 플랫폼 도메인 등록됨
- [ ] 배포 완료 후 기능 테스트 완료

---

**문제가 있으면 언제든지 물어보세요!** 🎉

