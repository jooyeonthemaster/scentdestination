/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 베이스 컬러
        charcoal: '#2B2B2B',        // 진한 텍스트
        
        // 메인 팔레트 - 첨부 이미지 스타일
        sand: '#F5F1EB',            // 메인 배경 (연한 베이지)
        cream: '#FAF7F2',           // 가장 연한 배경
        latte: '#E8DDD4',           // 중간 베이지
        mocha: '#D4C4B0',           // 진한 베이지
        
        // 악센트 컬러
        sage: '#A8B5A0',            // 부드러운 그린 (포인트)
        terracotta: '#C67B5C',      // 따뜻한 테라코타 (버튼)
        warm: '#B8A082',            // 따뜻한 브라운
        gold: '#D4AF37',            // 골드 (버튼용)
        
        // 기본 컬러
        white: '#FFFFFF',
        black: '#000000',
        
        // 기존 컬러 유지 (호환성)
        beige: '#F5F5DC',
        pure: '#FFFFFF',
        obsidian: '#2C3E50',
        slate: '#64748B',
        stone: '#F5F5F4',
        ash: '#E5E7EB',
        taupe: '#483C32'
      },
      fontFamily: {
        // 메인 폰트 - 첨부 이미지 스타일
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
        'satoshi': ['Satoshi', 'system-ui', 'sans-serif'],
        
        // 기존 폰트 유지
        'cafe24': ['Cafe24ClassicType-Regular', 'Noto Serif KR', 'serif'],
        'noto-kr': ['Noto Serif KR', 'serif'],
        'garamond': ['Garamond', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      animation: {
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeIn': 'fadeIn 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'floatDelayed 3s ease-in-out infinite 1.5s',
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'slideInLeft': 'slideInLeft 0.8s ease-out forwards',
        'slideInRight': 'slideInRight 0.8s ease-out forwards',
        'scaleIn': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatDelayed: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        slideInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(50px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        scaleIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      // 애니메이션 딜레이 유틸리티 클래스 추가
      animationDelay: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '900': '900ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
        '5000': '5000ms',
      },
    },
  },
  plugins: [
    // 애니메이션 딜레이 플러그인
    function({ addUtilities }) {
      const newUtilities = {}
      const delays = ['0', '75', '100', '150', '200', '300', '500', '600', '700', '900', '1000', '1200', '1500', '2000', '3000', '4000', '5000']
      
      delays.forEach(delay => {
        newUtilities[`.animation-delay-${delay}`] = {
          'animation-delay': `${delay}ms`
        }
      })
      
      addUtilities(newUtilities)
    },
  ],
} 