<template>
  <div>
    <b-breadcrumb class="mb-0" :items="items"></b-breadcrumb>

    <vue-good-table
      :columns="fields"
      :rows="data"
      :pagination-options="{
        enabled: true,
        perPage: 7,
      }"
      :search-options="{
        enabled: true,
        placeholder: 'Search this table',
      }"
      :sort-options="{
        enabled: false,
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'name'">
          <b-icon
            icon="folder"
            variant="info"
            style="float: left; font-weight: bold; font-size: 1.3rem; margin-right: 20px; margin-top: 4px;"
          >
          </b-icon>
          <router-link
            class="text-info"
            :to="`/user/datasets/${items[1].text}/${props.row._id}`"
            >{{ props.row.name }}</router-link
          >
        </span>
        <span v-if="props.column.field == 'labelled'">
          <b-icon
            v-if="props.row.labelled"
            icon="check-circle-fill"
            scale="2"
            variant="info"
            font-scale="0.5em"
          ></b-icon>
          <b-icon
            v-else
            icon="info-circle-fill"
            scale="2"
            variant="danger"
            font-scale="0.5em"
          ></b-icon>
        </span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import datasets from "@/services/datasets";
import { VueGoodTable } from "vue-good-table";
export default {
  name: "user-data-items",
  components: {
    VueGoodTable,
  },
  data() {
    return {
      items: [
        {
          text: "datasets",
          href: "/user/datasets",
          active: false,
        },
      ],
      fields: [
        { field: "name", label: "Name" },
        { field: "labelled", label: "Labelled" },
      ],
      data: [],
      currentPage: 1,
      datasets,
    };
  },
  computed: {
    rows() {
      return this.data.length;
    },
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
p {
  margin-bottom: 0px;
}
.text-danger {
  color: red;
}
.text-success {
  color: green;
}
.list-table {
  border: 1px solid rgb(167, 167, 167);
}
</style>
