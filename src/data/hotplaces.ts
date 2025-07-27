import { HotplaceDestination } from '@/types';

export const HOTPLACE_DESTINATIONS: HotplaceDestination[] = [
  // 감성 카페 - 서울
  {
    id: 'yeonnam-seosik',
    name: '연남서식',
    category: 'cafe',
    location: {
      region: '서울',
      address: '서울특별시 마포구 연남동 227-15',
      coordinates: { lat: 37.5624, lng: 126.9258 }
    },
    description: '공장을 개조한 독특한 인더스트리얼 카페로, 콘크리트와 식물이 조화를 이루는 공간',
    specialFeature: '2층 통창으로 들어오는 자연광과 식물들이 만드는 도시 정글 분위기',
    atmosphere: '차가운 콘크리트와 따뜻한 식물의 대비, 도시 속 오아시스',
    signatureScent: {
      name: 'Urban Jungle Dreams',
      notes: ['시멘트', '유칼립투스', '아이비', '머스크'],
      experience: '차가운 콘크리트 냄새 속에서 느껴지는 싱그러운 식물의 향기'
    },
    visitInfo: {
      openingHours: '매일 10:00 - 22:00',
      bestTime: '평일 오후 2-5시, 2층 창가 자리에서 자연광과 함께',
      tips: '주말은 웨이팅이 있을 수 있으니 평일 방문 추천'
    },
    transportation: '홍대입구역 3번 출구에서 도보 10분',
    images: ['/images/places/yeonnam-seosik-1.jpg', '/images/places/yeonnam-seosik-2.jpg'],
    tags: ['인더스트리얼', '식물카페', '연남동', '루프탑'],
    featured: true
  },
  
  {
    id: 'aekyung-anthracite',
    name: '애경 앤트러사이트',
    category: 'cafe',
    location: {
      region: '서울',
      address: '서울특별시 용산구 한남동 683-142',
      coordinates: { lat: 37.5342, lng: 127.0012 }
    },
    description: '제주 앤트러사이트의 서울점으로, 미니멀한 공간에서 커피 본연의 향을 즐기는 곳',
    specialFeature: '숯을 테마로 한 인테리어와 직접 로스팅하는 커피의 조화',
    atmosphere: '검은색과 원목의 대비, 고요하고 집중적인 커피 경험',
    signatureScent: {
      name: 'Charcoal Coffee Ritual',
      notes: ['로스팅 커피', '숯', '다크 우드', '바닐라'],
      experience: '진한 커피 로스팅 향과 은은한 숯내음이 어우러지는 깊이 있는 향'
    },
    visitInfo: {
      openingHours: '매일 09:00 - 21:00',
      bestTime: '오전 10시경, 갓 로스팅한 커피의 향기가 가득할 때',
      tips: '시그니처 핸드드립 커피는 꼭 경험해보세요'
    },
    transportation: '한강진역 2번 출구에서 도보 8분',
    images: ['/images/places/anthracite-1.jpg', '/images/places/anthracite-2.jpg'],
    tags: ['미니멀', '로스터리', '한남동', '커피전문'],
    featured: false
  },

  // 감성 카페 - 제주
  {
    id: 'jeju-bomnal',
    name: '봄날카페',
    category: 'cafe',
    location: {
      region: '제주',
      address: '제주특별자치도 제주시 애월읍 애월로1길 25',
      coordinates: { lat: 33.4632, lng: 126.3089 }
    },
    description: '애월 해안가의 돌담집을 개조한 카페로, 제주 바다를 한눈에 담을 수 있는 공간',
    specialFeature: '통창 너머로 보이는 애월 바다와 노을이 만드는 환상적인 뷰',
    atmosphere: '제주 돌담과 바다가 만나는 따뜻하고 평화로운 분위기',
    signatureScent: {
      name: 'Jeju Ocean Breeze',
      notes: ['바다 소금', '감귤', '녹차', '화이트 플로럴'],
      experience: '제주 바다의 짠내와 감귤향이 어우러진 상쾌한 향기'
    },
    visitInfo: {
      openingHours: '매일 10:00 - 20:00',
      bestTime: '일몰 1시간 전, 노을과 함께하는 티타임',
      tips: '테라스 자리는 예약 불가, 일찍 방문 추천'
    },
    transportation: '제주공항에서 차로 30분, 애월읍 해안도로변',
    images: ['/images/places/bomnal-1.jpg', '/images/places/bomnal-2.jpg'],
    tags: ['오션뷰', '애월', '노을맛집', '제주감성'],
    featured: true
  },

  // 자연명소 - 강원
  {
    id: 'gangneung-gyeongpo-pine',
    name: '경포 솔숲',
    category: 'nature',
    location: {
      region: '강원',
      address: '강원도 강릉시 경포로 365',
      coordinates: { lat: 37.7956, lng: 128.8956 }
    },
    description: '수백 년 된 소나무가 울창한 숲으로, 바다와 호수 사이의 특별한 자연 공간',
    specialFeature: '경포호수와 동해바다 사이를 잇는 4km의 해송 숲길',
    atmosphere: '소나무 향과 바다 내음이 어우러지는 청량한 자연의 품',
    signatureScent: {
      name: 'Pine Ocean Harmony',
      notes: ['소나무', '바다 소금', '이끼', '유칼립투스'],
      experience: '짙은 솔향과 상쾌한 바다 공기가 만나는 깊은 숲의 향기'
    },
    visitInfo: {
      openingHours: '24시간 개방',
      bestTime: '이른 아침 6-8시, 피톤치드가 가장 많이 나올 때',
      tips: '자전거 대여해서 솔숲길 라이딩 추천'
    },
    transportation: '강릉역에서 버스 202번 이용, 경포해변 정류장 하차',
    images: ['/images/places/gyeongpo-pine-1.jpg', '/images/places/gyeongpo-pine-2.jpg'],
    tags: ['솔숲', '피톤치드', '경포호', '자연치유'],
    featured: true
  },

  // 문화공간 - 서울
  {
    id: 'seoul-doksugung-seokjojeon',
    name: '덕수궁 석조전',
    category: 'culture',
    location: {
      region: '서울',
      address: '서울특별시 중구 세종대로 99 덕수궁',
      coordinates: { lat: 37.5655, lng: 126.9769 }
    },
    description: '대한제국 시대의 서양식 궁전으로, 근대 건축과 전통이 만나는 역사적 공간',
    specialFeature: '신고전주의 건축물 내부의 화려한 장식과 고풍스러운 분위기',
    atmosphere: '100년 전 대한제국의 품격과 근대의 향수가 깃든 공간',
    signatureScent: {
      name: 'Imperial Heritage',
      notes: ['올드우드', '레더', '앰버', '파우더리'],
      experience: '오래된 목재와 가죽의 고풍스러운 향에 은은한 파우더향이 더해진 품격 있는 향'
    },
    visitInfo: {
      openingHours: '화-일 09:00 - 18:00 (월요일 휴관)',
      bestTime: '평일 오후, 관람객이 적을 때 고요한 분위기 만끽',
      tips: '내부 관람은 예약 필수, 덕수궁 통합권 구매 추천'
    },
    transportation: '시청역 1번 출구에서 도보 5분',
    images: ['/images/places/seokjojeon-1.jpg', '/images/places/seokjojeon-2.jpg'],
    tags: ['근대건축', '대한제국', '역사공간', '궁궐'],
    featured: false
  },

  // 해안가 - 부산
  {
    id: 'busan-white-rock',
    name: '흰여울문화마을',
    category: 'coastal',
    location: {
      region: '부산',
      address: '부산광역시 영도구 영선동4가 1043',
      coordinates: { lat: 35.0792, lng: 129.0453 }
    },
    description: '절벽 위 좁은 골목길을 따라 늘어선 마을로, 부산 바다를 한눈에 담는 특별한 공간',
    specialFeature: '영화 변호인, 첫사랑 사수 궐기대회 촬영지로 유명한 해안 절벽마을',
    atmosphere: '푸른 바다와 하얀 집들이 만드는 그리스 산토리니 같은 이국적 정취',
    signatureScent: {
      name: 'Cliff Village Breeze',
      notes: ['바다 미스트', '자스민', '백토', '솔티 우드'],
      experience: '짭짤한 바다 공기와 마을 골목의 포근한 생활향이 어우러진 향'
    },
    visitInfo: {
      openingHours: '마을은 24시간, 카페들은 각각 다름',
      bestTime: '오후 3-5시, 햇살이 마을을 황금빛으로 물들일 때',
      tips: '좁은 골목길이니 편한 신발 필수, 주민들을 위해 조용히 관람'
    },
    transportation: '남포역에서 버스 7, 71번 이용, 흰여울문화마을 하차',
    images: ['/images/places/white-rock-1.jpg', '/images/places/white-rock-2.jpg'],
    tags: ['해안절벽', '영도', '영화촬영지', '부산바다'],
    featured: true
  },

  // 도심 핫플 - 서울
  {
    id: 'seoul-seongsu-daelim',
    name: '대림창고',
    category: 'urban',
    location: {
      region: '서울',
      address: '서울특별시 성동구 성수이로 78',
      coordinates: { lat: 37.5443, lng: 127.0585 }
    },
    description: '1970년대 정미소 창고를 개조한 복합문화공간으로 성수동의 상징적 장소',
    specialFeature: '높은 천장과 낡은 벽돌이 주는 빈티지한 인더스트리얼 감성',
    atmosphere: '과거와 현재가 공존하는 트렌디하고 예술적인 분위기',
    signatureScent: {
      name: 'Industrial Chic',
      notes: ['레드브릭', '메탈릭', '에스프레소', '가죽'],
      experience: '오래된 벽돌과 철제의 차가운 향에 진한 커피향이 더해진 도시적 향'
    },
    visitInfo: {
      openingHours: '화-일 11:00 - 21:00 (월요일 휴무)',
      bestTime: '주중 오후, 전시 관람과 카페를 함께 즐기기 좋을 때',
      tips: '전시는 무료, 1층 카페와 함께 둘러보기 추천'
    },
    transportation: '성수역 3번 출구에서 도보 5분',
    images: ['/images/places/daelim-1.jpg', '/images/places/daelim-2.jpg'],
    tags: ['인더스트리얼', '복합문화공간', '성수동', '전시'],
    featured: true
  },

  // 전통공간 - 경주
  {
    id: 'gyeongju-yangdong-village',
    name: '양동마을',
    category: 'traditional',
    location: {
      region: '경주',
      address: '경상북도 경주시 강동면 양동마을길 134',
      coordinates: { lat: 36.0047, lng: 129.2527 }
    },
    description: 'UNESCO 세계문화유산으로 지정된 500년 전통의 양반마을',
    specialFeature: '조선시대 양반가옥이 그대로 보존된 살아있는 전통마을',
    atmosphere: '시간이 멈춘 듯한 고즈넉하고 평화로운 한국 전통의 미',
    signatureScent: {
      name: 'Yangban Heritage',
      notes: ['한옥나무', '초가지붕', '마당흙', '전통차'],
      experience: '오래된 목재와 흙냄새, 은은한 차향이 어우러진 전통의 향'
    },
    visitInfo: {
      openingHours: '매일 09:00 - 18:00',
      bestTime: '봄가을 오전, 안개가 낀 마을의 신비로운 풍경',
      tips: '마을 주민들이 실제 거주하는 곳이니 예의를 지켜 관람'
    },
    transportation: '경주역에서 버스 203번 이용, 양동마을 입구 하차',
    images: ['/images/places/yangdong-1.jpg', '/images/places/yangdong-2.jpg'],
    tags: ['유네스코', '전통마을', '한옥', '양반문화'],
    featured: false
  }
];
