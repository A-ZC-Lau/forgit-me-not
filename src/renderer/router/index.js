import Vue from 'vue'
import Router from 'vue-router'

import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main/Main'
import Input from '@/components/Input'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/main',
          name: 'Main',
          component: Main
      },
      {
          path: '/input',
          name: 'Input',
          component: Input
      },
      {
          path: '*',
          redirect: '/main'
      }
  ]
})
