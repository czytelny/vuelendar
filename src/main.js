// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import {Col, Row, Input, FormItem, Form, Button, Collapse,
        CollapseItem, Loading} from 'element-ui'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueFire)
Vue.use(Col)
Vue.use(Row)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Loading.directive)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
