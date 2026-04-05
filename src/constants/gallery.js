/**
 * 갤러리 이미지 목록
 * 
 * 이 파일은 scripts/generate-gallery-list.js에 의해 자동 생성됩니다.
 * public/images/gallery/ 폴더의 이미지 파일만 자동으로 포함합니다.
 * 
 * 빌드 전에 자동으로 업데이트됩니다.
 */

export const GALLERY_IMAGES = [
  'ChatGPT_wedding.png',
  'KakaoTalk_Photo_2026-04-05-13-22-30.jpeg'
];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return `/images/gallery/${filename}`;
};
