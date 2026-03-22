# 💐 지수 🫶 유신 - Botanical Flow Minimal 청첩장

> **"봄날의 정원 속, 우리의 약속"**  
> 화이트톤의 밝은 보타니컬 가든 컨셉으로 제작한  
> 심플하고 특별한 감성의 모바일 청첩장 🌸

---

## 🌸 프로젝트 소개

**Botanical Flow Minimal**은 개발자 커플이 직접 만든 웹 청첩장입니다.

- 🎨 **디자인**: White + Greenery + Blush Pink
- 📱 **반응형**: 모든 모바일 브라우저 최적화
- ⚡ **기술**: React + Vite + Supabase
- 🚀 **배포**: GitHub Pages

---

## ✨ 주요 기능

### 1. 🎯 고정 내비게이션
- 상단 고정 메뉴로 섹션 간 부드러운 이동
- 스크롤 시 반투명 blur 효과

### 2. 🌸 흩날리는 꽃잎 애니메이션
- Canvas API 기반 꽃잎 애니메이션
- 봄바람처럼 부드러운 모션

### 3. 📸 인트로 섹션
- 배경 이미지 페이드인 효과
- 꽃 액자 장식 이미지
- 커플 이름 표시

### 4. 💐 메인 섹션
- 커플 이름 및 장소 정보
- 결혼 관련 문구 인용
- 초대 글
- 달력 (캘린더) 표시
- D-Day 카운터 (정확한 시간 기준)
- 혼주에게 연락하기 기능
  - 신랑/신부 직접 연락 (전화/문자)
  - 혼주 연락 모달 (신랑측/신부측 각각)

### 5. 🖼️ 갤러리 (14개 이미지)
- 이미지 클릭 시 전체화면 모달
- 좌우 화살표/키보드로 네비게이션
- Lazy Loading으로 성능 최적화
- 부케 장식 이미지

### 6. 🗺️ 오시는 길
- 카카오맵 API 연동 (실제 지도 표시)
- 지도 바로가기 (카카오맵/네이버지도)
- 계좌번호 원클릭 복사
- 참석의사 전달하기 버튼

### 7. 💌 실시간 축하 메시지
- Supabase 연동으로 실시간 메시지 표시
- 관계별 필터 (가족/친구/동료/기타)
- 즉시 반영되는 축하 메시지

### 8. 📱 카카오톡 공유
- Kakao SDK 연동
- 모바일 친화적 공유 기능

### 9. 💐 참석의사 전달하기 (RSVP)
- 페이지 입장 시 자동 팝업
- 구분(신랑/신부측), 성함, 동행인, 식사 여부 입력
- "오늘 하루 보지 않기" 기능
- Supabase에 데이터 저장

---

## 🛠️ 기술 스택

| 분야 | 기술 |
|------|------|
| **Frontend** | React 19, Vite |
| **Database** | Supabase (PostgreSQL) |
| **Animation** | Canvas API, CSS Keyframes |
| **Icons** | React Icons (Phosphor Icons, Simple Icons) |
| **API** | Kakao SDK, Kakao Map API |
| **Deployment** | Vercel (자동 배포) |

---

## 🚀 시작하기

### 1. 클론 및 설치

```bash
git clone https://github.com/yourusername/MyWedding.git
cd MyWedding
npm install
```

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일 생성:

```env
# Kakao SDK
VITE_KAKAO_APP_KEY=your_kakao_javascript_key

# Kakao Map API
VITE_KAKAO_MAP_API_KEY=your_kakao_map_api_key

# Supabase
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```


### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드

```bash
npm run build
```

### 5. Vercel 배포

Vercel에 프로젝트를 연결하면 자동으로 배포됩니다.

자세한 배포 가이드는 [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) 참고

---

## 📁 프로젝트 구조

