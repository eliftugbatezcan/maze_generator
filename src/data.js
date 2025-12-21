export const algorithmsData = {
  bfs: {
    title: "Breadth-First Search (BFS)",
    subtitle: "Layer-by-Layer Exploration",
    description: `
      BFS is like the ripples created by a stone thrown into a pond. It spreads out evenly, 
      layer by layer, in all directions from the starting point.
    `,
    whyUse: [
      " Shortest Path Guarantee: If you want to find the shortest path in an unweighted graph (maze), you should definitely use BFS.",
      " Close Targets: If what you're looking for is close to the starting point, BFS finds it much faster than DFS.",
      " Network Analysis: Ideal for finding connections like 'friend of a friend' on social media."
    ],
    realWorld: "GPS Navigation, Wi-Fi Broadcasting Networks, Social Media Suggestions",
    disadvantage: "Memory Hog: Since it keeps all possible paths in memory (Queue), it consumes a lot of RAM on large maps.",
    howItWorks: [
      "1. Add the starting node to a Queue.",
      "2. Take the first node from the queue and mark it as 'visited'.",
      "3. Check all neighbors of this node.",
      "4. Add unvisited neighbors to the queue.",
      "5. Repeat until the target is found."
    ],
    codeSnippet: `
function bfs(start, end) {
  const queue = [start];
  while (queue.length > 0) {
    const node = queue.shift();
    if (node === end) return "Found!";
    // Add neighbors...
  }
}`,
    complexity: "O(V + E)"
  },

  dfs: {
    title: "Depth-First Search (DFS)",
    subtitle: "Deep Path Explorer",
    description: `
      DFS is like a stubborn traveler lost in a maze. It picks a path and keeps going 
      until it hits a dead end (wall) before turning back.
    `,
    whyUse: [
      " Memory Friendly: Since it only keeps a single path in memory (Stack), it uses very little RAM.",
      " Puzzle Solving: Very fast in situations like Sudoku or Mazes where 'a single solution' is sufficient.",
      " Game AI: Used in games like Chess to analyze future moves (depth of the tree)."
    ],
    realWorld: "Maze Generation, Chess Move Analysis, Sudoku Solvers",
    disadvantage: "No Guarantee: Even if it finds the target, it cannot guarantee that the found path is the 'shortest path'. It can sometimes take a very long route.",
    howItWorks: [
      "1. Add the starting node to a Stack.",
      "2. Go as deep as possible.",
      "3. Backtrack if you hit a dead end.",
      "4. Continue from another path.",
      "5. Repeat until the target is found."
    ],
    codeSnippet: `
function dfs(node, end) {
  if (node === end) return true;
  // Go deeper...
  if (dfs(child, end)) return true;
  return false;
}`,
    complexity: "O(V + E)"
  },

  astar: {
    title: "A* Search (A-Star)",
    subtitle: "The Smartest Path Finder",
    description: `
      A* (A-Star) is the superstar of pathfinding algorithms. It combines the reliability of BFS with 
      the speed of DFS. 
      
      Instead of searching blindly, it uses a 'Heuristic' method. It guesses where the target is 
      (straight-line distance) and prioritizes paths in that direction.
    `,
    whyUse: [
      " Fastest and Shortest: In most cases, it finds the shortest path by visiting the fewest squares.",
      " Smart Orientation: If the target is to the right, it leaves paths going left for last.",
      " Game Industry Standard: Used for character movement in strategy games."
    ],
    realWorld: "Video Games (NPC Movement), Google Maps, Robot Vacuums",
    disadvantage: "Complex Calculation: Slightly more expensive on the processor than BFS because it calculates mathematical distance at every step.",
    howItWorks: [
      "1. Assign 0 points to the starting node.",
      "2. Select the node with the lowest 'F Score' (Traveled Distance + Estimated Remaining Distance).",
      "3. Update the distances of the selected node's neighbors.",
      "4. Calculate the distance remaining to the target (Manhattan Distance).",
      "5. Continue from the node with the lowest score until the target is found."
    ],
    codeSnippet: `
function aStar(start, end) {
  // F = G (Actual) + H (Heuristic)
  node.f = node.g + heuristic(node, end);
  
  // Choose the one with the lowest F value
  let current = openSet.getLowestF();
  
  if (current === end) return "Found!";
  // ...
}`,
    complexity: "O(E)"
  }
};