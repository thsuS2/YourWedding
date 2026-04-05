/**
 * 갤러리 이미지 용량 최적화 (긴 변 기준 리사이즈 + JPEG 압축)
 *
 * 사용: node scripts/optimize-gallery-images.js
 * 옵션: MAX_KB=500 MAX_WIDTH=1920 node scripts/optimize-gallery-images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const galleryDir = path.join(__dirname, '../public/images/gallery');
const MAX_BYTES = Math.max(1, parseInt(process.env.MAX_KB || '500', 10)) * 1024;
const INITIAL_MAX_WIDTH = parseInt(process.env.MAX_WIDTH || '1920', 10);
const MIN_QUALITY = 45;
const QUALITY_STEP = 5;
const MIN_WIDTH = 640;

const imageExtensions = new Set(['.jpg', '.jpeg', '.png', '.webp']);

async function encodeUnderBudget(bufIn) {
  const meta = await sharp(bufIn).metadata();
  const origW = meta.width || INITIAL_MAX_WIDTH;
  let maxWidth = Math.min(INITIAL_MAX_WIDTH, origW);

  const tryEncode = (widthLimit, q) =>
    sharp(bufIn)
      .rotate()
      .resize({
        width: widthLimit,
        height: widthLimit,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: q, mozjpeg: true })
      .toBuffer();

  let warn = false;

  while (maxWidth >= MIN_WIDTH) {
    let quality = 85;
    while (quality >= MIN_QUALITY) {
      const outBuffer = await tryEncode(maxWidth, quality);
      if (outBuffer.length <= MAX_BYTES) {
        return {
          buffer: outBuffer,
          before: bufIn.length,
          after: outBuffer.length,
          maxWidth,
          quality,
          warn,
        };
      }
      quality -= QUALITY_STEP;
    }
    maxWidth = Math.floor(maxWidth * 0.85);
  }

  const outBuffer = await tryEncode(MIN_WIDTH, MIN_QUALITY);
  warn = outBuffer.length > MAX_BYTES;
  return {
    buffer: outBuffer,
    before: bufIn.length,
    after: outBuffer.length,
    maxWidth: MIN_WIDTH,
    quality: MIN_QUALITY,
    warn,
  };
}

async function main() {
  if (!fs.existsSync(galleryDir)) {
    console.error('갤러리 폴더가 없습니다:', galleryDir);
    process.exit(1);
  }

  const files = fs
    .readdirSync(galleryDir)
    .filter((f) => imageExtensions.has(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log('처리할 이미지가 없습니다.');
    return;
  }

  console.log(
    `대상 ${files.length}개 · 목표 ${MAX_BYTES / 1024}KB 이하 · 긴 변 최대 ${INITIAL_MAX_WIDTH}px\n`,
  );

  let totalBefore = 0;
  let totalAfter = 0;

  for (const name of files) {
    const filePath = path.join(galleryDir, name);
    const bufIn = fs.readFileSync(filePath);
    const result = await encodeUnderBudget(bufIn);

    const ext = path.extname(name).toLowerCase();
    const base = path.parse(name).name;
    const outName = ext === '.png' || ext === '.webp' ? `${base}.jpeg` : name;
    const outPath = path.join(galleryDir, outName);

    fs.writeFileSync(outPath, result.buffer);

    if (outPath !== filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    totalBefore += result.before;
    totalAfter += result.after;

    const kb = (result.after / 1024).toFixed(1);
    const tag = result.warn ? ' (목표 KB 초과, 한계 압축)' : '';
    console.log(
      `  ${name}  ${(result.before / 1024 / 1024).toFixed(2)}MB → ${kb}KB  (≤${result.maxWidth}px, q${result.quality})${tag}`,
    );
  }

  console.log(
    `\n합계: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
