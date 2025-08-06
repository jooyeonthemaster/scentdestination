import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  User,
  UserCredential,
  signInWithRedirect,
  getRedirectResult
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db, isFirebaseInitialized, getFirebaseInitializationError } from './firebase';

// Firebase 연결 상태 확인 함수
const checkFirebaseConnection = () => {
  if (!isFirebaseInitialized()) {
    const error = getFirebaseInitializationError();
    throw new Error(error || 'Firebase가 초기화되지 않았습니다. 페이지를 새로고침해주세요.');
  }
  
  if (!auth) {
    throw new Error('Firebase Auth 서비스에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
  }
};

// 사용자 프로필 타입
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

// 회원가입 데이터 타입
export interface SignUpData {
  email: string;
  password: string;
  displayName: string;
  phoneNumber?: string;
}

// 로그인 데이터 타입
export interface SignInData {
  email: string;
  password: string;
}

// Google로 로그인 (팝업 방식)
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    checkFirebaseConnection();
    console.log('🔐 Google 로그인 시작 (팝업 방식)');
    
    const result = await signInWithPopup(auth, googleProvider);
    console.log('✅ Google 로그인 성공');
    
    // 사용자 프로필을 Firestore에 저장
    try {
      await saveUserProfile(result.user);
      console.log('✅ 사용자 프로필 저장 완료');
    } catch (saveError: any) {
      console.warn('⚠️ 사용자 프로필 저장 실패 (로그인은 성공):', saveError);
      // 프로필 저장 실패해도 로그인은 유지
    }
    
    return result;
  } catch (error: any) {
    console.error('❌ 구글 로그인 실패:', error);
    
    // 팝업 차단된 경우 리다이렉트 방식으로 대체
    if (error.code === 'auth/popup-blocked') {
      console.log('🔄 팝업이 차단되어 리다이렉트 방식으로 전환');
      try {
        await signInWithRedirect(auth, googleProvider);
        return {} as UserCredential; // 리다이렉트의 경우 결과는 나중에 처리됨
      } catch (redirectError: any) {
        console.error('❌ 리다이렉트 로그인도 실패:', redirectError);
        throw new Error(getAuthErrorMessage(redirectError.code));
      }
    }
    
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Google 리다이렉트 결과 처리
export const handleGoogleRedirectResult = async (): Promise<UserCredential | null> => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      // 사용자 프로필을 Firestore에 저장
      await saveUserProfile(result.user);
    }
    return result;
  } catch (error: any) {
    console.error('구글 리다이렉트 결과 처리 실패:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 이메일로 회원가입
export const signUpWithEmail = async (signUpData: SignUpData): Promise<UserCredential> => {
  try {
    const { email, password, displayName, phoneNumber } = signUpData;
    
    // Firebase Auth에 사용자 생성
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // 사용자 프로필 업데이트
    await updateProfile(result.user, {
      displayName
    });

    // 사용자 프로필을 Firestore에 저장
    await saveUserProfile(result.user, { phoneNumber });
    
    return result;
  } catch (error: any) {
    console.error('회원가입 실패:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 이메일로 로그인
export const signInWithEmail = async (signInData: SignInData): Promise<UserCredential> => {
  try {
    checkFirebaseConnection();
    const { email, password } = signInData;
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    // 로그인 시 사용자 정보 업데이트 (실패해도 로그인은 유지)
    try {
      await updateUserProfile(result.user.uid, { updatedAt: new Date() });
    } catch (updateError: any) {
      console.warn('⚠️ 사용자 정보 업데이트 실패 (로그인은 성공):', updateError);
    }
    
    return result;
  } catch (error: any) {
    console.error('로그인 실패:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 로그아웃
export const logout = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('로그아웃 실패:', error);
    throw new Error('로그아웃 중 오류가 발생했습니다.');
  }
};

// 비밀번호 재설정 이메일 전송
export const sendResetPasswordEmail = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error: any) {
    console.error('비밀번호 재설정 실패:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// 사용자 프로필을 Firestore에 저장
export const saveUserProfile = async (user: User, additionalData?: { phoneNumber?: string }): Promise<void> => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    const now = new Date();
    const profileData: any = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || '',
      createdAt: userSnap.exists() ? userSnap.data().createdAt.toDate() : now,
      updatedAt: now
    };

    // undefined 값은 Firestore에 저장하지 않음
    const phoneNumber = additionalData?.phoneNumber || user.phoneNumber;
    if (phoneNumber) {
      profileData.phoneNumber = phoneNumber;
    }

    const photoURL = user.photoURL;
    if (photoURL) {
      profileData.photoURL = photoURL;
    }

    await setDoc(userRef, profileData, { merge: true });
  } catch (error) {
    console.error('사용자 프로필 저장 실패:', error);
    throw new Error('사용자 정보 저장 중 오류가 발생했습니다.');
  }
};

// 사용자 프로필 업데이트
export const updateUserProfile = async (uid: string, data: Partial<UserProfile>): Promise<void> => {
  try {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { ...data, updatedAt: new Date() }, { merge: true });
  } catch (error) {
    console.error('사용자 프로필 업데이트 실패:', error);
    throw new Error('사용자 정보 업데이트 중 오류가 발생했습니다.');
  }
};

// 사용자 프로필 가져오기
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    console.log('🔍 getUserProfile: 프로필 조회 시작', uid);
    console.log('🔍 getUserProfile: Firestore 연결 상태 확인');
    
    const userRef = doc(db, 'users', uid);
    console.log('🔍 getUserProfile: Document 참조 생성 완료');
    
    console.log('🔍 getUserProfile: Firestore getDoc 호출 시작...');
    const userSnap = await getDoc(userRef);
    console.log('🔍 getUserProfile: Firestore getDoc 호출 완료');
    
    if (userSnap.exists()) {
      console.log('✅ getUserProfile: 사용자 문서 존재함');
      const data = userSnap.data();
      console.log('📄 getUserProfile: 문서 데이터:', data);
      
      const profile = {
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as UserProfile;
      
      console.log('✅ getUserProfile: 프로필 변환 완료', profile);
      return profile;
    }
    
    console.log('⚠️ getUserProfile: 사용자 문서가 존재하지 않음');
    return null;
  } catch (error: any) {
    console.error('❌ getUserProfile: 사용자 프로필 조회 실패');
    console.error('❌ 오류 타입:', error?.constructor?.name);
    console.error('❌ 오류 코드:', error?.code);
    console.error('❌ 오류 메시지:', error?.message);
    console.error('❌ 전체 오류 객체:', error);
    
    // Firebase 특정 오류 처리
    if (error?.code === 'unavailable') {
      console.error('❌ Firebase 백엔드에 연결할 수 없음 - 네트워크 문제');
      throw new Error('Firebase 연결 실패: 네트워크 연결을 확인해주세요.');
    } else if (error?.code === 'permission-denied') {
      console.error('❌ Firebase 접근 권한 없음');
      throw new Error('Firebase 접근 권한이 없습니다.');
    } else if (error?.message?.includes('offline')) {
      console.error('❌ Firebase 오프라인 모드');
      throw new Error('Firebase가 오프라인 모드입니다.');
    }
    
    throw new Error(`사용자 정보 조회 중 오류가 발생했습니다: ${error?.message || '알 수 없는 오류'}`);
  }
};

// 에러 메시지 변환
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/user-not-found':
      return '등록되지 않은 이메일입니다.';
    case 'auth/wrong-password':
      return '비밀번호가 올바르지 않습니다.';
    case 'auth/email-already-in-use':
      return '이미 사용 중인 이메일입니다.';
    case 'auth/weak-password':
      return '비밀번호는 6자 이상이어야 합니다.';
    case 'auth/invalid-email':
      return '유효하지 않은 이메일 형식입니다.';
    case 'auth/popup-closed-by-user':
      return '로그인이 취소되었습니다.';
    case 'auth/cancelled-popup-request':
      return '이미 로그인 요청이 진행 중입니다.';
    case 'auth/popup-blocked':
      return '팝업이 차단되었습니다. 브라우저 설정을 확인해주세요.';
    case 'auth/too-many-requests':
      return '너무 많은 시도로 인해 일시적으로 차단되었습니다. 잠시 후 다시 시도해주세요.';
    default:
      return '로그인 중 오류가 발생했습니다. 다시 시도해주세요.';
  }
}; 