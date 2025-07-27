'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { SCENT_COLLECTIONS } from '@/data/scents';
import { HOTPLACE_DESTINATIONS } from '@/data/hotplaces';
import { AdvancedAIRecommendation } from '@/types/ai-recommendation';

// 기존 구조와의 호환성을 위한 인터페이스 (임시)
interface LegacyRecommendedScent {
  id: string;
  name: string;
  scentFamily: string;
  suitabilityScore: string;
  matchReason: string;
  usageRecommendation: string;
  alternativeOptions: string[];
}

interface LegacyOverallStrategy {
  mainConcept: string;
  keyConsiderations: string[];
  seasonalAdjustments: string;
  diffuserRecommendation: {
    type: string;
    placement: string[];
    quantity: string;
  };
}

interface LegacyVisualConcept {
  moodboard: string;
  colorPalette: string[];
  materials: string[];
}

interface LegacyAIRecommendation {
  recommendedScents: LegacyRecommendedScent[];
  overallStrategy: LegacyOverallStrategy;
  personalizedAdvice: string;
  visualConcept: LegacyVisualConcept;
}

// 통합 타입 (고도화된 구조 또는 기존 구조)
type AIRecommendation = AdvancedAIRecommendation | LegacyAIRecommendation;

// 고도화된 구조인지 확인하는 헬퍼 함수
function isAdvancedRecommendation(rec: AIRecommendation): rec is AdvancedAIRecommendation {
  return 'analysisMetadata' in rec && 'userAnalysis' in rec && 'spaceAnalysis' in rec;
}

function AiScentRecommendationResultContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedScent, setSelectedScent] = useState<any>(null); // 임시로 any 타입 사용
  const [showDetails, setShowDetails] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'places' | 'analysis' | 'strategy' | 'visual' | 'insights'>('overview');

  useEffect(() => {
    const analysisId = searchParams.get('id');
    if (!analysisId) {
      router.push('/ai-scent-recommendation');
      return;
    }

    // sessionStorage에서 추천 결과 가져오기
    const storedResult = sessionStorage.getItem(`ai_recommendation_${analysisId}`);
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      const recData = parsedResult.recommendation;
      setRecommendation(recData);
      
      // 데이터 구조에 따라 첫 번째 향기 설정
      if (isAdvancedRecommendation(recData)) {
        // 고도화된 구조
        if (recData.recommendedScents && recData.recommendedScents.length > 0) {
          setSelectedScent(recData.recommendedScents[0]);
        }
      } else {
        // 기존 구조
        if (recData.recommendedScents && recData.recommendedScents.length > 0) {
          setSelectedScent(recData.recommendedScents[0]);
        }
      }
      
      setIsLoading(false);
    } else {
      // sessionStorage에 데이터가 없으면 온보딩 페이지로 리다이렉트
      console.warn('⚠️ 추천 데이터를 찾을 수 없습니다. 온보딩 페이지로 이동합니다.');
      router.push('/ai-scent-recommendation');
      return;
    }
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-sand to-latte">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-charcoal">AI가 맞춤 향기를 분석하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (!recommendation) {
    return null;
  }

  // 고도화된 구조인지 확인
  const isAdvanced = isAdvancedRecommendation(recommendation);
  
  // 향기 목록 추출
  const scents = recommendation.recommendedScents || [];
  
  // 첫 번째 향기가 선택되지 않았다면 설정
  if (!selectedScent && scents.length > 0) {
    setSelectedScent(scents[0]);
    return null; // 리렌더링 대기
  }

  // DB에서 선택된 향기의 상세 정보 가져오기
  const scentDetail = selectedScent ? SCENT_COLLECTIONS.find(s => s.id === selectedScent.id) : null;
  const relatedPlaces = scentDetail ? HOTPLACE_DESTINATIONS.filter(place => 
    place.signatureScent.name === scentDetail?.name
  ) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sand to-latte">
      {/* 헤더 */}
      <div className="bg-white/95 backdrop-blur-md shadow-lg mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal">
                {isAdvanced ? '전문가급 AI 향기 분석 결과' : 'AI 향기 추천 결과'}
              </h1>
              <p className="text-charcoal/60 mt-1">
                {isAdvanced 
                  ? '심리학, 신경과학, 마케팅학 기반 과학적 분석' 
                  : '당신의 공간을 위한 맞춤 향기'
                }
              </p>
            </div>
            <Link
              href="/ai-scent-recommendation"
              className="px-6 py-3 bg-sage text-white rounded-full hover:bg-sage/90 transition-colors"
            >
              다시 분석하기
            </Link>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {isAdvanced ? (
          <AdvancedResultDisplay 
            recommendation={recommendation as AdvancedAIRecommendation}
            selectedScent={selectedScent}
            setSelectedScent={setSelectedScent}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        ) : (
          <LegacyResultDisplay 
            recommendation={recommendation as LegacyAIRecommendation}
            selectedScent={selectedScent}
            setSelectedScent={setSelectedScent}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            scentDetail={scentDetail}
            relatedPlaces={relatedPlaces}
          />
        )}
      </div>
    </div>
  );
}

