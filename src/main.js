// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import ViewUI from 'view-design'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vuetify from '@/plugins/vuetify'
import VueEditor from "vue2-editor"



Vue.prototype.$http = Axios
Vue.prototype.$urlServices = "http://10.197.102.13:8090"
Vue.prototype.$urlStratio = "http://10.197.8.52:10509"
//Vue.prototype.$urlDictionaries = "http://10.197.102.13:8091"
Vue.prototype.$urlDictionariesLocal = "http://10.197.102.13:8091"
Vue.prototype.$urlDictionaries = "http://10.197.8.52:10503"
//Vue.prototype.$urlTokenLocal = "http://10.197.102.13:8094"

Vue.prototype.$stratioUser = "test"
Vue.prototype.$stratioPassword = "123456"
Vue.prototype.$applicationCode = "2"
Vue.prototype.$applicationUniqueIdentifier = "certificadoOAL"

Vue.use(ViewUI)
Vue.use(BootstrapVue)
Vue.use(VueEditor)
Vue.use(VueSweetalert2);


const token = localStorage.getItem('user-token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

  // Vue.config.productionTip = false
  // /* eslint-disable no-new */
  // new Vue({
  //   el: '#app',
  //   router,
  //   components: { App },
  //   template: '<App/>'
  // })

