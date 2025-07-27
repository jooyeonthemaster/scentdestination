'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentInfo {
  type: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  placeId?: string;
  placeName?: string;
}

interface PaymentWidgetProps {
  paymentInfo: PaymentInfo;
  customerEmail: string;
  customerName: string;
}

declare global {
  interface Window {
    TossPayments: any;
  }
}

export default function PaymentWidget({ paymentInfo, customerEmail, customerName }: PaymentWidgetProps) {
  const router = useRouter();
  const [tossPayments, setTossPayments] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scriptLoaded = useRef(false);

  const amount = paymentInfo.price * paymentInfo.quantity;
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    const loadTossPaymentsScript = async () => {
      if (scriptLoaded.current) return;

      try {
        // 토스페이먼츠 스크립트 로드
        const script = document.createElement('script');
        script.src = 'https://js.tosspayments.com/v1/payment';
        script.async = true;
        
        script.onload = () => {
          scriptLoaded.current = true;
          const clientKey = process.env.NEXT_PUBLIC_TOSS_PAYMENTS_CLIENT_KEY;
          
          if (!clientKey) {
            setError('토스페이먼츠 클라이언트 키가 설정되지 않았습니다.');
            setLoading(false);
            return;
          }

          try {
            const tossPaymentsInstance = window.TossPayments(clientKey);
            setTossPayments(tossPaymentsInstance);
            setLoading(false);
          } catch (err) {
            console.error('TossPayments 초기화 실패:', err);
            setError('결제 시스템 초기화에 실패했습니다.');
            setLoading(false);
          }
        };

        script.onerror = () => {
          setError('토스페이먼츠 스크립트 로드에 실패했습니다.');
          setLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error('스크립트 로드 실패:', err);
        setError('결제 시스템 로드에 실패했습니다.');
        setLoading(false);
      }
    };

    loadTossPaymentsScript();

    return () => {
      // 클린업: 스크립트는 한번만 로드되도록 관리
    };
  }, []);

  const handleCardPayment = async () => {
    if (!tossPayments) {
      alert('결제 시스템이 준비되지 않았습니다.');
      return;
    }

    try {
      await tossPayments.requestPayment('카드', {
        amount: amount,
        orderId: orderId,
        orderName: paymentInfo.name,
        customerName: customerName,
        customerEmail: customerEmail,
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/fail`,
      });
    } catch (error: any) {
      console.error('카드 결제 실패:', error);
      if (error?.code !== 'USER_CANCEL') {
        alert('결제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleTransferPayment = async () => {
    if (!tossPayments) {
      alert('결제 시스템이 준비되지 않았습니다.');
      return;
    }

    try {
      await tossPayments.requestPayment('계좌이체', {
        amount: amount,
        orderId: orderId,
        orderName: paymentInfo.name,
        customerName: customerName,
        customerEmail: customerEmail,
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/fail`,
      });
    } catch (error: any) {
      console.error('계좌이체 결제 실패:', error);
      if (error?.code !== 'USER_CANCEL') {
        alert('결제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const handleVirtualAccountPayment = async () => {
    if (!tossPayments) {
      alert('결제 시스템이 준비되지 않았습니다.');
      return;
    }

    try {
      await tossPayments.requestPayment('가상계좌', {
        amount: amount,
        orderId: orderId,
        orderName: paymentInfo.name,
        customerName: customerName,
        customerEmail: customerEmail,
        successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success`,
        failUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/fail`,
        validHours: 24, // 24시간 유효
      });
    } catch (error: any) {
      console.error('가상계좌 결제 실패:', error);
      if (error?.code !== 'USER_CANCEL') {
        alert('결제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-sage border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-charcoal/60">결제 시스템을 준비하는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-sage text-white rounded-lg hover:bg-sage/90 transition-colors"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* 카드 결제 */}
      <button
        onClick={handleCardPayment}
        className="w-full p-4 bg-white border-2 border-sand hover:border-sage rounded-lg transition-all duration-300 hover:shadow-md group"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-sage/10 rounded-lg flex items-center justify-center group-hover:bg-sage/20 transition-colors">
            <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div className="text-left flex-1">
            <h3 className="font-medium text-charcoal group-hover:text-sage transition-colors">
              신용/체크카드
            </h3>
            <p className="text-sm text-charcoal/60">
              VISA, MasterCard, JCB, 국내카드
            </p>
          </div>
          <div className="text-sage opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>

      {/* 계좌이체 */}
      <button
        onClick={handleTransferPayment}
        className="w-full p-4 bg-white border-2 border-sand hover:border-sage rounded-lg transition-all duration-300 hover:shadow-md group"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center group-hover:bg-terracotta/20 transition-colors">
            <svg className="w-6 h-6 text-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div className="text-left flex-1">
            <h3 className="font-medium text-charcoal group-hover:text-terracotta transition-colors">
              계좌이체
            </h3>
            <p className="text-sm text-charcoal/60">
              실시간 계좌이체
            </p>
          </div>
          <div className="text-terracotta opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>

      {/* 가상계좌 */}
      <button
        onClick={handleVirtualAccountPayment}
        className="w-full p-4 bg-white border-2 border-sand hover:border-warm rounded-lg transition-all duration-300 hover:shadow-md group"
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-warm/10 rounded-lg flex items-center justify-center group-hover:bg-warm/20 transition-colors">
            <svg className="w-6 h-6 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div className="text-left flex-1">
            <h3 className="font-medium text-charcoal group-hover:text-warm transition-colors">
              가상계좌
            </h3>
            <p className="text-sm text-charcoal/60">
              24시간 입금 가능
            </p>
          </div>
          <div className="text-warm opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </button>

      {/* 결제 금액 표시 */}
      <div className="mt-6 p-4 bg-sage/5 rounded-lg border border-sage/20">
        <div className="flex justify-between items-center">
          <span className="text-charcoal font-medium">결제 금액</span>
          <span className="text-xl font-bold text-sage">
            {amount.toLocaleString()}원
          </span>
        </div>
        <p className="text-xs text-charcoal/60 mt-1">
          안전하고 빠른 토스페이먼츠 결제
        </p>
      </div>

      {/* 안전 결제 안내 */}
      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-charcoal/50">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>SSL 보안 결제</span>
      </div>
    </div>
  );
} 