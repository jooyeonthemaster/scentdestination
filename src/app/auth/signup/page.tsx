'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { SignUpData } from '@/lib/authService';

export default function SignUpPage() {
  const router = useRouter();
  const { signUpWithEmail, signInWithGoogle, loading } = useAuth();
  
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    displayName: '',
    phoneNumber: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    setError(''); // 입력 시 에러 메시지 초기화
  };

  // 폼 유효성 검사
  const validateForm = (): string | null => {
    if (!formData.email || !formData.password || !formData.displayName) {
      return '필수 항목을 모두 입력해주세요.';
    }
    
    if (formData.password.length < 6) {
      return '비밀번호는 6자 이상이어야 합니다.';
    }
    
    if (formData.password !== confirmPassword) {
      return '비밀번호가 일치하지 않습니다.';
    }
    
    return null;
  };

  // 이메일 회원가입
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await signUpWithEmail(formData);
      router.push('/'); // 회원가입 성공 시 홈으로 이동
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 구글 회원가입
  const handleGoogleSignUp = async () => {
    try {
      setError('');
      await signInWithGoogle();
      router.push('/'); // 회원가입 성공 시 홈으로 이동
    } catch (err: any) {
      setError(err.message);
    }
  };

  // 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="min-h-screen bg-sand/20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/20 flex items-center justify-center pt-24 pb-8">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg border border-sand/30 overflow-hidden">
          {/* 헤더 */}
          <div className="p-8 text-center">
            <h1 className="text-3xl font-inter font-bold text-charcoal mb-2">회원가입</h1>
            <p className="text-charcoal/60">새로운 향수 여행을 시작해보세요</p>
          </div>

          {/* 폼 */}
          <div className="px-8 pb-8">
            {/* 에러 메시지 */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* 이메일 회원가입 폼 */}
            <form onSubmit={handleEmailSignUp} className="space-y-6">
              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-charcoal mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                  이메일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  placeholder="이메일을 입력하세요"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-charcoal mb-2">
                  전화번호
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  placeholder="전화번호를 입력하세요 (선택사항)"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                  비밀번호 <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  placeholder="비밀번호를 입력하세요 (6자 이상)"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-charcoal mb-2">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sage text-white py-3 px-6 rounded-lg font-medium hover:bg-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '회원가입 중...' : '회원가입'}
              </button>
            </form>

            {/* 구분선 */}
            <div className="my-8 flex items-center">
              <div className="flex-1 border-t border-sand/30"></div>
              <span className="px-4 text-sm text-charcoal/60">또는</span>
              <div className="flex-1 border-t border-sand/30"></div>
            </div>

            {/* 구글 회원가입 */}
            <button
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full bg-white border border-sand/50 text-charcoal py-3 px-6 rounded-lg font-medium hover:bg-sand/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google로 회원가입
            </button>

            {/* 하단 링크 */}
            <div className="mt-8 text-center">
              <p className="text-sm text-charcoal/60">
                이미 계정이 있으신가요?{' '}
                <Link href="/auth/login" className="text-sage hover:text-sage/80 font-medium">
                  로그인
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 