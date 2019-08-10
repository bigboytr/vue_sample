import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import Individuals from './views/Individuals.vue'
import Organization from './views/Organization.vue'
import Products from "./views/Products";
import Services from "./views/Services";
import Resources from "./views/Resources";
import Rules from "./views/Rules";
import userViewAccessController from "@/controller/userViewAccessController";
import auth from "@/controller/authController2";
import router from '@/router';
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/', component: Dashboard ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("dashboard")){
          auth.logout();
        }
          next();
      }
    },
    { path: '/dashboard', component: Dashboard ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("dashboard")){
          userViewAccessController.logout();
        }
          next();
      }},
    { path: '/individuals', component: Individuals ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("individuals")){
          router.push('/dashboard');
        }
        next();
      }},
    { path: '/organization', component: Organization ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("organization")){
          router.push('/dashboard');
        }
        next();
      }},
    { path: '/products', component: Products ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("products")){
          router.push('/dashboard');
        }
        next();
      }},
    { path: '/services', component: Services ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("services")){
          router.push('/dashboard');
        }
        next();
      }},
    { path: '/resources', component: Resources ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("resources")){
          router.push('/dashboard');
        }
        next();
      }},
    { path: '/rule-engine', component: Rules ,beforeEnter:(to,from,next)=>{
        if(!userViewAccessController.accessView("ruleEngine")){
          router.push('/dashboard');
        }
        next();
      }
    },
    {  path: '*',beforeEnter:(to,from,next)=>{
        if(userViewAccessController.accessView("dashboard")){
          router.push('/dashboard');
        }else{
          router.push('/login');
        }
        next();
      }
    }
  ]
})
