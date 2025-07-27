'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SCENT_STORIES = [
  {
    id: 'jeju_story',
    title: '제주 애월 카페에서 찾은 나만의 향',
    location: '제주 애월 해안카페',
    visitor: '김서연, 29세 직장인',
    discovery: '애월 해안가 카페에서 바다 향기와 함께 느낀 첫 번째 순간, 그 평온함을 향으로 간직하고 싶었습니다',
    fragrance_found: 'Ocean Breeze Serenity',
    testimonial: '향수가 이렇게 추억과 감정을 생생하게 불러일으킬 수 있다는 걸 처음 알았어요. 지금도 힘들 때마다 이 향을 맡으며 제주에서의 평온함을 되찾곤 해요.',
    mood: '평온하고 자유로운'
  },
  {
    id: 'seongsu_story',
    title: '성수동 공장 카페에서 만난 나의 시그니처',
    location: '성수동 대림창고',
    visitor: '박준호, 32세 디자이너',
    discovery: '콘크리트 벽과 빈티지 가구들 사이에서 느낀 독특한 분위기, 그 감성을 향으로 담고 싶었어요',
    fragrance_found: 'Concrete Dreams',
    testimonial: '단순히 좋은 냄새가 아니라, 그 공간에서의 경험과 감정까지 함께 담겨있는 게 신기해요. 이제 이 향 없이는 작업이 안 될 정도에요.',
    mood: '창의적이고 역동적인'
  },
  {
    id: 'jeonju_story',
    title: '전주 한옥마을 찻집에서의 힐링',
    location: '전주 한옥마을 전통찻집',
    visitor: '이소민, 26세 대학원생',
    discovery: '한옥의 처마 아래서 마신 따뜻한 차와 함께 느낀 평온함을 향으로 기억하고 싶었습니다',
    fragrance_found: 'Hanok Tea Ceremony',
    testimonial: '전주 한옥마을에서의 그 평화로운 순간이 향에 고스란히 담겨있어요. 이 향을 맡으면 자연스럽게 마음이 차분해져요.',
    mood: '고요하고 정감 있는'
  }
];

const ScentSpaceStory = () => {
  const [activeStory, setActiveStory] = useState(0);
  const currentStory = SCENT_STORIES[activeStory];

  return (
    <section className="relative min-h-screen bg-latte overflow-hidden">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/sections/scent-stories-background.jpg"
          alt="Scent stories background"
          fill
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-latte/90 via-sand/70 to-cream/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-full mx-auto px-6 lg:px-16 xl:px-24 py-20">
          <div className="grid lg:grid-cols-12 gap-16 items-center min-h-screen">
            
            {/* Left Side - Story Content */}
            <div className="lg:col-span-7 space-y-12">
              {/* Section Label */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-warm/10 rounded-full">
                <div className="w-2 h-2 bg-warm rounded-full"></div>
                <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                  Real Stories
                </span>
              </div>
              
              {/* Main Title */}
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-6xl xl:text-7xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
                  <span className="block">향기와 함께한</span>
                  <span className="block font-medium italic text-warm">특별한 이야기</span>
                </h2>
                
                <p className="text-lg lg:text-xl text-charcoal/70 max-w-xl leading-relaxed font-inter font-light">
                  실제 방문자들이 경험한 감동적인 순간들과<br className="hidden sm:block" />
                  그들만의 시그니처 향 발견 여정
                </p>
              </div>

              {/* Current Story Details */}
              {currentStory && (
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-charcoal/5 shadow-lg">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-inter font-semibold text-charcoal mb-3">
                        {currentStory.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm font-inter text-charcoal/60 mb-4">
                        <span>{currentStory.visitor}</span>
                        <span>•</span>
                        <span>{currentStory.location}</span>
                      </div>
                    </div>

                    <p className="text-charcoal/80 font-inter leading-relaxed italic">
                      "{currentStory.discovery}"
                    </p>

                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                          발견한 향
                        </span>
                        <p className="text-warm font-inter font-semibold mt-1">{currentStory.fragrance_found}</p>
                      </div>

                      <div>
                        <span className="text-sm font-inter font-medium text-charcoal uppercase tracking-wider">
                          감성 무드
                        </span>
                        <p className="text-charcoal/70 font-inter mt-1">"{currentStory.mood}"</p>
                      </div>
                    </div>

                    <blockquote className="border-l-4 border-warm/30 pl-6 italic text-charcoal/70 font-inter leading-relaxed">
                      {currentStory.testimonial}
                    </blockquote>

                    <Link
                      href="/scent-stories"
                      className="inline-flex items-center px-6 py-3 bg-warm text-white font-inter font-medium rounded-lg hover:bg-warm/90 transition-all duration-300"
                    >
                      더 많은 이야기 보기
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Story Navigator */}
            <div className="lg:col-span-5">
              <div className="relative">
                {/* Card Stack Effect */}
                <div className="absolute inset-0 transform rotate-2 opacity-30">
                  <div className="bg-mocha rounded-2xl h-full w-full"></div>
                </div>
                <div className="absolute inset-0 transform -rotate-1 opacity-50">
                  <div className="bg-sand rounded-2xl h-full w-full"></div>
                </div>
                
                {/* Story Cards */}
                <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-2">
                    {SCENT_STORIES.map((story, index) => (
                      <button
                        key={story.id}
                        onClick={() => setActiveStory(index)}
                        className={`w-full p-6 text-left transition-all duration-500 rounded-xl mb-2 last:mb-0 ${
                          activeStory === index 
                            ? 'bg-warm text-white' 
                            : 'bg-transparent text-charcoal hover:bg-sand/30'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="w-8 h-8 bg-current opacity-20 rounded-lg"></div>
                          
                          <div>
                            <h3 className="text-lg font-inter font-semibold leading-tight mb-2">
                              {story.title}
                            </h3>
                            <p className={`text-sm font-inter ${
                              activeStory === index ? 'text-white/80' : 'text-charcoal/60'
                            }`}>
                              {story.location}
                            </p>
                          </div>

                          <div className={`text-xs italic font-inter ${
                            activeStory === index ? 'text-white/70' : 'text-charcoal/70'
                          }`}>
                            {story.visitor}
                          </div>

                          {/* Active indicator */}
                          <div className={`w-8 h-0.5 transition-all duration-300 ${
                            activeStory === index ? 'bg-white' : 'bg-warm'
                          }`}></div>
                        </div>
                      </button>
                    ))}
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

export default ScentSpaceStory; 