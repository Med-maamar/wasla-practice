/**
 * Next.js configuration file.
 *
 * The project currently uses the default configuration because the tasks
 * focus on architecture, API layering, and reusable UI primitives.
 * The Turbopack root is pinned to this repository to avoid incorrect
 * workspace-root inference when other lockfiles exist above the project.
 */
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
