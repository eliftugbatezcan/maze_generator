
export const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === 10 && col === 5,
    isFinish: row === 10 && col === 45,
    isWall: false,
    distance: Infinity,
    isVisited: false,
    previousNode: null,
    heuristic: 0,
  };
};

export const createInitialGrid = () => {
  const newGrid = [];
  for (let row = 0; row < 20; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      currentRow.push(createNode(col, row));
    }
    newGrid.push(currentRow);
  }
  return newGrid;
};