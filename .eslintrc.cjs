/* eslint-disable no-undef */
module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true
  },
  ignorePatterns: [
    "node_modules/",
    "dist/",
    ".next/",
    "apps/web/public/*.js",
    "apps/desktop/src-tauri/target/release/build",
    ".tsbuildinfo",
    "NOTICE",
    "AUTHORS.md",
    "README.md",
    "TODO.md"
  ],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["import", "unused-imports", "@stylistic"],
  rules: {
    "no-var": "error",
    "no-console": "warn",
    "no-else-return": [
      "error",
      {
        allowElseIf: false
      }
    ],
    "no-duplicate-imports": "error",
    "max-depth": ["error", 3],

    // Import rules
    "unused-imports/no-unused-imports": "warn",
    "import/no-deprecated": "warn",
    "import/no-duplicates": "error",
    "import/no-relative-packages": "error",
    "import/newline-after-import": ["error"],
    "import/no-internal-modules": [
      "warn",
      {
        allow: [
          "tailwindcss/*",
          "@tailwindcss/**",
          "mdx/*",
          "next/**",
          "react-*/**",
          "@mav/**",
          "**/assets/*"
        ]
      }
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports"
      }
    ],
    "@stylistic/function-call-spacing": ["error", "never"],
    "@stylistic/space-before-blocks": "error",
    "@stylistic/keyword-spacing": [
      "error",
      {
        before: true
      }
    ],
    "@stylistic/newline-per-chained-call": [
      "error",
      {
        ignoreChainWithDepth: 3
      }
    ],
    "@stylistic/no-confusing-arrow": [
      "error",
      {
        onlyOneSimpleParam: true
      }
    ],
    "@stylistic/no-floating-decimal": "error",
    "@stylistic/wrap-regex": "error",
    "@stylistic/new-parens": ["error", "always"],
    "@stylistic/arrow-spacing": "error",
    "@stylistic/arrow-parens": ["error", "always"],
    "@stylistic/array-element-newline": ["error", "consistent"],
    "@stylistic/object-curly-spacing": ["error", "always"],
    "@stylistic/object-curly-newline": [
      "error",
      {
        minProperties: 6,
        consistent: true
      }
    ],
    "@stylistic/padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: "directive",
        next: "*"
      },
      {
        blankLine: "always",
        prev: ["multiline-const", "function"],
        next: ["const", "let", "block-like", "export", "return", "try"]
      },
      {
        blankLine: "always",
        prev: "block-like",
        next: "*"
      },
      {
        blankLine: "always",
        prev: "*",
        next: "try"
      }
    ]
  },
  settings: {
    next: {
      rootDir: ["apps/web/"]
    }
  },
  overrides: [
    {
      files: ["apps/web/**"],
      extends: ["next/core-web-vitals"]
    },
    {
      files: ["apps/**/*.tsx", "packages/**/*.tsx"],
      rules: {
        "react/iframe-missing-sandbox": "warn",
        "react/no-deprecated": "warn",
        "react/jsx-no-script-url": "error",
        "react/no-unescaped-entities": "off"
      }
    },
    {
      files: ["apps/web/src/app/**", "apps/web/src/components/**"],
      rules: {
        "@next/next/no-img-element": "off"
        // "react/forbid-elements": [
        //   "error",
        //   {
        //     forbid: [
        //       {
        //         element: "img",
        //         message: "use <MFImage> as a better alternative",
        //       },
        //     ],
        //   },
        // ],
      }
    },
    {
      files: ["packages/ui/*.tsx"],
      rules: {
        "import/no-internal-modules": "off"
      }
    }
  ]
}
