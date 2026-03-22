import { createClient } from '@supabase/supabase-js';

/**
 * Supabase 클라이언트 설정
 * 
 * 사용 전 준비사항:
 * 1. Supabase 프로젝트 생성 (https://supabase.com/)
 * 2. .env 파일에 다음 환경 변수 설정:
 *    - VITE_SUPABASE_URL
 *    - VITE_SUPABASE_ANON_KEY
 * 3. messages 테이블 생성 (SETUP_GUIDE.md 참고)
 */

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

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

