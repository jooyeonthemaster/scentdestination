import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebase';
import { HotplaceDestination, ScentJourneyArticle } from '@/types';
import { assignImagesToSpace, generateImageFileName } from '@/utils/imageUtils';

// 컬렉션 이름 상수
export const COLLECTIONS = {
  HOTPLACES: 'hotplaces',
  ARTICLES: 'articles',
  SCENTS: 'scents'
} as const;

// Hotplace 관련 함수들
export const hotplaceService = {
  // 모든 핫플레이스 가져오기
  async getAll(): Promise<HotplaceDestination[]> {
    try {
      const querySnapshot = await getDocs(collection(db, COLLECTIONS.HOTPLACES));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as HotplaceDestination[];
    } catch (error) {
      console.error('Error fetching hotplaces:', error);
      throw error;
    }
  },

  // 지역별 핫플레이스 가져오기
  async getByRegion(region: string): Promise<HotplaceDestination[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.HOTPLACES),
        where('location.region', '==', region)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as HotplaceDestination[];
    } catch (error) {
      console.error('Error fetching hotplaces by region:', error);
      throw error;
    }
  },

  // 카테고리별 핫플레이스 가져오기
  async getByCategory(category: string): Promise<HotplaceDestination[]> {
    try {
      const q = query(
        collection(db, COLLECTIONS.HOTPLACES),
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as HotplaceDestination[];
    } catch (error) {
      console.error('Error fetching hotplaces by category:', error);
      throw error;
    }
  },

  // 핫플레이스 추가하기 (자동 이미지 할당 포함)
  async add(hotplace: Omit<HotplaceDestination, 'id'>): Promise<string> {
    try {
      // 이미지 자동 할당
      const hotplaceWithImages = {
        ...hotplace,
        images: assignImagesToSpace(hotplace.name, hotplace.images)
      };

      const docRef = await addDoc(collection(db, COLLECTIONS.HOTPLACES), {
        ...hotplaceWithImages,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding hotplace:', error);
      throw error;
    }
  },

  // 핫플레이스 업데이트하기
  async update(id: string, updates: Partial<HotplaceDestination>): Promise<void> {
    try {
      const docRef = doc(db, COLLECTIONS.HOTPLACES, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating hotplace:', error);
      throw error;
    }
  },

  // 핫플레이스 삭제하기
  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, COLLECTIONS.HOTPLACES, id));
    } catch (error) {
      console.error('Error deleting hotplace:', error);
      throw error;
    }
  }
};

// 실제 데이터 마이그레이션 함수
export async function migrateExistingData() {
  try {
    // 기존 하드코딩된 데이터를 Firebase로 마이그레이션
    const { HOTPLACE_DESTINATIONS } = await import('@/data/hotplaces');
    
    for (const hotplace of HOTPLACE_DESTINATIONS) {
      await hotplaceService.add(hotplace);
    }
    
    console.log('Data migration completed successfully');
  } catch (error) {
    console.error('Error migrating data:', error);
    throw error;
  }
}

