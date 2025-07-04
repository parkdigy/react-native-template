module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'babel-plugin-styled-components',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.ts', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
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
