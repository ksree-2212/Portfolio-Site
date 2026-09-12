# Portfolio Frontend Visual Overhaul

Elevate the portfolio from "clean and functional" to "wow, this is premium" — adding depth, motion, and interactivity while keeping the computer-vision detection theme intact.

## Proposed Changes

### Global Effects Layer
#### [NEW] `components/ParticleGrid.js`
A full-viewport canvas component that draws a subtle animated grid of dots + connecting lines — evoking a neural network / computer vision feature-map. Renders behind all content with `position: fixed` and low opacity. Dots drift slowly; nearby dots connect with faint lines.

#### [NEW] `components/ScrollProgress.js`
A thin gradient bar (`signal → amber`) pinned to the very top of the viewport that fills left-to-right as the user scrolls.

#### [MODIFY] `app/globals.css`
- Add animated noise/grain texture overlay for depth (CSS `background-image` with a tiny noise SVG, low opacity)
- Add `@keyframes` for glow pulse, shimmer sweep, gradient rotation, scanning line
- Enhanced `.scan-frame` corners: add `box-shadow` glow on `.in-view`, scanning-line pseudo-element that sweeps horizontally when revealed
- Custom `::selection` with gradient
- Smooth gradient background mesh animation on `body`

---

### Navigation
#### [MODIFY] `components/Nav.js`
- **Active section highlighting**: Use `IntersectionObserver` to track which section is in view and highlight the matching nav link with the `signal` color + animated underline
- **Hover underline animation**: Animated expanding underline from center on hover
- **Logo pulse**: Subtle glow pulse on the `.` accent

---

### Hero Section  
#### [MODIFY] `components/Hero.js`
- **Gradient animated text**: The name uses a sweeping gradient (`signal → amber → signal`) via `background-clip: text` with animated `background-position`
- **Typewriter effect**: The tagline types out character by character with a blinking cursor
- **Animated scan line**: A horizontal glowing line sweeps across the bounding box around the name
- **Staggered CTA buttons**: Buttons slide in with spring physics, gain a shimmer/shine sweep on hover
- **Floating badge**: A small `"AI & CV Engineer"` badge with animated border gradient

---

### ScanReveal (Shared Animation Wrapper)
#### [MODIFY] `components/ScanReveal.js`
- **Scanning line**: When entering view, a thin horizontal glowing line sweeps top-to-bottom inside the frame before content fades in
- **Corner glow**: The corner brackets gain a subtle `box-shadow` glow that pulses once on reveal
- **Enhanced easing**: Use spring-based easing for a more organic feel

---

### About Section
#### [MODIFY] `components/About.js`
- **Education cards**: Add animated gradient border (rotating hue), lift + shadow on hover, glassmorphism (`backdrop-blur` + semi-transparent `bg-panel`)
- **Score highlight**: The CGPA/percentage values get a count-up animation when scrolled into view
- **Bio text**: Key phrases highlighted with `signal` color underline

---

### Skills Section
#### [MODIFY] `components/Skills.js`
- **Skill pills**: Glow on hover (colored `box-shadow`), slight float-up transform, background fill animation
- **Category headers**: Add subtle icon indicators
- **Staggered entrance**: Each pill animates in with increasing delay for a "cascade" effect
- **Certification items**: Add a subtle shimmer/shine sweep animation

---

### Projects Section
#### [MODIFY] `components/Projects.js`
- **Glassmorphism cards**: `backdrop-blur`, gradient border, subtle noise texture
- **3D tilt effect**: Cards tilt slightly toward the mouse cursor on hover (CSS `perspective` + JS `mousemove`)
- **Animated confidence bar**: A thin gradient bar fills to the confidence percentage with animation
- **Card shine effect**: A diagonal light sweep on hover
- **Stack tags**: Subtle pulse animation on the tech hashtags
- **View project link**: Animated arrow that slides right on hover

---

### Experience Section
#### [MODIFY] `components/Experience.js`
- **Animated timeline**: The vertical border-left draws downward on scroll (height transitions from 0 to 100%)
- **Pulsing dot**: The timeline dot gets a radiating pulse animation
- **Card hover**: Subtle left-shift + border color change on hover
- **Period badge**: Enhanced with gradient background

---

### Contact Section
#### [MODIFY] `components/Contact.js`
- **Gradient animated CTA button**: The email button has a rotating gradient border + shimmer
- **Social links**: Scale up + glow on hover with smooth spring animation
- **Background glow**: Large, soft radial gradient glow behind the section heading
- **Footer**: Add a subtle animated divider line

---

### Layout
#### [MODIFY] `app/layout.js`
- Import and render `ParticleGrid` and `ScrollProgress` components

#### [MODIFY] `app/page.js`
- No structural changes needed (components self-contained)

## Verification Plan

### Manual Verification
- Run `npm run dev` and visually inspect each section
- Check animations are smooth (no jank)
- Verify mobile responsiveness is preserved
- Test `prefers-reduced-motion` still disables animations
