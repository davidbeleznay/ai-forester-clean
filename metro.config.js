// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

// Get the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Extend the default configuration
const config = {
  ...defaultConfig,
  
  // Configure resolver for better module resolution
  resolver: {
    ...defaultConfig.resolver,
    // Enable resetCache to ensure we don't have stale cache issues
    resetCache: true,
    
    // Exclude any problematic files or directories if needed
    // blacklistRE: [],
    
    // Ensure proper handling of assets
    assetExts: [...defaultConfig.resolver.assetExts],
    
    // Ensure proper handling of source files
    sourceExts: [...defaultConfig.resolver.sourceExts],
  },
  
  // Configure transformer for better performance
  transformer: {
    ...defaultConfig.transformer,
    // Enable hermes transform to improve performance
    hermes: {
      enabled: true,
    },
  },
};

module.exports = config;
