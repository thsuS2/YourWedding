# 🔧 Supabase 완전 설정 가이드

이 문서는 청첩장 프로젝트에서 사용하는 **모든 Supabase 설정**을 포함합니다.

---

## 📋 목차

1. [Supabase 프로젝트 생성](#1-supabase-프로젝트-생성)
2. [API 키 확인](#2-api-키-확인)
3. [messages 테이블 생성](#3-messages-테이블-생성-축하-메시지)
4. [rsvp 테이블 생성](#4-rsvp-테이블-생성-참석의사-전달하기)
5. [RLS 정책 설정](#5-rls-정책-설정)
6. [환경 변수 설정](#6-환경-변수-설정)
7. [확인 및 테스트](#7-확인-및-테스트)

---

## 1. Supabase 프로젝트 생성

### Step 1: Supabase 계정 생성
1. [supabase.com](https://supabase.com/) 접속
2. "Start your project" 클릭
3. GitHub 계정으로 로그인 (권장)

### Step 2: 새 프로젝트 생성
1. "New Project" 클릭
2. 프로젝트 정보 입력:
   - **Name**: `my-wedding` (또는 원하는 이름)
   - **Database Password**: 안전한 비밀번호 설정 ⚠️ **메모 필수!**
   - **Region**: **Northeast Asia (Seoul)** 선택 (한국 사용자 최적화)
3. "Create new project" 클릭
4. 프로젝트 생성 완료 대기 (1~2분 소요)

---

## 2. API 키 확인

1. 프로젝트 대시보드에서 **"Settings"** → **"API"** 메뉴 선택
2. 다음 정보 복사 (나중에 사용):
   - **Project URL** (https://ntmqupozncjndxqwjbnx.supabase.co)
   - **anon public key** (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50bXF1cG96bmNqbmR4cXdqYm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY0MjUsImV4cCI6MjA4MDgzMjQyNX0.0CrY1vtNFjJfajPjfaa-ppTI3Ht4NTOKWuKCMpqYKuQ)

⚠️ **중요**: 이 키들은 나중에 `.env` 파일에 입력합니다.

---

## 3. messages 테이블 생성 (축하 메시지)

### Step 1: 테이블 생성
1. 좌측 메뉴 → **"Table Editor"** 선택
2. **"New Table"** 클릭
3. 테이블 정보 입력:
   - **Name**: `messages`
   - **Description**: `축하 메시지 저장 테이블` (선택사항)
4. **"Save"** 클릭

### Step 2: 컬럼 추가
테이블 생성 후 다음 컬럼들을 추가합니다:

| 컬럼명 | 타입 | 설정 | 설명 |
|--------|------|------|------|
| `id` | `int8` | Primary Key, Auto-increment | 자동 생성됨 |
| `created_at` | `timestamptz` | Default: `now()` | 자동 생성됨 |
| `name` | `text` | NOT NULL | 작성자 이름 |
| `relationship` | `text` | NOT NULL | 관계 (가족/친구/동료/기타) |
| `message` | `text` | NOT NULL | 메시지 내용 |

**컬럼 추가 방법:**
1. 테이블 편집 화면에서 **"Add Column"** 클릭
2. 컬럼명, 타입, 설정 입력
3. **"Save"** 클릭

---

## 4. rsvp 테이블 생성 (참석의사 전달하기)

### Step 1: 테이블 생성
1. 좌측 메뉴 → **"Table Editor"** 선택
2. **"New Table"** 클릭
3. 테이블 정보 입력:
   - **Name**: `rsvp`
   - **Description**: `참석의사 전달하기 테이블` (선택사항)
4. **"Save"** 클릭

### Step 2: 컬럼 추가
테이블 생성 후 다음 컬럼들을 추가합니다:

| 컬럼명 | 타입 | 설정 | 설명 |
|--------|------|------|------|
| `id` | `int8` | Primary Key, Auto-increment | 자동 생성됨 |
| `created_at` | `timestamptz` | Default: `now()` | 자동 생성됨 |
| `side` | `text` | NOT NULL | 구분 (신랑측/신부측) |
| `name` | `text` | NOT NULL | 성함 |
| `companion` | `text` | NULL | 동행인 (선택사항) |
| `meal` | `text` | NOT NULL | 식사 여부 (예정/안함/미정) |

**컬럼 추가 방법:**
1. 테이블 편집 화면에서 **"Add Column"** 클릭
2. 컬럼명, 타입, 설정 입력
3. **"Save"** 클릭

---

## 5. RLS 정책 설정

RLS (Row Level Security)를 설정하여 누구나 읽기/쓰기가 가능하도록 합니다.

### messages 테이블 RLS 설정

1. 좌측 메뉴 → **"Authentication"** → **"Policies"** 선택
2. `messages` 테이블 선택
3. **"New Policy"** 클릭

#### 읽기 정책 (SELECT)
- **Policy name**: `Enable read access for all users`
- **Allowed operation**: `SELECT` 선택
- **Target roles**: `public` 선택
- **USING expression**: `true` 입력 (따옴표 없이)
- **"Save"** 클릭

#### 쓰기 정책 (INSERT)
- **Policy name**: `Enable insert access for all users`
- **Allowed operation**: `INSERT` 선택
- **Target roles**: `public` 선택
- **WITH CHECK expression**: `true` 입력 (따옴표 없이)
- **"Save"** 클릭

⚠️ **주의**: 
- USING expression과 WITH CHECK expression에 `true`를 입력할 때 **따옴표 없이** 입력해야 합니다.
- `"true"` (X) → `true` (O)
- 또는 빈 값으로 두고 "Use expression builder"를 사용하지 않아도 됩니다.

### rsvp 테이블 RLS 설정

1. `rsvp` 테이블 선택
2. **"New Policy"** 클릭

#### 읽기 정책 (SELECT)
- **Policy name**: `Enable read access for all users`
- **Allowed operation**: `SELECT` 선택
- **Target roles**: `public` 선택
- **USING expression**: `true` 입력 (따옴표 없이)
- **"Save"** 클릭

#### 쓰기 정책 (INSERT)
- **Policy name**: `Enable insert access for all users`
- **Allowed operation**: `INSERT` 선택
- **Target roles**: `public` 선택
- **WITH CHECK expression**: `true` 입력 (따옴표 없이)
- **"Save"** 클릭

---

## 🔧 대안: SQL Editor 사용 (더 쉬운 방법)

UI에서 오류가 발생하면 SQL Editor를 사용하는 것이 더 쉽습니다:

1. 좌측 메뉴 → **"SQL Editor"** 선택
2. **"New query"** 클릭
3. 다음 SQL을 복사하여 붙여넣기:

```sql
-- messages 테이블 정책
CREATE POLICY "Enable read access for all users" 
ON public.messages 
FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Enable insert access for all users" 
ON public.messages 
FOR INSERT 
TO public 
WITH CHECK (true);

-- rsvp 테이블 정책
CREATE POLICY "Enable read access for all users" 
ON public.rsvp 
FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Enable insert access for all users" 
ON public.rsvp 
FOR INSERT 
TO public 
WITH CHECK (true);
```

4. **"Run"** 버튼 클릭 (또는 Ctrl+Enter)
5. 성공 메시지 확인

---

## 6. 환경 변수 설정

### Step 1: .env 파일 생성
프로젝트 루트 폴더에 `.env` 파일 생성 (없는 경우)

### Step 2: 환경 변수 입력
`.env` 파일에 다음 내용 추가:

```env
# Supabase
VITE_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **주의**: 
- `xxxxxxxxxxx` 부분을 실제 Project URL로 교체
- `eyJhbGci...` 부분을 실제 anon public key로 교체
- `.env` 파일은 `.gitignore`에 포함되어 있어 GitHub에 업로드되지 않습니다

### Step 3: 개발 서버 재시작
환경 변수 추가 후 개발 서버를 재시작해야 합니다:

```bash
# 개발 서버 중지 (Ctrl+C)
# 다시 시작
npm run dev
```

---

## 7. 확인 및 테스트

### 테이블 확인
1. **Table Editor**에서 두 테이블이 생성되었는지 확인:
   - ✅ `messages` 테이블
   - ✅ `rsvp` 테이블

### RLS 정책 확인
1. **Authentication** → **Policies**에서:
   - ✅ `messages` 테이블: SELECT, INSERT 정책 확인
   - ✅ `rsvp` 테이블: SELECT, INSERT 정책 확인

### 기능 테스트

#### 1. 축하 메시지 테스트
1. 청첩장 사이트 접속
2. "축하의 말" 섹션으로 이동
3. 메시지 작성 및 제출
4. Supabase 대시보드 → `messages` 테이블에서 데이터 확인

#### 2. 참석의사 전달하기 테스트
1. 청첩장 사이트 접속
2. 페이지 로드 시 팝업 표시 확인
3. 또는 "오시는 길" 섹션에서 "참석의사 전달하기" 버튼 클릭
4. 정보 입력 및 제출
5. Supabase 대시보드 → `rsvp` 테이블에서 데이터 확인

---

## 📊 데이터 확인 방법

### Supabase 대시보드에서
1. **Table Editor** → 테이블 선택
2. 저장된 데이터 확인
3. 필요시 수정/삭제 가능

### SQL 쿼리로 확인 (선택사항)
1. 좌측 메뉴 → **"SQL Editor"** 선택
2. 다음 쿼리 실행:

```sql
-- messages 테이블 전체 조회
SELECT * FROM messages ORDER BY created_at DESC;

-- rsvp 테이블 전체 조회
SELECT * FROM rsvp ORDER BY created_at DESC;

-- 신랑측/신부측별 통계
SELECT side, COUNT(*) as count FROM rsvp GROUP BY side;

-- 식사 여부별 통계
SELECT meal, COUNT(*) as count FROM rsvp GROUP BY meal;
```

---

## 🔧 문제 해결

### 환경 변수가 적용되지 않을 때
- ✅ `.env` 파일이 프로젝트 루트에 있는지 확인
- ✅ `VITE_` 접두사가 붙어있는지 확인
- ✅ 개발 서버 재시작

### 데이터 저장이 안 될 때
- ✅ RLS 정책이 올바르게 설정되었는지 확인
- ✅ 브라우저 콘솔에서 에러 확인
- ✅ Supabase 대시보드에서 테이블 구조 확인

### 테이블이 보이지 않을 때
- ✅ Table Editor에서 새로고침
- ✅ 프로젝트가 올바르게 선택되었는지 확인

---

## ✅ 체크리스트

설정 완료 후 다음을 확인하세요:

### Supabase 프로젝트
- [ ] 프로젝트 생성 완료
- [ ] Region: Northeast Asia (Seoul) 선택
- [ ] API 키 확인 완료

### 테이블 생성
- [ ] `messages` 테이블 생성
- [ ] `messages` 테이블 컬럼 설정 완료
- [ ] `rsvp` 테이블 생성
- [ ] `rsvp` 테이블 컬럼 설정 완료

### RLS 정책
- [ ] `messages` 테이블 SELECT 정책 설정
- [ ] `messages` 테이블 INSERT 정책 설정
- [ ] `rsvp` 테이블 SELECT 정책 설정
- [ ] `rsvp` 테이블 INSERT 정책 설정

### 환경 변수
- [ ] `.env` 파일 생성
- [ ] `VITE_SUPABASE_URL` 설정
- [ ] `VITE_SUPABASE_ANON_KEY` 설정
- [ ] 개발 서버 재시작

### 테스트
- [ ] 축하 메시지 작성 및 저장 확인
- [ ] 참석의사 전달하기 작성 및 저장 확인
- [ ] Supabase 대시보드에서 데이터 확인

---

## 🎉 완료!

모든 설정이 완료되면 청첩장의 다음 기능들이 정상 작동합니다:

- ✅ 축하 메시지 작성 및 표시
- ✅ 참석의사 전달하기
- ✅ 실시간 데이터 업데이트

**문제가 발생하면 위의 문제 해결 섹션을 참고하세요!**

---

**작성일**: 2025년 12월 2일  
**업데이트**: Supabase 완전 설정 가이드

