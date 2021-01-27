<template>
  <div>
    <b-breadcrumb class="mb-0" :items="items"></b-breadcrumb>
    <b-nav style="position: absolute; z-index: 2222; right:0; top: 3.8em;">
      <b-form-file v-model="images" placeholder="Add Files" multiple class="text-info" :onchange="handleFilesUpload()"> here </b-form-file>
    </b-nav>
    <vue-good-table
      :columns="fields"
      :rows="data"
      :pagination-options="{
        enabled: true,
        perPage: 8,
      }"
      :sort-options="{
        enabled: false,
      }"
    >
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'name'">
          <router-link
            class="text-info"
            :to="`/admin/datasets/${items[1].text}/${props.row._id}`"
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
        <span v-if="props.column.field == '_id'">
          <b-icon
            icon="trash"
            variant="danger"
            class="delete-icon"
            style="float: left; font-weight: bold; font-size: 1.3rem;"
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
          href: "/admin/datasets",
          active: false,
        },
      ],
      fields: [
        { field: "name", label: "Name" },
        { field: "labelled", label: "Labelled" },
        { field: "_id", label: "Delete" },
      ],
      data: [],
      currentPage: 1,
      datasets,
      images: []
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
    handleFilesUpload(){
      console.log(this.images)
    }
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
