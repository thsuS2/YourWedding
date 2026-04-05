import { useState } from 'react';
import './AccountSection.css';
import { ACCOUNTS } from '../../constants/wedding';
import { copyAccount } from '../../utils/clipboard';
import { useToastContext } from '../../contexts/ToastContext';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';
import { PiCaretDown, PiCopy } from 'react-icons/pi';

const INTRO_LINES = [
  '참석이 어려우신 분들도',
  '축하의 마음을 전해주시면',
  '큰 기쁨이 되겠습니다',
];

const AccountSection = () => {
  const { showError } = useToastContext();
  const [copiedKey, setCopiedKey] = useState('');
  const [groomOpen, setGroomOpen] = useState(false);
  const [brideOpen, setBrideOpen] = useState(false);

  const groomAccounts = ACCOUNTS.filter((a) => a.side === 'groom');
  const brideAccounts = ACCOUNTS.filter((a) => a.side === 'bride');

  const handleCopyAccount = async (account) => {
    const success = await copyAccount(account);
    const key = `${account.side}-${account.number}`;
    if (success) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2000);
    } else {
      showError('계좌번호 복사에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const renderAccordion = (sideKey, title, open, setOpen, accounts) => (
    <div className="account-accordion-card">
      <Button
        variant="toggle"
        size="default"
        type="button"
        className="btn-full-width account-accordion-trigger"
        active={open}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`account-accordion-${sideKey}`}
        id={`account-accordion-btn-${sideKey}`}
      >
        <span className="account-accordion-title">{title}</span>
        <span className={`account-accordion-chevron ${open ? 'is-open' : ''}`} aria-hidden>
          <PiCaretDown size={22} />
        </span>
      </Button>
      <div className={`account-accordion-expand ${open ? 'is-open' : ''}`}>
        <div
          className="account-accordion-expand-inner"
          id={`account-accordion-${sideKey}`}
          role="region"
          aria-labelledby={`account-accordion-btn-${sideKey}`}
          aria-hidden={!open}
        >
          <div className="account-accordion-body">
            <ul className="account-row-list">
              {accounts.map((account) => {
                const rowKey = `${account.side}-${account.number}`;
                const done = copiedKey === rowKey;
                return (
                  <li key={rowKey} className="account-row">
                    <span className="account-row-name text-body">{account.name}</span>
                    <div className="account-row-right">
                      <span className="account-row-detail text-body-gray">
                        {account.bank} {account.number}
                      </span>
                      <Button
                        type="button"
                        variant="primary"
                        size="small"
                        className={`account-copy-btn btn-icon-variant ${done ? 'btn-copied' : ''}`}
                        onClick={() => handleCopyAccount(account)}
                        aria-label={`${account.name} 계좌번호 복사`}
                        icon={<PiCopy size={18} aria-hidden />}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="account" className="account-section">
      <div className="container">
        <SectionTitle en="ACCOUNT" kr="마음 전하실 곳" />

        <p className="account-intro text-body">
          {INTRO_LINES.map((line) => (
            <span key={line} className="account-intro-line">
              {line}
            </span>
          ))}
        </p>

        <div className="account-accordions">
          {renderAccordion('groom', '신랑측 계좌번호', groomOpen, setGroomOpen, groomAccounts)}
          {renderAccordion('bride', '신부측 계좌번호', brideOpen, setBrideOpen, brideAccounts)}
        </div>
      </div>
    </section>
  );
};

export default AccountSection;
