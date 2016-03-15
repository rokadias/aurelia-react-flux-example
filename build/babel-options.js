module.exports = {
  moduleIds: false,
  comments: false,
  compact: false,
  presets: ['react', 'stage-2'],
  plugins: [
    'transform-es2015-modules-systemjs',
    'transform-decorators-legacy',
    'transform-class-properties'
  ]
};
