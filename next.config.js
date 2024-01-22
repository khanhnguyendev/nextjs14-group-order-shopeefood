/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    // domains: ["images.foody.vn"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.foody.vn",
        port: "",
      },
    ],
  },
  reactStrictMode: false,
};
