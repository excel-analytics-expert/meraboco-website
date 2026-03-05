# Meraboco Design System Documentation

**Last Updated**: 2026-02-16  
**Design Lead**: s.kenichi  
**Philosophy**: "Rich Aesthetics" - Wow the user at first glance

---

## 1. Core Design Principles

### Design Philosophy

> **"Rich Aesthetics"** - A design that wows the user at first glance through:
> - Premium visual quality that feels state-of-the-art
> - Tactile, physical sensations in a digital medium
> - Micro-animations that breathe life into interfaces
> - Harmonious balance between technology and humanity

### The "0.9 Second Rule"

**Standard Animation Duration**: `0.9s` (or `1.2s` for complex transitions)

**Rationale**:
- Slower than typical 0.3s animations
- Creates a sense of **luxury** and **intentionality**
- Allows users to **perceive the craftsmanship**
- Evokes **calm professionalism** (not rushed, confident)

**Easing Function**: `cubic-bezier(0.34, 1.56, 0.64, 1)`
- Spring-based easing with slight overshoot
- Natural, organic movement
- Mimics physical interactions

---

## 2. Color System (OKLCH)

### Why OKLCH?

Traditional RGB/HEX color spaces have perceptual inconsistencies. OKLCH provides:
- **Uniform brightness** across all hues
- **Predictable saturation** behavior
- **Future-proof** for wide-gamut displays

### Color Palette

#### Primary Colors

```css
/* Deep Blue/Cyan - Brand Primary */
--primary: oklch(0.55 0.22 263);
--primary-foreground: oklch(0.98 0 0);

/* Secondary - Soft Gray */
--secondary: oklch(0.96 0 0);       /* Light mode */
--secondary: oklch(0.269 0 0);      /* Dark mode */
```

#### Neon Accents (Glassmorphism Borders)

```css
--neon-cyan: oklch(0.8 0.15 190);
--neon-green: oklch(0.75 0.2 150);
--neon-blue: oklch(0.7 0.18 240);
```

**Usage**:
- Hover state borders
- Glowing effects on interactive elements
- Pulse animations for status indicators

#### Neutral Colors

```css
/* Light Mode */
--background: oklch(0.98 0 0);      /* Almost white */
--foreground: oklch(0.15 0 0);      /* Deep charcoal */
--muted: oklch(0.96 0 0);           /* Light gray */
--border: oklch(0.91 0 0);          /* Border gray */

/* Dark Mode */
--background: oklch(0.145 0 0);     /* Deep dark */
--foreground: oklch(0.985 0 0);     /* Near white */
--muted: oklch(0.269 0 0);          /* Dark gray */
--border: oklch(0.269 0 0);         /* Border dark */
```

#### Semantic Colors

```css
/* Destructive (Error) */
--destructive: oklch(0.576 0.215 25.331);           /* Light mode */
--destructive: oklch(0.396 0.141 25.723);           /* Dark mode */
--destructive-foreground: oklch(0.98 0 0);          /* Light mode */
--destructive-foreground: oklch(0.637 0.237 25.331); /* Dark mode */
```

### Color Application Rules

1. **Never use pure white** (`#ffffff`) - always use `oklch(0.98 0 0)` for warmth
2. **Never use pure black** (`#000000`) - use `oklch(0.145 0 0)` for depth
3. **Maintain contrast ratios** ≥ 4.5:1 for text (WCAG AA)
4. **Use neon accents sparingly** - only for interactive feedback

---

## 3. Typography System

### Font Stack

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

**Fallback Strategy**:
1. System UI fonts (best performance)
2. Platform-specific fonts (macOS, Windows, Linux)
3. Generic sans-serif

### Type Scale

```
Title (Hero):   clamp(2.5rem, 8vw, 6rem)    /* 40-96px */
Heading 1:      3rem (48px)
Heading 2:      2.25rem (36px)
Heading 3:      1.875rem (30px)
Heading 4:      1.5rem (24px)
Body Large:     1.125rem (18px)
Body:           1rem (16px)
Small:          0.875rem (14px)
Caption:        0.75rem (12px)
```

### Typographic Parameters

```css
/* Base Settings */
letter-spacing: 0.01em;                     /* Subtle tracking */
font-feature-settings: "kern" 1, "liga" 1;  /* Kerning + Ligatures */
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
```

### Text Effects

**Hero Text (Glowing)**:
```css
text-shadow: 
  0 0 10px rgba(255, 255, 255, 0.3),    /* Inner glow */
  0 2px 4px rgba(0, 0, 0, 0.4);         /* Depth shadow */
```

**Neon Text**:
```css
text-shadow: 
  0 4px 20px rgba(0, 0, 0, 0.9),        /* Deep shadow */
  0 0 60px rgba(0, 255, 200, 0.4),      /* Cyan glow */
  0 0 100px rgba(0, 200, 255, 0.2);     /* Blue halo */
```

