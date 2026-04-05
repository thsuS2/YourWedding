import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || '').trim().replace(/\/$/, '')

  return {
  plugins: [
    react(),
    /* index.html의 __SITE_URL__ → 배포 도메인 (OG·카카오 스크래퍼는 og:image 절대 URL 필요) */
    {
      name: 'html-replace-site-url',
      transformIndexHtml(html) {
        if (!siteUrl) {
          console.warn(
            '[vite] VITE_SITE_URL이 비어 있습니다. OG 미리보기용 절대 URL이 들어가지 않습니다. .env 또는 Vercel 환경 변수를 설정하세요.'
          )
        }
        return html.replace(/__SITE_URL__/g, siteUrl)
      },
    },
  ],
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
  }
})
