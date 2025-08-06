'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface ConsultationForm {
  name: string;
  email: string;
  phone: string;
  consultationType: string;
  preferredScents: string;
  spaceType: string;
  message: string;
}

export default function ConsultationPage() {
  const { user, isAuthenticated } = useAuth();
  const [form, setForm] = useState<ConsultationForm>({
    name: '',
    email: user?.email || '',
    phone: '',
    consultationType: 'scent-selection',
    preferredScents: '',
    spaceType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 실제로는 API 호출이나 이메일 전송 등을 구현
    setTimeout(() => {
      setSubmitted(true);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-charcoal/10 max-w-md mx-4 text-center">
          <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">✅</span>
          </div>
          <h2 className="text-2xl font-inter font-light text-charcoal mb-4">
            상담 신청 완료
          </h2>
          <p className="text-charcoal/70 font-inter leading-relaxed mb-6">
            상담 신청이 성공적으로 접수되었습니다. <br />
            24시간 내에 담당자가 연락드리겠습니다.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-sage text-white py-3 rounded-lg font-inter font-medium hover:bg-sage/90 transition-colors"
          >
            다시 신청하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-sage/20 to-cream">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-inter font-light text-charcoal mb-6">
              향기 컨설팅
            </h1>
            <p className="text-lg text-charcoal/70 font-inter leading-relaxed max-w-2xl mx-auto">
              나만의 특별한 향기를 찾아보세요. <br />
              전문가가 맞춤형 향기 솔루션을 제안해드립니다.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="bg-white rounded-lg shadow-sm border border-charcoal/10 p-8 lg:p-12">
            <h2 className="text-2xl font-inter font-light text-charcoal mb-8 text-center">
              상담 신청서
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-inter font-medium text-charcoal mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none font-inter"
                    placeholder="성함을 입력해주세요"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-inter font-medium text-charcoal mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none font-inter"
                    placeholder="이메일을 입력해주세요"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-charcoal mb-2">
                  연락처 *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none font-inter"
                  placeholder="연락처를 입력해주세요"
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-charcoal mb-2">
                  상담 유형 *
                </label>
                <select
                  name="consultationType"
                  value={form.consultationType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none font-inter"
                >
                  <option value="scent-selection">개인 맞춤 향기 선택</option>
                  <option value="space-scenting">공간 향기 연출</option>
                  <option value="custom-diffuser">커스텀 디퓨저 제작</option>
                  <option value="business-consultation">비즈니스 상담</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-charcoal mb-2">
                  선호하는 공간 유형
                </label>
                <input
                  type="text"
                  name="spaceType"
                  value={form.spaceType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none font-inter"
                  placeholder="예: 카페, 해변, 숲, 도서관 등"
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-charcoal mb-2">
                  선호하는 향기 스타일
                </label>
                <input
                  type="text"
                  name="preferredScents"
                  value={form.preferredScents}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none font-inter"
                  placeholder="예: 상쾌한, 따뜻한, 우디, 플로럴 등"
                />
              </div>

              <div>
                <label className="block text-sm font-inter font-medium text-charcoal mb-2">
                  상세 내용
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:ring-2 focus:ring-sage/20 focus:border-sage outline-none font-inter resize-none"
                  placeholder="원하시는 향기나 특별한 요구사항이 있으시면 자세히 설명해주세요"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sage text-white py-4 rounded-lg font-inter font-medium hover:bg-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '전송 중...' : '상담 신청하기'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-latte/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-16 xl:px-24">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-inter font-light text-charcoal mb-4">
              상담 프로세스
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-inter font-medium text-sage">1</span>
              </div>
              <h3 className="font-inter font-medium text-charcoal mb-2">신청</h3>
              <p className="text-sm text-charcoal/70">온라인으로 간편하게 상담을 신청하세요</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-inter font-medium text-sage">2</span>
              </div>
              <h3 className="font-inter font-medium text-charcoal mb-2">상담</h3>
              <p className="text-sm text-charcoal/70">전문가와 1:1 맞춤 상담을 진행합니다</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-inter font-medium text-sage">3</span>
              </div>
              <h3 className="font-inter font-medium text-charcoal mb-2">제안</h3>
              <p className="text-sm text-charcoal/70">맞춤형 향기 솔루션을 제안해드립니다</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 