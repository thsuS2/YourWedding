import { useState } from 'react';
import './AccountSection.css';
import { ACCOUNTS, COUPLE } from '../../constants/wedding';
import { copyAccount } from '../../utils/clipboard';
import { useToastContext } from '../../contexts/ToastContext';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const AccountSection = () => {
  const { showError } = useToastContext();
  const [copiedAccount, setCopiedAccount] = useState('');
  const [activeSide, setActiveSide] = useState('신랑측'); // '신랑측' 또는 '신부측'

  const handleCopyAccount = async (account) => {
    const success = await copyAccount(account);
    if (success) {
      setCopiedAccount(account.name);
      setTimeout(() => setCopiedAccount(''), 2000);
    } else {
      showError('계좌번호 복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  // 신랑측/신부측 계좌 필터링
  const filteredAccounts = ACCOUNTS.filter(account => {
    if (activeSide === '신랑측') {
      return account.name.includes('신랑');
    } else {
      return account.name.includes('신부');
    }
  });

  return (
    <section id="account" className="account-section">
      <div className="container">
        <SectionTitle en="ACCOUNT" kr="마음 전하실 곳" />
        
        {/* 통합 카드 */}
        <div className="account-card fade-in">
          {/* 토글 버튼 */}
          <div
            className="account-toggle"
            role="tablist"
            aria-label="계좌 구분"
          >
            <Button
              variant="toggle"
              onClick={() => setActiveSide('신랑측')}
              active={activeSide === '신랑측'}
              type="button"
              role="tab"
              aria-selected={activeSide === '신랑측'}
            >
              신랑측
            </Button>
            <Button
              variant="toggle"
              onClick={() => setActiveSide('신부측')}
              active={activeSide === '신부측'}
              type="button"
              role="tab"
              aria-selected={activeSide === '신부측'}
            >
              신부측
            </Button>
          </div>
          
          {/* 계좌 리스트 */}
          <div className="account-list">
            {filteredAccounts.map((account) => (
              <div key={account.name} className="account-item">
                <div className="account-info">
                  <div className="account-label text-heading-small">{account.name}</div>
                  <div className="account-detail text-body-gray">
                    {account.bank} {account.number}
                  </div>
                  <div className="account-holder text-caption">{account.holder}</div>
                </div>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => handleCopyAccount(account)}
                  className={copiedAccount === account.name ? 'btn-copied' : ''}
                >
                  {copiedAccount === account.name ? '복사됨' : '복사하기'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccountSection;

