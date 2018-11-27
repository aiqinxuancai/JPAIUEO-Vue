import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/fullDataWindow',
      name: 'full-data-window',
      component: require('@/components/FullDataWindow/FullDataWindow').default
    },
    {
      path: '/eliminateGameWindow',
      name: 'eliminate-game-window',
      component: require('@/components/EliminateGameWindow/EliminateGameWindow').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
