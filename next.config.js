const { i18n } = require("./next-i18next.config");
// const shouldAnalyzeBundles = process.env.ANALYZE === "true";

/** @type {import('next').NextConfig} */
let nextConfig = {
  // reactStrictMode: true,
  i18n,
  // webpack: config => {
  //   // Fixes npm packages that depend on `fs` module
  //   config.node = {
  //     fs: "empty",
  //   };
  //   return config;
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: process.env.TS_DISABLED === "true",
  // },
};

// if (shouldAnalyzeBundles) {
//   const withNextBundleAnalyzer = require("next-bundle-analyzer")();
//   nextConfig = withNextBundleAnalyzer(nextConfig);
// }

module.exports = nextConfig;
