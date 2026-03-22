import { useState, useEffect } from 'react';
import './IntroSection.css';
import PetalAnimation from '../PetalAnimation';
import { getFormattedDateEnglishShort } from '../../constants/wedding';

const IntroSection = () => {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="intro" className="intro-section">
      <PetalAnimation />

      <div className="intro-content">
        {/* 정적 인트로 이미지 (동영상 대체) */}
        <div className="intro-video-wrap">
          <img
            src="/images/gallery/ChatGPT_wedding.png"
            alt=""
            className="intro-hero-image"
            decoding="async"
          />
          <div className="intro-video-gradient" aria-hidden />
        </div>

        {/*
          === 이전: 배경 동영상 + 음소거 이퀄라이저 버튼 (복구 시 아래 주석 해제) ===
        <button type="button" className={`intro-sound-btn ${isMuted ? 'muted' : ''}`} ... />

        <div className="intro-video-wrap">
          {!videoLoaded && (
            <div className="intro-video-poster" aria-hidden>
              <img src="/images/wedding_intro.png" alt="" className="intro-video-poster-image" />
            </div>
          )}
          <video
            ref={videoRef}
            className={`intro-video ${videoLoaded ? 'loaded' : ''}`}
            src="/images/Wedding_video1.mp4"
            poster="/images/wedding_intro.png"
            autoPlay loop playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            aria-label="인트로 배경 영상"
          />
          <div className="intro-video-gradient" aria-hidden />
        </div>
        */}

        <div className={`intro-text ${showImage ? 'fade-in-with-image' : 'fade-in-text'}`}>
          <div className="intro-typo">
            <div className="intro-typo-line intro-typo-line-1">On a beautiful day,</div>
            <div className="intro-typo-line intro-typo-line-2">We&apos;re getting married</div>
            <div className="intro-typo-line intro-typo-line-3">{getFormattedDateEnglishShort()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
