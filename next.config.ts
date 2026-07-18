import path from "node:path";
import type { NextConfig } from "next";

const stylesDir = path.join(process.cwd(), "src/styles");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    loadPaths: [stylesDir],
    includePaths: [stylesDir],
  },
};

export default nextConfig;
