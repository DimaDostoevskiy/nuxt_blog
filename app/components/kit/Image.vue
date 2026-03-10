<script setup lang="ts">
defineProps({
  path: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: 'Изображение'
  },
  loading: {
    type: String,
    default: 'lazy'
  },
  defaultImage: {
    type: String,
    default: `https://images.wallpaperscraft.ru/image/single/devushka_uedinenie_art_129798_1600x900.jpg`
  }
})

const isError = ref(false)

const handleError = () => {
  isError.value = true
}
</script>

<template>
  <NuxtImg class="kit__image"
           fit="cover"
           :src="isError ? path : defaultImage"
           :alt="alt"
           :loading="loading"
           @error="handleError"
  />
</template>

<style scoped>
.kit__image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
