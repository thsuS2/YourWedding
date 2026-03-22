import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Vercel 배포시 루트 경로 사용
  
  build: {
    // 청크 크기 경고 제한 증가
    chunkSizeWarningLimit: 1000,
    
    // 소스맵 생성 (디버깅용, 프로덕션에서는 false 권장)
    sourcemap: false,
    
    // 번들 최적화
    rollupOptions: {
      output: {
        manualChunks: {
          // React 관련 라이브러리를 별도 청크로 분리
          'react-vendor': ['react', 'react-dom'],
          // Supabase를 별도 청크로 분리
          'supabase-vendor': ['@supabase/supabase-js'],
        },
      },
    },
  },
  
  // 개발 서버 설정
  server: {
    port: 5173,
    open: true, // 서버 시작시 자동으로 브라우저 열기
  },
})
