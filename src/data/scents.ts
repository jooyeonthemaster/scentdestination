import { HotplaceScent } from '@/types';

export const SCENT_COLLECTIONS: HotplaceScent[] = [
  // Fresh & Citrus 계열
  {
    id: 'jeju-ocean-breeze',
    name: 'Jeju Ocean Breeze',
    hotplace: '제주 애월 봄날카페',
    description: '제주 애월 바다의 상쾌한 바람과 감귤향이 어우러진 싱그러운 향',
    notes: [
      { id: 'sea-salt', name: '바다 소금', category: 'top', description: '짭짤한 바다의 첫인상' },
      { id: 'citrus', name: '제주 감귤', category: 'top', description: '상큼한 감귤의 생동감' },
      { id: 'green-tea', name: '녹차', category: 'middle', description: '제주 녹차밭의 싱그러움' },
      { id: 'white-floral', name: '화이트 플로럴', category: 'base', description: '은은한 꽃향기의 여운' }
    ],
    hotplaceTypes: ['cafe', 'coastal'],
    intensity: 3,
    mood: '상쾌하고 자유로운',
    season: ['spring', 'summer'],
    experience: '애월 해변을 거닐며 느끼는 제주만의 특별한 순간',
    image: '/images/scents/jeju-ocean-breeze.jpg',
    availability: 'available'
  },

  // Woody & Earthy 계열
  {
    id: 'urban-jungle-dreams',
    name: 'Urban Jungle Dreams',
    hotplace: '서울 연남서식',
    description: '도시 속 콘크리트 정글에서 발견한 싱그러운 식물의 생명력',
    notes: [
      { id: 'concrete', name: '시멘트', category: 'top', description: '차가운 도시의 첫인상' },
      { id: 'eucalyptus', name: '유칼립투스', category: 'middle', description: '상쾌한 식물의 생기' },
      { id: 'ivy', name: '아이비', category: 'middle', description: '벽을 타고 오르는 푸름' },
      { id: 'musk', name: '머스크', category: 'base', description: '포근한 도시의 온기' }
    ],
    hotplaceTypes: ['cafe', 'urban'],
    intensity: 4,
    mood: '차가움 속의 따뜻함',
    season: ['spring', 'summer', 'autumn'],
    experience: '콘크리트 사이로 자라나는 식물들의 강인한 생명력',
    image: '/images/scents/urban-jungle.jpg',
    availability: 'available'
  },

  // Marine & Aquatic 계열
  {
    id: 'cliff-village-breeze',
    name: 'Cliff Village Breeze',
    hotplace: '부산 흰여울문화마을',
    description: '절벽 위 마을에서 불어오는 짭짤한 바다 바람과 생활의 향기',
    notes: [
      { id: 'sea-mist', name: '바다 미스트', category: 'top', description: '안개처럼 피어오르는 바다' },
      { id: 'jasmine', name: '자스민', category: 'middle', description: '마을 골목의 꽃향기' },
      { id: 'white-clay', name: '백토', category: 'middle', description: '하얀 집들의 따뜻함' },
      { id: 'salty-wood', name: '솔티 우드', category: 'base', description: '바다에 젖은 나무의 향' }
    ],
    hotplaceTypes: ['coastal', 'unique'],
    intensity: 3,
    mood: '자유롭고 낭만적인',
    season: ['spring', 'summer', 'autumn'],
    experience: '절벽 끝에서 마주하는 끝없는 바다와 삶의 향기',
    image: '/images/scents/cliff-village.jpg',
    availability: 'available'
  },

  // Coffee & Gourmand 계열
  {
    id: 'charcoal-coffee-ritual',
    name: 'Charcoal Coffee Ritual',
    hotplace: '서울 앤트러사이트',
    description: '숯을 테마로 한 공간에서 느끼는 깊고 진한 커피의 의식',
    notes: [
      { id: 'roasted-coffee', name: '로스팅 커피', category: 'top', description: '갓 볶은 커피의 진한 향' },
      { id: 'charcoal', name: '숯', category: 'middle', description: '은은한 숯의 스모키함' },
      { id: 'dark-wood', name: '다크 우드', category: 'middle', description: '깊이 있는 나무의 중후함' },
      { id: 'vanilla', name: '바닐라', category: 'base', description: '부드러운 바닐라의 달콤함' }
    ],
    hotplaceTypes: ['cafe', 'urban'],
    intensity: 5,
    mood: '고요하고 집중적인',
    season: ['autumn', 'winter'],
    experience: '커피 한 잔에 담긴 장인의 정성과 시간의 깊이',
    image: '/images/scents/charcoal-coffee.jpg',
    availability: 'available'
  },

  // Forest & Green 계열
  {
    id: 'pine-ocean-harmony',
    name: 'Pine Ocean Harmony',
    hotplace: '강릉 경포 솔숲',
    description: '수백 년 된 소나무 숲과 동해바다가 만나는 청량한 자연의 향',
    notes: [
      { id: 'pine', name: '소나무', category: 'top', description: '짙은 솔향의 청량함' },
      { id: 'sea-salt', name: '바다 소금', category: 'top', description: '상쾌한 바다의 짠맛' },
      { id: 'moss', name: '이끼', category: 'middle', description: '숲속 이끼의 촉촉함' },
      { id: 'eucalyptus', name: '유칼립투스', category: 'base', description: '시원한 유칼립투스의 여운' }
    ],
    hotplaceTypes: ['nature', 'coastal'],
    intensity: 4,
    mood: '맑고 건강한',
    season: ['spring', 'summer'],
    experience: '피톤치드 가득한 솔숲에서 느끼는 자연의 치유',
    image: '/images/scents/pine-ocean.jpg',
    availability: 'seasonal'
  },

  // Heritage & Classic 계열
  {
    id: 'imperial-heritage',
    name: 'Imperial Heritage',
    hotplace: '서울 덕수궁 석조전',
    description: '대한제국의 품격이 깃든 근대 건축물의 고풍스러운 향',
    notes: [
      { id: 'old-wood', name: '올드우드', category: 'top', description: '오래된 목재의 품격' },
      { id: 'leather', name: '레더', category: 'middle', description: '고급스러운 가죽의 향' },
      { id: 'amber', name: '앰버', category: 'middle', description: '따뜻한 앰버의 포근함' },
      { id: 'powdery', name: '파우더리', category: 'base', description: '은은한 파우더의 우아함' }
    ],
    hotplaceTypes: ['culture', 'unique'],
    intensity: 4,
    mood: '고풍스럽고 품격있는',
    season: ['autumn', 'winter'],
    experience: '100년의 시간이 켜켜이 쌓인 역사의 향기',
    image: '/images/scents/imperial-heritage.jpg',
    availability: 'available'
  }
];

// 향기 카테고리별 분류
export const SCENT_CATEGORIES = {
  fresh: {
    name: 'Fresh & Citrus',
    description: '상쾌하고 시원한 감귤류와 해양의 향',
    scents: ['jeju-ocean-breeze', 'cliff-village-breeze']
  },
  woody: {
    name: 'Woody & Earthy',
    description: '따뜻하고 안정감 있는 나무와 대지의 향',
    scents: ['urban-jungle-dreams', 'pine-ocean-harmony']
  },
  gourmand: {
    name: 'Coffee & Gourmand',
    description: '달콤하고 고소한 음식과 음료의 향',
    scents: ['charcoal-coffee-ritual']
  },
  classic: {
    name: 'Heritage & Classic',
    description: '시간의 깊이가 느껴지는 고전적인 향',
    scents: ['imperial-heritage']
  }
};
