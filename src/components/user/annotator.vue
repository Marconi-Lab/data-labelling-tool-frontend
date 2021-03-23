<template>
  <div class="annotator">
    <b-icon
      @click="handleIconClick"
      icon="x-circle"
      scale="1.5"
      class="annotator-button"
    ></b-icon>
    <div class="row">
      <div class="col-lg-2">
        <b-nav
          vertical
          class="text-left ml-2"
          style="position: fixed; width: 14rem; background:#2f2f2f; height: 93vh; "
        >
          <p class="my-nav-item1 text-white p-2 m-0">Select Shape</p>
          <div class="ml-2 mt-1">
            <b-icon
              icon="square"
              class="m-2 annotation-icon"
              scale="1.5"
            ></b-icon>
          </div>
          <hr class="m-0" style="border-top: 0.1em solid white; width: 100%" />
          <b-button
            variant="info"
            style="position: absolute; bottom: 0.5rem; border-radius: 0px; width: 100%;"
            >save</b-button
          >
        </b-nav>
      </div>
      <div class="col-lg-10 image-column pl-2">
        <img :src="imageURL" alt="Cervix image" class="m-0 p-0" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "annotator",
  data() {
    return {};
  },
};
</script>

<script scoped>
export default {
  data() {
    return {};
  },
  methods: {
    handleIconClick() {
      this.$store.commit("annotating", false);
    },
  },
  props: {
    imageURL: String,
  },
};
</script>

<style scoped>
.annotator {
  width: 100%;
  height: 100vh;
  z-index: 20;
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0px;
}
.annotator-button {
  z-index: 32;
  position: absolute;
  color: white;
  top: 1.5rem;
  right: 1.5rem;
}
.annotator-button:hover {
  cursor: pointer;
}
.row {
  /* position: absolute; */
  padding-top: 2rem;
  z-index: 30;
  height: 100vh;
  width: 100vw;
  overflow: hidden scroll;
}
.image-column {
  overflow-x: scroll;
  overflow-y: scroll;
}
.my-nav-item1 {
  background: #17a2b8;
  width: 100%;
}
.annotation-icon {
  color: white;
}
.annotation-icon:hover {
  cursor: pointer;
}
</style>
