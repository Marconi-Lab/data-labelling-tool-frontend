<template>
  <div>
    <b-breadcrumb class="mb-0" :items="items"></b-breadcrumb>
    <div
      v-if="processing"
      class="d-flex align-items-center justify-content-center"
      style="height: 65vh"
    >
      <Spinner />
    </div>
    <div v-else>
      <vue-good-table
        :columns="fields"
        :rows="currentDataset"
        :pagination-options="{
          enabled: true,
          perPage: 8,
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
              :to="`/user/datasets/${items[1].text}/${props.row.id}`"
              >{{ props.row.name }}</router-link
            >
          </span>
          <span v-if="props.column.field == 'labelled'">
            <b-icon
              v-if="props.row.labelled"
              icon="check-circle-fill"
              variant="info"
              font-scale="1em"
            ></b-icon>
            <b-icon
              v-else
              icon="X-circle"
              variant="danger"
              font-scale="1em"
            ></b-icon>
          </span>
        </template>
      </vue-good-table>
    </div>
  </div>
</template>

<script>
import datasets from "@/services/datasets";
import { VueGoodTable } from "vue-good-table";
import { mapGetters } from "vuex";
import axios from "../../store/axios_setup";

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
        {
          text: "",
          href: "",
          active: true,
        },
      ],
      fields: [
        { field: "name", label: "Name" },
        { field: "labelled", label: "Labelled" },
      ],
      // data: [],
      currentPage: 1,
      datasets,
      processing: true,
    };
  },
  computed: {
    ...mapGetters(["currentDataset"]),
    rows() {
      return this.data.length;
    },
  },
  methods: {},
  created() {
    axios.get(`/user/datasets/${this.$route.params.id}/`).then((res) => {
      console.log("Response here", res);
      // this.data = res.data.items;
      localStorage.setItem("currentDataset", JSON.stringify(res.data.items));
      // this.$store.commit("currentDataset", res.data.items);
      this.processing = false;
      this.items[1].text = res.data.name;
      this.items[1].href = `/user/datasets/${res.data.id}`;
    });
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
