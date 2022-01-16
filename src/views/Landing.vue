<template>
  <div id="landing-page">
    <Navigation />
  </div>
</template>

<script>
import Navigation from "../components/navigation.vue"
export default {
  name: "landing-page",
  components: {
    Navigation
  }
};
</script>

<style>
#landing-page {
  /* background-color: 	#5bc0de; */
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/1.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  /* background-repeat: space; */
}
</style>