**Subtitle (Subtle Shadow)**:
```css
text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
```

---

## 4. Glassmorphism System

### Glass Card (Standard)

**Visual Characteristics**:
- Semi-transparent background
- Strong blur effect
- Subtle border with neon accent
- Multi-layered shadow for depth

```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.2),          /* Main shadow */
    inset 0 1px 0 rgba(255, 255, 255, 0.1), /* Top highlight */
    0 0 0 1px rgba(0, 255, 200, 0.05);      /* Neon outline */
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(0, 255, 200, 0.3);
  transform: translate3d(0, -12px, 0) rotateX(2deg) rotateY(-2deg);
  box-shadow: 
    0 25px 60px rgba(0, 0, 0, 0.3),         /* Elevated shadow */
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 0 30px rgba(0, 255, 200, 0.15);       /* Stronger glow */
}
```

### Glass Shimmer Effect

**Light Sweep on Hover**:
```css
.glass-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(0, 255, 200, 0.1), 
    transparent
  );
  transition: left 0.8s ease;
  pointer-events: none;
}

.glass-card:hover::before {
  left: 100%;
}
```

### Glass Variants

**Main Pricing (Light & Warm)**:
```css
.glass-main-pricing {
  background: rgba(255, 255, 255, 0.9);   /* Higher opacity */
  backdrop-filter: blur(16px);            /* Less blur */
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 4px 20px -1px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(255, 255, 255, 0.8);
  transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1), 
              background-color 0.8s ease, 
              border-color 0.8s ease;
}

.glass-main-pricing:hover {
  background: rgba(255, 252, 240, 0.95); /* Subtle gold/ivory shift */
  border-color: rgba(212, 175, 55, 0.3); /* Soft metallic gold */
}
```

**Crystal Demo (Maximum Transparency)**:
```css
.glass-crystal-demo {
  background: rgba(255, 255, 255, 0.15);  /* Very transparent */
  backdrop-filter: blur(40px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.08),
    0 4px 12px rgba(0, 0, 0, 0.04);
  transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 5. Animation System

### Standard Animations

**Float Up Spring** (Entry Animation):
```css
@keyframes floatUpSpring {
  0% {
    opacity: 0;
    transform: translate3d(0, 80px, 0) scale3d(0.95, 0.95, 1);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -10px, 0) scale3d(1.02, 1.02, 1); /* Overshoot */
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
  }
}

