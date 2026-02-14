<template>
  <div class="app">
    <AppHeader />
    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <footer class="footer">
      <div class="container">
        <span class="footer-text">15.02</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style scoped>
.app {
  min-height: 100dvh;
  min-height: 100vh;
}

.main {
  padding-top: var(--header-height);
}

.footer {
  padding: 24px var(--section-padding-x);
  padding-bottom: max(24px, var(--safe-bottom));
  border-top: 1px solid var(--border-subtle);
}

.footer-text {
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.page-enter-active,
.page-leave-active { transition: opacity 0.3s ease; }
.page-enter-from,
.page-leave-to { opacity: 0; }
</style>
