<template>
  <div>
    <b-card no-body>
      <b-tabs
        v-model="tabIndex"
        :active-nav-item-class="['bg-info', 'active-text']"
        card
      >
        <b-tab :title-link-class="linkClass(0)" title="Object Detection" class="content-area">
            <UsersCheckList :users="users" :selected="selected" :datasetName="'object detection'"/>
        </b-tab>
        <b-tab title="Organised by Case" :title-link-class="linkClass(1)" class="content-area">
            <UsersCheckList :users="users" :selected="selected" :datasetName="'organized by case'" />
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
import axios from "../../store/axios_setup";
import UsersCheckList from "@/components/admin/usersCheckList.vue"
export default {
  components:{
    UsersCheckList
  },
  data() {
    return {
      tabIndex: 0,
      selected: [],
      users: {},
      
    };
  },methods:{
     linkClass(idx) {
      if (this.tabIndex === idx) {
        return ["bg-primary", "text-light"];
      } else {
        return ["bg-light", "text-info"];
      }
    },
  },computed: {
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
.content-area{
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 5rem;
}
</style>