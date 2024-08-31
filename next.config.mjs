

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
    api: {
        // Enable API routes
        externalResolver: true,
      },
      proxy: {
        '/api': {
          target: 'https://arcane-backend.onrender.com',
          changeOrigin: true,
          pathRewrite: { '^/api': '' },
        },
      },    
    images: {
        domains: ["res.cloudinary.com"],
    },
    sassOptions: {
        cache: false,
    },
    
};

export default nextConfig;
