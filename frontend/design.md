---
name: Smart Lottery
colors:
  surface: '#111417'
  surface-dim: '#111417'
  surface-bright: '#37393d'
  surface-container-lowest: '#0b0e11'
  surface-container-low: '#191c1f'
  surface-container: '#1d2023'
  surface-container-high: '#272a2e'
  surface-container-highest: '#323538'
  on-surface: '#e1e2e7'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e1e2e7'
  inverse-on-surface: '#2e3134'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#d0bcff'
  on-secondary: '#3c0091'
  secondary-container: '#571bc1'
  on-secondary-container: '#c4abff'
  tertiary: '#4edea3'
  on-tertiary: '#003824'
  tertiary-container: '#00a572'
  on-tertiary-container: '#00311f'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#111417'
  on-background: '#e1e2e7'
  surface-variant: '#323538'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  max-width: 1280px
---

## Brand & Style
The brand personality is professional, secure, and futuristic, tailored for a high-fidelity Web3 environment. The UI evokes a sense of cutting-edge technology and trust, mirroring the reliability of decentralized protocols while maintaining the excitement of a lottery platform.

The design style is **Glassmorphism** integrated into a **Corporate Modern** framework. It utilizes deep layering, translucent surfaces, and vibrant neon accents to create a high-contrast, immersive digital experience. The interface prioritizes clarity for complex financial data while using atmospheric glows to highlight key interactive moments.

## Colors
The palette is rooted in a deep charcoal and navy base to provide maximum contrast for neon accents. 

- **Core Neutrals:** The canvas uses a near-black (#05070A), with surfaces utilizing a deep charcoal (#0B0E11).
- **Accents:** The primary visual driver is a gradient from Electric Blue (#3B82F6) to Royal Purple (#8B5CF6). This gradient is reserved for primary actions, win states, and brand-heavy elements.
- **Functional Colors:** Success states (Tertiary) use a vibrant Emerald (#10B981) to signify confirmed transactions.
- **Glass Effects:** Surfaces use a white-tinted transparency (4%) with a 10% opacity white border to simulate polished glass.

## Typography
The typography system balances the approachability of a modern sans-serif with the technical precision of a monospaced font.

- **Inter:** Used for all primary UI elements, headlines, and body copy. It provides excellent legibility at small sizes and a clean, neutral tone.
- **JetBrains Mono:** Employed specifically for technical data, including wallet addresses, transaction hashes, and ticket numbers. This reinforces the "Smart" and technical nature of the dApp.
- **Hierarchy:** High contrast is maintained between display text (bold, tight tracking) and body copy (regular weight, generous line-height) to ensure information density remains readable.

## Layout & Spacing
The design system uses a **Fluid Grid** with fixed maximum containers for desktop.

- **Grid Model:** A 12-column grid is used for desktop layouts, transitioning to a single-column layout for mobile.
- **Spacing Rhythm:** Based on a 4px baseline, with most component-level spacing occurring at 16px (md) or 24px (lg) increments.
- **Safe Areas:** Large internal padding (24px to 32px) within glass cards ensures content breathes against the vibrant backgrounds.
- **Mobile Adaptations:** Margins reduce to 16px on mobile devices, and complex data tables reflow into vertical card stacks.

## Elevation & Depth
Depth is created through **Glassmorphism** and backdrop-filter blurs rather than traditional drop shadows.

- **Surface Layers:** The background is a solid dark canvas. Cards sit atop this with a `backdrop-filter: blur(20px)`.
- **Borders:** Every elevated element features a 1px solid border at 10% white opacity. This "inner light" defines the edge of the glass.
- **Hover States:** Interactive elements like cards or buttons trigger a soft, outer glow using the primary electric blue color (`box-shadow: 0 0 20px rgba(59, 130, 246, 0.3)`).
- **Z-Index Strategy:** Modals and toast notifications sit at the highest elevation, featuring a slightly higher opacity (8% white) to distinguish them from standard page cards.

## Shapes
The shape language is smooth and modern, utilizing large corner radii to offset the technical feel of the monospaced type.

- **Large Surfaces:** Main content cards and containers use a **1.5rem (24px)** radius (`rounded-xl`).
- **Interactive Elements:** Buttons and input fields use a **0.5rem (8px)** radius to feel precise yet integrated.
- **Badges:** Wallet address badges and status chips use a fully rounded (pill-shaped) geometry.

## Components
Consistent component styling reinforces the futuristic Web3 aesthetic:

- **Buttons:** 
  - **Primary:** Features the Blue-to-Purple gradient with white text. On hover, the gradient intensifies and an outer glow appears.
  - **Secondary:** Transparent with a 1px glass border; text inherits the primary color.
- **Wallet Address Badges:** Compact pills using `label-mono` typography. They display the truncated address (e.g., 0x12...3456) with a small identicon or network status indicator.
- **Glass Cards:** The foundational container. Must have a subtle 1px border and 20px backdrop blur. Background color is `surface_glass`.
- **Skeleton Loaders:** For data-heavy blockchain fetching, use pulse animations with a dark-to-light charcoal gradient (#1A1D23 to #2C3038).
- **Toast Notifications:** Fixed to the top-right or bottom-right, using a higher glass opacity. Success toasts feature a green glow; error toasts feature a soft red glow.
- **Input Fields:** Dark, recessed backgrounds with a subtle border that glows electric blue upon focus.
