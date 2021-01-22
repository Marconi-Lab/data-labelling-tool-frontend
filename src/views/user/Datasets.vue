<template>
  <div>
      <b-breadcrumb :items="items"></b-breadcrumb>
      <b-table :fields="fields" :items="datasets">
          <template #cell(index)="data">
               <p style="max-width: 200px;" class="text-left pl-3">{{ data.index + 1 }}</p>
          </template>
          <template #head(index)="data">
               <p style="max-width: 200px;" class="text-left pl-3">{{ data.label }}</p>
          </template>
            <!-- A custom formatted column -->
            <template #cell(dataset)="data">
                <p class="text-info text-left"><router-link :to="`/user/datasets/${data.value}`">{{ data.value }}</router-link></p>
            </template>
          <template #head(dataset)="data">
               <p class="text-left">{{ data.label }}</p>
          </template>
      </b-table>
  </div>
</template>

<script>
export default {
    name: "user-datasets",
    data() {
        return {
            items: [
                {
                    text: 'datasets',
                    href: '/user/datasets',
                    active: true
                }
            ],
            fields: [
                "index",
                "dataset"
            ],
            datasets: [
                {
                    _id: 1,
                    dataset: "Cervix Infection"
                },
                {
                    _id: 2,
                    dataset: "COVID19 Lung Ultrasound UltrasoundUltrasoundUltrasound"
                }
            ]
        }
    }
}
</script>

<style>

</style>