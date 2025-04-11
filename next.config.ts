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
  },
  webpack:(config,{isServer})=>{
    if(!isServer){
      config.resolve.fallback = {
        ...config.resolve.fallback,
        mongoose:false
      }
    }
    return config
  }
};

export default nextConfig;
