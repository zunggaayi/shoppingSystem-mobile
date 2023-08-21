<template>
  <div class="home">
    <van-nav-bar title="zunggaayi的小屋" fixed />
    <van-search
      shape="round"
      background="linear-gradient(to right, #996884, #2c3f62, #2d5353)"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bannerList" :key="item.imgUrl"
        ><img v-lazy="item.imgUrl"
      /></van-swipe-item>
    </van-swipe>
    <van-grid column-num="5" icon-size="40">
      <van-grid-item
        v-for="item in navList"
        :key="item.imgUrl"
        :icon="item.imgUrl"
        :text="item.text"
        @click="$router.push('/category')"
      />
    </van-grid>
    <div class="main">
      <img src="@/assets/main.png" alt="" />
    </div>
    <div class="guess">
      <p class="guess-title">—— 猜你喜欢 ——</p>

      <div class="goods-list">
        <GoodsItem
          v-for="item in proList"
          :key="item.goods_id"
          :item="item"
        ></GoodsItem>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/GoodsItem.vue'
import { getHomeData } from '@/api/home'
export default {
  name: 'HomeIndex',
  components: {
    GoodsItem
  },
  data() {
    return {
      bannerList: [],
      navList: [],
      proList: []
    }
  },
  async created() {
    const {
      data: { pageData }
    } = await getHomeData()
    // console.log(res)
    this.bannerList = pageData.items[1].data
    this.navList = pageData.items[3].data
    this.proList = pageData.items[6].data
  }
}
</script>

<style lang="less" scoped>
// 主题 padding
.home {
  padding-top: 100px;
  padding-bottom: 50px;
}

// 导航条样式定制
.van-nav-bar {
  z-index: 999;
  background: linear-gradient(to right, #996884, #2c3f62, #2d5353);
  ::v-deep .van-nav-bar__title {
    color: #ffffff;
  }
}

// 搜索框样式定制
.van-search {
  position: fixed;
  width: 100%;
  top: 45px;
  z-index: 999;
}

// 分类导航部分
.my-swipe .van-swipe-item {
  height: 185px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe .van-swipe-item img {
  width: 100%;
  height: 185px;
}

// 主会场
.main img {
  display: block;
  width: 100%;
}

.guess .guess-title {
  height: 40px;
  line-height: 40px;
  text-align: center;
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
}
</style>
