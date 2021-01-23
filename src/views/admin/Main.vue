<template>
  <div>
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

<style></style>
