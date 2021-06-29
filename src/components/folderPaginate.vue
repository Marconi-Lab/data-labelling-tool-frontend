<template>
  <b-row style="margin: 0px" class="mt-2 container mx-auto">
    <a class="text-info" @click="handleLoadPrevious">&lt;&lt; previous</a>
    <h4 v-if="labelled" class="text-info mx-auto">
      {{ name }} is labelled {{ label }}
    </h4>
    <h4 v-else class="text-danger mx-auto">{{ name }} is not labelled</h4>
    <a class="text-info" @click="handleLoadNext">next &gt;&gt;</a>
  </b-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      data: "",
      dataset: {},
    };
  },
  computed: {
    ...mapGetters(["currentDataset"]),
    currentFolderID() {
      var itemID = this.itemid;
      return this.dataset.indexOf(
        Object.values(this.dataset).filter((x) => x.id == itemID)[0]
      );
    },
  },
  methods: {
    async handleLoadNext(e) {
      e.preventDefault();

      this.$store.commit("isLoading", true);
      await this.$store.dispatch(
        "getUserItem",
        this.dataset[this.currentFolderID + 1].id
      );
      this.$router.push({
        params: { id: this.dataset[this.currentFolderID + 1].id },
      });
      this.$store.commit("isLoading", false);
    },
    async handleLoadPrevious(e) {
      e.preventDefault();
      this.$store.commit("isLoading", true);
      await this.$store.dispatch(
        "getUserItem",
        this.dataset[this.currentFolderID - 1].id
      );
      this.$router.push({
        params: { id: this.dataset[this.currentFolderID - 1].id },
      });
      this.$store.commit("isLoading", false);
    },
  },
  created() {
    console.log("currentDataset", this.currentDataset, []);
    this.dataset = JSON.parse(localStorage.getItem("currentDataset"));
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
