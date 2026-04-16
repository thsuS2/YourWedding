import { useState } from 'react';
import './MainSection.css';
import * as WEDDING from '../../constants/wedding';
const { COUPLE, VENUE } = WEDDING;
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

  const weddingQuote = `사랑이란, 서로의 다름을 이해하고,
그 모습까지 더 사랑하게 되는 것.

서로의 다름을 이해하고 조금씩 닮아가며
저희 두 사람,
서로의 손을 잡고 같은 길을 걸어가려 합니다.`;

  return (
    <section id="main" className="main-section">
      <div className="container">

        <div className="fade-in">
          <div className="main-date-time  text-heading-small">
            {COUPLE.groom.fullName} · {COUPLE.bride.fullName}
          </div>
        </div>
        
        {/* 날짜/시간 */}
        <div className="main-date-time text-body-medium text-body-gray fade-in ">
          {VENUE.name} 내 {VENUE.hall}<br/>
          {WEDDING.getFormattedDate()} {WEDDING.WEDDING_DATE.weekday} · {WEDDING.WEDDING_DATE.time}
        </div>


        {/* 초대 글 */}
        <div className="main-invitation ">

          <SectionTitle en="INVITATION" kr="초대합니다" />



        {/* 결혼 관련 문구 인용 */}
        <div className="main-quote fade-in">
          <div className="quote-text text-quote">{weddingQuote}</div>
        </div>

          <div className="invitation-text text-body-gray fade-in">
            햇살처럼 따스한 그날,<br/>
            저희의 첫걸음을 함께해주세요.
          </div>
        </div>

        {/* 커플 이름 (부모님 포함) */}
        <div className="main-couple-names fade-in">
          <div className="couple-line text-body-gray">
            {COUPLE.groom.parents.father} · {COUPLE.groom.parents.mother}의 {COUPLE.groom.position}{' '}
            {COUPLE.groom.name}
          </div>
          <div className="couple-line text-body-gray">
            {COUPLE.bride.parents.father} · {COUPLE.bride.parents.mother}의 {COUPLE.bride.position}{' '}
            {COUPLE.bride.name}
          </div>
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
                  aria-label={`신랑 ${COUPLE.groom.fullName}에게 전화`}
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.groom.phone)}`}
                  className="contact-btn"
                  aria-label={`신랑 ${COUPLE.groom.fullName}에게 문자`}
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
                  aria-label={`신부 ${COUPLE.bride.fullName}에게 전화`}
                >
                  <PiPhoneFill size={20} />
                </a>
                <a 
                  href={`sms:${formatPhoneForLink(COUPLE.bride.phone)}`}
                  className="contact-btn"
                  aria-label={`신부 ${COUPLE.bride.fullName}에게 문자`}
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
                <div className="contact-name text-body-medium">아버님 {COUPLE.groom.parents.father}</div>
              </div>
              <div className="contact-buttons">
                <a
                  href={`tel:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label={`신랑측 아버님 ${COUPLE.groom.parents.father}께 전화`}
                >
                  <PiPhoneFill size={20} />
                </a>
                <a
                  href={`sms:${formatPhoneForLink(COUPLE.groom.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label={`신랑측 아버님 ${COUPLE.groom.parents.father}께 문자`}
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-body-medium">어머님 {COUPLE.groom.parents.mother}</div>
              </div>
              <div className="contact-buttons">
                <a
                  href={`tel:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label={`신랑측 어머님 ${COUPLE.groom.parents.mother}께 전화`}
                >
                  <PiPhoneFill size={20} />
                </a>
                <a
                  href={`sms:${formatPhoneForLink(COUPLE.groom.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label={`신랑측 어머님 ${COUPLE.groom.parents.mother}께 문자`}
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
                <div className="contact-name text-body-medium">아버님 {COUPLE.bride.parents.father}</div>
              </div>
              <div className="contact-buttons">
                <a
                  href={`tel:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label={`신부측 아버님 ${COUPLE.bride.parents.father}께 전화`}
                >
                  <PiPhoneFill size={20} />
                </a>
                <a
                  href={`sms:${formatPhoneForLink(COUPLE.bride.parents.fatherPhone)}`}
                  className="contact-btn"
                  aria-label={`신부측 아버님 ${COUPLE.bride.parents.father}께 문자`}
                >
                  <PiChatCircleFill size={20} />
                </a>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-info">
                <div className="contact-name text-body-medium">어머님 {COUPLE.bride.parents.mother}</div>
              </div>
              <div className="contact-buttons">
                <a
                  href={`tel:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label={`신부측 어머님 ${COUPLE.bride.parents.mother}께 전화`}
                >
                  <PiPhoneFill size={20} />
                </a>
                <a
                  href={`sms:${formatPhoneForLink(COUPLE.bride.parents.motherPhone)}`}
                  className="contact-btn"
                  aria-label={`신부측 어머님 ${COUPLE.bride.parents.mother}께 문자`}
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

