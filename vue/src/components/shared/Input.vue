<template>
  <div class="input-field">
    <label :for="name">{{name}}</label>
    <input
      @input="$emit('input',value)"
      :type="type"
      :class="inputClasses"
      :name="name"
      v-model="value"
      @blur="touched = true"
    />
    <div v-if="touched && !valid">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    valid: {
      type: Boolean,
      default: true
    },
    error: {
      type: String
    }
  },
  data() {
    return {
      value: "",
      touched: false
    };
  },
  computed: {
    inputClasses() {
      return this.touched ? (this.valid ? "valid" : "invalid") : "";
    }
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.input-field {
  width: 100%;
  border: none;
  background-color: transparent;
}
</style>