```
/Users/jisoo/Soo/Wedding/
├── public/                # 정적 파일
│   └── images/            # 이미지 파일
│       ├── main.png       # 메인 이미지
│       └── gallery-*.jpeg # 갤러리 이미지 (14개)
├── src/
│   ├── assets/            # 에셋 파일
│   │   └── images/        # 장식 이미지
│   │       ├── flower-frame.png
│   │       ├── flowers.png
│   │       ├── leaf.png
│   │       └── map.png
│   ├── components/        # React 컴포넌트
│   │   ├── Navigation.jsx
│   │   ├── PetalAnimation.jsx
│   │   ├── RSVPModal.jsx  # 참석의사 전달하기
│   │   ├── Footer.jsx
│   │   ├── intro/         # 인트로 섹션
│   │   │   └── IntroSection.jsx
│   │   ├── main/          # 메인 섹션
│   │   │   ├── MainSection.jsx
│   │   │   └── components/
│   │   │       ├── Calendar.jsx
│   │   │       └── DDayCounter.jsx
│   │   ├── gallary/       # 갤러리 섹션
│   │   │   ├── GallerySection.jsx
│   │   │   └── components/
│   │   │       └── LazyImage.jsx
│   │   ├── map/           # 오시는 길 섹션
│   │   │   └── MapSection.jsx
│   │   └── message/       # 축하 메시지 섹션
│   │       └── MessageBoard.jsx
│   ├── constants/         # 상수 파일
│   │   └── wedding.js     # 결혼식 정보
│   ├── hooks/             # Custom Hooks
│   │   └── useSupabase.js
│   ├── lib/               # 라이브러리 설정
│   │   └── supabase.js
│   ├── utils/             # 유틸리티 함수
│   │   ├── kakaoShare.js
│   │   └── clipboard.js
│   ├── styles/            # 글로벌 스타일
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
├── .Work/                 # 작업 일지
├── SETUP_GUIDE.md         # 설정 가이드
├── VERCEL_DEPLOY.md       # Vercel 배포 가이드
├── SUPABASE_COMPLETE_SETUP.md  # Supabase 완전 설정 가이드
├── KAKAO_SETUP.md         # Kakao SDK 설정 가이드
├── RSVP_SETUP.md          # RSVP 설정 가이드
├── package.json
└── vite.config.js
```

---

## 🎨 커스터마이징

### 실제 데이터로 교체하기

모든 결혼식 정보는 `src/constants/wedding.js` 파일에서 중앙 관리됩니다.

1. **결혼식 정보**
   - 날짜 및 시간
   - 커플 정보 (이름, 전화번호)
   - 부모님 정보 (성함, 전화번호)
   - 예식장 정보 (이름, 주소, 교통 정보)
   - 계좌번호

2. **이미지 교체**
   - 메인 이미지: `public/images/main.png`
   - 갤러리: `public/images/gallery-001.jpeg ~ gallery-014.jpeg` (14개)
   - 장식 이미지: `src/assets/images/` 폴더

자세한 체크리스트는 [SETUP_GUIDE.md](./SETUP_GUIDE.md) 참고

---

## 🔐 보안 주의사항

### Vercel 환경 변수 설정

1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Environment Variables
3. 다음 환경 변수 추가:
   - `VITE_KAKAO_APP_KEY`
   - `VITE_KAKAO_MAP_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

⚠️ **참고**: 현재 프로젝트는 `.env` 파일을 Git에 포함하여 다른 환경에서도 쉽게 작업할 수 있도록 설정되어 있습니다.

---

## 📱 모바일 브라우저 지원

- ✅ Safari (iOS)
- ✅ Chrome (Android)
- ✅ Samsung Internet
- ✅ Kakao In-App Browser
- ✅ Naver In-App Browser

---

## 🎯 성능 최적화

- ⚡ Lazy Loading (이미지) - IntersectionObserver 사용
- ⚡ Code Splitting (React.lazy - 필요시)
- ⚡ Canvas Animation Optimization
- ⚡ Supabase Realtime Channels
- ⚡ 이미지 최적화 (LazyImage 컴포넌트)

---

## 📄 라이선스

이 프로젝트는 개인 청첩장 용도로 제작되었습니다.

---

## 💕 Special Thanks

Made with 💕 by 지수 & 유신

---

## 📞 문의

문제가 발생하거나 질문이 있으시면 Issues를 남겨주세요.

---

## 🎉 결혼식 정보

**일시:** 2026년 5월 30일 (토요일) 오후 5시 30분  
**장소:** 보타닉파크웨딩 카라홀  
**주소:** 서울시 강서구 마곡중앙5로 6 보타닉 푸르지오시티 로비층

---

_"봄날의 정원 속, 우리의 약속"_ 🌸
