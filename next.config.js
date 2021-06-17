module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    {
      resolve: {
        fallback: {
          fs: false;
        }
      }
    }

    return config;
  },
};
