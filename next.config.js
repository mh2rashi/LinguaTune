// Load environment variables from .env file
require('dotenv').config();

// Define your Next.js configuration
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      issuer: { and: [/\.(js|ts|md)x?$/] },
      type: 'asset/resource',
    });
    return config;
  },
  
  // Add your environment variables to the Next.js configuration
  env: {
    MY_AWS_ACCESS_KEY: process.env.MY_AWS_ACCESS_KEY,
    MY_AWS_SECRET_ACCESS_KEY: process.env.MY_AWS_SECRET_ACCESS_KEY,
    BUCKET_NAME: process.env.BUCKET_NAME,
    // Add other environment variables here...
  }
};

module.exports = nextConfig;
