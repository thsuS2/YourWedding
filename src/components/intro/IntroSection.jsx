import { useState, useEffect, useRef } from 'react';
import './IntroSection.css';
import PetalAnimation from '../PetalAnimation';

const IntroSection = () => {
  const [showImage, setShowImage] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  // autoplay(소리 포함)는 브라우저 정책으로 차단될 수 있음
  // 1) 소리 ON으로 재생 시도 → 실패하면 muted로 전환 후 재생
  useEffect(() => {
    if (!showImage) return;
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const startPlayback = async () => {
      try {
        video.muted = isMuted;
        await video.play();
      } catch (err) {
        if (cancelled) return;
        // 소리 ON autoplay가 막히면 muted로 재시도
        if (!isMuted) {
          setIsMuted(true);
          try {
            video.muted = true;
            await video.play();
          } catch {
            // ignore
          }
        }
      }
    };

    startPlayback();

    return () => {
      cancelled = true;
    };
  }, [showImage]); // intentionally not depending on isMuted

  // 최초 터치/스크롤 시 동영상 소리 켜기 (버튼 클릭 제외)
  // 한 번만 실행되도록 ref로 관리
  useEffect(() => {
    if (hasTriggeredRef.current) return;

    const handleFirstInteraction = (e) => {
      if (hasTriggeredRef.current) return;
      // 음소거 버튼 클릭은 제외
      if (e.target?.closest('.intro-sound-btn')) return;
      
      hasTriggeredRef.current = true;

      const video = videoRef.current;
      if (video && video.muted) {
        video.muted = false;
        setIsMuted(false);
      }

      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    document.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });

    return () => {
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []); // 최초 한 번만 실행

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      const video = videoRef.current;
      if (video) {
        video.muted = next;
        // 재생 중이 아니고 소리를 켤 때만 play() 호출
        if (!next && video.paused) {
          video.play().catch(() => {});
        }
      }
      return next;
    });
  };

  return (
    <section id="intro" className="intro-section" ref={sectionRef}>
      <PetalAnimation />

      {/* 상단 고정 음소거 버튼 - 항상 표시 */}
      {showImage && (
        <button
          type="button"
          className={`intro-sound-btn ${isMuted ? 'muted' : ''}`}
          onClick={toggleMute}
          aria-label={isMuted ? '동영상 소리 켜기' : '동영상 음소거'}
        >
          <div className="sound-bars" aria-hidden>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      )}

      <div className="intro-content">

        {/* 배경 동영상 레이어 */}
        <div className="intro-video-wrap">
          {/* 동영상 로딩 전 배경 이미지 */}
          {!videoLoaded && (
            <div className="intro-video-poster" aria-hidden>
              <img 
                src="/images/wedding_intro.jpg" 
                alt="" 
                className="intro-video-poster-image"
              />
            </div>
          )}
          <video
            ref={videoRef}
            className={`intro-video ${videoLoaded ? 'loaded' : ''}`}
            src="/images/Wedding_video1.mp4"
            poster="/images/wedding_intro.jpg"
            autoPlay
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            aria-label="인트로 배경 영상"
          />
          <div className="intro-video-gradient" aria-hidden />
        </div>

        <div className={`intro-text ${showImage ? 'fade-in-with-image' : 'fade-in-text'}`}>
          <div className="intro-typo">
            <div className="intro-typo-line intro-typo-line-1">On a beautiful day,</div>
            <div className="intro-typo-line intro-typo-line-2">We're getting married</div>
            <div className="intro-typo-line intro-typo-line-3">May 30, 2026</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
