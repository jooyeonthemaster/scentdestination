'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-cream overflow-hidden">
      {/* Background Image with Subtle Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-background.jpg"
          alt="Luxury fragrance background"
          fill
          className="object-cover object-center opacity-60"
          priority
          sizes="100vw"
        />
        {/* Balanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream/60 via-sand/40 to-cream/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-full mx-auto px-6 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-12 gap-12 items-center min-h-screen">
            
            {/* Text Content - Left Side */}
            <div className="lg:col-span-7 space-y-8">
              {/* Small Label */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-sage/10 rounded-full">
                <div className="w-2 h-2 bg-sage rounded-full"></div>
                <span className="text-sm font-inter font-medium text-charcoal/70 tracking-wide uppercase">
                  Scent Destination
                </span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl xl:text-8xl font-inter font-light leading-[0.9] tracking-tight text-charcoal">
                  <span className="block">Journey to</span>
                  <span className="block">Discover</span>
                  <span className="block font-medium italic text-sage">Your Signature Scent</span>
                </h1>
                
                <p className="text-lg lg:text-xl text-charcoal/70 max-w-xl leading-relaxed font-inter font-light">
                  전국 곳곳 숨겨진 감성 공간들의 향기를<br className="hidden sm:block" />
                  직접 체험하고 영원히 간직하세요
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/scent-map"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-terracotta text-white font-inter font-medium tracking-wide transition-all duration-300 hover:bg-terracotta/90 hover:shadow-lg rounded-lg"
                >
                  <span>향기 지도 바로가기</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                
                <Link
                  href="/scent-spaces"
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-charcoal/20 text-charcoal font-inter font-medium tracking-wide transition-all duration-300 hover:border-sage hover:bg-sage/5 rounded-lg"
                >
                  <span>향기 여행지 둘러보기</span>
                </Link>
              </div>
            </div>
            
            {/* Visual Content - Right Side */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <div className="relative w-80 h-96 lg:w-96 lg:h-[500px]">
                {/* Card Stack Effect */}
                <div className="absolute inset-0 bg-white rounded-2xl shadow-lg transform rotate-3 opacity-60"></div>
                <div className="absolute inset-0 bg-sand rounded-2xl shadow-lg transform -rotate-2 opacity-80"></div>
                <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-charcoal/10">
                  <div className="space-y-6">
                    <div className="w-12 h-12 bg-sage rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.415-3.414l5-5A2 2 0 008 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-inter font-semibold text-charcoal mb-2">향기의 여정</h3>
                      <p className="text-charcoal/60 font-inter text-sm leading-relaxed">
                        각 공간만의 독특한 향기를 발견하고, 
                        당신만의 시그니처 센트를 찾아보세요.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-latte/30 rounded-lg p-4 text-center">
                        <div className="text-lg font-inter font-semibold text-charcoal">제주</div>
                        <div className="text-xs text-charcoal/60 font-inter">오션 브리즈</div>
                      </div>
                      <div className="bg-sage/20 rounded-lg p-4 text-center">
                        <div className="text-lg font-inter font-semibold text-charcoal">서울</div>
                        <div className="text-xs text-charcoal/60 font-inter">어반 우디</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center space-y-2 text-charcoal/50">
            <div className="text-xs font-inter font-medium tracking-wider uppercase">
              향기 여행 시작
            </div>
            <div className="w-0.5 h-8 bg-charcoal/20"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
