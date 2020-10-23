import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Photoswipe from 'vue-pswipe'
import Argon from './plugins/argon-kit'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vueFilePond from 'vue-filepond'
import Particles from 'particles.vue'
// 提取EXIF信息
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// 上傳時可以預覽到上傳的圖片
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import './assets/scss/filepond-plugin-image-preview.min.css'
import './assets/scss/filepond.min.css'
import './registerServiceWorker'
// axios 預設傳送認證資訊
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(Photoswipe)
Vue.use(VueSweetalert2)
Vue.use(Particles)
const FilePond = vueFilePond(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)
Vue.component('file-pond', FilePond)

Vue.config.productionTip = false
Vue.use(Argon)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
