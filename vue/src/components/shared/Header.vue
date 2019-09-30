<template>
  <div class="title">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      requiered: true
    }
  }
};
</script>

<style>
</style>