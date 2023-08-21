<template>
  <div class="navbar">
    <span class="left" @click="goBack"></span>
    <span class="text"> <slot name="text">登录</slot> </span>
    <span class="right"> <slot name="right"></slot></span>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    goBack() {
      this.$router.go(-1) // 返回上一页
    }
  }
}
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  height: 50px;
  padding: 10px;
  line-height: 30px;
  background-color: #fff;
  z-index: 999;
  // position: absolute;
  // top: 0;
  .left {
    width: 30px;
    height: 30px;
    background: url('../assets/左箭头.png') center/60% no-repeat;
    float: left;
  }
  .text {
    font-size: 17px;
    color: #333;
    position: relative;
    left: 33%;
  }
  .right {
    font-size: 17px;
    float: right;
    color: #333;
  }
}
</style>
