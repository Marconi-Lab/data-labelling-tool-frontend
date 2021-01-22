<template>
    <div>
        <NavBar/>
        <router-view></router-view>
    </div>
</template>

<script>
import NavBar from "@/components/user/navBar.vue"
export default {
    name: "user-home",
    components: {
        NavBar
    },
    data(){
        return {

        }
    }
}
</script>

<style>

</style>