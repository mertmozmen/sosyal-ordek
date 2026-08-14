import type { NextConfig } from "next";

// GitHub Pages, siteyi https://<kullanici>.github.io/<repo>/ altında servis eder;
// NEXT_PUBLIC_BASE_PATH yalnızca Pages derlemesinde (CI) set edilir ve istemci
// tarafında medya yollarını çözmek için de kullanılır.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
