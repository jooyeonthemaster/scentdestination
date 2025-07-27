'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HOTPLACE_DESTINATIONS } from '@/data/hotplaces';

export default function CafesPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  // 카페 카테고리만 필터링
  const cafes = HOTPLACE_DESTINATIONS.filter(place => place.category === 'cafe');
  
  // 지역 목록 추출
  const regions = ['all', ...new Set(cafes.map(cafe => cafe.location.region))];
  
  // 지역별 필터링
  const filteredCafes = selectedRegion === 'all' 
    ? cafes 
    : cafes.filter(cafe => cafe.location.region === selectedRegion);

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-latte">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero/cafes-hero.jpg"
            alt="Scent Cafes"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full mb-6">
              <span className="text-4xl">☕</span>
              <span className="text-sm font-medium text-charcoal uppercase tracking-wider">
                Scent Cafes
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-inter font-light text-charcoal">
              <span className="block">특별한 향기가 있는</span>
              <span className="block font-medium italic text-terracotta">감성 카페</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto">
              커피향과 공간의 향이 어우러진 전국의 특별한 카페들을 만나보세요.<br />
              각 카페만의 독특한 분위기와 시그니처 향을 경험할 수 있습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Region Filter */}
      <section className="py-8 bg-white border-b border-sand/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedRegion === region
                    ? 'bg-terracotta text-white'
                    : 'bg-sand/50 text-charcoal hover:bg-sand'
                }`}
              >
                {region === 'all' ? '전체' : region}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cafes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {filteredCafes.map((cafe) => (
              <div key={cafe.id} className="group">
                <Link href={`/scent-space/${cafe.id}`} className="block">
                  <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={cafe.images[0]}
                      alt={cafe.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {cafe.featured && (
                      <div className="absolute top-6 right-6">
                        <span className="px-4 py-2 bg-terracotta text-white rounded-full text-sm font-medium">
                          추천
                        </span>
                      </div>
                    )}
                    
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-3xl font-semibold text-white mb-2">
                        {cafe.name}
                      </h3>
                      <p className="text-white/80">{cafe.location.address}</p>
                    </div>
                  </div>
                </Link>

                <div className="space-y-6">
                  <p className="text-charcoal/80 text-lg leading-relaxed">
                    {cafe.description}
                  </p>

                  <div className="bg-sand/30 rounded-xl p-6 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-2">
                        시그니처 향
                      </h4>
                      <p className="text-lg font-medium text-terracotta mb-2">
                        {cafe.signatureScent.name}
                      </p>
                      <p className="text-charcoal/70 italic">
                        "{cafe.signatureScent.experience}"
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {cafe.signatureScent.notes.map((note, index) => (
                        <span key={index} className="px-3 py-1 bg-white rounded-full text-sm text-charcoal/70">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-charcoal uppercase tracking-wider">
                        운영시간
                      </h4>
                      <p className="text-charcoal/70">{cafe.visitInfo.openingHours}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-charcoal uppercase tracking-wider">
                        추천 시간
                      </h4>
                      <p className="text-charcoal/70">{cafe.visitInfo.bestTime}</p>
                    </div>
                  </div>

                  <Link
                    href={`/scent-space/${cafe.id}`}
                    className="inline-flex items-center text-terracotta font-medium hover:text-terracotta/80 transition-colors"
                  >
                    자세히 보기
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
