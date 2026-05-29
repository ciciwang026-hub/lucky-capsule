# Lucky Capsule · Solvely

A "gachapon mistake-trainer" mockup — a fake-door feature test for Solvely.ai's experiment lab.

Pop a mystery capsule every day → Solvely picks your past mistakes → crush 5 of them in 5 minutes.
Designed as a **filming-ready demo** for campus ambassadors to record TikTok content with.

## Flow

1. **Home** — Solvely main page with a "Lucky Capsule · 5 minutes a day" banner at the bottom
2. **Pick subject** — Math / History / Physics / Surprise Me (mixed)
3. **Gachapon machine** — Tap to POP; 8 chaotic shape-balls (heart / star / teardrop / bunny / hexagon / etc.) frenzy-fly inside a glass globe
4. **Reveal** — "Challenge Your Weak Spots." + 5 mistake cards fan out
5. **5-min review** — Sticky countdown bar, 5 multiple-choice past mistakes, each with AI "why you got this wrong" explanation
6. **Done** — Streak +1, confetti, share-to-story

## Run locally

```bash
python3 -m http.server 8767
# open http://localhost:8767
```

No build step — pure HTML / CSS / JS.

## Filming guidance for ambassadors

- **Capture mode**: Phone-camera-on-laptop-screen (not screen-recording). UI is designed for 1280+ desktop, large fonts, high contrast.
- **Hero moment**: The `POP` → balls go chaotic → SSR gold-crown ball drops → "Challenge Your Weak Spots." reveal (about 3 seconds total).
- **Hook angle**: "Solvely knows what I've gotten wrong" + "5 minutes a day, my mistakes get crushed."

## Stack

- Vanilla HTML + CSS + JS (no framework)
- Inline SVG for ball shapes (heart, star, teardrop, hexagon, bunny-ear, rounded-square) + cute face symbols
- CSS keyframe animations (each ball has its own frenzy path)
- All views are static mockups — no backend
