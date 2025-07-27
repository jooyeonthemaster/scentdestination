import { NextRequest, NextResponse } from 'next/server';
import { hotplaceService } from '@/lib/firebaseService';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
    "scentIntensity": "1-10 숫자",
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
`;

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
    const { placeId } = body;

    if (!placeId) {
      return NextResponse.json(
        { 
          success: false, 
          error: '장소 ID가 제공되지 않았습니다.' 
        },
        { status: 400 }
      );
    }

    console.log(`🔍 장소 데이터 조회 중: ${placeId}`);

    // Firebase에서 장소 데이터 가져오기
    const allPlaces = await hotplaceService.getAll();
    const place = allPlaces.find(p => p.id === placeId);

    if (!place) {
      return NextResponse.json(
        { 
          success: false, 
          error: '해당 장소를 찾을 수 없습니다.' 
        },
        { status: 404 }
      );
    }

    console.log(`✅ 장소 데이터 발견: ${place.name}`);

    // Gemini 2.0 Flash 모델 사용
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7, // 창의적이면서도 일관성 있는 결과
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

    console.log('🤖 Gemini API로 데이터 고도화 시작...');
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('✅ Gemini 응답 완료');

    try {
      // JSON 파싱 (코드 블록 제거)
      let cleanedText = text.trim();
      
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      const enhancedData = JSON.parse(cleanedText);

      console.log('✅ 데이터 고도화 완료');

      return NextResponse.json({
        success: true,
        originalData: place,
        enhancedData: enhancedData,
        message: '장소 정보가 성공적으로 고도화되었습니다.'
      });

    } catch (parseError) {
      console.error('JSON 파싱 오류:', parseError);
      console.error('Gemini 응답:', text);
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Gemini에서 올바른 JSON 형식으로 응답하지 않았습니다.',
          details: text 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ 장소 고도화 오류:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: '장소 정보 고도화 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
} 