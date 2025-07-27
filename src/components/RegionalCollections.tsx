'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HOTPLACE_COLLECTIONS = [
  {
    id: 'jeju',
    name: '제주',
    subtitle: 'Island Serenity',
    location: '제주특별자치도',
    description: '푸른 바다와 오름이 만나는 곳, 제주만의 여유로운 시간이 흐르는 감성 핫플레이스',
    mood: '자유롭고 평화로운',
    notes: ['오션 브리즈', '시트러스', '그린티', '바닐라'],
    signature_fragrance: 'Hermès Un Jardin Sur Le Toit'
  },
  {
    id: 'gyeongridan',
    name: '경리단길',
    subtitle: 'Seoul Urban Chic',
    location: '서울 용산구',
    description: '이태원과 한남동 사이 숨어있는 젊은 감성의 거리, 개성 넘치는 카페들의 성지',
    mood: '힙하고 트렌디한',
    notes: ['우디', '레더', '커피', '앰버'],
    signature_fragrance: 'Le Labo Santal 33'
  },
  {
    id: 'seongsu',
    name: '성수동',
    subtitle: 'Industrial Romance',
    location: '서울 성동구',
    description: '옛 공장지대가 변신한 문화 공간, 인더스트리얼 감성이 살아있는 카페들의 메카',
    mood: '모던하고 감각적인',
    notes: ['시멘트', '스틸', '로스팅 커피', '민트'],
    signature_fragrance: 'Comme des Garçons Concrete'
  },
  {
    id: 'busan',
    name: '부산',
    subtitle: 'Coastal Healing',
    location: '부산광역시',
    description: '바다와 산이 어우러진 항구도시, 감천문화마을과 해운대의 특별한 바다 감성',
    mood: '자유롭고 역동적인',
    notes: ['바다 소금', '아쿠아틱', '시트러스', '화이트 머스크'],
    signature_fragrance: 'Maison Margiela Beach Walk'
  },
  {
    id: 'jeonju',
    name: '전주',
    subtitle: 'Heritage Charm',
    location: '전라북도 전주시',
    description: '한옥마을의 고즈넉한 정취와 맛의 고장이 선사하는 전통과 현대의 조화',
    mood: '고요하고 정감 있는',
    notes: ['한지', '대나무', '녹차', '꿀'],
    signature_fragrance: 'Aesop Hwyl'
  }
];

const RegionalCollections = () => {
  const [activeRegion, setActiveRegion] = useState('jeju');
  const activeCollection = HOTPLACE_COLLECTIONS.find(place => place.id === activeRegion);

  return (
    <section className="relative min-h-screen bg-cream overflow-hidden">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-background.jpg"
          alt="Regional collections background"
          fill
          className="object-cover object-center opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-sand/60 to-cream/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-full mx-auto px-6 lg:px-16 xl:px-24 py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center min-h-screen">
            
            {/* Left Side - Region Selector */}
            <div className="lg:col-span-5 space-y-8">
              {/* Section Label */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-terracotta/10 rounded-full">
                <div className="w-2 h-2 bg-terracotta rounded-full"></div>
                <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                  Regional Journey
                </span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
                  <span className="block">핫플레이스</span>
                  <span className="block font-medium italic text-terracotta">향기 여행</span>
                </h2>
                
                <p className="text-lg lg:text-xl text-charcoal/70 max-w-xl leading-relaxed font-inter font-light">
                  전국 각지의 감성 핫플레이스를 향으로 담아낸<br className="hidden sm:block" />
                  특별한 기억과 감정을 간직하세요
                </p>
              </div>

              {/* Region Cards */}
              <div className="space-y-4">
                {HOTPLACE_COLLECTIONS.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => setActiveRegion(place.id)}
                    className={`w-full p-6 text-left transition-all duration-500 rounded-xl border ${
                      activeRegion === place.id 
                        ? 'bg-terracotta text-white border-terracotta shadow-lg' 
                        : 'bg-white/80 text-charcoal border-charcoal/10 hover:bg-sand/50 hover:border-sage/30'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-xl font-inter font-semibold">{place.name}</h3>
                        <p className={`text-sm font-inter ${
                          activeRegion === place.id ? 'text-white/80' : 'text-charcoal/60'
                        }`}>
                          {place.location}
                        </p>
                        <p className={`text-xs font-inter italic ${
                          activeRegion === place.id ? 'text-white/70' : 'text-charcoal/70'
                        }`}>
                          "{place.mood}"
                        </p>
                      </div>
                      <div className={`text-xs font-inter uppercase tracking-wider ${
                        activeRegion === place.id ? 'text-white/70' : 'text-sage'
                      }`}>
                        {place.subtitle}
                      </div>
                    </div>
                    
                    {/* Active indicator */}
                    <div className={`w-12 h-0.5 mt-4 transition-all duration-300 ${
                      activeRegion === place.id ? 'bg-white' : 'bg-terracotta'
                    }`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Side - Active Collection Details */}
            <div className="lg:col-span-7">
              {activeCollection && (
                <div className="relative">
                  {/* Card Stack Effect */}
                  <div className="absolute inset-0 transform rotate-1 opacity-40">
                    <div className="bg-latte rounded-3xl h-full w-full"></div>
                  </div>
                  <div className="absolute inset-0 transform -rotate-1 opacity-60">
                    <div className="bg-mocha rounded-3xl h-full w-full"></div>
                  </div>
                  
                  {/* Main Content Card */}
                  <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Visual Header */}
                    <div className="relative h-80 bg-gradient-to-br from-sage/20 to-terracotta/20 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="text-6xl lg:text-8xl font-inter font-light text-charcoal">
                          {activeCollection.name}
                        </div>
                        <div className="text-lg font-inter uppercase tracking-wider text-charcoal/60">
                          {activeCollection.subtitle}
                        </div>
                      </div>

                      {/* Location Badge */}
                      <div className="absolute top-6 right-6 px-4 py-2 bg-charcoal text-white text-xs font-inter font-medium uppercase tracking-wider rounded-full">
                        {activeCollection.location}
                      </div>

                      {/* Accent Elements */}
                      <div className="absolute top-6 left-6 w-16 h-16 bg-sage/30 rounded-full"></div>
                      <div className="absolute bottom-6 right-6 w-12 h-12 bg-terracotta/30 rounded-lg"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 space-y-8">
                      <div>
                        <h3 className="text-2xl font-inter font-semibold text-charcoal mb-4">
                          {activeCollection.name}의 감성
                        </h3>
                        <p className="text-charcoal/70 font-inter leading-relaxed mb-6">
                          {activeCollection.description}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                          <div>
                            <span className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                              향의 노트
                            </span>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {activeCollection.notes.map((note, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 bg-sand text-charcoal text-sm font-inter rounded-full"
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <span className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                              시그니처 향수
                            </span>
                            <p className="text-sage font-inter font-medium mt-2">{activeCollection.signature_fragrance}</p>
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                          <div>
                            <span className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                              감성 무드
                            </span>
                            <p className="text-charcoal/70 font-inter mt-2">{activeCollection.mood}</p>
                          </div>

                          <Link
                            href={`/hotplace/${activeCollection.id}`}
                            className="inline-flex items-center px-6 py-3 bg-terracotta text-white font-inter font-medium rounded-lg hover:bg-terracotta/90 transition-all duration-300"
                          >
                            {activeCollection.name} 향기 체험하기
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegionalCollections; 