import type { NextConfig } from "next";

// GitHub Pages, siteyi https://<kullanici>.github.io/<repo>/ altında servis eder;
// BASE_PATH ortam değişkeni yalnızca Pages derlemesinde (CI) set edilir.
const basePath = process.env.BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
