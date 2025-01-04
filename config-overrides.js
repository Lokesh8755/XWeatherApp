const webpack = require('webpack');

module.exports = function override(config) {
  console.log("Running webpack override configuration...");
  
  // Ensure config.resolve exists
  config.resolve = config.resolve || {};
  // Ensure config.resolve.fallback exists
  config.resolve.fallback = config.resolve.fallback || {};

  try {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      util: require.resolve("util/"),
      zlib: require.resolve("browserify-zlib"),
      stream: require.resolve("stream-browserify"),
      url: require.resolve("url/"),
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
    };
    
    // Ensure config.plugins exists
    config.plugins = config.plugins || [];
    
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      })
    );

    console.log("Webpack configuration override completed successfully");
    return config;
  } catch (error) {
    console.error("Error in webpack configuration override:", error);
    throw error;
  }
};