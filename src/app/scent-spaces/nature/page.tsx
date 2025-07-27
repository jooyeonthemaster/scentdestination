'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HOTPLACE_DESTINATIONS } from '@/data/hotplaces';

export default function NaturePage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  
  // 자연명소 카테고리만 필터링
  const natureSpots = HOTPLACE_DESTINATIONS.filter(place => place.category === 'nature');
  
  // 지역 목록 추출
  const regions = ['all', ...new Set(natureSpots.map(spot => spot.location.region))];
  
  // 지역별 필터링
  const filteredSpots = selectedRegion === 'all' 
    ? natureSpots 
    : natureSpots.filter(spot => spot.location.region === selectedRegion);

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-green-50 to-cream">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/hero/nature-hero.jpg"
            alt="Nature Scents"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full mb-6">
              <span className="text-4xl">🌿</span>
              <span className="text-sm font-medium text-charcoal uppercase tracking-wider">
                Nature Scents
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-inter font-light text-charcoal">
              <span className="block">자연이 선물하는</span>
              <span className="block font-medium italic text-green-700">치유의 향기</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto">
              숲과 바다, 산과 들이 만들어내는 자연 그대로의 향기.<br />
              도시의 피로를 씻어내는 자연의 품으로 떠나보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Nature Spots List */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          {filteredSpots.map((spot, index) => (
            <div key={spot.id} className={`${index !== 0 ? 'mt-20' : ''}`}>
              <Link href={`/scent-space/${spot.id}`} className="group block">
                <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
                  <Image
                    src={spot.images[0]}
                    alt={spot.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex items-end justify-between">
                      <div>
                        <h2 className="text-4xl font-bold text-white mb-3">
                          {spot.name}
                        </h2>
                        <p className="text-white/90 text-lg">
                          {spot.location.address}
                        </p>
                      </div>
                      {spot.featured && (
                        <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-medium">
                          추천 명소
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <p className="text-lg text-charcoal/80 leading-relaxed">
                      {spot.description}
                    </p>
                    
                    <div>
                      <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-3">
                        특별한 포인트
                      </h3>
                      <p className="text-charcoal/70">
                        {spot.specialFeature}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-green-50 rounded-2xl p-6">
                      <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-3">
                        자연의 향기
                      </h3>
                      <p className="text-lg font-medium text-green-700 mb-2">
                        {spot.signatureScent.name}
                      </p>
                      <p className="text-charcoal/70 italic mb-4">
                        "{spot.signatureScent.experience}"
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {spot.signatureScent.notes.map((note, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-charcoal/70">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-charcoal/70">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{spot.visitInfo.bestTime}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-charcoal/70">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{spot.visitInfo.tips}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
