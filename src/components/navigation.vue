<template>
  <b-navbar toggleable="lg" type="light" variant="" class="custom-navigation">
    <div class="container">
      <b-navbar-brand class="py-0 my-0"
        ><a href="https://marconilab.org"
          ><img class="brand-image" src="../assets/marconi_lab.png" alt="" /></a
      ></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Right aligned nav items -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <router-link class="router-link nav-link" to="/">
            landing</router-link
          >
          <router-link class="router-link nav-link" to="/administrator">
            admin</router-link
          >
          <router-link class="router-link nav-link" to="/login">
            signin</router-link
          >
          <router-link class="router-link nav-link" to="/signup">
            signup</router-link
          >
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style>
.brand-image {
  height: 4.5rem;
  border-radius: 0.2rem;
}
.button:hover {
  /* color: white; */
}
.custom-navigation {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: white;
  margin-bottom: 20px;
  -webkit-box-shadow: 0px 1px 6px -1px #000000;
  box-shadow: 0px 1px 6px -1px #cccccc;
}
.router-link:hover {
  /* color: white; */
  text-decoration: none;
}
</style>