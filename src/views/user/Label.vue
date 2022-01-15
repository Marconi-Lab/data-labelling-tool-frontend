<template>
  <div>
    <div>
      <div class="d-flex text-left" id="wrapper">
        <!-- Sidebar -->
        <div
          class="bg-light border-right"
          id="sidebar-wrapper"
          style="font-size: 0.8rem"
        >
          <h5>Complete Form</h5>
          <hr class="m-0 mb-1" />
          <!-- labels form -->
          <validation-observer ref="observer" v-slot="{ handleSubmit }">
            <b-form @submit.stop.prevent="handleSubmit(handleLoadNext)">
              <b-form-group class="list-group list-group-flush p-2">
                <p>{{ attributes[0].name }}</p>
                <validation-provider
                  name="option1"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-group>
                    <b-form-radio-group
                      v-model="form.option1.answer"
                      :options="attributes[0].values"
                      name="radios-stacked1"
                      :state="getValidationState(validationContext)"
                      stacked
                    ></b-form-radio-group>
                    <b-form-invalid-feedback id="input-2-live-feedback">{{
                      validationContext.errors[0]
                    }}</b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
                <hr class="m-1" />
                <p>{{ attributes[1].name }}</p>
                <validation-provider
                  name="option1"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-radio-group
                    v-model="form.option2.answer"
                    :options="attributes[1].values"
                    name="radios-stacked2"
                    stacked
                  ></b-form-radio-group>
                  <b-form-invalid-feedback id="input-2-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </validation-provider>
                <hr class="m-1" />
                <p>{{ attributes[2].name }}</p>
                <validation-provider
                  name="option1"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-radio-group
                    v-model="form.option3.answer"
                    :options="attributes[2].values"
                    name="radios-stacked3"
                    stacked
                  ></b-form-radio-group>
                  <b-form-invalid-feedback id="input-2-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </validation-provider>
                <hr class="m-1" />
                <p>{{ attributes[3].name }}</p>
                <validation-provider
                  name="option1"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-radio-group
                    v-model="form.option4.answer"
                    :options="attributes[3].values"
                    name="radios-stacked4"
                    stacked
                  ></b-form-radio-group>
                  <b-form-invalid-feedback id="input-2-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </validation-provider>
                <hr class="m-1" />
                <p>{{ attributes[4].name }}</p>
                <validation-provider
                  name="option1"
                  :rules="{ required: true }"
                  v-slot="validationContext"
                >
                  <b-form-radio-group
                    v-model="form.option5.answer"
                    :options="attributes[4].values"
                    name="radios-stacked5"
                    stacked
                  ></b-form-radio-group>
                  <b-form-invalid-feedback id="input-2-live-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>
              <input type="submit" id="submit-form" class="hidden" />
            </b-form>
          </validation-observer>
        </div>
        <!-- /#sidebar-wrapper -->
        <!-- Page Content -->
        <div id="page-content-wrapper">
          <nav
            class="
              navbar navbar-expand-lg navbar-secondary
              text-center
              p-1
              bg-light
              border-bottom
            "
          >
            <button
              class="btn btn-secondary ml-2"
              id="menu-toggle"
              style="font-size: 0.9rem"
            >
              Toggle form
            </button>
            <p
              class="ml-3"
              style="
                font-weight: lighter;
                font-size: 0.9rem;
                position: absolute;
                left: 7rem;
              "
            >
              {{ progress_message }}
            </p>
            <label
              style="font-size: 0.9rem; position: absolute; right: 1rem"
              class="btn btn-primary mt-2"
              for="submit-form"
            >
              load next
            </label>
          </nav>
          <div class="p-3 content-view container">
            <div
              v-if="processing"
              class="d-flex align-items-center justify-content-center"
              style="height: 80vh"
            >
              <Spinner />
            </div>
            <img v-else class="cervix-image" :src="current_image" alt="" />
          </div>
        </div>
        <!-- /#page-content-wrapper -->
      </div>
      <!-- /#wrapper -->
    </div>
  </div>
</template>

