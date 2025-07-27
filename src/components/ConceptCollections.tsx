'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const CONCEPT_CATEGORIES = {
  season: {
    name: '계절',
    subtitle: '자연의 리듬에 맞춘 향수',
    collections: [
      {
        id: 'spring',
        name: '봄',
        description: '꽃이 피어나는 생명력 넘치는 계절',
        notes: ['플로럴', '프루티', '그린'],
        mood: '상쾌하고 희망적인',
        recommendations: ['Chanel Chance', 'Dior Miss Dior']
      },
      {
        id: 'summer',
        name: '여름',
        description: '태양과 바다의 에너지가 넘치는 시간',
        notes: ['시트러스', '아쿠아틱', '민트'],
        mood: '시원하고 활기찬',
        recommendations: ['Acqua di Parma', 'Hermès Un Jardin Sur Le Toit']
      },
      {
        id: 'autumn',
        name: '가을',
        description: '성숙하고 따뜻한 결실의 계절',
        notes: ['우디', '스파이시', '앰버'],
        mood: '깊이 있고 따뜻한',
        recommendations: ['Tom Ford Oud Wood', 'Maison Margiela By the Fireplace']
      },
      {
        id: 'winter',
        name: '겨울',
        description: '고요하고 신비로운 차가운 계절',
        notes: ['머스크', '바닐라', '오리엔탈'],
        mood: '신비롭고 감성적인',
        recommendations: ['Yves Saint Laurent Black Opium', 'Thierry Mugler Angel']
      }
    ]
  },
  time: {
    name: '시간대',
    subtitle: '하루의 리듬에 맞춘 향수',
    collections: [
      {
        id: 'morning',
        name: '아침',
        description: '새로운 하루를 시작하는 상쾌한 순간',
        notes: ['시트러스', '그린', '화이트 플로럴'],
        mood: '깨끗하고 에너지 넘치는',
        recommendations: ['CK One', 'Bulgari Petits et Mamans']
      },
      {
        id: 'afternoon',
        name: '오후',
        description: '활동적이고 집중력이 필요한 시간',
        notes: ['플로럴', '프루티', '라이트 우디'],
        mood: '우아하고 자신감 있는',
        recommendations: ['Chanel Coco Mademoiselle', 'Dior J\'adore']
      },
      {
        id: 'evening',
        name: '저녁',
        description: '하루를 마무리하는 편안한 순간',
        notes: ['우디', '앰버', '바닐라'],
        mood: '편안하고 따뜻한',
        recommendations: ['Hermès Terre d\'Hermès', 'Guerlain Shalimar']
      },
      {
        id: 'night',
        name: '밤',
        description: '신비롭고 감각적인 특별한 시간',
        notes: ['오리엔탈', '머스크', '스파이시'],
        mood: '유혹적이고 신비로운',
        recommendations: ['Tom Ford Black Orchid', 'Yves Saint Laurent Opium']
      }
    ]
  },
  mood: {
    name: '무드',
    subtitle: '감정에 맞춘 향수',
    collections: [
      {
        id: 'romantic',
        name: '로맨틱',
        description: '사랑스럽고 로맨틱한 분위기',
        notes: ['로즈', '피오니', '앰버'],
        mood: '부드럽고 감성적인',
        recommendations: ['Viktor & Rolf Flowerbomb', 'Marc Jacobs Daisy']
      },
      {
        id: 'confident',
        name: '자신감',
        description: '당당하고 카리스마 넘치는 느낌',
        notes: ['우디', '스파이시', '레더'],
        mood: '강렬하고 카리스마 있는',
        recommendations: ['Chanel Bleu de Chanel', 'Tom Ford Oud Wood']
      },
      {
        id: 'peaceful',
        name: '평온',
        description: '마음이 차분해지는 안정감',
        notes: ['라벤더', '시더우드', '화이트 머스크'],
        mood: '평화롭고 안정적인',
        recommendations: ['L\'Occitane Lavande', 'Maison Margiela Lazy Sunday Morning']
      },
      {
        id: 'energetic',
        name: '활력',
        description: '생동감 넘치는 에너지',
        notes: ['시트러스', '민트', '그린'],
        mood: '상쾌하고 활기찬',
        recommendations: ['Hermès Un Jardin', 'Bvlgari Aqva']
      }
    ]
  }
};

