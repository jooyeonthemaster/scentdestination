'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const SCENT_STORIES = [
  {
    id: 'jeju_story',
    title: '제주 애월 카페에서 찾은 나만의 향',
    location: '제주 애월 해안카페',
    visitor: '김서연, 29세 직장인',
    discovery: '애월 해안가 카페에서 바다 향기와 함께 느낀 첫 번째 순간, 그 평온함을 향으로 간직하고 싶었습니다',
    fragrance_found: 'Ocean Breeze Serenity',
    testimonial: '향수가 이렇게 추억과 감정을 생생하게 불러일으킬 수 있다는 걸 처음 알았어요. 지금도 힘들 때마다 이 향을 맡으며 제주에서의 평온함을 되찾곤 해요.',
    mood: '평온하고 자유로운',
    date: '2024.11.15',
    readTime: '5분',
    category: 'Ocean',
    image: '/images/stories/jeju-story.jpg'
  },
  {
    id: 'seongsu_story',
    title: '성수동 공장 카페에서 만난 나의 시그니처',
    location: '성수동 대림창고',
    visitor: '박준호, 32세 디자이너',
    discovery: '콘크리트 벽과 빈티지 가구들 사이에서 느낀 독특한 분위기, 그 감성을 향으로 담고 싶었어요',
    fragrance_found: 'Concrete Dreams',
    testimonial: '단순히 좋은 냄새가 아니라, 그 공간에서의 경험과 감정까지 함께 담겨있는 게 신기해요. 이제 이 향 없이는 작업이 안 될 정도에요.',
    mood: '창의적이고 역동적인',
    date: '2024.11.10',
    readTime: '7분',
    category: 'Urban',
    image: '/images/stories/seongsu-story.jpg'
  },
  {
    id: 'jeonju_story',
    title: '전주 한옥마을 찻집에서의 힐링',
    location: '전주 한옥마을 전통찻집',
    visitor: '이소민, 26세 대학원생',
    discovery: '한옥의 처마 아래서 마신 따뜻한 차와 함께 느낀 평온함을 향으로 기억하고 싶었습니다',
    fragrance_found: 'Hanok Tea Ceremony',
    testimonial: '전주 한옥마을에서의 그 평화로운 순간이 향에 고스란히 담겨있어요. 이 향을 맡으면 자연스럽게 마음이 차분해져요.',
    mood: '고요하고 정감 있는',
    date: '2024.11.05',
    readTime: '6분',
    category: 'Heritage',
    image: '/images/stories/jeonju-story.jpg'
  },
  {
    id: 'busan_story',
    title: '부산 감천문화마을에서 발견한 예술의 향기',
    location: '부산 감천문화마을',
    visitor: '최예린, 24세 예술가',
    discovery: '알록달록한 벽화들 사이를 걸으며 느낀 예술가들의 창의적 에너지와 바다 내음이 어우러진 특별한 순간',
    fragrance_found: 'Artist Village Dreams',
    testimonial: '감천마을의 계단을 오르내리며 만난 수많은 작품들처럼, 이 향도 제 안에서 새로운 영감을 불러일으켜요.',
    mood: '창의적이고 따뜻한',
    date: '2024.10.28',
    readTime: '8분',
    category: 'Culture',
    image: '/images/stories/busan-story.jpg'
  },
  {
    id: 'gangneung_story',
    title: '강릉 커피거리에서 찾은 완벽한 모닝',
    location: '강릉 안목해변 커피거리',
    visitor: '정민석, 35세 회사원',
    discovery: '새벽 해변 산책 후 마신 커피와 함께 바라본 일출, 그 완벽한 순간을 향으로 담고 싶었어요',
    fragrance_found: 'Morning Coffee Waves',
    testimonial: '바쁜 일상 속에서도 이 향을 맡으면 강릉에서의 그 여유로운 아침이 떠올라요. 진정한 휴식의 향이에요.',
    mood: '여유롭고 상쾌한',
    date: '2024.10.20',
    readTime: '5분',
    category: 'Coastal',
    image: '/images/stories/gangneung-story.jpg'
  },
  {
    id: 'gyeongju_story',
    title: '경주 불국사에서 만난 천년의 향기',
    location: '경주 불국사',
    visitor: '송미래, 45세 교수',
    discovery: '천년 고찰에서 풍겨오는 향과 함께 느낀 시간의 깊이와 마음의 평화',
    fragrance_found: 'Temple Serenity',
    testimonial: '역사의 무게감과 동시에 마음을 정화시키는 힘이 있어요. 명상할 때 꼭 필요한 향이 되었습니다.',
    mood: '평화롭고 숭고한',
    date: '2024.10.15',
    readTime: '9분',
    category: 'Heritage',
    image: '/images/stories/gyeongju-story.jpg'
  }
];

