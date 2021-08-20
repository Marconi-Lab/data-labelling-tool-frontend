<template>
  <div class="box-wrapper">
    <div
      class="box"
      :style="{
        top: bTop + 'px',
        left: bLeft + 'px',
        width: bWidth + 'px',
        height: bHeight + 'px',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: ["b-top", "b-left", "b-width", "b-height"],
};
</script>

<style lang="scss" scoped>
.box {
  position: absolute;
  border: 3px rgb(252, 252, 143) solid;
  &:hover,
  &.active {
    background-color: rgba(144, 238, 189, 0.2);
  }
  z-index: 33;
}
</style>
