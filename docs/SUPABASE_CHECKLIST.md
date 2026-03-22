# YourWedding Supabase 설정 체크리스트

MyWedding과 **같은 Supabase 프로젝트**를 쓰면, 방명록·RSVP 데이터가 **한 테이블에 섞일 수** 있습니다.  
YourWedding만 쓰려면 아래 중 하나를 선택하세요.

## 옵션 A: 새 Supabase 프로젝트 (권장)

1. [Supabase](https://supabase.com)에서 **New project** 생성.
2. **SQL Editor**에서 `SETUP_GUIDE.md`에 있는 `messages` 테이블·RLS 스크립트 실행.
3. **Project Settings → API**에서 `Project URL`, `anon public` 키 복사.
4. **Vercel**·로컬 `.env`에 반영:
   - `VITE_SUPABASE_URL=https://xxxx.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=eyJ...`
5. **재배포(Redeploy)** — Vite는 빌드 시 env를 박습니다.

## 옵션 B: 기존(MyWedding) 프로젝트 그대로 사용

- `.env`에 **동일한** `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`만 맞으면 클라이언트는 연결됩니다.
- **안 될 때** 흔한 원인:
  1. **Vercel에 변수 미설정** 또는 오타 → Production에 넣었는지 확인 후 **Redeploy**.
  2. **RLS 정책** — `INSERT`/`SELECT`가 `anon`에 허용돼 있는지 (`SETUP_GUIDE` 참고).
  3. 브라우저 **콘솔 Network**에서 Supabase 요청이 `401` / `403`인지 확인.

## 참고

- Supabase는 **카카오와 달리** 클라이언트용으로 “사이트 도메인”을 맞춰야만 동작하는 방식이 아닙니다. **키·RLS**가 핵심입니다.
- OAuth 로그인을 쓰면 **Authentication → URL 설정**에 `https://shjywedding.vercel.app` 등을 추가해야 할 수 있습니다. (현재 청첩장은 anon + RLS 패턴이 일반적입니다.)
