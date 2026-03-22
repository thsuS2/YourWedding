import { useState, useEffect } from 'react';
import { WEDDING_DATE , COUPLE } from '../../../constants/wedding';
import './DDayCounter.css';

const DDayCounter = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // 결혼식 날짜 및 시간 설정
      const weddingDate = new Date(
        WEDDING_DATE.year,
        WEDDING_DATE.month - 1, // 월은 0부터 시작
        WEDDING_DATE.day,
        17, // 오후 5시 = 17시
        30, // 30분
        0   // 0초
      );

      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dday-counter">
      <div className="dday-label text-heading-small">
        <span className="dday-label-text">
          {COUPLE.groom.name}, {COUPLE.bride.name}의 결혼식이 {timeLeft.days}일 남았습니다.
        </span>
      </div>
      <div className="dday-time">
        <div className="dday-unit">
          <span className="text-heading-medium dday-number ">{timeLeft.days}</span>
          <span className="dday-label-small text-caption">일</span>
        </div>
        <div className="dday-separator text-body-gray">:</div>
        <div className="dday-unit">
          <span className="text-heading-medium dday-number ">{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="dday-label-small text-caption">시</span>
        </div>
        <div className="dday-separator text-body-gray">:</div>
        <div className="dday-unit">
          <span className="text-heading-medium dday-number ">{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="dday-label-small text-caption">분</span>
        </div>
        <div className="dday-separator text-body-gray">:</div>
        <div className="dday-unit">
          <span className="text-heading-medium dday-number ">{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="dday-label-small text-caption">초</span>
        </div>
      </div>
    </div>
  );
};

export default DDayCounter;

