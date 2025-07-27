import { HotplaceType, NavigationItem } from '@/types';

export const HOTPLACE_CATEGORIES = {
  cafe: {
    label: '감성 카페',
    description: '특별한 무드와 향기를 간직한 이색 카페들',
    icon: '☕',
    color: 'from-amber-50 to-amber-100'
  },
  culture: {
    label: '문화공간',
    description: '역사와 전통이 살아숨쉬는 문화유산 공간들',
    icon: '🏛️',
    color: 'from-purple-50 to-purple-100'
  },
  nature: {
    label: '자연명소',
    description: '청정한 자연의 향기를 만날 수 있는 특별한 장소들',
    icon: '🌿',
    color: 'from-green-50 to-green-100'
  },
  coastal: {
    label: '해안가',
    description: '바다의 향기와 함께하는 낭만적인 해안 공간들',
    icon: '🌊',
    color: 'from-blue-50 to-blue-100'
  },
  urban: {
    label: '도심 핫플',
    description: '도시 속 숨겨진 감성 공간과 트렌디한 명소들',
    icon: '🏙️',
    color: 'from-gray-50 to-gray-100'
  },
  traditional: {
    label: '전통공간',
    description: '한국의 전통미와 향기를 체험할 수 있는 고즈넉한 공간들',
    icon: '🏯',
    color: 'from-indigo-50 to-indigo-100'
  },
  festival: {
    label: '축제/이벤트',
    description: '계절별 축제와 특별한 이벤트가 열리는 향기로운 장소들',
    icon: '🎪',
    color: 'from-red-50 to-red-100'
  },
  gallery: {
    label: '갤러리/예술',
    description: '창작 영감과 예술적 감성이 넘치는 갤러리와 아트 스페이스',
    icon: '🎨',
    color: 'from-pink-50 to-pink-100'
  },
  mountain: {
    label: '산/고원',
    description: '산림욕과 맑은 공기를 만끽할 수 있는 고산 지대',
    icon: '⛰️',
    color: 'from-yellow-50 to-yellow-100'
  },
  unique: {
    label: '특별한 공간',
    description: '어디서도 경험할 수 없는 독특하고 특별한 향기 공간들',
    icon: '✨',
    color: 'from-cyan-50 to-cyan-100'
  }
} as const;

export const SCENT_NOTES = {
  oceanic: '오션 브리즈',
  floral: '플로럴',
  citrus: '시트러스', 
  green: '그린',
  aquatic: '아쿠아틱',
  spicy: '스파이시',
  woody: '우디',
  oriental: '오리엔탈',
  gourmand: '구르망',
  coffee: '커피',
  sea_salt: '바다 소금',
  vanilla: '바닐라',
  musk: '머스크',
  amber: '앰버',
  concrete: '시멘트',
  bamboo: '대나무',
  pine: '소나무',
  eucalyptus: '유칼립투스',
  paint: '페인트',
  hanbok_paper: '한지',
  green_tea: '녹차',
  honey: '꿀',
  phytoncide: '피톤치드',
  moss: '이끼',
  mist: '미스트',
  juniper: '주니퍼'
} as const;

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'home',
    label: '홈',
    href: '/'
  },
  {
    id: 'ai-scent-recommendation',
    label: 'AI 기반 공간 향 추천받기',
    href: '/ai-scent-recommendation'
  },
  {
    id: 'scent-spaces',
    label: '향기 여행지',
    href: '/scent-spaces',
    children: [
      { id: 'cafes', label: '감성 카페', href: '/scent-spaces/cafes' },
      { id: 'nature', label: '자연명소', href: '/scent-spaces/nature' },
      { id: 'culture', label: '문화공간', href: '/scent-spaces/culture' },
      { id: 'coastal', label: '해안가', href: '/scent-spaces/coastal' }
    ]
  },
  {
    id: 'scent-map',
    label: '향기 지도',
    href: '/scent-map'
  },
  {
    id: 'scent-journey',
    label: '여행 가이드',
    href: '/scent-journey',
    children: [
      { id: 'seasonal', label: '계절별 가이드', href: '/scent-journey/seasonal' },
      { id: 'regional', label: '지역별 코스', href: '/scent-journey/regional' },
      { id: 'themed', label: '테마별 여행', href: '/scent-journey/themed' }
    ]
  },
  {
    id: 'about',
    label: '센트 데스티네이션',
    href: '/about'
  },
  {
    id: 'services',
    label: '서비스',
    href: '/services',
    children: [
      { id: 'consultation', label: '향기 컨설팅', href: '/services/consultation' },
      { id: 'journey-package', label: '여행 패키지', href: '/services/journey-package' },
      { id: 'scent-products', label: '향기 제품', href: '/services/scent-products' }
    ]
  }
];

export const COLORS = {
  primary: {
    charcoal: '#2B2B2B',        // 진한 텍스트
    
    // 메인 팔레트 - 첨부 이미지 스타일
    sand: '#F5F1EB',            // 메인 배경 (연한 베이지)
    cream: '#FAF7F2',           // 가장 연한 배경
    latte: '#E8DDD4',           // 중간 베이지
    mocha: '#D4C4B0',           // 진한 베이지
    
    // 악센트 컬러
    sage: '#A8B5A0',            // 부드러운 그린 (포인트)
    terracotta: '#C67B5C',      // 따뜻한 테라코타 (버튼)
    warm: '#B8A082',            // 따뜻한 브라운
    
    // 기본 컬러
    white: '#FFFFFF',
    black: '#000000'
  },
  accents: {
    beige: '#F5F5DC',           // 호환성을 위해 유지
    taupe: '#483C32'            // 호환성을 위해 유지
  }
} as const;

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
} as const;

export const FEATURED_REGIONS = [
  '제주도',
  '서울',
  '부산',
  '강릉',
  '전주',
  '경주',
  '여수',
  '포항',
  '인천',
  '대전'
] as const;

export const SCENT_JOURNEY_TYPES = {
  seasonal: '계절별 여행',
  cultural: '문화 탐방',
  nature: '자연 힐링',
  urban: '도심 탐험',
  coastal: '해안 드라이브',
  traditional: '전통 체험',
  festival: '축제 여행',
  weekend: '주말 여행',
  healing: '힐링 여행',
  romantic: '로맨틱 여행'
} as const; 