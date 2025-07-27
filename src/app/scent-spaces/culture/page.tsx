'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HOTPLACE_DESTINATIONS } from '@/data/hotplaces';

export default function CulturePage() {
  // 문화공간 카테고리만 필터링
  const cultureSpaces = HOTPLACE_DESTINATIONS.filter(place => place.category === 'culture');

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-purple-50 to-cream">
        <div className="absolute inset-0 opacity-25">
          <Image
            src="/images/hero/culture-hero.jpg"
            alt="Cultural Spaces"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 rounded-full mb-6">
              <span className="text-4xl">🏛️</span>
              <span className="text-sm font-medium text-charcoal uppercase tracking-wider">
                Cultural Heritage
              </span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-inter font-light text-charcoal">
              <span className="block">시간이 머무는</span>
              <span className="block font-medium italic text-purple-700">문화의 향기</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto">
              역사와 문화가 살아 숨쉬는 공간에서 느끼는 특별한 향기.<br />
              과거와 현재가 만나는 문화공간의 깊은 울림을 경험하세요.
            </p>
          </div>
        </div>
      </section>

      {/* Culture Spaces Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="space-y-24">
            {cultureSpaces.map((space, index) => (
              <div key={space.id} className={index % 2 === 0 ? '' : 'lg:flex-row-reverse'}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden group">
                    <Link href={`/scent-space/${space.id}`}>
                      <Image
                        src={space.images[0]}
                        alt={space.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-charcoal mb-4">
                        {space.name}
                      </h2>
                      <p className="text-purple-600 font-medium mb-6">
                        {space.location.address}
                      </p>
                      <p className="text-lg text-charcoal/80 leading-relaxed">
                        {space.description}
                      </p>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-6 space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-2">
                          문화공간의 향기
                        </h3>
                        <p className="text-xl font-semibold text-purple-700 mb-2">
                          {space.signatureScent.name}
                        </p>
                        <p className="text-charcoal/70 italic">
                          "{space.signatureScent.experience}"
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {space.signatureScent.notes.map((note, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white/80 rounded-full text-sm text-charcoal/70">
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-2">
                          관람 시간
                        </h4>
                        <p className="text-charcoal/70">{space.visitInfo.openingHours}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-charcoal uppercase tracking-wider mb-2">
                          추천 방문
                        </h4>
                        <p className="text-charcoal/70">{space.visitInfo.bestTime}</p>
                      </div>
                    </div>

                    <Link
                      href={`/scent-space/${space.id}`}
                      className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      자세히 보기
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
