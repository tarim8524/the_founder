var webpackConfig = require('./webpack.config.js');
webpackConfig.entry = undefined;
webpackConfig.mode = 'development';
webpackConfig.devtool = 'inline-source-map';
webpackConfig.performance = {
  hints: false
};

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    reporters: ['dots'],
    autoWatch: false,
    singleRun: true,
    browsers: ['Chrome'],
    //browsers: ['Chrome', 'Firefox'],
    files: ['tests.bundle.js'],
    preprocessors: {
      'tests.bundle.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 60000, // 60 seconds
  });
}
