/**
 * 🌸 SCENT DESTINATION 이미지 자동 수집 스크립트
 * Google Maps API + Unsplash API를 활용한 스마트 이미지 수집기
 */

import fs from 'fs/promises';
import path from 'path';
import fetch from 'node-fetch';
import { generateImageFileName } from '../src/utils/imageUtils.js';
import { SPACES_DATA, generateSearchKeywords } from './data-extractor.js';

// API 키 설정 (환경변수에서 가져오기)
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

/**
 * Google Maps Places API로 장소 사진 가져오기
 */
async function getGoogleMapsPhotos(spaceName, region) {
  try {
    const query = `${spaceName} ${region}`;
    
    // 1단계: Places Text Search로 장소 찾기
    const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${GOOGLE_MAPS_API_KEY}`;
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();
    
    if (!searchData.results || searchData.results.length === 0) {
      console.log(`❌ Google Maps에서 "${spaceName}" 검색 결과 없음`);
      return [];
    }
    
    const place = searchData.results[0];
    
    // 2단계: Place Details로 사진 정보 가져오기
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=photos&key=${GOOGLE_MAPS_API_KEY}`;
    const detailsResponse = await fetch(detailsUrl);
    const detailsData = await detailsResponse.json();
    
    if (!detailsData.result?.photos) {
      console.log(`📷 "${spaceName}"의 Google Maps 사진 없음`);
      return [];
    }
    
    // 3단계: 사진 URL 생성 (최대 3장)
    const photos = detailsData.result.photos.slice(0, 3);
    const photoUrls = photos.map(photo => 
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photo_reference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
    );
    
    console.log(`✅ Google Maps에서 "${spaceName}" 사진 ${photoUrls.length}장 발견`);
    return photoUrls;
    
  } catch (error) {
    console.error(`❌ Google Maps API 오류 (${spaceName}):`, error.message);
    return [];
  }
}

/**
 * Unsplash API로 관련 이미지 검색
 */
async function getUnsplashPhotos(spaceName, region, category) {
  try {
    // 키워드 조합 생성
    const keywords = [
      `${spaceName} ${region}`,
      `${region} ${category}`,
      `Korea ${category} ${region}`,
      `Korean ${category}`
    ];
    
    const photos = [];
    
    for (const keyword of keywords) {
      if (photos.length >= 3) break;
      
      const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=5&orientation=landscape`;
      const response = await fetch(url, {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      });
      
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        // 고해상도 이미지 URL 추출
        const newPhotos = data.results
          .slice(0, 3 - photos.length)
          .map(photo => photo.urls.regular);
        
        photos.push(...newPhotos);
        console.log(`🎨 Unsplash에서 "${keyword}" 키워드로 ${newPhotos.length}장 추가`);
      }
    }
    
    return photos.slice(0, 3);
    
  } catch (error) {
    console.error(`❌ Unsplash API 오류 (${spaceName}):`, error.message);
    return [];
  }
}

/**
 * 이미지 다운로드 및 저장
 */
async function downloadImage(imageUrl, filePath) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const buffer = await response.buffer();
    await fs.writeFile(filePath, buffer);
    
    console.log(`💾 이미지 저장 완료: ${path.basename(filePath)}`);
    return true;
    
  } catch (error) {
    console.error(`❌ 이미지 다운로드 실패 (${filePath}):`, error.message);
    return false;
  }
}

/**
 * 단일 공간의 이미지 수집 및 저장
 */
async function collectImagesForSpace(space) {
  console.log(`\n🎯 "${space.name}" 이미지 수집 시작...`);
  
  const englishFileName = generateImageFileName(space.name);
  const outputDir = path.join(process.cwd(), 'public', 'images', 'places');
  
  // 출력 디렉토리 생성
  await fs.mkdir(outputDir, { recursive: true });
  
  let collectedImages = [];
  
  // 1순위: Google Maps API로 실제 장소 사진 수집
  if (GOOGLE_MAPS_API_KEY) {
    const googlePhotos = await getGoogleMapsPhotos(space.name, space.region);
    collectedImages.push(...googlePhotos);
  }
  
  // 2순위: 부족한 이미지를 Unsplash로 보완
  if (collectedImages.length < 3 && UNSPLASH_ACCESS_KEY) {
    const unsplashPhotos = await getUnsplashPhotos(space.name, space.region, space.category);
    const needed = 3 - collectedImages.length;
    collectedImages.push(...unsplashPhotos.slice(0, needed));
  }
  
  // 이미지 다운로드 및 저장
  const downloadPromises = collectedImages.map(async (imageUrl, index) => {
    const fileName = `${englishFileName}-${index + 1}.jpg`;
    const filePath = path.join(outputDir, fileName);
    
    return await downloadImage(imageUrl, filePath);
  });
  
  const results = await Promise.all(downloadPromises);
  const successCount = results.filter(Boolean).length;
  
  console.log(`✨ "${space.name}" 완료: ${successCount}/3 이미지 수집`);
  return successCount;
}

/**
 * 전체 이미지 수집 프로세스 실행
 */
async function runImageCollection() {
  console.log('🚀 SCENT DESTINATION 이미지 자동 수집 시작!\n');
  console.log(`📊 총 ${SPACES_DATA.length}개 공간 × 3장 = ${SPACES_DATA.length * 3}장 수집 예정\n`);
  
  // API 키 확인
  if (!GOOGLE_MAPS_API_KEY && !UNSPLASH_ACCESS_KEY) {
    console.error('❌ API 키가 설정되지 않았습니다. 환경변수를 확인해주세요.');
    return;
  }
  
  let totalSuccess = 0;
  let totalAttempted = 0;
  
  // 각 공간별로 순차 처리 (API 호출 제한 고려)
  for (const space of SPACES_DATA) {
    const successCount = await collectImagesForSpace(space);
    totalSuccess += successCount;
    totalAttempted += 3;
    
    // API 호출 제한을 위한 딜레이 (1초)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n🎉 이미지 수집 완료!');
  console.log(`📈 성공률: ${totalSuccess}/${totalAttempted} (${Math.round(totalSuccess/totalAttempted*100)}%)`);
  console.log(`📁 저장 위치: public/images/places/`);
  console.log('\n💡 다음 단계:');
  console.log('1. 수집된 이미지들을 확인하세요');
  console.log('2. 품질이 낮은 이미지들을 수동으로 교체하세요');
  console.log('3. npm run dev로 개발서버를 시작해서 결과를 확인하세요');
}

/**
 * 스크립트 실행부
 */
if (import.meta.url === `file://${process.argv[1]}`) {
  runImageCollection().catch(error => {
    console.error('💥 스크립트 실행 중 오류:', error);
    process.exit(1);
  });
}

export { runImageCollection, collectImagesForSpace }; 