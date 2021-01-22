<template>
  <div>
    <b-container class="">
      <b-row class="mt-5">
        <b-col md="6" class="my-3">
          <b-card
            header="Your Record"
            header-tag="header"
            footer="Annotations"
            footer-tag="footer"
            style="height: 40vh"
          >
            <b-row align-v="center" style="height: 100%">
              <h1 style="margin: auto">{{ record }}</h1>
            </b-row>
          </b-card>
        </b-col>
        <b-col md="6" class="my-3">
          <b-card
            header="Your Assignments"
            header-tag="header"
            footer="Datasets"
            footer-tag="footer"
            style="height: 40vh"
          >
            <b-row align-v="center" style="height: 100%">
              <h1 style="margin: auto">{{ datasets }}</h1>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "home-view",
  components: {},
  data() {
    return {
      record: 0,
      datasets: 0,
    };
  },
};
</script>

<style></style>
