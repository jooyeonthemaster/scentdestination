'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const MAGAZINE_ARTICLES = [
  {
    id: 'spring-hotplace-guide',
    category: 'SEASONAL GUIDE',
    title: '봄에 가면 더 특별한 향기 명소 5곳',
    excerpt: '벚꽃이 흩날리는 봄, 계절의 향기와 어우러져 더욱 매력적인 핫플레이스들을 소개합니다.',
    readTime: '8분',
    date: '2024.03.15',
    author: '김향기 여행가',
    featured: true,
    image: '/images/magazine/spring-guide.jpg',
    content: `봄은 모든 것이 새롭게 시작되는 계절입니다. 이 특별한 시기에 방문하면 더욱 매력적인 향기를 만날 수 있는 전국의 숨은 명소들을 소개합니다.

**1. 경주 첨성대 벚꽃길**
천년고도 경주의 첨성대 주변 벚꽃길은 봄에만 만날 수 있는 특별한 향기 공간입니다. 벚꽃의 달콤한 향기와 고대 역사가 만나는 이곳에서는 시간을 초월한 평온함을 경험할 수 있습니다.

**2. 제주 유채꽃밭**
제주의 유채꽃밭은 봄의 전령사입니다. 노란 유채꽃 사이로 불어오는 바다 바람과 함께하는 산책은 마음의 정화를 선사합니다.

**3. 전주 한옥마을**
봄이 되면 한옥마을의 처마 사이로 피어나는 꽃들의 향기가 전통의 멋과 어우러져 독특한 분위기를 연출합니다.`
  },
  {
    id: 'jeju-scent-map',
    category: 'DESTINATION GUIDE',
    title: '제주도 향기 지도: 3박 4일 완벽 코스',
    excerpt: '한라산부터 우도까지, 제주의 숨겨진 향기를 찾아 떠나는 3박 4일 여행 코스.',
    readTime: '12분',
    date: '2024.11.10',
    author: '박제주 큐레이터',
    featured: false,
    image: '/images/magazine/jeju-guide.jpg',
    content: `제주도는 섬 전체가 하나의 거대한 향기 정원입니다. 3박 4일 동안 제주의 다양한 향기를 체험할 수 있는 완벽한 코스를 제안합니다.

**Day 1: 제주시 도심 탐방**
- 오전: 제주공항 도착 후 동문재래시장에서 제주 전통의 향기 체험
- 오후: 연동 신시가지의 모던 카페들에서 도시적 감성 만끽
- 저녁: 탑동 해변가에서 바다 향기와 함께하는 석양 감상

**Day 2: 서부 해안 드라이브**
- 오전: 애월 해안도로를 따라 카페 투어
- 오후: 한라산 1100고지에서 숲의 깊은 향기 체험
- 저녁: 중문 해변에서 리조트의 럭셔리한 향기 경험`
  },
  {
    id: 'seoul-hidden-cafes',
    category: 'CITY GUIDE',
    title: '서울 숨은 향기 카페 10선',
    excerpt: '관광객은 모르는 서울 현지인들만 아는 특별한 향기를 간직한 카페들.',
    readTime: '10분',
    date: '2024.11.05',
    author: '이서울 탐방가',
    featured: false,
    image: '/images/magazine/seoul-cafes.jpg',
    content: `서울의 골목 곳곳에는 특별한 향기를 간직한 숨은 카페들이 있습니다. 현지인들만이 아는 이 특별한 공간들을 소개합니다.

**1. 연남동 '구름 위 향기'**
연남동 골목 깊숙이 자리한 이 카페는 라벤더와 로즈마리가 어우러진 독특한 향기로 유명합니다.

**2. 성수동 '콘크리트 드림'**
공장을 개조한 이 카페는 콘크리트와 녹슨 철의 차가운 향기와 따뜻한 커피의 대비가 인상적입니다.`
  },
  {
    id: 'traditional-scent-heritage',
    category: 'CULTURAL JOURNEY',
    title: '한국 전통 향기를 찾아서',
    excerpt: '전주 한옥마을부터 안동 하회마을까지, 천년의 역사가 깃든 전통 공간에서 만나는 우리나라 고유의 향기들.',
    readTime: '15분',
    date: '2024.10.20',
    author: '한전통 연구가',
    featured: true,
    image: '/images/magazine/traditional-heritage.jpg',
    content: `우리나라 전통 공간에는 천년의 세월이 만들어낸 특별한 향기들이 숨어있습니다. 이 소중한 문화유산을 찾아 떠나는 여행을 소개합니다.

**전주 한옥마을의 한지 향기**
한옥마을의 골목을 걸으며 만나는 한지의 은은한 향기는 우리 조상들의 지혜를 느낄 수 있게 해줍니다.

**안동 하회마을의 나무 향기**
600년 된 고택에서 풍겨오는 오래된 나무의 향기는 시간의 깊이를 느끼게 합니다.`
  },
  {
    id: 'winter-scent-journey',
    category: 'SEASONAL GUIDE',
    title: '겨울에만 만날 수 있는 특별한 향기들',
    excerpt: '눈 내리는 겨울, 계절이 선사하는 독특하고 아름다운 향기의 세계로 떠나보세요.',
    readTime: '9분',
    date: '2024.12.01',
    author: '윈터 센트 전문가',
    featured: false,
    image: '/images/magazine/winter-scents.jpg',
    content: `겨울은 다른 계절에는 경험할 수 없는 특별한 향기들을 선사합니다. 차가운 공기와 눈이 만들어내는 독특한 향기의 세계를 탐험해보세요.

**설악산 눈꽃 트레킹**
눈 덮인 설악산에서 만나는 청량하고 깨끗한 겨울 공기의 향기는 마음을 정화시켜 줍니다.

**강원도 스키장의 겨울 향기**
스키장의 톱밥과 눈이 어우러진 향기는 겨울 스포츠의 역동적인 에너지를 느끼게 합니다.`
  },
  {
    id: 'busan-coastal-scents',
    category: 'REGIONAL SPECIAL',
    title: '부산 해안가 향기 기행',
    excerpt: '바다 도시 부산만의 독특한 해안가 향기를 찾아 떠나는 특별한 여행.',
    readTime: '11분',
    date: '2024.11.20',
    author: '부산 향기 전문가',
    featured: false,
    image: '/images/magazine/busan-coastal.jpg',
    content: `부산은 바다와 산이 만나는 독특한 지형으로 인해 다른 도시에서는 경험할 수 없는 특별한 향기들을 간직하고 있습니다.

**해운대 해변의 바다 향기**
새벽 해운대 해변에서 만나는 바다의 짠 향기와 모래의 미세한 냄새는 부산만의 특별한 경험을 선사합니다.

**감천문화마을의 예술 향기**
골목 곳곳에 피어있는 벽화와 함께 느끼는 페인트와 바다 바람의 조화는 부산의 예술적 감성을 느끼게 합니다.`
  }
];

