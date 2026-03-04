# Elad Kids Games

Educational games for kids: Hebrew, Maths, and English learning.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to play.

## Build

```bash
npm run build
```

## Deploy to Netlify

1. Push this repo to GitHub
2. In Netlify: **Add new site** → **Import an existing project**
3. Connect your GitHub repo
4. Build settings (usually auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`

## Image Layout (per game)

Images are organised by section and game. Each game has its own folder:

```
public/images/
  hebrew/
    tap-the-letter/
  maths/
    count-the-objects/
      apple.png
  english/
    match-the-word/
      cat.png
      dog.png
      sun.png
      star.png
```

- **Hebrew → Tap the Letter**: `hebrew/tap-the-letter/`
- **Maths → Count the Objects**: `maths/count-the-objects/apple.png`
- **English → Match the Word**: `english/match-the-word/cat.png` (and dog, sun, star)

Reference in code: `/images/{section}/{game-name}/{filename}.png` (path relative to `public`).

New games get their own folder under the relevant section.

## Adding New Games

1. Create a new component in `src/games/{section}/YourGame.jsx`
2. Add the route in `src/sections/{Section}Section.jsx`
3. Add a game card to the section's home page