// 새로운 실제 데이터 추가 함수 (2025년 최신 실제 존재하는 장소들)
export async function addRealHotplaceData() {
  const realHotplaces: Omit<HotplaceDestination, 'id'>[] = [
    // 서울 실제 인기 카페들
    {
      name: 'Osechill',
      category: 'cafe',
      location: {
        region: '서울',
        address: '서울특별시 마포구 토정로5길 17 1F',
        coordinates: { lat: 37.5459, lng: 126.9109 }
      },
      description: 'WINNER 송민호가 운영하는 컬러풀한 디저트와 시그니처 커피로 유명한 감성 카페',
      specialFeature: '화려한 색감의 디저트와 아티스트의 감성이 담긴 독특한 인테리어',
      atmosphere: '활기차고 트렌디한 분위기, 아티스트의 창의성이 느껴지는 공간',
      signatureScent: {
        name: 'Colorful Dreams',
        notes: ['에스프레소', '베리', '바닐라', '크림'],
        experience: '달콤한 디저트와 진한 커피의 조화로운 향기'
      },
      visitInfo: {
        openingHours: '월-목 11:00-20:00, 금-일 11:00-21:00',
        bestTime: '오후 2-5시, 자연광이 좋은 창가 테이블',
        tips: '인기가 많아 대기 시간이 있을 수 있으니 평일 방문 추천'
      },
      transportation: '합정역 7번 출구에서 도보 8분',
      images: ['/images/places/osechill-1.jpg'],
      tags: ['아티스트카페', '컬러풀디저트', '합정', '인스타그램'],
      featured: true
    },
    {
      name: 'Aya Coffee',
      category: 'cafe',
      location: {
        region: '서울',
        address: '서울 강남구 언주로94길 11 1층',
        coordinates: { lat: 37.5095, lng: 127.0438 }
      },
      description: '크로플로 유명한 전문 커피 로스터리 카페, 바리스타의 전문성이 돋보이는 곳',
      specialFeature: '갓 구운 크로플과 전문 바리스타가 내리는 스페셜티 커피',
      atmosphere: '모던하고 깔끔한 인테리어, 커피에 집중할 수 있는 조용한 분위기',
      signatureScent: {
        name: 'Roasted Excellence',
        notes: ['로스팅 커피', '버터', '바닐라', '견과류'],
        experience: '갓 로스팅한 원두의 진한 향과 따뜻한 버터 크로플의 고소한 향'
      },
      visitInfo: {
        openingHours: '월-일 8:00-19:00',
        bestTime: '오전 10-12시, 갓 구운 크로플을 맛볼 수 있는 시간',
        tips: '크로플은 한정 수량이므로 일찍 방문하는 것을 추천'
      },
      transportation: '선릉역 5번 출구에서 도보 9분',
      images: ['/images/places/aya-coffee-1.jpg'],
      tags: ['크로플', '스페셜티커피', '강남', '로스터리'],
      featured: true
    },

    // 제주도 실제 인기 카페들
    {
      name: 'Mônsant de Aewol',
      category: 'cafe',
      location: {
        region: '제주',
        address: '제주특별자치도 제주시 애월읍 애월북서길 56-1',
        coordinates: { lat: 37.3709, lng: 126.3161 }
      },
      description: '커다란 유리창을 통해 바다와 하늘의 조화로운 전망을 감상할 수 있는 감성 카페',
      specialFeature: '대형 유리창으로 이루어진 외벽과 창문으로 자연과 건축의 조화로운 풍경',
      atmosphere: '넓은 바다 전망과 깔끔한 모던 인테리어가 어우러진 휴식 공간',
      signatureScent: {
        name: 'Ocean Breeze Dreams',
        notes: ['바다바람', '커피', '우유', '바닐라'],
        experience: '상쾌한 바다 바람과 부드러운 커피향이 조화를 이루는 평온한 향기'
      },
      visitInfo: {
        openingHours: '월-일 11:00-19:30 (라스트 오더 19:00)',
        bestTime: '일몰 시간대, 서쪽 바다 전망으로 석양 감상 가능',
        tips: '일몰 시간에는 인기가 많으니 미리 방문하는 것을 추천'
      },
      transportation: '제주국제공항에서 차로 약 30분',
      images: ['/images/places/monsant-aewol-1.jpg'],
      tags: ['바다뷰', '일몰명소', '애월', '감성카페'],
      featured: true
    },
    {
      name: 'One and Only',
      category: 'cafe',
      location: {
        region: '제주',
        address: '제주특별자치도 서귀포시 안덕면 산방로 141',
        coordinates: { lat: 33.2339, lng: 126.3095 }
      },
      description: '산방산을 배경으로 하고 바다를 정면으로 바라보는 그림 같은 풍경의 브런치 카페',
      specialFeature: '뒤쪽 산방산 전망과 앞쪽 바다 전망을 동시에 즐길 수 있는 독특한 위치',
      atmosphere: '모던한 비치하우스 느낌의 인테리어와 탁 트인 자연 경관',
      signatureScent: {
        name: 'Mountain Sea Harmony',
        notes: ['바다소금', '산의허브', '브런치빵', '버터'],
        experience: '산과 바다가 만나는 제주의 자연을 담은 상쾌하고 포근한 향기'
      },
      visitInfo: {
        openingHours: '월-일 9:00-19:00 (라스트 오더 18:30)',
        bestTime: '브런치 시간인 오전 10시-오후 2시',
        tips: '루프탑 좌석과 야외 좌석에서 최고의 뷰를 즐길 수 있음'
      },
      transportation: '제주국제공항에서 차로 약 45분',
      images: ['/images/places/one-and-only-1.jpg'],
      tags: ['브런치', '산방산뷰', '바다뷰', '루프탑'],
      featured: true
    },
    {
      name: 'Café Hallasan',
      category: 'cafe',
      location: {
        region: '제주',
        address: '제주특별자치도 제주시 구좌읍 명수1길 48',
        coordinates: { lat: 33.5589, lng: 126.8444 }
      },
      description: '세화해변 바로 앞에 위치한 녹색 식물과 빈티지 가구로 꾸며진 아늑한 카페',
      specialFeature: '푸른 바다 전망과 함께 한라봉차와 당근 파운드케이크로 유명',
      atmosphere: '빈티지 가구와 화분으로 꾸며진 따뜻하고 포근한 분위기',
      signatureScent: {
        name: 'Coastal Garden',
        notes: ['한라봉', '당근케이크', '바다바람', '그린티'],
        experience: '제주 특산품의 달콤한 향과 바다의 상쾌함이 어우러진 향기'
      },
      visitInfo: {
        openingHours: '월-일 9:30-21:00 (라스트 오더 20:30)',
        bestTime: '오후 2-5시, 자연광이 들어오는 창가 자리',
        tips: '인스타그램 인증샷으로 유명한 창문 옆 빈티지 TV 포토존 필수'
      },
      transportation: '제주국제공항에서 차로 약 40분',
      images: ['/images/places/cafe-hallasan-1.jpg'],
      tags: ['세화해변', '빈티지', '한라봉차', '포토존'],
      featured: true
    },
    {
      name: 'Myeongwol Elementary School',
      category: 'culture',
      location: {
        region: '제주',
        address: '제주특별자치도 제주시 한림읍 명월로 48',
        coordinates: { lat: 33.3887, lng: 126.2648 }
      },
      description: '1955년부터 1993년까지 운영된 폐교를 카페와 갤러리로 개조한 독특한 문화공간',
      specialFeature: '각 교실을 테마별로 꾸민 공간과 추억의 물건들을 판매하는 문구점',
      atmosphere: '노스탤지어가 가득한 옛 학교의 정취와 현대적 감각이 조화된 분위기',
      signatureScent: {
        name: 'School Days Memory',
        notes: ['나무책상', '분필가루', '커피', '옛종이'],
        experience: '어린 시절 추억이 떠오르는 따뜻하고 그리운 향기'
      },
      visitInfo: {
        openingHours: '월-일 10:00-18:00',
        bestTime: '오후 1-4시, 자연광이 좋은 시간대',
        tips: '매주 월요일 플리마켓 개최, 폴라로이드 팝업스토어 등 이벤트 자주 진행'
      },
      transportation: '제주국제공항에서 차로 약 25분',
      images: ['/images/places/myeongwol-school-1.jpg'],
      tags: ['폐교카페', '갤러리', '노스탤지어', '문화공간'],
      featured: true
    },
    {
      name: 'Flowave',
      category: 'cafe',
      location: {
        region: '제주',
        address: '제주특별자치도 제주시 한림읍 장원길 63-10',
        coordinates: { lat: 33.3845, lng: 126.2445 }
      },
      description: '제주 암반을 그대로 보존하며 지어진 카페로 낮에는 물의 흐름, 밤에는 불의 흐름을 테마로 한 독특한 공간',
      specialFeature: '백색 모래로 물결의 흐름을 표현한 물의 정원과 용암을 형상화한 조명',
      atmosphere: '자연과 인공의 조화, 물과 불의 대비를 통한 신비로운 분위기',
      signatureScent: {
        name: 'Fire & Water Flow',
        notes: ['화산암', '바다미스트', '라벤더', '우드'],
        experience: '제주의 화산과 바다가 만나는 신비로운 자연의 향기'
      },
      visitInfo: {
        openingHours: '월-일 15:00-22:00 (라스트 오더 21:00)',
        bestTime: '일몰 이후 저녁 시간, 조명이 켜지는 시간',
        tips: '야간에 더욱 아름다운 분위기를 연출하므로 저녁 방문 추천'
      },
      transportation: '제주국제공항에서 차로 약 25분',
      images: ['/images/places/flowave-1.jpg'],
      tags: ['암반카페', '물의정원', '야경명소', '독특한컨셉'],
      featured: true
    }
  ];

  try {
    for (const hotplace of realHotplaces) {
      await hotplaceService.add(hotplace);
    }
    console.log('Real hotplace data added successfully');
  } catch (error) {
    console.error('Error adding real hotplace data:', error);
    throw error;
  }
}

