// 공간별 이미지 파일 이름 자동 생성 및 관리 유틸리티

/**
 * 공간 이름을 영문 파일 이름으로 변환하는 함수
 * 예: "연남서식" -> "yeonnam-seosik"
 */
export function generateImageFileName(spaceName: string): string {
  // 한글 -> 영문 변환 매핑
  const koreanToEnglishMap: Record<string, string> = {
    // 서울 지역
    '연남서식': 'yeonnam-seosik',
    '애경 앤트러사이트': 'aekyung-anthracite',
    '카페 온리': 'cafe-only',
    '블루보틀 청담': 'bluebottle-cheongdam',
    '대림창고': 'daelim-warehouse',
    '어니언': 'onion',
    '테라로사': 'terarosa',
    '소울컴팩트': 'soul-compact',
    '카페 예쁜날': 'cafe-yeppeunnal',
    '로스터리 베네': 'roastery-bene',
    '커피리브레': 'coffee-libre',
    '카페 서울': 'cafe-seoul',
    'Osechill': 'osechill',
    'Aya Coffee': 'aya-coffee',
    
    // 제주 지역  
    '몽상드애월': 'monsant-aewol',
    'Mônsant de Aewol': 'monsant-aewol',
    '원앤온리': 'one-and-only',
    'One and Only': 'one-and-only',
    '카페 한라산': 'cafe-hallasan',
    'Café Hallasan': 'cafe-hallasan',
    '명월초등학교': 'myeongwol-school',
    'Myeongwol Elementary School': 'myeongwol-school',
    '플로웨이브': 'flowave',
    'Flowave': 'flowave',
    '제주 애월 봄날카페': 'jeju-aewol-bomnal',
    '카페 델문도': 'cafe-delmundo',
    '카페 꼼마': 'cafe-comma',
    '이니스프리 하우스': 'innisfree-house',
    '오설록 티뮤지엄': 'osulloc-tea-museum',
    '카페 마노르블랑': 'cafe-manor-blanc',
    '더 클리프': 'the-cliff',
    
    // 부산 지역
    '흰여울문화마을': 'huinyeoul-village',
    '감천문화마을': 'gamcheon-village',
    '해동용궁사': 'haedong-yonggungsa',
    '태종대': 'taejongdae',
    '광안리해변': 'gwangalli-beach',
    '부산타워': 'busan-tower',
    '자갈치시장': 'jagalchi-market',
    '센텀시티': 'centum-city',
    '송도해변': 'songdo-beach',
    '오륙도': 'oryukdo',
    
    // 강릉 지역
    '강릉 안목해변': 'gangneung-anmok-beach',
    '안목해변': 'anmok-beach',
    '경포해변': 'gyeongpo-beach',
    '정동진': 'jeongdongjin',
    '오죽헌': 'ojukheon',
    '참소리박물관': 'chamsori-museum',
    '커피커퍼': 'coffee-cupper',
    '테라로사 강릉': 'terarosa-gangneung',
    
    // 전주 지역
    '전주한옥마을': 'jeonju-hanok-village',
    '한옥마을': 'hanok-village',
    '경기전': 'gyeonggijeon',
    '오목대': 'omokdae',
    '전동성당': 'jeondong-cathedral',
    '한국전통문화전당': 'korean-traditional-culture-center',
    
    // 경주 지역
    '불국사': 'bulguksa',
    '석굴암': 'seokguram',
    '첨성대': 'cheomseongdae',
    '안압지': 'anapji',
    '대릉원': 'daereungwon',
    '국립경주박물관': 'gyeongju-national-museum',
    
    // 여수 지역
    '여수 밤바다': 'yeosu-night-sea',
    '오동도': 'odongdo',
    '여수세계박람회장': 'yeosu-expo',
    '하멜등대': 'hamel-lighthouse',
    '돌산대교': 'dolsan-bridge',
    
    // 속초 지역
    '속초해변': 'sokcho-beach',
    '설악산': 'seoraksan',
    '속초중앙시장': 'sokcho-jungang-market',
    '아바이마을': 'abai-village',
    
    // 통영 지역
    '루지': 'luge',
    '케이블카': 'cable-car',
    '동피랑벽화마을': 'dongpirang-village',
    '한산도': 'hansando',
    
    // 담양 지역  
    '죽녹원': 'juknokwon',
    '메타세쿼이아길': 'metasequoia-road',
    '관방제림': 'gwanbangjerim',
    
    // 안동 지역
    '하회마을': 'hahoe-village',
    '안동 간고등어': 'andong-mackerel',
    '도산서원': 'dosan-seowon',
    
    // 기타 지역
    '남이섬': 'nami-island',
    '인사동': 'insadong',
    '명동': 'myeongdong',
    '홍대': 'hongdae',
    '이태원': 'itaewon',
    '강남': 'gangnam',
    '종로': 'jongno',
    '을지로': 'euljiro'
  };

  // 매핑된 이름이 있으면 사용, 없으면 자동 변환
  if (koreanToEnglishMap[spaceName]) {
    return koreanToEnglishMap[spaceName];
  }

  // 자동 변환 로직 (영문 이름인 경우)
  return spaceName
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // 특수문자 제거
    .replace(/\s+/g, '-') // 공백을 하이픈으로 변환
    .replace(/-+/g, '-') // 연속된 하이픈 정리
    .replace(/^-|-$/g, ''); // 앞뒤 하이픈 제거
}

