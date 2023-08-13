module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.png$": "jest-transform-stub",
  },
  testMatch: ["<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  moduleDirectories: ["<rootDir>", "src", "node_modules"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node"],
  modulePathIgnorePatterns: ["<rootDir>/.coverage/"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!**/node_modules/**"],
  coverageDirectory: "<rootDir>/.coverage",
  coverageReporters: ["text", "text-summary", "lcov"],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 10,
      lines: 10,
      statements: 10,
    },
  },
  haste: {
    forceNodeFilesystemAPI: true,
  },
};
