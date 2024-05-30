/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'jpcdn.it',
          },
        ],
      },
};

export default nextConfig;
