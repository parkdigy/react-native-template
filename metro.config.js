const {getDefaultConfig} = require('expo/metro-config');
const {mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
const {assetExts, sourceExts} = defaultConfig.resolver;

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
  },
  resolver: {
    assetExts: assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

config.resolver.resolveRequest = function packageExportsResolver(context, moduleImport, platform) {
  // Use the browser version of the package for React Native
  if (moduleImport === 'axios' || moduleImport.startsWith('axios/')) {
    return context.resolveRequest(
      {
        ...context,
        unstable_conditionNames: ['browser'],
      },
      moduleImport,
      platform,
    );
  }

  // Fall back to normal resolution
  return context.resolveRequest(context, moduleImport, platform);
};

module.exports = mergeConfig(defaultConfig, config);
