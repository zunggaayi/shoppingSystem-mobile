module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw适配的标准平的宽度：iphone X
      // 设计图750=>适配375
      // 设计图640=>适配320
      viewportWidth: 375
    }
  }
}
