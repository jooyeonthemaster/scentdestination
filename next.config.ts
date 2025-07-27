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
              "font-src 'self' https://fonts.gstatic.com https://fastly.jsdelivr.net https://cdn.jsdelivr.net https://t1.daumcdn.net",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' https://firebase.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://www.google-analytics.com https://analytics.google.com wss://firestore.googleapis.com wss://firebase.googleapis.com https://api.tosspayments.com https://log.tosspayments.com https://event.tosspayments.com https://frontend-storage.tosspayments.com https://apigw-sandbox.tosspayments.com https://*.tosspayments.com https://pay.kakao.com https://kauth.kakao.com https://*.kakao.com https://accounts.google.com https://*.googleapis.com",
              "frame-src 'self' https://js.tosspayments.com https://pay.toss.im https://*.tosspayments.com https://pay.kakao.com https://kauth.kakao.com https://*.kakao.com https://accounts.google.com",
              "child-src 'self'",
            ].join('; ')
          },
        ],
      },
    ]
  },
};

export default nextConfig;