/* Usage */
.reveal {
  opacity: 0;
  animation: floatUpSpring 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
```

**Sand Particle Reveal** (Text Entrance):
```css
@keyframes sandParticleReveal {
  0% {
    opacity: 0;
    filter: blur(20px);
    transform: translate3d(0, 40px, 0) scale3d(0.8, 0.8, 1);
    letter-spacing: 0.3em;
  }
  100% {
    opacity: 1;
    filter: blur(0px);
    transform: translate3d(0, 0, 0) scale3d(1, 1, 1);
    letter-spacing: 0.05em;
  }
}
```

**Ken Burns Effect** (Hero Slider):
```css
@keyframes kenBurns {
  0% {
    transform: scale3d(1, 1, 1) translate3d(0, 0, 0);
  }
  100% {
    transform: scale3d(1.15, 1.15, 1) translate3d(-2%, -2%, 0);
  }
}

/* Applied to hero images */
.hero-slide__image {
  animation: kenBurns 20s ease-out forwards; /* 20 seconds */
}
```

**Neon Pulse** (Status Indicators):
```css
@keyframes neonPulse {
  0%, 100% {
    box-shadow: 
      0 0 5px rgba(0, 255, 200, 0.3), 
      0 0 20px rgba(0, 255, 200, 0.1);
  }
  50% {
    box-shadow: 
      0 0 10px rgba(0, 255, 200, 0.5), 
      0 0 40px rgba(0, 255, 200, 0.2);
  }
}
```

### Interaction Animations

**Button/Link Hover**:
```css
button, a {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
}

button:hover, a:hover {
  transform: translate3d(0, -2px, 0); /* Subtle lift */
}

button:active, a:active {
  transform: translate3d(0, 0, 0);
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

**3D Card Tilt** (Premium Cards):
```css
.glass-card:hover {
  transform: 
    translate3d(0, -12px, 0)        /* Lift 12px */
    rotateX(2deg)                    /* Tilt forward 2° */
    rotateY(-2deg);                  /* Tilt left 2° */
}
```

---

## 6. Texture System

### Grain Filter (Film-like Quality)

**Purpose**: Add subtle analog texture to digital screens

```css
body::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9998;
  opacity: 0.015;   /* Extremely subtle */
  background-image: url("data:image/svg+xml,..."); /* SVG noise filter */
  animation: grain 8s steps(10) infinite;
  will-change: transform;
}

@keyframes grain {
  0%, 100% { transform: translate3d(0, 0, 0); }
  10% { transform: translate3d(-5%, -10%, 0); }
  20% { transform: translate3d(-15%, 5%, 0); }
  30% { transform: translate3d(7%, -25%, 0); }
  40% { transform: translate3d(-5%, 25%, 0); }
  50% { transform: translate3d(-15%, 10%, 0); }
  60% { transform: translate3d(15%, 0%, 0); }
  70% { transform: translate3d(0%, 15%, 0); }
  80% { transform: translate3d(3%, 35%, 0); }
  90% { transform: translate3d(-10%, 10%, 0); }
}
```

**Rationale**:
- `opacity: 0.015` ensures imperceptible but effective texture
- `steps(10)` creates film-frame-like motion
- 8-second cycle prevents pattern recognition

### Glitter Shimmer (Luxury Touch)

```css
.glitter-effect {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.15;
  background-image:
    radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px),
    radial-gradient(circle at 70% 60%, #fff 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, #fff 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px);
  background-size: 80px 80px;
  animation: glitter-shimmer 8s linear infinite;
}

@keyframes glitter-shimmer {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translateY(-5px) scale(1.1);
    opacity: 0.2;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0.1;
  }
}
```

---

## 7. Spacing System

### Base Unit: 4px

```
0   = 0px
1   = 4px
2   = 8px
3   = 12px
4   = 16px
5   = 20px
6   = 24px
8   = 32px
10  = 40px
12  = 48px
16  = 64px
20  = 80px
24  = 96px
32  = 128px
```

### Section Padding

**Mobile (default)**:
```css
.section-padding {
  padding: 6rem 0; /* 96px vertical */
}
```

**Desktop (md+)**:
```css
@media (min-width: 768px) {
  .section-padding {
    padding: 8rem 0; /* 128px vertical */
  }
}
```

### Container Widths

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

---

## 8. Border Radius System

```css
--radius: 0.75rem;              /* 12px - Base */
--radius-sm: calc(var(--radius) - 4px);   /* 8px */
--radius-md: calc(var(--radius) - 2px);   /* 10px */
--radius-lg: var(--radius);               /* 12px */
--radius-xl: calc(var(--radius) + 4px);   /* 16px */
```

**Application Rules**:
- Buttons: `--radius-lg` (12px)
- Cards: `--radius-xl` (16px)
- Modals: `--radius-xl` (16px)
- Inputs: `--radius-md` (10px)

---

## 9. Shadow System

### Elevation Levels

```css
/* Level 1 - Subtle */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

/* Level 2 - Card Default */
box-shadow: 
  0 8px 32px rgba(0, 0, 0, 0.2),
  inset 0 1px 0 rgba(255, 255, 255, 0.1);

/* Level 3 - Card Hover */
box-shadow: 
  0 25px 60px rgba(0, 0, 0, 0.3),
  inset 0 1px 0 rgba(255, 255, 255, 0.2),
  0 0 30px rgba(0, 255, 200, 0.15);

/* Level 4 - Modal */
box-shadow: 
  0 50px 100px rgba(0, 0, 0, 0.4),
  0 20px 40px rgba(0, 0, 0, 0.2);
```

---

## 10. Responsive Design

### Breakpoint Strategy

```css
/* Mobile First */
@media (min-width: 640px)  { ... } /* sm */
@media (min-width: 768px)  { ... } /* md */
@media (min-width: 1024px) { ... } /* lg */
@media (min-width: 1280px) { ... } /* xl */
@media (min-width: 1536px) { ... } /* 2xl */
```

### Fluid Typography

```css
font-size: clamp(2.5rem, 8vw, 6rem);
/* Min: 2.5rem (40px), Preferred: 8vw, Max: 6rem (96px) */
```

---

## 11. Design Tokens Summary

```css
/* Time */
--transition-base: 0.9s;
--transition-long: 1.2s;
--transition-short: 0.5s;

/* Blur */
--blur-light: blur(16px);
--blur-standard: blur(20px);
--blur-heavy: blur(40px);

/* Opacity */
--opacity-glass: 0.08;
--opacity-glass-hover: 0.12;
--opacity-grain: 0.015;

/* Transform */
--lift-hover: translate3d(0, -12px, 0);
--tilt-3d: rotateX(2deg) rotateY(-2deg);
```

---

**Document Status**: Complete  
**Next Review**: When design system v2 is planned  
**Maintainer**: Antigravity

For technical implementation, see `docs/ARCHITECTURE.md`.  
For business rules, see `docs/BUSINESS_RULES.md`.
