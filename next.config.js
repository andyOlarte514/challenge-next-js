/** @type {import('next').NextConfig} */
require('dotenv').config();

const nextConfig = {
    env: {
        API_BASE_URL: 'http://localhost:3000'
    }
}

module.exports = nextConfig
