import { useState } from 'react';
import './MainSection.css';
import * as WEDDING from '../../constants/wedding';
const { COUPLE } = WEDDING;
import { PiPhoneFill, PiChatCircleFill } from 'react-icons/pi';
import SectionTitle from '../common/SectionTitle';
import { formatPhoneForLink } from '../../utils/formatPhone';
import BottomSheet from '../common/BottomSheet';
import { useBottomPanel } from '../../hooks/useBottomPanel';
import Button from '../common/Button';

const MainSection = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // 하단 패널 관리 (스크롤 잠금 + 외부 클릭 닫기)
  useBottomPanel(
    isContactModalOpen,
    () => setIsContactModalOpen(false),
    '.bottom-sheet-panel',
    '.btn'
  );

  const weddingQuote = `사랑은 소유가 아니라
동행임을 아는 두 사람은

잡은 손을 놓지 않되
함부로 잡아끌지 않을 것이며

서로의 두 눈을 고요히 바라보아
말하지 않아도 같은 쪽으로 걸어가리라

- 박미라, '아름다운 날에 부치다' 중에서`;

  return (
    <section id="main" className="main-section">
      <div className="container">

        <div className="fade-in">
          <div className="main-date-time  text-body-large">
            {COUPLE.groom.fullName} · {COUPLE.bride.fullName}
          </div>
        </div>
        
        {/* 날짜/시간 */}
        <div className="main-date-time text-body-gray fade-in ">
          {WEDDING.getFormattedDate()} {WEDDING.WEDDING_DATE.weekday}<br/>
          {WEDDING.WEDDING_DATE.time}
        </div>


        {/* 결혼 관련 문구 인용 */}
        <div className="main-quote fade-in">
          <div className="quote-text text-quote">{weddingQuote}</div>
        </div>

        {/* 초대 글 */}
        <div className="main-invitation ">

          <SectionTitle en="INVITATION" kr="초대합니다" />

          <div className="invitation-text text-body-gray fade-in">
            저희 두 사람 이제 믿음과 사랑으로<br/>
            한 길을 가려 합니다.<br/>
            <br/>
            그 시작의 한 걸음,<br/>함께 축복해 주시면 감사하겠습니다.
          </div>
        </div>

        {/* 커플 이름 (부모님 포함) */}
        <div className="main-couple-names fade-in">
            <div className="couple-parents text-body-gray">
              {COUPLE.groom.parents.father} · {COUPLE.groom.parents.mother} 의 {COUPLE.groom.position}
            </div>
            <div className="couple-name text-body-gray">{COUPLE.groom.name}</div>
            <div className="couple-parents text-body-gray">
              {COUPLE.bride.parents.father} · {COUPLE.bride.parents.mother} 의 {COUPLE.bride.position}
            </div>
            <div className="couple-name text-body-gray">{COUPLE.bride.name}</div>
        </div>

        {/* 연락하기 버튼 */}
        <div className="main-contact-button fade-in">
          <Button
            variant="primary"
            size="large"
            onClick={() => setIsContactModalOpen(true)}
          >
            연락하기
          </Button>
        </div>
      </div>

      {/* 연락하기 하단 토글 패널 */}
      <BottomSheet
        open={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        title="연락하기"
      >
          {/* 신랑/신부 */}
          <div className="contact-couple-section">
            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-heading-small">신랑 {COUPLE.groom.fullName}</div>
              </div>
              <div className="contact-buttons">
                <a 
                  href={`tel:${formatPhoneForLink(COUPLE.groom.phone)}`}
                  className="contact-btn"
                  aria-label="전화"
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.groom.phone)}`}
                  className="contact-btn"
                  aria-label="문자"
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-heading-small">신부 {COUPLE.bride.fullName}</div>
              </div>
              <div className="contact-buttons">
                <a 
                  href={`tel:${formatPhoneForLink(COUPLE.bride.phone)}`}
                  className="contact-btn"
                  aria-label="전화"
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.bride.phone)}`}
                  className="contact-btn"
                  aria-label="문자"
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* 신랑측 혼주 */}
          <div className="contact-parents-section">
            <div className="contact-section-title text-heading-small">신랑측 혼주</div>
            
            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-body-medium">{COUPLE.groom.parents.mother}</div>
              </div>
              <div className="contact-buttons">
                <a 
                  href={`tel:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label="전화"
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label="문자"
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-body-medium">{COUPLE.groom.parents.father}</div>
              </div>
              <div className="contact-buttons">
                <a 
                  href={`tel:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label="전화"
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label="문자"
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* 신부측 혼주 */}
          <div className="contact-parents-section">
            <div className="contact-section-title text-heading-small">신부측 혼주</div>
            
            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-body-medium">{COUPLE.bride.parents.mother}</div>
              </div>
              <div className="contact-buttons">
                <a 
                  href={`tel:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label="전화"
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label="문자"
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-body-medium">{COUPLE.bride.parents.father}</div>
              </div>
              <div className="contact-buttons">
                <a 
                  href={`tel:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label="전화"
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label="문자"
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>
          </div>
      </BottomSheet>
    </section>
  );
};

export default MainSection;

