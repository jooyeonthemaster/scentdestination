'use client';

import React from 'react';
import { ScentMapFilters, HotplaceType } from '@/types';
import { FILTER_OPTIONS } from '@/constants/filterOptions';

interface CategoryFilterProps {
  filters: ScentMapFilters;
  onFiltersChange: (filters: ScentMapFilters) => void;
}

export default function CategoryFilter({ filters, onFiltersChange }: CategoryFilterProps) {
  const handleCategoryToggle = (category: HotplaceType) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];

    const newFilters = {
      ...filters,
      categories: newCategories
    };
    onFiltersChange(newFilters);
  };

  const clearCategories = () => {
    const newFilters = {
      ...filters,
      categories: []
    };
    onFiltersChange(newFilters);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-inter font-medium text-charcoal">
          공간 유형
        </h3>
        {filters.categories.length > 0 && (
          <button
            onClick={clearCategories}
            className="text-xs text-terracotta hover:text-terracotta/80"
          >
            초기화
          </button>
        )}
      </div>

             <div className="grid grid-cols-3 gap-2">
         {FILTER_OPTIONS.categories.map((category) => {
           const isSelected = filters.categories.includes(category.value);
           
           return (
             <button
               key={category.value}
               onClick={() => handleCategoryToggle(category.value)}
               className={`p-2.5 rounded-md border transition-all duration-200 ${
                 isSelected
                   ? 'border-sage bg-sage/10 text-sage'
                   : 'border-sand hover:border-sand/70 bg-white hover:bg-sand/20 text-charcoal'
               }`}
             >
               <div className="text-center space-y-1">
                 <div className="text-lg">{category.icon}</div>
                 <div className="text-xs font-medium">{category.label}</div>
               </div>
             </button>
           );
         })}
      </div>

      {filters.categories.length > 0 && (
        <div className="mt-4 p-3 bg-sage/10 rounded-lg">
          <p className="text-sm text-charcoal">
            <span className="font-medium">선택된 공간:</span>{' '}
            {filters.categories
              .map(category => FILTER_OPTIONS.categories.find(c => c.value === category)?.label)
              .filter(Boolean)
              .join(', ')}
          </p>
        </div>
      )}
    </div>
  );
} 