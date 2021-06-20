<template>
  <div id="app">
    <Loading
      :active.sync="isLoading"
      :is-full-page="true"
      color="#17a2b8"
      background-color="#000"
      :opacity="0.3"
    />
    <div
      v-if="isUploading"
      class=""
      style="width: 40rem; right: 1rem; bottom: 0.8rem; position: absolute; z-index: 333;"
    >
      <b-alert show>
        <b-icon
          icon="x-circle"
          style="float: right; margin-left: 1.2rem; cursor: pointer"
          @click="stopUpload"
        ></b-icon>

        <b-progress
          :value="uploadValue"
          :max="uploadMaxValue"
          show-progress
          animated
        ></b-progress>
      </b-alert>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Loading,
  },
  computed: {
    ...mapGetters([
      "isLoading",
      "uploadValue",
      "uploadMaxValue",
      "isUploading",
    ]),
  },
  methods: {
    stopUpload() {
      this.$store.commit("isUploading", false);
    },
  },
};
</script>

<style>
@import "~vue-good-table/dist/vue-good-table.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
/* width */
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #17a2b8;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #0f5e6a;
}
</style>
