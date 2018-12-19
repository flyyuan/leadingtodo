import Vue from 'vue'
import App from './App.vue'
import { Loading } from 'vant';
import { Toast } from 'vant';

Vue.use(Loading);
Vue.use(Toast);

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
}).$mount('#app')
