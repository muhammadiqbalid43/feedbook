import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "", // kosongkan kalau tidak pakai port khusus
        pathname: "/u/**", // lebih aman, hanya izinkan path avatar user
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // Tambahkan domain lain yang kamu pakai di project ini
      // Contoh:
      // { protocol: 'https', hostname: 'picsum.photos' },
      // { protocol: 'https', hostname: '*.cloudinary.com' },
    ],
  },
};

export default nextConfig;
