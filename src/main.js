import 'es6-promise/auto'

import Vue from 'vue'
import store from './store'

import App from './App'
import 'bootstrap/dist/css/bootstrap.css' // Bootstrap import
import 'font-awesome/css/font-awesome.min.css' // Font awesome import

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App />',
  components: { App }
})
