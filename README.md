# Maze Explorer — Pathfinding & Maze Generation Visualizer

Maze Explorer is an interactive web application built with React and Vite that visualizes pathfinding algorithms and maze generation techniques on a grid. It is intended for learning, teaching, and experimenting with algorithm behavior and performance.
![App Preview]<img width="1468" height="779" alt="image" src="https://github.com/user-attachments/assets/ebef8dee-bbe9-473e-8fee-d191017ccf80" />


**Key features**

- Visualize common pathfinding algorithms (e.g., Dijkstra, A\*, BFS, DFS).
- Generate mazes with multiple generation strategies and observe solver behavior.
- Interactive grid: add/remove walls, move start/finish nodes, and step through algorithm execution.
- Lightweight React + Vite front-end for fast development and HMR.

**Tech stack**

- React (functional components + hooks)
- Vite (development server & build)
- Plain CSS for styling

## Getting started

1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

3. Build for production

```bash
npm run build
npm run preview
```

## Project structure (important files)

- `index.html` — App entry HTML used by Vite.
- `src/main.jsx` — React app bootstrap.
- `src/App.jsx` — Top-level application component and routing.
- `src/components/PathfindingVisualizer.jsx` — Main visualizer component: renders grid, controls, and coordinates algorithm runs.
- `src/components/Algorithms.jsx` — UI for selecting algorithms and controls.
- `src/algorithms/index.js` — Algorithm implementations and exports used by the visualizer.
- `src/utils/gridHelpers.js` — Utilities for creating and manipulating the grid, neighbor lookup, and node state transitions.
- `src/data.js` — Static demo data (if present) for initializing examples.

## Design & implementation notes

- **Grid model:** the app represents the map as a 2D array of node objects. Each node tracks its coordinates, whether it's a wall, if it's been visited, distance/cost fields used by algorithms, and parent references for path reconstruction.
- **Algorithms:** implementations follow standard textbook behavior adapted to the grid model. Each algorithm produces an ordered list of visited nodes (for animation) and the final shortest path (if found).
- **Separation of concerns:** algorithm logic is isolated from rendering. The visualizer requests the animation steps from algorithm functions and applies them to the UI state over time.
- **Performance:** rendering follows React best practices to avoid unnecessary re-renders. Grid updates batch multiple changes and update only affected cells when possible.

## Extending the project

- Add new algorithms: implement the algorithm as a pure function that accepts the grid and node identifiers, then returns the ordered visit list and path.
- Add heuristics: for A\* or other informed search, expose configurable heuristic functions.
- Add weighted grids: extend node objects to include weights (terrain costs) and adapt algorithms accordingly.

## Contribution

Contributions and improvements are welcome. Open an issue or submit a pull request describing the proposed change and rationale.

## License

This repository does not include a license file. Add a `LICENSE` to clarify terms for reuse.

## Contact

For questions or collaboration, open an issue in the repository or contact the maintainer.
