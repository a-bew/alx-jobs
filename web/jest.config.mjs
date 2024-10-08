export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  "moduleNameMapper": {
    "\\.(scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": 'identity-obj-proxy',
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
  },
  "modulePaths": [
    "<rootDir>/src"
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

