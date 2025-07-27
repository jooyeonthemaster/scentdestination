'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentFailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorCode, setErrorCode] = useState<string>('');

  useEffect(() => {
    const message = searchParams.get('message') || '결제에 실패했습니다.';
    const code = searchParams.get('code') || 'UNKNOWN_ERROR';
    
    setErrorMessage(message);
    setErrorCode(code);
  }, [searchParams]);

  const handleRetry = () => {
    router.back();
  };

  const handleGoHome = () => {
    router.push('/');
  };

  const getErrorDescription = (code: string) => {
    switch (code) {
      case 'PAY_PROCESS_CANCELED':
        return '사용자가 결제를 취소했습니다.';
      case 'PAY_PROCESS_ABORTED':
        return '결제 진행 중 오류가 발생했습니다.';
      case 'REJECT_CARD_COMPANY':
        return '카드사에서 결제를 거절했습니다.';
      case 'INSUFFICIENT_FUNDS':
        return '잔액이 부족합니다.';
      case 'INVALID_CARD_EXPIRATION':
        return '카드 유효기간을 확인해주세요.';
      case 'INVALID_STOPPED_CARD':
        return '정지된 카드입니다.';
      case 'EXCEED_MAX_DAILY_PAYMENT_COUNT':
        return '일일 결제 한도를 초과했습니다.';
      case 'NOT_SUPPORTED_INSTALLMENT_PLAN_CARD_OR_MERCHANT':
        return '할부가 지원되지 않는 카드입니다.';
      default:
        return '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
  };

  return (
    <div className="min-h-screen bg-cream py-20">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-sand/20">
          {/* 실패 아이콘 */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-inter font-bold text-charcoal mb-2">
              결제 실패
            </h1>
            <p className="text-charcoal/60">
              결제 처리 중 문제가 발생했습니다
            </p>
          </div>

          {/* 오류 정보 */}
          <div className="space-y-4 mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h2 className="font-medium text-red-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                오류 정보
              </h2>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium text-red-700">오류 메시지:</span>
                  <p className="text-red-600 mt-1">{errorMessage}</p>
                </div>
                <div>
                  <span className="font-medium text-red-700">상세 설명:</span>
                  <p className="text-red-600 mt-1">{getErrorDescription(errorCode)}</p>
                </div>
                {errorCode && (
                  <div>
                    <span className="font-medium text-red-700">오류 코드:</span>
                    <span className="font-mono text-red-600 ml-2">{errorCode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* 해결 방법 안내 */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                해결 방법
              </h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• 카드 정보를 다시 확인해주세요</li>
                <li>• 다른 카드나 결제 수단을 시도해보세요</li>
                <li>• 카드사에 문의하여 결제 한도를 확인해주세요</li>
                <li>• 잠시 후 다시 시도해주세요</li>
              </ul>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handleRetry}
              className="py-3 px-6 bg-sage text-white font-medium rounded-lg hover:bg-sage/90 transition-colors"
            >
              다시 시도하기
            </button>
            <button
              onClick={handleGoHome}
              className="py-3 px-6 bg-white border-2 border-sage text-sage font-medium rounded-lg hover:bg-sage/5 transition-colors"
            >
              홈으로 돌아가기
            </button>
          </div>

          {/* 고객센터 안내 */}
          <div className="mt-8 pt-6 border-t border-sand/20">
            <div className="text-center">
              <p className="text-sm text-charcoal/60 mb-2">
                문제가 지속될 경우 고객센터로 문의해주세요
              </p>
              <div className="flex items-center justify-center space-x-4 text-xs text-charcoal/50">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>1588-0000</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@scentdestination.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 