# Design System: Digital Heirloom Editorial

## 1. Overview & Creative North Star

The Creative North Star for this design system is **"The Digital Heirloom."** 

This system transcends standard app interfaces by treating digital space as a curated, high-end editorial experience. We are moving away from the "disposable" nature of modern tech toward something that feels permanent, warm, and authoritative. By blending the vibrant, heritage-rich palette of deep reds, teals, and ambers with a sophisticated typographic scale, we create a visual language of "Digital Craftsmanship."

To break the "template" look, this system utilizes **intentional asymmetry** and **tonal layering**. Rather than rigid columns, we use breathing room and overlapping elements to guide the eye. This isn't just a tool; it's a digital space that feels as intentional as a leather-bound book or a bespoke gallery.

---

## 2. Colors

The color story is built on a foundation of warmth (`background: #fff9ef`) punctuated by high-contrast, sophisticated jewel tones.

### Color Strategy
*   **Primary (`#7d001a`):** A sophisticated deep red. Use this for moments of high authority and brand identity. It represents the "Hearth"—the heart of the home.
*   **Secondary (`#09677b`):** A deep teal/aqua. This is our "Trust" color, used for interactive elements and supportive callouts.
*   **Tertiary (`#5f2f00`):** A warm amber/burnt orange. Use this sparingly for accentuation, badges, or "human" highlights.

### The Rules of Surface
*   **The "No-Line" Rule:** 1px solid borders are strictly prohibited for sectioning. Contrast and hierarchy must be achieved through background shifts. A `surface-container-low` block should sit on a `surface` background to define its boundaries.
*   **Surface Hierarchy & Nesting:** Treat the UI as physical layers. Use the `surface-container` tiers (Lowest to Highest) to create depth. For example, a dashboard might sit on `surface`, while individual content modules use `surface-container-lowest` to "lift" off the page organically.
*   **The "Glass & Gradient" Rule:** For floating elements or Hero CTAs, use semi-transparent surface colors with a `backdrop-blur` (Glassmorphism). To add "soul," apply subtle linear gradients from `primary` to `primary_container` on high-value buttons.

---

## 3. Typography

The typography is a dialogue between **Newsreader** (an authoritative serif) and **Manrope** (a clean, modern sans-serif).

*   **Display & Headlines (Newsreader):** These are the "editorial" voice. Use high-contrast sizing (`display-lg` at 3.5rem) to create a sense of importance. The serif conveys tradition, trust, and a high-end feel.
*   **Title & Body (Manrope):** These are the "utility" voice. Manrope provides exceptional legibility for functional data and long-form reading. 
*   **The Hierarchy:** Use `display-sm` for section headers to make them feel like book chapters. Use `label-md` in all-caps with increased letter-spacing for metadata to add a "curated" feel.

---

## 4. Elevation & Depth

We reject drop-shadow-heavy designs. Hierarchy is achieved through **Tonal Layering**.

*   **The Layering Principle:** Stacking `surface-container` tiers creates natural depth. An inner card (`surface-container-highest`) inside a container (`surface-container-low`) creates a focal point without a single line of CSS border.
*   **Ambient Shadows:** If an element must float (like a modal or fab), use a shadow tinted with the `on-surface` color.
    *   *Opacity:* 4% to 8%
    *   *Blur:* 32px to 64px
*   **The "Ghost Border":** If accessibility requires a stroke, use `outline-variant` at 15% opacity. Never use 100% opaque borders.
*   **Glassmorphism:** Use `surface_bright` with a 70% opacity and a 12px backdrop blur for navigation bars and floating menus to allow the brand colors to bleed through softly.

---

## 5. Components

### Buttons
*   **Primary:** Solid `primary` background with `on_primary` text. Use the `lg` roundedness scale (1rem). For "Hero" buttons, add a subtle top-to-bottom gradient (`primary` to `primary_container`).
*   **Secondary:** Solid `secondary` (Teal) for secondary actions like "Add to Library."
*   **Tertiary:** Text-only with an underline on hover, using the `primary` color.

### Cards & Lists
*   **No Dividers:** Forbid the use of line dividers. Separate list items using 16px or 24px of vertical whitespace or subtle alternating backgrounds (`surface` to `surface-container-low`).
*   **Layered Cards:** Use `surface-container-lowest` for cards to create a "paper on wood" effect against the `background`.

### Inputs & Fields
*   **Styling:** Use `surface-container-high` for the input fill. The "Ghost Border" rule applies here. Labels should always be in `label-md` Manrope.

### Signature Component: The "Heirloom Badge"
*   Use the `tertiary` (amber) background with `on_tertiary` text and `full` roundedness. This is used for status indicators or high-priority notifications, mimicking a wax seal or premium tag.

---

## 6. Do's and Don'ts

### Do
*   **DO** use whitespace as a structural element. If in doubt, add more padding.
*   **DO** use `display-lg` typography for impactful entry points.
*   **DO** mix the Teal (`secondary`) and Red (`primary`) in the same view to reflect the "vibrant heritage" of the brand.
*   **DO** ensure all text on `primary` or `secondary` backgrounds meets WCAG AA contrast ratios using the provided `on_` tokens.

### Don't
*   **DON'T** use black (`#000000`) for text. Always use `on_surface` (#1d1b16) to maintain warmth.
*   **DON'T** use 90-degree corners. Refer strictly to the **Roundedness Scale**, specifically `md` (0.75rem) and `lg` (1rem).
*   **DON'T** use "Standard" shadows. If an element looks like it's hovering with a dark grey shadow, it's a violation of the "Digital Heirloom" aesthetic.
*   **DON'T** use horizontal rules (`<hr>`). Use a background color shift instead.