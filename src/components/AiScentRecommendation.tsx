'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AiScentRecommendation() {
  return (
    <section className="py-20 bg-gradient-to-br from-sage/5 via-cream to-terracotta/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sage rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-terracotta rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-warm rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full border border-sage/20">
              <div className="w-2 h-2 bg-sage rounded-full animate-pulse"></div>
              <span className="text-sm font-inter font-medium text-charcoal/80 tracking-wide uppercase">
                AI 기반 맞춤 서비스
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-6xl font-inter font-light leading-tight text-charcoal">
                <span className="block">당신의 공간을 위한</span>
                <span className="block font-medium text-sage">완벽한 향기를</span>
                <span className="block font-light">AI가 찾아드립니다</span>
              </h2>
              
              <p className="text-lg text-charcoal/70 leading-relaxed max-w-lg">
                최첨단 AI 기술과 향기 전문가의 노하우를 결합하여 
                당신의 공간 특성에 완벽하게 맞는 시그니처 향을 추천해드립니다.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-sage/20 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-sage" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-inter font-medium text-charcoal mb-1">전문적인 공간 분석</h4>
                  <p className="text-sm text-charcoal/60">상업용/주거용, 평수, 컨셉, 사용 목적까지 세밀하게 분석</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-terracotta/20 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-terracotta" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-inter font-medium text-charcoal mb-1">AI 이미지 분석</h4>
                  <p className="text-sm text-charcoal/60">Google Gemini AI가 공간 이미지를 분석하여 최적의 향을 제안</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-warm/20 rounded-full flex items-center justify-center mt-1">
                  <svg className="w-3 h-3 text-warm" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-inter font-medium text-charcoal mb-1">개인화된 추천</h4>
                  <p className="text-sm text-charcoal/60">사용자의 취향과 라이프스타일을 고려한 맞춤형 향기 솔루션</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="/ai-scent-recommendation"
                className="group inline-flex items-center justify-center px-8 py-4 bg-sage text-white font-inter font-medium tracking-wide transition-all duration-300 hover:bg-sage/90 hover:shadow-xl rounded-xl hover:scale-105"
              >
                <span>무료 AI 향기 추천받기</span>
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <button className="group inline-flex items-center justify-center px-8 py-4 border-2 border-charcoal/20 text-charcoal font-inter font-medium tracking-wide transition-all duration-300 hover:border-sage hover:bg-sage/5 rounded-xl">
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>서비스 소개 영상</span>
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl border border-sage/10 overflow-hidden">
              <div className="p-8">
                <div className="space-y-6">
                  
                  {/* Process Steps */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-inter font-semibold text-charcoal mb-6">
                      AI 추천 프로세스
                    </h3>
                    
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-sage rounded-full flex items-center justify-center text-white font-medium text-sm">
                        1
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal text-sm">공간 정보 입력</h4>
                        <p className="text-xs text-charcoal/60">용도, 크기, 컨셉 등 기본 정보</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-terracotta rounded-full flex items-center justify-center text-white font-medium text-sm">
                        2
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal text-sm">이미지 업로드</h4>
                        <p className="text-xs text-charcoal/60">공간 사진으로 AI 분석</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-warm rounded-full flex items-center justify-center text-white font-medium text-sm">
                        3
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-charcoal text-sm">맞춤 추천</h4>
                        <p className="text-xs text-charcoal/60">AI가 분석한 최적의 향기 제안</p>
                      </div>
                    </div>
                  </div>

                  {/* Mock Interface Preview */}
                  <div className="bg-gradient-to-br from-sage/5 to-terracotta/5 rounded-2xl p-6 border border-sage/10">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-sage rounded-full"></div>
                        <span className="text-xs font-medium text-charcoal">AI 분석 중...</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="h-2 bg-sage/20 rounded-full overflow-hidden">
                          <div className="h-full bg-sage rounded-full w-3/4 animate-pulse"></div>
                        </div>
                        <div className="text-xs text-charcoal/60">
                          공간 이미지를 분석하여 최적의 향기를 찾고 있습니다...
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <div className="bg-white/60 rounded-lg p-3 text-center">
                          <div className="text-xs font-medium text-charcoal">추천 향기</div>
                          <div className="text-lg font-semibold text-sage">우디 앰버</div>
                        </div>
                        <div className="bg-white/60 rounded-lg p-3 text-center">
                          <div className="text-xs font-medium text-charcoal">적합도</div>
                          <div className="text-lg font-semibold text-terracotta">94%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-sage/20 rounded-full blur-xl animate-float"></div>
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-terracotta/20 rounded-full blur-xl animate-float-delayed"></div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-inter font-bold text-sage">500+</div>
            <div className="text-sm text-charcoal/60">분석된 공간</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-inter font-bold text-terracotta">94%</div>
            <div className="text-sm text-charcoal/60">만족도</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-inter font-bold text-warm">50+</div>
            <div className="text-sm text-charcoal/60">향기 데이터베이스</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-inter font-bold text-sage">AI</div>
            <div className="text-sm text-charcoal/60">기반 분석</div>
          </div>
        </div>
      </div>
    </section>
  );
} 