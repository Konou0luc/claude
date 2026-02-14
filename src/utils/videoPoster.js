/**
 * Extrait une frame d'une vidéo pour l'utiliser comme poster (miniature).
 * Chaque vidéo obtient ainsi sa propre miniature au lieu d'une image générique.
 * @param {string} videoSrc - URL de la vidéo
 * @param {number} time - Instant en secondes (défaut: 1)
 * @returns {Promise<string|null>} - URL blob de l'image ou null en cas d'échec
 */
export function captureVideoFrame(videoSrc, time = 1) {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', '')
    video.preload = 'metadata'
    video.crossOrigin = 'anonymous'

    const cleanup = () => {
      video.src = ''
      video.load()
    }

    video.addEventListener('error', () => {
      cleanup()
      resolve(null)
    })

    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        if (canvas.width === 0 || canvas.height === 0) {
          cleanup()
          resolve(null)
          return
        }
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0)
        canvas.toBlob(
          (blob) => {
            cleanup()
            if (blob) resolve(URL.createObjectURL(blob))
            else resolve(null)
          },
          'image/jpeg',
          0.82
        )
      } catch {
        cleanup()
        resolve(null)
      }
    })

    video.addEventListener('loadeddata', () => {
      const t = Math.min(Math.max(0, time), video.duration || 1)
      video.currentTime = t
    })

    video.src = videoSrc
    video.load()
  })
}
