/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/dn01o52nc/**")],
  },
};

export default nextConfig;
