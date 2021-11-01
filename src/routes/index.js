import Vue from 'vue';
import VueRouter from 'vue-router';
import {publicPath} from '../../vue.config.js';
import AddTutorial from '../components/AddTutorial.vue';
import Tutorial from '../components/Tutorial.vue';
import TutorialList from '../components/TutorialList.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
    base: publicPath,
    mode: 'history',
    routes: [
        {
            path: '/',
            alias: '/tutorials',
            name: 'tutorials',
            component: TutorialList
        },
        {
            path: '/tutorials/:id',
            name: 'tutorial-details',
            component: Tutorial
        },
        {
            path: '/add',
            name: 'add',
            component: AddTutorial
        }
    ]
})