import { useState, useEffect, useRef } from 'react';
import {
  PiPlayFill,
  PiPauseFill,
  PiSpeakerHighFill,
  PiSpeakerSlashFill,
} from 'react-icons/pi';
import './IntroAudioBar.css';

/**
 * 인트로 배경음용 커스텀 바 (네이티브 controls 대신 알약형 UI)
 * audioUnlockRef: 사용자 제스처 이후 true — 그때부터 play 시 음소거 자동 해제
 * onBarEngaged: 최초 재생바 조작 시 — 페이지 1회 재생용 글로벌 제스처 리스너 해제
 */
const IntroAudioBar = ({ audioRef, visible, audioUnlockRef, onUserAudioGesture, onBarEngaged }) => {
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const sync = () => {
      setCurrent(audio.currentTime);
      setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
      setPlaying(!audio.paused);
      setMuted(audio.muted);
    };

    const onTime = () => setCurrent(audio.currentTime);
    const onDur = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onPlay = () => {
      setPlaying(true);
      if (audioUnlockRef?.current) {
        audio.muted = false;
      }
      setMuted(audio.muted);
    };
    const onPause = () => setPlaying(false);
    const onVol = () => setMuted(audio.muted);

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', sync);
    audio.addEventListener('durationchange', onDur);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('volumechange', onVol);
    sync();

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', sync);
      audio.removeEventListener('durationchange', onDur);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('volumechange', onVol);
    };
  }, [audioRef, visible, audioUnlockRef]);

  const togglePlay = () => {
    onBarEngaged?.();
    onUserAudioGesture?.();
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
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
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => {
    onBarEngaged?.();
    onUserAudioGesture?.();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  const onTrackPointer = (clientX) => {
    const audio = audioRef.current;
    const el = trackRef.current;
    if (!audio || !el || !duration) return;
    const rect = el.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  };

  const onTrackClick = (e) => {
    onBarEngaged?.();
    onUserAudioGesture?.();
    onTrackPointer(e.clientX);
  };

  if (!visible) return null;

  const pct = duration > 0 ? Math.min(100, (current / duration) * 100) : 0;

  return (
    <div className="intro-audio-bar" role="group" aria-label="배경음악">
      <button
        type="button"
        className="intro-audio-bar__play"
        onClick={togglePlay}
        aria-label={playing ? '일시정지' : '재생'}
      >
        {playing ? <PiPauseFill size={13} /> : <PiPlayFill size={13} />}
      </button>

      <div
        ref={trackRef}
        className="intro-audio-bar__track"
        onClick={onTrackClick}
        role="slider"
        tabIndex={0}
        aria-valuemin={0}
        aria-valuemax={Math.round(duration) || 0}
        aria-valuenow={Math.round(current)}
        aria-label="재생 위치"
        onKeyDown={(e) => {
          onBarEngaged?.();
          onUserAudioGesture?.();
          const audio = audioRef.current;
          if (!audio || !duration) return;
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            audio.currentTime = Math.max(0, audio.currentTime - 5);
          }
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            audio.currentTime = Math.min(duration, audio.currentTime + 5);
          }
        }}
      >
        <div className="intro-audio-bar__track-fill" style={{ width: `${pct}%` }} />
      </div>

      <button
        type="button"
        className="intro-audio-bar__icon"
        onClick={toggleMute}
        aria-label={muted ? '음소거 해제' : '음소거'}
      >
        {muted ? <PiSpeakerSlashFill size={14} /> : <PiSpeakerHighFill size={14} />}
      </button>
    </div>
  );
};

export default IntroAudioBar;
