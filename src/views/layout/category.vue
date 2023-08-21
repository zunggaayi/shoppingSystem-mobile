<template>
  <div class="category">
    <van-nav-bar title="全部分类" fixed />
    <van-search
      shape="round"
      background="linear-gradient(to right, #996884, #2c3f62, #2d5353)"
      placeholder="请输入搜索关键词"
      @click="$router.push('/search')"
    />
    <div class="list-box">
      <div class="left">
        <ul>
          <li v-for="(item, index) in navList" :key="item.category_id">
            <a
              :class="{ active: index === activeKey }"
              @click="activeKey = index"
              href="javascript:;"
              >{{ item.name }}</a
            >
          </li>
        </ul>
      </div>
      <div class="right">
        <div
          @click="$router.push(`/searchlist?categoryId=${item.category_id}`)"
          v-for="item in navList[activeKey]?.children"
          :key="item.category_id"
          class="cate-goods"
        >
          <img :src="item.image?.external_url" alt="" />
          <p>{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategoryData } from '@/api/category'
export default {
  name: 'CategoryIndex',
  data() {
    return {
      activeKey: 0,
      navList: []
    }
  },
  async created() {
    const {
      data: { list }
    } = await getCategoryData()
    // console.log(res)
    // console.log(list)
    this.navList = list
  }
}
</script>

<style lang='less' scoped>
.van-nav-bar {
  z-index: 999;
  background: linear-gradient(to right, #996884, #2c3f62, #2d5353);
  ::v-deep .van-nav-bar__title {
    color: #ffffff;
  }
}

.van-search {
  position: fixed;
  width: 100%;
  top: 45px;
  z-index: 999;
}

.category {
  padding-top: 100px;
  padding-bottom: 50px;
  height: 100vh;
  .list-box {
    height: 100%;
    display: flex;
    .left {
      width: 95px;
      height: 100%;
      background-color: #f3f3f3;
      overflow: auto;
      a {
        display: block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #444444;
        font-size: 14px;
        &.active {
          color: #fb442f;
          background-color: #fff;
        }
      }
    }
    .right {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      padding: 10px 0;
      overflow: auto;

      .cate-goods {
        width: 33.3%;
        margin-bottom: 10px;
        img {
          width: 70px;
          height: 70px;
          display: block;
          margin: 5px auto;
        }
        p {
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
