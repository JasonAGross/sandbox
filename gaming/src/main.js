import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmN2ZhYzVkMC1lNWQzLTAxMzYtMDQzNC0wOTFhYmQ4MTE2MzIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTQ1MjM0NzMwLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImdpdC1ndWQifQ.A0Gs_oCZW7Cxp_sp6LIDyKKtrYEB-ncd5NhULPYGZPs'
axios.defaults.headers.common['Accept'] = 'application/vnd.api+json'
axios.defaults.baseURL = 'https://api.pubg.com'
Vue.config.productionTip = false

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')