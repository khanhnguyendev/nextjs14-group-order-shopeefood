/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
