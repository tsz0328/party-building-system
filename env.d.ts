/// <reference types="vite/client" />
/// <reference types="vue" />

// 图片/静态资源模块声明，允许直接 import 图片文件
declare module '*.png' {
  const src: string
  export default src
}
declare module '*.jpg' {
  const src: string
  export default src
}
declare module '*.jpeg' {
  const src: string
  export default src
}
declare module '*.gif' {
  const src: string
  export default src
}
declare module '*.svg' {
  const src: string
  export default src
}
