
export const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
};

export const getNodesInShortestPathOrder = (finishNode) => {
  const nodes = [];
  let current = finishNode;
  while (current !== null) {
    nodes.unshift(current);
    current = current.previousNode;
  }
  return nodes;
};


export const bfs = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  const queue = [startNode];
  startNode.isVisited = true;
  while (queue.length) {
    const currentNode = queue.shift();
    visitedNodesInOrder.push(currentNode);
    if (currentNode === finishNode) return visitedNodesInOrder;
    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      neighbor.isVisited = true;
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }
  return visitedNodesInOrder;
};

export const dfs = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  const stack = [startNode];
  while(stack.length) {
      const currentNode = stack.pop();
      if (!currentNode.isVisited) {
          currentNode.isVisited = true;
          visitedNodesInOrder.push(currentNode);
          if (currentNode === finishNode) return visitedNodesInOrder;
          const neighbors = getUnvisitedNeighbors(currentNode, grid);
          for (const neighbor of neighbors) {
              neighbor.previousNode = currentNode;
              stack.push(neighbor);
          }
      }
  }
  return visitedNodesInOrder;
};

export const astar = (grid, startNode, finishNode) => {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  
  let unvisitedNodes = [];
  grid.forEach(r => r.forEach(n => unvisitedNodes.push(n)));

  while (unvisitedNodes.length) {
    unvisitedNodes.sort((nodeA, nodeB) => {
        const fA = nodeA.distance + nodeA.heuristic;
        const fB = nodeB.distance + nodeB.heuristic;
        return fA - fB;
    });
    
    const closestNode = unvisitedNodes.shift();

    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) return visitedNodesInOrder;

    const neighbors = getUnvisitedNeighbors(closestNode, grid);
    for (const neighbor of neighbors) {
      neighbor.distance = closestNode.distance + 1;
      neighbor.heuristic = Math.abs(neighbor.col - finishNode.col) + Math.abs(neighbor.row - finishNode.row);
      neighbor.previousNode = closestNode;
    }
  }
  return visitedNodesInOrder;
};