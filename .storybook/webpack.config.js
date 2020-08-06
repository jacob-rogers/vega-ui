/* eslint-disable no-param-reassign */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = ({ config }) => {
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

  config.resolve.plugins = [
    new TsconfigPathsPlugin({
      configFile: 'tsconfig.storybook.json',
    }),
  ];

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

  config.devServer = { stats: { warningsFilter: /export .* was not found in/ } };

  config.resolve.extensions.push('.ts', '.tsx', '.json');

  return config;
};
