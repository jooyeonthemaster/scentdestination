'use client';

import React, { useState } from 'react';
import { ScentMapFilters } from '@/types';
import { DEFAULT_FILTERS } from '@/constants/filterOptions';
import RegionFilter from './RegionFilter';
import CategoryFilter from './CategoryFilter';
import ScentFilter from './ScentFilter';
import AtmosphereFilter from './AtmosphereFilter';

interface AdvancedScentMapFiltersProps {
  filters: ScentMapFilters;
  onFiltersChange: (filters: ScentMapFilters) => void;
  totalResults: number;
}

export default function AdvancedScentMapFilters({ 
  filters, 
  onFiltersChange, 
  totalResults 
}: AdvancedScentMapFiltersProps) {
  const [activeSection, setActiveSection] = useState<string | null>('region');

  const clearAllFilters = () => {
    onFiltersChange(DEFAULT_FILTERS);
  };

  const hasActiveFilters = () => {
    return (
      filters.region.province || filters.region.city || filters.region.district ||
      filters.categories.length > 0 ||
      filters.scentNotes.topNotes.length > 0 ||
      filters.scentNotes.middleNotes.length > 0 ||
      filters.scentNotes.baseNotes.length > 0 ||
      filters.atmosphere.length > 0 ||
      filters.tags.length > 0
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.region.province || filters.region.city || filters.region.district) count++;
    if (filters.categories.length > 0) count++;
    if (filters.scentNotes.topNotes.length > 0 || 
        filters.scentNotes.middleNotes.length > 0 || 
        filters.scentNotes.baseNotes.length > 0) count++;
    if (filters.atmosphere.length > 0) count++;
    if (filters.tags.length > 0) count++;
    return count;
  };

  const filterSections = [
    { key: 'region', label: '지역', icon: '🗺️', component: RegionFilter },
    { key: 'category', label: '공간 유형', icon: '🏛️', component: CategoryFilter },
    { key: 'scent', label: '향기 노트', icon: '🌺', component: ScentFilter },
    { key: 'atmosphere', label: '분위기 & 태그', icon: '🎭', component: AtmosphereFilter }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-sand/30 overflow-hidden">
      {/* 컴팩트한 필터 헤더 */}
      <div className="px-6 py-4 border-b border-sand/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-inter font-semibold text-charcoal">
              🔍 필터
            </h2>
            {hasActiveFilters() && (
              <span className="px-2 py-1 bg-sage text-white text-xs font-medium rounded-full">
                {getActiveFilterCount()}개
              </span>
            )}
            <span className="text-sm text-charcoal/60">
              {totalResults}개 장소
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters() && (
              <button
                onClick={clearAllFilters}
                className="px-3 py-1.5 text-xs font-medium text-terracotta hover:text-terracotta/80 hover:bg-terracotta/5 rounded-md transition-colors"
              >
                전체 초기화
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 가로 필터 탭 */}
      <div className="px-6 py-3 bg-sand/10 border-b border-sand/20">
        <div className="flex space-x-1">
          {filterSections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.key
                  ? 'bg-sage text-white shadow-sm'
                  : 'text-charcoal hover:bg-sand/30'
              }`}
            >
              <span className="text-base">{section.icon}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 필터 내용 */}
      <div className="p-6">
        {activeSection === 'region' && (
          <RegionFilter filters={filters} onFiltersChange={onFiltersChange} />
        )}
        {activeSection === 'category' && (
          <CategoryFilter filters={filters} onFiltersChange={onFiltersChange} />
        )}
        {activeSection === 'scent' && (
          <ScentFilter filters={filters} onFiltersChange={onFiltersChange} />
        )}
        {activeSection === 'atmosphere' && (
          <AtmosphereFilter filters={filters} onFiltersChange={onFiltersChange} />
        )}
      </div>

      {/* 활성 필터 요약 */}
      {hasActiveFilters() && (
        <div className="px-6 py-3 bg-sage/5 border-t border-sand/20">
          <div className="flex flex-wrap gap-2">
            {filters.region.province && (
              <span className="px-2 py-1 bg-sage/20 text-sage text-xs rounded-md">
                📍 {filters.region.province}
                {filters.region.city && ` > ${filters.region.city}`}
                {filters.region.district && ` > ${filters.region.district}`}
              </span>
            )}
            {filters.categories.map((category) => (
              <span key={category} className="px-2 py-1 bg-sage/20 text-sage text-xs rounded-md">
                🏛️ {category}
              </span>
            ))}
            {(filters.scentNotes.topNotes.length > 0 || 
              filters.scentNotes.middleNotes.length > 0 || 
              filters.scentNotes.baseNotes.length > 0) && (
              <span className="px-2 py-1 bg-sage/20 text-sage text-xs rounded-md">
                🌺 향기노트 {filters.scentNotes.topNotes.length + filters.scentNotes.middleNotes.length + filters.scentNotes.baseNotes.length}개
              </span>
            )}
            {filters.atmosphere.length > 0 && (
              <span className="px-2 py-1 bg-sage/20 text-sage text-xs rounded-md">
                🎭 분위기 {filters.atmosphere.length}개
              </span>
            )}
            {filters.tags.length > 0 && (
              <span className="px-2 py-1 bg-sage/20 text-sage text-xs rounded-md">
                🏷️ 태그 {filters.tags.length}개
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 