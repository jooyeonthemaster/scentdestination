'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface OnboardingData {
  // 공간 기본 정보
  spaceType: 'commercial' | 'residential' | '';
  spaceSize: number | '';
  spaceCategory: string;
  spaceConcept: string;
  
  // 사용자 특성
  ageGroup: string;
  occupation: string;
  lifestyle: string[];
  preferences: string[];
  
  // 공간 목적 및 용도
  primaryPurpose: string;
  secondaryPurposes: string[];
  ambiance: string;
  
  // 추가 정보
  existingScents: string;
  timeframe: string;
}

const initialData: OnboardingData = {
  spaceType: '',
  spaceSize: '',
  spaceCategory: '',
  spaceConcept: '',
  ageGroup: '',
  occupation: '',
  lifestyle: [],
  preferences: [],
  primaryPurpose: '',
  secondaryPurposes: [],
  ambiance: '',
  existingScents: '',
  timeframe: ''
};

// 상업 공간 카테고리
const commercialCategories = [
  { id: 'cafe', label: '카페', icon: '☕', description: '커피와 디저트를 즐기는 공간' },
  { id: 'restaurant', label: '레스토랑', icon: '🍽️', description: '식사를 제공하는 공간' },
  { id: 'retail', label: '리테일샵', icon: '🛍️', description: '제품을 판매하는 매장' },
  { id: 'office', label: '오피스', icon: '🏢', description: '업무를 위한 사무 공간' },
  { id: 'hotel', label: '호텔/숙박', icon: '🏨', description: '숙박 서비스 공간' },
  { id: 'fitness', label: '피트니스', icon: '💪', description: '운동과 건강 관리 공간' },
  { id: 'clinic', label: '병원/클리닉', icon: '🏥', description: '의료 서비스 공간' },
  { id: 'gallery', label: '갤러리/전시', icon: '🎨', description: '예술 작품 전시 공간' }
];

// 주거 공간 카테고리
const residentialCategories = [
  { id: 'living', label: '거실', icon: '🛋️', description: '가족이 모이는 메인 공간' },
  { id: 'bedroom', label: '침실', icon: '🛏️', description: '휴식과 수면을 위한 공간' },
  { id: 'study', label: '서재/공부방', icon: '📚', description: '독서와 학습 공간' },
  { id: 'bathroom', label: '욕실', icon: '🚿', description: '개인 위생 공간' },
  { id: 'kitchen', label: '주방', icon: '👨‍🍳', description: '요리를 하는 공간' },
  { id: 'entrance', label: '현관', icon: '🚪', description: '집의 첫인상을 주는 공간' },
  { id: 'balcony', label: '발코니/테라스', icon: '🌿', description: '외부와 연결된 공간' },
  { id: 'kidsroom', label: '아이방', icon: '🧸', description: '어린이를 위한 공간' }
];

