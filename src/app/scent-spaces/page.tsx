'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HOTPLACE_CATEGORIES } from '@/constants';
import { HOTPLACE_DESTINATIONS } from '@/data/hotplaces';
import { HotplaceType } from '@/types';

export default function ScentSpacesPage() {
  const [selectedCategory, setSelectedCategory] = useState<HotplaceType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 필터링된 장소들
  const filteredPlaces = HOTPLACE_DESTINATIONS.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.region.includes(searchQuery) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-sand">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/scent-spaces-hero.jpg"
            alt="Scent Spaces"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sand/80 to-cream/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-7xl font-inter font-light text-charcoal">
              <span className="block">향기로 만나는</span>
              <span className="block font-medium italic text-sage">특별한 공간들</span>
            </h1>
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto">
              전국 곳곳의 독특한 향기를 지닌 핫플레이스를 발견하고,<br />
              각 공간만의 시그니처 향을 경험해보세요
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="지역, 공간명, 향기로 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-12 py-4 bg-sand/30 rounded-full text-charcoal placeholder-charcoal/50 focus:outline-none focus:ring-2 focus:ring-sage/50"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === 'all'
                    ? 'bg-sage text-white'
                    : 'bg-sand/50 text-charcoal hover:bg-sand'
                }`}
              >
                전체보기
              </button>
              {Object.entries(HOTPLACE_CATEGORIES).slice(0, 5).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as HotplaceType)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === key
                      ? 'bg-sage text-white'
                      : 'bg-sand/50 text-charcoal hover:bg-sand'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-charcoal/70">
              {filteredPlaces.length}개의 향기 공간을 발견했습니다
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/scent-space/${place.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={place.images[0]}
                    alt={place.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-charcoal">
                      {HOTPLACE_CATEGORIES[place.category].label}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {place.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-sage text-white rounded-full text-sm font-medium">
                        추천
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-charcoal mb-1 group-hover:text-sage transition-colors">
                      {place.name}
                    </h3>
                    <p className="text-sm text-charcoal/60">{place.location.region} · {place.location.address}</p>
                  </div>

                  <p className="text-charcoal/70 line-clamp-2">
                    {place.description}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-sage">시그니처 향:</span>
                      <span className="text-sm text-charcoal/70">{place.signatureScent.name}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {place.signatureScent.notes.slice(0, 3).map((note, index) => (
                        <span key={index} className="px-2 py-1 bg-sand/50 rounded-full text-xs text-charcoal/70">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-sm text-charcoal/60">{place.visitInfo.bestTime}</span>
                    <svg className="w-5 h-5 text-sage group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredPlaces.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-charcoal/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-charcoal/70 mb-2">검색 결과가 없습니다</h3>
              <p className="text-charcoal/50">다른 검색어나 카테고리를 선택해보세요</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
