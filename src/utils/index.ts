import { HotplaceScent, HotplaceType, TravelFilterOptions, HotplaceDestination } from '@/types';
import { HOTPLACE_CATEGORIES } from '@/constants';

export function formatPrice(amount: number, currency: string = 'KRW'): string {
  if (currency === 'KRW') {
    return `₩${amount.toLocaleString()}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

export function formatReadingTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}분`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}시간 ${remainingMinutes}분` : `${hours}시간`;
}

export function getHotplaceInfo(hotplaceType: HotplaceType) {
  return HOTPLACE_CATEGORIES[hotplaceType];
}

export function calculateDestinationScore(
  destination: HotplaceDestination,
  preferences?: {
    hotplaceTypePreference?: HotplaceType;
    seasonPreference?: string;
    moodPreference?: string;
    accessibility?: string;
  }
): number {
  let score = 0;

  // 핫플레이스 타입 적합성 점수 (기본 40점)
  if (preferences?.hotplaceTypePreference && destination.category === preferences.hotplaceTypePreference) {
    score += 40;
  } else {
    score += 20; // 기본 점수
  }

  // 계절 점수 (20점)
  if (preferences?.seasonPreference) {
    // 계절별 추천 로직은 추후 구현
    score += 20;
  } else {
    score += 15; // 기본 점수
  }

  // 무드 점수 (20점)
  if (preferences?.moodPreference && destination.atmosphere.includes(preferences.moodPreference)) {
    score += 20;
  } else {
    score += 10; // 기본 점수
  }

  // 접근성 점수 (20점)
  if (preferences?.accessibility) {
    // 접근성 평가 로직 추후 구현
    score += 15;
  } else {
    score += 15; // 기본 점수
  }

  return Math.min(100, Math.max(0, score));
}

export function filterDestinations(
  destinations: HotplaceDestination[],
  filters: TravelFilterOptions
): HotplaceDestination[] {
  return destinations.filter(destination => {
    // 핫플레이스 타입 필터
    if (filters.hotplaceTypes.length > 0) {
      if (!filters.hotplaceTypes.includes(destination.category)) {
        return false;
      }
    }

    // 지역 필터
    if (filters.regions.length > 0) {
      const hasMatchingRegion = filters.regions.some(region => 
        destination.location.region.includes(region)
      );
      if (!hasMatchingRegion) return false;
    }

    // 계절 필터
    if (filters.seasons.length > 0) {
      // 계절별 필터링 로직 추후 구현
      // 현재는 모든 계절에 적합하다고 가정
    }

    // 무드 필터
    if (filters.moodPreference.length > 0) {
      const hasMatchingMood = filters.moodPreference.some(mood => 
        destination.atmosphere.includes(mood)
      );
      if (!hasMatchingMood) return false;
    }

    return true;
  });
}

export function searchDestinations(
  destinations: HotplaceDestination[],
  query: string
): HotplaceDestination[] {
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return destinations;

  return destinations.filter(destination => {
    const searchableText = [
      destination.name,
      destination.location.region,
      destination.location.address,
      destination.description,
      destination.specialFeature,
      destination.atmosphere,
      destination.signatureScent.name,
      ...destination.signatureScent.notes,
      ...destination.tags,
      HOTPLACE_CATEGORIES[destination.category].label
    ].join(' ').toLowerCase();

    return searchableText.includes(searchTerm);
  });
}

export function getRecommendedDestinations(
  destinations: HotplaceDestination[],
  hotplaceType?: HotplaceType,
  limit: number = 6
): HotplaceDestination[] {
  let filtered = destinations;
  
  if (hotplaceType) {
    filtered = destinations.filter(dest => dest.category === hotplaceType);
  }

  const scored = filtered
    .map(destination => ({
      destination,
      score: calculateDestinationScore(destination, { hotplaceTypePreference: hotplaceType })
    }))
    .filter(item => item.score > 30) // 최소 점수 필터링
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(item => item.destination);
}

export function getFeaturedDestinations(
  destinations: HotplaceDestination[],
  limit: number = 3
): HotplaceDestination[] {
  return destinations
    .filter(dest => dest.featured)
    .slice(0, limit);
}

export function groupDestinationsByRegion(
  destinations: HotplaceDestination[]
): Record<string, HotplaceDestination[]> {
  return destinations.reduce((groups, destination) => {
    const region = destination.location.region;
    if (!groups[region]) {
      groups[region] = [];
    }
    groups[region].push(destination);
    return groups;
  }, {} as Record<string, HotplaceDestination[]>);
}

export function calculateTravelDistance(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
): number {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (to.lat - from.lat) * Math.PI / 180;
  const dLon = (to.lng - from.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(from.lat * Math.PI / 180) * Math.cos(to.lat * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).replace(/\s+\w*$/, '') + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDuration(duration: string): string {
  // "1일", "2박 3일" 등의 형식 처리
  return duration;
}

export function getScentIntensityLabel(intensity: 1 | 2 | 3 | 4 | 5): string {
  const labels = {
    1: '은은한',
    2: '부드러운', 
    3: '적당한',
    4: '진한',
    5: '강렬한'
  };
  return labels[intensity];
} 