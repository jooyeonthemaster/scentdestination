'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const JEJU_SCENT_PLACES = [
  {
    id: 'aewol_cafe',
    name: '애월 해안카페',
    subtitle: 'Ocean Breeze Paradise',
    category: 'coastal',
    location: '제주 제주시 애월읍 애월리',
    description: '제주 바다가 한눈에 보이는 절벽 위 카페에서 만나는 시원한 바다 향기와 따뜻한 커피의 조화',
    atmosphere: '평온하고 자유로운',
    specialFeature: '절벽 위에서 바라보는 서해 바다 전망',
    signatureScent: {
      name: 'Jeju Ocean Breeze',
      notes: ['바다 소금', '시트러스', '화이트 머스크', '아쿠아틱'],
      experience: '파도 소리와 함께 느끼는 시원하고 깨끗한 바다의 향기'
    },
    visitInfo: {
      openingHours: '매일 09:00 - 22:00',
      bestTime: '일몰 시간대 (18:00-19:30)',
      tips: '2층 테라스 자리 추천, 주차 공간 제한적'
    },
    transportation: '제주공항에서 차량 40분, 애월버스터미널에서 도보 15분',
    relatedFragrance: 'Ocean Breeze Collection',
    tags: ['바다뷰', '일몰명소', '커피', '테라스'],
    featured: true,
    rating: 4.8,
    reviewCount: 342
  },
  {
    id: 'hallasan_forest',
    name: '한라산 숲길',
    subtitle: 'Sacred Mountain Trail',
    category: 'nature',
    location: '제주 제주시 해안동 산220-1',
    description: '천년의 세월을 품은 한라산 원시림에서 만나는 깊고 진한 자연의 향기',
    atmosphere: '경건하고 신비로운',
    specialFeature: '제주 특유의 곶자왈 생태계',
    signatureScent: {
      name: 'Hallasan Forest Depths',
      notes: ['삼나무', '이끼', '젖은 흙', '산나물'],
      experience: '한라산만의 독특한 식생이 만들어내는 깊고 신비한 숲의 향기'
    },
    visitInfo: {
      openingHours: '일출 - 일몰 (계절별 상이)',
      bestTime: '이른 아침 (06:00-08:00)',
      tips: '등산화 필수, 날씨 변화 주의'
    },
    transportation: '제주공항에서 차량 30분, 한라산 탐방안내소 출발',
    relatedFragrance: 'Sacred Forest Collection',
    tags: ['등산', '자연', '힐링', '생태'],
    featured: true,
    rating: 4.9,
    reviewCount: 156
  },
  {
    id: 'seongsan_sunrise',
    name: '성산일출봉',
    subtitle: 'Sunrise Sacred Peak',
    category: 'nature',
    location: '제주 서귀포시 성산읍 성산리',
    description: '제주를 대표하는 일출 명소에서 느끼는 새벽 바다와 화산석의 만남',
    atmosphere: '웅장하고 감동적인',
    specialFeature: '유네스코 세계자연유산, 일출 명소',
    signatureScent: {
      name: 'Seongsan Dawn Mist',
      notes: ['바다 안개', '화산석', '새벽 이슬', '유칼립투스'],
      experience: '일출과 함께 피어오르는 신비로운 새벽 안개의 향기'
    },
    visitInfo: {
      openingHours: '매일 05:00 - 19:00',
      bestTime: '일출 시간 1시간 전',
      tips: '일출 시간 확인 필수, 방풍의 준비'
    },
    transportation: '제주공항에서 차량 1시간, 성산포 항구 인근',
    relatedFragrance: 'Volcanic Dawn Collection',
    tags: ['일출', '화산', '세계유산', '등반'],
    featured: false,
    rating: 4.7,
    reviewCount: 289
  },
  {
    id: 'udo_island',
    name: '우도 산호해변',
    subtitle: 'Coral Beach Paradise',
    category: 'coastal',
    location: '제주 제주시 우도면 연평리',
    description: '에메랄드빛 바다와 새하얀 산호모래가 만들어내는 제주만의 특별한 해변',
    atmosphere: '환상적이고 청량한',
    specialFeature: '국내 유일 산호모래 해변',
    signatureScent: {
      name: 'Udo Coral Dreams',
      notes: ['산호', '바다 소금', '선인장', '트로피컬'],
      experience: '산호와 바다가 만들어내는 청량하고 깨끗한 에메랄드의 향기'
    },
    visitInfo: {
      openingHours: '매일 06:00 - 18:00 (페리 운항시간)',
      bestTime: '오전 10시-12시 (맑은 바다)',
      tips: '페리 예약 필수, 자전거 대여 추천'
    },
    transportation: '성산포 항구에서 페리 15분',
    relatedFragrance: 'Coral Paradise Collection',
    tags: ['섬여행', '산호해변', '에메랄드', '페리'],
    featured: true,
    rating: 4.6,
    reviewCount: 178
  },
  {
    id: 'jeju_traditional_market',
    name: '제주 동문재래시장',
    subtitle: 'Traditional Scent Market',
    category: 'culture',
    location: '제주 제주시 관덕로14길 20',
    description: '제주 할머니들의 정성이 담긴 전통 음식과 향신료의 진한 향이 어우러진 재래시장',
    atmosphere: '정겨우며 활기찬',
    specialFeature: '60년 전통의 제주 재래시장',
    signatureScent: {
      name: 'Jeju Traditional Spices',
      notes: ['된장', '고춧가루', '마늘', '생선구이'],
      experience: '제주 할머니의 손맛이 느껴지는 따뜻하고 정겨운 전통의 향기'
    },
    visitInfo: {
      openingHours: '매일 07:00 - 21:00',
      bestTime: '오전 시간 (09:00-11:00)',
      tips: '흑돼지, 갈치 등 제주 특산품 구매 추천'
    },
    transportation: '제주공항에서 차량 15분, 제주시 중심가',
    relatedFragrance: 'Traditional Jeju Collection',
    tags: ['재래시장', '전통음식', '특산품', '제주문화'],
    featured: false,
    rating: 4.4,
    reviewCount: 127
  },
  {
    id: 'woljeongri_beach',
    name: '월정리 해변',
    subtitle: 'Crystal Clear Paradise',
    category: 'coastal',
    location: '제주 제주시 구좌읍 월정리',
    description: '투명한 에메랄드빛 바다와 하얀 모래사장이 어우러진 제주 동쪽 대표 해변',
    atmosphere: '청량하고 로맨틱한',
    specialFeature: '투명한 바다와 포토존으로 유명',
    signatureScent: {
      name: 'Woljeong Crystal Waters',
      notes: ['맑은 바다', '모래', '바닷바람', '선크림'],
      experience: '투명한 바다가 선사하는 깨끗하고 시원한 여름의 향기'
    },
    visitInfo: {
      openingHours: '24시간 개방',
      bestTime: '오후 시간 (14:00-17:00)',
      tips: '해변 카페들 이용 추천, 수영 가능'
    },
    transportation: '제주공항에서 차량 40분',
    relatedFragrance: 'Crystal Beach Collection',
    tags: ['해수욕장', '포토존', '카페거리', '투명바다'],
    featured: false,
    rating: 4.5,
    reviewCount: 203
  }
];

