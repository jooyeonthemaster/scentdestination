'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import PaymentWidget from '@/components/payment/PaymentWidget';

interface ProductData {
  type: string;
  productId: string;
  name: string;
  price: string;
  quantity: string;
  size?: string;
  placeId?: string;
  placeName?: string;
}

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      alert('로그인이 필요한 서비스입니다.');
      router.push('/auth/login');
      return;
    }

    // URL 파라미터에서 상품 정보 추출
    const type = searchParams.get('type');
    const productId = searchParams.get('productId');
    const name = searchParams.get('name');
    const price = searchParams.get('price');
    const quantity = searchParams.get('quantity');
    const size = searchParams.get('size');
    const placeId = searchParams.get('placeId');
    const placeName = searchParams.get('placeName');

    if (!type || !productId || !name || !price || !quantity) {
      router.push('/');
      return;
    }

    setProductData({
      type,
      productId,
      name,
      price,
      quantity,
      size: size || undefined,
      placeId: placeId || undefined,
      placeName: placeName || undefined
    });
    setLoading(false);
  }, [searchParams, isAuthenticated, router]);

  if (loading || !productData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal">결제 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-inter font-bold text-charcoal mb-4">
            결제하기
          </h1>
          <p className="text-charcoal/60">
            안전하고 편리한 토스페이먼츠로 결제해보세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 주문 정보 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-sand/20">
            <h2 className="text-xl font-inter font-semibold text-charcoal mb-6">
              주문 정보
            </h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-charcoal mb-1">
                    {productData.name}
                  </h3>
                  {productData.size && (
                    <p className="text-sm text-charcoal/60">
                      사이즈: {productData.size}
                    </p>
                  )}
                  {productData.placeName && (
                    <p className="text-sm text-charcoal/60">
                      향기 공간: {productData.placeName}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-charcoal">
                    {parseInt(productData.price).toLocaleString()}원
                  </p>
                  <p className="text-sm text-charcoal/60">
                    수량: {parseInt(productData.quantity)}개
                  </p>
                </div>
              </div>

              <div className="border-t border-sand/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-charcoal">
                    총 결제 금액
                  </span>
                  <span className="text-2xl font-bold text-sage">
                    {(parseInt(productData.price) * parseInt(productData.quantity)).toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* 혜택 정보 */}
              <div className="bg-sage/10 rounded-lg p-4 mt-6">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="w-5 h-5 text-sage" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-sage">결제 혜택</span>
                </div>
                <ul className="text-sm text-charcoal/70 space-y-1">
                  <li>• 무료배송</li>
                  <li>• 7일 무료 반품</li>
                  <li>• 품질보증</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 결제 위젯 */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-sand/20">
            <h2 className="text-xl font-inter font-semibold text-charcoal mb-6">
              결제 수단
            </h2>
            
            <PaymentWidget 
              paymentInfo={{
                type: productData.type,
                productId: productData.productId,
                name: productData.name,
                price: parseInt(productData.price),
                quantity: parseInt(productData.quantity),
                size: productData.size,
                placeId: productData.placeId,
                placeName: productData.placeName
              }}
              customerEmail={user?.email || ''}
              customerName={user?.displayName || '익명'}
            />
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-sand/20">
          <h3 className="font-medium text-charcoal mb-4">결제 안내</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-charcoal/70">
            <div>
              <h4 className="font-medium text-charcoal mb-2">배송 안내</h4>
              <ul className="space-y-1">
                <li>• 주문 완료 후 2-3일 내 배송</li>
                <li>• 제주도/도서산간 지역 추가 배송비</li>
                <li>• 배송 조회는 마이페이지에서</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-charcoal mb-2">취소/환불 안내</h4>
              <ul className="space-y-1">
                <li>• 배송 전 무료 취소 가능</li>
                <li>• 상품 수령 후 7일 내 반품</li>
                <li>• 사용한 제품은 반품 불가</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
} 