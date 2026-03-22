/**
 * 갤러리 이미지 목록
 *
 * scripts/generate-gallery-list.js 로 자동 생성 가능.
 * 현재 public/images/gallery/ 내 파일 기준.
 */

export const GALLERY_IMAGES = ['ChatGPT_wedding.png'];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return `/images/gallery/${filename}`;
};
