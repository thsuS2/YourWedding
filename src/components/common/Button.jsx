import './Button.css';

/**
 * 공통 버튼 컴포넌트
 * 
 * @param {string} variant - 버튼 스타일 ('primary' | 'secondary' | 'close' | 'toggle' | 'icon')
 * @param {string} size - 버튼 크기 ('large' | 'default' | 'small')
 * @param {React.ReactNode} children - 버튼 내용
 * @param {React.ReactNode} icon - 버튼 아이콘 (선택)
 * @param {Function} onClick - 클릭 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {boolean} active - 활성 상태 (토글 버튼용)
 * @param {string} className - 추가 CSS 클래스
 * @param {object} ...props - 기타 button props
 */
const Button = ({
  variant = 'primary',
  size = 'default',
  children,
  icon,
  onClick,
  disabled = false,
  active = false,
  className = '',
  ...props
}) => {
  const buttonClasses = `btn btn-${variant} btn-${size} ${active ? 'active' : ''} ${className}`.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
