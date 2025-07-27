'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HOTPLACE_SCENT_EXPERIENCES = [
  {
    id: 'yeonnam_seosik',
    name: '연남서식',
    subtitle: 'Industrial Garden Vibes',
    location: '서울 마포구 연남동',
    description: '공장을 개조한 독특한 공간에서 식물과 콘크리트가 만나는 도시 정글의 향기',
    mood: '차가움 속의 따뜻함',
    notes: ['시멘트', '유칼립투스', '아이비', '머스크'],
    signature_scent: 'Urban Jungle Dreams',
    visit_info: '평일 오후 2-5시, 2층 창가 자리에서 자연광과 함께'
  },
  {
    id: 'gangneung_anmok',
    name: '강릉 안목해변',
    subtitle: 'Coastal Coffee Paradise',
    location: '강원 강릉시 안목해변',
    description: '파도소리와 함께 마시는 커피, 동해안 특유의 싱그러운 바다 내음',
    mood: '자유롭고 상쾌한',
    notes: ['바다 소금', '로스팅 커피', '시트러스', '오존'],
    signature_scent: 'Anmok Morning Breeze',
    visit_info: '일출 시간대 방문 추천, 해변 산책로의 아무 카페나'
  },
  {
    id: 'busan_gamcheon',
    name: '부산 감천문화마을',
    subtitle: 'Rainbow Village Artistry',
    location: '부산 사하구 감천문화마을',
    description: '알록달록한 벽화와 부산 바다를 한눈에 내려다보는 예술가들의 아지트',
    mood: '창의적이고 따뜻한',
    notes: ['아크릴 페인트', '바다 소금', '레몬', '화이트 플로럴'],
    signature_scent: 'Gamcheon Artist Dream',
    visit_info: '오후 2-4시, 마을 전망 포인트 근처 카페들'
  },
  {
    id: 'jeonju_hanok',
    name: '전주 한옥마을',
    subtitle: 'Heritage Tea Ceremony',
    location: '전북 전주시 완산구',
    description: '600년 전통이 살아숨쉬는 한옥에서 차를 마시며 느끼는 한국의 정취',
    mood: '고요하고 정감 있는',
    notes: ['한지', '녹차', '대나무', '꿀'],
    signature_scent: 'Hanok Afternoon Serenity',
    visit_info: '한복 착용 후 오후 차 시간, 경기전 주변 전통찻집'
  }
];

const MoodSpaceFragrances = () => {
  const [activeSpace, setActiveSpace] = useState('yeonnam_seosik');
  const activeSpaceInfo = HOTPLACE_SCENT_EXPERIENCES.find(space => space.id === activeSpace);

  return (
    <section className="relative min-h-screen bg-sand overflow-hidden">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-background.jpg"
          alt="Mood spaces fragrance background"
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sand/70 via-cream/50 to-sand/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-full mx-auto px-6 lg:px-16 xl:px-24 py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center min-h-screen">
            
            {/* Left Side - Content */}
            <div className="lg:col-span-6 space-y-12">
              {/* Section Label */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-sage/10 rounded-full">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                  Scent Experience
                </span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
                  <span className="block">특별한 공간의</span>
                  <span className="block font-medium italic text-sage">향기를 찾아서</span>
                </h2>
                
                <p className="text-lg lg:text-xl text-charcoal/70 max-w-xl leading-relaxed font-inter font-light">
                  전국 각지 숨겨진 감성 공간들의 특별한 무드를<br className="hidden sm:block" />
                  향으로 담아낸 센트 데스티네이션만의 향기 여행
                </p>
              </div>

              {/* Active Space Details */}
              {activeSpaceInfo && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-charcoal/5 shadow-lg">
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-sage font-inter font-medium uppercase tracking-wider mb-2">
                        {activeSpaceInfo.subtitle}
                      </div>
                      <h3 className="text-2xl font-inter font-semibold text-charcoal mb-4">
                        {activeSpaceInfo.name}
                      </h3>
                      <p className="text-charcoal/70 font-inter leading-relaxed">
                        {activeSpaceInfo.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                          향의 구성
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {activeSpaceInfo.notes.map((note, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-latte/50 text-charcoal text-sm font-inter rounded-full"
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                          시그니처 향
                        </span>
                        <p className="text-sage font-inter font-medium mt-1">{activeSpaceInfo.signature_scent}</p>
                      </div>
                    </div>

                    <Link
                      href={`/scent-space/${activeSpaceInfo.id}`}
                      className="inline-flex items-center px-6 py-3 bg-terracotta text-white font-inter font-medium rounded-lg hover:bg-terracotta/90 transition-all duration-300"
                    >
                      이 향기 체험하러 가기
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Space Cards */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Card Stack Effect */}
                <div className="absolute inset-0 transform rotate-2 opacity-30">
                  <div className="bg-latte rounded-2xl h-full w-full"></div>
                </div>
                <div className="absolute inset-0 transform -rotate-1 opacity-50">
                  <div className="bg-mocha rounded-2xl h-full w-full"></div>
                </div>
                
                {/* Main Cards Container */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-0">
                    {HOTPLACE_SCENT_EXPERIENCES.map((space, index) => {
                      const isActive = activeSpace === space.id;
                      
                      return (
                        <button
                          key={space.id}
                          onClick={() => setActiveSpace(space.id)}
                          className={`p-8 text-left transition-all duration-500 relative group ${
                            isActive 
                              ? 'bg-sage text-white' 
                              : 'bg-white text-charcoal hover:bg-sand/50'
                          } ${index === 0 ? 'rounded-tl-2xl' : ''} 
                            ${index === 1 ? 'rounded-tr-2xl' : ''} 
                            ${index === 2 ? 'rounded-bl-2xl' : ''} 
                            ${index === 3 ? 'rounded-br-2xl' : ''}`}
                        >
                          <div className="space-y-4">
                            <div className="w-8 h-8 bg-current opacity-20 rounded-lg"></div>
                            
                            <div>
                              <h3 className="text-lg font-inter font-semibold leading-tight mb-2">
                                {space.name}
                              </h3>
                              <p className={`text-xs font-inter uppercase tracking-wider ${
                                isActive ? 'text-white/70' : 'text-charcoal/60'
                              }`}>
                                {space.location}
                              </p>
                            </div>

                            <div className={`text-xs italic font-inter ${
                              isActive ? 'text-white/80' : 'text-charcoal/70'
                            }`}>
                              "{space.mood}"
                            </div>

                            {/* Active indicator */}
                            <div className={`w-8 h-0.5 transition-all duration-300 ${
                              isActive ? 'bg-white' : 'bg-sage group-hover:w-12'
                            }`}></div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodSpaceFragrances; 