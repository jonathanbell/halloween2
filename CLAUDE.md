# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint checks
```

## Architecture Overview

This is a Halloween trick-or-treater counter app designed for projection onto a garage door. It uses a Vite/React/TypeScript stack with Rive animations for zombie characters and will likely use Rive for other characters in the future.

### Key State Management Pattern

The app uses a centralized state pattern with custom hooks:

1. **useCounter** (`src/hooks/useCounter.ts`): Manages visitor count and candy inventory
   - Persists count to URL params for recovery after refresh
   - Handles spacebar increment and reset actions
   - Tracks animation state for counter digit flips

2. **useStats** (`src/hooks/useStats.ts`): Calculates real-time statistics
   - Uses `useMemo` for expensive calculations to prevent unnecessary re-renders
   - Tracks timestamps of each visitor for average time calculations
   - Updates every 5 seconds via forced re-render pattern

3. **useQueryParams** (`src/hooks/useQueryParams.ts`): URL parameter synchronization
   - Reads initial values from URL (`?currentCount=X&initialCandyCount=Y`)
   - Updates URL on state changes for persistence

### Component Performance Optimizations

All display components use `React.memo` to prevent unnecessary re-renders:

- Counter, CandyProgress, StatsDisplay components are memoized
- ZombieWalker uses custom comparison function for position-based updates
- Zombie virtualization only renders visible zombies (position -10 to 110)

### Keyboard Event Architecture

All keyboard handlers are centralized in `App.tsx`:

- Space: Increment counter
- Ctrl+R: Reset counter (with confirmation)
- Ctrl+F: Toggle fullscreen

### Animation System

- **Counter animations**: CSS keyframes for digit flip effects
- **Zombie animations**: Rive-based with multiple instances
  - Each zombie has random speed, scale, and y-offset
  - Continuous animation loop using requestAnimationFrame
  - Zombies reset position when reaching candy target
  - "Hit" animation triggers when candy runs out

### Critical Performance Considerations

1. **Zombie Virtualization**: Only visible zombies render to maintain 60fps
2. **Memoized Calculations**: Stats calculations use useMemo to avoid recalculation
3. **Timeout Cleanup**: All setTimeout calls have cleanup functions to prevent memory leaks
4. **Animation Frame Management**: Single RAF loop manages all zombie positions

## Testing Locally

Start the dev server and use these URLs for testing:

- Default: `http://localhost:5173`
- With initial values: `http://localhost:5173?currentCount=25&initialCandyCount=200`

## Production Deployment

The app is designed to run locally on Halloween night:

1. Build: `npm run build`
2. Serve the `dist` folder with any static server
3. Connect to projector via HDMI
4. Press Ctrl+F for fullscreen projection mode
