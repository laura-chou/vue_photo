<template>
  <div id="app" style="position: relative">
    <base-nav type="default" effect="dark" expand>
      <a class="navbar-brand d-flex align-items-center jus" href="#" @click="page('/')"><img class="mr-2" src="img/photo-album.png">線上相簿</a>

      <div class="row" slot="content-header" slot-scope="{closeMenu}">
        <div class="col-6 collapse-brand">
          <a href="#" @click="page('/')"><img src="img/logo.png"></a>
        </div>
        <div class="col-6 collapse-close">
            <close-button @click="closeMenu"></close-button>
        </div>
      </div>
      <ul class="navbar-nav ml-lg-auto">
        <li class="nav-item" v-if="user.length == 0" >
          <a class="nav-link nav-link-icon" href="#" @click="page('/login')">登入</a>
        </li>
        <li class="nav-item" v-else>
          <a class="nav-link nav-link-icon" href="#" @click="page('/album')">我的相簿</a>
        </li>
        <li class="nav-item" v-if="user.length == 0" >
          <a class="nav-link nav-link-icon" href="#" @click="page('/register')">註冊</a>
        </li>
        <li class="nav-item" v-else >
          <a class="nav-link nav-link-icon" href="#" @click="logout">登出</a>
        </li>
      </ul>
    </base-nav>
    <Particles
      id="tsparticles"
      :options="{
        background: {
            color: {
                value: '#172b4d'
            }
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: 'canvas',
            events: {
                onClick: {
                    enable: false,
                    mode: 'push'
                },
                onHover: {
                    enable: false,
                    mode: 'repulse'
                },
                resize: true
            },
            modes: {
                bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 40
                },
                push: {
                    quantity: 4
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                }
            }
        },
        particles: {
            color: {
                value: '#ffffff'
            },
            links: {
                color: '#ffffff',
                distance: 150,
                enable: false,
                opacity: 0.5,
                width: 1
            },
            collisions: {
                enable: true
            },
            move: {
                direction: 'none',
                enable: true,
                outMode: 'out',
                random: true,
                speed: 1,
                straight: false
            },
            number: {
                density: {
                    enable: true,
                    value_area: 800
                },
                value: 80
            },
            opacity: {
                value: 0.5
            },
            shape: {
                type: 'circle'
            },
            size: {
                random: true,
                value: 3
            }
        },
        detectRetina: true
      }"
    />
    <router-view/>
  </div>
</template>
<script>
import BaseNav from '@/components/BaseNav'
import CloseButton from '@/components/CloseButton'
export default {
  name: 'app',
  data () {
    return {
      hb: '',
      islogout: false
    }
  },
  components: {
    BaseNav,
    CloseButton
  },
  computed: {
    user () {
      const user = this.$store.getters.user
      if (user.length > 0) {
        this.Interval()
      } else {
        clearInterval(this.hb)
      }
      return user
    }
  },
  methods: {
    page (to) {
      if (this.$route.path !== to) {
        this.$router.push(to)
      }
    },
    logout () {
      if (!this.islogout) {
        this.islogout = true
        this.axios.delete(process.env.VUE_APP_APIURL + '/logout/' + this.user)
          .then(response => {
            const data = response.data
            if (data.success) {
            // 如果回來的資料 success 是 true
              (async () => {
                await this.$swal.fire({
                  icon: 'success',
                  title: '登出成功',
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                }).then((result) => {
                // 如果現在不是在首頁，跳到登出後的首頁
                  this.$store.commit('logout')
                  this.islogout = false
                  if (this.$route.path !== '/') {
                    this.$router.push('/')
                  }
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
                  this.islogout = false
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
                this.islogout = false
              })
            })()
          })
      }
    },
    heartbeat () {
      this.axios.get(process.env.VUE_APP_APIURL + '/heartbeat/' + this.user)
        .then(response => {
          const data = response.data
          // 如果是登入中
          if (this.user.length > 0) {
            // 如果後端登入時間過期
            if (!data) {
              (async () => {
                await this.$swal.fire({
                  icon: 'error',
                  title: '登入時效已過',
                  allowOutsideClick: false,
                  confirmButtonText: '確定'
                }).then((result) => {
                  this.$store.commit('logout')
                  // 如果現在不是在首頁，跳到登出後的首頁
                  if (this.$route.path !== '/') {
                    this.$router.push('/')
                  }
                })
              })()
            }
          }
        })
        .catch(() => {
          (async () => {
            await this.$swal.fire({
              icon: 'error',
              title: '發生錯誤',
              allowOutsideClick: false,
              confirmButtonText: '確定'
            }).then((result) => {
              this.$store.commit('logout')
              // 如果現在不是在首頁，跳到登出後的首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            })
          })()
        })
    },
    Interval () {
      this.hb = setInterval(() => {
        this.heartbeat()
      }, 1000 * 5)
    }
  }
}
</script>
