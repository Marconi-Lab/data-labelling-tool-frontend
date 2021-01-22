<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
    <b-table :fields="fields" :items="datasets">
      <template #cell(index)="data">
        <p style="max-width: 200px;" class="text-left pl-3">
          {{ data.index + 1 }}
        </p>
      </template>
      <template #head(index)="data">
        <p style="max-width: 200px;" class="text-left pl-3">{{ data.label }}</p>
      </template>
      <!-- A custom formatted column -->
      <template #cell(name)="data">
        <p class="text-info text-left">
          <router-link :to="`/user/datasets/${data.item._id}`">{{
            data.value
          }}</router-link>
        </p>
      </template>
      <template #head(name)="data">
        <p class="text-left">{{ data.label }}</p>
      </template>
    </b-table>
  </div>
</template>

<script>
import datasets from "@/services/datasets.js";
export default {
  name: "user-datasets",
  data() {
    return {
      items: [
        {
          text: "datasets",
          href: "/user/datasets",
          active: true,
        },
      ],
      fields: ["index", { key: "name", label: "dataset" }],
      datasets,
    };
  },
};
</script>

<style></style>
