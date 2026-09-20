# TRACEABILITY DB

## COVERAGE ANALYSIS

Total requirements: 29
Coverage: 62.07

## TRACEABILITY

### Property 1: Stat parse/format round-trip and pass-through

*For any* stat string, parsing it with `parseStatValue` and then formatting at the parsed target with `formatStat` reproduces the original meaningful value; and *for any* string containing no digits, the formatted result equals the input unchanged.

**Validates**
- Criteria 1.1: WHEN the hero section mounts, THE Homepage_System SHALL animate each Counter from zero to the numeric portion of the corresponding Stat_Value.
- Criteria 1.2: WHERE a Stat_Value contains non-numeric characters, THE Homepage_System SHALL preserve those characters in the final rendered text after the Counter completes.
- Criteria 1.3: WHERE a Stat_Value contains no numeric portion, THE Homepage_System SHALL render the Stat_Value text unchanged.

**Implementation tasks**

**Implemented PBTs**
- No implemented PBTs found

### Property 2: Radial angles are evenly distributed

*For any* course count greater than zero and any index in range, `angleForIndex(index, count)` equals `index * (360 / count)` and lies in the half-open range 0 (inclusive) to 360 (exclusive).

**Validates**
- Criteria 3.1: THE Radial_Selector SHALL position each course item at an equal angular interval of three hundred sixty degrees divided by the course count.

**Implementation tasks**

**Implemented PBTs**
- No implemented PBTs found

### Property 3: Radial step stays in range and wraps

*For any* course count greater than zero, any starting focus index in range, and any integer step delta (positive or negative), `radialStep(focusIndex, delta, count)` returns an index in the range 0 to count minus one, and applying a delta of +1 then -1 returns the original focus index.

**Validates**
- Criteria 3.2: WHEN a visitor advances the Radial_Selector by one step, THE Radial_Selector SHALL increment the Focus_Index by one modulo the course count.
- Criteria 3.3: WHEN a visitor reverses the Radial_Selector by one step, THE Radial_Selector SHALL decrement the Focus_Index by one modulo the course count.
- Criteria 3.4: THE Radial_Selector SHALL keep the Focus_Index within the range zero to the course count minus one for any sequence of step operations.

**Implementation tasks**

**Implemented PBTs**
- No implemented PBTs found

### Property 4: Scroll progress maps to a valid bounded step

*For any* scroll progress value in the range 0 to 1 and any step count greater than zero, `stepForProgress(progress, stepCount)` returns an index in the range 0 to step count minus one, equal to the minimum of the floor of progress times step count and step count minus one; progress 0 maps to 0 and progress 1 maps to step count minus one.

**Validates**
- Criteria 5.1: WHILE a visitor scrolls within the Scroll_Progression section, THE Homepage_System SHALL select the active step from the scroll progress using the mapping active step equals the floor of scroll progress multiplied by the step count, bounded to the last step index.
- Criteria 5.2: THE Homepage_System SHALL map a scroll progress of zero to the first step and a scroll progress of one to the last step.

**Implementation tasks**

**Implemented PBTs**
- No implemented PBTs found

### Property 5: Tilt is clamped and directionally correct

*For any* pointer offsets (including values outside the normalized range) and any positive maximum degree, `computeTilt` returns rotations whose magnitude on each axis does not exceed the maximum degree, whose sign on each axis matches the sign of the corresponding offset, and which are both zero when both offsets are zero.

**Validates**
- Criteria 4.1: WHEN a visitor moves a pointer across a Tilt_Card, THE Homepage_System SHALL apply a rotation whose sign corresponds to the pointer offset from the card center.
- Criteria 4.2: THE Homepage_System SHALL clamp the Tilt_Card rotation on each axis to a fixed maximum degree magnitude.
- Criteria 4.3: WHEN the pointer leaves a Tilt_Card, THE Homepage_System SHALL return the Tilt_Card rotation to zero on both axes.

**Implementation tasks**

**Implemented PBTs**
- No implemented PBTs found

### Property 6: Index clamping stays within bounds

*For any* requested index (including negative and out-of-range values) and any list length (including zero), `clampIndex(index, length)` returns 0 when the length is zero, and otherwise returns a value in the range 0 to length minus one.

**Validates**
- Criteria 2.2: THE Homepage_System SHALL constrain the Course_Carousel scroll position to the range between the first item fully visible and the last item fully visible.
- Criteria 6.1: WHEN a visitor swipes the Projects_Gallery to the next item, THE Homepage_System SHALL advance the active project index by one bounded to the last project index.
- Criteria 6.2: WHEN a visitor swipes the Projects_Gallery to the previous item, THE Homepage_System SHALL decrease the active project index by one bounded to zero.
- Criteria 2.3: WHERE the course list is empty, THE Homepage_System SHALL render the Course_Carousel container without throwing an error.
- Criteria 6.3: WHERE the project list is empty, THE Homepage_System SHALL render the Projects_Gallery container without throwing an error.
- Criteria 3.5: WHERE the course count is zero, THE Homepage_System SHALL render the Radial_Selector container without throwing an error.

