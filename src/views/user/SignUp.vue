<template>
  <div>
    <main>
      <section class="main-body">
        <div class="form-card">
          <form>
            <div class="text-center">
              <p class="text-info">Sign Up</p>
            </div>
            <div class="form-group">
              <input
                placeholder="Username"
                class="form-control item field"
                name="username"
                type="name"
                id="name"
              />
            </div>
            <div class="form-group">
              <input
                placeholder="Email"
                name="email"
                class="form-control item field"
                type="email"
                id="email"
              />
              <!-- <input
                placeholder="Email"
                v-validate="'required|email'"
                v-model="email"
                :class="{ input: true, 'is-danger': errors.has('email') }"
                name="email"
                class="form-control item field"
                type="email"
                id="email"
              />
              <span v-show="errors.has('email')" class="help is-danger" id="msg"
                ><small>{{ errors.first("email") }}</small></span
              > -->
            </div>
            <div class="form-group">
              <input
                placeholder="password"
                class="form-control item field"
                name="password"
                type="password"
                id="password"
              />
              <!-- <input
                placeholder="password"
                class="form-control item field"
                v-model="password"
                v-validate="'required|max:20|min:7'"
                name="password"
                :class="{ 'is-danger': errors.has('password') }"
                type="password"
                ref="password"
                id="password"
              /> -->
              <!-- <span
                v-show="errors.has('password')"
                class="help is-danger"
                id="msg"
                ><small style="color: red">{{
                  errors.first("password")
                }}</small></span
              > -->
            </div>
            <div class="form-group">
              <input
                placeholder="confirm password"
                class="form-control item field"
                name="password"
                type="password"
                id="password"
              />
            </div>

            <div class="buttons">
              <div class="login">
                <button class="btn btn-primary login" type="submit">
                  Create Account
                </button>
              </div>
            </div>
          </form>
        </div>
        <p>
          Already have an account?
          <router-link to="/login">Login</router-link>
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
      email: "",
      password: "",
      store_auth: false,
    };
  },
  computed: {},
  methods: {},
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
  font-size: 20px;
  color: color(primary);
  font-weight: bold;
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
