import { useEffect, useRef } from 'react';
import { useLockBodyScroll } from './useLockBodyScroll';

/**
 * 하단 패널(토글 패널)을 관리하는 훅
 * - body 스크롤 잠금
 * - 외부 클릭 시 닫기
 * 
 * @param {boolean} isOpen - 패널이 열려있는지 여부
 * @param {Function} onClose - 패널을 닫는 함수
 * @param {string} panelSelector - 패널 요소의 셀렉터 (예: '.contact-toggle-panel')
 * @param {string} triggerSelector - 패널을 여는 버튼의 셀렉터 (예: '.btn-contact')
 */
export const useBottomPanel = (isOpen, onClose, panelSelector, triggerSelector) => {
  const timeoutRef = useRef(null);

  // body 스크롤 잠금
  useLockBodyScroll(isOpen);

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      const panel = document.querySelector(panelSelector);
      // 패널이 열려있고, 클릭이 패널 외부이고, 트리거 버튼이 아닐 때만 닫기
      if (
        panel &&
        panel.classList.contains('open') &&
        !panel.contains(e.target) &&
        !e.target.closest(triggerSelector)
      ) {
        onClose();
      }
    };

    // 약간의 지연을 두어 패널이 열린 후 이벤트 리스너 추가
    timeoutRef.current = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true);
    }, 100);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen, onClose, panelSelector, triggerSelector]);
};
