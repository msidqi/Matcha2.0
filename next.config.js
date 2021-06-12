/* eslint-disable */
const withPlugins = require("next-compose-plugins");
// const optimizedImages = require("next-optimized-images");
const withCSS = require("@zeit/next-css");

const apiURL = process.env.API_URL || "http://localhost:5000";

const nextConfig = {
  poweredByHeader: false,
  redirects: () => [
    {
      source: "/",
      destination: "/signin",
      permanent: true,
    },
  ],
};

if (process.env.NODE_ENV !== "production") {
  nextConfig.rewrites = () => [
    { source: "/api/:path*", destination: `${apiURL}/api/:path*` },
  ];
}

module.exports = withPlugins(
  [
    [
      withCSS,
      {
        /* plugin config here ... */
      },
    ],
    /*[
      optimizedImages,
      {
        optimizeImagesInDev: true,
        handleImages: ["jpeg", "png", "webp"],
      },
    ],*/
  ],
  nextConfig
);
