module.exports = {
  // eslint-disable-next-line global-require
  ...require('@gpn-prototypes/frontend-configs/babel.config'),
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
};
