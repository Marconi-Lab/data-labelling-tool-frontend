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

<style lang="scss">
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";
@import "~bootstrap/scss/card";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/root";
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/grid";
@import "~bootstrap/scss/custom-forms";
@import "~bootstrap/scss/forms";
@import "~bootstrap/scss/progress";
@import "~bootstrap/scss/buttons";
@import "~bootstrap/scss/button-group";
@import "~bootstrap/scss/input-group";
@import "~bootstrap/scss/card";
@import "~bootstrap/scss/list-group";
@import "~bootstrap/scss/modal";
@import "~bootstrap/scss/utilities";
@import "~bootstrap/scss/nav";
@import "~bootstrap/scss/navbar";
@import "~bootstrap/scss/breadcrumb";
@import "~bootstrap/scss/modal";
@import "~bootstrap/scss/tables";
@import "~bootstrap/scss/close";

@import "~bootstrap/scss/bootstrap";


@import "~vue-good-table/dist/vue-good-table.css";
.modal-backdrop{
  background-color: rgba(0, 0, 0, 0.419);
}
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
