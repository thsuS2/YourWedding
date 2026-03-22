# 갤러리 이미지 관리 가이드

## 📸 이미지 추가/변경 방법

### 방법 1: 간단하게 파일만 교체 (권장)

1. **이미지 파일 준비**
   - `images/` 폴더에 새 이미지 파일 추가 또는 기존 파일 교체

2. **파일명 확인**
   - 파일명을 확인합니다 (예: `KakaoTalk_Photo_2025-12-11-20-03-34 001.jpeg`)

3. **상수 파일 업데이트**
   - `src/constants/gallery.js` 파일을 엽니다
   - `GALLERY_IMAGES` 배열에 파일명을 추가하거나 수정합니다

4. **public 폴더에 복사**
   - `images/` 폴더의 이미지를 `public/images/` 폴더로 복사합니다
   - 또는 심볼릭 링크를 생성합니다

5. **개발 서버 재시작** (필요시)
   ```bash
   npm run dev
   ```

### 방법 2: 스크립트로 자동 복사

터미널에서 다음 명령어 실행:

```bash
# images 폴더의 이미지를 public/images로 복사
cp images/*.jpeg public/images/
cp images/*.png public/images/
```

---

## 📁 파일 구조

```
프로젝트 루트/
├── images/                          # 원본 이미지 폴더
│   ├── KakaoTalk_Photo_...001.jpeg
│   ├── KakaoTalk_Photo_...002.jpeg
│   └── ...
├── public/
│   └── images/                      # 웹에서 사용할 이미지 폴더
│       ├── KakaoTalk_Photo_...001.jpeg
│       ├── KakaoTalk_Photo_...002.jpeg
│       └── ...
└── src/
    └── constants/
        └── gallery.js              # 이미지 목록 관리
```

---

## 🔧 이미지 목록 수정하기

`src/constants/gallery.js` 파일을 열고 `GALLERY_IMAGES` 배열을 수정합니다:

```javascript
export const GALLERY_IMAGES = [
  '새로운-이미지-001.jpg',      // 새 이미지 추가
  'KakaoTalk_Photo_...001.jpeg', // 기존 이미지
  'KakaoTalk_Photo_...002.jpeg',
  // ... 나머지 이미지들
];
```

**주의사항**:
- 파일명은 정확히 일치해야 합니다 (대소문자 구분)
- `public/images/` 폴더에 해당 파일이 있어야 합니다
- 배열 순서가 갤러리 표시 순서입니다

---

## ✅ 체크리스트

이미지를 추가/변경할 때:

- [ ] `images/` 폴더에 이미지 파일 추가/교체
- [ ] `src/constants/gallery.js`의 `GALLERY_IMAGES` 배열 업데이트
- [ ] `public/images/` 폴더에 이미지 복사
- [ ] 개발 서버에서 확인 (`npm run dev`)
- [ ] 이미지가 올바르게 표시되는지 확인

---

## 🚀 빠른 업데이트 명령어

```bash
# 1. images 폴더의 모든 이미지를 public/images로 복사
cp images/*.jpeg public/images/ 2>/dev/null || true
cp images/*.jpg public/images/ 2>/dev/null || true
cp images/*.png public/images/ 2>/dev/null || true

# 2. 개발 서버 재시작 (필요시)
npm run dev
```

---

## 💡 팁

### 이미지 최적화
- 이미지 파일 크기가 크면 로딩이 느려질 수 있습니다
- 필요시 이미지 압축 도구 사용 권장

### 파일명 규칙
- 파일명에 공백이 있어도 됩니다
- 한글 파일명도 사용 가능합니다
- 확장자는 `.jpeg`, `.jpg`, `.png` 모두 지원됩니다

### 순서 변경
- `GALLERY_IMAGES` 배열의 순서를 변경하면 갤러리 표시 순서가 바뀝니다

---

**문제가 있으면 언제든지 물어보세요!** 📸

