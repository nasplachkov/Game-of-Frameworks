<template>
  <div class="container sign-in">
    <div class="row">
      <div class="center">
        <logo />
      </div>
    </div>
    <div class="row">
      <div class="center">
        <Header class="title" name="Login">Sign In</Header>
      </div>
    </div>
    <form @submit.prevent="login()">
      <div class="row">
        <div class="col s12 offset-m3 m6 offset-l4 l4">
          <Input
            v-model="email"
            :valid="validEmail"
            name="Email"
            type="email"
            error="Invalid email"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s12 offset-m3 m6 offset-l4 l4">
          <Input
            v-model="password"
            :valid="validPassword"
            name="Password"
            type="password"
            error="Password is required"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s12 offset-m3 m6 offset-l4 l4">
          <Button
            class="waves-effect waves-light btn btn-primary full-width"
            :class="{ disabled:isValid }"
            name="Login"
          />
        </div>
      </div>
    </form>
    <div class="row">
      <div class="center dark-text">
        Don't have account? Sign up
        <span class="highlight-text pointer">
          <router-link to="/signup">here</router-link>
        </span>.
      </div>
    </div>
  </div>
</template>

<script>
import FunctionUtils from "../../mixins/function-util";

import { mapActions } from "vuex";

import { authService } from "../../services/authService";

import Logo from "../../components/images/Logo";
import Header from "../../components/shared/Header";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";

export default {
  mixins: [FunctionUtils],
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    validEmail() {
      return this.validateEmail(this.email);
    },
    validPassword() {
      return this.validatePassword(this.password);
    },
    isValid() {
      return (
        !this.validateEmail(this.email) || !this.validatePassword(this.password)
      );
    }
  },
  methods: {
    ...mapActions(["setUser"]),
    login() {
      if (this.isValid) {
        return;
      }
      authService
        .login(this.email, this.password)
        .then(response => {
          this.setUser(response.data);
        })
        .finally(() => {
          this.$router.push({ path: "list" });
        });
    }
  },
  components: {
    Logo,
    Header,
    Input,
    Button
  }
};
</script>

<style lang="scss" scoped>
.login-form {
}
</style>