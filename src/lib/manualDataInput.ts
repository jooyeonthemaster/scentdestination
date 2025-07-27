import { hotplaceService } from './firebaseService';
import { HotplaceDestination } from '@/types';

// 예시 장소 데이터
export const examplePlaces: Omit<HotplaceDestination, 'id'>[] = [
  {
    name: '예시 카페',
    category: 'cafe',
    location: {
      region: '서울',
      address: '서울특별시 강남구 예시로 123',
      coordinates: { lat: 37.5665, lng: 126.9780 }
    },
    description: '테스트용 예시 카페입니다.',
    specialFeature: '예시 특징',
    atmosphere: '예시 분위기',
    signatureScent: {
      name: '예시 향기',
      notes: ['커피', '바닐라'],
      experience: '예시 경험'
    },
    visitInfo: {
      openingHours: '09:00-21:00',
      bestTime: '오후 2-5시',
      tips: '예시 팁'
    },
    transportation: '지하철 2호선 예시역 1번 출구',
    images: ['/images/example.jpg'],
    tags: ['예시태그'],
    featured: false
  }
];

// 여러 장소를 Firebase에 일괄 추가하는 함수
export async function addBulkHotplaces(hotplaces: Omit<HotplaceDestination, 'id'>[]): Promise<void> {
  try {
    console.log(`${hotplaces.length}개의 장소를 Firebase에 추가 중...`);
    
    // 각 장소를 순차적으로 추가
    for (let i = 0; i < hotplaces.length; i++) {
      const hotplace = hotplaces[i];
      console.log(`${i + 1}/${hotplaces.length}: ${hotplace.name} 추가 중...`);
      
      await hotplaceService.add(hotplace);
      
      // 요청 간 짧은 간격 두기 (Firebase 부하 방지)
      if (i < hotplaces.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    console.log(`✅ ${hotplaces.length}개의 장소가 성공적으로 추가되었습니다.`);
  } catch (error) {
    console.error('❌ 일괄 추가 중 오류 발생:', error);
    throw new Error(`일괄 추가 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
  }
} 