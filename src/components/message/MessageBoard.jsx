import { useState } from 'react';
import { useMessages } from '../../hooks/useSupabase';
import { useToastContext } from '../../contexts/ToastContext';
import './MessageBoard.css';
import { PiWarningFill, PiEnvelopeSimple } from 'react-icons/pi';
import SectionTitle from '../common/SectionTitle';
import BottomSheet from '../common/BottomSheet';
import { useBottomPanel } from '../../hooks/useBottomPanel';
import Button from '../common/Button';

const LIST_PREVIEW = 5;

function formatMessageDateTime(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

const MessageBoard = () => {
  const { messages, loading, error, addMessage } = useMessages();
  const { showError, showSuccess } = useToastContext();
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  /** UI에는 관계 필드 없음 — API 스키마용 고정값 */
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [listExpanded, setListExpanded] = useState(false);

  // 하단 패널 관리 (스크롤 잠금 + 외부 클릭 닫기)
  useBottomPanel(
    isFormModalOpen,
    () => setIsFormModalOpen(false),
    '.bottom-sheet-panel',
    '.btn'
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.message.trim()) {
      showError('이름과 메시지를 모두 입력해주세요.');
      return;
    }

    setSubmitting(true);

    try {
      await addMessage({
        name: formData.name.trim(),
        relationship: '친구',
        message: formData.message.trim(),
      });

      setFormData({ name: '', message: '' });
      setIsFormModalOpen(false);
      showSuccess('축하 메시지가 등록되었습니다!');
    } catch (err) {
      console.error('메시지 등록 실패:', err);
      showError('메시지 등록에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setSubmitting(false);
    }
  };

  const shouldCollapseList = messages.length > LIST_PREVIEW;
  const visibleMessages =
    shouldCollapseList && !listExpanded ? messages.slice(0, LIST_PREVIEW) : messages;
  const hiddenCount = shouldCollapseList ? messages.length - LIST_PREVIEW : 0;

  return (
    <section id="message" className="message-section">
      <div className="container">
        <SectionTitle en="MESSAGE" kr="축하 메시지" />

        <div className="message-write-button fade-in">
          <Button
            variant="primary"
            // size="large"
            onClick={() => setIsFormModalOpen(true)}
            icon={<PiEnvelopeSimple size={22} aria-hidden />}
          >
            메시지 작성하기
          </Button>
        </div>

        {error && (
          <div className="error-message text-error fade-in">
            <PiWarningFill size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
            메시지를 불러오는 중 오류가 발생했습니다.
          </div>
        )}

        <div className="message-list fade-in">
          {loading ? (
            <div className="loading-messages">
              <div className="text-body-gray">메시지를 불러오는 중...</div>
            </div>
          ) : messages.length === 0 ? (
            <div className="no-messages">
              <div className="text-caption">
                아직 작성된 메시지가 없습니다.<br/>
                첫 번째 축하 메시지를 남겨주세요!
              </div>
            </div>
          ) : (
            <>
              {visibleMessages.map((msg) => (
                <div key={msg.id} className="message-card">
                  <div className="message-header">
                    <div className="message-header-row">
                      <span className="message-name text-heading-small">{msg.name}</span>
                      {msg.created_at && (
                        <time
                          className="message-meta"
                          dateTime={msg.created_at}
                          title={msg.created_at}
                        >
                          {formatMessageDateTime(msg.created_at)}
                        </time>
                      )}
                    </div>
                  </div>
                  <div className="message-content text-body-gray">{msg.message}</div>
                </div>
              ))}
              {shouldCollapseList && (
                <div className="message-list-toggle-wrap">
                  <Button
                    type="button"
                    variant="secondary"
                    size="large"
                    className="message-list-toggle"
                    onClick={() => setListExpanded((v) => !v)}
                    aria-expanded={listExpanded}
                  >
                    {listExpanded ? '접기' : `더보기`}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

      </div>

      {/* 메시지 작성 하단 토글 패널 */}
      <BottomSheet
        open={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title="축하 메시지 작성"
      >
          <form onSubmit={handleSubmit} className="message-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="이름"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="축하 메시지를 남겨주세요"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="form-textarea"
                rows="4"
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              size="default"
              disabled={submitting}
              className="form-submit"
            >
              {submitting ? '등록 중...' : '메시지 남기기'}
            </Button>
          </form>
      </BottomSheet>
    </section>
  );
};

export default MessageBoard;

