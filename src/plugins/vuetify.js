import Vue from 'vue'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/styles/global.scss'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
Vue.use(VueI18n)


// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'es'// set locale
})

Vue.component('my-component', {
  methods: {
    changeLocale () {
      this.$vuetify.lang.current = 'es'
    }
  }
})

export default new Vuetify({
  theme: {
    themes: {
      light: {
        sbs: "#9e1c64"
      },
    },
  },
  lang: {
    locales: {
      i18n
    },
    icons: {
      iconfont: 'fa'
    }
  }
})
