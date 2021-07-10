<template>
  <div >
    <b-card no-body>
      <b-tabs v-model="tabIndex" :active-nav-item-class="['bg-info', 'active-text']" card>
        <b-tab :title-link-class="linkClass(0)" title="Object Detection">
          <b-card-text>Tab contents 1</b-card-text>
        </b-tab>
        <b-tab title="Organised by Case" :title-link-class="linkClass(1)">
          <b-card-text>Tab contents 2</b-card-text>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
      return {
        tabIndex: 0
      }
    },
    methods: {
      linkClass(idx) {
        if (this.tabIndex === idx) {
          return ['bg-primary', 'text-light']
        } else {
          return ['bg-light', 'text-info']
        }
      }
    }
};
</script>

<style scoped>
.active-text{
  color: rgb(252, 252, 143);
}
</style>