<template>
  <div>
    <main>
      <section class="main-body">
        <div class="form-card">
          <ValidationObserver ref="observer">
            <form
              slot-scope="{ validate }"
              @submit.prevent="validate().then(handleRegister)"
            >
              <div class="text-center">
                <h3 class="text-info p-0">Signup</h3>
              </div>
              <ValidationProvider rules="required" name="username">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
                  <input
                    placeholder="Username"
                    v-model="form.username"
                    :state="errors[0] ? false : valid ? true : null"
                    class="form-control item field"
                    name="username"
                    type="name"
                    id="name"
                  />
                  <small
                    style="position: absolute; padding-left:10px;"
                    class="text-danger text-left"
                    >{{ errors[0] }}
                  </small>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="required|email" name="Email">
                <div
                  class="form-group text-left"
                  slot-scope="{ valid, errors }"
                >
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
                    style="position: absolute; padding-left:10px;"
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
                    style="position: absolute; padding-left: 10px;"
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
                  <input
                    placeholder="password"
                    v-model="form.passwordConfirm"
                    :state="errors[0] ? false : valid ? true : null"
                    class="form-control item field"
                    name="password"
                    type="password"
                    id="password"
                  />
                  <small
                    style="position: absolute; padding-left:10px;"
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
        <p>
          Already have an account?
          <router-link to="/login" class="text-info">Login</router-link>
        </p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
    };
  },
  computed: {},
  methods: {
    handleRegister() {
      // e.preventDefault();
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
  margin-top: 20px;
}
.form-card {
  max-width: 300px;
  height: auto;
  max-height: 400px;
  margin: auto;
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
