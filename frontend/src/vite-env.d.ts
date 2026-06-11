// src/vite-env.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

// 如果使用SCSS，还需要添加：
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
