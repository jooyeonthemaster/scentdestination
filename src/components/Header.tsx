'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/utils';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const router = useRouter();
  const { user, userProfile, logout, isAuthenticated, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsUserMenuOpen(false);
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  const renderAuthButtons = (isMobile: boolean = false) => {
    if (loading) {
      return (
        <div className={cn(
          "flex items-center",
          isMobile ? "justify-center py-2" : "space-x-2"
        )}>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gold"></div>
        </div>
      );
    }

    if (isAuthenticated && user) {
      // 로그인된 상태
      const displayName = userProfile?.displayName || user.displayName || '사용자';
      const photoURL = userProfile?.photoURL || user.photoURL;

      if (isMobile) {
        return (
          <div className="border-t border-beige p-6 bg-beige/20">
            <div className="flex items-center space-x-3 mb-4">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={displayName}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium text-charcoal">{displayName}</p>
                <p className="text-sm text-charcoal/60">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-charcoal hover:text-gold hover:bg-white/50 rounded-lg transition-colors"
            >
              로그아웃
            </button>
          </div>
        );
      }

      // 데스크톱 사용자 메뉴
      return (
        <div 
          className="relative"
          onMouseEnter={() => setIsUserMenuOpen(true)}
          onMouseLeave={() => setIsUserMenuOpen(false)}
        >
          <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-beige/30 transition-colors">
            {photoURL ? (
              <img
                src={photoURL}
                alt={displayName}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="hidden md:block text-charcoal font-medium">{displayName}</span>
            <svg className="w-4 h-4 text-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* 사용자 드롭다운 메뉴 */}
          <div className={cn(
            "absolute right-0 top-full mt-2 w-48 bg-white shadow-lg border border-beige rounded-lg overflow-hidden",
            "transition-all duration-200",
            isUserMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"
          )}>
            <div className="p-3 border-b border-beige bg-beige/20">
              <p className="font-medium text-charcoal text-sm">{displayName}</p>
              <p className="text-xs text-charcoal/60">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 text-charcoal hover:text-gold hover:bg-beige transition-colors text-sm"
            >
              로그아웃
            </button>
          </div>
        </div>
      );
    }

    // 로그인되지 않은 상태
    if (isMobile) {
      return (
        <div className="border-t border-beige p-6 space-y-3">
          <Link
            href="/auth/login"
            className="block w-full text-center px-6 py-3 border border-gold text-gold font-medium rounded-full hover:bg-gold hover:text-white transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            로그인
          </Link>
          <Link
            href="/auth/signup"
            className="block w-full text-center px-6 py-3 bg-gold text-white font-medium rounded-full hover:bg-gold/90 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            회원가입
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Link
          href="/auth/login"
          className="px-4 py-2 text-charcoal hover:text-gold font-medium transition-colors duration-200"
        >
          로그인
        </Link>
        <Link
          href="/auth/signup"
          className="px-6 py-2 bg-gold text-white font-medium rounded-full hover:bg-gold/90 transition-colors duration-200 shadow-md hover:shadow-lg"
        >
          회원가입
        </Link>
      </div>
    );
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-beige"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-sage to-terracotta rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-charcoal">Scent Destination</h1>
              <p className="text-xs text-charcoal/60 -mt-0.5">향으로 떠나는 특별한 여행</p>
            </div>
          </Link>

                     {/* Desktop Navigation - 핵심 메뉴만 */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="relative px-3 py-1.5 text-charcoal font-medium transition-all duration-300 hover:text-sage group"
            >
              홈
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sage transition-all duration-300 group-hover:w-full" />
            </Link>
            
            <Link
              href="/ai-scent-recommendation"
              className="relative px-3 py-1.5 text-charcoal font-medium transition-all duration-300 hover:text-sage group"
            >
              AI 향기 추천
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sage transition-all duration-300 group-hover:w-full" />
            </Link>
            
            <Link
              href="/scent-spaces"
              className="relative px-3 py-1.5 text-charcoal font-medium transition-all duration-300 hover:text-sage group"
            >
              향기 여행지
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sage transition-all duration-300 group-hover:w-full" />
            </Link>
            
            <Link
              href="/scent-map"
              className="relative px-3 py-1.5 text-charcoal font-medium transition-all duration-300 hover:text-sage group"
            >
              향기 지도
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sage transition-all duration-300 group-hover:w-full" />
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center">
            {renderAuthButtons()}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-charcoal hover:text-sage transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className={cn("w-6 h-6 transition-transform duration-300", isMobileMenuOpen && "rotate-90")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu - 간소화 */}
        <div
          className={cn(
            "lg:hidden transition-all duration-300 overflow-hidden",
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="bg-white border-t border-beige">
            <nav className="py-4 space-y-2">
              <Link
                href="/"
                className="block px-6 py-3 text-charcoal font-medium hover:text-sage hover:bg-beige/30 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                홈
              </Link>
              
              <Link
                href="/ai-scent-recommendation"
                className="block px-6 py-3 text-charcoal font-medium hover:text-sage hover:bg-beige/30 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                AI 향기 추천
              </Link>
              
              <Link
                href="/scent-spaces"
                className="block px-6 py-3 text-charcoal font-medium hover:text-sage hover:bg-beige/30 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                향기 여행지
              </Link>
              
              <Link
                href="/scent-map"
                className="block px-6 py-3 text-charcoal font-medium hover:text-sage hover:bg-beige/30 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                향기 지도
              </Link>
            </nav>
            
            {/* 모바일 인증 버튼들 */}
            {renderAuthButtons(true)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
