import Vue from "vue";
import VueRouter from "vue-router";
import Dummy from "../components/dummy"
import Login from "../views/user/Login"
import Home from "../views/user/Home"

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
    },
    {
        path: "/user",
        name: "user",
        component: Home
    }
]

const router = new VueRouter({
    mode: "history", 
    routes
})

export default router;