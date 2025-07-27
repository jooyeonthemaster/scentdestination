// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

console.log('🔥 Firebase 초기화 시작');

// 환경 변수 확인
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};



// 필수 환경 변수 확인
const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
const missingKeys = requiredKeys.filter(key => !firebaseConfig[key]);

if (missingKeys.length > 0) {
  console.error('❌ Firebase 환경 변수 누락:', missingKeys);
  throw new Error(`Firebase 환경 변수가 누락되었습니다: ${missingKeys.join(', ')}`);
}

console.log('✅ Firebase 환경 변수 확인 완료');

// Initialize Firebase
console.log('📱 Firebase 앱 초기화 중...');
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase 앱 초기화 완료');

// Initialize Analytics (only on client side)
let analytics;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
    console.log('📊 Firebase Analytics 초기화 완료');
  } catch (error) {
    console.warn('⚠️ Firebase Analytics 초기화 실패 (무시):', error);
  }
}

// Initialize Firestore
console.log('🗄️ Firestore 초기화 중...');
export const db = getFirestore(app);
console.log('✅ Firestore 초기화 완료');

// Initialize Authentication
export const auth = getAuth(app);
console.log('🔐 Firebase Auth 초기화 완료');

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
console.log('✅ Google Auth Provider 초기화 완료');

export { app, analytics }; 