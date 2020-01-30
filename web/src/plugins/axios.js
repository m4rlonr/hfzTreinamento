'use strict'

import Vue from 'vue'
import axios from 'axios'

let config = {
  // baseURL: process.env.VUE_APP_BASE_URL
  baseURL: 'http://localhost:8000/'
}

const _axios = axios.create(config)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default _axios
