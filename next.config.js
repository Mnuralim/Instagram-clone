/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SECRET: process.env.API_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