const CATEGORIES = ['ALL', 'SEASONAL GUIDE', 'DESTINATION GUIDE', 'CITY GUIDE', 'CULTURAL JOURNEY', 'REGIONAL SPECIAL'];

export default function MagazinePage() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const filteredArticles = selectedCategory === 'ALL' 
    ? MAGAZINE_ARTICLES 
    : MAGAZINE_ARTICLES.filter(article => article.category === selectedCategory);

  const featuredArticles = MAGAZINE_ARTICLES.filter(article => article.featured);

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-mocha py-20">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-sage/20 rounded-full">
              <div className="w-2 h-2 bg-sage rounded-full"></div>
              <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                Expert Curation
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
              <span className="block">향기 여행</span>
              <span className="block font-medium italic text-sage">전문가 매거진</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed font-inter font-light">
              향기 전문가들이 직접 경험하고 큐레이션한 특별한 여행 가이드와 감성 공간 정보를 만나보세요
            </p>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 bg-latte">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-inter font-light text-charcoal mb-6">
              <span className="block">이번 달</span>
              <span className="block font-medium italic text-warm">추천 아티클</span>
            </h2>
            <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed font-inter font-light">
              향기 전문가들이 엄선한 이번 달의 특별한 여행 가이드
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-charcoal/5"
              >
                <div className="relative h-80 bg-gradient-to-br from-sage/20 to-warm/20 overflow-hidden">
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-xs font-inter font-medium text-charcoal uppercase">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-sage text-white rounded-lg px-3 py-1">
                      <span className="text-xs font-inter font-medium uppercase">
                        Featured
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-2xl font-inter font-semibold text-charcoal mb-3 group-hover:text-sage transition-colors duration-300">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm font-inter text-charcoal/60 mb-4">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <p className="text-charcoal/70 font-inter leading-relaxed">
                    {article.excerpt}
                  </p>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="inline-flex items-center text-sage font-inter font-medium hover:text-sage/80 transition-colors duration-300"
                  >
                    전체 글 읽기
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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

      {/* All Articles Grid */}
      <section className="py-20">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-charcoal/5"
              >
                <div className="relative h-48 bg-gradient-to-br from-sage/20 to-warm/20 overflow-hidden">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex items-center justify-between text-xs font-inter text-charcoal/60">
                        <span>{article.category}</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-inter font-semibold text-charcoal mb-2 group-hover:text-sage transition-colors duration-300">
                      {article.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm font-inter text-charcoal/60 mb-3">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                  </div>

                  <p className="text-charcoal/70 font-inter text-sm leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="w-full mt-4 py-3 bg-sage/10 text-sage font-inter font-medium rounded-lg hover:bg-sage hover:text-white transition-all duration-300"
                  >
                    읽어보기
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-charcoal/10 p-6 flex items-center justify-between">
              <div>
                <div className="inline-block bg-sage/10 text-sage px-3 py-1 rounded-full text-xs font-inter font-medium uppercase mb-2">
                  {selectedArticle.category}
                </div>
                <h2 className="text-2xl font-inter font-semibold text-charcoal">
                  {selectedArticle.title}
                </h2>
                <div className="flex items-center space-x-4 text-sm font-inter text-charcoal/60 mt-2">
                  <span>{selectedArticle.author}</span>
                  <span>•</span>
                  <span>{selectedArticle.date}</span>
                  <span>•</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-charcoal/10 flex items-center justify-center hover:bg-charcoal/20 transition-colors duration-300"
              >
                <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="prose prose-lg max-w-none">
                <div className="text-xl font-inter text-charcoal/80 leading-relaxed mb-6">
                  {selectedArticle.excerpt}
                </div>
                
                <div className="text-charcoal/70 font-inter leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </div>
              </div>

              <div className="border-t border-charcoal/10 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                      <span className="text-sage font-inter font-semibold text-sm">
                        {selectedArticle.author.split(' ')[0][0]}
                      </span>
                    </div>
                    <div>
                      <div className="font-inter font-medium text-charcoal">
                        {selectedArticle.author}
                      </div>
                      <div className="text-sm font-inter text-charcoal/60">
                        향기 여행 전문가
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="w-10 h-10 bg-charcoal/5 rounded-lg flex items-center justify-center hover:bg-charcoal/10 transition-colors duration-300">
                      <svg className="w-5 h-5 text-charcoal/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-charcoal/5 rounded-lg flex items-center justify-center hover:bg-charcoal/10 transition-colors duration-300">
                      <svg className="w-5 h-5 text-charcoal/60" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center pt-6 border-t border-charcoal/10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/ai-scent-recommendation"
                    className="inline-flex items-center px-6 py-3 bg-sage text-white font-inter font-medium rounded-lg hover:bg-sage/90 transition-all duration-300"
                    onClick={() => setSelectedArticle(null)}
                  >
                    나만의 향 찾기
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <Link
                    href="/scent-map"
                    className="inline-flex items-center px-6 py-3 border-2 border-charcoal/20 text-charcoal font-inter font-medium rounded-lg hover:border-sage hover:bg-sage/5 transition-all duration-300"
                    onClick={() => setSelectedArticle(null)}
                  >
                    향기 지도 탐색
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Subscription */}
      <section className="py-20 bg-sand">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-inter font-light text-charcoal">
            <span className="block">매주 새로운</span>
            <span className="block font-medium italic text-sage">향기 이야기를 받아보세요</span>
          </h2>
          
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed font-inter font-light">
            향기 전문가들의 최신 가이드와 숨겨진 향기 명소 정보를 이메일로 받아보세요
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일 주소를 입력하세요"
                className="flex-1 px-4 py-3 rounded-lg border border-charcoal/20 focus:border-sage focus:outline-none font-inter"
              />
              <button className="px-6 py-3 bg-sage text-white font-inter font-medium rounded-lg hover:bg-sage/90 transition-all duration-300">
                구독하기
              </button>
            </div>
            <p className="text-xs text-charcoal/60 font-inter mt-2">
              언제든지 구독을 취소할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-latte">
        <div className="max-w-full mx-auto px-6 lg:px-16 xl:px-24 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-inter font-light text-charcoal">
            <span className="block">당신만의</span>
            <span className="block font-medium italic text-warm">향기 여행을 시작하세요</span>
          </h2>
          
          <p className="text-lg text-charcoal/70 max-w-2xl mx-auto leading-relaxed font-inter font-light">
            전문가가 추천하는 향기 명소를 직접 체험해보세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/scent-map"
              className="inline-flex items-center px-8 py-4 bg-sage text-white font-inter font-medium rounded-lg hover:bg-sage/90 transition-all duration-300"
            >
              향기 지도 탐색하기
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            
            <Link
              href="/scent-stories"
              className="inline-flex items-center px-8 py-4 border-2 border-charcoal/20 text-charcoal font-inter font-medium rounded-lg hover:border-sage hover:bg-sage/5 transition-all duration-300"
            >
              향기 이야기 보기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
} 