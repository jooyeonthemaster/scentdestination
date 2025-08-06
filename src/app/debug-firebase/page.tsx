'use client';

import React, { useEffect, useState } from 'react';
import { isFirebaseInitialized, getFirebaseInitializationError, getFirebaseInstances } from '@/lib/firebase';

export default function DebugFirebasePage() {
  const [firebaseStatus, setFirebaseStatus] = useState<any>(null);

  useEffect(() => {
    const checkFirebaseStatus = () => {
      const status = {
        initialized: isFirebaseInitialized(),
        error: getFirebaseInitializationError(),
        instances: getFirebaseInstances(),
        config: {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '설정됨' : '미설정',
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '설정됨' : '미설정',
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '설정됨' : '미설정',
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '설정됨' : '미설정',
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '설정됨' : '미설정',
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '설정됨' : '미설정',
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ? '설정됨' : '미설정',
        },
        actualValues: {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        }
      };
      
      console.log('🔍 Firebase 상태 확인:', status);
      setFirebaseStatus(status);
    };

    checkFirebaseStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Firebase 디버그 정보</h1>
        
        {firebaseStatus && (
          <div className="space-y-6">
            {/* 초기화 상태 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">초기화 상태</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Firebase 초기화: </span>
                  <span className={firebaseStatus.initialized ? 'text-green-600' : 'text-red-600'}>
                    {firebaseStatus.initialized ? '✅ 성공' : '❌ 실패'}
                  </span>
                </p>
                {firebaseStatus.error && (
                  <p className="text-red-600">
                    <span className="font-medium">오류: </span>
                    {firebaseStatus.error}
                  </p>
                )}
              </div>
            </div>

            {/* 환경 변수 상태 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">환경 변수 설정</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(firebaseStatus.config).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{key}:</span>
                    <span className={value === '설정됨' ? 'text-green-600' : 'text-red-600'}>
                      {String(value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 실제 값 (개발 환경에서만) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">실제 환경 변수 값</h2>
                <div className="space-y-2 text-sm font-mono">
                  {Object.entries(firebaseStatus.actualValues).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}: </span>
                      <span className="text-gray-600">{String(value) || '미설정'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Firebase 인스턴스 상태 */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Firebase 인스턴스</h2>
              <div className="space-y-2">
                <p>
                  <span className="font-medium">Auth: </span>
                  <span className={firebaseStatus.instances.auth ? 'text-green-600' : 'text-red-600'}>
                    {firebaseStatus.instances.auth ? '✅ 초기화됨' : '❌ 미초기화'}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Firestore: </span>
                  <span className={firebaseStatus.instances.db ? 'text-green-600' : 'text-red-600'}>
                    {firebaseStatus.instances.db ? '✅ 초기화됨' : '❌ 미초기화'}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Google Provider: </span>
                  <span className={firebaseStatus.instances.googleProvider ? 'text-green-600' : 'text-red-600'}>
                    {firebaseStatus.instances.googleProvider ? '✅ 초기화됨' : '❌ 미초기화'}
                  </span>
                </p>
                <p>
                  <span className="font-medium">Analytics: </span>
                  <span className={firebaseStatus.instances.analytics ? 'text-green-600' : 'text-gray-500'}>
                    {firebaseStatus.instances.analytics ? '✅ 초기화됨' : '⚪ 선택사항'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}