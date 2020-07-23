import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const opts = {
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    dark: false,
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: {
          base: '#0054fe',
          lighten2: '#81abff', // not sure if these are the right offsets...
          lighten4: '#dbe5fa',
        },
        secondary: '#192b4e',
        accent: '#8c9eff',
        error: '#b71c1c',
        success: '#00b357',
        warning: {
          base: '#eb9762',
          darken2: '#dc7e4c'
        },
      },
    },
  },
}

export default new Vuetify(opts)