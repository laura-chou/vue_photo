<template>
  <div id="album">
    <template>
      <b-breadcrumb>
        <b-breadcrumb-item active>
          <i class="ni ni-folder-17"></i>
          Folder
        </b-breadcrumb-item>
        <div class="btns">
          <base-button id="addfolderbtn" type="primary" @click="add">
            <img v-lazy="'./img/add_file.png'"
                class="rounded img-center img-fluid m-0">
          </base-button>
          <base-button id="delfolderbtn" type="danger" @click="del" v-if="isclick">
            <img v-lazy="'./img/garbage.png'"
                class="rounded img-center img-fluid m-0">
          </base-button>
        </div>
      </b-breadcrumb>
    </template>
    <div class="row m-0">
      <div class='col-6 col-sm-4 col-md-4 col-lg-3 col-xl-3 folder-col'
        v-for="(item, index) in checks" :key='index' >
        <base-button type="secondary" class="folder_style">
          <img
            v-lazy="(item.image ? './img/file.png' : './img/empty_file.png')"
            class="rounded img-center img-fluid m-0"
            @click="photo(index)">
          <base-checkbox v-model="item.checked" value=index></base-checkbox>
          <div class="file-name" @click="photo(index)">
            <span>{{ item.fileName }}</span>
          </div>
        </base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox'
export default {
  name: 'album',
  data () {
    return {
      checks: [],
      id: ''
    }
  },
  components: {
    BaseCheckbox
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    isclick () {
      let b = false
      for (const i in this.checks) {
        if (this.checks[i].checked) {
          b = true
          break
        } else {
          b = false
        }
      }
      return b
    }
  },
  methods: {
    add () {
      const addfolder = document.getElementById('addfolderbtn')
      if (this.checks.length < 5) {
        (async () => {
          await this.$swal.fire({
            title: '資料夾命名',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            allowOutsideClick: false,
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '確定',
            inputValidator: (value) => {
              if (!value) {
                return '尚未命名'
              }
            }
          }).then((result) => {
            if (result.isConfirmed) {
              addfolder.disabled = true
              const send = {
                do: 'addfolder',
                filename: result.value.toUpperCase()
              }
              this.axios.patch(process.env.VUE_APP_APIURL + '/file/' + this.id, send)
                .then(response => {
                  this.checks.push({ checked: false, fileName: result.value, image: false })
                  this.$store.commit('folder', this.checks)
                  addfolder.disabled = false
                })
                .catch(() => {
                  (async () => {
                    await this.$swal.fire({
                      icon: 'error',
                      title: '發生錯誤',
                      allowOutsideClick: false,
                      confirmButtonText: '確定'
                    }).then((result) => {
                      addfolder.disabled = false
                    })
                  })()
                })
            }
          })
        })()
      } else {
        (async () => {
          await this.$swal.fire({
            icon: 'warning',
            title: '資料最多只能 5 個',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      }
    },
    del () {
      (async () => {
        await this.$swal.fire({
          icon: 'warning',
          title: '確定要刪除嗎？',
          allowOutsideClick: false,
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '確定'
        }).then((result) => {
          if (result.isConfirmed) {
            const delfolder = document.getElementById('delfolderbtn')
            delfolder.disabled = true
            const del = []
            for (const i in this.checks) {
              if (this.checks[i].checked) {
                del.push(parseInt(i))
              }
            }
            const send = {
              do: 'delfolder',
              fileindex: del
            }
            this.axios.patch(process.env.VUE_APP_APIURL + '/file/' + this.id, send)
              .then(response => {
                for (const i of del.reverse()) {
                  this.checks.splice(i, 1)
                }
                this.$store.commit('folder', this.checks)
                delfolder.disabled = false
              })
              .catch(() => {
                (async () => {
                  await this.$swal.fire({
                    icon: 'error',
                    title: '發生錯誤',
                    allowOutsideClick: false,
                    confirmButtonText: '確定'
                  }).then((result) => {
                    delfolder.disabled = false
                  })
                })()
              })
          }
        })
      })()
    },
    photo (index) {
      this.$router.push('Photo')
      const send = {
        index: index,
        name: this.checks[index].fileName.toUpperCase()
      }
      this.$store.commit('gofile', send)
    }
  },
  mounted () {
    if (this.checks.length === 0) {
      this.axios.get(process.env.VUE_APP_APIURL + '/album/' + this.user)
        .then(response => {
          const data = response.data.result
          this.id = data._id
          for (let i = 0; i < data.file.length; i++) {
            let hasimg = false
            if (data.file[i].image.length > 0) {
              hasimg = true
            }
            this.checks.push({ checked: false, fileName: data.file[i].name, image: hasimg })
          }
          this.$store.commit('folder', this.checks)
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
  }
}
</script>
