import { HotplaceDestination, ScentMapFilters } from '@/types';

export function filterHotplaces(hotplaces: HotplaceDestination[], filters: ScentMapFilters): HotplaceDestination[] {
  return hotplaces.filter(place => {
    // 지역 필터
    if (filters.region.province && place.location.region !== filters.region.province) {
      return false;
    }
    
    // 시/구 필터 (주소에서 검색)
    if (filters.region.city && !place.location.address.includes(filters.region.city)) {
      return false;
    }
    
    // 동/읍/면 필터 (주소에서 검색)
    if (filters.region.district && !place.location.address.includes(filters.region.district)) {
      return false;
    }

    // 카테고리 필터
    if (filters.categories.length > 0 && !filters.categories.includes(place.category)) {
      return false;
    }

    // 향기 노트 필터
    if (filters.scentNotes.topNotes.length > 0 || 
        filters.scentNotes.middleNotes.length > 0 || 
        filters.scentNotes.baseNotes.length > 0) {
      
      const placeNotes = place.signatureScent.notes.map(note => note.toLowerCase());
      
      // 선택된 노트 중 하나라도 매치되면 통과
      const hasMatchingNote = [
        ...filters.scentNotes.topNotes,
        ...filters.scentNotes.middleNotes,
        ...filters.scentNotes.baseNotes
      ].some(selectedNote => 
        placeNotes.some(placeNote => 
          placeNote.includes(selectedNote.toLowerCase()) || 
          selectedNote.toLowerCase().includes(placeNote)
        )
      );
      
      if (!hasMatchingNote) {
        return false;
      }
    }

    // 분위기 필터
    if (filters.atmosphere.length > 0) {
      const hasMatchingAtmosphere = filters.atmosphere.some(selectedAtmosphere => 
        place.atmosphere.includes(selectedAtmosphere) ||
        place.description.includes(selectedAtmosphere) ||
        place.specialFeature.includes(selectedAtmosphere)
      );
      
      if (!hasMatchingAtmosphere) {
        return false;
      }
    }

    // 태그 필터
    if (filters.tags.length > 0) {
      const placeTags = place.tags?.map(tag => tag.toLowerCase()) || [];
      
      const hasMatchingTag = filters.tags.some(selectedTag => 
        placeTags.some(placeTag => 
          placeTag.includes(selectedTag.toLowerCase()) ||
          selectedTag.toLowerCase().includes(placeTag)
        ) ||
        // 이름, 설명, 특징에서도 태그 검색
        place.name.toLowerCase().includes(selectedTag.toLowerCase()) ||
        place.description.toLowerCase().includes(selectedTag.toLowerCase()) ||
        place.specialFeature.toLowerCase().includes(selectedTag.toLowerCase())
      );
      
      if (!hasMatchingTag) {
        return false;
      }
    }

    // 추천 장소 필터
    if (filters.features.featured && !place.featured) {
      return false;
    }

    return true;
  });
}

// 필터 결과에 대한 통계 정보
export function getFilterStats(filteredPlaces: HotplaceDestination[]) {
  const stats = {
    total: filteredPlaces.length,
    byCategory: {} as Record<string, number>,
    byRegion: {} as Record<string, number>,
    featured: filteredPlaces.filter(p => p.featured).length
  };

  filteredPlaces.forEach(place => {
    // 카테고리별 통계
    stats.byCategory[place.category] = (stats.byCategory[place.category] || 0) + 1;
    
    // 지역별 통계
    stats.byRegion[place.location.region] = (stats.byRegion[place.location.region] || 0) + 1;
  });

  return stats;
}

// 필터가 활성화되어 있는지 확인
export function hasActiveFilters(filters: ScentMapFilters): boolean {
  return (
    !!filters.region.province ||
    !!filters.region.city ||
    !!filters.region.district ||
    filters.categories.length > 0 ||
    filters.scentNotes.topNotes.length > 0 ||
    filters.scentNotes.middleNotes.length > 0 ||
    filters.scentNotes.baseNotes.length > 0 ||
    filters.atmosphere.length > 0 ||
    filters.tags.length > 0 ||
    Object.keys(filters.features).some(key => filters.features[key as keyof typeof filters.features])
  );
}

// 검색 키워드로 추가 필터링
export function searchPlaces(places: HotplaceDestination[], searchTerm: string): HotplaceDestination[] {
  if (!searchTerm.trim()) return places;
  
  const term = searchTerm.toLowerCase();
  
  return places.filter(place => 
    place.name.toLowerCase().includes(term) ||
    place.description.toLowerCase().includes(term) ||
    place.location.address.toLowerCase().includes(term) ||
    place.signatureScent.name.toLowerCase().includes(term) ||
    place.atmosphere.toLowerCase().includes(term) ||
    place.specialFeature.toLowerCase().includes(term) ||
    place.tags?.some(tag => tag.toLowerCase().includes(term))
  );
} 