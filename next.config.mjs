/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets `npm run build:check` compile into .next-build instead of .next, so a
  // production build can never overwrite the files a running `npm run dev` is using.
  distDir: process.env.NEXT_DIST_DIR || '.next',

  images: {
    formats: ['image/avif', 'image/webp'],
    // The widest source image is 1536px, so generating 2048/3840 derivatives
    // only burns optimiser time and disk for no visible gain.
    deviceSizes: [640, 750, 828, 1080, 1200, 1536, 1920],
    imageSizes: [64, 96, 128, 256, 384],
  },

  // LocatorJS: stamps JSX with its source file/line so the browser extension can
  // Alt/Option + click straight to the code.
  //
  // OPT-IN, because it is expensive: the loader runs Babel over every .tsx file
  // on top of SWC (roughly doubling dev compile time) and injects a
  // data-locatorjs attribute into every element (~60 KB extra per page).
  //
  //   npm run dev          -> fast, no locator
  //   npm run dev:locator  -> slower, click-to-source enabled
  webpack: (config, { dev }) => {
    if (dev && process.env.LOCATOR === '1') {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        use: [{ loader: '@locator/webpack-loader', options: { env: 'development' } }],
      });
    }
    return config;
  },
};

export default nextConfig;
