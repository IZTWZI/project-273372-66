import Vue from 'vue'
import Router from 'vue-router'

//Users
import UserIndex from '@/components/Users/Index'
import UserCreate from '@/components/Users/CreateUser'
import UserEdit from '@/components/Users/EditUser'
import UserShow from '@/components/Users/ShowUser'

import Login from '@/components/Login'
import SingUp from '@/components/SingUp'

import RestaurantIndex from '@/components/Restaurants/IndexRestaurant'
import RestaurantCreate from '@/components/Restaurants/CreateRestaurant'
import RestaurantEdit from '@/components/Restaurants/EditRestaurant'
import RestaurantShow from '@/components/Restaurants/ShowRestaurant'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/users',
      name: 'users',
      component: UserIndex
    },
    {
      path: '/user/create',
      name: 'users-create',
      component: UserCreate
    },
    {
      path: '/user/edit/:userId',
      name: 'users-edit',
      component: UserEdit
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserShow
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/singup',
      name: 'singup',
      component: SingUp
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: RestaurantIndex
    },
    {
      path: '/restaurant/create',
      name: 'restaurants-create',
      component: RestaurantCreate
    },
    {
      path: '/restaurant/edit/:restaurantId',
      name: 'restaurants-edit',
      component: RestaurantEdit
    },
    {
      path: '/restaurant/:restaurantId',
      name: 'restaurant',
      component: RestaurantShow
    },
  ]
})
