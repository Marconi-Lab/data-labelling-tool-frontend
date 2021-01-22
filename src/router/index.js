import Vue from "vue";
import VueRouter from "vue-router";
import Dummy from "../components/dummy"
import Login from "../views/user/Login"
import Home from "../views/user/Home"
import HomeView from "../views/user/HomeView"
import Datasets from "../views/user/Datasets"

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
        component: Home,
        children: [
            {
                path: "home",
                name: "home",
                component: HomeView
            },
            {
                path: "datasets",
                name: "user-datasets",
                component: Datasets
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history", 
    routes
})

export default router;