import { useState, useEffect, useRef } from 'react';
import './LazyImage.css';

/**
 * Lazy Loading 이미지 컴포넌트
 * IntersectionObserver를 사용하여 뷰포트에 진입할 때 이미지 로드
 */
const LazyImage = ({ 
  src, 
  alt, 
  placeholder = '', 
  className = '',
  onClick = null 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px', // 뷰포트 50px 전에 로드 시작
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={imgRef} 
      className={`lazy-image-wrapper ${className}`}
      onClick={onClick}
    >
      {isInView ? (
        <img
          src={src}
          alt={alt}
          className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <div className="lazy-placeholder">
          {placeholder || <span>Loading...</span>}
        </div>
      )}
    </div>
  );
};

export default LazyImage;

