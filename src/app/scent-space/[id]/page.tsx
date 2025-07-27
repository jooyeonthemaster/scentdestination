'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { HotplaceDestination, EnhancedPlaceData } from '@/types';
import { hotplaceService } from '@/lib/firebaseService';
import DiffuserPurchase from '@/components/DiffuserPurchase';

export default function ScentSpaceDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [place, setPlace] = useState<HotplaceDestination | null>(null);
  const [enhancedData, setEnhancedData] = useState<EnhancedPlaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      loadPlaceData();
    }
  }, [id]);

  const loadPlaceData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Firebase에서 기본 데이터 로드
      const allPlaces = await hotplaceService.getAll();
      const foundPlace = allPlaces.find(p => p.id === id);

      if (!foundPlace) {
        setError('해당 장소를 찾을 수 없습니다.');
        return;
      }

      setPlace(foundPlace);
      
      // 이미 고도화된 데이터가 있는지 확인
      if (foundPlace.enhancedData) {
        console.log(`✅ ${foundPlace.name}: 기존 고도화 데이터 사용`);
        setEnhancedData(foundPlace.enhancedData);
      } else {
        console.log(`🔄 ${foundPlace.name}: 실시간 고도화 진행`);
        // 고도화된 데이터가 없으면 실시간으로 Gemini API 호출
        await enhanceDataWithGemini(id);
      }

    } catch (err) {
      console.error('Error loading place data:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const enhanceDataWithGemini = async (placeId: string) => {
    try {
      setEnhancing(true);
      
      const response = await fetch('/api/enhance-place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ placeId }),
      });

      const result = await response.json();

      if (result.success) {
        setEnhancedData(result.enhancedData);
      } else {
        console.warn('Data enhancement failed:', result.error);
      }
    } catch (err) {
      console.error('Error enhancing data:', err);
    } finally {
      setEnhancing(false);
    }
  };

  // 향 강도를 시각적으로 표현하는 컴포넌트
  const ScentIntensityBar = ({ intensity }: { intensity: number }) => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-charcoal/60 w-12">강도</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
          <div
            key={level}
            className={`w-2 h-4 rounded-sm ${
              level <= intensity
                ? 'bg-gradient-to-t from-sage to-terracotta'
                : 'bg-sand/30'
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-charcoal">{intensity}/10</span>
    </div>
  );

  // 향 피라미드 컴포넌트
  const ScentPyramid = ({ scentProfile }: { scentProfile: EnhancedPlaceData['detailedScentProfile'] }) => (
    <div className="bg-gradient-to-b from-sand/20 to-cream/30 rounded-2xl p-6">
      <h3 className="text-xl font-inter font-semibold text-charcoal mb-6 text-center">
        향의 피라미드
      </h3>
      
      {/* Top Notes */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="w-16 h-8 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-t-full flex items-center justify-center">
            <span className="text-xs font-medium text-charcoal">TOP</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {scentProfile.topNotes.map((note, index) => (
            <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Middle Notes */}
      <div className="mb-6">
        <div className="flex items-center justify-center mb-3">
          <div className="w-20 h-8 bg-gradient-to-r from-pink-200 to-purple-200 flex items-center justify-center">
            <span className="text-xs font-medium text-charcoal">MIDDLE</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {scentProfile.middleNotes.map((note, index) => (
            <span key={index} className="px-3 py-1 bg-pink-100 text-pink-800 text-sm rounded-full">
              {note}
            </span>
          ))}
        </div>
      </div>

      {/* Base Notes */}
      <div>
        <div className="flex items-center justify-center mb-3">
          <div className="w-24 h-8 bg-gradient-to-r from-amber-200 to-brown-200 rounded-b-full flex items-center justify-center">
            <span className="text-xs font-medium text-charcoal">BASE</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {scentProfile.baseNotes.map((note, index) => (
            <span key={index} className="px-3 py-1 bg-amber-100 text-amber-800 text-sm rounded-full">
              {note}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-sage/30 border-t-sage rounded-full animate-spin mx-auto"></div>
          <p className="text-charcoal/70 font-inter">공간의 향기를 준비하는 중...</p>
          {enhancing && (
            <p className="text-sage text-sm">🤖 AI가 더 깊은 정보를 분석하고 있습니다</p>
          )}
        </div>
      </main>
    );
  }

  if (error || !place) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-sand rounded-full mx-auto flex items-center justify-center">
            <svg className="w-12 h-12 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L4.168 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-inter font-semibold text-charcoal">
            {error || '페이지를 찾을 수 없습니다'}
          </h1>
          <Link
            href="/scent-map"
            className="inline-flex items-center px-6 py-3 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-300"
          >
            향기 지도로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-sand/50 to-latte/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left: Place Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-sage/20 text-sage text-sm font-inter font-medium rounded-full">
                    {place.category}
                  </span>
                  <span className="text-charcoal/60 text-sm">{place.location.region}</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-inter font-light text-charcoal">
                  {place.name}
                </h1>
                <p className="text-xl text-charcoal/70 font-inter">
                  {place.signatureScent.name}
                </p>
              </div>

              <p className="text-lg text-charcoal/80 leading-relaxed">
                {enhancedData?.enhancedDescription || place.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {place.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-sand text-charcoal/70 text-sm rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 기본 정보 카드들 */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white/70 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-sm font-medium text-charcoal/60 mb-2">운영시간</h3>
                  <p className="text-sm text-charcoal">{place.visitInfo.openingHours}</p>
                </div>
                <div className="bg-white/70 rounded-xl p-4 backdrop-blur-sm">
                  <h3 className="text-sm font-medium text-charcoal/60 mb-2">추천 시간</h3>
                  <p className="text-sm text-charcoal">{place.visitInfo.bestTime}</p>
                </div>
              </div>
            </div>

            {/* Center: Image */}
            <div className="lg:col-span-4">
              <div className="relative h-80 lg:h-96 bg-gradient-to-br from-sage/10 to-terracotta/10 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-sage/20 rounded-full mx-auto flex items-center justify-center">
                      <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="text-charcoal/60 font-inter">
                      {place.name}의<br />감성적인 공간
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Purchase Card */}
            <div className="lg:col-span-3">
              <DiffuserPurchase place={place} enhancedData={enhancedData} compact={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Content */}
      {enhancedData ? (
        <>
          {/* Scent Profile Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-inter font-semibold text-charcoal mb-4">
                  향기 프로필
                </h2>
                <p className="text-charcoal/70 max-w-2xl mx-auto">
                  이 공간만의 독특한 향기를 구성하는 요소들을 깊이 있게 분석했습니다
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                <ScentPyramid scentProfile={enhancedData.detailedScentProfile} />
                
                <div className="space-y-6">
                  <div className="bg-sand/20 rounded-2xl p-6">
                    <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">
                      향기 특성
                    </h3>
                    
                    <div className="space-y-4">
                      <ScentIntensityBar intensity={enhancedData.detailedScentProfile.scentIntensity} />
                      
                      <div className="flex justify-between items-center py-2 border-b border-sand/50">
                        <span className="text-charcoal/60">지속 시간</span>
                        <span className="font-medium text-charcoal">
                          {enhancedData.detailedScentProfile.scentDuration}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center py-2">
                        <span className="text-charcoal/60">추천 계절</span>
                        <span className="font-medium text-sage">
                          {enhancedData.detailedScentProfile.seasonalRecommendation}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-latte/20 rounded-2xl p-6">
                    <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">
                      분위기 세부사항
                    </h3>
                    <p className="text-charcoal/80 leading-relaxed mb-4">
                      {enhancedData.atmosphereDetails.overallMood}
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <span className="text-sm font-medium text-charcoal/60 uppercase tracking-wider">
                          시각적 요소
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {enhancedData.atmosphereDetails.visualElements.slice(0, 3).map((element, index) => (
                            <span key={index} className="text-xs bg-sage/20 text-sage px-2 py-1 rounded-full">
                              {element}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Story Section */}
          <section className="py-16 bg-gradient-to-br from-latte/30 to-sand/20">
            <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
              <h2 className="text-3xl font-inter font-semibold text-charcoal mb-8">
                향기 여행 스토리
              </h2>
              <p className="text-lg text-charcoal/80 leading-relaxed font-inter italic">
                "{enhancedData.scentJourneyStory}"
              </p>
            </div>
          </section>

          {/* Visit Info Section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-3xl font-inter font-semibold text-charcoal mb-12 text-center">
                방문 가이드
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-sand/20 rounded-2xl p-6">
                  <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">
                    방문 정보
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium text-charcoal/60">최적 방문 시간</span>
                      <p className="text-charcoal mt-1">{enhancedData.visitExperience.bestTimeToVisit}</p>
                    </div>
                    <div>
                      <span className="font-medium text-charcoal/60">평균 머무는 시간</span>
                      <p className="text-charcoal mt-1">{enhancedData.visitExperience.averageStayDuration}</p>
                    </div>
                    <div>
                      <span className="font-medium text-charcoal/60">혼잡도</span>
                      <p className="text-charcoal mt-1">{enhancedData.visitExperience.crowdLevel}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-sage/10 rounded-2xl p-6">
                  <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">
                    포토 스팟
                  </h3>
                  <ul className="space-y-2">
                    {enhancedData.visitExperience.photoSpots.map((spot, index) => (
                      <li key={index} className="text-sm text-charcoal/80 flex items-start gap-2">
                        <span className="text-sage mt-1">📸</span>
                        {spot}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-terracotta/10 rounded-2xl p-6">
                  <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">
                    인사이더 팁
                  </h3>
                  <ul className="space-y-2">
                    {enhancedData.visitExperience.insiderTips.map((tip, index) => (
                      <li key={index} className="text-sm text-charcoal/80 flex items-start gap-2">
                        <span className="text-terracotta mt-1">💡</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pairing Recommendations */}
          <section className="py-16 bg-gradient-to-br from-sand/30 to-cream/50">
            <div className="max-w-6xl mx-auto px-4 lg:px-8">
              <h2 className="text-3xl font-inter font-semibold text-charcoal mb-12 text-center">
                페어링 추천
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-sage/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🌸</span>
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">향수</h3>
                  <ul className="space-y-2">
                    {enhancedData.pairingRecommendations.perfumes.map((perfume, index) => (
                      <li key={index} className="text-sm text-charcoal/80">{perfume}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-terracotta/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🕯️</span>
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">캔들</h3>
                  <ul className="space-y-2">
                    {enhancedData.pairingRecommendations.candles.map((candle, index) => (
                      <li key={index} className="text-sm text-charcoal/80">{candle}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 bg-latte/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">🎵</span>
                  </div>
                  <h3 className="text-xl font-inter font-semibold text-charcoal mb-4">음악</h3>
                  <ul className="space-y-2">
                    {enhancedData.pairingRecommendations.music.map((music, index) => (
                      <li key={index} className="text-sm text-charcoal/80">{music}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        /* Basic Info when Enhanced Data is not available */
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <div className="bg-sand/20 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-inter font-semibold text-charcoal mb-2">
                AI가 더 깊은 정보를 준비하고 있습니다
              </h3>
              <p className="text-charcoal/70">
                곧 이 공간에 대한 전문적인 분석과 추천을 제공해드릴게요
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Basic Location Info */}
      <section className="py-16 bg-charcoal text-white">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-inter font-semibold mb-6">위치 정보</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-white/60">주소</span>
                  <p className="text-white">{place.location.address}</p>
                </div>
                <div>
                  <span className="text-white/60">교통편</span>
                  <p className="text-white">{place.transportation}</p>
                </div>
                <div>
                  <span className="text-white/60">운영시간</span>
                  <p className="text-white">{place.visitInfo.openingHours}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-inter font-semibold mb-6">방문 팁</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-white/60">추천 시간</span>
                  <p className="text-white">{place.visitInfo.bestTime}</p>
                </div>
                <div>
                  <span className="text-white/60">팁</span>
                  <p className="text-white">{place.visitInfo.tips}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/scent-map"
              className="inline-flex items-center px-8 py-3 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-300"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              다른 향기 명소 둘러보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 