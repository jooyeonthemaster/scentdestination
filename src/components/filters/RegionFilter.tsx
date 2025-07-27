'use client';

import React, { useState } from 'react';
import { ScentMapFilters } from '@/types';
import { FILTER_OPTIONS } from '@/constants/filterOptions';

interface RegionFilterProps {
  filters: ScentMapFilters;
  onFiltersChange: (filters: ScentMapFilters) => void;
}

export default function RegionFilter({ filters, onFiltersChange }: RegionFilterProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleProvinceChange = (province: string) => {
    const newFilters = {
      ...filters,
      region: {
        province,
        city: undefined,
        district: undefined
      }
    };
    onFiltersChange(newFilters);
  };

  const handleCityChange = (city: string) => {
    const newFilters = {
      ...filters,
      region: {
        ...filters.region,
        city,
        district: undefined
      }
    };
    onFiltersChange(newFilters);
  };

  const handleDistrictChange = (district: string) => {
    const newFilters = {
      ...filters,
      region: {
        ...filters.region,
        district
      }
    };
    onFiltersChange(newFilters);
  };

  const clearRegionFilter = () => {
    const newFilters = {
      ...filters,
      region: {}
    };
    onFiltersChange(newFilters);
  };

  const availableCities = filters.region.province 
    ? FILTER_OPTIONS.cities[filters.region.province] || []
    : [];

  const availableDistricts = filters.region.city 
    ? FILTER_OPTIONS.districts[filters.region.city] || []
    : [];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-inter font-medium text-charcoal">
          지역 선택
        </h3>
        {(filters.region.province || filters.region.city || filters.region.district) && (
          <button
            onClick={clearRegionFilter}
            className="text-xs text-terracotta hover:text-terracotta/80"
          >
            초기화
          </button>
        )}
      </div>

      {/* 시/도 선택 */}
      <div>
        <button
          onClick={() => setExpandedSection(expandedSection === 'province' ? null : 'province')}
          className="w-full flex items-center justify-between p-2.5 bg-sand/30 rounded-md hover:bg-sand/50 transition-colors"
        >
          <span className="text-sm font-medium text-charcoal">
            {filters.region.province || '시/도 선택'}
          </span>
          <svg 
            className={`w-4 h-4 transition-transform ${expandedSection === 'province' ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
                 {expandedSection === 'province' && (
           <div className="mt-1 max-h-40 overflow-y-auto bg-white rounded-md border border-sand shadow-sm">
            {FILTER_OPTIONS.provinces.map((province) => (
              <button
                key={province}
                onClick={() => {
                  handleProvinceChange(province);
                  setExpandedSection(null);
                }}
                className={`w-full text-left px-3 py-2 text-sm hover:bg-sand/30 transition-colors ${
                  filters.region.province === province ? 'bg-sage/20 text-sage font-medium' : 'text-charcoal'
                }`}
              >
                {province}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 시/군/구 선택 */}
      {availableCities.length > 0 && (
        <div>
          <button
            onClick={() => setExpandedSection(expandedSection === 'city' ? null : 'city')}
            className="w-full flex items-center justify-between p-3 bg-sand/30 rounded-lg hover:bg-sand/50 transition-colors"
          >
            <span className="text-sm font-medium text-charcoal">
              {filters.region.city || '시/군/구 선택'}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSection === 'city' ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSection === 'city' && (
            <div className="mt-2 max-h-48 overflow-y-auto bg-white rounded-lg border border-sand shadow-sm">
              {availableCities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    handleCityChange(city);
                    setExpandedSection(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-sand/30 transition-colors ${
                    filters.region.city === city ? 'bg-sage/20 text-sage font-medium' : 'text-charcoal'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 동/읍/면 선택 */}
      {availableDistricts.length > 0 && (
        <div>
          <button
            onClick={() => setExpandedSection(expandedSection === 'district' ? null : 'district')}
            className="w-full flex items-center justify-between p-3 bg-sand/30 rounded-lg hover:bg-sand/50 transition-colors"
          >
            <span className="text-sm font-medium text-charcoal">
              {filters.region.district || '동/읍/면 선택'}
            </span>
            <svg 
              className={`w-4 h-4 transition-transform ${expandedSection === 'district' ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {expandedSection === 'district' && (
            <div className="mt-2 max-h-48 overflow-y-auto bg-white rounded-lg border border-sand shadow-sm">
              {availableDistricts.map((district) => (
                <button
                  key={district}
                  onClick={() => {
                    handleDistrictChange(district);
                    setExpandedSection(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-sand/30 transition-colors ${
                    filters.region.district === district ? 'bg-sage/20 text-sage font-medium' : 'text-charcoal'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 선택된 지역 표시 */}
      {(filters.region.province || filters.region.city || filters.region.district) && (
        <div className="mt-3 p-3 bg-sage/10 rounded-lg">
          <p className="text-sm text-charcoal">
            <span className="font-medium">선택된 지역:</span>{' '}
            {[filters.region.province, filters.region.city, filters.region.district]
              .filter(Boolean)
              .join(' > ')}
          </p>
        </div>
      )}
    </div>
  );
} 