<template>
  <section id="accueil" class="hero">
    <div class="hero-bg" aria-hidden="true" />
    <div class="hero-overlay" aria-hidden="true" />
    <div class="hero-inner container">
      <p class="hero-label" ref="labelRef">15 Février</p>
      <div class="hero-line" aria-hidden="true" />
      <h1 class="hero-title font-serif" ref="titleRef">
        Joyeux anniversaire
      </h1>
      <p class="hero-subtitle" ref="subRef">
        Une page dédiée, pour célébrer cette journée avec toi.
      </p>
      <button
        type="button"
        class="hero-cta"
        ref="ctaRef"
        @click="scrollToGallery"
        aria-label="Aller à la galerie"
      >
        Découvrir
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const labelRef = ref(null)
const titleRef = ref(null)
const subRef = ref(null)
const ctaRef = ref(null)

function scrollToGallery() {
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  gsap.fromTo([labelRef.value, titleRef.value, subRef.value, ctaRef.value], { opacity: 0, y: 16 }, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.15,
  })
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: calc(100dvh - var(--header-height));
  min-height: calc(100vh - var(--header-height));
  display: flex;
  align-items: center;
  padding: var(--section-padding-y) var(--section-padding-x);
  isolation: isolate;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: url('/assets/DTH02872.jpg.jpeg') center / cover no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(to right, rgba(10, 10, 11, 0.85) 0%, rgba(10, 10, 11, 0.5) 60%, rgba(10, 10, 11, 0.3) 100%);
}

.hero-inner {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 640px;
}

.hero-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.hero-line {
  width: 24px;
  height: 1px;
  background: var(--border);
  margin-bottom: 24px;
}

.hero-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: clamp(0.9375rem, 2vw, 1.0625rem);
  color: var(--text-secondary);
  font-weight: 400;
  line-height: 1.6;
  margin-bottom: 32px;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.hero-cta:hover {
  background: var(--surface);
  border-color: var(--text-muted);
}
</style>
