module.exports = {
  presets: ['module:@react-native/babel-preset'],
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
          '@comp': './src/component',
          '@ccomp': './src/component/common',
          '@screen': './src/screen',
          '@const': './src/constant',
          '@context': './src/context',
          '@app': './src/common/app',
          '@api': './src/common/api',
          '@storage': './src/common/storage',
          '@image': './src/@assets/image',
        },
      },
    ],
  ],
};
