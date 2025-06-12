module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      
      // Outros plugins, como react-native-reanimated/plugin, aqui se precisar
    ],
  };
};
