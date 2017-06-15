import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import ArticleList from '@/components/ArticleList'
import ArticleDetail from '@/components/ArticleDetail'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/article',
      name: 'ArticleList',
      component: ArticleList
    },
    {
      path: '/article/:id',
      props: true,
      name: 'ArticleDetail',
      component: ArticleDetail
    }
  ]
})
