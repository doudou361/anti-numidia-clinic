# BRANDING GUIDES: Numidia Dental House

## 1. Core Palette ("Porcelaine")

Exactly these six tokens. No hardcoded hex values in components.

| Token | Hex | Usage |
| :--- | :--- | :--- |
| `--porcelain` | `#FBF7F5` | Page background |
| `--blush` | `#F6E7E3` | Surfaces, cards, section bands (logo background) |
| `--rose` | `#C58C88` | Brand mark colour — strokes, icons, decorative type, large display type |
| `--rose-deep` | `#A2605C` | ALL rose-coloured body text, links, buttons, focus rings (contrast-safe) |
| `--ink` | `#241C1A` | Primary text |
| `--muted` | `#7A6A66` | Secondary text, captions, disabled |

### Rules
- `--rose` **never** carries small text (fails AA contrast).
- Buttons are `--rose-deep` fill on `--porcelain`, or outline in `--rose` for secondary.
- **No gradients.**
- **No drop shadows** (except a single 40px/8% rose glow for the open modal).
- **No pure black or pure white.**

## 2. Typography

Two families, perfectly subset (latin + latin-ext).

### Display: Cormorant Garamond
- **Weights:** 300 / 500
- **Usage:** Large headings, with tight leading.
- **Styling:** Section titles in sentence case. Wordmark and eyebrows in uppercase with `0.18em` tracking.

### Body & Utility: Inter
- **Weights:** 400 / 500
- **Usage:** Body text, UI elements, labels.
- **Body Styling:** Line-height 1.65, max measure 68ch.
- **Utility Styling:** Weight 500, 11px, uppercase, `0.14em` tracking (eyebrows, step labels, badges).

### Fluid Type Scale (Clamp-based)
- `12px` / `14px` / `16px` / `20px` / `28px` / `40px` / `64px` / `88px`

## 3. Signature Element: "Le Nuancier"

The single memorable device across the site, based on the VITA shade guide.
- A horizontal strip of 12 rounded vertical tabs, representing enamel tones (ivory → warm beige, desaturated).
- **Hero:** Sits along the bottom. On load, tabs stagger in LTR, leftmost three brighten once, then settle.
- **Résultats:** The before/after slider handle is a single shade tab.
- **Booking Modal:** The 4-step progress indicator is the nuancier (4 tabs that fill progressively).
- **Rule:** Do not use `01 / 02 / 03` markers, icon grids, or floating gradient blobs.

## 4. Motion (Framer Motion)

- **Shared Easing:** `[0.22, 0.61, 0.36, 1]`
- **Durations:** 240–480ms
- **Scroll Reveals:** 16px rise + fade, staggered 60ms, triggered once.
- **Hover Interactions:**
  - Cards: 1.5% scale
  - Links: underline-grow
  - Buttons: fill-slide
- **Modal Opening:** 12px rise + opacity + backdrop blur-in. Steps cross-fade and slide 24px x-axis.
- **Accessibility:** `prefers-reduced-motion: reduce` must disable all transforms, keeping opacity only.

## 5. Component Anatomy

- **Buttons (Primary):** Pill shape, `--rose-deep` fill, `--porcelain` text.
- **Buttons (Secondary):** Pill shape, `--rose` outline, `--rose-deep` text.
- **Cards:** `--blush` surface, 20px radius, 32px padding. Hover: 1.5% scale, 1px `--rose` hairline border.
- **Focus Rings:** 2px `--rose-deep`, 2px offset on all focusable elements.

## 6. The "Do Not" List
- Do not use generic tailwind colors (red, blue, etc.).
- Do not invent claims, prices, or practitioners.
- Do not use stock photos of unrelated people.
- Do not use generic 3D icons.
- Do not use any UI kit other than Shadcn Dialog.
- Do not use gradients.
- Do not skip heading levels.
