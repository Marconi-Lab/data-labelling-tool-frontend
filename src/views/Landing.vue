<template>
  <div id="landing-page">
    <Navigation />
    <div class="m-5"><hr /></div>
    <div class="container text-left pt-4">
      <h3 class="my-5">
        A Computer-Aided Diagnosis System for Cervical Cancer From Colposcopic
        Images
      </h3>
      <h4 class="text-center">Partners</h4>
      <div class="row">
        <div class="col-sm-6 col-md-3 d-flex align-items-middle py-2">
          <img
            class="partners-logo"
            src="../../src/assets/marconi_lab.png"
            alt=""
          />
        </div>
        <div class="col-sm-6 col-md-3 d-flex align-items-middle py-2">
          <img class="partners-logo" src="../../src/assets/air.png" alt="" />
        </div>
        <div class="col-sm-6 col-md-3 d-flex align-items-middle py-2">
          <img class="partners-logo" src="../../src/assets/uci.png" alt="" />
        </div>
        <div class="col-sm-6 col-md-3 d-flex align-items-middle py-2">
          <img class="partners-logo" src="../../src/assets/muk.png" alt="" />
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-3 side-navigation">
          <h5>Content</h5>
          <ul>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#data-collection">Data Collection</a></li>
            <li><a href="#model-training">Model Training</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#deployment">Deployment</a></li>
            <li><a href="#acknowledgement">Acknowledgement</a></li>
          </ul>
        </div>
        <div class="col-md-9">
          <div class="content">
            <h4 id="introduction">Introduction</h4>
            <p>
              Cervical cancer is a major public health problem affecting
              middle-aged women, especially in less privileged countries all
              over the world. It is a highly preventable disease and thus early
              screening stands for the most effective strategy to minimize the
              global challenge of cervical cancer. However, there are not many
              economical and accurate solutions out there to help with
              diagnosing the disease. Our work provides a relatively cheap and
              accurate alternative to diagnosie cervical cancer from colposcopy
              images with machine learning.
            </p>
            <h4 id="data-collection">Data Collection</h4>
            <p>
              Cervical colposcopy images and corresponding attributes were
              collected from various locations in partnership with Uganda Cancer
              Institute. Locations included; Arua, Mayuge, Mbarara, Kampala, and
              Jinja. The primary tool for collecting field data was the Open
              Data Kit (ODK). An ODK form instance was captured for every
              patient case recording images taken both before staining the
              cervix with acetic acid and after staining. A tool was developed
              to annotate the data.
            </p>
            <h4 id="model-training">Model Training</h4>
            <p>
              Given a limited dataset shown in Table 1, we used transfer
              learning with the VGG19 CNN pretrained weights. We trained a deep
              learning classfication model and an ensemble model.
            </p>
            <img
              class="content-image"
              src="../../src/assets/Untitled Diagram.drawio (1).jpg"
              alt=""
            />
            <h4 id="results">Results</h4>
            <p>
              Our single best model achieved 97% percent specificity and 77%
              specificity. Our ensemble model achieved 98% sensitivity and 82%.
            </p>
            <h4 id="deployment">Deployment</h4>
            <p>
              We are looking at three modes of deployment: 1) Mobile application
              for easy access POC 2) web application for access via the web 3)
              Application Programming Interface for integration into software
              systems.
            </p>

            <h4 id="acknowledgement">Acknowledgement</h4>
            <p>
              We would like to express our thanks to the Research and
              Innovations Fund (RIF) for funding this project and partners
              through Makerere University and the Uganda Cancer Institute (UCI)
              for the support and collaborative efforts.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/navigation.vue";
export default {
  name: "landing-page",
  components: {
    Navigation,
  },
};
</script>

<style scoped>
html {
  scroll-behavior: smooth !important;
}
#landing-page {
  /* background-color: 	#5bc0de;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/1.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center; */
  /* background-repeat: space; */
}
* {
  font-family: "Plus Jakarta Sans", sans-serif;
  color: black;
}
p {
  font-size: 18px;
}
h3 {
  text-align: center;
}
h4 {
  font-weight: bold;
}
.content-image {
  width: 100%;
  height: auto;
}
.partners-logo {
  max-width: 180px;
  max-height: 100px;
  display: block;
  margin: auto;
  z-index: -1;
}
.content {
  height: 85vh !important;
  overflow: scroll;
}
.row {
  z-index: -1;
}
@media screen and (min-width: 767px) {
  h3 {
    font-weight: bold;
    font-size: 2rem;
    text-align: center;
  }
}
@media screen and (max-width: 766px) {
  .container {
    padding: 0px;
  }
  .side-navigation {
    display: none;
  }
}
</style>
