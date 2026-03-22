import { useEffect } from 'react';

/**
 * 모달/패널이 열릴 때 body 스크롤을 잠그는 훅
 * 
 * @param {boolean} isLocked - 스크롤을 잠글지 여부
 */
export const useLockBodyScroll = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLocked]);
};
