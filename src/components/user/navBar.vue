<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand href="#">Username</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#"
              ><router-link class="nav-link" to="/user/home"
                >Home</router-link
              ></b-nav-item
            >
            <b-nav-item href="#"
              ><router-link class="nav-link" to="/user/datasets"
                >Datasets</router-link
              ></b-nav-item
            >
            <b-nav-item class="nav-link" href="#"
              ><b-icon icon="power" aria-hidden="true"></b-icon>
              Logout</b-nav-item
            >
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style></style>
