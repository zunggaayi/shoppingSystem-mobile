<template>
  <div class="cart">
    <van-nav-bar title="购物车" fixed />

    <div>
      <!-- 购物车开头 -->
      <div class="cart-title">
        <span class="all"
          >共<i>{{ cartTotal }}</i
          >件商品</span
        >
        <span class="edit" @click="isEdit = !isEdit">
          <van-icon name="edit" />
          {{ editText }}
        </span>
      </div>

      <!-- 购物车列表 -->
      <div class="cart-list">
        <div class="cart-item" v-for="item in cartList" :key="item.goods_id">
          <!-- 因为checked是仓库里面的值，不能用v-model双向绑定，任何组件不能直接修改仓库 -->
          <van-checkbox
            :value="item.checked"
            @click="toggleCheck(item.goods_id)"
          ></van-checkbox>
          <div class="show">
            <img :src="item.goods.goods_image" alt="" />
          </div>
          <div class="info">
            <span class="tit text-ellipsis-2">
              {{ item.goods.goods_name }}
            </span>
            <span class="bottom">
              <div class="price">
                ¥ <span>{{ item.goods.goods_price_min }}</span>
              </div>
              <!-- 既希望保留原本的input形参，又需要通过调用函数传参 => 箭头函数包装一层 -->
              <countbox
                :value="item.goods_num"
                @input="
                  (value) =>
                    changeCount(value, item.goods_id, item.goods_sku_id)
                "
              ></countbox>
            </span>
          </div>
        </div>
      </div>

      <div class="footer-fixed">
        <div class="all-check">
          <van-checkbox
            icon-size="18"
            :value="isAllCheck"
            @click="allCheck"
          ></van-checkbox>
          全选
        </div>

        <div class="all-total">
          <div class="price" v-show="!isEdit">
            <span>合计：</span>
            <span
              >¥ <i class="totalPrice">{{ totalPrice }}</i></span
            >
          </div>
          <div class="goPay" @click="goPay" v-show="!isEdit">
            结算({{ checkedCartTotal }})
          </div>
          <div class="delete" v-show="isEdit" @click="handleDel">
            删除({{ checkedCartTotal }})
          </div>
        </div>
      </div>
    </div>

    <div class="empty-cart" v-if="cartTotal === 0">
      <img src="@/assets/empty.png" alt="" />
      <div class="tips">您的购物车是空的, 快去逛逛吧</div>
      <div class="btn" @click="$router.push('/')">去逛逛</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import countbox from '@/components/CountBox.vue'
export default {
  name: 'cartIndex',
  data() {
    return {
      isEdit: false,
      editText: '编辑'
    }
  },
  components: {
    countbox
  },
  computed: {
    isLogin() {
      return this.$store.getters.getToken
    },
    ...mapState('cart', ['cartList']),
    ...mapGetters('cart', [
      'totalPrice',
      'checkedCartTotal',
      'isAllCheck',
      'cartTotal',
      'selCartList'
    ])
  },
  created() {
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  methods: {
    goPay() {
      if (this.checkedCartTotal === 0) {
        this.$toast('您还没有选择宝贝噢~')
        return 0
      }
      // console.log('结算页面')
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cardIds: this.selCartList.map((item) => item.id).join(',')
        }
      })
    },
    toggleCheck(goodsId) {
      this.$store.commit('cart/toggleCheck', goodsId)
    },
    allCheck() {
      this.$store.commit('cart/allCheck', !this.isAllCheck)
    },
    changeCount(goodsNum, goodsId, goodsSkuId) {
      // console.log(goodsNum, goodsId, goodsSkuId)
      this.$store.dispatch('cart/changeCountAction', {
        goodsNum,
        goodsId,
        goodsSkuId
      })
    },
    async handleDel() {
      if (this.checkedCartTotal === 0) {
        return 0
      }
      await this.$store.dispatch('cart/delAction')
      this.isEdit = false
      this.editText = '编辑'
    }
  },
  watch: {
    isEdit(value) {
      if (value) {
        this.editText = '退出编辑'
        this.$store.commit('cart/allCheck', false)
      } else {
        this.editText = '编辑'
        this.$store.commit('cart/allCheck', true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.cart {
  padding-top: 46px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  min-height: 100vh;
  .cart-title {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    .all {
      i {
        font-style: normal;
        margin: 0 2px;
        color: #fa2209;
        font-size: 16px;
      }
    }
    .edit {
      .van-icon {
        font-size: 18px;
      }
    }
  }

  .cart-item {
    margin: 0 10px 10px 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 5px;

    .show img {
      width: 100px;
      height: 100px;
    }
    .info {
      width: 210px;
      padding: 10px 5px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .bottom {
        display: flex;
        justify-content: space-between;
        .price {
          display: flex;
          align-items: flex-end;
          color: #fa2209;
          font-size: 12px;
          span {
            font-size: 16px;
          }
        }
        .count-box {
          display: flex;
          width: 110px;
          .add,
          .minus {
            width: 30px;
            height: 30px;
            outline: none;
            border: none;
          }
          .inp {
            width: 40px;
            height: 30px;
            outline: none;
            border: none;
            background-color: #efefef;
            text-align: center;
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.footer-fixed {
  position: fixed;
  left: 0;
  bottom: 50px;
  height: 50px;
  width: 100%;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  .all-check {
    display: flex;
    align-items: center;
    .van-checkbox {
      margin-right: 5px;
    }
  }

  .all-total {
    display: flex;
    line-height: 36px;
    .price {
      font-size: 14px;
      margin-right: 10px;
      .totalPrice {
        color: #fa2209;
        font-size: 18px;
        font-style: normal;
      }
    }

    .goPay,
    .delete {
      min-width: 100px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      background-color: #fa2f21;
      color: #fff;
      border-radius: 18px;
      &.disabled {
        background-color: #ff9779;
      }
    }
  }
}

.empty-cart {
  padding: 80px 30px;
  img {
    width: 140px;
    height: 92px;
    display: block;
    margin: 0 auto;
  }
  .tips {
    text-align: center;
    color: #666;
    margin: 30px;
  }
  .btn {
    width: 110px;
    height: 32px;
    line-height: 32px;
    text-align: center;
    background-color: #fa2c20;
    border-radius: 16px;
    color: #fff;
    display: block;
    margin: 0 auto;
  }
}
</style>
