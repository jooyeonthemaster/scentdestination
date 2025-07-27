'use client';

import React from 'react';
import { ScentMapFilters } from '@/types';
import { FILTER_OPTIONS } from '@/constants/filterOptions';

interface AtmosphereFilterProps {
  filters: ScentMapFilters;
  onFiltersChange: (filters: ScentMapFilters) => void;
}

export default function AtmosphereFilter({ filters, onFiltersChange }: AtmosphereFilterProps) {
  const handleAtmosphereToggle = (atmosphere: string) => {
    const newAtmospheres = filters.atmosphere.includes(atmosphere)
      ? filters.atmosphere.filter(a => a !== atmosphere)
      : [...filters.atmosphere, atmosphere];

    const newFilters = {
      ...filters,
      atmosphere: newAtmospheres
    };
    onFiltersChange(newFilters);
  };

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];

    const newFilters = {
      ...filters,
      tags: newTags
    };
    onFiltersChange(newFilters);
  };

  const clearAtmosphere = () => {
    const newFilters = {
      ...filters,
      atmosphere: []
    };
    onFiltersChange(newFilters);
  };

  const clearTags = () => {
    const newFilters = {
      ...filters,
      tags: []
    };
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* 분위기 필터 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-inter font-medium text-charcoal">
            분위기
          </h3>
          {filters.atmosphere.length > 0 && (
            <button
              onClick={clearAtmosphere}
              className="text-xs text-terracotta hover:text-terracotta/80"
            >
              초기화
            </button>
          )}
        </div>

                 <div className="flex flex-wrap gap-1.5">
           {FILTER_OPTIONS.atmospheres.map((atmosphere) => {
             const isSelected = filters.atmosphere.includes(atmosphere);
             
             return (
               <button
                 key={atmosphere}
                 onClick={() => handleAtmosphereToggle(atmosphere)}
                 className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                   isSelected
                     ? 'bg-sage text-white shadow-sm'
                     : 'bg-white border border-sand hover:border-sage/30 text-charcoal hover:bg-sage/5'
                 }`}
               >
                 {atmosphere}
               </button>
             );
           })}
        </div>

        {filters.atmosphere.length > 0 && (
          <div className="mt-3 p-3 bg-sage/10 rounded-lg">
            <p className="text-sm text-charcoal">
              <span className="font-medium">선택된 분위기:</span>{' '}
              {filters.atmosphere.join(', ')}
            </p>
          </div>
        )}
      </div>

             {/* 태그 필터 */}
       <div className="space-y-3">
         <div className="flex items-center justify-between">
           <h3 className="text-base font-inter font-medium text-charcoal">
             태그
           </h3>
           {filters.tags.length > 0 && (
             <button
               onClick={clearTags}
               className="text-xs text-terracotta hover:text-terracotta/80"
             >
               초기화
             </button>
           )}
         </div>

                 <div className="max-h-40 overflow-y-auto">
           <div className="flex flex-wrap gap-1.5">
            {FILTER_OPTIONS.commonTags.map((tag) => {
              const isSelected = filters.tags.includes(tag);
              
              return (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                                     className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                     isSelected
                       ? 'bg-sage text-white shadow-sm'
                       : 'bg-white border border-sand hover:border-sage/30 text-charcoal hover:bg-sage/5'
                   }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>

        {filters.tags.length > 0 && (
          <div className="mt-3 p-3 bg-sage/10 rounded-lg">
            <p className="text-sm text-charcoal">
              <span className="font-medium">선택된 태그:</span>{' '}
              {filters.tags.map(tag => `#${tag}`).join(', ')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 