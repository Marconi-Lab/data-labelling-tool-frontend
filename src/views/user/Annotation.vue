<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
  </div>
</template>

<script>
import datasets from "@/services/datasets"
export default {
  name: "annotations",
  data() {
    return {
      datasets,
      items: [
        {
          text: "datasets",
          href: "/user/datasets",
          active: false,
        },
      ],
    };
  },
  methods: {
      previous(){
          const dataset = datasets.filter(x => x.name == this.$route.params.dataset)[0]
          return {text: this.$route.params.dataset, href: `/user/datasets/${dataset._id}`, active: false}
      },
      current(){
          return {text: "current item", href: `/user/datasets/${this.$route.params.dataset}/${this.$route.params.id}`}
      }
  },
  created(){
      this.items.push(this.previous())
      this.items.push(this.current())
  }
};
</script>

<style></style>
