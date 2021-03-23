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
  border: 2px aqua solid;
  &:hover,
  &.active {
    background-color: rgba(144, 238, 144, 0.2);
  }
  z-index: 33;
}
</style>
