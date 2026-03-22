# YourWedding: `VITE_SITE_URL` 필수

MyWedding에서 복제한 프로젝트는 예전에 **다른 Vercel 주소**(`jisooyusinwedding.vercel.app`)가 코드에 박혀 있었습니다.  
YourWedding 전용 도메인으로 바꾸려면 **반드시** 아래를 설정하세요.

## 1. Vercel → Environment Variables

| Name | Value (예시) |
|------|----------------|
| `VITE_SITE_URL` | `https://여기에-본인-프로젝트.vercel.app` |

- **끝에 `/` 넣지 않기**
- Production(필요 시 Preview) 모두 체크

## 2. 로컬 `.env`

```env
VITE_SITE_URL=https://본인.vercel.app
```

## 3. 재배포

변수 추가·수정 후 **Deployments → Redeploy** (빌드 시 `index.html`의 OG 태그와 번들에 URL이 박힘).

## 4. 카카오 개발자 콘솔

**JavaScript 키** 사용 앱 → **플랫폼** → **Web** → 사이트 도메인에 위와 **동일한 호스트** 등록  
(예: `https://본인.vercel.app`)

---

`VITE_SITE_URL` 없이 빌드하면 카카오 공유 링크·미리보기 이미지가 엉뚱한 주소로 갈 수 있습니다.
