<template>
  <div class="annotator">
    <b-icon
      @click="handleIconClick"
      icon="x-circle"
      scale="1.5"
      class="annotator-button"
    ></b-icon>
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
.annotator:hover {
  cursor: pointer;
}
</style>
