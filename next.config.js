/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

module.exports = {
    reactStrictMode: false,
    env: {
        BASE_URL: process.env.API_URL,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9000',
                pathname: '/dramabase-poc-selection-image/**',
            },
            {
                protocol: 'https',
                hostname: 'dramabase-poc-selection-image.s3.ap-northeast-1.amazonaws.com',
                port: '',
                pathname: '/**/**',
            },
        ],
    },
}