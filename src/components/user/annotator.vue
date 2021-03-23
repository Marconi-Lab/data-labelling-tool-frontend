<template>
  <div class="annotator">
    <b-icon
      @click="handleIconClick"
      icon="x-circle"
      scale="1.5"
      class="annotator-button"
    ></b-icon>
    <div class="row">
      <div class="col-2">
        side nav goes here
      </div>
      <div class="col-10">
        image goes here
        <img src="" alt="" />
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
  z-index: 30;
  position: absolute;
  color: white;
  top: 1.5rem;
  right: 1.5rem;
}
.annotator-button:hover {
  cursor: pointer;
}
.row {
  z-index: 30;
}
</style>
