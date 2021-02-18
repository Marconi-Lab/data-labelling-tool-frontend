<template>
  <div id="landing-page">
    <b-navbar type="dark" variant="info">
      <b-navbar-brand>Data Labelling Tool</b-navbar-brand>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <router-link class="router-link nav-link" to="/login">
          signin</router-link
        >
        <router-link class="router-link nav-link" to="/signup">
          signup</router-link
        >
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style>
.button:hover {
  color: white;
}

.router-link:hover {
  color: white;
  text-decoration: none;
}
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
