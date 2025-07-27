import { NextRequest, NextResponse } from 'next/server';
import { hotplaceService } from '@/lib/firebaseService';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { EnhancedPlaceData } from '@/types';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

const ENHANCEMENT_PROMPT = `
당신은 향기 여행 전문가이자 공간 큐레이터입니다. 주어진 장소 정보를 바탕으로 더욱 상세하고 전문적인 정보를 생성해주세요.

다음 형식으로 JSON을 반환해주세요:

{
  "enhancedDescription": "더욱 상세하고 감성적인 공간 설명 (200-300자)",
  "detailedScentProfile": {
    "topNotes": ["상위 노트 3-4개"],
    "middleNotes": ["중간 노트 3-4개"], 
    "baseNotes": ["베이스 노트 2-3개"],
    "scentIntensity": 7,
    "scentDuration": "향의 지속 시간 (예: 2-3시간)",
    "seasonalRecommendation": "추천 계절"
  },
  "atmosphereDetails": {
    "visualElements": ["시각적 특징 4-5개"],
    "soundscape": ["청각적 특징 2-3개"],
    "tactileElements": ["촉각적 특징 2-3개"],
    "overallMood": "전체적인 분위기 한 줄 요약"
  },
  "visitExperience": {
    "bestTimeToVisit": "방문 최적 시간대와 이유",
    "averageStayDuration": "평균 머무는 시간",
    "crowdLevel": "혼잡도 (조용함/보통/북적임)",
    "photoSpots": ["포토존 2-3곳"],
    "insiderTips": ["현지인만 아는 팁 2-3개"]
  },
  "scentJourneyStory": "이 공간만의 향기 스토리를 담은 감성적인 글 (300-400자)",
  "nearbyRecommendations": [
    {
      "name": "근처 추천 장소 이름",
      "type": "카테고리",
      "description": "간단한 설명",
      "walkingTime": "도보 시간"
    }
  ],
  "pairingRecommendations": {
    "perfumes": ["이 공간과 어울리는 향수 2-3개"],
    "candles": ["이 공간과 어울리는 캔들 향 2-3개"],
    "music": ["이 공간에서 들으면 좋은 음악 장르 또는 아티스트 2-3개"]
  }
}

주의사항:
- 실제 장소의 특성을 반영해서 현실적으로 작성
- 향에 대한 전문적이고 구체적인 표현 사용
- 감성적이면서도 정보성이 있는 텍스트
- JSON 형식을 정확히 준수
- 코드 블록 사용하지 않고 순수 JSON만 반환
- scentIntensity는 반드시 숫자로 반환 (문자열 아님)
`;