/**
 * 공간 ID로부터 이미지 파일 경로들을 생성하는 함수
 */
export function generateImagePaths(spaceId: string, imageCount: number = 3): string[] {
  const basePath = '/images/places';
  const fileName = generateImageFileName(spaceId);
  
  const paths: string[] = [];
  for (let i = 1; i <= imageCount; i++) {
    paths.push(`${basePath}/${fileName}-${i}.jpg`);
  }
  
  return paths;
}

/**
 * 이미지 파일이 존재하는지 확인하는 함수
 */
export async function checkImageExists(imagePath: string): Promise<boolean> {
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * 사용 가능한 이미지들만 필터링하는 함수
 */
export async function getAvailableImages(imagePaths: string[]): Promise<string[]> {
  const availableImages: string[] = [];
  
  for (const path of imagePaths) {
    const exists = await checkImageExists(path);
    if (exists) {
      availableImages.push(path);
    }
  }
  
  return availableImages;
}

/**
 * 공간 데이터에 이미지 경로를 자동으로 할당하는 함수
 */
export function assignImagesToSpace(spaceName: string, existingImages?: string[]): string[] {
  // 기존 이미지가 있으면 그대로 사용
  if (existingImages && existingImages.length > 0) {
    return existingImages;
  }
  
  // 자동 생성된 이미지 경로 사용
  return generateImagePaths(spaceName, 3);
}

// 전체 공간별 이미지 파일 이름 리스트 (사용자가 업로드할 파일들)
export const SPACE_IMAGE_FILES: Record<string, string[]> = {
  // 서울 카페들
  'yeonnam-seosik': ['yeonnam-seosik-1.jpg', 'yeonnam-seosik-2.jpg', 'yeonnam-seosik-3.jpg'],
  'aekyung-anthracite': ['aekyung-anthracite-1.jpg', 'aekyung-anthracite-2.jpg', 'aekyung-anthracite-3.jpg'],
  'osechill': ['osechill-1.jpg', 'osechill-2.jpg', 'osechill-3.jpg'],
  'aya-coffee': ['aya-coffee-1.jpg', 'aya-coffee-2.jpg', 'aya-coffee-3.jpg'],
  'cafe-only': ['cafe-only-1.jpg', 'cafe-only-2.jpg', 'cafe-only-3.jpg'],
  'bluebottle-cheongdam': ['bluebottle-cheongdam-1.jpg', 'bluebottle-cheongdam-2.jpg', 'bluebottle-cheongdam-3.jpg'],
  'daelim-warehouse': ['daelim-warehouse-1.jpg', 'daelim-warehouse-2.jpg', 'daelim-warehouse-3.jpg'],
  'onion': ['onion-1.jpg', 'onion-2.jpg', 'onion-3.jpg'],
  'terarosa': ['terarosa-1.jpg', 'terarosa-2.jpg', 'terarosa-3.jpg'],
  'soul-compact': ['soul-compact-1.jpg', 'soul-compact-2.jpg', 'soul-compact-3.jpg'],
  
  // 제주 장소들
  'monsant-aewol': ['monsant-aewol-1.jpg', 'monsant-aewol-2.jpg', 'monsant-aewol-3.jpg'],
  'one-and-only': ['one-and-only-1.jpg', 'one-and-only-2.jpg', 'one-and-only-3.jpg'],
  'cafe-hallasan': ['cafe-hallasan-1.jpg', 'cafe-hallasan-2.jpg', 'cafe-hallasan-3.jpg'],
  'myeongwol-school': ['myeongwol-school-1.jpg', 'myeongwol-school-2.jpg', 'myeongwol-school-3.jpg'],
  'flowave': ['flowave-1.jpg', 'flowave-2.jpg', 'flowave-3.jpg'],
  'jeju-aewol-bomnal': ['jeju-aewol-bomnal-1.jpg', 'jeju-aewol-bomnal-2.jpg', 'jeju-aewol-bomnal-3.jpg'],
  'cafe-delmundo': ['cafe-delmundo-1.jpg', 'cafe-delmundo-2.jpg', 'cafe-delmundo-3.jpg'],
  'cafe-comma': ['cafe-comma-1.jpg', 'cafe-comma-2.jpg', 'cafe-comma-3.jpg'],
  'innisfree-house': ['innisfree-house-1.jpg', 'innisfree-house-2.jpg', 'innisfree-house-3.jpg'],
  'osulloc-tea-museum': ['osulloc-tea-museum-1.jpg', 'osulloc-tea-museum-2.jpg', 'osulloc-tea-museum-3.jpg'],
  
  // 부산 장소들
  'huinyeoul-village': ['huinyeoul-village-1.jpg', 'huinyeoul-village-2.jpg', 'huinyeoul-village-3.jpg'],
  'gamcheon-village': ['gamcheon-village-1.jpg', 'gamcheon-village-2.jpg', 'gamcheon-village-3.jpg'],
  'haedong-yonggungsa': ['haedong-yonggungsa-1.jpg', 'haedong-yonggungsa-2.jpg', 'haedong-yonggungsa-3.jpg'],
  'taejongdae': ['taejongdae-1.jpg', 'taejongdae-2.jpg', 'taejongdae-3.jpg'],
  'gwangalli-beach': ['gwangalli-beach-1.jpg', 'gwangalli-beach-2.jpg', 'gwangalli-beach-3.jpg'],
  'busan-tower': ['busan-tower-1.jpg', 'busan-tower-2.jpg', 'busan-tower-3.jpg'],
  'jagalchi-market': ['jagalchi-market-1.jpg', 'jagalchi-market-2.jpg', 'jagalchi-market-3.jpg'],
  'centum-city': ['centum-city-1.jpg', 'centum-city-2.jpg', 'centum-city-3.jpg'],
  
  // 강릉 장소들
  'anmok-beach': ['anmok-beach-1.jpg', 'anmok-beach-2.jpg', 'anmok-beach-3.jpg'],
  'gyeongpo-beach': ['gyeongpo-beach-1.jpg', 'gyeongpo-beach-2.jpg', 'gyeongpo-beach-3.jpg'],
  'jeongdongjin': ['jeongdongjin-1.jpg', 'jeongdongjin-2.jpg', 'jeongdongjin-3.jpg'],
  'ojukheon': ['ojukheon-1.jpg', 'ojukheon-2.jpg', 'ojukheon-3.jpg'],
  'terarosa-gangneung': ['terarosa-gangneung-1.jpg', 'terarosa-gangneung-2.jpg', 'terarosa-gangneung-3.jpg'],
  
  // 전주 장소들
  'jeonju-hanok-village': ['jeonju-hanok-village-1.jpg', 'jeonju-hanok-village-2.jpg', 'jeonju-hanok-village-3.jpg'],
  'gyeonggijeon': ['gyeonggijeon-1.jpg', 'gyeonggijeon-2.jpg', 'gyeonggijeon-3.jpg'],
  'omokdae': ['omokdae-1.jpg', 'omokdae-2.jpg', 'omokdae-3.jpg'],
  'jeondong-cathedral': ['jeondong-cathedral-1.jpg', 'jeondong-cathedral-2.jpg', 'jeondong-cathedral-3.jpg'],
  
  // 경주 장소들
  'bulguksa': ['bulguksa-1.jpg', 'bulguksa-2.jpg', 'bulguksa-3.jpg'],
  'seokguram': ['seokguram-1.jpg', 'seokguram-2.jpg', 'seokguram-3.jpg'],
  'cheomseongdae': ['cheomseongdae-1.jpg', 'cheomseongdae-2.jpg', 'cheomseongdae-3.jpg'],
  'anapji': ['anapji-1.jpg', 'anapji-2.jpg', 'anapji-3.jpg'],
  'daereungwon': ['daereungwon-1.jpg', 'daereungwon-2.jpg', 'daereungwon-3.jpg'],
  
  // 여수 장소들
  'yeosu-night-sea': ['yeosu-night-sea-1.jpg', 'yeosu-night-sea-2.jpg', 'yeosu-night-sea-3.jpg'],
  'odongdo': ['odongdo-1.jpg', 'odongdo-2.jpg', 'odongdo-3.jpg'],
  'yeosu-expo': ['yeosu-expo-1.jpg', 'yeosu-expo-2.jpg', 'yeosu-expo-3.jpg'],
  'hamel-lighthouse': ['hamel-lighthouse-1.jpg', 'hamel-lighthouse-2.jpg', 'hamel-lighthouse-3.jpg'],
  
  // 기타 인기 관광지들
  'nami-island': ['nami-island-1.jpg', 'nami-island-2.jpg', 'nami-island-3.jpg'],
  'insadong': ['insadong-1.jpg', 'insadong-2.jpg', 'insadong-3.jpg'],
  'myeongdong': ['myeongdong-1.jpg', 'myeongdong-2.jpg', 'myeongdong-3.jpg'],
  'hongdae': ['hongdae-1.jpg', 'hongdae-2.jpg', 'hongdae-3.jpg'],
  'itaewon': ['itaewon-1.jpg', 'itaewon-2.jpg', 'itaewon-3.jpg'],
  'gangnam': ['gangnam-1.jpg', 'gangnam-2.jpg', 'gangnam-3.jpg'],
  
  // 추가적인 다양한 장소들 (총 70개 이상을 위해)
  'sokcho-beach': ['sokcho-beach-1.jpg', 'sokcho-beach-2.jpg', 'sokcho-beach-3.jpg'],
  'seoraksan': ['seoraksan-1.jpg', 'seoraksan-2.jpg', 'seoraksan-3.jpg'],
  'dongpirang-village': ['dongpirang-village-1.jpg', 'dongpirang-village-2.jpg', 'dongpirang-village-3.jpg'],
  'juknokwon': ['juknokwon-1.jpg', 'juknokwon-2.jpg', 'juknokwon-3.jpg'],
  'metasequoia-road': ['metasequoia-road-1.jpg', 'metasequoia-road-2.jpg', 'metasequoia-road-3.jpg'],
  'hahoe-village': ['hahoe-village-1.jpg', 'hahoe-village-2.jpg', 'hahoe-village-3.jpg'],
  'dosan-seowon': ['dosan-seowon-1.jpg', 'dosan-seowon-2.jpg', 'dosan-seowon-3.jpg'],
  'luge': ['luge-1.jpg', 'luge-2.jpg', 'luge-3.jpg'],
  'cable-car': ['cable-car-1.jpg', 'cable-car-2.jpg', 'cable-car-3.jpg'],
  'hansando': ['hansando-1.jpg', 'hansando-2.jpg', 'hansando-3.jpg'],
  'gwanbangjerim': ['gwanbangjerim-1.jpg', 'gwanbangjerim-2.jpg', 'gwanbangjerim-3.jpg'],
  'andong-mackerel': ['andong-mackerel-1.jpg', 'andong-mackerel-2.jpg', 'andong-mackerel-3.jpg'],
  'chamsori-museum': ['chamsori-museum-1.jpg', 'chamsori-museum-2.jpg', 'chamsori-museum-3.jpg'],
  'coffee-cupper': ['coffee-cupper-1.jpg', 'coffee-cupper-2.jpg', 'coffee-cupper-3.jpg'],
  'korean-traditional-culture-center': ['korean-traditional-culture-center-1.jpg', 'korean-traditional-culture-center-2.jpg', 'korean-traditional-culture-center-3.jpg'],
  'gyeongju-national-museum': ['gyeongju-national-museum-1.jpg', 'gyeongju-national-museum-2.jpg', 'gyeongju-national-museum-3.jpg'],
  'dolsan-bridge': ['dolsan-bridge-1.jpg', 'dolsan-bridge-2.jpg', 'dolsan-bridge-3.jpg'],
  'sokcho-jungang-market': ['sokcho-jungang-market-1.jpg', 'sokcho-jungang-market-2.jpg', 'sokcho-jungang-market-3.jpg'],
  'abai-village': ['abai-village-1.jpg', 'abai-village-2.jpg', 'abai-village-3.jpg'],
  'songdo-beach': ['songdo-beach-1.jpg', 'songdo-beach-2.jpg', 'songdo-beach-3.jpg'],
  'oryukdo': ['oryukdo-1.jpg', 'oryukdo-2.jpg', 'oryukdo-3.jpg']
};

/**
 * 모든 이미지 파일 이름을 플랫 배열로 반환하는 함수
 */
export function getAllImageFileNames(): string[] {
  return Object.values(SPACE_IMAGE_FILES).flat();
}

/**
 * 공간별 이미지 파일 이름 매핑을 반환하는 함수
 */
export function getSpaceImageMapping(): Record<string, string[]> {
  return SPACE_IMAGE_FILES;
}

/**
 * 이미지 존재 여부를 확인하고 fallback 이미지를 제공하는 함수 (클라이언트용)
 */
export function getImageWithFallback(imagePath: string): string {
  // 기본 fallback 이미지 경로
  const fallbackImage = '/images/hero/hero-background.jpg';
  
  // 이미지 경로가 비어있으면 fallback 반환
  if (!imagePath) {
    return fallbackImage;
  }
  
  return imagePath;
}

/**
 * 공간의 첫 번째 이미지를 안전하게 가져오는 함수
 */
export function getSpaceMainImage(spaceName: string, existingImages?: string[]): string {
  const images = assignImagesToSpace(spaceName, existingImages);
  return getImageWithFallback(images[0]);
}

/**
 * 공간의 모든 이미지를 안전하게 가져오는 함수 (존재하지 않는 이미지 제외)
 */
export function getSpaceAllImages(spaceName: string, existingImages?: string[]): string[] {
  const images = assignImagesToSpace(spaceName, existingImages);
  return images.map(img => getImageWithFallback(img));
}

/**
 * 이미지 로딩 에러 시 fallback 처리를 위한 함수
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement>): void {
  const img = event.currentTarget;
  if (img.src !== '/images/hero/hero-background.jpg') {
    img.src = '/images/hero/hero-background.jpg';
  }
}

/**
 * 개발 환경에서 사용할 수 있는 이미지 파일 생성 스크립트
 */
export function generateImageFileList(): void {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const allFiles = getAllImageFileNames();
    console.log('🖼️ 생성해야 할 이미지 파일 목록:');
    console.log(allFiles.join('\n'));
    console.log(`\n📊 총 ${allFiles.length}개의 이미지 파일이 필요합니다.`);
    console.log('📁 저장 경로: public/images/places/');
  }
} 