<template>
  <section id="videos" class="section videos" ref="sectionRef">
    <div class="section-inner container">
      <header class="section-header">
        <span class="section-label">02</span>
        <h2 class="section-title font-serif">Vidéos</h2>
      </header>
      <div class="videos-grid">
        <div
          v-for="(src, i) in assets.videoUrls"
          :key="i"
          class="video-card"
          :ref="(el) => setItemRef(el, i)"
        >
          <div class="video-wrapper">
            <video
              :ref="(el) => setVideoRef(el, i)"
              :src="src"
              :poster="posterUrls[i] || fallbackPoster(i)"
              loop
              muted
              playsinline
              preload="metadata"
              @click="toggleVideo(i)"
            />
            <button
              type="button"
              class="video-play-btn"
              :class="{ playing: activeVideo === i }"
              :aria-label="activeVideo === i ? 'Pause' : 'Lire la vidéo'"
              @click.prevent="toggleVideo(i)"
            >
              <span class="play-icon" aria-hidden="true">{{ activeVideo === i ? '⏸' : '▶' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import assets from '../data/assets.js'
import { captureVideoFrame } from '../utils/videoPoster.js'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const itemRefs = ref([])
const videoEls = ref([])
const activeVideo = ref(null)
const posterUrls = ref([])

/** Image de secours différente par vidéo (galerie) tant que la miniature n’est pas prête ou si l’extraction échoue. */
function fallbackPoster(i) {
  const urls = assets.imageUrls
  const index = (i * 5) % urls.length
  return urls[index]
}

function setItemRef(el, i) {
  if (el) itemRefs.value[i] = el
}

function setVideoRef(el, i) {
  if (el) videoEls.value[i] = el
}

function toggleVideo(i) {
  const v = videoEls.value[i]
  if (!v) return
  if (activeVideo.value === i) {
    v.pause()
    activeVideo.value = null
  } else {
    videoEls.value.forEach((vid) => vid?.pause())
    v.play().catch(() => {})
    activeVideo.value = i
  }
}

onMounted(() => {
  posterUrls.value = new Array(assets.videoUrls.length).fill(null)
  assets.videoUrls.forEach((videoSrc, i) => {
    captureVideoFrame(videoSrc, 1).then((blobUrl) => {
      if (blobUrl) {
        const next = [...posterUrls.value]
        next[i] = blobUrl
        posterUrls.value = next
      }
    })
  })
  itemRefs.value.forEach((el, i) => {
    if (!el) return
    gsap.fromTo(el, { opacity: 0, y: 28 }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      delay: Math.min(i, 4) * 0.06,
    })
  })
})

onUnmounted(() => {
  posterUrls.value.forEach((url) => {
    if (url && url.startsWith('blob:')) URL.revokeObjectURL(url)
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

.videos-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--gap-md);
}

@media (min-width: 480px) {
  .videos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .videos-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--gap-lg);
  }
}

.video-card {
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  transition: border-color 0.2s ease;
}

.video-card:hover {
  border-color: var(--border);
}

.video-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 9 / 16;
  background: var(--bg);
}

.video-wrapper video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.video-play-btn {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  min-width: 44px;
  min-height: 44px;
  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease, opacity 0.2s ease;
}

.video-play-btn:hover {
  background: rgba(0, 0, 0, 0.35);
}

.video-play-btn.playing {
  opacity: 0;
  pointer-events: none;
}

.video-wrapper:hover .video-play-btn:not(.playing) {
  opacity: 1;
}

.play-icon {
  font-size: clamp(2rem, 5vw, 2.5rem);
  line-height: 1;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}
</style>
