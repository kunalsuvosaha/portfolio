import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getRemotePatterns } from "./src/lib/remote-image.js";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: getRemotePatterns(),
  },
};

export default nextConfig;
