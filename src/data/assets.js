// Fichiers servis depuis /assets/ (public/assets via symlink)
const base = '/assets/'

const images = [
  'WhatsApp Image 2026-02-14 at 22.48.25.jpeg',
  'WhatsApp Image 2026-02-14 at 22.48.25(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.48.26.jpeg',
  'WhatsApp Image 2026-02-14 at 22.48.26(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.48.28.jpeg',
  'WhatsApp Image 2026-02-14 at 22.48.29.jpeg',
  'WhatsApp Image 2026-02-14 at 22.48.30.jpeg',
  'WhatsApp Image 2026-02-14 at 22.48.31.jpeg',
  'WhatsApp Image 2026-02-14 at 22.50.31.jpeg',
  'WhatsApp Image 2026-02-14 at 22.50.32.jpeg',
  'WhatsApp Image 2026-02-14 at 22.50.32(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.50.32(2).jpeg',
  'WhatsApp Image 2026-02-14 at 22.52.56.jpeg',
  'WhatsApp Image 2026-02-14 at 22.52.57.jpeg',
  'WhatsApp Image 2026-02-14 at 22.52.57(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.52.58.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.00.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.00(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.01.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.02.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.04.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.04(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.07.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.09.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.09(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.10.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.11.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.11(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.11(2).jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.11(3).jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.12.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.13.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.13(1).jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.15.jpeg',
  'WhatsApp Image 2026-02-14 at 22.53.15(1).jpeg',
  'DTH02868.jpg.jpeg',
  'DTH02871.jpg.jpeg',
  'DTH02872.jpg.jpeg',
]

const videos = [
  'WhatsApp Video 2026-02-14 at 22.48.34.mp4',
  'WhatsApp Video 2026-02-14 at 22.48.35.mp4',
  'WhatsApp Video 2026-02-14 at 22.48.35(1).mp4',
  'WhatsApp Video 2026-02-14 at 22.48.37.mp4',
  'WhatsApp Video 2026-02-14 at 22.48.56.mp4',
  'WhatsApp Video 2026-02-14 at 22.49.03.mp4',
  'WhatsApp Video 2026-02-14 at 22.49.04.mp4',
]

function url(path) {
  return base + encodeURIComponent(path)
}

export default {
  imageUrls: images.map((name) => url(name)),
  videoUrls: videos.map((name) => url(name)),
  imageNames: images,
  videoNames: videos,
  url,
}
