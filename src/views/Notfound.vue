<template>
    <div id="notfound">
      <div class="row">
        <div class="col-12">
          <h1>404</h1>
        </div>
        <div class="col-12">
          <img v-lazy="'./img/logo.png'" @click="home">
        </div>
        <div class="col-12">
          <h1>Not Found</h1>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Notfound',
  methods: {
    home () {
      this.$router.push('/')
    }
  }
}
</script>
