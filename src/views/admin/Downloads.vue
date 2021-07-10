<template>
  <div>
    <b-card no-body>
      <b-tabs
        v-model="tabIndex"
        :active-nav-item-class="['bg-info', 'active-text']"
        card
      >
        <b-tab :title-link-class="linkClass(0)" title="Object Detection">
          <b-card-text>
            <div class="container p-0">
              <h5 class="text-info text-center mt-1 pb-0 mb-1">Select annotators to include</h5>
              <hr class="m-0">
              <b-form-checkbox-group
                id="checkbox-group-2"
                v-model="selected"
                name="flavour-2"
              >
                <b-row cols="1" cols-sm="1" cols-md="2" cols-lg="4">
                  <b-col v-for="user in users" :key="user.id" class="text-left"
                    ><b-form-checkbox class="mt-3 box" name="box" :value="user.id">{{
                      user.username
                    }}</b-form-checkbox></b-col
                  >
                </b-row>
              </b-form-checkbox-group>
              <input type="checkbox" class="btn btn-info" @click="selectAll(this)">
              <p>Selected: {{ selected }}</p>
            </div>
          </b-card-text>
        </b-tab>
        <b-tab title="Organised by Case" :title-link-class="linkClass(1)">
          <b-card-text>
            <div class="container"></div>
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
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-primary", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },selectAll(source){
      const checkboxes = document.getElementsByClassName("box")
      console.log("This", source)
      console.log("Checkboxes", checkboxes)
      for(var checkbox in checkboxes){
        checkbox.checked = source.checked
      }
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
.container{
  border: 1px solid rgb(207, 207, 207);
  border-radius: 1rem;
}
</style>