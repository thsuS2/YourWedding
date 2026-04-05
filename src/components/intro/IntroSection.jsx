import { useState, useEffect, useRef, useCallback } from 'react';
import './IntroSection.css';
// import PetalAnimation from '../PetalAnimation';
import PetalAnimation from '../SnowParticleAnimation';
// import PetalAnimation from '../ButterflyAnimation';
// import PetalAnimation from '../LeafAnimation';
import IntroAudioBar from './IntroAudioBar';
import { getFormattedDateEnglishShort } from '../../constants/wedding';

/* 배경: GIF는 색·해상도 한계가 큼. 더 선명하게 하려면 무음 루프 MP4/WebM + 이 파일의 MP3 조합을 권장 */
// const INTRO_GIF = '/images/Wedding_video.gif';
const INTRO_AUDIO = '/images/wedding.mp3';
const INTRO_POSTER = '/images/wedding_intro.jpg';

/**
 * 재생 정책: 최초 1회 화면 터치·클릭·스크롤(재생바 제외) 또는 재생바 조작 시 재생 시작.
 * 그 전까지는 재생하지 않음. 이후 음악은 재생바로만 컨트롤.
 */
const IntroSection = () => {
  const [showImage, setShowImage] = useState(false);
  const [gifLoaded, setGifLoaded] = useState(false);
  const sectionRef = useRef(null);
  const audioRef = useRef(null);
  /** 사용자 제스처(또는 컨트롤 조작) 후에만 play 이벤트에서 음소거 해제 */
  const audioUnlockRef = useRef(false);
  const detachPageGestureListenersRef = useRef(() => {});

  const unlockAudio = useCallback(() => {
    audioUnlockRef.current = true;
  }, []);

  const onBarEngaged = useCallback(() => {
    detachPageGestureListenersRef.current();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    /** 사용자 제스처와 동일 호출 스택에서 play 호출 + 버퍼 전에는 canplay 등록(동기) */
    const startPlaybackFromPageGesture = () => {
      audioUnlockRef.current = true;
      const audio = audioRef.current;
      if (!audio) return;
      audio.muted = false;
      if (audio.readyState < HTMLMediaElement.HAVE_CURRENT_DATA) {
        audio.addEventListener(
          'canplay',
          () => {
            audio.play().catch(() => {});
          },
          { once: true }
        );
      }
      audio.play().catch(() => {});
    };

    const opts = { capture: true };
    const scrollOpts = { passive: true };

    const detach = () => {
      document.removeEventListener('touchstart', onFirstPointerLike, opts);
      document.removeEventListener('click', onFirstPointerLike, opts);
      window.removeEventListener('scroll', onFirstScroll, scrollOpts);
      detachPageGestureListenersRef.current = () => {};
    };

    const onFirstPointerLike = (e) => {
      if (e.target?.closest?.('.intro-audio-bar')) return;
      startPlaybackFromPageGesture();
      detach();
    };

    const onFirstScroll = () => {
      startPlaybackFromPageGesture();
      detach();
    };

    detachPageGestureListenersRef.current = detach;

    /* capture: true — React 루트 위임·버블 순서와 무관하게, 제스처와 동일 타이밍에 play() */
    document.addEventListener('touchstart', onFirstPointerLike, { passive: true, capture: true });
    document.addEventListener('click', onFirstPointerLike, { capture: true });
    window.addEventListener('scroll', onFirstScroll, scrollOpts);

    return detach;
  }, []);

  useEffect(() => {
    return () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  return (
    <section id="intro" className="intro-section" ref={sectionRef}>
      <PetalAnimation />

      <audio
        ref={audioRef}
        src={INTRO_AUDIO}
        loop
        preload="auto"
        aria-hidden
      />

      <IntroAudioBar
        audioRef={audioRef}
        visible={showImage}
        audioUnlockRef={audioUnlockRef}
        onUserAudioGesture={unlockAudio}
        onBarEngaged={onBarEngaged}
      />

      <div className="intro-content">
        <div className="intro-video-wrap">
          {/* {!gifLoaded && ( */}
            <div className="intro-video-poster" aria-hidden>
              <img
                src={INTRO_POSTER}
                alt=""
                className="intro-video-poster-image"
              />
            </div>
          {/* )} */}
          {/* <img
            src={INTRO_GIF}
            alt=""
            className={`intro-video ${gifLoaded ? 'loaded' : ''}`}
            onLoad={() => setGifLoaded(true)}
            decoding="async"
          /> */}
          <div className="intro-video-gradient" aria-hidden />
        </div>

        {/* <div className={`intro-text ${showImage ? 'fade-in-with-image' : 'fade-in-text'}`}>
          <div className="intro-typo">
            <div className="intro-typo-line intro-typo-line-1">On a beautiful day,</div>
            <div className="intro-typo-line intro-typo-line-2">We&apos;re getting married</div>
            <div className="intro-typo-line intro-typo-line-3">{getFormattedDateEnglishShort()}</div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default IntroSection;
