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
    
    console.log('✅ 파이어베이스 데이터 로드 성공:', hotplaces.length, '개');
    
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
    // API 키 확인
    if (!genAI) {
      return NextResponse.json(
        { error: 'AI 서비스 구성 오류' },
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

         // 고도화된 분석을 위한 Gemini 2.0 Flash 모델
     const model = genAI.getGenerativeModel({ 
       model: 'gemini-2.0-flash-exp',
       generationConfig: {
         temperature: 0.3,
         topP: 0.8,
         topK: 20,
         maxOutputTokens: 8192, // 고도화된 분석을 위해 증가
       }
     });

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

     // 고도화된 전문가급 프롬프트 생성
     const advancedPrompt = await createAdvancedRecommendationPrompt();
     const finalPrompt = advancedPrompt + '\n\n' + userPrompt;

         // AI 요청 (이미지 분석 포함)
     let result;
     if (body.imageAnalysis) {
       // 이미지가 있는 경우 이미지와 함께 분석
       const imagePrompt = `
사용자가 업로드한 공간 이미지를 분석하고, 위 전문가급 향기 추천에 이 이미지 분석 결과를 통합하세요.

이미지 분석 포인트:
- 색상 분석 (주요 색상, 색온도, 대비, 조화)
- 스타일 분석 (디자인 스타일, 가구, 장식 요소)
- 조명 분석 (조명 유형, 밝기, 자연광 여부)
- 소재 분석 (주요 소재, 질감, 표면 마감)
- 분위기 점수 (편안함, 세련됨, 활력, 휴식감 각각 1-10점)

업로드된 이미지: ${body.imageAnalysis}
`;
       result = await model.generateContent([
         finalPrompt + '\n\n' + imagePrompt,
         body.imageAnalysis
       ]);
     } else {
       // 이미지가 없는 경우 텍스트만
       result = await model.generateContent(finalPrompt);
     }
     
     const response = await result.response;
     const text = response.text();

         console.log('🤖 AI 응답:', text);

           // 고도화된 JSON 파싱 및 복구
      let jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('AI 응답에서 JSON을 찾을 수 없습니다');
      }

      let recommendation;
      try {
        recommendation = JSON.parse(jsonMatch[0]);
      } catch (parseError) {
        console.error('❌ JSON 파싱 1차 실패, 고도화된 복구 시도 중...');
        
                 let jsonString = jsonMatch[0];
        
        // 1. 잘린 JSON 복구 전략
        console.log('🔧 JSON 길이:', jsonString.length);
        
        // 2. 불완전한 JSON을 단계적으로 복구
        try {
          // 마지막 완전한 객체까지만 추출
          const openBraces = (jsonString.match(/\{/g) || []).length;
          const closeBraces = (jsonString.match(/\}/g) || []).length;
          const needClosing = openBraces - closeBraces;
          
          console.log(`🔧 열린 브레이스: ${openBraces}, 닫힌 브레이스: ${closeBraces}, 필요한 닫기: ${needClosing}`);
          
          // 마지막 불완전한 부분 제거
          let cleanedJson = jsonString;
          
          // 마지막 쉼표 이후 불완전한 부분 제거
          const lastCommaIndex = cleanedJson.lastIndexOf(',');
          const lastCompleteCloseBrace = cleanedJson.lastIndexOf('}');
          
          if (lastCommaIndex > lastCompleteCloseBrace) {
            // 마지막 쉼표 이후 모든 내용 제거
            cleanedJson = cleanedJson.substring(0, lastCommaIndex);
          }
          
          // 필요한 만큼 닫는 브레이스 추가
          for (let i = 0; i < needClosing; i++) {
            cleanedJson += '\n}';
          }
          
          console.log('🔧 복구된 JSON 길이:', cleanedJson.length);
          
          recommendation = JSON.parse(cleanedJson);
          console.log('✅ 고도화된 JSON 복구 성공!');
          
        } catch (advancedError) {
          console.error('❌ 고도화된 복구도 실패, 간소화된 응답 생성 중...');
          
          // 최후의 수단: 간소화된 응답 생성
          recommendation = {
            analysisMetadata: {
              analysisId: `emergency_${Date.now()}`,
              timestamp: new Date().toISOString(),
              processingTime: 0,
              confidenceLevel: 75,
              dataSourcesUsed: ["firebase_hotplaces", "emergency_fallback"]
            },
            userAnalysis: {
              personalityType: "추출 실패로 인한 기본값",
              lifestyleCategory: "분석 중",
              scentPreferenceProfile: {
                dominantFamily: "Woody",
                secondaryFamily: "Fresh",
                intensityPreference: "medium",
                seasonalAffinity: ["가을", "겨울"]
              },
              psychologicalDrivers: ["편안함", "집중력"],
              brandAffinityLevel: "moderate"
            },
            spaceAnalysis: {
              colorAnalysis: {
                dominantColors: ["베이지", "브라운"],
                colorTemperature: "warm",
                contrastLevel: "medium",
                colorHarmony: "조화로운 톤"
              },
              styleAnalysis: {
                designStyle: "현대적",
                furnitureStyle: "미니멀",
                decorativeElements: ["식물", "조명"],
                spatialLayout: "개방적"
              },
              lightingAnalysis: {
                lightingType: "자연광",
                brightness: "moderate",
                naturalLight: true,
                ambientMood: "편안함"
              },
              materialAnalysis: {
                primaryMaterials: ["목재", "패브릭"],
                textureVariety: ["부드러움", "자연스러움"],
                surfaceFinishes: ["매트", "새틴"]
              },
              atmosphereScore: {
                cozyness: 8,
                sophistication: 7,
                energy: 6,
                relaxation: 9
              }
            },
            recommendedScents: [
              {
                id: "fallback-scent-1",
                name: "조화로운 향기",
                suitabilityScore: 85,
                confidenceLevel: 75,
                matchAnalysis: {
                  personalityMatch: 80,
                  spaceMatch: 85,
                  lifestyleMatch: 80,
                  seasonalMatch: 90,
                  overallReasoning: "AI 응답 복구 실패로 인한 기본 추천입니다. 재분석을 권장합니다."
                },
                scentProfile: {
                  family: "Woody & Fresh",
                  intensity: 6,
                  longevity: "3-4시간",
                  sillage: "중간 확산",
                  notes: {
                    top: [{ name: "베르가못", description: "상쾌한 시트러스", percentage: 30 }],
                    middle: [{ name: "샌달우드", description: "따뜻한 우디", percentage: 40 }],
                    base: [{ name: "머스크", description: "부드러운 마무리", percentage: 30 }]
                  }
                },
                usageGuide: {
                  optimalPlacement: ["거실", "침실"],
                  intensityControl: "디퓨저 리드 개수로 조절",
                  timingRecommendations: ["오후", "저녁"],
                  maintenanceTips: ["월 1회 리드 교체"]
                },
                relatedPlaces: [],
                synergyEffects: {
                  psychologicalBenefits: ["스트레스 완화", "집중력 향상"],
                  brandingImpact: ["편안한 분위기", "전문성"],
                  customerExperience: ["만족도 향상", "재방문 유도"]
                }
              }
            ],
            overallStrategy: {
              strategicConcept: {
                mainTheme: "조화로운 공간 연출",
                subThemes: ["편안함", "자연스러움", "집중"],
                brandingDirection: "프리미엄 웰빙",
                targetEmotions: ["편안함", "안정감"]
              },
              implementationPlan: {
                phasedApproach: [
                  {
                    phase: 1,
                    duration: "1주일",
                    actions: ["향기 디퓨저 설치", "강도 조절"],
                    expectedOutcomes: ["기본 분위기 조성"]
                  }
                ],
                budgetConsiderations: {
                  range: "5-15만원",
                  costFactors: ["디퓨저", "향기 오일"],
                  valueProposition: "공간 품질 향상"
                }
              },
              performanceMetrics: {
                measurableOutcomes: ["분위기 개선", "만족도 증가"],
                timeframe: "1개월",
                successIndicators: ["긍정적 피드백"]
              },
              seasonalAdaptations: {
                spring: "플로럴 노트 강화",
                summer: "시트러스 계열 증가",
                autumn: "우디 베이스 강조",
                winter: "따뜻한 스파이시 노트"
              }
            },
            visualConcept: {
              moodboard: {
                concept: "자연스러운 모던",
                keyVisualElements: ["목재", "자연광", "그린"],
                inspirationSources: ["스칸디나비아", "일본 미니멀"]
              },
              colorStory: {
                primaryPalette: [
                  { hex: "#F5F1EB", name: "크림", emotion: "편안함" },
                  { hex: "#A8B5A0", name: "세이지", emotion: "자연스러움" }
                ],
                secondaryPalette: [
                  { hex: "#E8DDD4", name: "샌드", usage: "포인트" }
                ],
                colorHarmony: "따뜻한 중성 톤",
                psychologicalImpact: "스트레스 완화"
              },
              materialPalette: {
                primary: [
                  { name: "목재", texture: "자연스러운", sensoryImpact: "따뜻함" }
                ],
                accent: [
                  { name: "린넨", usage: "소프트 포인트", effect: "편안함" }
                ]
              },
              spatialLayout: {
                zoning: ["휴식 공간", "작업 공간"],
                flowPattern: "자연스러운 동선",
                focusPoints: ["향기 포인트"]
              }
            },
            expertInsights: {
              trendAnalysis: {
                currentTrends: ["웰빙 공간", "자연주의"],
                emergingTrends: ["개인 맞춤화", "지속가능성"],
                futureProjections: ["AI 기반 향기 조절"]
              },
              scientificBasis: {
                olfactoryScience: ["후각과 감정의 연결"],
                psychologyPrinciples: ["환경 심리학"],
                neuroscienceInsights: ["향기와 기억"]
              },
              industryBenchmarks: {
                competitorAnalysis: ["호텔 브랜딩"],
                bestPractices: ["점진적 도입"],
                differentiationOpportunities: ["개인화"]
              },
              customAdvice: {
                immediateActions: ["기본 향기 도입"],
                longTermStrategy: ["계절별 조정"],
                potentialChallenges: ["개인 취향 차이"],
                mitigation: ["다양한 옵션 제공"]
              }
            },
            alternativeOptions: {
              budgetFriendly: [],
              luxuryUpgrade: [],
              seasonalVariations: []
            },
            actionableChecklist: {
              immediate: [{ task: "디퓨저 구매", priority: "high" }],
              shortTerm: [{ task: "향기 강도 조절", timeline: "1주일" }],
              longTerm: [{ task: "계절별 향기 변경", timeline: "3개월" }]
            }
          };
          
          console.log('🚨 비상 응답 생성 완료');
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
    console.error('🚨 AI 추천 오류:', error);
    
    // API 한도 또는 기타 오류 시 500 반환 (프론트엔드에서 fallback 처리)
    return NextResponse.json(
      { 
        error: '향기 추천 생성 실패',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
} 