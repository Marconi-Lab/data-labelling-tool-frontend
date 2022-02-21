<template>
  <div class="container">
    <div v-for="project in data" :key="project.dataset_id">
      <div style="display: inline-block">
        <h4 class="mt-3">
          {{ project.name }} Dataset progress
          <!-- <b-button :v-b-toggle="'id'+project.dataset_id" class="btn btn-primary mx-2">
            toggle</b-button
          > -->
          <a
            class="btn btn-primary"
            style=""
            @click="
              downloadDatasetBatch({
                id: project.dataset_id,
                name: project.name,
              })
            "
          >
            Download
          </a>
        </h4>
      </div>

      <hr />
      <!-- <b-collapse :id="'id'+project.dataset_id"> -->
        <b-card
          v-for="entry in project.data"
          :key="entry.id"
          no-body
          class="overflow-hidden mt-4 custom-card"
          style=""
        >
          <b-row no-gutters>
            <b-col md="5">
              <b-card-body class="text-left">
                <p style="font-weight: bold">{{ entry.name }}</p>
                <b-card-text>
                  <p class="m-0">{{ entry.city }}, {{ entry.country }}</p>
                  <p class="m-0">{{ entry.street }}</p>
                </b-card-text>
              </b-card-body>
            </b-col>
            <b-col style="border-left: solid #dee2e6 1px" md="7 text-left px-4">
              <p class="mt-3">Progress</p>
              <b-progress
                :value="(100 * entry.images_labelled) / entry.images_total"
                variant="info"
                height="0.5em"
              >
              </b-progress>
              <p class="m-0">
                {{ entry.images_labelled }} / {{ entry.images_total }} images
                labeled
              </p>
              <button
                @click="
                  downloadDataset({
                    name: entry.name,
                    dataset_id: project.dataset_id,
                    user_id: entry.user_id,
                  })
                "
                class="btn btn-info m-1 mb-3"
              >
                download
              </button>
            </b-col>
          </b-row>
        </b-card>
      <!-- </b-collapse> -->
    </div>
  </div>
</template>

<script>
import axios from "../../store/axios_setup";
import fileDownload from "js-file-download";

// import {payload} from "../../services/project_dashboard.js";
export default {
  data() {
    return {
      data: [],
    };
  },
  methods: {
    downloadDataset(data) {
      fetch(
        `https://marconimlannotator.com/api/v1/admin/download/${data.dataset_id}/user/${data.user_id}`,
        {
          method: "GET",
          responseType: "stream",
        }
      ).then((response) => {
        const reader = response.body.getReader();
        let charsReceived = 0;
        let result = "";

        reader
          .read()
          .then(function processText({ done, value }) {
            if (done) {
              console.log("Stream complete");
              // para.textContent = result;
              return result;
            }
            const decoder = new TextDecoder();
            charsReceived += value.length;
            let chunk = value;
            chunk = decoder.decode(value);
            console.log(chunk);
            result += chunk;
            console.log(charsReceived);
            // console.log(result);
            return reader.read().then(processText);
          })
          .then((result) => {
            console.log(result);
            fileDownload(result, `${data.name} labels.csv`);
          });
      });
    },
    downloadDatasetBatch(data) {
      // const uri = `http://localhost:5000/api/v1`;
      const uri = `https://marconimlannotator.com/api/v1`
      fetch(`${uri}/admin/download/prescrip/${data.id}`, {
        method: "GET",
        params: { users: this.selectedIDs },
        responseType: "stream",
      }).then((response) => {
        const reader = response.body.getReader();
        let charsReceived = 0;
        let result = "";

        reader
          .read()
          .then(function processText({ done, value }) {
            if (done) {
              console.log("Stream complete");
              // para.textContent = result;
              return result;
            }
            const decoder = new TextDecoder();
            charsReceived += value.length;
            let chunk = value;
            chunk = decoder.decode(value);
            console.log(chunk);
            result += chunk;
            console.log(charsReceived);
            // console.log(result);
            return reader.read().then(processText);
          })
          .then((result) => {
            console.log(result);
            fileDownload(result, `${data.name}.csv`);
          });
      });
    },
  },
  created() {
    axios.get(`/admin/project-dashboard/1`).then((res) => {
      this.data = res.data;
      console.log(res.data);
    });
  },
};
</script>

<style>
.container {
  height: 90vh;
  overflow-y: scroll;
}
.custom-card {
  border-radius: 1.5rem;
  -webkit-box-shadow: 5px 5px 15px 8px rgba(0, 0, 0, 0.06);
  box-shadow: 5px 5px 15px 8px rgba(0, 0, 0, 0.06);
}
</style>