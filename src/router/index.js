import Vue from 'vue'
import Router from 'vue-router'
import aggregatePayment from '@/components/aggregatePayment'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'payinfo',
        component: resolve => {return (require(["../components/input.vue"], resolve))}
    },{
        path: '/aggregatePayment',
        name: 'aggregatePayment',
        component: aggregatePayment
    }, {
        path: '/success',
        name: 'success',
        component: resolve => {return (require(["../components/paySuccess.vue"], resolve))}
    }]
})