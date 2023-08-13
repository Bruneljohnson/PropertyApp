const { createConfig } = require("eslint-config-galex/dist/createConfig");
const { getDependencies } = require("eslint-config-galex/dist/getDependencies");

const { createReactOverride } = require("eslint-config-galex/dist/overrides/react");

const { createTypeScriptOverride } = require("eslint-config-galex/dist/overrides/typescript");

const { createJestOverride } = require("eslint-config-galex/dist/overrides/jest");

const { join } = require("path");

const cwdOverrides = {
  tsConfigPath: join(__dirname, "tsconfig.json"),
  cwd: __dirname,
};

const dependencies = getDependencies(cwdOverrides);

module.exports = createConfig({
  ...cwdOverrides,
  overrides: [
    createReactOverride({
      ...dependencies,
      rules: {
        "import/no-default-export": "off",
        "no-console": "off",
        "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
        "react/function-component-definition": "off",
        "react/jsx-no-useless-fragment": "off",
        "react/no-array-index-key": "off",
        "sonarjs/no-duplicate-string": "off",
        "unicorn/prefer-spread": "off",
      },
    }),
    createTypeScriptOverride({
      ...dependencies,
      rules: {
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/restrict-template-expressions": "off",
        "@typescript-eslint/no-require-imports": "off",
      },
      parserOptions: {
        project: cwdOverrides.tsConfigPath,
      },
    }),
    createJestOverride({
      ...dependencies,
      rules: {
        "testing-library/prefer-user-event": "off",
        "jest/unbound-method": "off",
        "jest/no-untyped-mock-factory": "off",
      },
    }),
  ],
});
