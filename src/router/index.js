import Vue from "vue";
import VueRouter from "vue-router";
import Dummy from "../components/dummy"
import Login from "../views/user/Login"

Vue.use(VueRouter)

const routes = [
    {
        path: "/dummy",
        name: "dummy",
        component: Dummy
    },
    {
        path: "/login",
        name: "login",
        component: Login
    }
]

const router = new VueRouter({
    mode: "history", 
    routes
})

export default router;