import { useState, useRef } from 'react';
import './GallerySection.css';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import LazyImage from './components/LazyImage';
import { GALLERY_IMAGES, getImageUrl } from '../../constants/gallery';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [prevSlideIndex, setPrevSlideIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [prevModalImage, setPrevModalImage] = useState(null);
  const [isModalTransitioning, setIsModalTransitioning] = useState(false);
  const [modalDirection, setModalDirection] = useState(1);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = GALLERY_IMAGES.map((filename, index) => ({
    id: index + 1,
    title: `사진 ${index + 1}`,
    url: getImageUrl(filename),
    filename: filename,
  }));

  const mainImage = images[currentSlideIndex] || images[0];
  const prevImage = images[prevSlideIndex] || images[0];

  const gridImages = images;

  const openModal = (index) => {
    setSelectedImage(index);
    setPrevModalImage(null);
    setIsModalTransitioning(false);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (selectedImage === null || isModalTransitioning) return;

    let newIndex = selectedImage + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setPrevModalImage(selectedImage);
    setModalDirection(direction);
    setIsModalTransitioning(true);
    setSelectedImage(newIndex);

    setTimeout(() => {
      setIsModalTransitioning(false);
      setPrevModalImage(null);
    }, 600);
  };

  const navigateSlide = (direction) => {
    if (isTransitioning) return;

    let newIndex = currentSlideIndex + direction;
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;

    setPrevSlideIndex(currentSlideIndex);
    setIsTransitioning(true);
    setCurrentSlideIndex(newIndex);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 2000);
  };

  const handleGridImageClick = (index) => {
    openModal(index);
  };

  const handleSlideTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleSlideTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSlideSwipe();
  };

  const handleSlideSwipe = () => {
    if (isTransitioning) return;

    const diff = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        navigateSlide(1);
      } else {
        navigateSlide(-1);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (selectedImage === null) return;

    if (e.key === 'ArrowLeft') navigateImage(-1);
    if (e.key === 'ArrowRight') navigateImage(1);
    if (e.key === 'Escape') closeModal();
  };

  return (
    <section id="gallery" className="gallery-section" onKeyDown={handleKeyDown}>
      <div className="container">
        <SectionTitle en="GALLERY" kr="웨딩 갤러리" />

        <div className="gallery-slide fade-in">
          <div
            className="gallery-main-image"
            onClick={() => openModal(currentSlideIndex)}
            onTouchStart={handleSlideTouchStart}
            onTouchEnd={handleSlideTouchEnd}
          >
            {isTransitioning && prevSlideIndex !== currentSlideIndex && (
              <img
                src={prevImage.url}
                alt={prevImage.title}
                className="gallery-slide-image slide-out"
              />
            )}
            <LazyImage
              src={mainImage.url}
              alt={mainImage.title}
              className={`gallery-slide-image ${isTransitioning ? 'slide-in' : ''}`}
              placeholder={
                <div className="gallery-image-placeholder">
                  <span>로딩 중...</span>
                </div>
              }
            />
          </div>
          <div className="slide-counter text-caption">
            {currentSlideIndex + 1} / {images.length}
          </div>
        </div>

        <div className="gallery-grid fade-in">
          {gridImages.map((image, index) => (
            <div
              key={image.id}
              className={`gallery-item ${index === currentSlideIndex ? 'active' : ''}`}
              onClick={() => handleGridImageClick(index)}
            >
              <LazyImage
                src={image.url}
                alt={image.title}
                className="gallery-image"
                placeholder={
                  <div className="gallery-image-placeholder">
                    <span>💍</span>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <div className="gallery-modal" onClick={closeModal}>
          <Button
            variant="close"
            onClick={closeModal}
            aria-label="닫기"
            className="gallery-modal-close"
          >
            ✕
          </Button>

          <Button
            variant="primary"
            size="small"
            type="button"
            className="gallery-modal-nav modal-prev btn-icon-variant"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(-1);
            }}
            disabled={isModalTransitioning}
            aria-label="이전 사진"
            icon={<PiCaretLeft aria-hidden />}
          />

          <Button
            variant="primary"
            size="small"
            type="button"
            className="gallery-modal-nav modal-next btn-icon-variant"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage(1);
            }}
            disabled={isModalTransitioning}
            aria-label="다음 사진"
            icon={<PiCaretRight aria-hidden />}
          />

          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-image-wrapper">
              {isModalTransitioning && prevModalImage !== null && prevModalImage !== selectedImage && (
                <img
                  src={images[prevModalImage].url}
                  alt={images[prevModalImage].title}
                  className={`modal-image modal-image-out ${modalDirection > 0 ? 'slide-out-left' : 'slide-out-right'}`}
                />
              )}
              <img
                src={images[selectedImage].url}
                alt={images[selectedImage].title}
                className={`modal-image ${isModalTransitioning ? (modalDirection > 0 ? 'modal-image-in-right' : 'modal-image-in-left') : ''}`}
              />
            </div>
            <div className="modal-counter text-body text-white">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
