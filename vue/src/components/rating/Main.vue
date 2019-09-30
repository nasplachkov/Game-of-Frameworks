<template>
  <div v-if="disabled" class="rating">
    <star v-for="n in starTotal" :key="n" :filled="n <= starsSelected" :hover="n <= hoverIndex"></star>
  </div>
  <div v-else class="rating">
    <star
      v-for="n in starTotal"
      :key="n"
      :filled="n <= starsSelected"
      :hover="n <= hoverIndex"
      @click="onClick(n)"
      @enter="onHoverEnter(n)"
      @leave="onHoverLeave()"
    ></star>
  </div>
</template>

<script>
import Star from "./Star";
export default {
  props: {
    stars: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      requiered: true
    }
  },
  data() {
    return {
      starTotal: 5,
      starsSelected: this.stars,
      hoverIndex: 0
    };
  },
  methods: {
    onClick(current) {
      if (this.disabled) {
        return;
      }
      this.starsSelected = current;
      this.$emit("click", this.starsSelected);
    },
    onHoverEnter(current) {
      if (this.disabled) {
        return;
      }
      this.hoverIndex = current;
    },
    onHoverLeave() {
      if (this.disabled) {
        return;
      }
      this.hoverIndex = -1;
    }
  },
  components: {
    Star
  }
};
</script>

<style>
</style>