<script setup>

defineProps({
  text: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "submit"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  class: {
    type: String
  }
})

</script>

<template>
  <button :type="type"
          :class="disabled ? 'bg-gray-400 hover:bg-gray-300' : 'bg-light hover:bg-light/70'"
          class="my-5 w-full flex justify-center p-4 rounded-full
        font-semibold focus:outline-none focus:shadow-outline text-darker
        shadow-lg transition ease-in duration-100"
          :disabled="disabled"
  >
    {{ text }}
  </button>
</template>

<style scoped>

</style>