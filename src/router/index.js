import Vue from 'vue'
import Router from 'vue-router'
import url from '@/components/url'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'url',
      component: url
    }
  ]
})
