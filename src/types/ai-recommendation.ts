// 고도화된 AI 향기 추천 시스템 타입 정의

// 사용자 분석 결과
export interface UserPersonalityAnalysis {
  personalityType: string;
  lifestyleCategory: string;
  scentPreferenceProfile: {
    dominantFamily: string;
    secondaryFamily: string;
    intensityPreference: 'light' | 'medium' | 'strong';
    seasonalAffinity: string[];
  };
  psychologicalDrivers: string[];
  brandAffinityLevel: 'minimal' | 'moderate' | 'luxury';
}

// 공간 이미지 분석 결과
export interface SpaceImageAnalysis {
  colorAnalysis: {
    dominantColors: string[];
    colorTemperature: 'warm' | 'cool' | 'neutral';
    contrastLevel: 'low' | 'medium' | 'high';
    colorHarmony: string;
  };
  styleAnalysis: {
    designStyle: string;
    furnitureStyle: string;
    decorativeElements: string[];
    spatialLayout: string;
  };
  lightingAnalysis: {
    lightingType: string;
    brightness: 'dim' | 'moderate' | 'bright';
    naturalLight: boolean;
    ambientMood: string;
  };
  materialAnalysis: {
    primaryMaterials: string[];
    textureVariety: string[];
    surfaceFinishes: string[];
  };
  atmosphereScore: {
    cozyness: number; // 1-10
    sophistication: number; // 1-10
    energy: number; // 1-10
    relaxation: number; // 1-10
  };
}

// 향기별 상세 추천 정보
export interface DetailedScentRecommendation {
  id: string;
  name: string;
  suitabilityScore: number; // 1-100
  confidenceLevel: number; // 1-100
  
  // 매칭 분석
  matchAnalysis: {
    personalityMatch: number; // 1-100
    spaceMatch: number; // 1-100
    lifestyleMatch: number; // 1-100
    seasonalMatch: number; // 1-100
    overallReasoning: string;
  };
  
  // 향기 프로파일
  scentProfile: {
    family: string;
    intensity: number; // 1-10
    longevity: string;
    sillage: string;
    notes: {
      top: { name: string; description: string; percentage: number }[];
      middle: { name: string; description: string; percentage: number }[];
      base: { name: string; description: string; percentage: number }[];
    };
  };
  
  // 사용 가이드
  usageGuide: {
    optimalPlacement: string[];
    intensityControl: string;
    timingRecommendations: string[];
    maintenanceTips: string[];
  };
  
  // 관련 공간 정보
  relatedPlaces: {
    id: string;
    name: string;
    relevanceScore: number; // 1-100
    sharedCharacteristics: string[];
  }[];
  
  // 시너지 효과
  synergyEffects: {
    psychologicalBenefits: string[];
    brandingImpact: string[];
    customerExperience: string[];
  };
}

// 전체 추천 전략
export interface ComprehensiveStrategy {
  strategicConcept: {
    mainTheme: string;
    subThemes: string[];
    brandingDirection: string;
    targetEmotions: string[];
  };
  
  implementationPlan: {
    phasedApproach: {
      phase: number;
      duration: string;
      actions: string[];
      expectedOutcomes: string[];
    }[];
    budgetConsiderations: {
      range: string;
      costFactors: string[];
      valueProposition: string;
    };
  };
  
  performanceMetrics: {
    measurableOutcomes: string[];
    timeframe: string;
    successIndicators: string[];
  };
  
  seasonalAdaptations: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
}

// 시각적 컨셉 및 무드보드
export interface AdvancedVisualConcept {
  moodboard: {
    concept: string;
    keyVisualElements: string[];
    inspirationSources: string[];
  };
  
  colorStory: {
    primaryPalette: { hex: string; name: string; emotion: string }[];
    secondaryPalette: { hex: string; name: string; usage: string }[];
    colorHarmony: string;
    psychologicalImpact: string;
  };
  
  materialPalette: {
    primary: { name: string; texture: string; sensoryImpact: string }[];
    accent: { name: string; usage: string; effect: string }[];
  };
  
  spatialLayout: {
    zoning: string[];
    flowPattern: string;
    focusPoints: string[];
  };
}

// 전문가 인사이트
export interface ExpertInsights {
  trendAnalysis: {
    currentTrends: string[];
    emergingTrends: string[];
    futureProjections: string[];
  };
  
  scientificBasis: {
    olfactoryScience: string[];
    psychologyPrinciples: string[];
    neuroscienceInsights: string[];
  };
  
  industryBenchmarks: {
    competitorAnalysis: string[];
    bestPractices: string[];
    differentiationOpportunities: string[];
  };
  
  customAdvice: {
    immediateActions: string[];
    longTermStrategy: string[];
    potentialChallenges: string[];
    mitigation: string[];
  };
}

// 메인 고도화된 AI 추천 결과
export interface AdvancedAIRecommendation {
  // 분석 메타데이터
  analysisMetadata: {
    analysisId: string;
    timestamp: string;
    processingTime: number;
    confidenceLevel: number;
    dataSourcesUsed: string[];
  };
  
  // 사용자 분석
  userAnalysis: UserPersonalityAnalysis;
  
  // 공간 분석 (이미지 기반)
  spaceAnalysis: SpaceImageAnalysis;
  
  // 추천 향기들
  recommendedScents: DetailedScentRecommendation[];
  
  // 전체 전략
  overallStrategy: ComprehensiveStrategy;
  
  // 시각적 컨셉
  visualConcept: AdvancedVisualConcept;
  
  // 전문가 인사이트
  expertInsights: ExpertInsights;
  
  // 대안 및 백업 옵션
  alternativeOptions: {
    budgetFriendly: DetailedScentRecommendation[];
    luxuryUpgrade: DetailedScentRecommendation[];
    seasonalVariations: DetailedScentRecommendation[];
  };
  
  // 실행 체크리스트
  actionableChecklist: {
    immediate: { task: string; priority: 'high' | 'medium' | 'low' }[];
    shortTerm: { task: string; timeline: string }[];
    longTerm: { task: string; timeline: string }[];
  };
} 