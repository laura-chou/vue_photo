<template>
  <div id="photo">
    <template>
      <b-breadcrumb>
        <b-breadcrumb-item to="/Album">
          <i class="ni ni-folder-17"></i>
          Folder
        </b-breadcrumb-item>
        <b-breadcrumb-item active>
          <i class="ni ni-image"></i>
          {{ filename }}
        </b-breadcrumb-item>
        <div class="btns">
          <base-button type="primary" @click="addimg">
            <img v-lazy="'./img/add_image.png'"
                class="rounded img-center img-fluid m-0">
          </base-button>
        </div>
      </b-breadcrumb>
    </template>
      <Photoswipe class="row m-0 p-3 ps">
        <div
          class="col-6 col-sm-4 col-md-4 col-lg-3 col-xl-2 card p-1"
          v-for="(item, index) in picture"
          :key="index"
          style="display: inline-block; height: 300px"
        >
          <div class="col-12 p-0 card-content" style="height: 100%;">
            <div class="col-12 p-0" style="height: 50%">
              <img :style="getImageItemStyle(item.src)" v-pswp="item">
            </div>
            <div class="card-body p-3" style="height: 50%">
              <div class="txt-line-clamp2" style="height: 50%;">
                <p class="card-text" v-if="!item.edit">{{ item.title }}</p>
                <textarea class="form-control" v-else rows="2" v-model="item.model" maxlength="30"></textarea>
              </div>
              <div class="row btns mt-2" style="height: 50%">
                <div class="col-6" v-if="item.edit">
                  <base-button type="danger" icon="fa fa-times" @click="cancel(item)"></base-button>
                </div>
                <div class="col-6" v-else>
                  <base-button type="success" icon="fa fa-edit" @click="edit(item)"></base-button>
                </div>
                <div class="col-6" v-if="item.edit">
                  <base-button type="success" icon="fa fa-check" @click="update(item, index)"></base-button>
                </div>
                <div class="col-6" v-else>
                  <base-button type="danger" icon="fa fa-trash" @click="del(item, index)"></base-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Photoswipe>
    <div>
        <b-modal
        v-model="addmodal"
        no-fade
        no-close-on-backdrop
        centered>
          <div class="row">
            <div class="col-2 p-0 d-flex align-items-center justify-content-center">圖片：</div>
            <div class="col-10">
              <file-pond
                name="add"
                ref="pond"
                label-idle="選擇檔案或拖曳至此 (僅接受1MB以下的檔案)"
                allow-multiple="true"
                max-files="1"
                allowImageExifOrientation="false"
                allowImagePreview="true"
                accepted-file-types="image/*"
                max-file-size="1MB"
                label-max-file-size-exceeded="檔案太大"
                label-max-file-size="檔案不能超過{filesize}"
                label-file-processing="上傳中"
                label-file-processing-complete="上傳完成"
                label-tap-to-undo="點擊刪除"
                label-tap-to-cancel="點擊取消"
                :server="myServer"
              />
            </div>
          </div>
          <div class="row">
            <div class="col">
              <textarea v-model="description" class="form-control form-control-alternative" placeholder="相片說明 (30 字以下)" maxlength="30"></textarea>
            </div>
          </div>
          <div class="row warn mt-3">
            <div class="swal2-validation-message" id="swal2-validation-message" style="display: flex; margin-left: -20px; margin-right: -20px;">
              <span>{{ warn }}</span>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col-6 d-flex justify-content-end"><b-button id="addbtn" variant="primary" @click="add">確定</b-button></div>
            <div class="col-6 d-flex justify-content-start"><b-button id="cancelbtn" variant="cancel" @click="cancelmodal">取消</b-button></div>
          </div>
        </b-modal>
      </div>
  </div>
</template>

