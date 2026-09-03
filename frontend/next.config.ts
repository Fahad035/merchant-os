import type { NextConfig } from "next";

// Points at the backend. Set BACKEND_URL on Vercel to your Render URL
// (e.g. https://merchant-os-34yh.onrender.com). Not NEXT_PUBLIC_-prefixed
// on purpose — it's only used server-side to resolve the rewrite below,
// so the raw backend URL is never shipped to the browser bundle.
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;