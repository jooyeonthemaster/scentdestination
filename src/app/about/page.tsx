'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-sage/20 to-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-inter font-light text-charcoal mb-6">
              브랜드 스토리
            </h1>
            <p className="text-lg text-charcoal/70 font-inter leading-relaxed max-w-3xl mx-auto">
              향기로 연결되는 특별한 공간들의 이야기를 발견하고, <br />
              그 순간을 영원히 간직할 수 있도록 도와드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-inter font-light text-charcoal mb-6">
                우리의 미션
              </h2>
              <div className="space-y-6">
                <p className="text-charcoal/70 font-inter leading-relaxed">
                  전국 곳곳에 숨겨진 감성적인 공간들은 각각 고유한 향기를 가지고 있습니다. 
                  카페의 따뜻한 커피 향, 바닷가의 시원한 바다 내음, 숲속의 싱그러운 나무 향기까지.
                </p>
                <p className="text-charcoal/70 font-inter leading-relaxed">
                  이런 특별한 향기들을 직접 체험하고, 집에서도 그 순간을 다시 느낄 수 있도록 
                  세심하게 재현한 디퓨저를 제공하는 것이 우리의 목표입니다.
                </p>
                <p className="text-charcoal/70 font-inter leading-relaxed">
                  단순한 향기 제품이 아닌, 여행의 추억과 감성을 담은 특별한 경험을 선사합니다.
                </p>
              </div>
            </div>
            <div className="bg-sage/10 rounded-lg p-8">
              <h3 className="text-xl font-inter font-medium text-charcoal mb-4">
                핵심 가치
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-sage rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-charcoal/70 font-inter">
                    <strong className="text-charcoal">진정성:</strong> 실제 공간의 향기를 정확하게 재현
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-sage rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-charcoal/70 font-inter">
                    <strong className="text-charcoal">감성:</strong> 향기를 통한 감정과 기억의 연결
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-sage rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-charcoal/70 font-inter">
                    <strong className="text-charcoal">품질:</strong> 최고급 원료만을 사용한 프리미엄 제품
                  </span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-sage rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-charcoal/70 font-inter">
                    <strong className="text-charcoal">지속성:</strong> 환경을 생각하는 지속 가능한 제품
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-latte/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-inter font-light text-charcoal mb-6">
              시작된 이야기
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className="text-lg font-inter font-medium text-charcoal mb-4">
                발견
              </h3>
              <p className="text-charcoal/70 font-inter leading-relaxed text-sm">
                전국을 여행하며 특별한 향기를 가진 공간들을 직접 방문하고 발견합니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-inter font-medium text-charcoal mb-4">
                분석
              </h3>
              <p className="text-charcoal/70 font-inter leading-relaxed text-sm">
                각 공간의 고유한 향기를 과학적으로 분석하고 노트별로 세심하게 분해합니다.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-inter font-medium text-charcoal mb-4">
                재현
              </h3>
              <p className="text-charcoal/70 font-inter leading-relaxed text-sm">
                최고급 천연 오일을 사용해 그 공간만의 특별한 향기를 완벽하게 재현합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-inter font-light text-charcoal mb-6">
              팀 소개
            </h2>
            <p className="text-charcoal/70 font-inter leading-relaxed max-w-2xl mx-auto">
              향기와 공간, 그리고 사람들의 이야기를 연결하는 전문가들이 함께합니다.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-sm border border-charcoal/10">
            <div className="text-center">
              <div className="w-24 h-24 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">👩‍💼</span>
              </div>
              <h3 className="text-xl font-inter font-medium text-charcoal mb-2">
                유선화 대표
              </h3>
              <p className="text-sage font-inter mb-4">창립자 & CEO</p>
              <p className="text-charcoal/70 font-inter leading-relaxed max-w-md mx-auto">
                향기를 통해 사람들에게 특별한 경험과 감정을 선사하고자 하는 꿈을 가지고 
                Scent Destination을 시작했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-charcoal text-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-16 xl:px-24 text-center">
          <h2 className="text-3xl font-inter font-light mb-6">
            문의하기
          </h2>
          <p className="text-cream/70 font-inter leading-relaxed mb-8 max-w-2xl mx-auto">
            특별한 공간의 향기나 맞춤 디퓨저 제작에 대한 문의사항이 있으시면 언제든 연락 주세요.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="font-inter font-medium mb-2">사업장 주소</h3>
              <p className="text-cream/70 text-sm">마포구 신수동 250-23</p>
            </div>
            <div>
              <h3 className="font-inter font-medium mb-2">사업자 등록번호</h3>
              <p className="text-cream/70 text-sm">326-10-03024</p>
            </div>
            <div>
              <h3 className="font-inter font-medium mb-2">대표자</h3>
              <p className="text-cream/70 text-sm">유선화</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 