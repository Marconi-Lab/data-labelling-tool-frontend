<template>
  <div>
    <b-card-text>
      <div class="container container-custom ct1 px-0 pb-3">
        <div>
          <h5 class="text-info text-center mt-1 p-2 pl-5 mb-1">
            Select annotators to include
          </h5>
        </div>
        <hr class="m-0" />
        <div>
          <b-form-checkbox-group
            id="checkbox-group-2"
            v-model="selectedIDs"
            name="flavour-2"
            class="px-3"
          >
            <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="4">
              <b-col v-for="user in users" :key="user.id" class="text-left"
                ><b-form-checkbox
                  class="mt-3 box"
                  name="box"
                  :value="user.id"
                  >{{ user.username }}</b-form-checkbox
                ></b-col
              >
            </b-row>
          </b-form-checkbox-group>
        </div>
      </div>
    </b-card-text>

    <div class="px-3 pt-4 container">
      <b-form-checkbox
        v-model="allSelected"
        :indeterminate="indeterminate"
        type="checkbox"
        @change="selectAll"
        class="mt-1"
        style="float: left"
        >Select All
      </b-form-checkbox>
      <b-btn
        style="float: right"
        class="btn btn-info mb-2"
        @click="downloadDataset"
        :disabled="isDisabled"
      >
        Download {{ datasetName + " dataset" }}
      </b-btn>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "../../store/axios_setup";
import fileDownload from "js-file-download";
export default {
  data() {
    return {
      selectedIDs: [],
      allSelected: false,
      indeterminate: false,
    };
  },
  props: ["users", "selected", "datasetName"],
  methods: {
    selectAll(checked) {
      this.selectedIDs = checked ? this.users.map((x) => x.id) : [];
    },
    downloadBlob(blob, filename) {
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    downloadDataset() {
      if (this.datasetName === "object detection") {
        fetch(`https://marconimlannotator.com/api/v1/admin/download/object_detection?users[]=${this.selectedIDs.join("&users[]=")}`, {
          method: "GET",
          params: { users: this.selectedIDs },
          responseType: "stream",
        }).then((response) => {
          const reader  = response.body.getReader();
          let charsReceived = 0;
          let result = "";

          reader.read().then(function processText({done, value}){
            if(done){
              console.log("Stream complete");
              // para.textContent = result;
              return result
            }
            const decoder = new TextDecoder();
            charsReceived += value.length;
            let chunk = value;
            chunk = decoder.decode(value);
            console.log(chunk)
            result += chunk;
            console.log(charsReceived);
            // console.log(result);
            return reader.read().then(processText);

          }).then(result=> {
            console.log(result)
            fileDownload(result, "object_detection.csv")
          })
        }
     
        );
        
      } else {
         fetch(`https://marconimlannotator.com/api/v1/admin/download/by_case?users[]=${this.selectedIDs.join("&users[]=")}`, {
          method: "GET",
          params: { users: this.selectedIDs },
          responseType: "stream",
        }).then((response) => {
          const reader  = response.body.getReader();
          let charsReceived = 0;
          let result = "";

          reader.read().then(function processText({done, value}){
            if(done){
              console.log("Stream complete");
              // para.textContent = result;
              return result
            }
            const decoder = new TextDecoder();
            charsReceived += value.length;
            let chunk = value;
            chunk = decoder.decode(value);
            console.log(chunk)
            result += chunk;
            console.log(charsReceived);
            // console.log(result);
            return reader.read().then(processText);

          }).then(result=> {
            console.log(result)
            fileDownload(result, "organised_by_case.csv")
          })
        }
     
        );
      }
    },
  },
  watch: {
    selected(newValue) {
      // Handle changes in individual user checkboxes
      if (newValue.length === 0) {
        this.indeterminate = false;
        this.allSelected = false;
      } else if (newValue.length === this.users.length) {
        this.indeterminate = false;
        this.allSelected = true;
      } else {
        this.indeterminate = true;
        this.allSelected = false;
      }
    },
  },
  computed: {
    isDisabled() {
      return this.selectedIDs.length ? false : true;
    },
  },
  created() {
    this.selectedIDs = this.selected;
  },
};
</script>

<style>
.container-custom {
  border: 1px solid rgb(207, 207, 207);
  border-radius: 0.4rem;
}
</style>