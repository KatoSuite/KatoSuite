const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=(), payment=(), interest-cohort=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self';",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com www.google-analytics.com;",
      "style-src 'self' 'unsafe-inline' fonts.googleapis.com;",
      "img-src 'self' data: blob: www.google-analytics.com www.googletagmanager.com https:;",
      "font-src 'self' data: fonts.gstatic.com;",
      "connect-src 'self' https://api.stripe.com https://r.stripe.com https://m.stripe.com https://*.supabase.co https://www.google-analytics.com;",
      "frame-src https://js.stripe.com;",
      "base-uri 'self';",
      "form-action 'self';",
      "frame-ancestors 'none';",
      "upgrade-insecure-requests;",
    ].join(" ")
  }
];

module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/(.*)\\.(png|jpg|jpeg|webp|avif|ico|woff2)$",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }]
      }
    ];
  },
};