const CATEGORIES = ['전체', '해안가', '자연', '문화공간'];

export default function JejuHotplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const categoryMap: { [key: string]: string } = {
    '전체': 'all',
    '해안가': 'coastal',
    '자연': 'nature',
    '문화공간': 'culture'
  };

  const filteredPlaces = selectedCategory === '전체' 
    ? JEJU_SCENT_PLACES 
    : JEJU_SCENT_PLACES.filter(place => place.category === categoryMap[selectedCategory]);

  const featuredPlaces = JEJU_SCENT_PLACES.filter(place => place.featured);

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-sand overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-sage/30 via-terracotta/20 to-latte/40"></div>
        </div>
        
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-terracotta/10 rounded-full">
                <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                  Jeju Island Experience
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl xl:text-8xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
                <span className="block">제주도에서 만나는</span>
                <span className="block font-medium italic text-terracotta">특별한 향기 여행</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed font-inter font-light">
                에메랄드빛 바다부터 신비로운 한라산까지,<br className="hidden sm:block" />
                제주만의 독특한 향기를 담은 특별한 공간들을 발견하세요
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/scent-map?region=jeju"
                  className="inline-flex items-center px-8 py-4 bg-terracotta text-white font-inter font-medium rounded-lg hover:bg-terracotta/90 transition-all duration-300"
                >
                  제주 향기 지도 보기
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link
                  href="/ai-scent-recommendation"
                  className="inline-flex items-center px-8 py-4 border-2 border-charcoal/20 text-charcoal font-inter font-medium rounded-lg hover:border-sage hover:bg-sage/5 transition-all duration-300"
                >
                  나만의 제주 향 찾기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Places */}
      <section className="py-20 bg-latte">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-inter font-light text-charcoal mb-6">
              <span className="block">제주 대표</span>
              <span className="block font-medium italic text-warm">향기 명소</span>
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed font-inter font-light">
              제주를 방문한다면 꼭 경험해야 할 특별한 향기 공간들
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredPlaces.map((place) => (
              <article
                key={place.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-charcoal/5"
              >
                <div className="relative h-64 bg-gradient-to-br from-sage/20 to-terracotta/20 overflow-hidden">
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-xs font-inter font-medium text-charcoal uppercase">
                        {place.category === 'coastal' ? '해안가' : place.category === 'nature' ? '자연' : '문화공간'}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                      <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-xs font-inter font-medium text-charcoal">
                        {place.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-inter font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors duration-300">
                      {place.name}
                    </h3>
                    <p className="text-sm font-inter text-charcoal/60 mb-3">
                      {place.subtitle} • {place.location}
                    </p>
                  </div>

                  <p className="text-charcoal/70 font-inter text-sm leading-relaxed line-clamp-3">
                    {place.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-inter">
                      <span className="text-charcoal/60">시그니처 향</span>
                      <span className="text-terracotta font-medium">{place.signatureScent.name}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {place.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-sand text-charcoal/70 text-xs font-inter rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPlace(place)}
                    className="w-full mt-4 py-3 bg-terracotta/10 text-terracotta font-inter font-medium rounded-lg hover:bg-terracotta hover:text-white transition-all duration-300"
                  >
                    상세 정보 보기
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 border-b border-charcoal/10">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-inter font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-terracotta text-white shadow-lg'
                    : 'bg-white border border-charcoal/20 text-charcoal hover:border-terracotta hover:bg-terracotta/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Places Grid */}
      <section className="py-20">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredPlaces.map((place) => (
              <article
                key={place.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-charcoal/5"
              >
                <div className="relative h-48 bg-gradient-to-br from-sage/20 to-terracotta/20 overflow-hidden">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-xs font-inter text-charcoal/60">
                        <span>{place.atmosphere}</span>
                        <span>{place.reviewCount}개 리뷰</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-inter font-semibold text-charcoal mb-2 group-hover:text-terracotta transition-colors duration-300">
                      {place.name}
                    </h3>
                    <p className="text-sm font-inter text-charcoal/60 mb-3">
                      {place.location}
                    </p>
                  </div>

                  <p className="text-charcoal/70 font-inter text-sm leading-relaxed line-clamp-2">
                    {place.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                    <div className="flex items-center space-x-1">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-inter font-medium text-charcoal">
                        {place.rating}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => setSelectedPlace(place)}
                      className="text-terracotta font-inter font-medium text-sm hover:text-terracotta/80 transition-colors duration-300"
                    >
                      자세히 보기
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Place Detail Modal */}
      {selectedPlace && (
        <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-charcoal/10 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-inter font-semibold text-charcoal">
                  {selectedPlace.name}
                </h2>
                <p className="text-charcoal/60 font-inter text-sm">
                  {selectedPlace.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedPlace(null)}
                className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-charcoal/20 transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-inter font-semibold text-charcoal mb-4">공간 소개</h3>
                    <p className="text-charcoal/70 font-inter leading-relaxed mb-4">
                      {selectedPlace.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-inter text-charcoal/60">위치</span>
                        <span className="text-sm font-inter text-charcoal">{selectedPlace.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-inter text-charcoal/60">분위기</span>
                        <span className="text-sm font-inter text-charcoal">{selectedPlace.atmosphere}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-inter text-charcoal/60">특징</span>
                        <span className="text-sm font-inter text-charcoal">{selectedPlace.specialFeature}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-inter font-semibold text-charcoal mb-4">시그니처 향</h3>
                    <div className="bg-sand/30 rounded-lg p-4 space-y-3">
                      <h4 className="font-inter font-medium text-terracotta">
                        {selectedPlace.signatureScent.name}
                      </h4>
                      <p className="text-sm font-inter text-charcoal/70 leading-relaxed">
                        {selectedPlace.signatureScent.experience}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedPlace.signatureScent.notes.map((note: string, index: number) => (
                          <span key={index} className="text-xs px-3 py-1 bg-white text-charcoal/70 text-xs font-inter rounded-full border border-charcoal/10"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-inter font-semibold text-charcoal mb-4">방문 정보</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-inter font-medium text-charcoal mb-2">운영시간</h4>
                        <p className="text-sm font-inter text-charcoal/70">
                          {selectedPlace.visitInfo.openingHours}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-inter font-medium text-charcoal mb-2">추천 방문 시간</h4>
                        <p className="text-sm font-inter text-charcoal/70">
                          {selectedPlace.visitInfo.bestTime}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-inter font-medium text-charcoal mb-2">방문 팁</h4>
                        <p className="text-sm font-inter text-charcoal/70">
                          {selectedPlace.visitInfo.tips}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-inter font-semibold text-charcoal mb-4">교통편</h3>
                    <p className="text-sm font-inter text-charcoal/70 leading-relaxed">
                      {selectedPlace.transportation}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-inter font-semibold text-charcoal mb-4">태그</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlace.tags.map((tag: string, index: number) => (
                        <span key={index} className="text-xs px-3 py-1 bg-latte text-charcoal rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-charcoal/10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href={`/scent-space/${selectedPlace.id}`}
                    className="inline-flex items-center px-6 py-3 bg-terracotta text-white font-inter font-medium rounded-lg hover:bg-terracotta/90 transition-all duration-300"
                    onClick={() => setSelectedPlace(null)}
                  >
                    향기 상세 체험하기
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <Link
                    href="/ai-scent-recommendation"
                    className="inline-flex items-center px-6 py-3 border-2 border-charcoal/20 text-charcoal font-inter font-medium rounded-lg hover:border-sage hover:bg-sage/5 transition-all duration-300"
                    onClick={() => setSelectedPlace(null)}
                  >
                    비슷한 향 찾기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-mocha">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-inter font-light text-charcoal">
            <span className="block">제주의 향기를</span>
            <span className="block font-medium italic text-terracotta">집에서도 만나보세요</span>
          </h2>
          
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed font-inter font-light">
            제주에서 경험한 특별한 향기를 디퓨저로 만나보세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/payment"
              className="inline-flex items-center px-8 py-4 bg-terracotta text-white font-inter font-medium rounded-lg hover:bg-terracotta/90 transition-all duration-300"
            >
              제주 향기 디퓨저 구매
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              href="/scent-stories"
              className="inline-flex items-center px-8 py-4 border-2 border-charcoal/20 text-charcoal font-inter font-medium rounded-lg hover:border-sage hover:bg-sage/5 transition-all duration-300"
            >
              제주 향기 이야기 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 