<script>
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import axios from "../../store/axios_setup";
// import {validationMixin} from ""
export default {
  data() {
    return {
      form: {
        option1: { question: "Is SCJ fully visible?", answer: "" },
        option2: {
          question:
            "Is the quality of the picture good enough to make a diagnosis?",
          answer: "",
        },
        option3: { question: "Is SCJ fully visible?", answer: "" },
        option4: { question: "What is the VIA assessment?", answer: "" },
        option5: {
          question:
            "What is the size of lesion (propotion of cervix area involved)?",
          answer: "",
        },
      },
      attributes: [
        {
          id: 1,
          name: "What is the quality of the picture?",
          values: [
            { text: "Good", value: "good" },
            { text: "Moderate", value: "moderate" },
            { text: "Bad", value: "Moderate" },
          ],
        },
        {
          id: 2,
          name: "Is the quality of the picture good enough to make a diagnosis?",
          values: [
            { text: "Yes", value: "yes" },
            { text: "No", value: "no" },
          ],
        },
        {
          id: 3,
          name: "Is SCJ fully visible?",
          values: [
            { text: "Fully Visible", value: "fully visible" },
            { text: "Only Partially Visible", value: "partially visible" },
            { text: "Not Visible", value: "not visible" },
          ],
        },
        {
          id: 4,
          name: "What is the VIA assessment?",
          values: [
            { text: "VIA negative", value: "VIA negative" },
            { text: "VIA positive", value: "VIA positive" },
            {
              text: "Suspected cancerous lesions",
              value: "suspected cancerous lesions",
            },
            { text: "Other lesions", value: "other lesions" },
            {
              text: "Not possible to determine",
              value: "not possible to determine",
            },
          ],
        },
        {
          id: 5,
          name: "What is the size of lesion (propotion of cervix area involved)?",
          type: "radio",
          values: [
            { text: "quadrant (25%)", value: "quadrant (25%)" },
            { text: "quadrants (25%-50%)", value: "quadrants(25%-50%)" },
            { text: "quadrants (50%-75%)", value: "quadrants (50%-75%)" },
            { text: "quadrants (75%-100%)", value: "quadrants (75%-100%)" },
          ],
        },
      ],
      current_image: "",
      progress: "",
      processing: true,
    };
  },
  methods: {
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
    resetForm() {},
    handleLoadNext() {
      // e.preventDefault();
      this.processing = true;
      let dataset_id = this.$route.params.id;
      return axios
        .get(`/user/images/${dataset_id}/random`, { dataset_id })
        .then((res) => {
          const data = res.data;
          console.log(data);
          this.current_image = data.image;
          this.progress = data.progress;
          this.processing = false;

          let annotations = JSON.stringify(this.form);
          let annotation_payload = {
            dataset_id: dataset_id,
            project_id: data.project_id,
            image_id: data.id,
            annotations: annotations,
          };
          //   axios.post(``);
          console.log(annotation_payload);
        });
    },
  },
  created() {
    this.processing = true;
    let dataset_id = this.$route.params.id;
    axios
      .get(`/user/images/${dataset_id}/random`, { dataset_id })
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.current_image = data.image;
        this.progress = data.progress;
        this.processing = false;
      });
  },
  computed: {
    progress_message: function () {
      return this.progress;
    },
  },
  mounted() {
    //toggle sidebar
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  },
};
</script>

<style>
body {
  overflow-x: hidden;
}
p {
  margin: 0px;
  font-weight: bold;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -20rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 20rem;
}

#page-content-wrapper {
  min-width: 100vw;
  height: 100%;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
    height: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -20rem;
  }
}
.bg-light {
  background-color: #ffffff !important;
}
#page-content-wrapper {
  background-color: white;
  overflow: fixed;
}
.link-normal {
  color: #272727;
}
.link-active {
  color: #007fff;
  background-color: #ffffff0e;
}
.cervix-image {
  max-height: 80vh;
  width: 100%;
  object-fit: contain;
}
.custom-link {
  border-bottom: solid 1px #dee2e6;
}
.custom-link:hover {
  background-color: #f8f9fa;
  text-decoration: none;
}
.content-view {
  width: 100%;
  height: 85vh;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
.hidden {
  color: #00000000;
  border: 0px;
  background-color: #00000000;
}
</style>
