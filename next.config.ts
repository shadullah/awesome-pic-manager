import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wlxoadahlnwxsknaluhl.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  }
};

export default nextConfig;
