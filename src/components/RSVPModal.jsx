import { useState, useEffect } from 'react';
import { COUPLE, VENUE, WEDDING_DATE } from '../constants/wedding';
import { supabase, isSupabaseAvailable } from '../lib/supabase';
import { useToastContext } from '../contexts/ToastContext';
import './RSVPModal.css';
import { PiHeartFill, PiCheckCircleFill } from 'react-icons/pi';
import bouquetImage from '../assets/images/flowers.png';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';
import Button from './common/Button';

const RSVPModal = ({ isOpen, onClose }) => {
  const { showError, showSuccess } = useToastContext();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    side: '신랑측',
    name: '',
    companion: '',
    meal: '예정',
  });
  const [submitting, setSubmitting] = useState(false);

  // body 스크롤 잠금
  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (isOpen) {
      // 모달이 열릴 때마다 폼 상태 초기화
      setShowForm(false);
    } else {
      // 모달이 닫힐 때 폼 상태 초기화
      setShowForm(false);
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      showError('성함을 입력해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      // Supabase에 저장
      if (isSupabaseAvailable()) {
        const { error } = await supabase
          .from('rsvp')
          .insert([{
            side: formData.side,
            name: formData.name.trim(),
            companion: formData.companion.trim() || null,
            meal: formData.meal,
          }]);

        if (error) throw error;
      }

      showSuccess('참석의사가 전달되었습니다!');
      setFormData({ side: '신랑측', name: '', companion: '', meal: '예정' });
      setShowForm(false);
      onClose();
    } catch (err) {
      console.error('RSVP 저장 실패:', err);
      showError('참석의사 전달에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rsvp-modal-overlay" onClick={onClose}>
      <div className="rsvp-modal-content" onClick={(e) => e.stopPropagation()}>
        <Button
          variant="close"
          onClick={onClose}
          aria-label="닫기"
        >
          ✕
        </Button>
        
        {/* 부케 장식 - 항상 표시 */}
        <div className="rsvp-header-bouquet">
          <img 
            src={bouquetImage} 
            alt="부케 장식" 
            className="rsvp-bouquet-decoration"
          />
        </div>

        {/* Header 부분 - 폼이 표시되지 않을 때만 보임 */}
        {!showForm && (
          <>
            <div className="rsvp-modal-header">
              <h2 className="text-heading-large">
                참석여부 체크하기
              </h2>
              <div className="rsvp-modal-intro text-body-gray">
                귀한 시간 내어 참석해 주시는 분들께<br/>
                정성스럽게 준비하겠습니다.
              </div>
            </div>

            <div className="rsvp-modal-info">
              <div className="rsvp-couple-info">
                <div className="rsvp-couple-names text-heading-small">
                  {COUPLE.groom.fullName} · {COUPLE.bride.fullName}
                </div>
              </div>
              <div className="rsvp-date-info">
                <div className="text-caption"><strong className="text-body-medium">일정:</strong> {WEDDING_DATE.year}년 {WEDDING_DATE.month}월 {WEDDING_DATE.day}일 ({WEDDING_DATE.weekday.substring(0,1)}) {WEDDING_DATE.time}</div>
                <div className="text-caption"><strong className="text-body-medium">위치:</strong> {VENUE.name} {VENUE.hall}</div>
              </div>
            </div>

            {/* 참석여부 체크하기 버튼 */}
            <div className="rsvp-check-button-wrapper">
              <Button
                variant="primary"
                size="large"
                onClick={() => setShowForm(true)}
                className="btn-full-width"
              >
                참석여부 체크하기
              </Button>
            </div>
          </>
        )}

        {/* 폼 - showForm이 true일 때만 표시 */}
        {showForm && (
          <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="rsvp-form-group">
            <div className="rsvp-radio-group">
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="side"
                  value="신랑측"
                  checked={formData.side === '신랑측'}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                />
                <span className="radio-custom">
                  {formData.side === '신랑측' && (
                    <PiHeartFill size={20} className="radio-heart-icon" />
                  )}
                </span>
                <span className="radio-text text-body-medium">신랑측</span>
              </label>
              <label className="rsvp-radio-label">
                <input
                  type="radio"
                  name="side"
                  value="신부측"
                  checked={formData.side === '신부측'}
                  onChange={(e) => setFormData({ ...formData, side: e.target.value })}
                />
                <span className="radio-custom">
                  {formData.side === '신부측' && (
                    <PiHeartFill size={20} className="radio-heart-icon" />
                  )}
                </span>
                <span className="radio-text text-body-medium">신부측</span>
              </label>
            </div>
          </div>

          <div className="rsvp-form-group">
            <label htmlFor="name" className="text-body-medium">성함 *</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="성함을 입력해주세요"
              required
            />
          </div>

          <div className="rsvp-form-group">
            <label htmlFor="companion" className="text-body-medium">동행인</label>
            <div className="companion-input-wrapper">
              <input
                id="companion"
                type="number"
                min="0"
                value={formData.companion}
                onChange={(e) => setFormData({ ...formData, companion: e.target.value })}
                placeholder="0"
                className="companion-input"
              />
              <span className="companion-unit text-body-medium">명</span>
            </div>
          </div>

          <div className="rsvp-form-group">
            <label className="text-body-medium">식사 여부 *</label>
            <div className="rsvp-radio-group rsvp-meal-group">
              <label className="rsvp-radio-label rsvp-meal-label">
                <input
                  type="radio"
                  name="meal"
                  value="예정"
                  checked={formData.meal === '예정'}
                  onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
                />
                <span className="radio-custom radio-meal-custom">
                  {formData.meal === '예정' && (
                    <PiCheckCircleFill size={20} className="radio-meal-icon" />
                  )}
                </span>
                <span className="radio-text text-body-medium">예정</span>
              </label>
              <label className="rsvp-radio-label rsvp-meal-label">
                <input
                  type="radio"
                  name="meal"
                  value="미정"
                  checked={formData.meal === '미정'}
                  onChange={(e) => setFormData({ ...formData, meal: e.target.value })}
                />
                <span className="radio-custom radio-meal-custom">
                  {formData.meal === '미정' && (
                    <PiCheckCircleFill size={20} className="radio-meal-icon" />
                  )}
                </span>
                <span className="radio-text text-body-medium">미정</span>
              </label>
            </div>
          </div>

          <div className="rsvp-form-group">
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={submitting}
              className="btn-full-width"
            >
              {submitting ? '전달 중...' : '참석의사 전달하기'}
            </Button>
          </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default RSVPModal;

