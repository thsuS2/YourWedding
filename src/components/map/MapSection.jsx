import { useState, useEffect, useRef } from 'react';
import './MapSection.css';
import { VENUE, getFormattedDate, WEDDING_DATE } from '../../constants/wedding';
import { useToastContext } from '../../contexts/ToastContext';
import { SiKakao, SiNaver } from 'react-icons/si';
import { IoBusSharp, IoCarSharp, IoSubwaySharp } from 'react-icons/io5';
import mapImage from '../../assets/images/map.png';
import SectionTitle from '../common/SectionTitle';
import Button from '../common/Button';

const MapSection = ({ onOpenRSVP }) => {
  const { showError } = useToastContext();
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);

  const openMap = (type) => {
    if (type === 'kakao') {
      window.open(`https://map.kakao.com/link/search/${encodeURIComponent(VENUE.name)}`, '_blank');
    } else if (type === 'naver') {
      window.open('https://naver.me/502MVbqj', '_blank');
    }
  };

  useEffect(() => {
    const initMap = () => {
      if (!mapContainer.current) return;

      // 카카오맵 API 키: 전용 키 우선, 없으면 공유용 앱 키 사용 (같은 앱에서 JavaScript 키 공용)
      const KAKAO_MAP_API_KEY =
        import.meta.env.VITE_KAKAO_MAP_API_KEY ||
        import.meta.env.VITE_KAKAO_APP_KEY;

      if (!KAKAO_MAP_API_KEY || KAKAO_MAP_API_KEY === 'YOUR_KAKAO_MAP_API_KEY' || KAKAO_MAP_API_KEY === 'YOUR_KAKAO_JAVASCRIPT_KEY') {
        console.warn('⚠️ 카카오맵 API 키가 설정되지 않았습니다. .env에 VITE_KAKAO_MAP_API_KEY 또는 VITE_KAKAO_APP_KEY를 넣어주세요.');
        setMapLoaded(false);
        return;
      }

      // 카카오맵 스크립트가 로드되었는지 확인
      if (typeof window.kakao === 'undefined' || !window.kakao.maps) {
        // 스크립트 동적 로드
        const existingScript = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
        if (existingScript) {
          const checkKakao = setInterval(() => {
            if (window.kakao?.maps?.load) {
              clearInterval(checkKakao);
              window.kakao.maps.load(() => createMap());
            }
          }, 100);
          return;
        }

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&autoload=false`;
        script.async = true;
        script.onload = () => {
          if (window.kakao?.maps?.load) {
            window.kakao.maps.load(() => createMap());
          } else {
            console.error('카카오맵 SDK 로드 실패');
            setMapLoaded(false);
            showError('지도를 불러오는데 실패했습니다.');
          }
        };
        script.onerror = (e) => {
          console.error(
            '카카오맵 스크립트 로드 실패. 확인사항: 1) VITE_KAKAO_MAP_API_KEY(JavaScript 키) 사용 2) Kakao Developers 콘솔에서 현재 도메인(localhost 또는 배포 URL) 허용',
            e.target?.src ?? script.src,
            e
          );
          setMapLoaded(false);
          showError('지도를 불러오는데 실패했습니다. API 키와 도메인 설정을 확인해주세요.');
        };
        document.head.appendChild(script);
        return;
      }

      // 이미 로드된 경우
      if (window.kakao.maps.load) {
        window.kakao.maps.load(() => createMap());
      } else {
        createMap();
      }
    };

    const createMap = () => {
      if (!mapContainer.current || mapInstance.current) return;
      if (!window.kakao?.maps?.LatLng) return;

      // 컨테이너가 DOM에 마운트되었는지 확인
      if (!mapContainer.current.offsetParent && mapContainer.current.offsetWidth === 0) {
        setTimeout(createMap, 100);
        return;
      }

      try {
        const coords = new window.kakao.maps.LatLng(VENUE.lat, VENUE.lng);
        const options = {
          center: coords,
          level: 3,
        };

        mapInstance.current = new window.kakao.maps.Map(mapContainer.current, options);

        setTimeout(() => {
          if (mapInstance.current) mapInstance.current.relayout();
        }, 100);

        const marker = new window.kakao.maps.Marker({
          position: coords,
          map: mapInstance.current,
        });

        const imgHtml = VENUE.infoWindowImage
          ? `<img src="${VENUE.infoWindowImage}" alt="" style="display:block;width:75px;height:100px;object-fit:cover;border-radius:6px;flex-shrink:0;" />`
          : '';
        const textHtml = `<div style="font-size:12px;text-align:center;line-height:1.5;flex:1;">${VENUE.name}<br/>${VENUE.hall}<br/><span style="color:#666;font-size:11px;">${getFormattedDate()}<br/>${WEDDING_DATE.time}</span></div>`;
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:10px;display:flex;align-items:center;justify-content:center;gap:10px;min-width:200px;">${imgHtml}${textHtml}</div>`,
        });
        infowindow.open(mapInstance.current, marker);

        setMapLoaded(true);
      } catch (error) {
        console.error('카카오맵 생성 실패:', error);
        setMapLoaded(false);
        showError('지도를 불러오는데 실패했습니다.');
      }
    };

    // 지도 초기화
    initMap();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (mapInstance.current) {
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="map-section">
      <div className="container fade-in">
        <SectionTitle en="LOCATION" kr="오시는 길" />
        
        {/* 위치 정보 */}
        <div className="venue-location-info">
          <h3 className="venue-name text-heading-small">{VENUE.name} {VENUE.hall}</h3>
          <div className="venue-address text-body-gray">{VENUE.address} {VENUE.floor}</div>
        </div>
        
        {/* 카카오맵: ref가 걸린 div는 항상 DOM에 있어야 createMap에서 사용 가능 */}
        <div className="map-container" onClick={() => !mapLoaded && openMap('naver')}>
          <div ref={mapContainer} className="kakao-map" aria-hidden={!mapLoaded} />
          {!mapLoaded && (
            <div className="map-placeholder map-placeholder--overlay">
              <img
                src={mapImage}
                alt="지도"
                className="map-fallback-image"
              />
              <div className="map-placeholder-overlay">
                <div className="map-placeholder-text text-body text-white">지도를 보려면 클릭하세요</div>
              </div>
            </div>
          )}
        </div>
        
        {/* 지도 버튼 */}
        <div className="map-buttons fade-in">
          <Button
            variant="primary"
            size="default"
            onClick={() => openMap('kakao')}
            icon={<SiKakao size={20} />}
          >
            카카오맵
          </Button>
          <Button
            variant="secondary"
            size="default"
            onClick={() => openMap('naver')}
            icon={<SiNaver size={15} />}
          >
            네이버지도
          </Button>
        </div>

        {/* 교통수단 정보 */}
        <div className="transportation-section fade-in">
          <div className="transport-item">
            <div className="transport-label text-heading-small">지하철</div>
            <div className="transport-detail text-body-gray">
              <IoSubwaySharp 
                size={16} 
                style={{ 
                  verticalAlign: 'middle', 
                  marginRight: '0.5rem',
                  color: 'var(--text-lightest)'
                }} 
              />
              {VENUE.transportation.subway}
            </div>
          </div>
          <div className="transport-divider"></div>
          <div className="transport-item">
            <div className="transport-label text-heading-small">버스</div>
            <div className="transport-detail text-body-gray">
              {VENUE.transportation.bus.split('|').map((part, index) => {
                const trimmedPart = part.trim();
                if (!trimmedPart) return null;
                
                return (
                  <span key={index} style={{ display: 'block', marginBottom: index === 0 ? '0.5rem' : '0.25rem' }}>
                    {index > 0 && (
                      <>
                        <IoBusSharp 
                          size={16} 
                          style={{ 
                            verticalAlign: 'middle', 
                            marginRight: '0.5rem',
                            color: 'var(--text-lightest)'
                          }} 
                        />
                      </>
                    )}
                    {trimmedPart}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="transport-divider"></div>
          <div className="transport-item">
            <div className="transport-label text-heading-small">자가용</div>
            <div className="transport-detail text-body-gray">
              <IoCarSharp 
                size={16} 
                style={{ 
                  verticalAlign: 'middle', 
                  marginRight: '0.5rem',
                  color: 'var(--text-lightest)'
                }} 
              />
              {VENUE.transportation.car}
            </div>
          </div>
        </div>

        
        {/* 참석의사 전달하기 버튼 */}
        <div className="rsvp-button-section">
          <Button
            variant="primary"
            size="large"
            onClick={onOpenRSVP}
          >
            참석의사 전달하기
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;

