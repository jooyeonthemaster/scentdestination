'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SCENT_JOURNEY_ARTICLES = [
  {
    id: 'spring-hotplace-guide',
    category: 'SEASONAL GUIDE',
    title: '봄에 가면 더 특별한 향기 명소 5곳',
    excerpt: '벚꽃이 흩날리는 봄, 계절의 향기와 어우러져 더욱 매력적인 핫플레이스들을 소개합니다.',
    readTime: '8분',
    date: '2024.03.15',
    author: '김향기 여행가',
    featured: true
  },
  {
    id: 'jeju-scent-map',
    category: 'DESTINATION GUIDE',
    title: '제주도 향기 지도: 3박 4일 완벽 코스',
    excerpt: '한라산부터 우도까지, 제주의 숨겨진 향기를 찾아 떠나는 3박 4일 여행 코스.',
    readTime: '12분',
    date: '2024.11.10',
    author: '박제주 큐레이터',
    featured: false
  },
  {
    id: 'seoul-hidden-cafes',
    category: 'CITY GUIDE',
    title: '서울 숨은 향기 카페 10선',
    excerpt: '관광객은 모르는 서울 현지인들만 아는 특별한 향기를 간직한 카페들.',
    readTime: '10분',
    date: '2024.11.05',
    author: '이서울 탐방가',
    featured: false
  },
  {
    id: 'traditional-scent-heritage',
    category: 'CULTURAL JOURNEY',
    title: '한국 전통 향기를 찾아서',
    excerpt: '전주 한옥마을부터 안동 하회마을까지, 천년의 역사가 깃든 전통 공간에서 만나는 우리나라 고유의 향기들.',
    readTime: '15분',
    date: '2024.10.20',
    author: '한전통 연구가',
    featured: false
  }
];

const ExpertCuration = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  
  const categories = ['ALL', 'SEASONAL GUIDE', 'DESTINATION GUIDE', 'CITY GUIDE', 'CULTURAL JOURNEY'];
  
  const filteredArticles = selectedCategory === 'ALL' 
    ? SCENT_JOURNEY_ARTICLES 
    : SCENT_JOURNEY_ARTICLES.filter(article => article.category === selectedCategory);

  const featuredArticle = SCENT_JOURNEY_ARTICLES.find(article => article.featured);

  return (
    <section className="relative min-h-screen bg-mocha overflow-hidden">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/sections/expert-curation-background.jpg"
          alt="Expert curation background"
          fill
          className="object-cover object-center opacity-20"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-mocha/95 via-latte/80 to-sand/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-full mx-auto px-6 lg:px-16 xl:px-24 py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center min-h-screen">
            
            {/* Left Side - Content */}
            <div className="lg:col-span-6 space-y-12">
              {/* Section Label */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-sage/20 rounded-full">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                  Expert Curation
                </span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
                  <span className="block">향기 여행</span>
                  <span className="block font-medium italic text-sage">전문가 가이드</span>
                </h2>
                
                <p className="text-lg lg:text-xl text-charcoal/70 max-w-xl leading-relaxed font-inter font-light">
                  향기 전문가들이 직접 큐레이션한<br className="hidden sm:block" />
                  특별한 여행 가이드와 감성 공간 정보
                </p>
              </div>

              {/* Category Filter */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 text-sm font-inter font-medium rounded-full transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-sage text-white'
                          : 'bg-white/60 text-charcoal hover:bg-sage/20'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Article */}
              {featuredArticle && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-charcoal/5 shadow-lg">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-sage/20 text-sage text-xs font-inter font-medium uppercase tracking-wider rounded-full">
                        Featured
                      </span>
                      <span className="text-sm text-charcoal/60 font-inter">
                        {featuredArticle.readTime} 읽기
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-inter font-semibold text-charcoal mb-4">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-charcoal/70 font-inter leading-relaxed mb-4">
                        {featuredArticle.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 text-sm font-inter text-charcoal/60">
                        <span>{featuredArticle.author}</span>
                        <span>•</span>
                        <span>{featuredArticle.date}</span>
                      </div>
                    </div>

                    <Link
                      href={`/magazine/${featuredArticle.id}`}
                      className="inline-flex items-center px-6 py-3 bg-sage text-white font-inter font-medium rounded-lg hover:bg-sage/90 transition-all duration-300"
                    >
                      전체 가이드 보기
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Article Grid */}
            <div className="lg:col-span-6">
              <div className="relative">
                {/* Card Stack Effect */}
                <div className="absolute inset-0 transform rotate-1 opacity-30">
                  <div className="bg-sand rounded-2xl h-full w-full"></div>
                </div>
                <div className="absolute inset-0 transform -rotate-1 opacity-50">
                  <div className="bg-cream rounded-2xl h-full w-full"></div>
                </div>
                
                {/* Articles Grid */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-2">
                    {filteredArticles.slice(0, 4).map((article, index) => (
                      <Link
                        key={article.id}
                        href={`/magazine/${article.id}`}
                        className="block p-6 hover:bg-sand/30 transition-all duration-300 rounded-xl mb-2 last:mb-0 group"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 bg-latte text-charcoal text-xs font-inter font-medium uppercase tracking-wider rounded-full">
                              {article.category}
                            </span>
                            <span className="text-xs text-charcoal/60 font-inter">
                              {article.readTime}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-inter font-semibold text-charcoal mb-2 group-hover:text-sage transition-colors duration-300">
                              {article.title}
                            </h3>
                            <p className="text-sm text-charcoal/70 font-inter leading-relaxed">
                              {article.excerpt.slice(0, 80)}...
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-charcoal/60 font-inter">
                              {article.author}
                            </span>
                            <span className="text-xs text-charcoal/60 font-inter">
                              {article.date}
                            </span>
                          </div>

                          {/* Hover indicator */}
                          <div className="w-8 h-0.5 bg-sage transition-all duration-300 group-hover:w-16"></div>
                        </div>
                      </Link>
                    ))}

                    {/* View All Button */}
                    <div className="p-6 text-center">
                      <Link
                        href="/magazine"
                        className="inline-flex items-center text-sage font-inter font-medium hover:text-sage/80 transition-colors duration-300"
                      >
                        모든 가이드 보기
                        <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
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

export default ExpertCuration; 