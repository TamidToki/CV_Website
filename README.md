# Toki Mohammad Tahmid - CV Website

A premium single-page CV/portfolio website built with pure HTML, CSS, and JavaScript. No frameworks, no build tools - just clean, performant code.

## Preview

**Live:** Deploy via GitHub Pages (Settings > Pages > Source: `main` branch)

## Features

### Design
- **Glassmorphism** cards with backdrop blur
- **Indigo/violet** gradient accent palette
- **Space Grotesk + Inter** typography pairing
- **Dark mode** (pure black) with localStorage persistence
- **Responsive** - mobile, tablet, and desktop layouts
- **Print-optimized** styles for CV download

### Interactions
- Animated **particle network** hero background (HTML5 Canvas)
- **Custom cursor** with trailing ring effect (desktop only)
- **Magnetic hover** on buttons and contact links
- Scroll-triggered **animated counters** with easeOutExpo easing
- **Multi-phrase typing** animation that cycles through titles
- **Language proficiency bars** that animate on scroll
- **Staggered fade-in** animations per section
- Animated **hamburger-to-X** mobile navigation
- CSS-only **sun/moon** theme toggle with rotation

### Sections
1. **Hero** - Name, title, location, contact links, availability badge
2. **About** - Professional summary with animated stat counters
3. **Experience** - Vertical timeline with 5 roles
4. **Skills** - 7 categories with tags + animated language bars
5. **Education** - Degree card with spinning accent ring
6. **Achievements** - Hackathon and community engagement
7. **Contact** - Email, phone, LinkedIn, location + Download CV button

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, grid, flexbox, animations) |
| Scripting | Vanilla JavaScript (ES5 compatible) |
| Fonts | Google Fonts (Space Grotesk, Inter) |
| Icons | Font Awesome 6 |
| Hosting | GitHub Pages |

## File Structure

```
CV_Website/
  index.html           # Single-page HTML
  css/styles.css       # All styles (~1500 lines)
  js/main.js           # All interactions (~320 lines)
  assets/favicon.svg   # Gradient TMT monogram
  README.md
```

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/TamidToki/CV_Website.git
   ```
2. Open `index.html` in any modern browser
3. No build step required

## Deployment (GitHub Pages)

1. Go to repository **Settings** > **Pages**
2. Set Source to **Deploy from a branch**
3. Select **main** branch, root folder
4. Your site will be live at `https://tamidtoki.github.io/CV_Website/`

## Browser Support

- Chrome 80+
- Firefox 80+
- Safari 14+
- Edge 80+

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Skip-to-content link
- `prefers-reduced-motion` disables all animations
- WCAG AA contrast ratios
- Keyboard navigable

## License

All rights reserved. Personal CV website of Toki Mohammad Tahmid.
