export interface ScentNote {
  id: string;
  name: string;
  category: 'top' | 'middle' | 'base';
  description: string;
}

export interface HotplaceScent {
  id: string;
  name: string;
  hotplace: string;
  description: string;
  notes: ScentNote[];
  hotplaceTypes: HotplaceType[];
  intensity: 1 | 2 | 3 | 4 | 5;
  mood: string;
  season: Season[];
  experience: string;
  image: string;
  availability: 'available' | 'seasonal' | 'special_event';
}

export type HotplaceType = 
  | 'cafe'
  | 'culture'
  | 'nature'
  | 'coastal'
  | 'urban'
  | 'traditional'
  | 'festival'
  | 'gallery'
  | 'mountain'
  | 'unique';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface HotplaceDestination {
  id: string;
  name: string;
  category: HotplaceType;
  location: {
    region: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  description: string;
  specialFeature: string;
  atmosphere: string;
  signatureScent: {
    name: string;
    notes: string[];
    experience: string;
  };
  visitInfo: {
    openingHours: string;
    bestTime: string;
    tips: string;
  };
  transportation: string;
  relatedFragrance?: string;
  images: string[];
  tags: string[];
  featured: boolean;
  enhancedData?: EnhancedPlaceData; // 고도화된 데이터 (선택적)
}

// 고도화된 장소 데이터 타입
export interface EnhancedPlaceData {
  enhancedDescription: string;
  detailedScentProfile: {
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
    scentIntensity: number;
    scentDuration: string;
    seasonalRecommendation: string;
  };
  atmosphereDetails: {
    visualElements: string[];
    soundscape: string[];
    tactileElements: string[];
    overallMood: string;
  };
  visitExperience: {
    bestTimeToVisit: string;
    averageStayDuration: string;
    crowdLevel: string;
    photoSpots: string[];
    insiderTips: string[];
  };
  scentJourneyStory: string;
  nearbyRecommendations: NearbyRecommendation[];
  pairingRecommendations: {
    perfumes: string[];
    candles: string[];
    music: string[];
  };
}

export interface NearbyRecommendation {
  name: string;
  type: string;
  description: string;
  walkingTime: string;
}

// API 응답 타입
export interface EnhancedPlaceResponse {
  success: boolean;
  originalData: HotplaceDestination;
  enhancedData: EnhancedPlaceData;
  message: string;
}

export interface ScentJourneyArticle {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  category: 'seasonal_guide' | 'destination_guide' | 'city_guide' | 'regional_special' | 'cultural_journey';
  excerpt: string;
  content: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
  relatedDestinations?: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface TravelFilterOptions {
  hotplaceTypes: HotplaceType[];
  regions: string[];
  seasons: Season[];
  moodPreference: string[];
  accessibility: 'easy' | 'moderate' | 'challenging';
}

// 고도화된 센트 맵 필터링 타입들
export interface ScentMapFilters {
  // 지역 필터 (시/도 -> 시/군/구 -> 동/읍/면)
  region: {
    province?: string;  // 시/도 (서울특별시, 제주특별자치도 등)
    city?: string;      // 시/군/구 (마포구, 제주시 등)
    district?: string;  // 동/읍/면 (연남동, 애월읍 등)
  };
  
  // 카테고리 필터
  categories: HotplaceType[];
  
  // 향기 노트 필터
  scentNotes: {
    topNotes: string[];     // 탑 노트
    middleNotes: string[];  // 미들 노트
    baseNotes: string[];    // 베이스 노트
  };
  
  // 분위기 필터
  atmosphere: string[];
  
  // 태그 필터
  tags: string[];
  
  // 특성 필터
  features: {
    featured?: boolean;           // 추천 장소
    hasParking?: boolean;         // 주차 가능
    hasWifi?: boolean;           // 와이파이
    petFriendly?: boolean;       // 반려동물 동반 가능
    wheelchair?: boolean;        // 휠체어 접근 가능
    reservation?: boolean;       // 예약 필요
  };
  
  // 시간/계절 필터
  temporal: {
    seasons: Season[];
    timeOfDay: ('morning' | 'afternoon' | 'evening' | 'night')[];
    openNow?: boolean;           // 현재 운영중
  };
  
  // 향의 강도 필터
  scentIntensity: {
    min: number;  // 1-10
    max: number;  // 1-10
  };
  
  // 거리 필터 (추후 구현)
  distance?: {
    lat: number;
    lng: number;
    radius: number; // km
  };
}

// 필터 옵션들을 위한 상수 타입들
export interface FilterOptions {
  provinces: string[];
  cities: Record<string, string[]>;     // province -> cities
  districts: Record<string, string[]>;  // city -> districts
  categories: { value: HotplaceType; label: string; icon: string }[];
  scentNotes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  atmospheres: string[];
  commonTags: string[];
  features: { key: keyof ScentMapFilters['features']; label: string; icon: string }[];
}

export interface ScentJourney {
  id: string;
  title: string;
  duration: string; // "1일", "2박 3일" 등
  difficulty: 'easy' | 'moderate' | 'challenging';
  theme: string;
  description: string;
  destinations: HotplaceDestination[];
  estimatedCost: {
    min: number;
    max: number;
    currency: string;
  };
  bestSeason: Season[];
  highlights: string[];
  tips: string[];
  transportation: string;
  featured: boolean;
}

export interface VisitorReview {
  id: string;
  hotplaceId: string;
  visitorName: string;
  visitDate: string;
  rating: number;
  scentExperience: string;
  memorableAspects: string[];
  recommendation: string;
  photos?: string[];
  verified: boolean;
}



// 디퓨저 제품 관련 타입들
export interface DiffuserProduct {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  scentProfile: {
    topNotes: string[];
    middleNotes: string[];
    baseNotes: string[];
    intensity: number;
    longevity: string;
  };
  sizes: DiffuserSize[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  placeId?: string; // 해당 향기 공간 ID (옵션)
}

export interface DiffuserSize {
  id: string;
  volume: string; // "50ml", "100ml", "200ml"
  price: number;
  duration: string; // "약 2개월", "약 4개월"
}

export interface DiffuserCartItem {
  productId: string;
  sizeId: string;
  quantity: number;
  product: DiffuserProduct;
  selectedSize: DiffuserSize;
}