<template>
  <button @click="$emit('click')" type="sumbitt">{{ name }}</button>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
