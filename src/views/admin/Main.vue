<template>
  <div class="main-view">
    <NavBar />
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/admin/navBar.vue";
export default {
  name: "admin-main",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.main-view{
  display: block;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: fixed;
}
</style>
