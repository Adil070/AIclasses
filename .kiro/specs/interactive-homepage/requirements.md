# Requirements Document

## Introduction

This feature adds a set of lightweight, mobile-first interactive experiences to the AI Computer Institute marketing homepage. The goal is to make the existing clean design feel tactile and alive ("touch this and something happens") without turning the site into a heavy WebGL application. All interactions are built with CSS transforms, Framer Motion, and selectively GSAP. Any heavy dependency is loaded only on demand via dynamic import so the initial page load stays fast on mobile networks. All motion respects the user's reduced-motion preference and degrades to a readable static state.

The feature covers six interactive sections: an animated hero with number counters, a swipe/drag course carousel, a radial (circular) course selector, pointer/touch card tilt, a scroll-driven course progression section, and a swipeable student projects gallery.

## Glossary

- **Homepage_System**: The Next.js homepage and its client-side interactive components rendered at the site root route.
- **Reduced_Motion_Preference**: The user setting exposed by the CSS media feature `prefers-reduced-motion: reduce`.
- **Counter**: A component that animates a displayed number from a start value up to a target value.
- **Stat_Value**: A string field from site settings (for example `"500+"`) that may contain a numeric portion and non-numeric decorators.
- **Course_Carousel**: A horizontally scrollable/swipeable list of course items.
- **Radial_Selector**: A circular arrangement of course items that rotates to bring a selected course to a focus position.
- **Tilt_Card**: A card element that rotates in 3D in response to pointer or touch position.
- **Scroll_Progression**: A section whose visible content changes as a function of the user's scroll position within that section.
- **Projects_Gallery**: A swipeable gallery of student project items.
- **Dynamic_Import**: A Next.js code-splitting mechanism that loads a module only when it is needed rather than in the initial bundle.
- **Initial_Bundle**: The JavaScript downloaded and executed for the first paint of the homepage route, excluding modules behind a Dynamic_Import.
- **Heavy_Library**: Any animation or rendering dependency larger than 50 kilobytes minified, including GSAP and Three.js.
- **Focus_Index**: The zero-based index of the course currently in the focus position of the Radial_Selector.

## Requirements

### Requirement 1

**User Story:** As a visitor on a phone, I want the hero section to animate in smoothly and count up the headline stats, so that the site feels modern and credible on first impression.

#### Acceptance Criteria

1. WHEN the hero section mounts, THE Homepage_System SHALL animate each Counter from zero to the numeric portion of the corresponding Stat_Value.
2. WHERE a Stat_Value contains non-numeric characters, THE Homepage_System SHALL preserve those characters in the final rendered text after the Counter completes.
3. WHERE a Stat_Value contains no numeric portion, THE Homepage_System SHALL render the Stat_Value text unchanged.
4. WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL render each Stat_Value at its final value without incremental counting.

### Requirement 2

**User Story:** As a visitor, I want to swipe through courses horizontally, so that I can browse many courses in a compact, touch-friendly area.

#### Acceptance Criteria

1. WHEN a visitor drags or swipes the Course_Carousel horizontally, THE Homepage_System SHALL scroll the carousel content along the horizontal axis.
2. THE Homepage_System SHALL constrain the Course_Carousel scroll position to the range between the first item fully visible and the last item fully visible.
3. WHERE the course list is empty, THE Homepage_System SHALL render the Course_Carousel container without throwing an error.
4. WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL disable momentum and inertia animation on the Course_Carousel while keeping horizontal scrolling functional.

### Requirement 3

**User Story:** As a visitor, I want a circular course selector I can rotate, so that exploring courses feels playful and distinctive.

#### Acceptance Criteria

1. THE Radial_Selector SHALL position each course item at an equal angular interval of three hundred sixty degrees divided by the course count.
2. WHEN a visitor advances the Radial_Selector by one step, THE Radial_Selector SHALL increment the Focus_Index by one modulo the course count.
3. WHEN a visitor reverses the Radial_Selector by one step, THE Radial_Selector SHALL decrement the Focus_Index by one modulo the course count.
4. THE Radial_Selector SHALL keep the Focus_Index within the range zero to the course count minus one for any sequence of step operations.
5. WHERE the course count is zero, THE Homepage_System SHALL render the Radial_Selector container without throwing an error.

### Requirement 4

**User Story:** As a visitor, I want cards to tilt toward my pointer or touch, so that the interface feels responsive and three-dimensional.

#### Acceptance Criteria

1. WHEN a visitor moves a pointer across a Tilt_Card, THE Homepage_System SHALL apply a rotation whose sign corresponds to the pointer offset from the card center.
2. THE Homepage_System SHALL clamp the Tilt_Card rotation on each axis to a fixed maximum degree magnitude.
3. WHEN the pointer leaves a Tilt_Card, THE Homepage_System SHALL return the Tilt_Card rotation to zero on both axes.
4. WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL keep the Tilt_Card rotation at zero for all pointer positions.

### Requirement 5

**User Story:** As a visitor, I want a scroll-driven section that visually progresses through a learning journey, so that I understand the path from basics to advanced skills.

#### Acceptance Criteria

1. WHILE a visitor scrolls within the Scroll_Progression section, THE Homepage_System SHALL select the active step from the scroll progress using the mapping active step equals the floor of scroll progress multiplied by the step count, bounded to the last step index.
2. THE Homepage_System SHALL map a scroll progress of zero to the first step and a scroll progress of one to the last step.
3. WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL display all Scroll_Progression steps as a static readable list.

### Requirement 6

**User Story:** As a visitor, I want to swipe through student projects, so that I can see real outcomes from the institute.

#### Acceptance Criteria

1. WHEN a visitor swipes the Projects_Gallery to the next item, THE Homepage_System SHALL advance the active project index by one bounded to the last project index.
2. WHEN a visitor swipes the Projects_Gallery to the previous item, THE Homepage_System SHALL decrease the active project index by one bounded to zero.
3. WHERE the project list is empty, THE Homepage_System SHALL render the Projects_Gallery container without throwing an error.

### Requirement 7

**User Story:** As a site owner, I want heavy animation code to load only when needed, so that mobile visitors get a fast initial page load and I stay within hosting limits.

#### Acceptance Criteria

1. THE Homepage_System SHALL exclude every Heavy_Library from the Initial_Bundle.
2. WHERE a section requires a Heavy_Library, THE Homepage_System SHALL load that library through a Dynamic_Import triggered when the section is reached.
3. WHILE a Dynamic_Import for a section is pending, THE Homepage_System SHALL render a placeholder for that section.

### Requirement 8

**User Story:** As a visitor who prefers reduced motion or uses assistive technology, I want the site to remain fully usable without animation, so that I can access all content comfortably.

#### Acceptance Criteria

1. WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL render all interactive sections in a state that exposes their full content without motion.
2. THE Homepage_System SHALL provide keyboard-operable controls for the Course_Carousel, the Radial_Selector, and the Projects_Gallery.
3. WHERE an interactive control has no visible text label, THE Homepage_System SHALL provide an accessible name for that control.
