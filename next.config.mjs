/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.alphalake.services'
            }
        ]
    }
};

export default nextConfig;
