import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트 설정
 * 
 * 사용 전 준비사항:
 * 1. Supabase 프로젝트 생성 (https://supabase.com/)
 * 2. .env 파일에 다음 환경 변수 설정:
 *    - VITE_SUPABASE_URL
 *    - VITE_SUPABASE_ANON_KEY
 * 3. `supabase/migrations` DDL 실행 — 기본 테이블명 `message`(축하 메시지), `rsvp`(참석의사)
 *    테이블명을 바꾸면 `VITE_SUPABASE_MESSAGES_TABLE`만 맞추면 됩니다.
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (import.meta.env.PROD && (!supabaseUrl?.trim() || !supabaseAnonKey?.trim())) {
  console.error(
    '[Supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY가 빌드에 없습니다. Vercel → Settings → Environment Variables에 추가한 뒤 재배포하세요.'
  );
}

// Supabase 클라이언트 생성
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Supabase 사용 가능 여부 확인
export const isSupabaseAvailable = () => {
  if (!supabase) {
    console.warn('⚠️ Supabase가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    return false;
  }
  return true;
};

