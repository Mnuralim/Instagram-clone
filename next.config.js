/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_SECRET: "http://localhost:5000",
    NEXTAUTH_SECRET: "djnsjbfjbfjsnfnsjfn877dhhd",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
