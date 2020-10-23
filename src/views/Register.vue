<template>
  <section id="register" class="section p-0 pt-5 pb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
          <card type="custom" shadow
                header-classes="bg-white pb-5"
                class="border-0">
            <template>
              <div>
                <img v-lazy="'./img/add-user.png'"
                  class="rounded img-center img-fluid"
                  style="width: 25%;">
              </div>
              <form role="form">
                <base-input alternative
                            class="mt-4 mb-4"
                            placeholder="帳號長度為 4 - 20 個字"
                            addon-left-icon="ni ni-single-02"
                            v-model="account">
                </base-input>
                <base-input alternative
                            type="password"
                            placeholder="密碼長度為 4 - 20 個字"
                            addon-left-icon="ni ni-key-25"
                            v-model="password">
                </base-input>
                <div class="row m-0 password-strength-meter">
                  <div class="col-12">
                    <password v-model="password"
                      :strength-meter-only="true"
                      @score="showScore"/>
                  </div>
                </div>
                <div class="row m-0 password-strength">
                  <div class="col-4">弱</div>
                  <div class="col-4">中</div>
                  <div class="col-4">強</div>
                </div>
                <div class="row m-0 verify">
                  <div class="col-6 p-0">
                    <base-input class="m-0"
                                alternative
                                type="text"
                                placeholder="驗證碼"
                                v-model="verify">
                    </base-input>
                  </div>
                  <div id="svg" class="col-6 p-0 pl-2"></div>
                </div>
                <div class="wrong mt-3">
                  <i class="fa fa-exclamation-circle mr-2"></i><span>{{ warntext }}</span>
                </div>
                <div class="text-center">
                    <base-button type="danger" class="my-4" @click="submit">註冊</base-button>
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
import Password from 'vue-password-strength-meter'
export default {
  data () {
    return {
      account: '',
      password: '',
      verify: '',
      warntext: '',
      passwordStrength: ''
    }
  },
  components: {
    Password
  },
  methods: {
    showScore (score) {
      const ps1 = document.querySelector('.password-strength div:nth-child(1)')
      const ps2 = document.querySelector('.password-strength div:nth-child(2)')
      const ps3 = document.querySelector('.password-strength div:nth-child(3)')
      const black = 'color: #000; font-weight: 100;'
      const red = 'color: red; font-weight: 600;'
      if (score === null) {
        ps1.setAttribute('style', black)
        ps2.setAttribute('style', black)
        ps3.setAttribute('style', black)
        this.passwordStrength = 'null'
      } else if (score === 0 || score === 1) {
        ps1.setAttribute('style', red)
        ps2.setAttribute('style', black)
        ps3.setAttribute('style', black)
        this.passwordStrength = '弱'
      } else if (score === 2 || score === 3) {
        ps1.setAttribute('style', black)
        ps2.setAttribute('style', red)
        ps3.setAttribute('style', black)
        this.passwordStrength = '中'
      } else {
        ps1.setAttribute('style', black)
        ps2.setAttribute('style', black)
        ps3.setAttribute('style', red)
        this.passwordStrength = '強'
      }
    },
    submit () {
      const warn = document.getElementsByClassName('wrong')
      if (this.account.length < 4 || this.account.length > 20) {
        warn[0].setAttribute('style', 'display: flex')
        this.warntext = '帳號格式不符'
      } else if (this.password.length < 4 || this.password.length > 20) {
        warn[0].setAttribute('style', 'display: flex')
        this.warntext = '密碼格式不符'
      } else if (this.passwordStrength !== '中' && this.passwordStrength !== '強') {
        warn[0].setAttribute('style', 'display: flex')
        this.warntext = '密碼強度太弱'
      } else if (this.verify.length === 0) {
        warn[0].setAttribute('style', 'display: flex')
        this.warntext = '驗證碼必填'
      } else {
        this.axios.post(process.env.VUE_APP_APIURL + '/users', { account: this.account, password: this.password, verify: this.verify })
          .then(response => {
            const data = response.data
            if (data.success) {
              // 如果回來的資料 success 是 true
              (async () => {
                await this.$swal.fire({
                  icon: 'success',
                  title: '註冊成功',
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                }).then((result) => {
                  this.account = ''
                  this.password = ''
                  this.verify = ''
                  warn[0].setAttribute('style', 'display: none')
                  this.getverify()
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
                if (error.response.data.message === '驗證碼錯誤') {
                  this.account = ''
                  this.password = ''
                  this.verify = ''
                  warn[0].setAttribute('style', 'display: none')
                  this.getverify()
                }
              })
            })()
          })
      }
    },
    getverify () {
      this.axios.get(process.env.VUE_APP_APIURL + '/captcha')
        .then(response => {
          const data = response.data.svg
          const ob = document.getElementById('svg')
          ob.innerHTML = data
        })
        .catch(() => {
          (async () => {
            await this.$swal.fire({
              icon: 'error',
              title: '發生錯誤',
              allowOutsideClick: false,
              confirmButtonText: '確定'
            })
          })()
        })
    }
  },
  mounted () {
    this.getverify()
  }
}
</script>
<style>
</style>
