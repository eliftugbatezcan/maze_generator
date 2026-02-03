
export const getUnvisitedNeighbors = (node, grid) => {
  const neighbors = [];
  const { col, row } = node;
  
  const directions = [
    { r: -1, c: 0 }, 
    { r: 1, c: 0 },  
    { r: 0, c: -1 }, 
    { r: 0, c: 1 }   
  ];

  for (const { r, c } of directions) {
    const newRow = row + r;
    const newCol = col + c;

    if (grid[newRow] && grid[newRow][newCol]) {
      neighbors.push(grid[newRow][newCol]);
    }
  }

  return neighbors.filter(n => !n.isVisited && !n.isWall);
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

  startNode.isVisited = true;

  while (stack.length > 0) {
    const currentNode = stack.pop();
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) {
      return visitedNodesInOrder;
    }

    const neighbors = getUnvisitedNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      if (!neighbor.isVisited) {
        neighbor.isVisited = true;
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
  startNode.heuristic = calculateManhattanDistance(startNode, finishNode);
  
  let openList = [startNode];

  while (openList.length) {
    openList.sort((a, b) => (a.distance + a.heuristic) - (b.distance + b.heuristic));
    
    const currentNode = openList.shift();
    if (currentNode.isWall) continue;
    if (currentNode.distance === Infinity) break;

    currentNode.isVisited = true;
    visitedNodesInOrder.push(currentNode);

    if (currentNode === finishNode) return visitedNodesInOrder;

    const neighbors = getUnvisitedNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      const tentativeDistance = currentNode.distance + 1;
      
      if (tentativeDistance < neighbor.distance) {
        neighbor.previousNode = currentNode;
        neighbor.distance = tentativeDistance;
        neighbor.heuristic = calculateManhattanDistance(neighbor, finishNode);
        
        if (!openList.includes(neighbor)) {
          openList.push(neighbor);
        }
      }
    }
  }
  return visitedNodesInOrder;
};

const calculateManhattanDistance = (nodeA, nodeB) => {
  return Math.abs(nodeA.col - nodeB.col) + Math.abs(nodeA.row - nodeB.row);
};