module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            src: './src',
            components: './src/components',
            navigations: './src/navigations',
            screens: './src/screens',
            themes: './src/themes',
            '@components': './src/components',
          },
        },
      ],
    ],
  };
};
