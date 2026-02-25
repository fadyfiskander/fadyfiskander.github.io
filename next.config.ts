import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',      // تفعيل التصدير الثابت
  assetPrefix: './',     // إجبار المسارات تكون نسبية (نقطة قبل السلاش)
  trailingSlash: true,    // إضافة سلاش في نهاية الروابط لضمان عملها على GitHub
  
  images: {
    unoptimized: true,   // ضروري جداً لأن GitHub Pages لا يدعم سيرفر تحسين الصور
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',   // السماح بجلب الصور من أي رابط خارجي
      },
    ],
  },
};

export default nextConfig;