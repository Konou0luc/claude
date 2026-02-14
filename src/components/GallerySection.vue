<template>
  <section id="gallery" class="section gallery" ref="sectionRef">
    <div class="section-inner container">
      <header class="section-header">
        <span class="section-label">01</span>
        <h2 class="section-title font-serif">Galerie</h2>
      </header>
      <div class="gallery-grid">
        <button
          v-for="(src, i) in assets.imageUrls"
          :key="i"
          type="button"
          class="gallery-item"
          :ref="(el) => setItemRef(el, i)"
          @click="openLightbox(i)"
        >
          <span class="gallery-item-inner">
            <img :src="src" :alt="`Photo ${i + 1}`" loading="lazy" decoding="async" />
          </span>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="lightboxIndex !== null"
          class="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Vue agrandie de la photo"
          @click.self="closeLightbox"
          tabindex="-1"
          ref="lightboxRef"
        >
          <div class="lightbox-backdrop" aria-hidden="true" />
          <button type="button" class="lightbox-close" @click="closeLightbox" aria-label="Fermer">
            <span aria-hidden="true">×</span>
          </button>

          <button
            type="button"
            class="lightbox-nav lightbox-prev"
            aria-label="Photo précédente"
            :disabled="!hasPrev"
            @click="goPrev"
          >
            <span aria-hidden="true">‹</span>
          </button>
          <button
            type="button"
            class="lightbox-nav lightbox-next"
            aria-label="Photo suivante"
            :disabled="!hasNext"
            @click="goNext"
          >
            <span aria-hidden="true">›</span>
          </button>

          <div class="lightbox-content">
            <img
              :key="lightboxIndex"
              :src="currentImageSrc"
              :alt="`Photo ${lightboxIndex + 1} sur ${total}`"
              class="lightbox-img"
            />
          </div>

          <div class="lightbox-counter" aria-live="polite">
            {{ lightboxIndex + 1 }} / {{ total }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import assets from '../data/assets.js'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const lightboxRef = ref(null)
const itemRefs = ref([])
const lightboxIndex = ref(null)

const total = computed(() => assets.imageUrls.length)
const currentImageSrc = computed(() =>
  lightboxIndex.value !== null ? assets.imageUrls[lightboxIndex.value] : ''
)
const hasPrev = computed(() => lightboxIndex.value !== null && lightboxIndex.value > 0)
const hasNext = computed(() => lightboxIndex.value !== null && lightboxIndex.value < total.value - 1)

function setItemRef(el, i) {
  if (el) itemRefs.value[i] = el
}

function openLightbox(i) {
  lightboxIndex.value = i
}

function closeLightbox() {
  lightboxIndex.value = null
}

function goPrev() {
  if (hasPrev.value) lightboxIndex.value = lightboxIndex.value - 1
}

function goNext() {
  if (hasNext.value) lightboxIndex.value = lightboxIndex.value + 1
}

function keydownHandler(e) {
  if (lightboxIndex.value === null) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowLeft') goPrev()
  else if (e.key === 'ArrowRight') goNext()
}

watch(lightboxIndex, (val) => {
  if (val !== null) {
    document.addEventListener('keydown', keydownHandler)
    nextTick(() => lightboxRef.value?.focus())
  } else {
    document.removeEventListener('keydown', keydownHandler)
  }
}, { immediate: true })

onUnmounted(() => document.removeEventListener('keydown', keydownHandler))

onMounted(() => {
  itemRefs.value.forEach((el, i) => {
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 32 }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      delay: Math.min(i % 8, 6) * 0.04,
    })
  })
})
</script>

<style scoped>
.section {
  padding: var(--section-padding-y) 0;
}

.section-inner {
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);
}

.section-header {
  margin-bottom: 32px;
}

.section-label {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 6px;
}

.section-title {
  font-size: clamp(1.5rem, 3.5vw, 1.875rem);
  font-weight: 600;
  color: var(--text);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--gap-sm);
}

@media (min-width: 480px) {
  .gallery-grid {
    gap: var(--gap-md);
  }
}

@media (min-width: 640px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap-md);
  }
}

@media (min-width: 1024px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--gap-lg);
  }
}

.gallery-item {
  aspect-ratio: 1;
  overflow: hidden;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  color: inherit;
  font: inherit;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.gallery-item:hover {
  border-color: var(--border);
  transform: translateY(-2px);
}

.gallery-item:focus-visible {
  outline-offset: 3px;
}

.gallery-item-inner {
  display: block;
  width: 100%;
  height: 100%;
}

.gallery-item-inner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 56px 80px;
  padding-top: max(60px, calc(16px + var(--safe-top)));
  padding-bottom: max(80px, calc(24px + var(--safe-bottom)));
  outline: none;
}

.lightbox-backdrop {
  position: absolute;
  inset: 0;
  background: var(--bg);
}

.lightbox-close {
  position: absolute;
  top: max(16px, var(--safe-top));
  right: max(16px, var(--section-padding-x));
  z-index: 2;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}

.lightbox-close:hover {
  background: var(--surface);
  border-color: var(--text-muted);
}

.lightbox-close:disabled,
.lightbox-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.lightbox-nav {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border: none;
  border-radius: var(--radius-sm);
  background: var(--surface-elevated);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}

.lightbox-nav:hover:not(:disabled) {
  background: var(--surface);
  border-color: var(--text-muted);
}

.lightbox-prev {
  left: max(12px, var(--section-padding-x));
}

.lightbox-next {
  right: max(12px, var(--section-padding-x));
}

.lightbox-content {
  position: relative;
  z-index: 1;
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-img {
  max-width: 100%;
  max-height: calc(100dvh - 140px);
  max-height: calc(100vh - 140px);
  width: auto;
  height: auto;
  border-radius: var(--radius);
}

.lightbox-counter {
  position: absolute;
  bottom: max(20px, var(--safe-bottom));
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-muted);
  letter-spacing: 0.02em;
}

/* Responsive lightbox */
@media (max-width: 640px) {
  .lightbox {
    padding: 50px 12px 70px;
    padding-top: max(50px, calc(12px + var(--safe-top)));
  }

  .lightbox-nav {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    font-size: 1.25rem;
  }

  .lightbox-prev {
    left: 8px;
  }

  .lightbox-next {
    right: 8px;
  }

  .lightbox-close {
    top: max(12px, var(--safe-top));
    right: 12px;
    width: 44px;
    height: 44px;
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
.lightbox-enter-active .lightbox-img,
.lightbox-leave-active .lightbox-img {
  transition: transform 0.25s ease;
}
.lightbox-enter-from .lightbox-img,
.lightbox-leave-to .lightbox-img {
  transform: scale(0.96);
}
</style>
