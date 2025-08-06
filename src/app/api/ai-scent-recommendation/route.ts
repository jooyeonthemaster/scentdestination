import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { hotplaceService } from '@/lib/firebaseService';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

interface ScentRecommendationRequest {
  spaceData: {
    spaceType: 'commercial' | 'residential';
    spaceSize: number;
    spaceCategory: string;
    spaceConcept: string;
  };
  userData: {
    ageGroup: string;
    occupation: string;
    lifestyle: string[];
    preferences: string[];
  };
  purposeData: {
    primaryPurpose: string;
    secondaryPurposes: string[];
    ambiance: string;
  };
  additionalData: {
    existingScents: string;
    timeframe: string;
  };
  imageAnalysis?: string;
}

// 고도화된 전문가급 향기 추천 프롬프트 생성
async function createAdvancedRecommendationPrompt() {
  try {
    console.log('🔥 파이어베이스에서 실제 데이터 가져오는 중...');
    
    // 실제 파이어베이스 데이터 가져오기
    const hotplaces = await hotplaceService.getAll();
    
    console.log('✅ 파이어베이스 데이터 로드 성공:', hotplaces?.length || 0, '개');
    
    // 데이터가 없을 경우 기본값 사용
    if (!hotplaces || hotplaces.length === 0) {
      console.warn('⚠️ 파이어베이스에서 데이터를 가져오지 못했습니다. 기본 데이터를 사용합니다.');
      // 기본 향기 데이터를 여기에 추가할 수 있습니다
    }
    
    return `
당신은 세계적 수준의 후각 전문가이자 공간 향기 컨설턴트입니다. 15년간 럭셔리 브랜드와 고급 호텔의 향기 전략을 담당해온 전문가로서, 심리학, 신경과학, 마케팅학을 바탕으로 과학적이고 전략적인 향기 추천을 제공합니다.

# 분석 데이터베이스
다음은 실제 파이어베이스 DB의 ${hotplaces.length}개 검증된 공간 데이터입니다:

${JSON.stringify(hotplaces, null, 1)}

# 전문가급 분석 미션
다음 단계별로 철저한 분석을 수행하세요:

## 1단계: 사용자 심리 프로파일링
- 제공된 라이프스타일, 연령대, 직업군을 바탕으로 성격 유형 분석
- 향기 선호도 패턴 및 심리적 동기 파악
- 브랜드 지향성 및 소비 성향 분석

## 2단계: 공간 이미지 딥 애널리시스
- 업로드된 이미지의 색채, 조명, 소재, 스타일 분석
- 공간의 분위기 점수 (편안함, 세련됨, 활력, 휴식) 1-10점 채점
- 공간의 기능성과 미적 요소 매칭

## 3단계: DB 매칭 알고리즘
- 71개 공간 데이터에서 유사성 점수 계산
- 향기 노트별 적합성 분석
- 계절성, 지역성, 문화적 맥락 고려

## 4단계: 과학적 근거 제시
- 후각 과학 및 신경과학적 원리 적용
- 심리학적 효과 및 행동 변화 예측
- 마케팅 효과 및 브랜딩 임팩트 분석

다음 JSON 형식으로 상세하게 응답하세요:

{
  "analysisMetadata": {
    "analysisId": "생성할 고유 ID",
    "timestamp": "현재 시간",
    "processingTime": 실제_처리_시간_ms,
    "confidenceLevel": 신뢰도_1to100,
    "dataSourcesUsed": ["firebase_hotplaces", "user_profile", "space_image"]
  },
  
  "userAnalysis": {
    "personalityType": "분석된 성격 유형",
    "lifestyleCategory": "라이프스타일 카테고리",
    "scentPreferenceProfile": {
      "dominantFamily": "주된 향기 계열",
      "secondaryFamily": "보조 향기 계열", 
      "intensityPreference": "light|medium|strong",
      "seasonalAffinity": ["선호 계절들"]
    },
    "psychologicalDrivers": ["심리적 동기 요인들"],
    "brandAffinityLevel": "minimal|moderate|luxury"
  },

  "spaceAnalysis": {
    "colorAnalysis": {
      "dominantColors": ["주요 색상들"],
      "colorTemperature": "warm|cool|neutral",
      "contrastLevel": "low|medium|high",
      "colorHarmony": "색상 조화 분석"
    },
    "styleAnalysis": {
      "designStyle": "디자인 스타일",
      "furnitureStyle": "가구 스타일",
      "decorativeElements": ["장식 요소들"],
      "spatialLayout": "공간 배치 특성"
    },
    "lightingAnalysis": {
      "lightingType": "조명 유형",
      "brightness": "dim|moderate|bright",
      "naturalLight": true/false,
      "ambientMood": "분위기 설명"
    },
    "materialAnalysis": {
      "primaryMaterials": ["주요 소재들"],
      "textureVariety": ["질감 종류들"],
      "surfaceFinishes": ["표면 마감들"]
    },
    "atmosphereScore": {
      "cozyness": 1-10점,
      "sophistication": 1-10점,
      "energy": 1-10점,
      "relaxation": 1-10점
    }
  },

  "recommendedScents": [
    {
      "id": "DB의 실제 향기 ID",
      "name": "향기 이름",
      "suitabilityScore": 1-100점,
      "confidenceLevel": 1-100점,
      
      "matchAnalysis": {
        "personalityMatch": 1-100점,
        "spaceMatch": 1-100점,
        "lifestyleMatch": 1-100점,
        "seasonalMatch": 1-100점,
        "overallReasoning": "상세한 매칭 논리 설명"
      },
      
      "scentProfile": {
        "family": "향기 계열",
        "intensity": 1-10점,
        "longevity": "지속성 설명",
        "sillage": "확산성 설명",
        "notes": {
          "top": [{"name": "노트명", "description": "설명", "percentage": 백분율}],
          "middle": [{"name": "노트명", "description": "설명", "percentage": 백분율}],
          "base": [{"name": "노트명", "description": "설명", "percentage": 백분율}]
        }
      },
      
      "usageGuide": {
        "optimalPlacement": ["최적 위치들"],
        "intensityControl": "강도 조절법",
        "timingRecommendations": ["시간대별 추천"],
        "maintenanceTips": ["관리 팁들"]
      },
      
      "relatedPlaces": [
        {
          "id": "공간 ID",
          "name": "공간명",
          "relevanceScore": 1-100점,
          "sharedCharacteristics": ["공통 특성들"]
        }
      ],
      
      "synergyEffects": {
        "psychologicalBenefits": ["심리적 효과들"],
        "brandingImpact": ["브랜딩 효과들"],
        "customerExperience": ["고객 경험 향상 요소들"]
      }
    }
  ],

  "overallStrategy": {
    "strategicConcept": {
      "mainTheme": "메인 테마",
      "subThemes": ["서브 테마들"],
      "brandingDirection": "브랜딩 방향성",
      "targetEmotions": ["목표 감정들"]
    },
    "implementationPlan": {
      "phasedApproach": [
        {
          "phase": 단계_번호,
          "duration": "기간",
          "actions": ["실행 항목들"],
          "expectedOutcomes": ["기대 효과들"]
        }
      ],
      "budgetConsiderations": {
        "range": "예산 범위",
        "costFactors": ["비용 요인들"],
        "valueProposition": "가치 제안"
      }
    },
    "performanceMetrics": {
      "measurableOutcomes": ["측정 가능한 결과들"],
      "timeframe": "평가 기간",
      "successIndicators": ["성공 지표들"]
    },
    "seasonalAdaptations": {
      "spring": "봄 시즌 조정안",
      "summer": "여름 시즌 조정안", 
      "autumn": "가을 시즌 조정안",
      "winter": "겨울 시즌 조정안"
    }
  },

  "visualConcept": {
    "moodboard": {
      "concept": "무드보드 컨셉",
      "keyVisualElements": ["핵심 시각 요소들"],
      "inspirationSources": ["영감 소스들"]
    },
    "colorStory": {
      "primaryPalette": [{"hex": "#색상코드", "name": "색상명", "emotion": "감정"}],
      "secondaryPalette": [{"hex": "#색상코드", "name": "색상명", "usage": "용도"}],
      "colorHarmony": "색상 조화 설명",
      "psychologicalImpact": "심리적 영향"
    },
    "materialPalette": {
      "primary": [{"name": "소재명", "texture": "질감", "sensoryImpact": "감각적 효과"}],
      "accent": [{"name": "소재명", "usage": "용도", "effect": "효과"}]
    },
    "spatialLayout": {
      "zoning": ["구역 분할"],
      "flowPattern": "동선 패턴",
      "focusPoints": ["포커스 포인트들"]
    }
  },

  "expertInsights": {
    "trendAnalysis": {
      "currentTrends": ["현재 트렌드들"],
      "emergingTrends": ["떠오르는 트렌드들"],
      "futureProjections": ["미래 전망들"]
    },
    "scientificBasis": {
      "olfactoryScience": ["후각 과학 원리들"],
      "psychologyPrinciples": ["심리학 원리들"],
      "neuroscienceInsights": ["신경과학 인사이트들"]
    },
    "industryBenchmarks": {
      "competitorAnalysis": ["경쟁사 분석"],
      "bestPractices": ["베스트 프랙티스들"],
      "differentiationOpportunities": ["차별화 기회들"]
    },
    "customAdvice": {
      "immediateActions": ["즉시 실행 항목들"],
      "longTermStrategy": ["장기 전략들"],
      "potentialChallenges": ["잠재적 도전과제들"],
      "mitigation": ["위험 완화 방안들"]
    }
  },

  "alternativeOptions": {
    "budgetFriendly": [예산_친화적_향기_객체들],
    "luxuryUpgrade": [럭셔리_업그레이드_향기_객체들],
    "seasonalVariations": [계절별_변형_향기_객체들]
  },

  "actionableChecklist": {
    "immediate": [{"task": "업무", "priority": "high|medium|low"}],
    "shortTerm": [{"task": "업무", "timeline": "기간"}],
    "longTerm": [{"task": "업무", "timeline": "기간"}]
  }
}

**중요**: 반드시 실제 DB에 존재하는 향기들만 추천하고, 모든 분석은 과학적 근거와 전문적 인사이트를 바탕으로 해주세요.
`;
  } catch (error) {
    console.error('❌ 파이어베이스 데이터 로드 실패:', error);
    throw new Error('파이어베이스 데이터를 불러올 수 없습니다: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 AI 분석 API 호출됨');
    console.log('📝 GEMINI_API_KEY 존재 여부:', !!process.env.GEMINI_API_KEY);
    console.log('🤖 GenAI 초기화 상태:', !!genAI);
    
    // API 키 확인
    if (!genAI) {
      console.error('❌ Gemini AI 초기화 실패 - API 키:', process.env.GEMINI_API_KEY ? '설정됨' : '미설정');
      return NextResponse.json(
        { error: 'AI 서비스 구성 오류 - Gemini API 키를 확인해주세요' },
        { status: 500 }
      );
    }

    const body: ScentRecommendationRequest = await request.json();

    // 입력 검증
    if (!body.spaceData || !body.userData) {
      return NextResponse.json(
        { error: '필수 정보 누락' },
        { status: 400 }
      );
    }

         // Gemini 2.0 Flash 모델 사용
     const model = genAI.getGenerativeModel({ 
       model: 'gemini-2.0-flash-exp',
       generationConfig: {
         temperature: 0.3,
         topP: 0.8,
         topK: 20,
         maxOutputTokens: 8192,
       }
     });
     
     console.log('✅ Gemini 모델 초기화 성공');

    // 간소화된 프롬프트
    const userPrompt = `
공간: ${body.spaceData.spaceType} ${body.spaceData.spaceCategory} ${body.spaceData.spaceSize}평
컨셉: ${body.spaceData.spaceConcept}
사용자: ${body.userData.ageGroup} ${body.userData.lifestyle.join(',')}
선호향: ${body.userData.preferences.join(',')}
분위기: ${body.purposeData.ambiance}
기존향: ${body.additionalData.existingScents || '없음'}

위 정보로 최적의 향기를 추천해주세요.
`;

     // 간단한 향기 추천 프롬프트
     const simplePrompt = `
당신은 전문 향기 컨설턴트입니다. 사용자의 공간과 취향에 맞는 향기를 추천해주세요.

다음 JSON 형식으로 응답해주세요:
{
  "analysisId": "unique_id",
  "recommendation": {
    "mainScent": {
      "name": "추천 향기 이름",
      "description": "향기 설명",
      "notes": ["탑노트", "미들노트", "베이스노트"],
      "suitability": "왜 이 향기가 적합한지 설명"
    },
    "usageGuide": {
      "placement": "어디에 배치할지",
      "intensity": "강도 조절법",
      "timing": "언제 사용하면 좋은지"
    },
    "alternatives": [
      {
        "name": "대안 향기 1",
        "description": "간단한 설명"
      }
    ]
  }
}`;
     
     const finalPrompt = simplePrompt + '\n\n' + userPrompt;
     console.log('📝 프롬프트 생성 완료');

         // AI 요청
     console.log('🤖 Gemini AI 호출 중...');
     const result = await model.generateContent(finalPrompt);
     console.log('✅ Gemini AI 응답 받음');
     
     const response = await result.response;
     const text = response.text();

         console.log('🤖 AI 응답:', text);

     // 강화된 JSON 파싱
     let jsonMatch = text.match(/\{[\s\S]*\}/);
     if (!jsonMatch) {
       throw new Error('AI 응답에서 JSON을 찾을 수 없습니다');
     }

     let recommendation;
     try {
       recommendation = JSON.parse(jsonMatch[0]);
            } catch (parseError) {
         console.error('❌ JSON 파싱 1차 실패, 복구 시도 중...');
         
         // JSON이 잘린 경우 복구 시도
         let jsonString = jsonMatch[0];
         
         // 마지막에 잘린 부분 찾기
         const lastCommaIndex = jsonString.lastIndexOf(',');
         const lastBraceIndex = jsonString.lastIndexOf('}');
         
         if (lastCommaIndex > lastBraceIndex) {
           // 마지막 콤마 이후를 제거하고 닫는 브레이스 추가
           jsonString = jsonString.substring(0, lastCommaIndex) + '\n}\n}';
         } else if (!jsonString.endsWith('}')) {
           // 닫는 브레이스가 없으면 추가
           jsonString += '\n}\n}';
         }
         
         try {
           recommendation = JSON.parse(jsonString);
           console.log('✅ JSON 복구 성공!');
         } catch (secondError) {
           console.error('❌ JSON 복구도 실패:', secondError);
           throw new Error(`JSON 파싱 실패: ${parseError instanceof Error ? parseError.message : '알 수 없는 오류'}`);
         }
       }
    const analysisId = `ai_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    return NextResponse.json({
      success: true,
      analysisId,
      recommendation,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('🚨 AI 추천 API 전체 오류:', error);
    console.error('🔍 오류 상세:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : '알 수 없는 오류',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    // 특정 오류 유형별 처리
    let errorMessage = '향기 추천 생성 실패';
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('quota') || error.message.includes('limit')) {
        errorMessage = 'AI 서비스 사용량 한도 초과';
        statusCode = 429;
      } else if (error.message.includes('API key') || error.message.includes('authorization')) {
        errorMessage = 'AI 서비스 인증 오류';
        statusCode = 401;
      } else if (error.message.includes('model') || error.message.includes('gemini')) {
        errorMessage = 'AI 모델 접근 오류';
        statusCode = 503;
      } else if (error.message.includes('파이어베이스') || error.message.includes('firebase')) {
        errorMessage = '데이터베이스 연결 오류';
        statusCode = 503;
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: error instanceof Error ? error.message : '알 수 없는 오류',
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
} 