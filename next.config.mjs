/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [new URL("res.cloudinary.com")],
  },
};

export default nextConfig;
