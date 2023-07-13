### 1. Tạo project với Vite
```bash
yarn create vite name --template react-swc-ts
```
### 2. Tạo file `.prettierrc` trong thư mục `src`
```json
{
    "arrowParens": "always",
    "semi": false,
    "trailingComma": "none",
    "tabWidth": 2,
    "endOfLine": "auto",
    "useTabs": false,
    "singleQuote": true,
    "printWidth": 120,
    "jsxSingleQuote": true
}
```
### 3. Tạo file `.prettierignore` trong thư mục `src`
```json
node_modules/
dist/
```
### 4. Edit rule file `.eslintrc.cjs` trong thư mục `src`
```ts
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/prop-types': 0,
    'react/display-name': 0,

    'no-console': 1,
    'no-lonely-if': 1,
    'no-unused-vars': 1,
    'no-trailing-spaces': 1,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['error', 'always'],
    'object-curly-spacing': [1, 'always'],
    'indent': ['warn', 2],
    'semi': [1, 'never'],
    'quotes': ['error', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1
  }
```
### 5. Tạo file `.eslintignore` trong thư mục `src`
```json
node_modules/
dist/
```
### 6. Add package `prettier` format code.
```bash
yarn add prettier -D
```
### 7. Thêm script file `package.json`
```json
"lint:fix": "eslint --fix --ext ts,tsx src/",
"prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
"prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
```