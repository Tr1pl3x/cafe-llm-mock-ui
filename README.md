# ☕ AI Café Game — MOCK UI

This project is the foundation for a 2D pixel-art café simulation game built with Vite, React, and TypeScript.
It includes a working gameplay area with a grid-based movement system, environment rendering, and modular rendering functions for each scene element.

## 🎯 Current Accomplishments
### ✅ Project Structure

The codebase is cleanly organized into modular, type-safe files:

| File                 | Purpose                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| **`engine.ts`**      | Core game loop, input handling, path movement, animation updates, and orchestrating all draw layers. |
| **`drawBase.ts`**    | Renders the static environment (kitchen walls/floor, dining area, exterior grass and walls).         |
| **`drawCeiling.ts`** | Draws all ceiling tiles, joins, and end-caps according to the layout.                                |
| **`drawKitchen.ts`** | Draws the kitchen counters and corner pieces.                                                        |
| **`drawChef.ts`**    | Handles chef sprite rendering, directional flipping, and idle/movement animations.                   |
| **`sprites.ts`**     | Defines the full list of image assets and a type-safe image loader.                                  |
| **`constants.ts`**   | Stores world grid constants (tile size, grid width/height, canvas resolution).                       |
| **`types.ts`**       | Provides shared TypeScript interfaces for sprites, directions, and chef state.                       |


### 🧩 Gameplay System

- Grid size: 32 × 18 tiles (32px each) → internal resolution 1024×576.

- Viewport: 16:9 responsive canvas, centered inside a React component.

- Input: Mouse click to move the chef toward the clicked tile.

- Movement: Smooth pixel-based travel between tiles with speed control.

- Animation: Alternates sprite frames for walking; resets to front idle when stationary.

- Console Debug: Logs current tile coordinates each time the chef arrives on a tile.

### 🏗 Rendering Pipeline

Draw order follows a classic layered approach:

1. drawBase() → floors, walls, exterior

2. drawCeiling() → ceiling tiles and joins

3. drawKitchen() → counters and corners

4. drawChef() → player sprite (always on top)

This structure makes it easy to later insert new layers such as tables, NPCs, or interactables.

### 🧱 Technologies

- Vite + React + TypeScript — fast hot-reload and type-safe front-end dev

- HTML5 Canvas 2D API — lightweight rendering for pixel art

- Modular Game Architecture — easy to extend with UI or backend logic later

#### 📂 Directory Overview

```bash
src/
  components/
    Gameplay.tsx       # React component for the game canvas
  game/
    engine.ts          # Main engine loop & input
    drawBase.ts        # Floors and walls
    drawCeiling.ts     # Ceilings and joins
    drawKitchen.ts     # Counters
    drawChef.ts        # Character sprite logic
    sprites.ts         # Asset definitions and loader
    constants.ts       # Tile/grid definitions
    types.ts           # Shared type interfaces
```

Assets are stored under:
```csharp
public/assets/
  chef/
  base/
  kitchen/
  outside/
  ceiling/
```

### 🚀 Current State

✅ Working movement system
✅ Complete modular drawing pipeline
✅ Type-safe setup with clear separation of responsibilities
✅ Ready for integration with UI (menus, top bar, or order system)

### 🔮 Next Steps

Add collision logic for blocked tiles (walls, counters).

Implement pathfinding (A*) to navigate around obstacles.

Add NPCs / customers in the dining area.

Integrate game UI components (menu, queue, orders).

Load data (recipes, customers) dynamically from backend later.