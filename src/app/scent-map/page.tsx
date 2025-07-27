'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HotplaceDestination, ScentMapFilters } from '@/types';
import { hotplaceService, addRealHotplaceData, addMoreRealHotplaceData } from '@/lib/firebaseService';
import { addBulkHotplaces, examplePlaces } from '@/lib/manualDataInput';
import { DEFAULT_FILTERS } from '@/constants/filterOptions';
import { filterHotplaces, searchPlaces, getFilterStats } from '@/utils/filterUtils';
import AdvancedScentMapFilters from '@/components/filters/AdvancedScentMapFilters';

export default function ScentMapPage() {
  const [hotplaces, setHotplaces] = useState<HotplaceDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ScentMapFilters>(DEFAULT_FILTERS);
  const [searchTerm, setSearchTerm] = useState('');

  // Firebase에서 데이터 로드
  useEffect(() => {
    loadHotplaces();
  }, []);

  const loadHotplaces = async () => {
    try {
      setLoading(true);
      const data = await hotplaceService.getAll();
      
      // 데이터가 없으면 실제 데이터 추가
      if (data.length === 0) {
        console.log('No data found, adding real hotplace data...');
        await addRealHotplaceData();
        const newData = await hotplaceService.getAll();
        setHotplaces(newData);
      } else {
        setHotplaces(data);
      }
    } catch (err) {
      console.error('Error loading hotplaces:', err);
      setError('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 필터링된 장소들 계산
  const filteredPlaces = useMemo(() => {
    let places = hotplaces;
    
    // 필터 적용
    places = filterHotplaces(places, filters);
    
    // 검색어 적용
    places = searchPlaces(places, searchTerm);
    
    return places;
  }, [hotplaces, filters, searchTerm]);

  // 통계 정보 계산
  const filterStats = useMemo(() => getFilterStats(filteredPlaces), [filteredPlaces]);

  // 실제 데이터 추가 함수
  const handleAddRealData = async () => {
    try {
      setLoading(true);
      await addRealHotplaceData();
      await loadHotplaces();
      alert('실제 데이터가 성공적으로 추가되었습니다!');
    } catch (err) {
      console.error('Error adding real data:', err);
      alert('데이터 추가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 추가 실제 데이터 추가 함수
  const handleAddMoreRealData = async () => {
    try {
      setLoading(true);
      await addMoreRealHotplaceData();
      await loadHotplaces();
      alert('추가 실제 데이터가 성공적으로 추가되었습니다!');
    } catch (err) {
      console.error('Error adding more real data:', err);
      alert('추가 데이터 추가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 데이터 전체 삭제 함수 (개발용)
  const handleClearAllData = async () => {
    if (!confirm('정말로 모든 데이터를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      return;
    }
    
    try {
      setLoading(true);
      // 모든 데이터 삭제
      for (const hotplace of hotplaces) {
        await hotplaceService.delete(hotplace.id);
      }
      await loadHotplaces();
      alert('모든 데이터가 삭제되었습니다.');
    } catch (err) {
      console.error('Error clearing data:', err);
      alert('데이터 삭제 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddExampleData = async () => {
    try {
      setLoading(true);
      await addBulkHotplaces(examplePlaces);
      await loadHotplaces(); // 데이터 다시 로드
      alert(`${examplePlaces.length}개의 예시 데이터가 추가되었습니다.`);
    } catch (err) {
      console.error('Error adding example data:', err);
      alert('예시 데이터 추가 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sage/30 border-t-sage rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/70">데이터를 불러오는 중...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-20 min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={loadHotplaces}
            className="px-6 py-2 bg-sage text-white rounded-lg hover:bg-sage/90"
          >
            다시 시도
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-sand">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/hero/hero-background.jpg"
            alt="Scent Map"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-5xl lg:text-7xl font-inter font-light text-charcoal">
              <span className="block">전국 향기 지도</span>
              <span className="block font-medium italic text-sage">Scent Map of Korea</span>
            </h1>
            <p className="text-lg lg:text-xl text-charcoal/70 max-w-3xl mx-auto">
              지역별로 특별한 향기를 품은 공간들을 한눈에 만나보세요.<br />
              각 지역만의 독특한 향기 문화를 발견할 수 있습니다.
            </p>
            
            {/* 개발자용 데이터 관리 버튼들 */}
            {/* 
            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap gap-4 justify-center">
                <button
                  onClick={handleAddExampleData}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-300"
                  disabled={loading}
                >
                  🎯 예시 데이터 추가 (재즈바, 생일카페, 갤러리, 콘서트홀)
                </button>
                <button
                  onClick={handleAddRealData}
                  className="px-6 py-3 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-all duration-300"
                  disabled={loading}
                >
                  기본 실제 데이터 추가
                </button>
                <button
                  onClick={handleAddMoreRealData}
                  className="px-6 py-3 bg-sage text-white rounded-lg hover:bg-sage/90 transition-all duration-300"
                  disabled={loading}
                >
                  추가 실제 데이터 추가
                </button>
                <button
                  onClick={handleClearAllData}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
                  disabled={loading}
                >
                  모든 데이터 삭제
                </button>
              </div>
              <p className="text-sm text-charcoal/50 text-center">
                현재 {hotplaces.length}개의 장소가 등록되어 있습니다.
              </p>
              <p className="text-xs text-charcoal/40 text-center">
                Firebase 연동 테스트용 - 실제 서비스에서는 제거 예정
              </p>
            </div>
            */}
          </div>
        </div>
      </section>

      {/* Advanced Filters */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <AdvancedScentMapFilters 
            filters={filters}
            onFiltersChange={setFilters}
            totalResults={filteredPlaces.length}
          />
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-6 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="장소명, 주소, 향기, 태그로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 pl-12 text-charcoal bg-white rounded-2xl shadow-sm border border-sand/30 focus:outline-none focus:ring-2 focus:ring-sage/30 focus:border-sage/50"
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-charcoal/40"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Places Grid */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-inter font-semibold text-charcoal mb-4">
              검색 결과
            </h2>
            <p className="text-charcoal/70">
              {filteredPlaces.length}개의 특별한 공간이 있습니다.
            </p>
            
            {/* 필터 통계 */}
            {filteredPlaces.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4">
                {Object.entries(filterStats.byCategory).map(([category, count]) => (
                  <span key={category} className="px-3 py-1 bg-white rounded-full text-sm text-charcoal/70">
                    {category}: {count}개
                  </span>
                ))}
              </div>
            )}
          </div>

          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlaces.map((place) => (
                <div key={place.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 bg-gradient-to-br from-sage/20 to-terracotta/20">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-sage/20 rounded-full mb-4"></div>
                        <h3 className="text-xl font-inter font-semibold text-charcoal">
                          {place.name}
                        </h3>
                        <p className="text-sm text-charcoal/60 mt-2">
                          {place.category}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-charcoal/70 text-sm mb-4 leading-relaxed">
                      {place.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-inter font-medium text-charcoal uppercase tracking-wider">
                          주소
                        </span>
                        <p className="text-sm text-charcoal/60 mt-1">
                          {place.location.address}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-xs font-inter font-medium text-charcoal uppercase tracking-wider">
                          시그니처 향
                        </span>
                        <p className="text-sm text-sage font-medium mt-1">
                          {place.signatureScent.name}
                        </p>
                      </div>

                      {place.tags && place.tags.length > 0 && (
                        <div>
                          <span className="text-xs font-inter font-medium text-charcoal uppercase tracking-wider">
                            태그
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {place.tags.slice(0, 3).map((tag, index) => (
                              <span key={index} className="text-xs bg-sand/70 text-charcoal/70 px-2 py-1 rounded-full">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`/scent-space/${place.id}`}
                      className="inline-flex items-center mt-6 px-4 py-2 bg-sage text-white text-sm font-inter font-medium rounded-lg hover:bg-sage/90 transition-all duration-300"
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
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-sand rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-charcoal/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-inter font-semibold text-charcoal mb-2">
                검색 조건에 맞는 향기 명소가 없습니다
              </h3>
              <p className="text-charcoal/60">
                곧 새로운 향기 명소들이 추가될 예정입니다.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}