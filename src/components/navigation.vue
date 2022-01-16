<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand class="py-0 my-0"><img class="brand-image" src="../assets/marconi_lab.png" alt=""></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <!-- Right aligned nav items -->
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
            <router-link
            class="router-link nav-link text-white"
            to="/"
          >
            landing</router-link
          >
          <router-link
            class="router-link nav-link text-white"
            to="/administrator"
          >
            admin</router-link
          >
          <router-link class="router-link nav-link text-white" to="/login">
            signin</router-link
          >
          <router-link class="router-link nav-link text-white" to="/signup">
            signup</router-link
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {

}
</script>

<style>
.brand-image{
  height: 3rem;
  border-radius: 0.2rem;
}
.button:hover {
  color: white;
}

.router-link:hover {
  color: white;
  text-decoration: none;
}
</style>