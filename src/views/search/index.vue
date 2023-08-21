<template>
  <div class="search">
    <navbar>
      <template #text>商品搜索</template>
    </navbar>
    <van-search
      show-action
      placeholder="请输入您要搜索的商品"
      clearable
      v-model="search"
      autofocus
    >
      <template #action>
        <div @click="goSearch(search)" class="search-btn">搜索</div>
      </template>
    </van-search>
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>搜索历史</span>
        <van-icon name="delete-o" @click="clearHistory" size="20" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" @click="goSearch(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import { getHistory, setHistory } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  data() {
    return {
      search: '',
      history: getHistory()
    }
  },
  methods: {
    goSearch(key) {
      if (key === '') {
        return
      }
      const index = this.history.indexOf(key)
      if (index !== -1) {
        this.history.splice(index, 1)
        this.history.unshift(key)
      } else this.history.unshift(key)
      setHistory(this.history)
      // this.search = ''
      this.$router.push(`/searchlist?search=${key}`)
    },
    clearHistory() {
      this.history = []
      setHistory(this.history)
    }
  },
  components: {
    navbar
  }
}
</script>

<style lang='less' scoped>
.search {
  .search-btn {
    background-color: #e63f3f;
    color: #fff;
    padding: 0 10px;
    border-radius: 10px;
  }
  .search-history {
    .title {
      width: 100%;
      height: 40px;
      line-height: 40px;
      position: relative;
      span {
        float: left;
        margin-left: 10px;
        color: #555;
        font-size: 16px;
      }
      .van-icon {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
    .list {
      margin: 10px 10px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 10px;
      gap: 5%;
      div {
        text-align: center;
        padding: 7px 15px;
        line-height: 15px;
        border-radius: 50px;
        background: #f9f9f9;
        font-size: 15px;
        border: 1px solid #efefef;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
