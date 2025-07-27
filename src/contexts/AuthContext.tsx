'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { 
  signInWithGoogle, 
  signInWithEmail, 
  signUpWithEmail, 
  logout,
  sendResetPasswordEmail,
  getUserProfile,
  UserProfile,
  SignInData,
  SignUpData
} from '@/lib/authService';

interface AuthContextType {
  // 상태
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  
  // 인증 함수들
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (data: SignInData) => Promise<void>;
  signUpWithEmail: (data: SignUpData) => Promise<void>;
  logout: () => Promise<void>;
  sendResetPasswordEmail: (email: string) => Promise<void>;
  
  // 헬퍼 함수
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // 인증 상태 변화 감지
  useEffect(() => {
    console.log('🔐 AuthContext: 인증 상태 리스너 등록');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 AuthContext: 인증 상태 변화 감지', user ? '로그인됨' : '로그아웃됨');
      setUser(user);
      
      if (user) {
        try {
          console.log('👤 AuthContext: 사용자 프로필 조회 시작', user.uid);
          const profile = await getUserProfile(user.uid);
          console.log('✅ AuthContext: 사용자 프로필 조회 성공', profile);
          setUserProfile(profile);
        } catch (error: any) {
          console.error('❌ AuthContext: 사용자 프로필 조회 실패');
          console.error('오류 정보:', {
            name: error?.name,
            message: error?.message,
            code: error?.code
          });
          
          // Firebase 연결 관련 오류 처리
          if (error?.code === 'unavailable' || error?.message?.includes('unavailable')) {
            console.warn('⚠️ Firebase 연결 일시 실패 - 재시도 예약');
            // 5초 후 한 번만 재시도
            setTimeout(async () => {
              try {
                console.log('🔄 AuthContext: 프로필 조회 재시도');
                const profile = await getUserProfile(user.uid);
                console.log('✅ AuthContext: 재시도 성공', profile);
                setUserProfile(profile);
              } catch (retryError: any) {
                console.warn('❌ AuthContext: 재시도 실패 - 프로필 없이 진행', retryError?.message);
                setUserProfile(null);
              }
            }, 5000);
          } else {
            // 다른 오류의 경우 프로필 없이 진행
            setUserProfile(null);
          }
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('🔐 AuthContext: 인증 상태 리스너 해제');
      unsubscribe();
    };
  }, []);

  // 구글 로그인
  const handleSignInWithGoogle = async (): Promise<void> => {
    try {
      setLoading(true);
      await signInWithGoogle();
      // onAuthStateChanged에서 사용자 상태 업데이트됨
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  // 이메일 로그인
  const handleSignInWithEmail = async (data: SignInData): Promise<void> => {
    try {
      setLoading(true);
      await signInWithEmail(data);
      // onAuthStateChanged에서 사용자 상태 업데이트됨
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  // 이메일 회원가입
  const handleSignUpWithEmail = async (data: SignUpData): Promise<void> => {
    try {
      setLoading(true);
      await signUpWithEmail(data);
      // onAuthStateChanged에서 사용자 상태 업데이트됨
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  // 로그아웃
  const handleLogout = async (): Promise<void> => {
    try {
      setLoading(true);
      await logout();
      // onAuthStateChanged에서 사용자 상태 업데이트됨
    } catch (error: any) {
      setLoading(false);
      throw error;
    }
  };

  // 비밀번호 재설정
  const handleSendResetPasswordEmail = async (email: string): Promise<void> => {
    try {
      await sendResetPasswordEmail(email);
    } catch (error: any) {
      throw error;
    }
  };

  const value: AuthContextType = {
    // 상태
    user,
    userProfile,
    loading,
    
    // 인증 함수들
    signInWithGoogle: handleSignInWithGoogle,
    signInWithEmail: handleSignInWithEmail,
    signUpWithEmail: handleSignUpWithEmail,
    logout: handleLogout,
    sendResetPasswordEmail: handleSendResetPasswordEmail,
    
    // 헬퍼 함수
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth 훅
export function useAuth() {
  const context = useContext(AuthContext);
  
  // 서버 사이드에서는 null 반환
  if (typeof window === 'undefined') {
    return {
      user: null,
      userProfile: null,
      loading: true,
      signInWithGoogle: async () => {},
      signInWithEmail: async () => {},
      signUpWithEmail: async () => {},
      logout: async () => {},
      sendResetPasswordEmail: async () => {},
      isAuthenticated: false,
    };
  }
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// 인증 상태 확인 훅
export function useRequireAuth() {
  const { isAuthenticated, loading } = useAuth();
  
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // 로그인이 필요한 페이지에서 로그인 페이지로 리다이렉트
      window.location.href = '/auth/login';
    }
  }, [isAuthenticated, loading]);

  return { isAuthenticated, loading };
} 