import { NextRequest, NextResponse } from 'next/server';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface PaymentConfirmRequest {
  paymentKey: string;
  orderId: string;
  amount: number;
}

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount }: PaymentConfirmRequest = await request.json();

    // 필수 파라미터 검증
    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { error: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const secretKey = process.env.TOSS_PAYMENTS_SECRET_KEY;
    if (!secretKey) {
      console.error('토스페이먼츠 시크릿 키가 설정되지 않았습니다.');
      return NextResponse.json(
        { error: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // Base64 인코딩 (토스페이먼츠 V1 인증 방식)
    const encodedSecretKey = Buffer.from(secretKey + ':').toString('base64');

    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedSecretKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentKey,
        orderId,
        amount,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('토스페이먼츠 결제 승인 실패:', errorData);
      
      return NextResponse.json(
        { 
          error: '결제 승인에 실패했습니다.',
          message: errorData.message || '결제 처리 중 오류가 발생했습니다.',
          code: errorData.code
        },
        { status: response.status }
      );
    }

    const paymentData = await response.json();

    // Firebase에 결제 정보 저장
    try {
      const paymentRecord = {
        paymentKey: paymentData.paymentKey,
        orderId: paymentData.orderId,
        orderName: paymentData.orderName,
        amount: paymentData.totalAmount,
        method: paymentData.method,
        status: paymentData.status,
        requestedAt: new Date(paymentData.requestedAt),
        approvedAt: new Date(paymentData.approvedAt),
        customerName: paymentData.customerName || '',
        customerEmail: paymentData.customerEmail || '',
        card: paymentData.card || null,
        virtualAccount: paymentData.virtualAccount || null,
        transfer: paymentData.transfer || null,
        receipt: paymentData.receipt || null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, 'payments'), paymentRecord);
      console.log('Firebase에 결제 정보 저장 완료:', docRef.id);

    } catch (firebaseError) {
      console.error('Firebase 저장 실패:', firebaseError);
      // Firebase 저장 실패는 결제 승인에 영향을 주지 않음
      // 단지 로그만 남기고 계속 진행
    }

    // 클라이언트에 필요한 정보만 반환
    const responseData = {
      paymentKey: paymentData.paymentKey,
      orderId: paymentData.orderId,
      orderName: paymentData.orderName,
      amount: paymentData.totalAmount,
      method: paymentData.method,
      status: paymentData.status,
      customerName: paymentData.customerName,
      customerEmail: paymentData.customerEmail,
      approvedAt: paymentData.approvedAt,
    };

    return NextResponse.json(responseData);

  } catch (error: any) {
    console.error('결제 승인 처리 중 서버 오류:', error);
    
    return NextResponse.json(
      { 
        error: '서버 오류가 발생했습니다.',
        message: '결제 처리 중 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      },
      { status: 500 }
    );
  }
} 