const ConceptCollections = () => {
  const [activeCategory, setActiveCategory] = useState('season');
  const [activeCollection, setActiveCollection] = useState('spring');

  const currentCategory = CONCEPT_CATEGORIES[activeCategory as keyof typeof CONCEPT_CATEGORIES];
  const currentCollection = currentCategory.collections.find(col => col.id === activeCollection);

  return (
    <section className="py-32 bg-stone">
      <div className="w-full max-w-[1600px] mx-auto px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="mb-32 text-center max-w-4xl mx-auto">
          <div className="w-24 h-px bg-charcoal mb-12 mx-auto"></div>
          <h2 className="text-5xl lg:text-7xl font-light text-charcoal mb-8 leading-none">
            라이프스타일
            <br />
            향수 큐레이션
          </h2>
          <p className="text-xl lg:text-2xl text-slate leading-relaxed">
            당신의 일상과 기분에 완벽하게 어울리는
            <br />
            향수를 찾아보세요
          </p>
        </div>

        {/* Category Selector */}
        <div className="flex justify-center mb-24">
          <div className="flex gap-12">
            {Object.entries(CONCEPT_CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveCategory(key);
                  setActiveCollection(category.collections[0].id);
                }}
                className={`px-12 py-6 font-medium tracking-wide transition-all duration-300 ${
                  activeCategory === key
                    ? 'bg-charcoal text-pure'
                    : 'bg-pure text-charcoal hover:bg-ash'
                }`}
              >
                <div className="text-lg">{category.name}</div>
                <div className="text-xs opacity-70 mt-1">{category.subtitle}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Collection Grid - 8 columns */}
          <div className="lg:col-span-8">
            <div className="mb-12">
              <h3 className="text-3xl font-light text-charcoal mb-4">
                {currentCategory.name} 컬렉션
              </h3>
              <p className="text-lg text-slate">{currentCategory.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              {currentCategory.collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setActiveCollection(collection.id)}
                  className={`p-10 text-left transition-all duration-500 ${
                    activeCollection === collection.id
                      ? 'bg-charcoal text-pure'
                      : 'bg-pure text-charcoal hover:bg-ash'
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-2xl font-light mb-4">{collection.name}</h4>
                      <p className={`leading-relaxed ${
                        activeCollection === collection.id ? 'text-pure/80' : 'text-slate'
                      }`}>
                        {collection.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {collection.notes.slice(0, 2).map((note, index) => (
                        <span 
                          key={index}
                          className={`px-3 py-1 text-xs font-medium ${
                            activeCollection === collection.id
                              ? 'bg-pure/20 text-pure'
                              : 'bg-ash text-charcoal'
                          }`}
                        >
                          {note}
                        </span>
                      ))}
                    </div>

                    {/* Active indicator */}
                    <div className={`w-12 h-px transition-all duration-300 ${
                      activeCollection === collection.id ? 'bg-pure' : 'bg-charcoal'
                    }`}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Collection Details - 4 columns */}
          <div className="lg:col-span-4 space-y-12">
            {currentCollection && (
              <>
                {/* Main Details */}
                <div className="p-12 bg-pure">
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-3xl font-light text-charcoal mb-6">
                        {currentCollection.name}
                      </h4>
                      <p className="text-lg text-slate leading-relaxed">
                        {currentCollection.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <span className="text-sm font-medium text-charcoal uppercase tracking-wider">
                          특징적 무드
                        </span>
                        <p className="text-slate mt-2 text-lg">{currentCollection.mood}</p>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-charcoal uppercase tracking-wider">
                          주요 노트
                        </span>
                        <div className="grid grid-cols-1 gap-3 mt-3">
                          {currentCollection.notes.map((note, index) => (
                            <div 
                              key={index}
                              className="px-4 py-3 bg-ash text-charcoal text-center font-medium"
                            >
                              {note}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-charcoal uppercase tracking-wider">
                          추천 향수
                        </span>
                        <div className="mt-3 space-y-2">
                          {currentCollection.recommendations.map((rec, index) => (
                            <p key={index} className="text-slate">{rec}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Element */}
                <div className="relative h-80 bg-ash">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-slate">
                      <div className="text-6xl font-light text-charcoal mb-6">
                        {currentCollection.name}
                      </div>
                      <div className="text-sm uppercase tracking-wider">
                        {currentCategory.name} 컬렉션
                      </div>
                    </div>
                  </div>

                  {/* Geometric accent */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-charcoal"></div>
                </div>

                {/* CTA */}
                <Link
                  href={`/collections/${activeCategory}/${currentCollection.id}`}
                  className="block w-full px-12 py-6 border border-charcoal text-charcoal text-center font-medium uppercase tracking-wide hover:bg-charcoal hover:text-pure transition-all duration-300"
                >
                  컬렉션 자세히 보기
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptCollections; 