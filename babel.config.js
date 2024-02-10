module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
<<<<<<< HEAD
  };
};
=======
    plugins: [['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true
    }]]
  };
};
>>>>>>> 06dbe9169d2a3c1f004337136d3525fa1202e8f6
