/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// This isn't relevant in .js files.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const {getDefaultConfig} = require('metro-config');

// This isn't relevant in .js files.
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
