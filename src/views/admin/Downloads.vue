<template>
  <div>
    <b-card no-body>
      <b-tabs
        v-model="tabIndex"
        :active-nav-item-class="['bg-info', 'active-text']"
        card
      >
        <b-tab :title-link-class="linkClass(0)" title="Object Detection">
          <div>
            <b-card-text>
              <div class="container ct1 px-0 pb-3">
                <div>
                  <h5 class="text-info text-center mt-1 p-2 pl-5 mb-1">
                    Select annotators to include
                  </h5>
                </div>
                <hr class="m-0" />
                <div>
                  <b-form-checkbox-group
                    id="checkbox-group-2"
                    v-model="selected"
                    name="flavour-2"
                    class="px-3"
                  >
                    <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="4">
                      <b-col
                        v-for="user in users"
                        :key="user.id"
                        class="text-left"
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
            <div class="px-3">
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
                @click="downloadObjectDetection"
                :disabled="isDisabled"
              >
                Download
              </b-btn>
            </div>
          </div>
        </b-tab>
        <b-tab title="Organised by Case" :title-link-class="linkClass(1)">
          <b-card-text>
            <div class="container p-0 pb-3">
              <h5 class="text-info text-center mt-1 p-2 mb-1">
                Select annotators to include
              </h5>
              <hr class="m-0" />
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
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
              <b-form-checkbox
                v-model="allSelected"
                :indeterminate="indeterminate"
                type="checkbox"
                @change="selectAll"
                class="mt-1"
                >Select All</b-form-checkbox
              >
            </div>
          </b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from "../../store/axios_setup";

export default {
  data() {
    return {
      tabIndex: 0,
      selected: [],
      users: {},
      allSelected: false,
      indeterminate: false,
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-primary", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },
    selectAll(checked) {
      this.selected = checked ? this.users.map((x) => x.id) : [];
    },
    downloadObjectDetection() {},
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
  },computed: {
    isDisabled(){
      return this.selected.length? false: true
    }
  },
  created() {
    axios.get(`/admin/users/`).then((res) => {
      console.log(res);
      this.users = res.data;
    });
  },
};
</script>

<style scoped>
.ct1 {
  border: 1px solid rgb(207, 207, 207);
  border-radius: 0.4rem;
}
</style>