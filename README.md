### 1. Tạo project với Vit
```bash
yarn add tailwindcss postcss autoprefixer -D
```
### 2. Generate file `tailwind.config.js`
```bash
npx tailwindcss init -p
```
### 3.Edit file `tailwind.config.js`
```ts
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
### 4. Edit file `index.css`
```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```