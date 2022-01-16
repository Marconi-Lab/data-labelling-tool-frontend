<template>
  <div>
    <Navigation />
    <main>
      <section class="main-body">
        <div class="form-card">
          <ValidationObserver ref="observer">
            <form
              slot-scope="{ validate }"
              @submit.prevent="validate().then(handleRegister)"
            >
              <div class="text-center">
                <h3 class="text-info p-0 mt-3 mb-1">Signup</h3>
              </div>
              <div
                class="form-group m-0 justify-content-center"
                style="width: 100%"
              >
                <ValidationProvider rules="required" name="username">
                </ValidationProvider
                ><ValidationProvider rules="required" name="firstname">
                  <div
                    class="form-group text-left"
                    slot-scope="{ valid, errors }"
                  >
                    <label for="firstname" class="form-label pl-1"
                      >Firstname</label
                    >
                    <input
                      placeholder="e.g Micheal"
                      v-model="form.firstname"
                      :state="errors[0] ? false : valid ? true : null"
                      class="form-control item field"
                      name="firstname"
                      type="name"
                      id="firstname"
                    />
                    <small
                      style="padding-left: 10px; margin-bottom: 10px"
                      class="text-danger text-left"
                      >{{ errors[0] }}
                    </small>
                  </div> </ValidationProvider
                ><ValidationProvider rules="required" name="lastname">
                  <div
                    class="form-group text-left"
                    slot-scope="{ valid, errors }"
                  >
                    <label for="lastname" class="form-label pl-1"
                      >Lastname</label
                    >
                    <input
                      placeholder="e.g Smith"
                      v-model="form.lastname"
                      :state="errors[0] ? false : valid ? true : null"
                      class="form-control item field"
                      name="lastname"
                      type="name"
                      id="name"
                    />
                    <small
                      style="padding-left: 10px; margin-bottom: 10px"
                      class="text-danger text-left"
                      >{{ errors[0] }}
                    </small>
                  </div>
                </ValidationProvider>
              </div>
              <ValidationProvider rules="required" name="Email">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="email" class="form-label pl-1">Email</label>
                  <input
                    placeholder="Email"
                    v-model="form.email"
                    :state="errors[0] ? false : valid ? true : null"
                    name="email"
                    class="form-control item field"
                    type="email"
                    id="email"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required">
                " name="gender">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="gender" class="form-label pl-1">Gender</label>
                  <b-form-select
                    id="gender"
                    aria-placeholder="Gender"
                    v-model="form.gender"
                    :state="errors[0] ? false : valid ? true : null"
                    :options="genderOptions"
                    class="form-control item field"
                  ></b-form-select>

                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|age" name="Age">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="age" class="form-label pl-1">Age</label>
                  <input
                    placeholder="e.g 30"
                    v-model="form.age"
                    :state="errors[0] ? false : valid ? true : null"
                    name="age"
                    class="form-control item field"
                    type="age"
                    id="age"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|country" name="Country">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="country" class="form-label pl-1"> Country</label>
                  <input
                    placeholder="e.g Uganda"
                    v-model="form.country"
                    :state="errors[0] ? false : valid ? true : null"
                    name="country"
                    class="form-control item field"
                    type="country"
                    id="country"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|city" name="City">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="city" class="form-label pl-1"
                    >City/District</label
                  >
                  <input
                    placeholder="e.g Kampala"
                    v-model="form.city"
                    :state="errors[0] ? false : valid ? true : null"
                    name="city"
                    class="form-control item field"
                    type="city"
                    id="city"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" name="Street">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="street" class="form-label pl-1">Street</label>
                  <input
                    placeholder="e.g Kampala Road"
                    v-model="form.street"
                    :state="errors[0] ? false : valid ? true : null"
                    name="street"
                    class="form-control item field"
                    type="street"
                    id="street"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" name="Experience">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="experience" class="form-label pl-1"
                    >Work experience (in years)</label
                  >
                  <input
                    placeholder="e.g 4"
                    v-model="form.experience"
                    :state="errors[0] ? false : valid ? true : null"
                    name="experience"
                    class="form-control item field"
                    type="experience"
                    id="experience"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required" name="description">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <label for="email" class="form-label pl-1"
                    >Job Description</label
                  >
                  <b-form-textarea
                    placeholder="Job Description"
                    v-model="form.description"
                    :state="errors[0] ? false : valid ? true : null"
                    name="description"
                    class="form-control item field"
                    rows="3"
                    id="description"
                  ></b-form-textarea>
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required"
                name="Password"
                vid="password"
              >
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                  label="Password"
                >
                  <label for="password" class="form-label pl-1">Password</label>
                  <input
                    placeholder="password"
                    v-model="form.password"
                    :state="errors[0] ? false : valid ? true : null"
                    class="form-control item field"
                    name="password"
                    type="password"
                    id="password"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required|confirmed:password"
                name="Confirm Password"
              >
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                  label="Confirm Password"
                >
                  <label for="password-confirm" class="form-label pl-1"
                    >Confirm password</label
                  >
                  <input
                    placeholder="password"
                    v-model="form.passwordConfirm"
                    :state="errors[0] ? false : valid ? true : null"
                    class="form-control item field"
                    name="password"
                    type="password"
                    id="password-confirm"
                  />
                  <small
                    style="padding-left: 10px; margin-bottom: 10px"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <div class="buttons">
                <div class="login">
                  <button
                    class="btn btn-info login"
                    type="submit"
                    @click="handleRegister"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </ValidationObserver>
        </div>
        <p v-if="registrationResponse">{{ registrationResponse }}</p>
        <p v-if="registrationError" class="text-danger">
          Login failed: {{ registrationError }}
        </p>
        <p>
          Already have an account?
          <router-link to="/login" class="text-info">Login</router-link>
        </p>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Navigation from "../../components/navigation.vue";
