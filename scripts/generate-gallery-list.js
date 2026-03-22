import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryImagesDir = path.join(__dirname, '../public/images/gallery');
const outputFile = path.join(__dirname, '../src/constants/gallery.js');

// public/images/gallery 폴더에서 이미지 파일 목록 가져오기
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

// gallery 폴더가 없으면 생성
if (!fs.existsSync(galleryImagesDir)) {
  fs.mkdirSync(galleryImagesDir, { recursive: true });
}

const files = fs.readdirSync(galleryImagesDir)
  .filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext) && file !== '.DS_Store';
  })
  .sort((a, b) => {
    // 숫자 추출하여 정렬 (갤러리 이미지 1.png, 갤러리 이미지 2.png 등)
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  }); // 숫자 순서대로 정렬

// gallery.js 파일 생성
const content = `/**
 * 갤러리 이미지 목록
 * 
 * 이 파일은 scripts/generate-gallery-list.js에 의해 자동 생성됩니다.
 * public/images/gallery/ 폴더의 이미지 파일만 자동으로 포함합니다.
 * 
 * 빌드 전에 자동으로 업데이트됩니다.
 */

export const GALLERY_IMAGES = [
${files.map(file => `  '${file}'`).join(',\n')}
];

/**
 * 이미지 URL 생성 헬퍼 함수
 * @param {string} filename - 이미지 파일명
 * @returns {string} 이미지 URL
 */
export const getImageUrl = (filename) => {
  return \`/images/gallery/\${filename}\`;
};
`;

fs.writeFileSync(outputFile, content, 'utf-8');
console.log(`✅ 갤러리 이미지 목록 생성 완료: ${files.length}개 파일`);
console.log(`   출력 파일: ${outputFile}`);
