<template>
  <div class="xxx">
    <button @click="sss">{{ cc }}</button>
  </div>
</template>

<script>
export default {
  props: {
    cc: { type: String }
  },
  methods: {
    sss () {
      this.$emit('cl', this.cc)
    }
  }
}
</script>

<style>
</style>
