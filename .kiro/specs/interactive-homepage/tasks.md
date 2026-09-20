# Implementation Plan

- [x] 1. Set up testing infrastructure and interactive logic module
  - Add Vitest and fast-check as dev dependencies and a `test` script in package.json
  - Create `vitest.config.ts` with jsdom environment and a `test` glob under `src`
  - Create the `src/lib/interactive/` directory with an `index.ts` barrel export
  - _Requirements: 7.1_

- [x] 2. Implement counter parsing logic
- [x] 2.1 Write `parseStatValue` and `formatStat` in `src/lib/interactive/counter.ts`
  - Parse a stat string into `{ target, prefix, suffix, hasNumber }`
  - Implement `formatStat(parsed, current)` to reassemble prefix + number + suffix, passing through when `hasNumber` is false
  - _Requirements: 1.1, 1.2, 1.3_

- [x]* 2.2 Write property test for stat parse/format
  - **Feature: interactive-homepage, Property 1: Stat parse/format round-trip and pass-through**
  - **Validates: Requirements 1.1, 1.2, 1.3**

- [x]* 2.3 Write unit tests for `parseStatValue`/`formatStat`
  - Cover `"500+"`, `"95%"`, `"Coming soon"`, and `""`
  - _Requirements: 1.2, 1.3_

- [x] 3. Implement radial selector logic
- [x] 3.1 Write `angleForIndex` and `radialStep` in `src/lib/interactive/radial.ts`
  - `angleForIndex(index, count)` returns `index * (360 / count)` normalized to [0, 360)
  - `radialStep(focusIndex, delta, count)` wraps via modulo and is safe when count is 0
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x]* 3.2 Write property test for radial angles
  - **Feature: interactive-homepage, Property 2: Radial angles are evenly distributed**
  - **Validates: Requirements 3.1**

- [x]* 3.3 Write property test for radial step
  - **Feature: interactive-homepage, Property 3: Radial step stays in range and wraps**
  - **Validates: Requirements 3.2, 3.3, 3.4**

- [x] 4. Implement progression, tilt, and bounds logic
- [x] 4.1 Write `stepForProgress` in `src/lib/interactive/progression.ts`
  - Return `min(floor(progress * stepCount), stepCount - 1)`, bounded and safe
  - _Requirements: 5.1, 5.2_

- [x]* 4.2 Write property test for scroll progress mapping
  - **Feature: interactive-homepage, Property 4: Scroll progress maps to a valid bounded step**
  - **Validates: Requirements 5.1, 5.2**

- [x] 4.3 Write `computeTilt` in `src/lib/interactive/tilt.ts`
  - Clamp each axis to ±maxDeg, match sign to offset, return zero at center
  - _Requirements: 4.1, 4.2, 4.3_

- [x]* 4.4 Write property test for tilt clamping
  - **Feature: interactive-homepage, Property 5: Tilt is clamped and directionally correct**
  - **Validates: Requirements 4.1, 4.2, 4.3**

- [x] 4.5 Write `clampIndex` in `src/lib/interactive/bounds.ts`
  - Return 0 when length is 0, otherwise clamp into [0, length-1]
  - _Requirements: 2.2, 2.3, 6.1, 6.2, 6.3, 3.5_

- [x]* 4.6 Write property test for index clamping
  - **Feature: interactive-homepage, Property 6: Index clamping stays within bounds**
  - **Validates: Requirements 2.2, 6.1, 6.2, 2.3, 6.3, 3.5**

- [x] 5. Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Build the animated hero counters
- [x] 6.1 Create `src/components/interactive/Counter.tsx`
  - Animate from 0 to `target` with Framer Motion, format via `formatStat`
  - Render final value immediately when `useReducedMotion` is active
  - _Requirements: 1.1, 1.4, 8.1_

- [x] 6.2 Wire Counters into the hero/stats display
  - Replace the static stat numbers in `Hero.tsx` and `Stats.tsx` with `Counter`
  - _Requirements: 1.1_

- [x] 7. Build the tilt card wrapper
- [x] 7.1 Create `src/components/interactive/TiltCard.tsx`
  - Apply `computeTilt` on pointer/touch move, reset to zero on leave
  - No-op (zero rotation) when `useReducedMotion` is active
  - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [x] 8. Build the course carousel
- [x] 8.1 Create `src/components/interactive/CourseCarousel.tsx`
  - Horizontal drag/scroll list of course cards wrapped in `TiltCard`
  - Keyboard Left/Right navigation using `clampIndex`; render empty container when no courses
  - Provide accessible names on navigation controls
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 8.2, 8.3_

- [x] 8.2 Wire the carousel into `app/page.tsx`
  - Pass `courses` prop and place near the existing Courses section
  - _Requirements: 2.1_

- [x] 9. Build the radial course selector
- [x] 9.1 Create `src/components/interactive/RadialSelector.tsx`
  - Position items with `angleForIndex`; next/prev buttons and arrow keys call `radialStep`
  - Render empty container when course count is 0; accessible names on rotate controls
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 8.2, 8.3_

- [x] 9.2 Wire the radial selector into `app/page.tsx`
  - _Requirements: 3.1_

- [x] 10. Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Build the scroll progression section
- [x] 11.1 Create `src/components/interactive/ScrollProgression.tsx`
  - Use Framer Motion `useScroll` and `stepForProgress` to pick the active step
  - Render all steps as a static ordered list when `useReducedMotion` is active
  - _Requirements: 5.1, 5.2, 5.3, 8.1_

- [x] 11.2 Wire the progression section into `app/page.tsx` with static step content
  - _Requirements: 5.1_

- [x] 12. Build the projects gallery
- [x] 12.1 Create `src/components/interactive/ProjectsGallery.tsx`
  - Swipe/button/keyboard navigation bounded via `clampIndex`; empty-safe container
  - Accessible names on navigation controls
  - _Requirements: 6.1, 6.2, 6.3, 8.2, 8.3_

- [x] 12.2 Wire the gallery into `app/page.tsx` with static project content
  - _Requirements: 6.1_

- [x] 13. Add lazy-loading for any heavy library
- [x] 13.1 Create `src/components/interactive/LazySection.tsx`
  - Wrap heavy-library sections with `next/dynamic` (`ssr: false`) and a placeholder
  - Apply it to any section that imports a Heavy_Library so none enters the initial bundle
  - _Requirements: 7.1, 7.2, 7.3_

- [x] 14. Final Checkpoint - Make sure all tests are passing
  - Ensure all tests pass, ask the user if questions arise.
