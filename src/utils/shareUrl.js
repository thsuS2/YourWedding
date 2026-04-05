/**
 * SNS 공유 (URL 공유)
 * - 지원 시: Web Share API로 공유 시트 (카카오톡, 인스타 등 선택)
 * - 미지원·거부 시: URL 클립보드 복사
 *
 * 참고: 일부 브라우저(데스크톱 Chrome, 인앱 웹뷰 등)는 navigator.share는 있으나
 * title+text+url 조합을 거부하고 바로 reject → 예전엔 share 없이 복사만 됐을 수 있고,
 * 최근엔 share가 생기면서 reject 후 복사로 떨어지는 경우가 있음. canShare + url 단독 재시도로 완화.
 */

import { copyToClipboard } from './clipboard';
import { KAKAO_SHARE } from '../constants/wedding';

function resolveAbsoluteUrl(raw) {
  if (typeof window === 'undefined') return raw || '';
  const u = (raw || '').trim();
  if (!u) return window.location.href;
  if (/^https?:\/\//i.test(u)) return u;
  const path = u.startsWith('/') ? u : `/${u}`;
  return `${window.location.origin}${path}`;
}

/**
 * 청첩장 URL 공유
 * @returns {Promise<'shared' | 'copied' | 'cancelled' | 'failed'>}
 */
export const shareUrl = async () => {
  const title = KAKAO_SHARE.title;
  const text = KAKAO_SHARE.description;
  const url = resolveAbsoluteUrl(KAKAO_SHARE.linkUrl);

  if (typeof navigator === 'undefined' || !navigator.share) {
    const ok = await copyToClipboard(url);
    return ok ? 'copied' : 'failed';
  }

  const full = { title, text, url };
  const urlOnly = { url };

  try {
    if (navigator.canShare) {
      if (navigator.canShare(full)) {
        await navigator.share(full);
        return 'shared';
      }
      if (navigator.canShare(urlOnly)) {
        await navigator.share(urlOnly);
        return 'shared';
      }
    } else {
      await navigator.share(full);
      return 'shared';
    }
  } catch (err) {
    if (err?.name === 'AbortError') return 'cancelled';
    try {
      await navigator.share(urlOnly);
      return 'shared';
    } catch (err2) {
      if (err2?.name === 'AbortError') return 'cancelled';
    }
  }

  const ok = await copyToClipboard(url);
  return ok ? 'copied' : 'failed';
};
