/**
 * SNS 공유 (URL 공유)
 * - 지원 시: Web Share API로 공유 시트 (카카오톡, 인스타 등 선택)
 * - 미지원 시: URL 클립보드 복사
 */

import { copyToClipboard } from './clipboard';
import { KAKAO_SHARE } from '../constants/wedding';

/**
 * 청첩장 URL 공유
 * @returns {Promise<'shared' | 'copied'>} - 공유 시트로 공유됐으면 'shared', 복사만 됐으면 'copied'
 */
export const shareUrl = async () => {
  const url = KAKAO_SHARE.linkUrl;
  const title = KAKAO_SHARE.title;
  const text = KAKAO_SHARE.description;

  if (navigator.share && typeof navigator.share === 'function') {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      return 'shared';
    } catch (err) {
      if (err.name === 'AbortError') return 'cancelled';
      // 공유 취소가 아니면 복사로 fallback
    }
  }

  const ok = await copyToClipboard(url);
  return ok ? 'copied' : 'failed';
};
