/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ["images.unsplash.com", "avatars.githubusercontent.com"],
      remotePatterns: [
         {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/photos/**",
         },
         {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
            port: "",
            pathname: "/**",
         },
      ],
   },
};

module.exports = nextConfig;
