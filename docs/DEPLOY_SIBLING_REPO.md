# 형제 레포(YourWedding 등) 분리 · Vercel 배포 가이드

## 1. 한 번에 복제 (권장)

MyWedding 루트에서:

```bash
chmod +x scripts/create-sibling-wedding-repo.sh
./scripts/create-sibling-wedding-repo.sh YourWedding
```

- `../YourWedding` 폴더가 생기고, `git init` + 첫 커밋까지 됩니다.
- **`.env`는 복사하지 않습니다.** 보안상 로컬에서 복사하세요:  
  `cp ../MyWedding/.env .env` (또는 `.env.example`을 복사해 값 입력)

## 2. GitHub에 새 레포

1. GitHub에서 **빈 레포** 생성 (예: `YourWedding`, README 없이).
2. 로컬에서:

```bash
cd ../YourWedding
git remote add origin https://github.com/<계정>/YourWedding.git
git push -u origin main
```

## 3. Vercel 새 프로젝트

1. [Vercel](https://vercel.com) → **Add New Project** → 방금 만든 GitHub 레포 **Import**.
2. **Framework**: Vite (자동 감지).
3. **Environment Variables**에 MyWedding과 동일하게 추가 (또는 YourWedding 전용 값):
   - `VITE_KAKAO_APP_KEY`
   - `VITE_KAKAO_MAP_API_KEY`
   - `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` (사용 시)
4. **Deploy** 후 Production URL 확인 (예: `yourwedding.vercel.app`).

## 4. 카카오 개발자 콘솔

- **사이트 도메인**에 새 Vercel URL 추가.
- 지도/공유가 쓰는 키가 MyWedding과 같다면 **웹 도메인**만 추가하면 됩니다.

## 5. 앱 내용 분리

- `src/constants/wedding.js` — 이름, 날짜, 예식장, 카카오 공유 이미지 URL 등
- `public/images/` — 사진·갤러리
- `npm run generate-gallery` — 갤러리 목록 재생성

---

**관리 팁**: MyWedding과 YourWedding은 **서로 다른 폴더 · 서로 다른 `origin`** 이라서, 실수로 다른 레포에 푸시할 일이 적습니다.
