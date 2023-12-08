/** @type {import('next').NextConfig} */
const nextConfig = {
  // presets: ["next/babel"],
  // plugins: ["inline-react-svg"],
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.kitsu.io" },
      { protocol: "https", hostname: "anilist.co" },
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    // formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
