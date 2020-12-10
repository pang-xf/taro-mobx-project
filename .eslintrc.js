module.exports = {
  'extends': ['taro/react'],
  "settings": {
    "react": {
      "version": "16.10.0"
    },
    "import/ignore": [
      "node_modules",
      'webpack.config.js'
    ]
  },
  "rules": {
    "import/no-commonjs": 0,
    "import/first": 1,
  }
}
