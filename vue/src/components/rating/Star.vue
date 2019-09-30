<template>
  <div class="star" :class="starClass" @mouseenter="enter" @mouseleave="leave" @click="click">
    <i class="material-icons">star</i>
  </div>
</template>

<script>
export default {
  props: {
    filled: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hovered: false
    };
  },
  computed: {
    starClass() {
      let starClasses = "";
      starClasses += this.filled ? " filled" : "";
      starClasses += !this.filled && this.hover ? " hover" : "";
      starClasses += !this.hovered ? " disable" : "";
      return starClasses;
    }
  },
  methods: {
    enter() {
      this.hovered = true;
      this.$emit("enter");
    },
    leave() {
      this.hovered = false;
      this.$emit("leave");
    },
    click() {
      this.$emit("click");
    }
  }
};
</script>

<style>
</style>