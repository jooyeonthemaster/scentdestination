/**
 * 🔍 실제 공간 데이터 추출기
 * hotplaces.ts에서 이미지 수집에 필요한 정보만 추출
 */

import { HOTPLACE_DESTINATIONS } from '../src/data/hotplaces.js';
import { generateImageFileName } from '../src/utils/imageUtils.js';

/**
 * 이미지 수집을 위한 공간 데이터 추출
 */
export function extractSpacesData() {
  return HOTPLACE_DESTINATIONS.map(place => ({
    name: place.name,
    region: place.location.region,
    category: place.category,
    englishName: generateImageFileName(place.name),
    id: place.id,
    // 검색 키워드 최적화를 위한 추가 정보
    searchTerms: [
      place.name,
      `${place.name} ${place.location.region}`,
      place.category === 'cafe' ? `${place.name} 카페` : place.name,
      // 주소의 동네 이름 추출
      place.location.address?.split(' ').slice(-1)[0]
    ].filter(Boolean)
  }));
}

/**
 * 카테고리별 영문 키워드 매핑
 */
export const CATEGORY_KEYWORDS = {
  'cafe': ['cafe', 'coffee shop', 'coffee house'],
  'nature': ['nature', 'park', 'forest', 'mountain'],
  'culture': ['culture', 'museum', 'gallery', 'palace'],
  'coastal': ['beach', 'coast', 'ocean', 'sea'],
  'urban': ['city', 'urban', 'downtown', 'street'],
  'traditional': ['traditional', 'heritage', 'hanok', 'temple'],
  'village': ['village', 'town', 'neighborhood']
};

/**
 * 지역별 영문 키워드 매핑
 */
export const REGION_KEYWORDS = {
  '서울': ['Seoul', 'South Korea'],
  '제주': ['Jeju Island', 'Jeju', 'South Korea'],
  '부산': ['Busan', 'South Korea'],
  '강원': ['Gangwon', 'Gangneung', 'South Korea'],
  '전주': ['Jeonju', 'South Korea'],
  '경주': ['Gyeongju', 'South Korea'],
  '여수': ['Yeosu', 'South Korea'],
  '속초': ['Sokcho', 'South Korea'],
  '통영': ['Tongyeong', 'South Korea'],
  '담양': ['Damyang', 'South Korea'],
  '안동': ['Andong', 'South Korea']
};

/**
 * 검색 키워드 생성 (Google Maps & Unsplash용)
 */
export function generateSearchKeywords(space) {
  const { name, region, category } = space;
  
  const googleKeywords = [
    `${name} ${region}`, // 정확한 한글 검색
    `${name} 맛집`, // 카페/맛집 검색
    name // 단순 이름 검색
  ];
  
  const unsplashKeywords = [
    // 영문 지역 + 카테고리
    ...REGION_KEYWORDS[region]?.map(regionEn => 
      CATEGORY_KEYWORDS[category]?.map(categoryEn => 
        `${regionEn} ${categoryEn}`
      )
    ).flat().filter(Boolean) || [],
    
    // 한국 + 카테고리
    ...CATEGORY_KEYWORDS[category]?.map(categoryEn => 
      `Korea ${categoryEn}`
    ) || [],
    
    // 지역 특화 키워드
    ...(region === '제주' ? ['Jeju Island scenery', 'Korean island'] : []),
    ...(region === '부산' ? ['Busan coastal', 'Korean port city'] : []),
    ...(region === '서울' ? ['Seoul modern', 'Korean capital'] : [])
  ];
  
  return {
    google: googleKeywords,
    unsplash: unsplashKeywords.slice(0, 5) // API 호출 제한 고려
  };
}

// 데이터 추출 및 검증
const extractedData = extractSpacesData();

console.log(`✅ 총 ${extractedData.length}개 공간 데이터 추출 완료`);
console.log(`📊 카테고리 분포:`, 
  extractedData.reduce((acc, space) => {
    acc[space.category] = (acc[space.category] || 0) + 1;
    return acc;
  }, {})
);

export { extractedData as SPACES_DATA }; 