**Implementation tasks**

**Implemented PBTs**
- No implemented PBTs found

## DATA

### ACCEPTANCE CRITERIA (29 total)
- 1.1: WHEN the hero section mounts, THE Homepage_System SHALL animate each Counter from zero to the numeric portion of the corresponding Stat_Value. (covered)
- 1.2: WHERE a Stat_Value contains non-numeric characters, THE Homepage_System SHALL preserve those characters in the final rendered text after the Counter completes. (covered)
- 1.3: WHERE a Stat_Value contains no numeric portion, THE Homepage_System SHALL render the Stat_Value text unchanged. (covered)
- 1.4: WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL render each Stat_Value at its final value without incremental counting. (not covered)
- 2.1: WHEN a visitor drags or swipes the Course_Carousel horizontally, THE Homepage_System SHALL scroll the carousel content along the horizontal axis. (not covered)
- 2.2: THE Homepage_System SHALL constrain the Course_Carousel scroll position to the range between the first item fully visible and the last item fully visible. (covered)
- 2.3: WHERE the course list is empty, THE Homepage_System SHALL render the Course_Carousel container without throwing an error. (covered)
- 2.4: WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL disable momentum and inertia animation on the Course_Carousel while keeping horizontal scrolling functional. (not covered)
- 3.1: THE Radial_Selector SHALL position each course item at an equal angular interval of three hundred sixty degrees divided by the course count. (covered)
- 3.2: WHEN a visitor advances the Radial_Selector by one step, THE Radial_Selector SHALL increment the Focus_Index by one modulo the course count. (covered)
- 3.3: WHEN a visitor reverses the Radial_Selector by one step, THE Radial_Selector SHALL decrement the Focus_Index by one modulo the course count. (covered)
- 3.4: THE Radial_Selector SHALL keep the Focus_Index within the range zero to the course count minus one for any sequence of step operations. (covered)
- 3.5: WHERE the course count is zero, THE Homepage_System SHALL render the Radial_Selector container without throwing an error. (covered)
- 4.1: WHEN a visitor moves a pointer across a Tilt_Card, THE Homepage_System SHALL apply a rotation whose sign corresponds to the pointer offset from the card center. (covered)
- 4.2: THE Homepage_System SHALL clamp the Tilt_Card rotation on each axis to a fixed maximum degree magnitude. (covered)
- 4.3: WHEN the pointer leaves a Tilt_Card, THE Homepage_System SHALL return the Tilt_Card rotation to zero on both axes. (covered)
- 4.4: WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL keep the Tilt_Card rotation at zero for all pointer positions. (not covered)
- 5.1: WHILE a visitor scrolls within the Scroll_Progression section, THE Homepage_System SHALL select the active step from the scroll progress using the mapping active step equals the floor of scroll progress multiplied by the step count, bounded to the last step index. (covered)
- 5.2: THE Homepage_System SHALL map a scroll progress of zero to the first step and a scroll progress of one to the last step. (covered)
- 5.3: WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL display all Scroll_Progression steps as a static readable list. (not covered)
- 6.1: WHEN a visitor swipes the Projects_Gallery to the next item, THE Homepage_System SHALL advance the active project index by one bounded to the last project index. (covered)
- 6.2: WHEN a visitor swipes the Projects_Gallery to the previous item, THE Homepage_System SHALL decrease the active project index by one bounded to zero. (covered)
- 6.3: WHERE the project list is empty, THE Homepage_System SHALL render the Projects_Gallery container without throwing an error. (covered)
- 7.1: THE Homepage_System SHALL exclude every Heavy_Library from the Initial_Bundle. (not covered)
- 7.2: WHERE a section requires a Heavy_Library, THE Homepage_System SHALL load that library through a Dynamic_Import triggered when the section is reached. (not covered)
- 7.3: WHILE a Dynamic_Import for a section is pending, THE Homepage_System SHALL render a placeholder for that section. (not covered)
- 8.1: WHILE Reduced_Motion_Preference is active, THE Homepage_System SHALL render all interactive sections in a state that exposes their full content without motion. (not covered)
- 8.2: THE Homepage_System SHALL provide keyboard-operable controls for the Course_Carousel, the Radial_Selector, and the Projects_Gallery. (not covered)
- 8.3: WHERE an interactive control has no visible text label, THE Homepage_System SHALL provide an accessible name for that control. (not covered)

### IMPORTANT ACCEPTANCE CRITERIA (0 total)

### CORRECTNESS PROPERTIES (6 total)
- Property 1: Stat parse/format round-trip and pass-through
- Property 2: Radial angles are evenly distributed
- Property 3: Radial step stays in range and wraps
- Property 4: Scroll progress maps to a valid bounded step
- Property 5: Tilt is clamped and directionally correct
- Property 6: Index clamping stays within bounds

### IMPLEMENTATION TASKS (0 total)

### IMPLEMENTED PBTS (0 total)