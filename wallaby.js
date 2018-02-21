module.exports = function(wallaby) {
  return {
    files: ['features/**/*.js', '!**/*.spec.js'],
    tests: ['features/**/*.spec.js'],
    env: {
      type: 'node',
      runner: 'node',
      params: {
        env: `NODE_PATH=src`,
      },
    },
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        presets: ['latest', 'react'],
        plugins: ['transform-object-rest-spread', 'transform-class-properties'],
      }),
    },
    testFramework: 'jest',
    reportConsoleErrorAsError: true,
  };
};
