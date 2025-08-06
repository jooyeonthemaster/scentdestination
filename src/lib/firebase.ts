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

// Firebase 인스턴스들 (SSR 호환성을 위해 초기값은 null)
let app: any = null;
let db: any = null;
let auth: any = null;
let analytics: any = null;
let googleProvider: any = null;

// Firebase 초기화 상태
let firebaseInitialized = false;
let initializationError: string | null = null;

// Firebase 초기화 함수 (클라이언트에서만 실행)
export const initializeFirebaseClient = () => {
  if (firebaseInitialized || typeof window === 'undefined') return;
  
  try {
    console.log('🔥 Firebase 클라이언트 초기화 시작');
    
    // 필수 환경 변수 확인
    const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'] as const;
    const missingKeys = requiredKeys.filter(key => !firebaseConfig[key as keyof typeof firebaseConfig]);

    if (missingKeys.length > 0) {
      const errorMsg = `Firebase 환경 변수 누락: ${missingKeys.join(', ')}`;
      console.error('❌', errorMsg);
      initializationError = errorMsg;
      return;
    }

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
    googleProvider.setCustomParameters({
      prompt: 'select_account'
    });
    console.log('✅ Google Auth Provider 설정 완료');

    // Analytics 초기화 (조건부)
    if (process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) {
      try {
        analytics = getAnalytics(app);
        console.log('✅ Firebase Analytics 초기화 완료');
      } catch (analyticsError) {
        console.warn('⚠️ Firebase Analytics 초기화 실패 (무시하고 진행):', analyticsError);
      }
    }

    firebaseInitialized = true;
    console.log('🎉 Firebase 전체 초기화 완료');
    
  } catch (error: any) {
    const errorMsg = `Firebase 초기화 실패: ${error?.message || '알 수 없는 오류'}`;
    console.error('❌', errorMsg);
    initializationError = errorMsg;
    
    if (process.env.NODE_ENV === 'development') {
      console.error('상세 오류 정보:', error);
    }
  }
};

// Firebase 연결 상태 확인 함수들
export const isFirebaseInitialized = () => firebaseInitialized;
export const getFirebaseInitializationError = () => initializationError;
export const getFirebaseInstances = () => ({ app, db, auth, googleProvider, analytics });

// 안전한 Firebase 인스턴스 가져오기
export const getSafeAuth = () => {
  if (!auth) {
    throw new Error('Firebase Auth가 초기화되지 않았습니다. 네트워크 연결을 확인해주세요.');
  }
  return auth;
};

export const getSafeFirestore = () => {
  if (!db) {
    throw new Error('Firestore가 초기화되지 않았습니다. 네트워크 연결을 확인해주세요.');
  }
  return db;
};

export const getSafeGoogleProvider = () => {
  if (!googleProvider) {
    throw new Error('Google Auth Provider가 초기화되지 않았습니다.');
  }
  return googleProvider;
};

// 기본 export (하위 호환성)
export { db, auth, googleProvider, analytics }; 