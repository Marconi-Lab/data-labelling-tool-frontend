<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <!-- <b-pagination> -->
    <b-pagination size="md" :total-rows="rows" v-model="currentPage" per-page="7"></b-pagination>
      <b-table :fields="fields" :items="data" per-page="7" :current-page="currentPage" class="mb-0 list-table">
        <template #cell(index)="data">
          <p style="max-width: 200px;" class="text-left pl-3">
            {{ data.index + 1 }}
          </p>
        </template>
        <template #head(index)="data">
          <p style="max-width: 200px;" class="text-left pl-3">
            {{ data.label }}
          </p>
        </template>
        <!-- A custom formatted column -->
        <template #cell(name)="data">
          <p class="text-info text-left">
            <router-link :to="`/user/datasets/${items[1].text}/${data.item._id}`">{{
              data.value
            }}</router-link>
          </p>
        </template>
        <template #cell(labelled)="data">
          <p :class="[data.value ? 'text-success' : 'text-danger' ]">
              <b-icon v-if="data.value" icon="check-circle-fill" scale="2" variant="success" font-scale="0.7em"></b-icon>
              <b-icon v-else icon="info-circle-fill" scale="2" variant="danger" font-scale="0.7em"></b-icon>
          </p>
        </template>
        <template #head(name)="data">
          <p class="text-left">{{ data.label }}</p>
        </template>
          <template #head(labelled)="data">
          <p class="text-center">{{ data.label }}</p>
        </template>
      </b-table>
    <!-- </b-pagination> -->
  </div>
</template>

<script>
import datasets from "@/services/datasets";
export default {
  name: "user-data-items",
  data() {
    return {
      items: [
        {
          text: "datasets",
          href: "/user/datasets",
          active: false,
        },
      ],
      fields: ["index", { key: "name", label: "data item" }, "labelled"],
      data: [],
      currentPage: 1,
      datasets
    };
  },
  computed: {
      rows(){
          return this.data.length
      }
  },
  methods: {
    getCurrent() {
      var set = datasets.filter((x) => x._id == this.$route.params.id)[0];
      return {
        text: set.name,
        active: true,
        href: `/user/datasets/${set._id}`,
      };
    },
  },
  created() {
    this.data = datasets.filter((x) => x._id == this.$route.params.id)[0].items;
    this.items[1] = this.getCurrent();
    console.log(this.items[1]);
  },
};
</script>

<style scoped>
p{
    margin-bottom: 0px;
}
.text-danger{
    color: red;
}
.text-success{
    color: green
}
.list-table{
    border: 1px solid rgb(167, 167, 167);
}
</style>
