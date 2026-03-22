import './SectionTitle.css';

/**
 * 섹션 제목 공통 컴포넌트
 * @param {Object} props
 * @param {string} props.en - 영어 제목
 * @param {string} props.kr - 한글 제목
 */
const SectionTitle = ({ en, kr }) => {
  return (
    <div className="section-title-container fade-in">
      <div className="section-title-en">{en}</div>
      <div className="section-title-kr">{kr}</div>
    </div>
  );
};

export default SectionTitle;
