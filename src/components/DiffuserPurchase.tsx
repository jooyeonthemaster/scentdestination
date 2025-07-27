'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DiffuserProduct, DiffuserSize, HotplaceDestination } from '@/types';

interface DiffuserPurchaseProps {
  place: HotplaceDestination;
  enhancedData?: any; // EnhancedPlaceData 타입
  compact?: boolean; // 컴팩트 모드 추가
}

export default function DiffuserPurchase({ place, enhancedData, compact = false }: DiffuserPurchaseProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>('small');
  const [quantity, setQuantity] = useState(1);

  // 해당 공간의 향기를 기반으로 디퓨저 제품 정보 생성
  const diffuserProduct: DiffuserProduct = {
    id: `diffuser-${place.id}`,
    name: `${place.name} 시그니처 디퓨저`,
    description: `${place.name}의 특별한 향기를 집에서도 경험하세요.`,
    basePrice: 38000,
    scentProfile: {
      topNotes: enhancedData?.detailedScentProfile?.topNotes || place.signatureScent.notes,
      middleNotes: enhancedData?.detailedScentProfile?.middleNotes || [],
      baseNotes: enhancedData?.detailedScentProfile?.baseNotes || [],
      intensity: enhancedData?.detailedScentProfile?.scentIntensity || 7,
      longevity: enhancedData?.detailedScentProfile?.scentDuration || '6-8시간'
    },
    sizes: [
      {
        id: 'mini',
        volume: '10ml',
        price: 24000,
        duration: '약 2주'
      },
      {
        id: 'small',
        volume: '50ml',
        price: 38000,
        duration: '약 2개월'
      },
      {
        id: 'medium',
        volume: '100ml',
        price: 76000,
        duration: '약 4개월'
      },
      {
        id: 'large',
        volume: '200ml',
        price: 152000,
        duration: '약 8개월'
      }
    ],
    images: ['/images/diffuser-placeholder.jpg'],
    inStock: true,
    featured: true,
    placeId: place.id
  };

  const selectedSizeInfo = diffuserProduct.sizes.find(size => size.id === selectedSize);
  const totalPrice = (selectedSizeInfo?.price || 0) * quantity;

  const handlePurchase = () => {
    const productData = {
      type: 'diffuser',
      productId: diffuserProduct.id,
      name: diffuserProduct.name,
      price: selectedSizeInfo?.price || 0,
      quantity: quantity,
      size: selectedSizeInfo?.volume,
      placeId: place.id,
      placeName: place.name
    };

    const queryString = new URLSearchParams(productData).toString();
    router.push(`/payment?${queryString}`);
  };

  // 컴팩트 모드일 때 카드 형태로 렌더링
  if (compact) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-sand/20">
        <div className="space-y-4">
          {/* 헤더 */}
          <div className="text-center pb-4 border-b border-sand/20">
            <div className="w-12 h-12 bg-sage/20 rounded-full mx-auto mb-3 flex items-center justify-center">
              <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </div>
            <h3 className="text-lg font-inter font-semibold text-charcoal mb-1">
              이 향기를 집으로
            </h3>
            <p className="text-sm text-charcoal/60">
              {place.signatureScent.name}
            </p>
          </div>

          {/* 사이즈 선택 */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">
              사이즈 선택
            </label>
            <div className="space-y-2">
              {diffuserProduct.sizes.map((size) => (
                <label key={size.id} className="flex items-center p-2 border rounded-lg cursor-pointer hover:bg-sand/10 transition-colors">
                  <input
                    type="radio"
                    name="size"
                    value={size.id}
                    checked={selectedSize === size.id}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="mr-2 text-sage"
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-charcoal">{size.volume}</span>
                    </div>
                    <span className="text-sm font-semibold text-charcoal">
                      {size.price.toLocaleString()}원
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 수량 선택 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-charcoal">수량</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border border-sand rounded-lg flex items-center justify-center hover:bg-sand/20 transition-colors text-sm"
              >
                -
              </button>
              <span className="text-sm font-medium text-charcoal w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border border-sand rounded-lg flex items-center justify-center hover:bg-sand/20 transition-colors text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* 총 가격 */}
          <div className="border-t border-sand/20 pt-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium text-charcoal">총 금액</span>
              <span className="text-xl font-bold text-sage">
                {totalPrice.toLocaleString()}원
              </span>
            </div>

            {/* 구매 버튼 */}
            <button
              onClick={handlePurchase}
              className="w-full py-3 bg-gradient-to-r from-sage to-terracotta text-white font-medium rounded-lg hover:from-sage/90 hover:to-terracotta/90 transition-all duration-300"
            >
              구매하기
            </button>

            <p className="text-xs text-charcoal/50 text-center mt-2">
              무료배송 • 7일 무료 반품
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 기존 풀사이즈 버전
  return (
    <section className="py-16 bg-gradient-to-br from-sage/10 to-terracotta/10">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-inter font-semibold text-charcoal mb-4">
            🌿 이 향기를 집으로
          </h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">
            {place.name}에서 경험한 특별한 향기를 디퓨저로 만나보세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 제품 이미지 및 정보 */}
          <div className="space-y-6">
            {/* 제품 이미지 placeholder */}
            <div className="aspect-square bg-gradient-to-br from-sand/30 to-latte/20 rounded-2xl overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 bg-sage/20 rounded-full mx-auto flex items-center justify-center">
                    <svg className="w-12 h-12 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </div>
                  <p className="text-charcoal/60 font-inter">
                    {diffuserProduct.name}
                  </p>
                </div>
              </div>
            </div>

            {/* 향기 프로필 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-inter font-semibold text-charcoal mb-4">
                향기 프로필
              </h3>
              
              <div className="space-y-4">
                {diffuserProduct.scentProfile.topNotes.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-charcoal/60 uppercase tracking-wider">TOP</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {diffuserProduct.scentProfile.topNotes.slice(0, 3).map((note, index) => (
                        <span key={index} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {diffuserProduct.scentProfile.middleNotes.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-charcoal/60 uppercase tracking-wider">MIDDLE</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {diffuserProduct.scentProfile.middleNotes.slice(0, 3).map((note, index) => (
                        <span key={index} className="text-xs bg-pink-100 text-pink-800 px-2 py-1 rounded-full">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {diffuserProduct.scentProfile.baseNotes.length > 0 && (
                  <div>
                    <span className="text-sm font-medium text-charcoal/60 uppercase tracking-wider">BASE</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {diffuserProduct.scentProfile.baseNotes.slice(0, 3).map((note, index) => (
                        <span key={index} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-sand/50">
                  <span className="text-sm text-charcoal/60">지속 시간</span>
                  <span className="text-sm font-medium text-charcoal">
                    {diffuserProduct.scentProfile.longevity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 구매 옵션 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-inter font-semibold text-charcoal mb-2">
                  {diffuserProduct.name}
                </h3>
                <p className="text-charcoal/70 text-sm leading-relaxed">
                  {diffuserProduct.description}
                </p>
              </div>

              {/* 사이즈 선택 */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  사이즈 선택
                </label>
                <div className="space-y-2">
                  {diffuserProduct.sizes.map((size) => (
                    <label key={size.id} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-sand/20 transition-colors">
                      <input
                        type="radio"
                        name="size"
                        value={size.id}
                        checked={selectedSize === size.id}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="mr-3 text-sage"
                      />
                      <div className="flex-1 flex justify-between items-center">
                        <div>
                          <span className="font-medium text-charcoal">{size.volume}</span>
                          <span className="text-sm text-charcoal/60 ml-2">({size.duration})</span>
                        </div>
                        <span className="font-semibold text-charcoal">
                          {size.price.toLocaleString()}원
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* 수량 선택 */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  수량
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-sand rounded-lg flex items-center justify-center hover:bg-sand/20 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-charcoal w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-sand rounded-lg flex items-center justify-center hover:bg-sand/20 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 총 가격 */}
              <div className="border-t border-sand/50 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-charcoal">총 금액</span>
                  <span className="text-2xl font-bold text-charcoal">
                    {totalPrice.toLocaleString()}원
                  </span>
                </div>

                {/* 구매 버튼 */}
                <button
                  onClick={handlePurchase}
                  className="w-full py-4 bg-gradient-to-r from-sage to-terracotta text-white font-semibold rounded-lg hover:from-sage/90 hover:to-terracotta/90 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  🛒 구매하기
                </button>

                <p className="text-xs text-charcoal/60 text-center mt-3">
                  무료배송 • 7일 무료 반품 • 품질보증
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 제품 특징 */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-sage/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-inter font-semibold text-charcoal mb-2">
              프리미엄 품질
            </h3>
            <p className="text-sm text-charcoal/70">
              엄선된 천연 원료와 고급 오일로 제작된 프리미엄 디퓨저
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-terracotta/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-inter font-semibold text-charcoal mb-2">
              오래 지속되는 향기
            </h3>
            <p className="text-sm text-charcoal/70">
              최적화된 조향으로 공간 전체에 은은하게 퍼지는 향기
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-latte/20 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-inter font-semibold text-charcoal mb-2">
              공간의 기억
            </h3>
            <p className="text-sm text-charcoal/70">
              {place.name}에서의 특별한 순간을 일상에서 다시 경험
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 