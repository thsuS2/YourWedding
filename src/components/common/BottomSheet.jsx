import './BottomSheet.css';
import Button from './Button';

/**
 * 하단에서 올라오는 토글 패널 컴포넌트
 * 
 * @param {boolean} open - 패널이 열려있는지 여부
 * @param {Function} onClose - 패널을 닫는 함수
 * @param {string} title - 패널 헤더에 표시할 제목
 * @param {React.ReactNode} children - 패널 내용
 */
const BottomSheet = ({ open, onClose, title, children }) => {
  return (
    <div className={`bottom-sheet-panel ${open ? 'open' : ''}`}>
      <div className="bottom-sheet-header">
        <div className="bottom-sheet-title text-heading-medium">{title}</div>
        <Button
          variant="close"
          onClick={onClose}
          aria-label="닫기"
        >
          ✕
        </Button>
      </div>
      
      <div className="bottom-sheet-content">
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
