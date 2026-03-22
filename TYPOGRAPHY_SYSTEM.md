# 타이포그래피 디자인 시스템 적용 가이드

## 📋 개요

모든 텍스트 스타일을 6가지 그룹으로 분류하여 디자인 시스템으로 통일했습니다.

---

## 🎨 6가지 텍스트 스타일 그룹

### 1. Display (대형 제목)
- **클래스**: `.text-display`
- **용도**: 메인 타이틀, 인트로 섹션 제목
- **스타일**:
  - font-size: 2.5rem (모바일: 2rem)
  - font-weight: 700
  - line-height: 1.4
  - color: var(--text-dark)
  - font-family: var(--font-title-kr)

### 2. Heading Large (큰 제목)
- **클래스**: `.text-heading-large`
- **용도**: 섹션 타이틀 (Gallery, 오시는 길, 축하 메시지 등)
- **스타일**:
  - font-size: 1.5rem (모바일: 1.3rem)
  - font-weight: 700
  - line-height: 1.4
  - color: var(--text-dark)
  - font-family: var(--font-title-kr)

### 3. Heading Medium (중간 제목)
- **클래스**: `.text-heading-medium`
- **용도**: 서브 타이틀, 커플 이름, D-Day 라벨
- **스타일**:
  - font-size: 1.3rem (모바일: 1.2rem)
  - font-weight: 600
  - line-height: 1.4
  - color: var(--text-dark)
  - font-family: var(--font-title-kr)

### 4. Heading Small (작은 제목/강조)
- **클래스**: `.text-heading-small`
- **용도**: 작은 제목, 강조 텍스트, 부모님 이름
- **스타일**:
  - font-size: 1.1rem (모바일: 1rem)
  - font-weight: 600
  - line-height: 1.5
  - color: var(--text-dark)
  - font-family: var(--font-body)

### 5. Body (본문)
- **클래스**: `.text-body`, `.text-body-gray`, `.text-body-medium`
- **용도**: 일반 본문 텍스트
- **스타일**:
  - font-size: 1rem (모바일: 0.95rem)
  - font-weight: 400 (medium: 500)
  - line-height: 1.8
  - color: var(--text-dark) (gray: var(--text-gray))
  - font-family: var(--font-body)

### 6. Caption (작은 텍스트/캡션)
- **클래스**: `.text-caption`, `.text-caption-small`
- **용도**: 캡션, 부가 정보, 작은 텍스트
- **스타일**:
  - font-size: 0.85rem (small: 0.75rem, 모바일: 0.8rem)
  - font-weight: 400
  - line-height: 1.6
  - color: var(--text-gray) (small: var(--text-light))
  - font-family: var(--font-body)

---

## 🎯 특수 스타일

### 버튼 텍스트
- **클래스**: `.text-button`, `.text-button-large`
- **용도**: 버튼 내부 텍스트
- **스타일**:
  - font-size: 1rem (large: 1.1rem)
  - font-weight: 600
  - line-height: 1.2
  - color: white

### 인용문
- **클래스**: `.text-quote`
- **용도**: 인용문, 시구
- **스타일**:
  - font-size: 1rem
  - font-weight: 500
  - font-style: italic
  - line-height: 1.8
  - color: var(--text-dark)

### 에러 텍스트
- **클래스**: `.text-error`
- **용도**: 에러 메시지
- **스타일**:
  - font-size: 1rem
  - font-weight: 500
  - line-height: 1.5
  - color: #d00

### 색상 유틸리티
- `.text-white` - 흰색 텍스트
- `.text-gray` - 회색 텍스트
- `.text-light` - 연한 회색 텍스트

---

## 📝 사용 예시

### JSX에서 사용
```jsx
// 대형 제목
<h1 className="text-display">김유신, 박지수</h1>

// 섹션 타이틀
<h2 className="text-heading-large">Gallery</h2>

// 서브 타이틀
<h3 className="text-heading-medium">D-Day</h3>

// 작은 제목
<p className="text-heading-small">부모님 성함</p>

// 본문
<p className="text-body">일반 본문 텍스트입니다.</p>
<p className="text-body-gray">회색 본문 텍스트입니다.</p>

// 캡션
<span className="text-caption">작은 텍스트</span>

// 버튼
<button className="btn-primary text-button">버튼</button>
```

---

## ✅ 적용 완료된 컴포넌트

- ✅ IntroSection - Display, Heading Large
- ✅ MainSection - Heading Medium, Body, Quote
- ✅ GallerySection - Heading Large, Body, Caption, Button
- ✅ MapSection - Heading Large, Heading Small, Body, Caption
- ✅ MessageBoard - Heading Large, Heading Small, Body, Caption, Error
- ✅ Footer - Body, Heading Medium, Caption, Button
- ✅ Navigation - Body Medium
- ✅ DDayCounter - Heading Small, Heading Large, Caption
- ✅ Calendar - Heading Medium, Caption, Body Medium
- ✅ RSVPModal - Heading Large, Heading Small, Body, Caption, Button
- ✅ Toast - Body

---

## 🔧 CSS 파일 변경 사항

모든 컴포넌트 CSS 파일에서 다음 스타일 속성을 제거했습니다:
- `font-size`
- `font-weight`
- `color` (텍스트 관련)
- `line-height`

대신 JSX에서 디자인 시스템 클래스를 사용하도록 변경했습니다.

---

## 📚 파일 구조

```
src/
├── styles/
│   ├── globals.css          # 타이포그래피 import 추가
│   └── typography.css        # 디자인 시스템 정의 (새로 생성)
└── components/
    └── [모든 컴포넌트]       # 클래스 적용 완료
```

---

## 🎨 디자인 시스템의 장점

1. **일관성**: 모든 텍스트가 통일된 스타일을 따름
2. **유지보수성**: 한 곳에서 수정하면 전체에 반영
3. **확장성**: 새로운 텍스트 스타일 추가가 쉬움
4. **가독성**: 코드에서 텍스트 스타일 의도가 명확함

---

## 📝 다음 단계

디자인 시스템이 완전히 적용되었습니다. 이제 `src/styles/typography.css` 파일만 수정하면 모든 텍스트 스타일이 일괄 변경됩니다.

---

**모든 텍스트 스타일이 디자인 시스템을 따르도록 적용 완료!** 🎉

