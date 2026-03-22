# RSVP (참석의사 전달하기) 설정 가이드

## 📋 Supabase 테이블 생성

### 1. rsvp 테이블 생성

1. Supabase 대시보드 접속
2. 좌측 메뉴 → "Table Editor" 선택
3. "New Table" 클릭
4. 테이블 이름: `rsvp`
5. 다음 컬럼 추가:

| 컬럼명 | 타입 | 설정 |
|--------|------|------|
| id | int8 | Primary Key, Auto-increment |
| created_at | timestamptz | Default: now() |
| side | text | NOT NULL |
| name | text | NOT NULL |
| companion | text | NULL (선택사항) |
| meal | text | NOT NULL |

6. "Save" 클릭

### 2. RLS (Row Level Security) 정책 설정

1. "Authentication" → "Policies" 메뉴
2. `rsvp` 테이블 선택
3. "New Policy" 클릭

**읽기 정책 (누구나 읽기 가능):**
```sql
CREATE POLICY "Enable read access for all users" 
ON rsvp FOR SELECT 
USING (true);
```

**쓰기 정책 (누구나 쓰기 가능):**
```sql
CREATE POLICY "Enable insert access for all users" 
ON rsvp FOR INSERT 
WITH CHECK (true);
```

---

## ✅ 완료 확인

테이블 생성 후 다음을 확인하세요:

1. ✅ `rsvp` 테이블이 생성되었는지 확인
2. ✅ RLS 정책이 설정되었는지 확인
3. ✅ 테스트로 데이터 입력해보기

---

## 📊 데이터 확인 방법

### Supabase 대시보드에서
1. "Table Editor" → `rsvp` 테이블 선택
2. 저장된 참석의사 데이터 확인

### SQL 쿼리로 확인
```sql
-- 전체 데이터 조회
SELECT * FROM rsvp ORDER BY created_at DESC;

-- 신랑측/신부측별 통계
SELECT side, COUNT(*) as count FROM rsvp GROUP BY side;

-- 식사 여부별 통계
SELECT meal, COUNT(*) as count FROM rsvp GROUP BY meal;
```

---

## 🔧 문제 해결

### RSVP 저장이 안 될 때
1. Supabase 환경 변수 확인 (`.env` 파일)
2. RLS 정책 확인
3. 브라우저 콘솔에서 에러 확인

### "오늘 하루 보지 않기"가 작동하지 않을 때
- 브라우저의 로컬스토리지 확인
- `rsvp_dont_show` 키 값 확인

---

**설정 완료 후 RSVP 기능이 정상 작동합니다!** 💐

