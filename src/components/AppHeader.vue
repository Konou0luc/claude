<template>
  <header class="header" :class="{ 'header--solid': scrolled }">
    <div class="header-inner container">
      <a href="#accueil" class="logo" @click.prevent="scrollTo('accueil')">15.02</a>
      <nav class="nav" aria-label="Navigation principale">
        <ul class="nav-list">
          <li><a href="#accueil" @click.prevent="scrollTo('accueil')">Accueil</a></li>
          <li><a href="#gallery" @click.prevent="scrollTo('gallery')">Galerie</a></li>
          <li><a href="#videos" @click.prevent="scrollTo('videos')">Vidéos</a></li>
          <li><a href="#message" @click.prevent="scrollTo('message')">Message</a></li>
        </ul>
      </nav>
      <button
        class="nav-toggle"
        type="button"
        aria-label="Menu"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <span class="nav-toggle-bar" />
        <span class="nav-toggle-bar" />
        <span class="nav-toggle-bar" />
      </button>
    </div>
    <Transition name="fade">
      <div v-show="menuOpen" class="nav-overlay" aria-hidden="true" @click="menuOpen = false" />
    </Transition>
    <Transition name="slide">
      <div v-show="menuOpen" class="nav-drop">
        <ul class="nav-drop-list">
          <li><a href="#accueil" @click="go('accueil')">Accueil</a></li>
          <li><a href="#gallery" @click="go('gallery')">Galerie</a></li>
          <li><a href="#videos" @click="go('videos')">Vidéos</a></li>
          <li><a href="#message" @click="go('message')">Message</a></li>
        </ul>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

function scrollTo(id) {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function go(id) {
  scrollTo(id)
}

function onScroll() {
  scrolled.value = window.scrollY > 10
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: var(--header-height);
  padding-top: var(--safe-top);
  background: transparent;
  border-bottom: 1px solid transparent;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.header--solid {
  background: var(--bg);
  border-bottom-color: var(--border-subtle);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: var(--text);
  text-decoration: none;
}

.nav-list {
  display: none;
  list-style: none;
  gap: 2px;
}

.nav-list a {
  display: block;
  padding: 8px 14px;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition: color 0.2s, background 0.2s;
}

.nav-list a:hover {
  color: var(--text);
  background: var(--surface-elevated);
}

.nav-toggle {
  width: 44px;
  height: 44px;
  padding: 12px;
  border: none;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
}

.nav-toggle-bar {
  display: block;
  width: 20px;
  height: 1.5px;
  background: currentColor;
  border-radius: 1px;
}

.nav-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 51;
  top: var(--header-height);
}

.nav-drop {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  z-index: 52;
  background: var(--surface);
  border-bottom: 1px solid var(--border-subtle);
  padding: 16px var(--section-padding-x) 24px;
}

.nav-drop-list {
  list-style: none;
}

.nav-drop-list a {
  display: block;
  padding: 12px 0;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--text);
  text-decoration: none;
  border-bottom: 1px solid var(--border-subtle);
  transition: color 0.2s;
}

.nav-drop-list a:last-child {
  border-bottom: none;
}

.nav-drop-list a:hover {
  color: var(--accent);
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.slide-enter-active,
.slide-leave-active { transition: transform 0.2s ease, opacity 0.2s ease; }
.slide-enter-from,
.slide-leave-to { transform: translateY(-8px); opacity: 0; }

@media (min-width: 768px) {
  .nav-list { display: flex; }
  .nav-toggle { display: none; }
  .nav-overlay,
  .nav-drop { display: none; }
}
</style>