async function enhancePlace(place: any, retryCount: number = 0): Promise<{ success: boolean; data?: EnhancedPlaceData; error?: string }> {
  if (!genAI) {
    return { success: false, error: 'Gemini API 키가 설정되지 않았습니다.' };
  }

  const maxRetries = 2;
  
  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 4096,
      }
    });

    const prompt = `${ENHANCEMENT_PROMPT}

장소 정보:
이름: ${place.name}
카테고리: ${place.category}
위치: ${place.location.region}, ${place.location.address}
기본 설명: ${place.description}
특징: ${place.specialFeature}
분위기: ${place.atmosphere}
기존 향기 정보: ${place.signatureScent.name} - ${place.signatureScent.notes.join(', ')} - ${place.signatureScent.experience}
방문 정보: ${JSON.stringify(place.visitInfo)}
태그: ${place.tags?.join(', ') || '없음'}

위 정보를 바탕으로 더욱 상세하고 전문적인 정보를 생성해주세요.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // JSON 파싱 (코드 블록 제거)
    let cleanedText = text.trim();
    
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      const enhancedData = JSON.parse(cleanedText);
      
      // 데이터 검증
      if (!enhancedData.enhancedDescription || !enhancedData.detailedScentProfile) {
        throw new Error('필수 필드가 누락된 응답');
      }
      
      // scentIntensity가 숫자인지 확인
      if (typeof enhancedData.detailedScentProfile.scentIntensity !== 'number') {
        enhancedData.detailedScentProfile.scentIntensity = parseInt(enhancedData.detailedScentProfile.scentIntensity) || 7;
      }
      
      return { success: true, data: enhancedData };
    } catch (parseError) {
      const errorMsg = `JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : '알 수 없는 오류'}`;
      console.error(`  ❌ ${place.name} - ${errorMsg}`);
      console.error(`  📄 Gemini 응답 (처음 500자):`, cleanedText.substring(0, 500));
      
      if (retryCount < maxRetries) {
        console.log(`  🔄 ${place.name} - 재시도 ${retryCount + 1}/${maxRetries}`);
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2초 대기
        return enhancePlace(place, retryCount + 1);
      }
      
      return { success: false, error: errorMsg };
    }

  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
    console.error(`  ❌ ${place.name} - API 호출 실패: ${errorMsg}`);
    
    // 쿼터 초과 에러 특별 처리
    if (errorMsg.includes('exceeded your current quota') || errorMsg.includes('quota')) {
      const quotaError = 'Gemini API 일일 쿼터 한도 초과 (무료 티어: 50개/일). 내일 자정(PST) 이후 다시 시도하거나 유료 플랜으로 업그레이드 필요.';
      console.error(`  🚫 ${place.name} - 쿼터 한도 초과`);
      return { success: false, error: quotaError };
    }
    
    // 특정 오류에 대한 재시도 (쿼터 오류 제외)
    if (retryCount < maxRetries && (errorMsg.includes('rate') || errorMsg.includes('timeout'))) {
      console.log(`  �� ${place.name} - 재시도 ${retryCount + 1}/${maxRetries} (${errorMsg})`);
      const waitTime = (retryCount + 1) * 3000; // 점진적 대기 시간 증가
      await new Promise(resolve => setTimeout(resolve, waitTime));
      return enhancePlace(place, retryCount + 1);
    }
    
    return { success: false, error: errorMsg };
  }
}

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  try {
    if (!genAI) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gemini API 키가 설정되지 않았습니다.' 
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { onlyFailed = false, checkOnly = false } = body; // 실패한 것만 다시 처리할지 여부, 개수만 확인할지 여부

    console.log(`🚀 ${checkOnly ? '실패한 데이터 개수 확인' : onlyFailed ? '실패한 장소만' : '모든 장소'} 데이터 배치 고도화 시작...`);

    // 모든 장소 데이터 가져오기
    const allPlaces = await hotplaceService.getAll();
    
    if (allPlaces.length === 0) {
      return NextResponse.json({
        success: false,
        error: '처리할 장소 데이터가 없습니다.'
      });
    }

    // 필터링: 실패한 것만 또는 전체
    const targetPlaces = onlyFailed 
      ? allPlaces.filter(place => !place.enhancedData)
      : allPlaces;

    if (targetPlaces.length === 0) {
      return NextResponse.json({
        success: true,
        message: '처리할 장소가 없습니다. 모든 장소가 이미 고도화되었습니다.',
        stats: { totalProcessed: 0, totalSuccessful: 0, totalFailed: 0, successRate: 100, totalToProcess: 0 }
      });
    }

    // 개수만 확인하는 경우
    if (checkOnly) {
      return NextResponse.json({
        success: true,
        message: `확인 완료: ${targetPlaces.length}개의 미처리 데이터가 있습니다.`,
        stats: { 
          totalToProcess: targetPlaces.length,
          totalProcessed: 0, 
          totalSuccessful: 0, 
          totalFailed: 0, 
          successRate: 0 
        }
      });
    }

    console.log(`📊 대상 장소: ${targetPlaces.length}개 (전체: ${allPlaces.length}개)`);

    // 배치 처리 시작 전 쿼터 상태 확인
    if (!checkOnly) {
      console.log(`🔍 API 쿼터 상태 확인 중...`);
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
        const testResult = await model.generateContent('안녕하세요');
        console.log(`✅ API 쿼터 상태 정상 - 배치 처리 시작`);
      } catch (testError) {
        const testErrorMsg = testError instanceof Error ? testError.message : '알 수 없는 오류';
        if (testErrorMsg.includes('exceeded your current quota') || testErrorMsg.includes('quota')) {
          console.error(`🚫 API 쿼터 한도 초과 감지`);
          return NextResponse.json({
            success: false,
            error: '⚠️ Gemini API 일일 쿼터 한도 초과\n\n무료 티어는 하루 50개 요청으로 제한됩니다.\n\n해결 방법:\n1. 내일 자정(PST) 이후 다시 시도\n2. Google AI Studio에서 유료 플랜 업그레이드\n3. 더 적은 수의 데이터로 테스트',
            details: '일일 쿼터: 50개 요청 초과'
          });
        }
        console.warn(`⚠️ API 테스트 실패, 계속 진행: ${testErrorMsg}`);
      }
    }

    const batchSize = 3; // 배치 크기를 줄여서 안정성 증대
    const batches = [];
    
    for (let i = 0; i < targetPlaces.length; i += batchSize) {
      batches.push(targetPlaces.slice(i, i + batchSize));
    }

    console.log(`�� ${batches.length}개의 배치로 나누어 처리 (배치당 ${batchSize}개)`);

    let totalProcessed = 0;
    let totalSuccessful = 0;
    let totalFailed = 0;
    const failedPlaces: Array<{ name: string; error: string }> = [];

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];
      console.log(`\n📦 배치 ${batchIndex + 1}/${batches.length} 처리 중... (${batch.length}개 장소)`);

      // 배치 내 모든 장소를 병렬로 처리
      const enhancePromises = batch.map(async (place) => {
        try {
          console.log(`  🔍 ${place.name} 고도화 중...`);
          const result = await enhancePlace(place);
          
          if (result.success && result.data) {
            // Firebase에 고도화된 데이터 저장
            await hotplaceService.update(place.id, {
              enhancedData: result.data
            });
            console.log(`  ✅ ${place.name} 완료`);
            return { success: true, name: place.name };
          } else {
            console.log(`  ❌ ${place.name} 실패: ${result.error}`);
            failedPlaces.push({ name: place.name, error: result.error || '알 수 없는 오류' });
            return { success: false, name: place.name, error: result.error };
          }
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : '알 수 없는 오류';
          console.error(`  ❌ ${place.name} 예상치 못한 오류:`, errorMsg);
          failedPlaces.push({ name: place.name, error: errorMsg });
          return { success: false, name: place.name, error: errorMsg };
        }
      });

      const batchResults = await Promise.all(enhancePromises);
      
      const batchSuccessful = batchResults.filter(r => r.success).length;
      const batchFailed = batchResults.filter(r => !r.success).length;
      
      totalProcessed += batch.length;
      totalSuccessful += batchSuccessful;
      totalFailed += batchFailed;

      console.log(`📊 배치 ${batchIndex + 1} 완료: 성공 ${batchSuccessful}개, 실패 ${batchFailed}개`);
      console.log(`📈 전체 진행률: ${totalProcessed}/${targetPlaces.length} (${Math.round(totalProcessed / targetPlaces.length * 100)}%)`);

      // 다음 배치 처리 전 대기 시간 증가 (안정성 향상)
      if (batchIndex < batches.length - 1) {
        const waitTime = 5000; // 5초로 증가
        console.log(`⏱️  다음 배치 처리를 위해 ${waitTime/1000}초 대기...`);
        await delay(waitTime);
      }
    }

    console.log('\n🎉 모든 배치 처리 완료!');
    console.log(`📊 최종 결과: 총 ${totalProcessed}개 처리, 성공 ${totalSuccessful}개, 실패 ${totalFailed}개`);

    if (failedPlaces.length > 0) {
      console.log('\n❌ 실패한 장소들:');
      failedPlaces.forEach(failed => {
        console.log(`  - ${failed.name}: ${failed.error}`);
      });
    }

    return NextResponse.json({
      success: true,
      message: `배치 고도화 완료: ${totalSuccessful}개 성공, ${totalFailed}개 실패`,
      stats: {
        totalProcessed,
        totalSuccessful,
        totalFailed,
        successRate: Math.round((totalSuccessful / totalProcessed) * 100),
        failedPlaces: failedPlaces
      }
    });

  } catch (error) {
    console.error('❌ 배치 고도화 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '배치 고도화 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
} 