<template>
  <section id="login" class="section pt-5 pb-5">
    <div class="container p-0">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <card type="custom" shadow
                header-classes="bg-white pb-5"
                class="border-0">
            <template>
              <div class="text-center">
                <img v-lazy="'./img/user.png'"
                  class="rounded img-center img-fluid"
                  style="width: 25%;">
              </div>
              <form role="form">
                <base-input alternative
                            type="text"
                            class="my-4 mb-4"
                            v-model="account"
                            placeholder="帳號"
                            addon-left-icon="ni ni-single-02">
                </base-input>
                <base-input alternative
                          type="password"
                          v-model="password"
                          placeholder="密碼"
                          addon-left-icon="ni ni-key-25">
                </base-input>
                <div class="wrong mt-3">
                  <i class="fa fa-exclamation-circle mr-2"></i><span>{{ warntext }}</span>
                </div>
                <div class="text-center">
                  <base-button id="loginbtn" type="danger" class="my-4" @click="submit">登入</base-button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: '',
      warntext: '',
      hb: ''
    }
  },
  methods: {
    submit () {
      const warn = document.getElementsByClassName('wrong')
      const loginbtn = document.getElementById('loginbtn')
      if (this.account.length < 4 || this.account.length > 20) {
        warn[0].setAttribute('style', 'display: flex')
        this.warntext = '帳號格式不符'
      } else if (this.password.length < 4 || this.password.length > 20) {
        warn[0].setAttribute('style', 'display: flex')
        this.warntext = '密碼格式不符'
      } else {
        loginbtn.disabled = true
        this.axios.post(process.env.VUE_APP_APIURL + '/login', { account: this.account, password: this.password })
          .then(response => {
            const data = response.data
            if (data.success) {
            // 如果回來的資料 success 是 true
              (async () => {
                await this.$swal.fire({
                  icon: 'success',
                  title: '登入成功',
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                }).then((result) => {
                  // 呼叫 vuex 的登入
                  this.$store.commit('login', this.account)
                  // 跳到登入後的相簿頁
                  this.$router.push('/')
                  this.account = ''
                  this.password = ''
                  loginbtn.disabled = false
                  warn[0].setAttribute('style', 'display: none')
                })
              })()
            } else {
            // 不是就顯示回來的 message
              (async () => {
                await this.$swal.fire({
                  icon: 'error',
                  title: data.message,
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                }).then((result) => {
                  loginbtn.disabled = false
                })
              })()
            }
          })
          .catch(error => {
          // 如果回來的狀態不是 200，顯示回來的 message
            (async () => {
              await this.$swal.fire({
                icon: 'error',
                title: error.response.data.message,
                allowOutsideClick: false,
                confirmButtonText: '確定'
              }).then((result) => {
                loginbtn.disabled = false
              })
            })()
          })
      }
    }
  }
}
</script>
