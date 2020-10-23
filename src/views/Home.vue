<template>
  <div id="home">
    <div class="container" v-if="user.length == 0">
      <h1>歡迎使用線上相簿</h1>
    </div>
    <div class="container p-0" style="background-image: url('./img/bg.png');" v-else>
      <h1 style="color: #000;">{{user}}的線上相簿</h1>
      <h3 style="color: #000;">請點擊<span style="color: #000093;">我的相簿</span>開始使用吧</h3>
      <img v-lazy="'./img/bg1.png'">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
