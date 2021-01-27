<template>
  <b-row class="landing-page" align-v="start">
    <b-col class="column">
      <h3 class="text-info" style="position: absolute; left: 3rem; top: 1rem;">Data Labelling Online</h3>
      <div style="position: absolute; right: 2rem; top: 1rem;">
          <router-link class="router-link" to="/login">
        <b-btn
          variant="outline-info"
          size="md"
          class="m-2 button"
          style="width:100px; border-radius: 20px;"
          >signin</b-btn
        ></router-link>
        <router-link class="router-link" to="/signup">
        <b-btn
          variant="outline-info"
          size="md"
          class="m-2 button"
          style="width:100px; border-radius: 20px;"
          >signup</b-btn
        ></router-link>
      </div>
    </b-col>   
  </b-row>
</template>

<script>
export default {};
</script>

<style>
.button:hover{
    color: white;
}
.column {
}
.router-link:hover{
    color: white;
    text-decoration: none;
}
.landing-page {
  /* background-color: 	#5bc0de; */
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/1-02.jpg");
  background-size: cover;
  background-position-x: center;
}
</style>
