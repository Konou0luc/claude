<template>
  <section id="message" class="section message" ref="sectionRef">
    <div class="section-inner container">
      <div class="message-card" ref="cardRef">
        <span class="section-label">03</span>
        <h2 class="message-title font-serif">Pour toi</h2>
        <div class="message-text">
          <p>
            Tu mérites une journée (et une vie) aussi lumineuse que toi.
            Merci d’être mon meilleur ami — ce site est un petit bout de tout ce qu’on partage.
          </p>
          <p class="signature">Joyeux anniversaire ! 🎂</p>
        </div>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="message-btn"
        >
          Envoyer un message
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const cardRef = ref(null)

const whatsappNumber = '22870667043'
const whatsappMessage = 'Joyeux anniversaire Claudy! 🎂'
const whatsappUrl = computed(() => {
  const text = encodeURIComponent(whatsappMessage)
  return `https://wa.me/${whatsappNumber}${text ? `?text=${text}` : ''}`
})

onMounted(() => {
  if (!cardRef.value) return
  gsap.fromTo(cardRef.value, { opacity: 0, y: 40 }, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    scrollTrigger: { trigger: cardRef.value, start: 'top 85%', toggleActions: 'play none none none' },
  })
})
</script>

<style scoped>
.section {
  padding: var(--section-padding-y) 0;
  padding-bottom: max(var(--section-padding-y), calc(24px + var(--safe-bottom)));
}

.section-inner {
  padding-left: var(--section-padding-x);
  padding-right: var(--section-padding-x);
  max-width: 560px;
  margin: 0 auto;
}

.message-card {
  padding: clamp(32px, 5vw, 48px);
  background: var(--surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius);
}

.section-label {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  display: block;
  margin-bottom: 8px;
}

.message-title {
  font-size: clamp(1.5rem, 3.5vw, 1.875rem);
  font-weight: 600;
  margin-bottom: 20px;
  color: var(--text);
}

.message-text {
  font-size: clamp(0.9375rem, 2vw, 1rem);
  line-height: 1.75;
  color: var(--text-secondary);
}

.message-text p {
  margin-bottom: 12px;
}

.message-text p:last-child {
  margin-bottom: 0;
}

.signature {
  font-size: clamp(1rem, 2.5vw, 1.125rem);
  font-family: 'Source Serif 4', Georgia, serif;
  font-style: italic;
  color: var(--text);
  margin-top: 20px;
}

.message-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 24px;
  margin-top: 28px;
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
  background: #25d366;
  border: none;
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: background 0.2s, transform 0.2s;
}

.message-btn:hover {
  background: #20bd5a;
  color: var(--text);
}

.message-btn:focus-visible {
  outline: 2px solid #25d366;
  outline-offset: 2px;
}
</style>