export default {
  name: "login",
  components: { Navigation },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        age: "",
        gender: "M",
        country: "",
        city: "",
        street: "",
        description: "",
        experience: "",
        email: "",
        password: "",
        passwordConfirm: "",
        project_id: 1,
      },
      genderOptions: [
        { value: "M", text: "Male" },
        { value: "F", text: "Female" },
      ],
    };
  },
  computed: {
    ...mapGetters(["registrationError", "registrationResponse"]),
  },
  methods: {
    ...mapActions(["registerUser"]),
    handleRegister(e) {
      e.preventDefault();
      console.log(this.form);
      const data = this.form;
      this.$store.commit("registrationError", "");
      this.$store.commit("registrationResponse", "");
      this.$store.commit("isLoading", true);
      this.registerUser(data).then(() => {
        this.$router.push({ name: "login" });
        this.$store.commit("isLoading", false);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
$colors: (
  primary: #09a2ff,
  green: #1fb56f,
  text: #707070,
);
@function color($thecolor) {
  @return map-get($colors, $thecolor);
}
$radius: 20px;
$padding: 15px;
.text-info {
  padding-top: 10px;
  padding-bottom: $padding;
  color: color(primary);
}
.main-body {
  padding-top: 10vh;
  p {
    text-align: center;
    padding-top: 30px;
    color: color(text);
  }
}
.field {
  border-radius: 15px;
  // margin-bottom: 20px;
}
.form-group {
  margin: 0px;
}
.form-card {
  width: 50vw;
  height: auto;
  margin: auto;
  min-width: 350px;
  // margin-top: 20vh;
  padding: $padding;
  box-shadow: 2px 5px 10px gray;
  border-radius: $radius;
  padding-bottom: 10px;
}
.btn {
  text-align: center;
  width: 200px;
  font-size: 15px;
  border-radius: $radius;
  margin-bottom: 30px;
}
.buttons {
  text-align: center;
  padding-top: $padding;
}
.btn-primary {
  background-color: color(primary);
  border: 0px;
}
.btn-success {
  background-color: color(green);
  border: 0px;
}
/* .login:hover {
  text-decoration: none;
}
#msg {
  color: red;
  font-size: 14px;
} */
</style>
