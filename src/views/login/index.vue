<template>
  <div class="login">
    <!-- 头部 vant-NavBar-->
    <navbar>
      <template #text>会员登录</template>
    </navbar>
    <!-- 主体 -->
    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后自动注册</p>
      </div>
      <div class="form">
        <div class="form-item">
          <input
            class="inp"
            maxlength="11"
            placeholder="请输入手机号码"
            type="text"
            v-model="phoneNum"
          />
        </div>
        <div class="form-item">
          <input
            class="inp"
            maxlength="5"
            placeholder="请输入图形验证码"
            type="text"
            v-model="picCode"
          />
          <img :src="picUrl" alt="" @click="getPicCode" />
        </div>
        <div class="form-item">
          <input
            v-model="msgCode"
            class="inp"
            placeholder="请输入短信验证码"
            type="text"
          />
          <button
            @click="getCode"
            ref="btn"
            :style="{ color: flag ? '#aaa' : '#ffae52' }"
          >
            {{
              second === totalSecond ? '获取验证码' : second + '秒后重新发送'
            }}
          </button>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
import { Toast } from 'vant'

const RegTel = /^(\+86|0086)?\s*1[3-9]\d{9}$/
const RegCode = /^\w{4}$/
export default {
  name: 'LoginIndex',
  data() {
    return {
      picCode: '', // 短信验证码
      picKey: '', // 验证码key
      picUrl: '', // 验证码url
      timer: null, // 计时器id
      totalSecond: 61,
      second: 61,
      flag: false, // 控制样式
      phoneNum: null, // 手机号
      msgCode: ''
    }
  },
  components: {
    navbar
  },
  created() {
    this.getPicCode()
  },
  methods: {
    // 校验
    validFn() {
      // 不满足ret false
      if (!RegTel.test(this.phoneNum)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!RegCode.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 获取图形验证码
    async getPicCode() {
      const {
        data: { base64, key }
      } = await getPicCode() // 将请求封装成函数
      this.picUrl = base64 // 图片地址
      this.picKey = key // 唯一标识，验证
      Toast('获取图形验证码成功')
      // this.$toast('获取图形验证码成功')  本质上是注册挂载到了Vue（构造函数）的原型上Vue.prototype.$totas = xxx
    },
    // 获取手机验证码
    async getCode() {
      if (!this.validFn()) {
        return
      }
      await getMsgCode(this.picCode, this.picKey, this.phoneNum)
      this.$toast('已发送手机验证码，注意查收')
      this.second--
      this.$refs.btn.disabled = true // 禁用button
      this.flag = true // 改变样式
      this.timer = setInterval(() => {
        this.second--
        if (this.second === 0) {
          clearTimeout(this.timer)
          this.second = this.totalSecond
          this.$refs.btn.disabled = false
          this.flag = false
        }
      }, 1000)
    },
    // 登录
    async login() {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.phoneNum, this.msgCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')
      // 判断是从哪个页面来的,如果有返回地址，则用那个，否则回到首页
      const url = this.$route.query.backUrl || '/'
      // 但是用push会保留历史记录，即返回上一页会回到登录页，用户体验不好
      this.$router.replace(url)
    }
  },
  destroyed() {
    // 离开页面清除定时器
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  margin-top: 30px;
  position: relative;
  padding: 20px;
  .title {
    font-size: 24px;
    color: #333;
    font-weight: 400;
    P {
      font-size: 16px;
      color: #777;
      margin-top: 10px;
      margin-bottom: 25px;
    }
  }
  .form {
    height: 220px;
    // background-color: #ddd;
    .inp {
      width: 60%;
      height: 35px;
      margin: 15px 0;
      border: none;
      border-bottom: 1px solid #ddd;
      font-size: 16px;
    }
    img {
      width: 30%;
      vertical-align: middle;
      margin-left: 5px;
    }
    button {
      border: none;
      background-color: #fff;
      color: #ffae52;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
  .login-btn {
    width: 100%;
    background-color: rgb(255, 185, 55);
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 19px;
    color: #fff;
    border-radius: 25px;
    letter-spacing: 3px;
  }
}
</style>
