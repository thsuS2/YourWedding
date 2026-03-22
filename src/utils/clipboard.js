/**
 * 클립보드 복사 유틸리티
 * 
 * 최신 브라우저의 Clipboard API를 사용하고,
 * 구형 브라우저를 위한 fallback을 제공합니다.
 */

/**
 * 텍스트를 클립보드에 복사
 * @param {string} text - 복사할 텍스트
 * @returns {Promise<boolean>} - 성공 여부
 */
export const copyToClipboard = async (text) => {
  // Clipboard API 사용 가능한 경우
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error('Clipboard API 복사 실패:', err);
      return fallbackCopy(text);
    }
  }
  
  // Fallback for older browsers
  return fallbackCopy(text);
};

/**
 * 구형 브라우저를 위한 복사 fallback
 * @param {string} text - 복사할 텍스트
 * @returns {boolean} - 성공 여부
 */
const fallbackCopy = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.left = '-999999px';
  textArea.style.top = '-999999px';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error('Fallback 복사 실패:', err);
    document.body.removeChild(textArea);
    return false;
  }
};

/**
 * 계좌번호 복사 (포맷팅 포함)
 * @param {Object} account - 계좌 정보 객체
 * @param {string} account.bank - 은행명
 * @param {string} account.number - 계좌번호
 * @param {string} account.holder - 예금주
 * @returns {Promise<boolean>} - 성공 여부
 */
export const copyAccount = async (account) => {
  const text = `${account.bank} ${account.number} ${account.holder}`;
  return await copyToClipboard(text);
};

