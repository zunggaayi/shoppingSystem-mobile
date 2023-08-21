<template>
  <div class="list">
    <navbar>
      <template #text>商品列表</template>
    </navbar>
    <div class="search">
      <van-search
        show-action
        :value="quarySearch || '搜索商品'"
        placeholder="请输入您要搜索的商品"
        clearable
        shape="round"
        @click="$router.push('/search')"
      >
        <template #action>
          <van-icon name="apps-o" size="30" />
        </template>
      </van-search>
    </div>
    <ul class="sort-list">
      <li><a href="#">综合</a></li>
      <li><a href="#">销量</a></li>
      <li><a href="#">价格</a></li>
    </ul>
    <GoodsItem
      v-for="item in proList"
      :key="item.goods_id"
      :item="item"
    ></GoodsItem>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import GoodsItem from '@/components/GoodsItem.vue'
import { getProlist } from '@/api/product'

export default {
  name: 'ListIndex',
  components: {
    navbar,
    GoodsItem
  },
  data() {
    return {
      page: 1,
      proList: []
    }
  },
  computed: {
    quarySearch() {
      // 获取地址拦关键字
      return this.$route.query.search
    }
  },
  async created() {
    const {
      data: { list }
    } = await getProlist({
      goodsName: this.quarySearch,
      page: this.page
    })
    this.proList = list.data
    // console.log(this.proList)
  }
}
</script>

<style lang='less' scoped>
.search {
  position: relative;
  .van-icon {
    position: absolute;
    top: 12px;
    right: 20px;
  }
  .van-search {
    width: 90%;
  }
}
.sort-list {
  li {
    display: inline-block;
    width: 33.3%;
    padding: 5px 10px;
    text-align: center;
  }
  a {
    color: black;
  }
}
</style>
