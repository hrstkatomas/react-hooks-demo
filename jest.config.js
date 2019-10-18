module.exports = {
  "roots": [
    "<rootDir>/src/app/test"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "setupFiles": [
    "<rootDir>src/app/test/jest/init.js"
  ],
}