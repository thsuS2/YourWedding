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

// 커플 정보 — 혼주·연락처는 이후 수정 가능
export const COUPLE = {
  bride: {
    name: '지윤',
    fullName: '최지윤',
    phone: '010-0000-0000',
    parents: {
      father: '최○○',
      mother: '○○○',
      fatherPhone: '010-0000-0000',
      motherPhone: '010-0000-0000',
    },
    position: '딸',
  },
  groom: {
    name: '성훈',
    fullName: '윤성훈',
    phone: '010-0000-0000',
    parents: {
      father: '윤○○',
      mother: '○○○',
      fatherPhone: '010-0000-0000',
      motherPhone: '010-0000-0000',
    },
    position: '아들',
  },
};

// 예식장 정보 — 서울시립대학교 전농동 캠퍼스 (자작마루)
export const VENUE = {
  name: '서울시립대학교',
  floor: '',
  hall: '자작마루',
  address: '서울특별시 동대문구 시립대로 163',
  addressDetail: '전농동 캠퍼스 내 자작마루',
  lat: 37.583917,
  lng: 127.059028,
  infoWindowImage: '/images/1.jpg',
  transportation: {
    subway:
      '1호선 회기역·청량리역 등 인근 역 이용 후\n캠퍼스까지 도보 또는 셔틀·버스(학교 안내 참고)',
    bus: '시립대입구·회기동 등 인근 정류장\n | 세부 노선은 네이버·카카오 지도에서 확인해 주세요',
    car: '네비게이션 : "서울시립대학교" 또는 "서울시립대로 163" 입력',
    parking: '당일 학교 주차 안내에 따라 이용해 주세요',
  },
};

// 계좌번호 — 추후 수정
export const ACCOUNTS = [
  {
    name: '신랑 윤성훈',
    bank: '은행명',
    number: '000-000-000000',
    holder: COUPLE.groom.fullName,
  },
  {
    name: '신부 최지윤',
    bank: '은행명',
    number: '000-000-000000',
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
  description: '6월 7일(일) 오후 3시 30분, 서울시립대 자작마루',
  get imageUrl() {
    const base = getSiteUrl();
    if (!base) return '';
    return `${base}/images/kakao.jpg?v=2`;
  },
  get linkUrl() {
    return getSiteUrl() || (typeof window !== 'undefined' ? window.location.origin : '');
  },
};

// 메타 정보
export const META = {
  title: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다 💐`,
  description: `${COUPLE.bride.name} ❤️ ${COUPLE.groom.name} 결혼식에 초대합니다 - ${getFormattedDate()} 서울시립대 자작마루`,
  keywords: '모바일청첩장, 웹청첩장, 윤성훈, 최지윤, 결혼식',
  author: `${COUPLE.bride.name} & ${COUPLE.groom.name}`,
  ogTitle: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다`,
  ogDescription: `${getFormattedDate()} 일요일 오후 — 서울시립대 자작마루`,
  ogImage: '/images/main.png',
  ogUrl:
    typeof window !== 'undefined'
      ? window.location.href
      : `${(import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '') || ''}/`,
};
