const {
  withHydrationOverlay,
} = require("@builder.io/react-hydration-overlay/next");
const million = require("million/compiler");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "cdn.builder.io",
      "cdn.dribbble.com",
      "dribbble.com",
    ],
  },
};

const millionConfig = {
  auto: true, // if you're using RSC: auto: { rsc: true },
};

if (process.env.NODE_ENV === "development") {
  module.exports = withHydrationOverlay({
    /**
     * Optional: `appRootSelector` is the selector for the root element of your app. By default, it is `#__next` which works
     * for Next.js apps with pages directory. If you are using the app directory, you should change this to `main`.
     */
    appRootSelector: "main",
  })(million.next(nextConfig, millionConfig));
} else {
  module.exports = million.next(nextConfig, millionConfig);
}
