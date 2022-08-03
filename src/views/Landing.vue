<template>
  <div id="landing-page">
    <Navigation />
    <section>
      <div class="m-4"><hr /></div>
    </section>
    <div style="position: relative">
      <div class="cover-text">
        <h1 class="my-5 text-white container">
          A Computer-Aided Diagnosis System for Cervical Cancer From Colposcopic
          Images
        </h1>
      </div>
      <img class="cover-img" height="500" src="../assets/ccancer.png" alt="" />
    </div>
    <h3 class="text-center p-2 mt-2">Team</h3>
    <hr />
    <div class="container p-4">
      <div class="row">
        <div class="col-sm-6 col-md-3 margin-auto py-2">
          <img class="team" src="../../src/assets/team/dr_andrew.png" alt="" />
          <p class="pt-4">Dr. Andrew Katumba</p>
        </div>
        <div class="col-sm-6 col-md-3 margin-auto py-2">
          <img class="team" src="../../src/assets/team/drhanfa.png" alt="" />
          <p class="pt-4">Dr. Hanifa Nabuuma</p>
        </div>
        <div class="col-sm-6 col-md-3 margin-auto py-2">
          <img class="team" src="../../src/assets/team/drjoy.png" alt="" />
          <p class="pt-4">Dr. Joyce Nabende-Nakatumba</p>
        </div>
        <div class="col-sm-6 col-md-3 margin-auto py-2">
          <img class="team" src="../../src/assets/team/jb.png" alt="" />
          <p class="pt-4">Dr. Johnblack Kabukye</p>
        </div>
        <div class="col-sm-6 col-md-3 margin-auto py-2">
          <img class="team" src="../../src/assets/team/ben.png" alt="" />
          <p class="pt-4">Ben Wycliff Mugalu</p>
        </div>
        <div class="col-sm-6 col-md-3 margin-auto py-2">
          <img class="team" src="../../src/assets/team/chod.png" alt="" />
          <p class="pt-4">Chodrine Mutebi</p>
        </div>
      </div>
    </div>
    <h3 class="text-center p-2 mt-2">Knowledge</h3>
    <hr />

    <div class="text-left container">
      <div class="row m-0">
        <div class="col-md-3 side-navigation">
          <h5 class="pl-1 pt-3">Content</h5>
          <ul>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#data-collection">Data Collection</a></li>
            <li><a href="#model-training">Model Training</a></li>
            <li><a href="#results">Results</a></li>
            <li><a href="#deployment">Deployment</a></li>
            <li><a href="#acknowledgement">Acknowledgement</a></li>
          </ul>
        </div>
        <div class="col-md-9 p-0 pt-3 pl-3">
          <div class="content">
            <h5 id="introduction">Introduction</h5>
            <p>
              Cervical cancer (CaCx) is a major public health problem affecting
              middle-aged women, especially in less privileged countries all
              over the world. In 2018, approximately 570000 cases were recorded
              311,000 being deaths.
            </p>
            <p>
              CaCx is highly preventable through vaccination against HPV, and
              screening and treatment of cervical lesions. However, vaccination
              rates in Uganda are &lt; 25% while CaCx screening coverage is &lt;
              5%.
            </p>
            <p>
              Our work provides a relatively cheap and accurate alternative to
              diagnosie cervical cancer from colposcopy images with machine
              learning.
            </p>
            <h5 id="data-collection">Data Collection</h5>
            <p>
              Colposcopy images and corresponding clinical data were collected
              from 5 CaCx screening clinics in different regions of Uganda in
              partnership with Uganda Cancer Institute. The primary tool for
              collecting field data was the Gynocular portable colposcope and
              the Open Data Kit (ODK) app. An ODK form instance was captured for
              every patient case recording images taken both before and after
              staining the cervix with acetic acid. A tool was developed to
              annotate the data.
            </p>
            <img src="../assets/label1.png" alt="" class="content-image pt-3" />
            <p class="text-center">
              <small class="">Figure: Image labels annotation interface</small>
            </p>
            <img src="../assets/label2.png" alt="" class="content-image pt-3" />
            <p class="text-center">
              <small class=""
                >Figure: Cervix localization annotation interface</small
              >
            </p>

            <h5 id="model-training">Model Training</h5>
            <p>
              Given a limited dataset shown in Table 1, we used transfer
              learning with the VGG19 CNN pretrained weights. We trained a deep
              learning classfication model and an ensemble model.
            </p>
            <p class="text-center">
              <small class=""
                >Table 1: Table showing how the image dataset was
                partitioned</small
              >
            </p>
            <table class="table table-bordered">
              <thead class="table-primary">
                <tr>
                  <th scope="col">Class</th>
                  <th scope="col">Train</th>
                  <th scope="col">Test</th>
                  <th scope="col">Validation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Negative</td>
                  <td>908</td>
                  <td>203</td>
                  <td>97</td>
                </tr>
                <tr>
                  <td>Positive</td>
                  <td>901</td>
                  <td>203</td>
                  <td>97</td>
                </tr>
                <tr>
                  <td>Positive</td>
                  <td>1809</td>
                  <td>406</td>
                  <td>194</td>
                </tr>
              </tbody>
            </table>
            <!-- <h5>Model Architecture (VGG19 pretrained weights)</h5>
            <img
              class="content-image"
              src="../../src/assets/Untitled Diagram.drawio (1).jpg"
              alt=""
            />
            <p class="text-center">
              <small class="">Figure 1: Model architecture diagram</small>
            </p> -->
            <h5 id="results">Results</h5>
            <p>
              Our single best model achieved 97% percent specificity and 77%
              specificity. Our ensemble model achieved 98% sensitivity and 82%.
            </p>
            <!-- <img src="../assets/results1.png" alt="" class="content-image" /> -->
            <!-- <p class="text-center">
              <small class=""
                >Figure: Single best model reciever operator characteristic on
                the left and confusion matrix on the right</small
              >
            </p> -->
            <h5 id="deployment">Deployment</h5>
            <p>
              We are looking at three modes of deployment: 1) Mobile application
              for easy access POC 2)
              <a
                class="text-primary"
                style="display: inline"
                href="https://marconilab.org/tools/predict-cervical-cancer"
                >web application</a
              >
              for access via the web 3) Application Programming Interface for
              integration into software systems.
            </p>
            <img
              src="../assets/deploy1.png"
              class="content-image"
              alt=""
              style="max-width: 350px"
            />
            <p class="text-center">
              <small class="">Figure: Mobile application deployment</small>
            </p>
            <img src="../assets/deploy2.png" class="content-image" alt="" />
            <p class="text-center">
              <small class="">Figure: Web application deployment</small>
            </p>
            <h5 id="acknowledgement">Acknowledgement</h5>
            <p>
              We would like to express our thanks to the Research and
              Innovations Fund (RIF) for funding this project and partners
              through Makerere University and the Uganda Cancer Institute (UCI)
              for the support and collaborative efforts.
            </p>
            <h5>Partners</h5>
            <div class="row">
              <div
                class="
                  col-sm-6 col-md-4
                  d-flex
                  align-items-middle
                  py-2
                  partner-logo
                "
              >
                <img
                  class="partners-logo"
                  src="../../src/assets/marconi_lab.png"
                  alt=""
                />
              </div>
              <div
                class="
                  col-sm-6 col-md-4
                  d-flex
                  align-items-middle
                  py-2
                  partner-logo
                "
              >
                <img
                  class="partners-logo"
                  src="../../src/assets/air.png"
                  alt=""
                />
              </div>
              <div
                class="
                  col-sm-6 col-md-4
                  d-flex
                  align-items-middle
                  py-2
                  partner-logo
                "
              >
                <img
                  class="partners-logo"
                  src="../../src/assets/uci.png"
                  alt=""
                />
              </div>
              <div
                class="
                  col-sm-6 col-md-4
                  d-flex
                  align-items-middle
                  py-2
                  partner-logo
                "
              >
                <img
                  class="partners-logo"
                  src="../../src/assets/emergent.jpeg"
                  alt=""
                />
              </div>
              <div
                class="
                  col-sm-6 col-md-4
                  d-flex
                  align-items-middle
                  py-2
                  partner-logo
                "
              >
                <img
                  class="partners-logo"
                  src="../../src/assets/muk.png"
                  alt=""
                />
              </div>
            </div>
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
  font-family: "Oxygen", sans-serif;
  color: black;
}
p {
  font-size: 16px;
}
h5 {
  font-weight: 600;
  padding-top: 20px;
}
/* h5 {
  font-weight: bold;
} */
li {
  list-style-type: none;
}
a {
  display: block;
  text-decoration: none;
  padding-left: 0.2rem;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
  width: 12vw;
  height: 100%;
  font-weight: 400;
}
a:hover {
  color: #00a6ff;
}
ul {
  padding: 0px;
}

.cover-img {
  width: 100%;
  object-fit: cover;
  animation-name: zoom-cover-image;
  animation-duration: 5s;
}
.cover-text {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.286);
}
.header-back {
  height: 30vh;
  width: 100vw;
  background-image: url("../assets/marconi_lab.png");
  background-repeat: no-repeat;
  background-size: fit;
}
.header {
}
.content-image {
  display: block;
  width: 100%;
  height: auto;
  margin: auto;
}
.partners-logo {
  max-width: 150px;
  max-height: 100px;
  display: block;
  margin: auto;
  z-index: -1;
}
.content {
  height: 85vh !important;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
}
.row {
  z-index: -1;
}
.team {
  height: 180px;
  width: 180px;
}
.side-navigation {
  border: 1px solid rgb(116, 116, 116);
}
.partners-logo {
  height: 300px;
  object-fit: contain;
}
@media screen and (max-width: 766px) {
  .container {
    padding: 0px;
  }
  .side-navigation {
    display: none;
  }
  .content {
    height: 100% !important;
    overflow-x: hidden;
    overflow-y: scroll;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    width: 100vw;
  }
}
</style>