const CATEGORIES = ['All', 'Ocean', 'Urban', 'Heritage', 'Culture', 'Coastal'];

export default function ScentStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const filteredStories = selectedCategory === 'All' 
    ? SCENT_STORIES 
    : SCENT_STORIES.filter(story => story.category === selectedCategory);

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-sand py-20">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-sage/10 rounded-full">
              <div className="w-2 h-2 bg-sage rounded-full"></div>
              <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                Real Stories
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
              <span className="block">향기와 함께한</span>
              <span className="block font-medium italic text-sage">특별한 이야기</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed font-inter font-light">
              실제 방문자들이 경험한 감동적인 순간들과 그들만의 시그니처 향 발견 여정을 만나보세요
            </p>
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
                    ? 'bg-sage text-white shadow-lg'
                    : 'bg-white border border-charcoal/20 text-charcoal hover:border-sage hover:bg-sage/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-charcoal/5"
              >
                {/* Story Image */}
                <div className="relative h-64 bg-sand overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-sage/20 to-terracotta/20"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-xs font-inter text-charcoal/60">
                        <span>{story.category}</span>
                        <span>{story.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Story Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-inter font-semibold text-charcoal mb-2 group-hover:text-sage transition-colors duration-300">
                      {story.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm font-inter text-charcoal/60 mb-3">
                      <span>{story.visitor}</span>
                      <span>•</span>
                      <span>{story.location}</span>
                    </div>
                  </div>

                  <p className="text-charcoal/70 font-inter text-sm leading-relaxed line-clamp-3">
                    {story.discovery}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                    <div className="text-xs font-inter text-charcoal/60">
                      {story.date}
                    </div>
                    <div className="text-xs font-inter italic text-sage">
                      "{story.mood}"
                    </div>
                  </div>

                  {/* Story CTA */}
                  <button
                    onClick={() => setSelectedStory(story)}
                    className="w-full mt-4 py-3 bg-sage/10 text-sage font-inter font-medium rounded-lg hover:bg-sage hover:text-white transition-all duration-300"
                  >
                    전체 이야기 보기
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-charcoal/10 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-inter font-semibold text-charcoal">
                {selectedStory.title}
              </h2>
              <button
                onClick={() => setSelectedStory(null)}
                className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-charcoal/20 transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-sage/10 rounded-full">
                  <span className="text-sm font-inter font-medium text-charcoal/70">
                    {selectedStory.visitor} • {selectedStory.location}
                  </span>
                </div>
                
                <h3 className="text-lg font-inter font-semibold text-sage">
                  발견한 향: {selectedStory.fragrance_found}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-inter font-medium text-charcoal mb-2">발견의 순간</h4>
                  <p className="text-sm text-charcoal/70 leading-relaxed">
                    &ldquo;{selectedStory.discovery}&rdquo;
                  </p>
                </div>

                <div>
                  <h4 className="font-inter font-medium text-charcoal mb-2">경험담</h4>
                  <blockquote className="text-charcoal/70 font-inter leading-relaxed italic border-l-4 border-sage/30 pl-4">
                    &ldquo;{selectedStory.testimonial}&rdquo;
                  </blockquote>
                </div>

                <div className="text-center py-4">
                  <div className="inline-flex items-center space-x-2 px-6 py-3 bg-sand rounded-lg">
                    <span className="text-sm font-inter font-medium text-charcoal">
                      분위기: {selectedStory.mood}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6">
                <Link
                  href="/ai-scent-recommendation"
                  className="inline-flex items-center px-6 py-3 bg-terracotta text-white font-inter font-medium rounded-lg hover:bg-terracotta/90 transition-all duration-300"
                  onClick={() => setSelectedStory(null)}
                >
                  나만의 향 찾기
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-latte">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-inter font-light text-charcoal">
            <span className="block">당신만의</span>
            <span className="block font-medium italic text-warm">향기 이야기를 시작하세요</span>
          </h2>
          
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed font-inter font-light">
            AI가 추천하는 맞춤형 향기 여행으로 새로운 감성을 발견해보세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai-scent-recommendation"
              className="inline-flex items-center px-8 py-4 bg-terracotta text-white font-inter font-medium rounded-lg hover:bg-terracotta/90 transition-all duration-300"
            >
              AI 향수 추천 받기
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              href="/scent-map"
              className="inline-flex items-center px-8 py-4 border-2 border-charcoal/20 text-charcoal font-inter font-medium rounded-lg hover:border-sage hover:bg-sage/5 transition-all duration-300"
            >
              향기 지도 탐색하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 