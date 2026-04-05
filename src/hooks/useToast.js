import { useCallback, useMemo } from 'react';

/**
 * 토스트 UI 비활성화 — show* 호출은 유지해도 화면에 표시되지 않음
 */
export const useToast = () => {
  const noop = useCallback(() => {}, []);

  return useMemo(
    () => ({
      toasts: [],
      showToast: noop,
      showSuccess: noop,
      showError: noop,
      showInfo: noop,
      showWarning: noop,
      removeToast: noop,
    }),
    [noop]
  );
};
