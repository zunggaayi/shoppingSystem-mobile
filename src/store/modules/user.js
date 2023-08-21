import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state() {
    return {
      // 个人标识
      userInfo: getInfo()
    }
  },
  mutations: {
    // 给仓库存储用户标识
    setUserInfo(state, obj) {
      // 存入仓库
      state.userInfo = obj
      // 存入本地
      setInfo(obj)
    }
  },
  actions: {
    logout(context) {
      // 重置个人信息
      context.commit('setUserInfo', {})
      // 清空购物车,由于要访问其他模块的mutations需要在根目录下（全局）查找，如果没有{root:true}默认是局部的
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {}
}
