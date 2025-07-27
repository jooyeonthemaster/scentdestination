// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

console.log('🔥 Firebase 초기화 시작');

// Firebase 설정
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// 빌드 시 환경 변수 검증 (런타임에만 검증)
let app: any = null;
let db: any = null;
let auth: any = null;
let analytics: any = null;
let googleProvider: any = null;

if (typeof window !== 'undefined') {
  // 클라이언트 사이드에서만 Firebase 초기화
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'] as const;
  const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

  if (missingKeys.length > 0) {
    console.error('❌ Firebase 환경 변수 누락:', missingKeys);
    // 개발 환경에서는 경고만 출력하고 계속 진행
    if (process.env.NODE_ENV === 'development') {
      console.warn('⚠️ 개발 환경에서 Firebase 환경 변수가 누락되었지만 계속 진행합니다.');
    }
  } else {
    try {
      // Firebase 앱 초기화
      app = initializeApp(firebaseConfig);
      console.log('✅ Firebase 앱 초기화 완료');

      // Firestore 초기화
      db = getFirestore(app);
      console.log('✅ Firestore 초기화 완료');

      // Firebase Auth 초기화
      auth = getAuth(app);
      console.log('✅ Firebase Auth 초기화 완료');

      // Google Auth Provider 설정
      googleProvider = new GoogleAuthProvider();
      googleProvider.addScope('profile');
      googleProvider.addScope('email');
      console.log('✅ Google Auth Provider 설정 완료');

      // Analytics 초기화 (조건부)
      if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
        analytics = getAnalytics(app);
        console.log('✅ Firebase Analytics 초기화 완료');
      }
    } catch (error) {
      console.error('❌ Firebase 초기화 실패:', error);
    }
  }
}

export { db, auth, googleProvider, analytics }; 