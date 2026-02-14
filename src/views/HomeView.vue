<template>
  <main class="home">
    <HeroSection />
    <GallerySection />
    <VideosSection />
    <MessageSection />
  </main>
</template>

<script setup>
import HeroSection from '../components/HeroSection.vue'
import GallerySection from '../components/GallerySection.vue'
import VideosSection from '../components/VideosSection.vue'
import MessageSection from '../components/MessageSection.vue'
</script>

<style scoped>
.home {
  min-height: 100%;
}
</style>
