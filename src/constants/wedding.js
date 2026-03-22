/**
 * 결혼식 정보 상수
 */

// 결혼식 기본 정보
export const WEDDING_DATE = {
  year: 2026,
  month: 5,
  day: 30,
  time: '오후 5시 30분',
  weekday: '토요일',
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

// 커플 정보
export const COUPLE = {
  bride: {
    name: '지수',
    fullName: '박지수',
    phone: '010-6471-5887', 
    parents: {
      father: '박태규',
      mother: '김성옥',
      fatherPhone: '010-3726-5886', 
      motherPhone: '010-8803-6324', 
    },
    position: '딸',
  },
  groom: {
    name: '유신',
    fullName: '김유신',
    phone: '010-5056-0336', 
    parents: {
      father: '김남수',
      mother: '유영래',
      fatherPhone: '010-3780-1816', 
      motherPhone: '010-9302-0332', 
    },
    position: '아들',
  },
};

// 예식장 정보
export const VENUE = {
  name: '보타닉파크웨딩',
  floor: '로비층',
  hall: '카라홀',
  address: '서울시 강서구 마곡중앙5로 6',
  addressDetail: '보타닉 푸르지오시티 로비층',
  /* 마곡중앙5로 6 (마곡나루역보타닉푸르지오시티) 기준 */
  lat: 37.567099,
  lng: 126.827017,
  /** 지도 인포윈도우에 넣을 이미지 URL (없으면 null). 예: '/images/venue-thumb.jpg' */
  infoWindowImage: '/images/1.jpg',
  transportation: {
    subway: '9호선 · 공항철도 마곡나루역 1, 2번 출구 \n진입통로 연결',
    bus: '마곡나루역 정류장 하차\n | 간선버스 N64 \n | 지선버스 6642, 6645, 6648 \n | 마을버스 강서05-1, 강서07',
    car: '네비게이션 : "보타닉파크웨딩 주차장" 또는 "마곡동 760" 입력',
    parking: '건물 내 주차장 이용',
  },
};

// 계좌번호 정보
export const ACCOUNTS = [
  {
    name: '신랑 김유신',
    bank: '기업은행',
    number: '050-108445-02-012',
    holder: COUPLE.groom.fullName,
  },
  {
    name: '신부 박지수',
    bank: '기업은행',
    number: '692-001160-01-013',
    holder: COUPLE.bride.fullName,
  },
];

/**
 * 배포 사이트 절대 URL (카카오 공유·피드 이미지에 필요)
 * YourWedding / MyWedding 각각 `.env` · Vercel에 `VITE_SITE_URL` 로 설정 (예: https://xxx.vercel.app)
 */
export const getSiteUrl = () => {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
};

// 카카오톡 공유하기용 (버튼 클릭 시 피드 카드 이미지)
export const KAKAO_SHARE = {
  title: '박지수 ❤ 김유신 결혼합니다.',
  description: '5월 30일(토) 오후 5시 30분, 보타닉파크웨딩 카라홀',
  /** 이미지 URL에 버전 파라미터 추가하여 카카오톡 캐시 무효화 — getter로 현재 배포 URL 반영 */
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
  description: `${COUPLE.bride.name} ❤️ ${COUPLE.groom.name} 결혼식에 초대합니다 - ${getFormattedDate()} 봄날의 정원 속, 우리의 약속`,
  keywords: '모바일청첩장, 웹청첩장, 지수유신, 결혼식',
  author: `${COUPLE.bride.name} & ${COUPLE.groom.name}`,
  ogTitle: `${COUPLE.bride.name} 🫶 ${COUPLE.groom.name} 결혼합니다`,
  ogDescription: `${getFormattedDate()} - 봄날의 정원 속, 우리의 약속`,
  ogImage: '/images/main.png',
  ogUrl:
    typeof window !== 'undefined'
      ? window.location.href
      : `${(import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '') || ''}/`,
};

