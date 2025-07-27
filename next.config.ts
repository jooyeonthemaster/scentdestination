import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://js.tosspayments.com https://pay.kakao.com https://kauth.kakao.com https://*.kakao.com https://apis.google.com https://accounts.google.com https://www.gstatic.com https://*.googleapis.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fastly.jsdelivr.net https://cdn.jsdelivr.net https://t1.daumcdn.net https://*.kakao.com https://accounts.google.com",
              "font-src 'self' https://fonts.gstatic.com https://fastly.jsdelivr.net https://cdn.jsdelivr.net",
              "img-src 'self' data: blob: https: http:",
              "media-src 'self' data: blob:",
              "object-src 'none'",
              "frame-src 'self' https://js.tosspayments.com https://pay.toss.im https://*.tosspayments.com https://pay.kakao.com https://kauth.kakao.com https://*.kakao.com https://accounts.google.com https://*.firebaseapp.com https://*.firebase.google.com",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://api.tosspayments.com https://*.tosspayments.com https://pay.kakao.com https://kauth.kakao.com https://*.kakao.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com https://*.firebaseio.com https://*.googleapis.com https://accounts.google.com",
              "worker-src 'self' blob:",
              "child-src 'self' blob:",
              "form-action 'self'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
