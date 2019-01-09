import Vue from 'vue'
import App from './App.vue'
import store from './store'

window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios
Vue.config.productionTip = false

Vue.prototype.$apiHeaders = {
	'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJmN2ZhYzVkMC1lNWQzLTAxMzYtMDQzNC0wOTFhYmQ4MTE2MzIiLCJpc3MiOiJnYW1lbG9ja2VyIiwiaWF0IjoxNTQ1MjM0NzMwLCJwdWIiOiJibHVlaG9sZSIsInRpdGxlIjoicHViZyIsImFwcCI6ImdpdC1ndWQifQ.A0Gs_oCZW7Cxp_sp6LIDyKKtrYEB-ncd5NhULPYGZPs',
	'Accept': 'application/vnd.api+json'
}

new Vue({
	store,
	render: h => h(App)
}).$mount('#app')