/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const {
  resolver: {sourceExts, assetExts},
} = getDefaultConfig(__dirname);

module.exports = mergeConfig(getDefaultConfig(__dirname), {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
});
