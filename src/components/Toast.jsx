import { useState, useEffect } from 'react';
import './Toast.css';
import { PiCheckCircleFill, PiXCircleFill, PiInfo, PiWarningFill } from 'react-icons/pi';

/**
 * Toast 메시지 타입
 * @typedef {'success' | 'error' | 'info' | 'warning'} ToastType
 */

/**
 * Toast 컴포넌트
 * @param {Object} props
 * @param {string} props.message - 표시할 메시지
 * @param {ToastType} props.type - 토스트 타입 (success, error, info, warning)
 * @param {number} props.duration - 표시 시간 (ms, 기본값: 3000)
 * @param {Function} props.onClose - 닫기 콜백
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300); // 애니메이션 시간
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <PiCheckCircleFill size={20} />,
    error: <PiXCircleFill size={20} />,
    info: <PiInfo size={20} />,
    warning: <PiWarningFill size={20} />,
  };

  return (
    <div className={`toast toast-${type} ${isVisible ? 'toast-visible' : 'toast-hidden'}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-message text-body">{message}</div>
      <button 
        className="toast-close" 
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose?.(), 300);
        }}
        aria-label="닫기"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;

