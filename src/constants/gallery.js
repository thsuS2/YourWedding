/**
 * 갤러리 이미지 목록
 * 
 * 이 파일은 scripts/generate-gallery-list.js에 의해 자동 생성됩니다.
 * public/images/gallery/ 폴더의 이미지 파일만 자동으로 포함합니다.
 * 
 * 빌드 전에 자동으로 업데이트됩니다.
 */

export const GALLERY_IMAGES = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
  '21.jpg',
  '22.jpg',
  '23.jpg',
  '24.jpg',
  '25.jpg',
  '26.jpg',
  '27.jpg',
  '28.jpg',
  '29.jpg',
  '30.jpg',
  '31.jpg',
  '32.jpg',
  '33.jpg',
  '34.jpg',
  '35.jpg',
  '36.jpg',
  '37.jpg',
  '38.jpg',
  '39.jpg',
  '40.jpg'
];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return `/images/gallery/${filename}`;
};
