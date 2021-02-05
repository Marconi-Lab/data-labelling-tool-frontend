<template>
  <div id="app">
    <Loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#17a2b8"
      background-color="#000"
      opacity="0.3"
    />
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
export default {
  name: "App",
  components: {
    Loading,
  },
  data() {
    return {
      isLoading: false,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
