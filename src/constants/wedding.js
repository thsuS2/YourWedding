/**
 * 결혼식 정보 상수 (YourWedding — 윤성훈 · 최지윤)
 */

// 결혼식 기본 정보
export const WEDDING_DATE = {
  year: 2026,
  month: 6,
  day: 7,
  time: '오후 3시 30분',
  weekday: '일요일',
};

// 날짜 포맷팅 함수
export const getFormattedDate = () => {
  return `${WEDDING_DATE.year}년 ${WEDDING_DATE.month}월 ${WEDDING_DATE.day}일`;
};

export const getFormattedDateTime = () => {
  return `${getFormattedDate()} ${WEDDING_DATE.time}`;
};

export const getFormattedDateWithWeekday = () => {
  return `${getFormattedDate()} ${WEDDING_DATE.weekday} ${WEDDING_DATE.time}`;
};

/** 인트로 영문 날짜 (예: Jun 7, 2026) */
export const getFormattedDateEnglishShort = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[WEDDING_DATE.month - 1]} ${WEDDING_DATE.day}, ${WEDDING_DATE.year}`;
};

// 커플 정보
export const COUPLE = {
  bride: {
    name: '지윤',
    fullName: '최지윤',
    phone: '010-4733-2669',
    parents: {
      father: '최병산',
      mother: '이귀인',
      fatherPhone: '010-5208-2669',
      motherPhone: '010-5054-2669',
    },
    position: '장녀',
  },
  groom: {
    name: '성훈',
    fullName: '윤성훈',
    phone: '010-3000-7127',
    parents: {
      father: '윤춘섭',
      mother: '정양실',
      fatherPhone: '010-6285-4451',
      motherPhone: '010-4344-4451',
    },
    position: '장남',
  },
};

// 예식장 정보 — 서울시립대학교 전농동 캠퍼스 (자작마루 야외)
export const VENUE = {
  name: '서울시립대학교',
  floor: '',
  hall: '자작마루 야외예식장',
  address: '서울특별시 동대문구 서울시립대로 163',
  addressDetail: '',
  /** 네이버 지도 검색어 (비우면 name + hall 로 검색) */
  naverSearchQuery: '서울시립대학교 자작마루',
  /** 네이버 지도 짧은 링크(선택). 있으면 검색어 대신 이 URL로 열림 */
  naverMapUrl: '',
  lat: 37.583917,
  lng: 127.059028,
  /** 카카오맵 마커 인포윈도우 썸네일 — public/images 아래 실제 파일 경로 */
  infoWindowImage: '/images/kakao.jpg',
  transportation: {
    subway: `1호선·경의중앙선 [청량리역]
버스 환승: '청량리역환승센터 3번 승강장'에서 버스 승차
버스 번호: 121, 420, 2230, 3220, 3216번
하차: '서울시립대입구' 정류장

지하철 5호선 [답십리역]
버스 환승: 420번 버스 또는 동대문05 마을버스 승차
하차: '서울시립대입구' 정류장`,
    bus: '',
    car: `내비게이션 검색: 서울시립대학교 100주년기념관 (또는 서울시립대로 163)

주차 안내:
정문 진입 후 좌측 [100주년 기념관] 지하 주차장을 이용해 주세요.
※ 주차권은 축의대에서 수령해 주시기 바랍니다.`,
    campus: `정문을 통과해 직진하시다가, 오른편 경농관을 따라 방향 안내 표지판을 따라와주세요.
붉은 벽돌 건물의 자작마루 야외공간에서 예식이 진행됩니다.(주차장에서 도보 5분)`,
  },
};

// 계좌번호 (side: 'groom' | 'bride' → AccountSection 탭별 표시)
export const ACCOUNTS = [
  {
    side: 'groom',
    name: '신랑 윤성훈',
    bank: '우리은행',
    number: '1002-048-892487',
    holder: COUPLE.groom.fullName,
  },
  {
    side: 'bride',
    name: '신부 최지윤',
    bank: '우리은행',
    number: '070-232716-02-101',
    holder: COUPLE.bride.fullName,
  },
];

/**
 * 배포 사이트 절대 URL — Vercel·로컬 `.env`에 `VITE_SITE_URL` 설정
 * 예: https://shjywedding.vercel.app
 */
export const getSiteUrl = () => {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
};

// 카카오톡 공유하기용
export const KAKAO_SHARE = {
  title: '윤성훈 ❤ 최지윤 결혼합니다.',
  description: '6월 7일(일) 오후 3시 30분, 서울시립대 자작마루 야외예식장',
  get imageUrl() {
    const base = getSiteUrl();
    if (!base) return '';
    return `${base}/images/kakao.jpg?v=3`;
  },
  get linkUrl() {
    return getSiteUrl() || (typeof window !== 'undefined' ? window.location.origin : '');
  },
};

// 메타 정보
export const META = {
  title: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다 💐`,
  description: `${COUPLE.bride.name} ❤️ ${COUPLE.groom.name} 결혼식에 초대합니다 - ${getFormattedDate()} 서울시립대 자작마루 야외예식장`,
  keywords: '모바일청첩장, 웹청첩장, 윤성훈, 최지윤, 결혼식',
  author: `${COUPLE.bride.name} & ${COUPLE.groom.name}`,
  ogTitle: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다`,
  ogDescription: `${getFormattedDate()} 일요일 오후 — 서울시립대 자작마루 야외예식장`,
  ogImage: '/images/share_img.jpg',
  ogUrl:
    typeof window !== 'undefined'
      ? window.location.href
      : `${(import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '') || ''}/`,
};