// 고도화된 결과 표시 컴포넌트
function AdvancedResultDisplay({
  recommendation,
  selectedScent,
  setSelectedScent,
  activeTab,
  setActiveTab
}: {
  recommendation: AdvancedAIRecommendation;
  selectedScent: any;
  setSelectedScent: (scent: any) => void;
  activeTab: string;
  setActiveTab: (tab: 'overview' | 'details' | 'places' | 'analysis' | 'strategy' | 'visual' | 'insights') => void;
}) {
  if (!selectedScent) return null;

  return (
    <div className="space-y-8">
      {/* 분석 메타데이터 */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-charcoal">분석 정보</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-sage">{recommendation.analysisMetadata?.confidenceLevel}%</div>
            <div className="text-sm text-charcoal/60">신뢰도</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-sage/10 rounded-lg">
            <div className="text-lg font-semibold text-charcoal">{recommendation.analysisMetadata?.processingTime}ms</div>
            <div className="text-sm text-charcoal/60">처리 시간</div>
          </div>
          <div className="text-center p-4 bg-terracotta/10 rounded-lg">
            <div className="text-lg font-semibold text-charcoal">{recommendation.recommendedScents?.length || 0}개</div>
            <div className="text-sm text-charcoal/60">추천 향기</div>
          </div>
          <div className="text-center p-4 bg-gold/10 rounded-lg">
            <div className="text-lg font-semibold text-charcoal">{recommendation.spaceAnalysis?.atmosphereScore?.sophistication}/10</div>
            <div className="text-sm text-charcoal/60">세련도</div>
          </div>
          <div className="text-center p-4 bg-amber/10 rounded-lg">
            <div className="text-lg font-semibold text-charcoal">{recommendation.spaceAnalysis?.atmosphereScore?.relaxation}/10</div>
            <div className="text-sm text-charcoal/60">휴식감</div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'overview', label: '개요' },
          { key: 'analysis', label: '심리분석' },
          { key: 'scents', label: '추천향기' },
          { key: 'strategy', label: '전략' },
          { key: 'visual', label: '시각컨셉' },
          { key: 'insights', label: '전문가인사이트' }
        ].map((tab) => (
          <button
            key={tab.key}
                         onClick={() => setActiveTab(tab.key as any)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-sage text-white shadow-lg'
                : 'bg-white text-charcoal hover:bg-sand shadow'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {activeTab === 'overview' && (
          <div className="p-8">
            <h3 className="text-2xl font-bold text-charcoal mb-6">종합 개요</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-charcoal mb-4">사용자 프로필</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">성격 유형:</span>
                    <span className="font-medium">{recommendation.userAnalysis?.personalityType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">라이프스타일:</span>
                    <span className="font-medium">{recommendation.userAnalysis?.lifestyleCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">선호 향기:</span>
                    <span className="font-medium">{recommendation.userAnalysis?.scentPreferenceProfile?.dominantFamily}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-charcoal mb-4">공간 분석</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">디자인 스타일:</span>
                    <span className="font-medium">{recommendation.spaceAnalysis?.styleAnalysis?.designStyle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">색온도:</span>
                    <span className="font-medium">{recommendation.spaceAnalysis?.colorAnalysis?.colorTemperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal/60">분위기:</span>
                    <span className="font-medium">{recommendation.spaceAnalysis?.lightingAnalysis?.ambientMood}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'scents' && (
          <div className="p-8">
            <h3 className="text-2xl font-bold text-charcoal mb-6">추천 향기</h3>
            <div className="grid gap-6">
              {recommendation.recommendedScents?.map((scent, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedScent?.id === scent.id 
                      ? 'border-sage bg-sage/5' 
                      : 'border-gray-200 hover:border-sage/50'
                  }`}
                  onClick={() => setSelectedScent(scent)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-charcoal">{scent.name}</h4>
                      <p className="text-charcoal/60">{scent.scentProfile?.family}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-sage">{scent.suitabilityScore}/100</div>
                      <div className="text-sm text-charcoal/60">적합도</div>
                    </div>
                  </div>
                  
                  <p className="text-charcoal/80 mb-4">{scent.matchAnalysis?.overallReasoning}</p>
                  
                  {scent.scentProfile?.notes && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <h5 className="font-medium text-charcoal mb-2">Top Notes</h5>
                        <div className="space-y-1">
                          {scent.scentProfile.notes.top?.slice(0, 2).map((note: any, i: number) => (
                            <div key={i} className="text-sm text-charcoal/60">{note.name}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-charcoal mb-2">Middle Notes</h5>
                        <div className="space-y-1">
                          {scent.scentProfile.notes.middle?.slice(0, 2).map((note: any, i: number) => (
                            <div key={i} className="text-sm text-charcoal/60">{note.name}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-charcoal mb-2">Base Notes</h5>
                        <div className="space-y-1">
                          {scent.scentProfile.notes.base?.slice(0, 2).map((note: any, i: number) => (
                            <div key={i} className="text-sm text-charcoal/60">{note.name}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'strategy' && (
          <div className="p-8">
            <h3 className="text-2xl font-bold text-charcoal mb-6">전략적 구현 계획</h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-charcoal mb-4">핵심 컨셉</h4>
                <div className="bg-sage/10 rounded-lg p-6">
                  <h5 className="font-medium text-charcoal mb-2">메인 테마</h5>
                  <p className="text-charcoal/80 mb-4">{recommendation.overallStrategy?.strategicConcept?.mainTheme}</p>
                  <h5 className="font-medium text-charcoal mb-2">서브 테마</h5>
                  <div className="flex flex-wrap gap-2">
                    {recommendation.overallStrategy?.strategicConcept?.subThemes?.map((theme, index) => (
                      <span key={index} className="px-3 py-1 bg-sage text-white rounded-full text-sm">{theme}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-charcoal mb-4">단계별 실행 계획</h4>
                <div className="space-y-4">
                  {recommendation.overallStrategy?.implementationPlan?.phasedApproach?.map((phase, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-sage text-white rounded-full flex items-center justify-center font-bold mr-4">
                          {phase.phase}
                        </div>
                        <h5 className="font-medium text-charcoal">{phase.duration}</h5>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="text-sm font-medium text-charcoal/60 mb-2">실행 항목</h6>
                          <ul className="space-y-1">
                            {phase.actions?.map((action, i) => (
                              <li key={i} className="text-sm text-charcoal/80">• {action}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium text-charcoal/60 mb-2">기대 효과</h6>
                          <ul className="space-y-1">
                            {phase.expectedOutcomes?.map((outcome, i) => (
                              <li key={i} className="text-sm text-charcoal/80">• {outcome}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 다른 탭들도 필요시 추가 */}
      </div>
    </div>
  );
}

// 기존 구조용 결과 표시 컴포넌트
function LegacyResultDisplay({
  recommendation,
  selectedScent,
  setSelectedScent,
  activeTab,
  setActiveTab,
  scentDetail,
  relatedPlaces
}: {
  recommendation: LegacyAIRecommendation;
  selectedScent: any;
  setSelectedScent: (scent: any) => void;
  activeTab: string;
  setActiveTab: (tab: 'overview' | 'details' | 'places' | 'analysis' | 'strategy' | 'visual' | 'insights') => void;
  scentDetail: any;
  relatedPlaces: any[];
}) {
  if (!selectedScent) return null;

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* 이미지 섹션 */}
        <div className="relative h-96 lg:h-auto bg-gradient-to-br from-sage/20 to-terracotta/20">
          {scentDetail?.image && (
            <img
              src={scentDetail.image}
              alt={scentDetail.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-3xl font-bold text-charcoal">{selectedScent.name}</h2>
                <div className="text-2xl font-bold text-sage">{selectedScent.suitabilityScore}</div>
              </div>
              <p className="text-charcoal/80">{scentDetail?.description}</p>
            </div>
          </div>
        </div>

        {/* 정보 섹션 */}
        <div className="p-8 lg:p-12">
          {/* 탭 메뉴 */}
          <div className="flex space-x-4 mb-8">
            {['overview', 'details', 'places'].map((tab) => (
              <button
                key={tab}
                                 onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-sage text-white'
                    : 'bg-sand text-charcoal hover:bg-latte'
                }`}
              >
                {tab === 'overview' && '개요'}
                {tab === 'details' && '상세정보'}
                {tab === 'places' && '관련장소'}
              </button>
            ))}
          </div>

          {/* 탭 컨텐츠 */}
          <div className="animate-fadeIn">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">추천 이유</h3>
                  <p className="text-charcoal/80 leading-relaxed">{selectedScent.matchReason}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">사용법</h3>
                  <p className="text-charcoal/80 leading-relaxed">{selectedScent.usageRecommendation}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">맞춤 조언</h3>
                  <p className="text-charcoal/80 leading-relaxed">{recommendation.personalizedAdvice}</p>
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">향기 패밀리</h3>
                  <p className="text-sage font-medium">{selectedScent.scentFamily}</p>
                </div>
                {scentDetail?.notes && (
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-3">향 노트</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-charcoal/60 mb-2">Top</h4>
                        <div className="space-y-1">
                          {scentDetail.notes.top?.map((note: string, index: number) => (
                            <div key={index} className="text-sm text-charcoal">{note}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal/60 mb-2">Middle</h4>
                        <div className="space-y-1">
                          {scentDetail.notes.middle?.map((note: string, index: number) => (
                            <div key={index} className="text-sm text-charcoal">{note}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-charcoal/60 mb-2">Base</h4>
                        <div className="space-y-1">
                          {scentDetail.notes.base?.map((note: string, index: number) => (
                            <div key={index} className="text-sm text-charcoal">{note}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'places' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-charcoal mb-4">관련 장소</h3>
                {relatedPlaces.length > 0 ? (
                  <div className="space-y-4">
                    {relatedPlaces.map((place, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-charcoal mb-2">{place.name}</h4>
                        <p className="text-sm text-charcoal/60 mb-2">{place.description}</p>
                        <div className="text-xs text-sage">{place.location}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-charcoal/60">관련 장소 정보가 없습니다.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AiScentRecommendationResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AiScentRecommendationResultContent />
    </Suspense>
  );
}