const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración para reducir drásticamente los archivos vigilados
config.watchFolders = [__dirname];
config.resolver.sourceExts = ['jsx', 'js', 'ts', 'tsx', 'json'];
config.resolver.assetExts = ['png', 'jpg'];

// Ignorar directorios innecesarios
config.watchman = {
  ignore_dirs: [
    '.git',
    'node_modules/@babel',
    'node_modules/@expo',
    'node_modules/@react-native',
    'node_modules/metro',
    'node_modules/react-native',
  ],
};

module.exports = config;
