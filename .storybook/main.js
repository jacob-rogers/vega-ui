const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    'storybook-addon-performance',
    'storybook-addon-themes',
    '@storybook/addon-a11y',
  ],
  presets: [],
  webpackFinal: async (config) => {
    // eslint-disable-next-line no-param-reassign
    config.module.rules = config.module.rules.filter((f) => f.test.toString() !== '/\\.css$/');

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      enforce: 'pre',
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
        {
          loader: require.resolve('babel-loader'),
          options: {
            babelrc: false,
            presets: [
              require.resolve('@babel/preset-react'),
              require.resolve('@babel/preset-env'),
              require.resolve('@emotion/babel-preset-css-prop'),
            ],
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'postcss-loader',
        },
      ],
    });
    // eslint-disable-next-line no-param-reassign
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: 'tsconfig.storybook.json',
      }),
    ];

    // eslint-disable-next-line no-param-reassign
    config.devServer = {
      stats: {
        warningsFilter: /export .* was not found in/,
        ...(config.devServer && config.devServer.stats),
      },
    };

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './fonts'),
            to: 'static/fonts',
          },
        ],
      }),
    );

    config.module.rules.push({
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: [
        {
          loader: 'file-loader',
          query: {
            name: '[name].[ext]',
          },
        },
      ],
      include: path.resolve(__dirname, './fonts/SegoeUI'),
    });

    config.resolve.extensions.push('.ts', '.tsx', '.json');

    return config;
  },
};
