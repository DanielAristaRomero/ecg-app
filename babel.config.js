module.exports = function (api) {
  return {
    plugins: ["macros"],
    presets: [
      ["@babel/preset-env", { targets: { node: "current" } }],
      "@babel/preset-typescript",
    ],
  };
};