export default function AiScentRecommendationPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<OnboardingData>(initialData);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 5; // 예산 제거로 6->5단계로 변경

  // 로그인 체크
  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  // AuthContext가 로딩 중일 때 로딩 화면 표시
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal">로딩 중...</p>
        </div>
      </div>
    );
  }

  const updateFormData = (field: keyof OnboardingData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: keyof OnboardingData, value: string) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    updateFormData(field, newArray);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedImages(prev => [...prev, ...files].slice(0, 5)); // 최대 5장
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // 이미지를 Base64로 변환
      let imageAnalysis = '';
      if (uploadedImages.length > 0) {
        const firstImage = uploadedImages[0];
        const reader = new FileReader();
        imageAnalysis = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(firstImage);
        });
      }

      // API 요청 데이터 구성
      const requestData = {
        spaceData: {
          spaceType: formData.spaceType,
          spaceSize: Number(formData.spaceSize),
          spaceCategory: formData.spaceCategory,
          spaceConcept: formData.spaceConcept
        },
        userData: {
          ageGroup: formData.ageGroup,
          occupation: formData.occupation,
          lifestyle: formData.lifestyle,
          preferences: formData.preferences
        },
        purposeData: {
          primaryPurpose: formData.primaryPurpose,
          secondaryPurposes: formData.secondaryPurposes,
          ambiance: formData.ambiance
        },
        additionalData: {
          existingScents: formData.existingScents,
          timeframe: formData.timeframe
        },
        imageAnalysis: imageAnalysis || undefined
      };

      console.log('🚀 AI 분석 요청 시작:', requestData);

      // AI 향기 추천 API 호출
      const response = await fetch('/api/ai-scent-recommendation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: '알 수 없는 오류' }));
        throw new Error(errorData.error || 'AI 분석 요청 실패');
      }

      const result = await response.json();
      console.log('✨ AI 분석 완료:', result);

      // 결과를 sessionStorage에 저장
      if (result.analysisId && result.recommendation) {
        sessionStorage.setItem(
          `ai_recommendation_${result.analysisId}`, 
          JSON.stringify(result)
        );
      }

      // 결과 페이지로 이동
      router.push(`/ai-scent-recommendation/result?id=${result.analysisId}`);
    } catch (error) {
      console.error('❌ AI 분석 중 에러:', error);
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      
      // 사용량 한도 관련 에러인지 확인
      if (errorMessage.includes('quota') || errorMessage.includes('limit') || errorMessage.includes('rate')) {
        alert(`🚫 AI 서비스 사용량 한도에 도달했습니다.\n\n• 잠시 후 다시 시도해주세요\n• 문의: 고객센터\n\n오류 내용: ${errorMessage}`);
      } else {
        alert(`❌ AI 분석 중 오류가 발생했습니다.\n\n${errorMessage}\n\n다시 시도해주세요.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 진행도 표시
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sand to-latte">
      {/* 헤더 및 진행 상태 */}
      <div className="fixed top-16 left-0 right-0 bg-white/95 backdrop-blur-md z-40 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-lg font-bold text-charcoal">AI 공간 향기 추천</h1>
              <p className="text-charcoal/60 text-xs mt-0.5">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* 진행 바 */}
          <div className="w-full bg-sand/30 rounded-full h-1.5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-sage to-terracotta transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="pt-44 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: 공간 타입 선택 */}
          {currentStep === 1 && (
            <div className="animate-fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  어떤 공간을 위한 향기를 찾고 계신가요?
                </h2>
                <p className="text-xl text-charcoal/60">
                  공간의 유형을 선택해주세요
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                <button
                  onClick={() => updateFormData('spaceType', 'commercial')}
                  className={`relative p-8 rounded-3xl border-3 transition-all duration-300 ${
                    formData.spaceType === 'commercial'
                      ? 'border-sage bg-sage/10 shadow-xl scale-105'
                      : 'border-sand bg-white hover:border-sage/50 hover:shadow-lg'
                  }`}
                >
                  <div className="text-6xl mb-4">🏢</div>
                  <h3 className="text-2xl font-bold text-charcoal mb-2">상업 공간</h3>
                  <p className="text-charcoal/60">
                    카페, 레스토랑, 오피스, 매장 등<br />
                    비즈니스를 위한 공간
                  </p>
                  {formData.spaceType === 'commercial' && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => updateFormData('spaceType', 'residential')}
                  className={`relative p-8 rounded-3xl border-3 transition-all duration-300 ${
                    formData.spaceType === 'residential'
                      ? 'border-sage bg-sage/10 shadow-xl scale-105'
                      : 'border-sand bg-white hover:border-sage/50 hover:shadow-lg'
                  }`}
                >
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-2xl font-bold text-charcoal mb-2">주거 공간</h3>
                  <p className="text-charcoal/60">
                    거실, 침실, 서재, 욕실 등<br />
                    개인 생활을 위한 공간
                  </p>
                  {formData.spaceType === 'residential' && (
                    <div className="absolute top-4 right-4">
                      <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 공간 세부 정보 */}
          {currentStep === 2 && (
            <div className="animate-fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  공간에 대해 더 알려주세요
                </h2>
                <p className="text-xl text-charcoal/60">
                  향기 추천을 위한 세부 정보를 입력해주세요
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-8">
                {/* 공간 카테고리 선택 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    공간 유형을 선택해주세요
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {(formData.spaceType === 'commercial' ? commercialCategories : residentialCategories).map((category) => (
                      <button
                        key={category.id}
                        onClick={() => updateFormData('spaceCategory', category.id)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                          formData.spaceCategory === category.id
                            ? 'border-sage bg-sage/10 shadow-lg'
                            : 'border-sand bg-white hover:border-sage/50 hover:shadow-md'
                        }`}
                      >
                        <div className="text-3xl mb-2">{category.icon}</div>
                        <h4 className="font-semibold text-charcoal">{category.label}</h4>
                        <p className="text-xs text-charcoal/60 mt-1">{category.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 공간 크기 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    공간의 크기는 어느 정도인가요?
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.spaceSize}
                      onChange={(e) => updateFormData('spaceSize', e.target.value)}
                      placeholder="예: 30"
                      className="w-full px-6 py-4 text-lg border-2 border-sand rounded-2xl focus:border-sage focus:outline-none transition-colors"
                    />
                    <span className="absolute right-6 top-1/2 transform -translate-y-1/2 text-charcoal/60">
                      평 (㎡)
                    </span>
                  </div>
                  <p className="text-sm text-charcoal/60 mt-2">
                    * 대략적인 크기를 입력해주세요
                  </p>
                </div>

                {/* 공간 컨셉 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    추구하는 공간의 컨셉을 자유롭게 표현해주세요
                  </label>
                  <textarea
                    value={formData.spaceConcept}
                    onChange={(e) => updateFormData('spaceConcept', e.target.value)}
                    placeholder={formData.spaceType === 'commercial' 
                      ? "예: 북유럽 스타일의 미니멀한 카페, 도시적이면서도 따뜻한 느낌" 
                      : "예: 아늑하고 편안한 휴식 공간, 모던하면서도 자연친화적인 느낌"}
                    rows={4}
                    className="w-full px-6 py-4 text-lg border-2 border-sand rounded-2xl focus:border-sage focus:outline-none transition-colors resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 사용자/타겟 정보 */}
          {currentStep === 3 && (
            <div className="animate-fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  {formData.spaceType === 'commercial' ? '주요 고객층은 누구인가요?' : '누가 사용하는 공간인가요?'}
                </h2>
                <p className="text-xl text-charcoal/60">
                  향기 선택에 중요한 정보입니다
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-8">
                {/* 연령대 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    {formData.spaceType === 'commercial' ? '주요 고객 연령대' : '사용자 연령대'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['20대', '30대', '40대', '50대 이상'].map((age) => (
                      <button
                        key={age}
                        onClick={() => updateFormData('ageGroup', age)}
                        className={`py-3 px-6 rounded-xl border-2 transition-all duration-300 ${
                          formData.ageGroup === age
                            ? 'border-sage bg-sage text-white'
                            : 'border-sand bg-white text-charcoal hover:border-sage/50'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 라이프스타일 (복수 선택) */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    {formData.spaceType === 'commercial' ? '타겟 고객의 라이프스타일' : '라이프스타일'} (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.spaceType === 'commercial' ? (
                      ['트렌디한', '실용적인', '럭셔리한', '친환경적인', '미니멀한', '개성있는'].map((style) => (
                        <button
                          key={style}
                          onClick={() => handleArrayToggle('lifestyle', style)}
                          className={`py-3 px-6 rounded-xl border-2 transition-all duration-300 ${
                            formData.lifestyle.includes(style)
                              ? 'border-terracotta bg-terracotta text-white'
                              : 'border-sand bg-white text-charcoal hover:border-terracotta/50'
                          }`}
                        >
                          {style}
                        </button>
                      ))
                    ) : (
                      ['활동적인', '차분한', '창의적인', '전통적인', '모던한', '자연주의'].map((style) => (
                        <button
                          key={style}
                          onClick={() => handleArrayToggle('lifestyle', style)}
                          className={`py-3 px-6 rounded-xl border-2 transition-all duration-300 ${
                            formData.lifestyle.includes(style)
                              ? 'border-terracotta bg-terracotta text-white'
                              : 'border-sand bg-white text-charcoal hover:border-terracotta/50'
                          }`}
                        >
                          {style}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* 향 선호도 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    선호하는 향의 계열 (복수 선택 가능)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {['시트러스', '플로럴', '우디', '프레시', '스파이시', '파우더리'].map((scent) => (
                      <button
                        key={scent}
                        onClick={() => handleArrayToggle('preferences', scent)}
                        className={`py-3 px-6 rounded-xl border-2 transition-all duration-300 ${
                          formData.preferences.includes(scent)
                            ? 'border-warm bg-warm text-white'
                            : 'border-sand bg-white text-charcoal hover:border-warm/50'
                        }`}
                      >
                        {scent}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: 공간 목적 및 분위기 */}
          {currentStep === 4 && (
            <div className="animate-fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  원하는 공간의 분위기를 알려주세요
                </h2>
                <p className="text-xl text-charcoal/60">
                  향기로 만들고 싶은 경험을 구체화해주세요
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-8">
                {/* 원하는 분위기 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    추구하는 분위기를 선택해주세요
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.spaceType === 'commercial' ? (
                      ['활기찬', '고급스러운', '편안한', '세련된', '친근한', '독특한'].map((mood) => (
                        <button
                          key={mood}
                          onClick={() => updateFormData('ambiance', mood)}
                          className={`py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                            formData.ambiance === mood
                              ? 'border-sage bg-sage text-white'
                              : 'border-sand bg-white text-charcoal hover:border-sage/50'
                          }`}
                        >
                          {mood}
                        </button>
                      ))
                    ) : (
                      ['평화로운', '활력있는', '로맨틱한', '집중되는', '상쾌한', '아늑한'].map((mood) => (
                        <button
                          key={mood}
                          onClick={() => updateFormData('ambiance', mood)}
                          className={`py-4 px-6 rounded-xl border-2 transition-all duration-300 ${
                            formData.ambiance === mood
                              ? 'border-sage bg-sage text-white'
                              : 'border-sand bg-white text-charcoal hover:border-sage/50'
                          }`}
                        >
                          {mood}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {/* 기존 향 경험 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    현재 사용 중이거나 좋았던 향이 있다면 알려주세요
                  </label>
                  <textarea
                    value={formData.existingScents}
                    onChange={(e) => updateFormData('existingScents', e.target.value)}
                    placeholder="예: 조말론 라임바질, 디올 미스디올, 자연스러운 라벤더 향 등"
                    rows={3}
                    className="w-full px-6 py-4 text-lg border-2 border-sand rounded-2xl focus:border-sage focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* 이미지 업로드 */}
                <div>
                  <label className="block text-lg font-semibold text-charcoal mb-4">
                    공간 이미지를 업로드해주세요 (선택사항)
                  </label>
                  <div className="space-y-4">
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-sage/50 rounded-2xl p-8 text-center cursor-pointer hover:border-sage transition-colors">
                        <svg className="w-12 h-12 text-sage mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-charcoal/60">클릭하여 이미지를 업로드하세요</p>
                        <p className="text-sm text-charcoal/40 mt-2">최대 5장까지 가능</p>
                      </div>
                    </label>
                    
                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-5 gap-4">
                        {uploadedImages.map((file, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Uploaded ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: 최종 확인 */}
          {currentStep === 5 && (
            <div className="animate-fadeInUp">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-charcoal mb-4">
                  마지막으로 확인해주세요
                </h2>
                <p className="text-xl text-charcoal/60">
                  입력하신 정보를 바탕으로 AI가 맞춤 향기를 추천해드립니다
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl p-8 shadow-xl">
                  <h3 className="text-xl font-semibold text-charcoal mb-6">입력 정보 요약</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span className="text-charcoal/60">공간 유형</span>
                      <span className="font-medium text-charcoal">
                        {formData.spaceType === 'commercial' ? '상업 공간' : '주거 공간'} - 
                        {formData.spaceCategory && (formData.spaceType === 'commercial' ? commercialCategories : residentialCategories).find(c => c.id === formData.spaceCategory)?.label}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span className="text-charcoal/60">공간 크기</span>
                      <span className="font-medium text-charcoal">{formData.spaceSize}평</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span className="text-charcoal/60">추구하는 분위기</span>
                      <span className="font-medium text-charcoal">{formData.ambiance}</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-sand">
                      <span className="text-charcoal/60">선호 향 계열</span>
                      <span className="font-medium text-charcoal">{formData.preferences.join(', ')}</span>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-sage to-terracotta text-white px-12 py-4 rounded-full text-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <span className="flex items-center">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          AI 분석 중...
                        </span>
                      ) : (
                        'AI 향기 추천 받기'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between items-center max-w-3xl mx-auto mt-12">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                currentStep === 1
                  ? 'bg-sand/50 text-charcoal/30 cursor-not-allowed'
                  : 'bg-white text-charcoal border-2 border-sand hover:border-sage hover:shadow-md'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              이전
            </button>

            {currentStep < totalSteps && (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !formData.spaceType) ||
                  (currentStep === 2 && (!formData.spaceCategory || !formData.spaceSize))
                }
                className={`flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  ((currentStep === 1 && !formData.spaceType) ||
                   (currentStep === 2 && (!formData.spaceCategory || !formData.spaceSize)))
                    ? 'bg-sand/50 text-charcoal/30 cursor-not-allowed'
                    : 'bg-sage text-white hover:bg-sage/90 hover:shadow-md'
                }`}
              >
                다음
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}