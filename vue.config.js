const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@": require("path").resolve(__dirname, "src"),
      "@services": path.resolve(__dirname, "src/services"),
    },
  },
};
