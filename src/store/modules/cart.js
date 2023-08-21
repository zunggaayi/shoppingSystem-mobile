import { changeCount, delSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

export default {
  namespaced: true,
  state() {
    return {
      cartList: [],
      cartTotal: 0
    }
  },
  mutations: {
    setCartList(state, newList) {
      state.cartList = newList
    },
    setCartTotal(state, newVal) {
      state.cartTotal = newVal
    },
    toggleCheck(state, goodsId) {
      const goods = state.cartList.find((item) => item.goods_id === goodsId)
      goods.checked = !goods.checked
    },
    allCheck(state, flag) {
      state.cartList.forEach((item) => (item.checked = flag))
    },
    changeCount(state, { goodsId, goodsNum }) {
      const goods = state.cartList.find((item) => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    async getCartAction(context) {
      const { data } = await getCartList()
      // console.log(data)
      data.list.forEach((item) => {
        item.checked = true
      })
      context.commit('setCartList', data.list)
      context.commit('setCartTotal', data.cartTotal)
    },
    async changeCountAction(context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      context.commit('changeCount', { goodsId, goodsNum })
      await changeCount(goodsId, goodsNum, goodsSkuId)
    },
    async delAction(context) {
      const selectList = context.getters.selCartList
      const selIds = selectList.map((item) => item.id)
      // console.log(selIds)
      await delSelect(selIds)
      context.dispatch('getCartAction')
      Toast('删除成功')
    }
  },
  getters: {
    selCartList(state) {
      return state.cartList.filter((item) => item.checked)
    },
    totalPrice(state) {
      return state.cartList.reduce(
        (prev, current) =>
          current.checked
            ? prev + current.goods_num * current.goods.goods_price_min
            : prev + 0,
        0
      )
    },
    checkedCartTotal(state) {
      return state.cartList.reduce(
        (prev, current) =>
          current.checked ? prev + current.goods_num : prev + 0,
        0
      )
    },
    isAllCheck(state) {
      return state.cartList.every((item) => item.checked)
    },
    cartTotal(state) {
      return state.cartList.reduce(
        (prev, current) => prev + current.goods_num,
        0
      )
    }
  }
}
