'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const { sendResetPasswordEmail } = useAuth();
  
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 입력값 변경 처리
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError('');
    setSuccess(false);
  };

  // 비밀번호 재설정 이메일 전송
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await sendResetPasswordEmail(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand/20 flex items-center justify-center pt-24 pb-8">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-xl shadow-lg border border-sand/30 overflow-hidden">
          {/* 헤더 */}
          <div className="p-8 text-center">
            <h1 className="text-3xl font-inter font-bold text-charcoal mb-2">비밀번호 재설정</h1>
            <p className="text-charcoal/60">
              가입하신 이메일 주소를 입력하시면<br />
              비밀번호 재설정 링크를 보내드립니다
            </p>
          </div>

          {/* 폼 */}
          <div className="px-8 pb-8">
            {success ? (
              // 성공 메시지
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto">
                  <svg className="w-8 h-8 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-charcoal mb-2">이메일을 전송했습니다</h3>
                  <p className="text-charcoal/60 text-sm">
                    <span className="font-medium">{email}</span>로<br />
                    비밀번호 재설정 링크를 보내드렸습니다.<br />
                    이메일을 확인해주세요.
                  </p>
                </div>

                <div className="pt-4">
                  <Link 
                    href="/auth/login"
                    className="text-sage hover:text-sage/80 font-medium text-sm"
                  >
                    로그인 페이지로 돌아가기
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* 에러 메시지 */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* 이메일 입력 폼 */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                      이메일 주소
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-sand/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-colors"
                      placeholder="가입하신 이메일을 입력하세요"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-sage text-white py-3 px-6 rounded-lg font-medium hover:bg-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '전송 중...' : '재설정 링크 전송'}
                  </button>
                </form>

                {/* 하단 링크들 */}
                <div className="mt-8 text-center space-y-3">
                  <p className="text-sm">
                    <Link href="/auth/login" className="text-charcoal/60 hover:text-charcoal">
                      로그인 페이지로 돌아가기
                    </Link>
                  </p>
                  <p className="text-sm text-charcoal/60">
                    계정이 없으신가요?{' '}
                    <Link href="/auth/signup" className="text-sage hover:text-sage/80 font-medium">
                      회원가입
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 