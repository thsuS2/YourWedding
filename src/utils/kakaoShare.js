/**
 * 카카오톡 공유 기능
 * 
 * 사용 방법:
 * 1. Kakao Developers에서 앱 생성 (https://developers.kakao.com/)
 * 2. JavaScript 키 발급
 * 3. 플랫폼 설정에서 Web 플랫폼 추가 (사이트 도메인 등록)
 * 4. .env 파일에 VITE_KAKAO_APP_KEY 설정
 */

import { KAKAO_SHARE } from '../constants/wedding';

// 환경 변수에서 Kakao 앱 키 가져오기
// .env 파일에 VITE_KAKAO_APP_KEY 설정 필요
const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY || 'YOUR_KAKAO_JAVASCRIPT_KEY';

/**
 * Kakao SDK 초기화
 */
export const initKakao = () => {
  if (typeof window === 'undefined') return;
  
  if (window.Kakao && !window.Kakao.isInitialized()) {
    try {
      window.Kakao.init(KAKAO_APP_KEY);
      console.log('✅ Kakao SDK 초기화 완료');
    } catch (error) {
      console.error('❌ Kakao SDK 초기화 실패:', error);
    }
  }
};

/**
 * 카카오톡 공유하기
 */
export const shareKakao = () => {
  if (typeof window === 'undefined') return;
  
  if (!window.Kakao || !window.Kakao.isInitialized()) {
    alert('카카오톡 공유 기능을 사용할 수 없습니다.\n잠시 후 다시 시도해주세요.');
    return;
  }

  try {
    const linkUrl = KAKAO_SHARE.linkUrl || window.location.origin;
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: KAKAO_SHARE.title,
        description: KAKAO_SHARE.description,
        imageUrl: KAKAO_SHARE.imageUrl,
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
      ],
    });
  } catch (error) {
    console.error('카카오톡 공유 실패:', error);
    alert('카카오톡 공유에 실패했습니다.\n다시 시도해주세요.');
  }
};

/**
 * 카카오톡 설치 확인
 */
export const checkKakaoInstalled = () => {
  if (typeof window === 'undefined') return false;
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  return userAgent.includes('kakaotalk');
};

