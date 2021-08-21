<template>
  <div>
    <p class="text-left p-0 m-0">{{ currentSite }}</p>
    <hr class="my-1" />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentSite() {
      const path = this.$rote.path;
      if (path.includes("uci")) {
        return "UCI";
      } else if (path.includes("mayuge")) {
        return "Mayuge";
      } else if (path.includes("mbarara")) {
        return "Mbarara";
      } else if (path.includes("jinja")) {
        return "Jinja";
      } else {
        return "Arua";
      }
    },
  },
};
</script>

<style>
</style>