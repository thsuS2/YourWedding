import { useEffect } from 'react';
import { initKakao, shareKakao } from '../utils/kakaoShare';
import { shareUrl } from '../utils/shareUrl';
import { useToastContext } from '../contexts/ToastContext';
import './Footer.css';
import { SiKakao } from 'react-icons/si';
import { IoShareSocial } from 'react-icons/io5';
import FlowerImage from '../assets/images/rose-flower.png';
import Button from './common/Button';

const Footer = () => {
  const { showSuccess } = useToastContext();

  useEffect(() => {
    initKakao();
  }, []);

  const handleSnsShare = async () => {
    const result = await shareUrl();
    if (result === 'shared') {
      showSuccess('공유되었습니다.');
    } else if (result === 'copied') {
      showSuccess('링크가 복사되었습니다. 카카오톡·인스타 등에 붙여넣기 하세요.');
    } else if (result === 'failed') {
      showSuccess('링크 복사에 실패했습니다.');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-image fade-in">
          <img 
            src={FlowerImage} 
            alt="웨딩 사진" 
            className="footer-middle-image"
          />
        </div>
        
        <div className="footer-content fade-in">
          <div className="footer-message">
            <div className="footer-text text-body-gray">
              참석이 어려우신 분들도<br/>
              축하의 마음을 전해주시면<br/>
              큰 기쁨이 되겠습니다 
            </div>
          </div>
          
          <section className="footer-share-section">
            <div className="footer-share-icons">
              <Button
                variant="primary"
                size="small"
                onClick={shareKakao}
                icon={<SiKakao size={18} />}
                className="footer-share-btn"
              >
                카카오톡 공유하기
              </Button>
              <Button
                variant="secondary"
                size="small"
                onClick={handleSnsShare}
                icon={<IoShareSocial size={18} />}
                className="footer-share-btn"
              >
                링크 공유
              </Button>
            </div>
          </section>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

