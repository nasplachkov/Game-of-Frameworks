<template>
  <div class="container sign-in">
    <div class="row">
      <div class="center">
        <logo />
      </div>
    </div>
    <div class="row">
      <div class="center">
        <Header class="title">Sign Up</Header>
      </div>
    </div>
    <form @submit.prevent="register()">
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
          <Input v-model="rePassword" :valid="validRePassword" name="Re-password" type="password" />
        </div>
      </div>
      <div class="row">
        <div class="col s12 offset-m3 m6 offset-l4 l4">
          <Input
            v-model="fullName"
            :valid="validFullName"
            name="Full name"
            type="text"
            error="First and Last names are required"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s12 offset-m3 m6 offset-l4 l4">
          <Input
            v-model="phone"
            :valid="validPhone"
            name="Phone"
            type="tel"
            error="Phone is required"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s12 offset-m3 m6 offset-l4 l4">
          <Input
            v-model="address"
            :valid="validAddress"
            name="Address"
            type="text"
            error="Address is required"
          />
        </div>
      </div>
      <div class="row">
        <div class="col s12 offset-m3 m6 offset-l4 l4">
          <Button
            class="waves-effect waves-light btn btn-primary full-width"
            :class="{ disabled:isValid }"
            name="Register"
          />
        </div>
      </div>
    </form>
    <div class="row">
      <div class="center dark-text">
        Already have account? Login.
        <span class="highlight-text pointer">
          <router-link to="/signin">here</router-link>
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
      password: "",
      rePassword: "",
      fullName: "",
      phone: "",
      address: ""
    };
  },
  computed: {
    validEmail() {
      return this.validateEmail(this.email);
    },
    validPassword() {
      return this.validatePassword(this.password);
    },
    validRePassword() {
      return (
        this.validatePassword(this.password) &&
        this.validateRePassword(this.password, this.rePassword)
      );
    },
    validFullName() {
      return this.validateFullName(this.fullName);
    },
    validPhone() {
      return this.validatePhone(this.phone);
    },
    validAddress() {
      return this.validateAddress(this.address);
    },
    isValid() {
      return (
        !this.validateEmail(this.email) ||
        !this.validatePassword(this.password) ||
        !this.validateRePassword(this.password, this.rePassword) ||
        !this.validateFullName(this.fullName) ||
        !this.validatePhone(this.phone) ||
        !this.validateAddress(this.address)
      );
    }
  },
  methods: {
    ...mapActions(["setUser"]),
    register() {
      if (this.isValid) {
        return;
      }
      authService.register(this.email, this.password).then(response => {
        this.setUser(response.data);
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