<script setup>

const props = defineProps({
  errorMessage : {
    type: String,
    required: true
  },
  textColor: {
    type: String
  },
  backgroundColor: {
    type: String
  }
})

const getClasses = () => {
  return `${props.textColor || "text-red-200"} ${props.backgroundColor || "bg-red-500/40"}`
}

</script>

<template>
  <p v-if="errorMessage" :class="getClasses()" class=" rounded-md font-semibold p-1.5">
    {{errorMessage}}
  </p>
</template>

<style scoped>

</style>