'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HOTPLACE_DESTINATIONS } from '@/data/hotplaces';

export default function CoastalPage() {
  // 해안가 카테고리만 필터링
  const coastalSpaces = HOTPLACE_DESTINATIONS.filter(place => place.category === 'coastal');

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-blue-50 to-cream">
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/hero/coastal-hero.jpg"
            alt="Coastal Spaces"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full mb-6">
              <span className="text-4xl">🌊</span>
              <span className="text-sm font-medium text-charcoal uppercase tracking-wider">
                Coastal Breeze
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-inter font-light text-charcoal">
              <span className="block">파도가 전하는</span>
              <span className="block font-medium italic text-blue-600">바다의 향기</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto">
              끝없이 펼쳐진 바다와 해안선이 만들어내는 특별한 향기.<br />
              짭짤한 바다 내음과 함께하는 힐링의 시간을 만나보세요.
            </p>
          </div>
        </div>
      </section>

      {/* Coastal Spaces Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {coastalSpaces.map((space) => (
              <div key={space.id} className="group">
                <Link href={`/scent-space/${space.id}`}>
                  <div className="relative h-64 lg:h-80 rounded-t-2xl overflow-hidden">
                    <Image
                      src={space.images[0]}
                      alt={space.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                    
                    {space.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                          BEST
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-white rounded-b-2xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold text-charcoal mb-3 group-hover:text-blue-600 transition-colors">
                      {space.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {space.location.region} • {space.location.address}
                    </p>
                    
                    <p className="text-charcoal/80 mb-6 line-clamp-3">
                      {space.description}
                    </p>

                    <div className="border-t border-sand/30 pt-6">
                      <h4 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-3">
                        바다의 시그니처 향
                      </h4>
                      <p className="font-medium text-blue-600 mb-2">
                        {space.signatureScent.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {space.signatureScent.notes.map((note, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 rounded-full text-xs text-blue-700">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-sm text-charcoal/60">
                        {space.visitInfo.bestTime}
                      </span>
                      <span className="text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                        자세히 보기 →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-blue-50 rounded-3xl p-12">
            <h3 className="text-2xl font-semibold text-charcoal mb-4">
              더 많은 해안 명소를 찾고 계신가요?
            </h3>
            <p className="text-charcoal/70 mb-8 max-w-2xl mx-auto">
              전국의 숨겨진 해안 절경과 특별한 바다 향기를 경험할 수 있는<br />
              다양한 장소들을 계속 업데이트하고 있습니다.
            </p>
            <Link
              href="/scent-map"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              향기 지도에서 더 보기
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
