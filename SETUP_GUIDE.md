# 🛠️ 설정 가이드

## 📱 Kakao SDK 설정

### 1. Kakao Developers 앱 등록

1. [Kakao Developers](https://developers.kakao.com/) 접속
2. 로그인 후 "내 애플리케이션" 메뉴에서 "애플리케이션 추가하기" 클릭
3. 앱 이름 입력 (예: "지수유신 청첩장")
4. 회사명 입력 (선택사항)

### 2. JavaScript 키 발급

1. 생성한 앱 클릭
2. "앱 키" 섹션에서 **JavaScript 키** 복사
3. 프로젝트 루트에 `.env` 파일 생성
4. 다음 내용 추가:

```env
VITE_KAKAO_APP_KEY=your_javascript_key_here
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key
```

### 2-1. 카카오맵 API 키 발급 (선택사항)

카카오맵을 화면에 표시하려면:

1. 생성한 앱 클릭
2. "앱 키" 섹션에서 **REST API 키** 또는 **JavaScript 키** 복사
3. `.env` 파일에 `VITE_KAKAO_MAP_API_KEY` 추가

### 3. 플랫폼 등록

1. 좌측 메뉴에서 "플랫폼" 선택
2. "Web 플랫폼 등록" 클릭
3. 사이트 도메인 입력:
   - 개발: `http://localhost:5173`
   - 배포: `https://yourusername.github.io`

### 4. 카카오톡 공유 활성화

1. 좌측 메뉴에서 "카카오 로그인" 선택
2. "활성화 설정" ON (카카오톡 공유는 자동 활성화됨)

---

## 🗄️ Supabase 설정 (Phase 4)

### 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com/) 접속
2. "New Project" 클릭
3. 프로젝트 정보 입력:
   - Name: `my-wedding`
   - Database Password: 안전한 비밀번호 설정
   - Region: `Northeast Asia (Seoul)` 선택 (한국 사용자 최적화)

### 2. API 키 확인

1. 프로젝트 대시보드에서 "Settings" → "API" 메뉴
2. 다음 정보 복사:
   - Project URL
   - anon public key

3. `.env` 파일에 추가:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. 테이블 생성

1. 좌측 메뉴에서 "Table Editor" 선택
2. "New Table" 클릭
3. 테이블 이름: `messages`
4. 컬럼 설정:

| 컬럼명 | 타입 | 설정 |
|--------|------|------|
| id | int8 | Primary Key, Auto-increment |
| created_at | timestamptz | Default: now() |
| name | text | NOT NULL |
| relationship | text | NOT NULL |
| message | text | NOT NULL |

5. "Save" 클릭

### 4. RLS (Row Level Security) 설정

1. "Authentication" → "Policies" 메뉴
2. `messages` 테이블에 정책 추가:

**읽기 정책 (누구나 읽기 가능):**
```sql
CREATE POLICY "Enable read access for all users" 
ON messages FOR SELECT 
USING (true);
```

**쓰기 정책 (누구나 쓰기 가능):**
```sql
CREATE POLICY "Enable insert access for all users" 
ON messages FOR INSERT 
WITH CHECK (true);
```

---

## 🌐 Vercel 배포 설정 (권장)

자세한 배포 가이드는 [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) 참고

### 간단 요약
1. [vercel.com](https://vercel.com) 접속 및 GitHub 연동
2. "Add New Project" → GitHub 리포지토리 선택
3. 환경 변수 설정 (Settings → Environment Variables)
4. 자동 배포 완료

---

## 🌐 GitHub Pages 배포 설정 (레거시)

### 1. GitHub 리포지토리 생성

1. GitHub에서 새 리포지토리 생성
2. 리포지토리 이름: `MyWedding` (또는 원하는 이름)
3. Public 설정

### 2. 로컬 저장소 연결

```bash
cd /Users/park/workspace/MyWedding
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/MyWedding.git
git push -u origin main
```

### 3. GitHub Pages 설정

1. GitHub 리포지토리 → "Settings" 메뉴
2. 좌측 "Pages" 메뉴 선택
3. Source: "Deploy from a branch"
4. Branch: `gh-pages` 선택
5. Folder: `/ (root)` 선택
6. "Save" 클릭

### 4. 배포 실행

```bash
npm run deploy
```

첫 배포 후 몇 분 뒤 `https://yourusername.github.io/MyWedding/`에서 확인 가능

---

## 🔧 환경 변수 전체 예시

`.env` 파일 전체 예시:

```env
# Kakao SDK
VITE_KAKAO_APP_KEY=1234567890abcdef1234567890abcdef

# Kakao Map API (선택사항)
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key

# Supabase
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **주의:** `.env` 파일은 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다.

---

## 📝 실제 데이터 교체 체크리스트

### wedding.js (중앙 관리)
- [ ] 결혼식 날짜 및 시간
- [ ] 커플 이름 및 전화번호
- [ ] 부모님 성함 및 전화번호
- [ ] 예식장 정보 (이름, 주소, 교통 정보)
- [ ] 계좌번호 (신랑/신부)

### 이미지 교체
- [ ] 메인 이미지: `public/images/main.png`
- [ ] 갤러리 이미지: `public/images/gallery-001.jpeg ~ gallery-014.jpeg` (14개)
- [ ] 장식 이미지: `src/assets/images/` 폴더 (선택사항)

### index.html
- [ ] og:image 썸네일 이미지 경로
- [ ] og:url 실제 배포 URL

### vite.config.js
- [ ] base URL (GitHub 리포지토리명과 일치)

---

## 🎨 이미지 준비 가이드

### 권장 이미지 사이즈

1. **메인 커플 사진**
   - 비율: 3:4
   - 권장 크기: 1200 x 1600px
   - 파일명: `main-couple.jpg`

2. **갤러리 사진 (9개)**
   - 비율: 1:1 (정사각형) 또는 3:4
   - 권장 크기: 800 x 800px 이상
   - 파일명: `gallery-1.jpg` ~ `gallery-9.jpg`

3. **카카오톡 공유 썸네일**
   - 비율: 1.91:1 또는 1:1
   - 권장 크기: 800 x 400px
   - 파일명: `wedding-thumbnail.jpg`

모든 이미지는 `public/` 폴더 또는 `src/assets/images/` 폴더에 저장

---

## 🚀 개발 시작

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 로컬 빌드 미리보기
npm run preview

# GitHub Pages 배포
npm run deploy
```

