/** @type {import('next').NextConfig} */
const isGithubActions = process.env.GITHUB_ACTIONS || false;
let repo = '';

if (isGithubActions && process.env.GITHUB_REPOSITORY) {
  repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
}

const isRootRepo = repo.toLowerCase().endsWith('.github.io');

const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // GitHub Pages does not support server-side image optimization
  },
  // Apply basePath and assetPrefix only if deploying to a subfolder repo
  basePath: isGithubActions && !isRootRepo && repo ? `/${repo}` : '',
  assetPrefix: isGithubActions && !isRootRepo && repo ? `/${repo}/` : '',
  trailingSlash: true, // Ensures proper routing links on static hosts
}

module.exports = nextConfig
