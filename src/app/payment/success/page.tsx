'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PaymentResult {
  paymentKey: string;
  orderId: string;
  amount: number;
  orderName: string;
  customerName: string;
  customerEmail: string;
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    const paymentKeyParam = searchParams.get('paymentKey');
    const orderIdParam = searchParams.get('orderId');
    const amountParam = searchParams.get('amount');

    if (!paymentKeyParam || !orderIdParam || !amountParam) {
      router.push('/payment/fail?message=결제 정보가 올바르지 않습니다');
      return;
    }

    const processPayment = async () => {
      try {
        // 결제 승인 API 호출
        const response = await fetch('/api/payments/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey: paymentKeyParam,
            orderId: orderIdParam,
            amount: parseInt(amountParam),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || '결제 승인에 실패했습니다.');
        }

        const paymentData = await response.json();
        setPaymentResult(paymentData);
      } catch (error: any) {
        console.error('결제 승인 실패:', error);
        setError(error.message || '결제 처리 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams, isAuthenticated, router]);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleViewOrders = () => {
    router.push('/mypage/orders');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal">결제를 완료하는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-sand/20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-inter font-bold text-charcoal mb-4">
              결제 실패
            </h1>
            <p className="text-charcoal/70 mb-6">
              {error}
            </p>
            <button
              onClick={handleGoHome}
              className="w-full py-3 bg-sage text-white font-medium rounded-lg hover:bg-sage/90 transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!paymentResult) {
    return null;
  }

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-sand/20">
          {/* 성공 아이콘 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-inter font-bold text-charcoal mb-2">
              결제 완료
            </h1>
            <p className="text-charcoal/60">
              주문이 성공적으로 완료되었습니다
            </p>
          </div>

          {/* 결제 정보 */}
          <div className="space-y-4 mb-8">
            <div className="bg-sage/5 rounded-lg p-4">
              <h2 className="font-medium text-charcoal mb-3">결제 정보</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">주문번호</span>
                  <span className="font-mono text-charcoal">{paymentResult.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">상품명</span>
                  <span className="text-charcoal">{paymentResult.orderName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">결제금액</span>
                  <span className="font-semibold text-sage">
                    {paymentResult.amount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">구매자</span>
                  <span className="text-charcoal">{paymentResult.customerName}</span>
                </div>
              </div>
            </div>

            {/* 배송 안내 */}
            <div className="bg-cream rounded-lg p-4">
              <h3 className="font-medium text-charcoal mb-2 flex items-center">
                <svg className="w-5 h-5 text-terracotta mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                배송 안내
              </h3>
              <ul className="text-sm text-charcoal/70 space-y-1">
                <li>• 주문 확인 후 2-3일 내 배송 시작</li>
                <li>• 배송 조회는 마이페이지에서 확인 가능</li>
                <li>• 문의사항은 고객센터로 연락주세요</li>
              </ul>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleViewOrders}
              className="py-3 px-6 bg-sage text-white font-medium rounded-lg hover:bg-sage/90 transition-colors"
            >
              주문내역 보기
            </button>
            <button
              onClick={handleGoHome}
              className="py-3 px-6 bg-white border-2 border-sage text-sage font-medium rounded-lg hover:bg-sage/5 transition-colors"
            >
              계속 쇼핑하기
            </button>
          </div>

          {/* 추가 정보 */}
          <div className="mt-8 pt-6 border-t border-sand/20">
            <div className="flex items-center justify-center space-x-2 text-xs text-charcoal/50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>토스페이먼츠 안전결제</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
} 