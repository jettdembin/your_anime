/** @type {import('next').NextConfig} */
const nextConfig = {
  presets: ["next/babel"],
  plugins: ["inline-react-svg"],
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["media.kitsu.io", "anilist.co", "s4.anilist.co", "i.ytimg.com"],
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
