<template>
  <b-row style="margin: 0px" class="mt-2 container mx-auto">
    <a class="text-info" @click="handleLoadPrevious">&lt;&lt; previous</a>
    <h4 v-if="labelled" class="text-info mx-auto">
      {{ name }} is labelled {{ label }}
    </h4>
    <h4 v-else class="text-danger">{{ name }} is not labelled</h4>
    <a class="text-info" @click="handleLoadNext">next &gt;&gt;</a>
  </b-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleLoadNext(e) {
      e.preventDefault();
    },
    handleLoadPrevious(e) {
      e.preventDefault();
    },
  },
  props: {
    name: String,
    label: String,
    labelled: Boolean,
    itemid: Number,
  },
};
</script>

<style>
a:hover {
  text-decoration: none;
  /* background-color: rgb(252, 252, 143); */
  border-radius: 2px;
  cursor: pointer;
}
</style>
