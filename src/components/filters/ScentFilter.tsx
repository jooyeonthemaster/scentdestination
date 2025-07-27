'use client';

import React, { useState } from 'react';
import { ScentMapFilters } from '@/types';
import { FILTER_OPTIONS } from '@/constants/filterOptions';

interface ScentFilterProps {
  filters: ScentMapFilters;
  onFiltersChange: (filters: ScentMapFilters) => void;
}

export default function ScentFilter({ filters, onFiltersChange }: ScentFilterProps) {
  const [activeNoteType, setActiveNoteType] = useState<'top' | 'middle' | 'base'>('top');

  const handleNoteToggle = (noteType: 'top' | 'middle' | 'base', note: string) => {
    const noteKey = noteType === 'top' ? 'topNotes' : noteType === 'middle' ? 'middleNotes' : 'baseNotes';
    const currentNotes = filters.scentNotes[noteKey];
    
    const newNotes = currentNotes.includes(note)
      ? currentNotes.filter(n => n !== note)
      : [...currentNotes, note];

    const newFilters = {
      ...filters,
      scentNotes: {
        ...filters.scentNotes,
        [noteKey]: newNotes
      }
    };
    onFiltersChange(newFilters);
  };

  const clearScentNotes = () => {
    const newFilters = {
      ...filters,
      scentNotes: {
        topNotes: [],
        middleNotes: [],
        baseNotes: []
      }
    };
    onFiltersChange(newFilters);
  };

  const totalSelectedNotes = 
    filters.scentNotes.topNotes.length + 
    filters.scentNotes.middleNotes.length + 
    filters.scentNotes.baseNotes.length;

  const noteTypes = [
    { key: 'top' as const, label: '탑 노트', icon: '🌟', color: 'bg-yellow-100 text-yellow-700' },
    { key: 'middle' as const, label: '미들 노트', icon: '🌸', color: 'bg-pink-100 text-pink-700' },
    { key: 'base' as const, label: '베이스 노트', icon: '🌰', color: 'bg-amber-100 text-amber-700' }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-inter font-medium text-charcoal">
          향기 노트
        </h3>
        {totalSelectedNotes > 0 && (
          <button
            onClick={clearScentNotes}
            className="text-xs text-terracotta hover:text-terracotta/80"
          >
            초기화
          </button>
        )}
      </div>

      {/* 노트 타입 탭 */}
      <div className="flex space-x-1 bg-sand/30 p-1 rounded-lg">
        {noteTypes.map((noteType) => (
          <button
            key={noteType.key}
            onClick={() => setActiveNoteType(noteType.key)}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
              activeNoteType === noteType.key
                ? 'bg-white text-charcoal shadow-sm'
                : 'text-charcoal/60 hover:text-charcoal'
            }`}
          >
            <span className="mr-1">{noteType.icon}</span>
            {noteType.label}
            {(noteType.key === 'top' ? filters.scentNotes.topNotes.length :
              noteType.key === 'middle' ? filters.scentNotes.middleNotes.length :
              filters.scentNotes.baseNotes.length) > 0 && (
              <span className="ml-1 text-xs bg-sage text-white rounded-full px-1.5 py-0.5">
                {noteType.key === 'top' ? filters.scentNotes.topNotes.length :
                 noteType.key === 'middle' ? filters.scentNotes.middleNotes.length :
                 filters.scentNotes.baseNotes.length}
              </span>
            )}
          </button>
        ))}
      </div>

             {/* 노트 선택 */}
       <div className="max-h-48 overflow-y-auto">
         <div className="flex flex-wrap gap-1.5">
          {FILTER_OPTIONS.scentNotes[activeNoteType].map((note) => {
            const noteKey = activeNoteType === 'top' ? 'topNotes' : 
                           activeNoteType === 'middle' ? 'middleNotes' : 'baseNotes';
            const isSelected = filters.scentNotes[noteKey].includes(note);
            
            return (
              <button
                key={note}
                onClick={() => handleNoteToggle(activeNoteType, note)}
                                 className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                   isSelected
                     ? 'bg-sage text-white shadow-sm'
                     : 'bg-white border border-sand hover:border-sage/30 text-charcoal hover:bg-sage/5'
                 }`}
              >
                {note}
              </button>
            );
          })}
        </div>
      </div>

      {/* 선택된 노트 요약 */}
      {totalSelectedNotes > 0 && (
        <div className="mt-4 p-3 bg-sage/10 rounded-lg space-y-2">
          <p className="text-sm font-medium text-charcoal">선택된 향기 노트:</p>
          
          {filters.scentNotes.topNotes.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                🌟 탑
              </span>
              <span className="text-xs text-charcoal">
                {filters.scentNotes.topNotes.join(', ')}
              </span>
            </div>
          )}
          
          {filters.scentNotes.middleNotes.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-pink-100 text-pink-700 rounded-full">
                🌸 미들
              </span>
              <span className="text-xs text-charcoal">
                {filters.scentNotes.middleNotes.join(', ')}
              </span>
            </div>
          )}
          
          {filters.scentNotes.baseNotes.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full">
                🌰 베이스
              </span>
              <span className="text-xs text-charcoal">
                {filters.scentNotes.baseNotes.join(', ')}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 