import Vue from "vue";
import VueRouter from "vue-router";
import Dummy from "../components/dummy"

Vue.use(VueRouter)

const routes = [
    {
        path: "/dummy",
        name: "dummy",
        component: Dummy
    }
]

const router = new VueRouter({
    mode: "history", 
    routes
})

export default router;