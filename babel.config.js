module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset', ['@babel/preset-react', {runtime: 'automatic'}]],
    plugins: [
      [
        'babel-plugin-react-compiler',
        {
          panicThreshold: 'all_errors',
          logger: {
            logEvent(filename, event) {
              switch (event.kind) {
                case 'CompileSuccess': {
                  // console.log(`✅ Compiled: ${filename}`);
                  break;
                }
                case 'CompileError': {
                  console.log(`❌ Skipped: ${filename}`);
                  break;
                }
              }
            },
          },
        },
      ],
      'babel-plugin-styled-components',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.ts', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@types': './src/@types',
            '@style': './src/@style',
            '@theme': './src/theme',
            '@comp': './src/component',
            '@ccomp': './src/component/common',
            '@screen': './src/screen',
            '@const': './src/constant',
            '@context': './src/context',
            '@app': './src/common/app',
            '@api': './src/common/api',
            '@storage': './src/common/storage',
            '@util': './src/common/util',
            '@asset-image': './src/@assets/image',
          },
        },
      ],
    ],
  };
};
