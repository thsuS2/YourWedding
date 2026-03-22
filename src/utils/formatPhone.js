/**
 * 전화번호를 tel: 및 sms: 링크 형식으로 변환하는 헬퍼 함수
 * 하이픈(-)을 제거하여 숫자만 남김
 * 
 * @param {string} phone - 전화번호 문자열 (예: "010-1234-5678")
 * @returns {string} 하이픈이 제거된 전화번호 (예: "01012345678")
 */
export const formatPhoneForLink = (phone) => {
  return phone.replace(/-/g, '');
};
