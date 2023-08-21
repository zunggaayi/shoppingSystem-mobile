export default {
  // 此处编写的是Vue组件实例的配置项，通过一定语法，可以直接混入到其他组件内部
  // 可以混入的东西包括 data,methods,created,computed等所有组件内可以使用的
  // 注意：如果混入的与组件内存在同名的data和methods，那么组件内的优先级更高
  // 如果是生命周期函数，则Vue会整合到一个数组中，统一管理执行
  methods: {
    loginConfirm() {
      if (!this.$store.getters.getToken) {
        // console.log(11)
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '要先登录才可以继续噢~',
            confirmButtonText: '去登录Go',
            cancelButtonText: '再逛逛@v@'
          })
          .then(() => {
            // 登录完，可以回到之前的页面->携带参数，之前的路径地址
            // this.$route.fullPath  带参数的完整路径
            // 但是用push会保留历史记录，即返回上一页会回到登录页，用户体验不好
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return true
      }
      return false
    }
  }
}
