/** @type {import('next').NextConfig} */

const nextConfig = {
  // TypeScript errors will now correctly fail the build.
  // Do NOT re-add ignoreBuildErrors: true — fix type errors instead.

  images: {
    unoptimized: true,
  },

  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig