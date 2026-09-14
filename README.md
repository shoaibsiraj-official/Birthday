# Birthday.exe — Shireen ❤️

A mobile-first interactive birthday website.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Customize

Open `src/main.jsx` and edit the `data` object:
- `herName`
- `birthday`
- `memories`
- `questions`
- personal messages

Put photos in `public/photos/` using the names listed in `public/photos/README.txt`.

## Music

Put your own legally usable song file at:

`public/music.mp3`

The music starts after the user clicks **ENTER** on the intro, which satisfies normal browser autoplay restrictions. The Music button can then pause/resume it.

## Deploy to Vercel

Push this folder to GitHub and import the repository into Vercel. Vercel detects Vite automatically.

Build command: `npm run build`
Output directory: `dist`
