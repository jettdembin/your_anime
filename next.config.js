/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["media.kitsu.io", "anilist.co"],
    // formats: ["image/avif", "image/webp"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "assets.vercel.com",
    //     port: "",
    //     pathname: "/image/upload/**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
