module.exports = (config) => {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['jasmine'],
    files: [
      'specs/**/*.spec.js',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'specs/**/*.js': ['webpack'],
    },
    reporters: ['kjhtml'],
  });
};
