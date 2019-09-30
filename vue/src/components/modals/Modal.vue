<template>
  <div id="modal" class="modal-mask" @keyup.esc="close" @click="close" tabindex="-1">
    <div class="modal-wrapper" @click="contentClick">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$el.focus();
  },
  methods: {
    contentClick(event) {
      event.stopPropagation();
    },
    close() {
      this.$emit("close");
    }
  },
  components: {}
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
