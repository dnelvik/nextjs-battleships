/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const esLintConfig = {
  ignoreDuringBuilds: true,
};

module.exports = [nextConfig, esLintConfig];
