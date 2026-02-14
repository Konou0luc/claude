# 🎂 Joyeux Anniversaire — Site spécial

Site d’anniversaire au style **glass iPhone** (glassmorphism), réalisé avec Vue 3, Vite, GSAP et VueUse.

## Lancer le projet

```bash
npm install
npm run dev
```

Ouvre [http://localhost:5173](http://localhost:5173).

## Build pour production

```bash
npm run build
```

Les fichiers sont générés dans `dist/`. Tu peux héberger ce dossier sur n’importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, etc.).

## Personnaliser le message

Le texte de la section « Pour toi » se trouve dans :

- `src/components/MessageSection.vue`

Modifie le contenu des balises `<p>` et la signature pour adapter le message à ton ami.

## Structure

- **Hero** : titre « Joyeux anniversaire » + date du 15 février, style glass
- **Galerie** : toutes les images du dossier `assets/` en grille, lightbox au clic
- **Vidéos** : toutes les vidéos en cartes, lecture au survol / clic
- **Message** : carte glass avec ton mot personnalisé

Les médias sont servis depuis le dossier `assets/` (lié dans `public/assets`).

Bon anniversaire à ton ami ! 🎉
