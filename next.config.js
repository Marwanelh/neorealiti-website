/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Allow camera/mic for self so visuals demos can access them
  { key: 'Permissions-Policy', value: 'camera=(self), microphone=(self), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Allow CDN scripts used by visuals demos (p5.js, Three.js, TF.js, MediaPipe)
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      // Allow CDN fetches + Google Storage (TF.js model weights)
      "connect-src 'self' https://api.resend.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://storage.googleapis.com",
      // Web workers needed for TF.js
      "worker-src 'self' blob:",
      // Camera/video streams
      "media-src 'self' blob: mediastream:",
      // Allow same-origin iframes (visuals viewer)
      "frame-ancestors 'self'",
      "frame-src 'self'",
    ].join('; '),
  },
]

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

module.exports = nextConfig