<script>
export default {
  name: 'photo',
  data () {
    return {
      filename: this.$store.getters.file.name,
      addmodal: false,
      file: '',
      myServer: {
        process: (fieldName, file, metadata, load) => {
          this.file = file
          const btn = document.getElementById('addbtn')
          btn.disabled = true
          setTimeout(() => {
            load(Date.now())
            btn.disabled = false
          }, 1500)
        }
      },
      warn: '',
      picture: [],
      description: '',
      id: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    fileinfo () {
      return this.$store.getters.file
    }
  },
  methods: {
    addimg () {
      if (this.picture.length < 5) {
        this.addmodal = !this.addmodal
      } else {
        (async () => {
          await this.$swal.fire({
            icon: 'warning',
            title: '相片最多只能 5 張',
            allowOutsideClick: false,
            confirmButtonText: '確定'
          })
        })()
      }
    },
    add () {
      const filepondassistant = document.getElementsByClassName('filepond--assistant')
      const showwarn = document.getElementsByClassName('warn')
      const addbtn = document.getElementById('addbtn')
      const cancelbtn = document.getElementById('cancelbtn')
      const fd = new FormData()
      if (filepondassistant[0].innerHTML.includes('檔案太大')) {
        if (!showwarn[0].hasAttribute('style', 'display: block')) {
          showwarn[0].setAttribute('style', 'display: block !important')
        }
        this.warn = '檔案太大'
      } else if (filepondassistant[0].innerHTML === '') {
        if (!showwarn[0].hasAttribute('style', 'display: block')) {
          showwarn[0].setAttribute('style', 'display: block !important')
        }
        this.warn = '未選擇檔案'
      } else {
        if (filepondassistant[0].innerHTML.includes('上傳完成')) {
          // FormData 可以同時傳送檔案和表單資料
          fd.append('image', this.file)
          // 禁止按按鈕
          addbtn.disabled = true
          cancelbtn.disabled = true
        }
        fd.append('description', this.description)
        fd.append('filename', this.filename)
        this.axios.patch(process.env.VUE_APP_APIURL + '/file/' + this.id, fd)
          .then(response => {
            addbtn.disabled = false
            cancelbtn.disabled = false
            this.picture.push(
              {
                src: process.env.VUE_APP_APIURL + '/file/' + response.data.result.name,
                title: response.data.result.description,
                edit: false,
                model: ''
              }
            )
            this.cancelmodal()
          }).catch(error => {
            (async () => {
              await this.$swal.fire({
                icon: 'error',
                title: error.response.data.message,
                allowOutsideClick: false,
                confirmButtonText: '確定'
              })
            })()
          })
      }
    },
    cancelmodal () {
      this.addmodal = !this.addmodal
      this.description = ''
      this.file = ''
    },
    cancel (item) {
      item.edit = false
      item.model = item.title
    },
    edit (item) {
      item.edit = true
      item.model = item.title
    },
    del (item, idx) {
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
            const send = {
              do: 'delimage',
              fileindex: this.fileinfo.index,
              imageindex: idx
            }
            this.axios.patch(process.env.VUE_APP_APIURL + '/file/' + this.id, send)
              .then(response => {
                this.picture.splice(idx, 1)
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
        })
      })()
    },
    update (item, idx) {
      const send = {
        do: 'editimage',
        fileindex: this.fileinfo.index,
        imageindex: idx,
        description: item.model
      }
      this.axios.patch(process.env.VUE_APP_APIURL + '/file/' + this.id, send)
        .then(response => {
          item.edit = false
          item.title = item.model
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
    },
    getImageItemStyle (src) {
      return {
        width: '100%',
        height: '100%',
        backgroundImage: `url(${src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }
    },
    getImg () {
      this.axios.get(process.env.VUE_APP_APIURL + '/album/' + this.user)
        .then(response => {
          const data = response.data.result
          this.id = data._id
          for (let i = 0; i < data.file.length; i++) {
            if (data.file[i].name === this.filename) {
              for (let j = 0; j < data.file[i].image.length; j++) {
                this.picture.push(
                  {
                    src: process.env.VUE_APP_APIURL + '/file/' + data.file[i].image[j].name,
                    title: data.file[i].image[j].description,
                    edit: false,
                    model: ''
                  }
                )
              }
            }
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
  },
  mounted () {
    this.getImg()
  }
}
</script>
