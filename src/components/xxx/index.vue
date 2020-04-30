<template>
  <div class="xxx">
    <button @click="sss">{{ cc }}</button>
  </div>
</template>

<script>
export default {
  props: {
    cc: { defaukt: 0 }
  },
  methods: {
    sss () {
      this.$emit('update:cc', 3)
    }
  }
}
</script>

<style>
</style>
