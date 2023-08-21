<template>
  <div class="address">
    <navbar class="navbar">
      <template #text>收货地址</template>
    </navbar>
    <van-icon name="setting" @click="isedit = !isedit" />
    <div class="list">
      <van-radio-group v-model="radio" v-if="list.length !== 0">
        <van-radio
          v-for="item in list"
          :name="item.address_id"
          :key="item.address_id"
        >
          <div class="list_item">
            <p class="head">
              <span>{{ item.name }}</span> <span>{{ item.phone }}</span>
            </p>
            <p class="body">
              <span>{{
                item.region.province +
                item.region.city +
                item.region.region +
                item.detail
              }}</span>
            </p>
            <van-icon name="edit" />
          </div>
        </van-radio>
      </van-radio-group>
      <div v-else>你还没有添加收货地址噢~</div>
    </div>
    <div class="add" @click="add" v-if="!isedit">添加地址</div>
    <div class="add" @click="del" v-else>删除地址</div>
  </div>
</template>

<script>
import navbar from '@/components/NavBar.vue'
import { addAddress, getAddressList, delAddress } from '@/api/address'
export default {
  name: 'addressIndex',
  data() {
    return {
      region: [
        {
          value: '782',
          label: '上海'
        },
        {
          value: '783',
          label: '上海市'
        },
        {
          value: '785',
          label: '徐汇区'
        }
      ],
      detail: '翻斗花园1001室',
      list: [],
      radio: null,
      isedit: false
    }
  },
  components: {
    navbar
  },
  created() {
    this.getAddressList()
  },
  mounted() {},
  methods: {
    async add() {
      await addAddress('白墨', '15012345678', this.region, this.detail)
      this.getAddressList()
    },
    async getAddressList() {
      const {
        data: { list }
      } = await getAddressList()
      this.list = list
      if (list.length === 0) {
        this.isedit = false
        return
      }
      this.radio = list[0].address_id
    },
    async del() {
      await delAddress(this.radio)
      this.getAddressList()
    }
  }
}
</script>

<style lang='less' scoped>
.address {
  padding-top: 50px;
  padding-bottom: 50px;
  overflow: auto;
}
.navbar {
  position: fixed;
  top: 0;
}
.van-icon-setting {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 999;
}
.list {
  margin: 20px 0;
  .van-radio {
    margin-left: 10px;
    .list_item {
      padding: 10px 30px;
      margin: 10px;
      margin-top: 5px;
      border: 1px solid white;
      border-radius: 5px;
      box-shadow: 1px 1px 8px gray;
      background-color: #f8f8f8;
      .head {
        margin-bottom: 5px;
      }
      .body {
        font-size: 15px;
      }
      .van-icon-edit {
        position: relative;
        right: -100%;
        top: -35px;
      }
    }
  }
}
.add {
  width: 80%;
  height: 40px;
  margin: 0 10%;
  line-height: 40px;
  font-size: 17px;
  background-color: #ffc096;
  text-align: center;
  border-radius: 20px;
  position: fixed;
  bottom: 20px;
}
</style>