// 추가 실제 데이터 확장 함수 (더 많은 지역의 데이터)
export async function addMoreRealHotplaceData() {
  const moreRealHotplaces: Omit<HotplaceDestination, 'id'>[] = [
    // 부산 실제 인기 장소들
    {
      name: '흰여울문화마을',
      category: 'culture',
      location: {
        region: '부산',
        address: '부산광역시 영도구 영선동4가 1043-6',
        coordinates: { lat: 35.0758, lng: 129.0661 }
      },
      description: '절벽 위 하얀 집들이 그림처럼 펼쳐진 부산의 대표적인 문화마을',
      specialFeature: '바다를 내려다보는 절벽 위 하얀 집들과 좁은 골목길의 독특한 풍경',
      atmosphere: '지중해 산토리니를 연상케 하는 이국적이고 낭만적인 분위기',
      signatureScent: {
        name: 'Cliff Village Breeze',
        notes: ['바다바람', '하얀페인트', '골목길', '소금기'],
        experience: '절벽 위에서 느끼는 시원한 바닷바람과 마을의 정취'
      },
      visitInfo: {
        openingHours: '24시간 (카페 및 상점은 개별 운영시간)',
        bestTime: '오후 2-5시, 일몰 시간',
        tips: '경사가 가파르니 편한 신발 착용 권장, 포토존이 많음'
      },
      transportation: '부산역에서 지하철 1호선 남포역 하차 후 버스 이용',
      images: ['/images/places/huinyeoul-village-1.jpg'],
      tags: ['문화마을', '절벽마을', '포토존', '부산여행'],
      featured: true
    },

    // 전주 실제 인기 장소들
    {
      name: '전주한옥마을',
      category: 'traditional',
      location: {
        region: '전주',
        address: '전라북도 전주시 완산구 기린대로 99',
        coordinates: { lat: 35.8168, lng: 127.1530 }
      },
      description: '700여 채의 한옥이 군락을 이루고 있는 한국 최대 규모의 전통 한옥마을',
      specialFeature: '전통 한옥 건축과 한복 체험, 전통 음식과 문화 체험이 가능한 종합 관광지',
      atmosphere: '전통과 현대가 조화를 이룬 고즈넉하고 품격 있는 분위기',
      signatureScent: {
        name: 'Traditional Hanok Village',
        notes: ['한지', '대나무', '녹차', '꿀'],
        experience: '전통 한옥의 나무향과 한국 전통차의 은은한 향기'
      },
      visitInfo: {
        openingHours: '24시간 (상점 및 체험관은 개별 운영시간)',
        bestTime: '오전 10-12시, 오후 2-5시',
        tips: '한복 대여 후 방문하면 더욱 특별한 경험, 주말에는 인파 주의'
      },
      transportation: '전주역에서 버스 이용 약 20분',
      images: ['/images/places/jeonju-hanok-village-1.jpg'],
      tags: ['한옥마을', '전통문화', '한복체험', '전주여행'],
      featured: true
    },

    // 강릉 실제 인기 장소들
    {
      name: '강릉 안목해변',
      category: 'coastal',
      location: {
        region: '강릉',
        address: '강원도 강릉시 창해로 14번길 20-1',
        coordinates: { lat: 37.7661, lng: 128.9479 }
      },
      description: '강릉의 대표적인 해변으로 커피거리와 해변이 어우러진 낭만적인 공간',
      specialFeature: '해변을 따라 늘어선 카페들과 바다를 바라보며 즐기는 커피 문화',
      atmosphere: '파도 소리와 함께 여유로운 커피 한 잔의 힐링 분위기',
      signatureScent: {
        name: 'Coffee Beach Walk',
        notes: ['바다바람', '원두커피', '소나무', '모래'],
        experience: '바다의 시원함과 갓 내린 커피의 고소한 향이 어우러진 상쾌한 향기'
      },
      visitInfo: {
        openingHours: '24시간 (카페들은 개별 운영시간)',
        bestTime: '일출 시간, 오후 2-6시',
        tips: '일출 명소로 유명하며, 커피거리에서 다양한 원두 커피 맛보기 가능'
      },
      transportation: '강릉역에서 버스 이용 약 15분',
      images: ['/images/places/anmok-beach-1.jpg'],
      tags: ['해변', '커피거리', '일출명소', '강릉여행'],
      featured: true
    }
  ];

  try {
    for (const hotplace of moreRealHotplaces) {
      await hotplaceService.add(hotplace);
    }
    console.log('More real hotplace data added successfully');
  } catch (error) {
    console.error('Error adding more real hotplace data:', error);
    throw error;
  }
} 