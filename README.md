# Tailwind CSS Assistant

Get assistance when developing projects with Tailwind CSS 🤖

![Tailwind CSS Assistant Example](https://user-images.githubusercontent.com/50486078/180596703-753d28ad-d404-4805-8800-c2cbdb78f1c0.gif)

✅ Small JavaScript package that helps you work with Tailwind CSS by...

- Showing you the class names of the current element
- Showing you the current breakpoint
- Allowing you to toggle breakpoint classes
- Allowing you to add new classes, including classes created using JIT

## Install

#### This is converted HTML project to WordPress Plugins. 

Download it in your WordPress installation and activate it same as any other plugin. 

This will work on frontend of the website only.

### CDN

```html
<script
  defer
  src="https://unpkg.com/tailwindcss-assistant@latest/dist/assistant.min.js"
></script>
```

### NPM/Yarn

```shell
npm i -D tailwindcss-assistant

yarn add -D tailwindcss-assistant
```

```js
import assistant from 'tailwindcss-assistant'

document.addEventListener('DOMContentLoaded', () => {
  assistant()
})
```

### Stats

![](https://img.shields.io/bundlephobia/min/tailwindcss-assistant)
![](https://img.shields.io/npm/v/tailwindcss-assistant)
![](https://img.shields.io/npm/dt/tailwindcss-assistant)
![](https://img.shields.io/github/license/markmead/tailwindcss-assistant)
