module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-var-requires': 0,//error: Require statement not part of import statement 提交报错解决方案
    "@typescript-eslint/explicit-module-boundary-types": "off",//Missing return type on function
  },
  //'__WebpackModuleApi' is not defined提交保存解决方案
  "globals":{  //与上方的rules是同级的
    "__WebpackModuleApi": true,
    "RecordID": true,
    "RecordI": true
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
