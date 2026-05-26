import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project. A stray package-lock.json in the
  // home directory was making Next infer ~/ as the root, so dev/preview tried
  // to file-watch the entire home folder (EMFILE -> erratic crashes).
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "video.wixstatic.com",
        pathname: "/video/**",
      },
    ],
  },
};

export default nextConfig;
