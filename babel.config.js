module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
          alias: {
            "@": "./src",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@hooks": "./src/hooks",
            "@types": "./src/types",
            "@utils": "./src/utils",
            "@services": "./src/services",
            "@navigation": "./src/navigation",
            "@constants": "./src/constants",
          },
        },
      ],
      // ❌ QUITAR ESTA LÍNEA: "react-native-reanimated/plugin"
    ],
  };
};
