const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    'storybook-addon-performance',
    'storybook-addon-themes',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  presets: [],
  webpackFinal: async (config) => {
    const webpackConfig = { ...config };

    webpackConfig.devServer = {
      stats: {
        warningsFilter: /export .* was not found in/,
        ...(config.devServer && config.devServer.stats),
      },
    };

    webpackConfig.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './fonts'),
            to: 'static/fonts',
          },
        ],
      }),
    );

    return webpackConfig;
  },
};
