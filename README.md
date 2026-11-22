# 🍥 Naruto Ultimate Quiz

> **Test your Shinobi knowledge across 50 progressive anime trials.**

A premium, professionally designed Naruto-inspired quiz game built with **React 19**, **TypeScript**, **Vite 8**, and **Tailwind CSS v4**.

---

## 🎮 Gameplay

- **50 levels** of Naruto trivia, from Academy Student to Hokage Summit
- **2 attempts** per question
- **200 pts** for a first-attempt correct answer (2× multiplier)
- **100 pts** for a second-attempt correct answer
- **Coins** (20 / 10) and **Gems** at milestone levels (every 5 levels + stage bonuses)
- **Auto-save** — progress is stored in localStorage automatically
- **Keyboard shortcuts** — press A/B/C/D or 1/2/3/4 to answer

## 🏯 4 Difficulty Stages

| Stage | Levels | Difficulty |
|---|---|---|
| Academy Student | 1–15 | Very Easy |
| Chunin Trials | 16–30 | Easy |
| Jonin Elite | 31–45 | Normal |
| Hokage Summit | 46–50 | Hard |

---

## ✨ Features

### Profile Customization
- Editable player name
- 4 character avatars (Flame Striker, Crimson Eye, Emerald Medic, Lightning Jonin)
- 7 profile frame styles (None, Flame, Gold, Red, Jade, Sky, Rainbow Seal)
- 6 banner themes (Dark Gold, Will of Fire, Hidden Leaf, Storm Release, Midnight Seal, Cherry Blossom)
- 6 accent colors (Naruto Orange, Sharingan Red, Hokage Gold, Sage Emerald, Lightning Sky, Rinnegan Purple)
- Live preview mode before saving
- Restore to defaults button
- All customizations persist via localStorage

### Visual Design
- **Balanced warm palette** — cream/parchment card surfaces on deep warm dark backgrounds
- **Antonio** display font + **Nunito** body + **JetBrains Mono** for numbers
- Cinematic hero section with Hidden Leaf Village backdrop
- Animated Sharingan decorations, ambient ember particles
- Stage-specific artwork panels
- Warm surface system: `surface-card`, `surface-gold`, `surface-emerald`, `surface-red`, `surface-sky`

### Screens
- 🏠 Home / Dashboard
- ❓ Question / Gameplay arena
- ✅ Level Complete (with reward breakdown)
- 💀 Game Over (with correct answer reveal)
- 👤 Player Profile (with full customization)
- 🏆 Final Victory (with per-level breakdown)
- ⚡ Stage Transition (between difficulty stages)
- 🔔 Confirmation dialogs (Leave / Reset)

---

## 🛠 Tech Stack

| Technology | Version |
|---|---|
| React | 19 |
| TypeScript | 7 |
| Vite | 8 |
| Tailwind CSS | 4 |
| Lucide React | latest |
| Motion | 12 |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── HomeScreen.tsx          # Hero + level grid
│   ├── QuestionScreen.tsx      # Quiz gameplay arena
│   ├── LevelCompleteScreen.tsx # Reward breakdown
│   ├── GameOverScreen.tsx      # Failure + correct answer reveal
│   ├── StageTransitionScreen.tsx # Difficulty stage intro
│   ├── ProfileScreen.tsx       # Full profile + customization
│   ├── VictoryScreen.tsx       # Final win screen
│   ├── ConfirmLeaveModal.tsx   # Leave game dialog
│   ├── ConfirmResetModal.tsx   # Reset progress dialog
│   └── ShinobiGraphics.tsx     # SVG icons + animation components
├── data/
│   ├── questions.ts            # All 50 quiz questions + stage metadata
│   └── avatars.ts              # Avatar definitions
├── types/
│   └── quiz.ts                 # All TypeScript interfaces & types
└── utils/
    ├── storage.ts              # localStorage save/load
    ├── rewards.ts              # Scoring & reward calculation
    ├── sound.ts                # Web Audio API sound engine
    ├── profileUtils.ts         # Profile customization helpers
    └── useAnimatedNumber.ts    # Animated counter hook
```

---

## 🎨 Design System

### Colors
- **Background**: `#120e08` (deep warm dark)
- **Surface Card**: `#fdf8f0` (warm cream)
- **Orange**: `#f97316`
- **Red**: `#dc2626`
- **Gold**: `#f59e0b`
- **Emerald**: `#059669`
- **Sky**: `#0ea5e9`

### CSS Surface Classes
```css
.surface-card     /* Warm cream — default cards */
.surface-dark     /* Deep dark — navbar/overlay */
.surface-orange   /* Orange-tinted accent */
.surface-gold     /* Gold-tinted accent */
.surface-emerald  /* Green-tinted — correct answers */
.surface-red      /* Red-tinted — errors/game over */
.surface-sky      /* Sky-tinted — gems */
```

### Button Classes
```css
.btn-primary  /* Orange→red gradient — main CTAs */
.btn-gold     /* Amber gradient — victory/milestone */
.btn-ghost    /* Outlined warm — secondary actions */
.btn-dark     /* Dark — navigation */
```

---

## ♿ Accessibility

- Keyboard navigation (A/B/C/D and 1/2/3/4 shortcuts)
- `aria-live` regions for feedback announcements
- `prefers-reduced-motion` media query support
- Semantic HTML with proper roles and labels
- Touch-friendly button sizes (min 44×44px)
- Mobile safe-area inset support

---

## 📱 Responsive Breakpoints

| Device | Width |
|---|---|
| Small mobile | 320px+ |
| Standard mobile | 375px+ |
| Large mobile | 430px+ |
| Tablet | 768px+ |
| Laptop | 1024px+ |
| Desktop | 1280px+ |

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
GEMINI_API_KEY=your_key_here
APP_URL=your_deployment_url
```

---

## 📄 License

This project is for educational and personal use. Naruto and all related characters are trademarks of Masashi Kishimoto / Studio Pierrot / VIZ Media.

---

*Built with 🍥 and the Will of Fire.*
