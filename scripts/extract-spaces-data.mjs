/**
 * 🔄 공간 데이터 추출기
 * hotplaces.ts에서 공간 데이터를 추출해서 Python 크롤러용 JSON 생성
 */

import fs from 'fs/promises';
import path from 'path';
import { HOTPLACE_DESTINATIONS } from '../src/data/hotplaces.js';
import { generateImageFileName } from '../src/utils/imageUtils.js';

/**
 * Python 크롤러용 공간 데이터 변환
 */
function convertToSpacesData() {
  return HOTPLACE_DESTINATIONS.map(place => ({
    name: place.name,
    region: place.location.region,
    english_name: generateImageFileName(place.name),
    category: place.category,
    id: place.id
  }));
}

/**
 * JSON 파일로 저장
 */
async function exportSpacesData() {
  try {
    const spacesData = convertToSpacesData();
    const outputPath = path.join(process.cwd(), 'scripts', 'spaces_data.json');
    
    await fs.writeFile(outputPath, JSON.stringify(spacesData, null, 2), 'utf-8');
    
    console.log(`✅ 공간 데이터 추출 완료!`);
    console.log(`📊 총 ${spacesData.length}개 공간 데이터`);
    console.log(`📁 저장 위치: ${outputPath}`);
    
    // 카테고리별 분포 출력
    const categoryCount = spacesData.reduce((acc, space) => {
      acc[space.category] = (acc[space.category] || 0) + 1;
      return acc;
    }, {});
    
    console.log(`📈 카테고리별 분포:`, categoryCount);
    
    return true;
    
  } catch (error) {
    console.error(`❌ 데이터 추출 실패:`, error);
    return false;
  }
}

// 스크립트 실행
exportSpacesData().catch(error => {
  console.error('💥 스크립트 실행 중 오류:', error);
  process.exit(1);
});

export { convertToSpacesData, exportSpacesData }; 