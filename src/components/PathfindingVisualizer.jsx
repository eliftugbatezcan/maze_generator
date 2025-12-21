import React, { useState, useEffect, useRef } from 'react';
import './PathfindingVisualizer.css';

import { bfs, dfs, astar, getNodesInShortestPathOrder } from '../algorithms'; 
import { createInitialGrid } from '../utils/gridHelpers';

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);       
  const [grid2, setGrid2] = useState([]);     
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  
  const [algorithm1, setAlgorithm1] = useState('bfs');
  const [algorithm2, setAlgorithm2] = useState('astar');
  
  const [isVisualizing, setIsVisualizing] = useState(false);
  
  const [visitedCount1, setVisitedCount1] = useState(0);
  const [visitedCount2, setVisitedCount2] = useState(0);
  const [pathLength1, setPathLength1] = useState(0); 
  const [pathLength2, setPathLength2] = useState(0);
  const [timeTaken1, setTimeTaken1] = useState(0);
  const [timeTaken2, setTimeTaken2] = useState(0);

  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [animationSpeed, setAnimationSpeed] = useState(200); 

  const timeouts = useRef([]);

  const algoDisplayNames = {
    bfs: "Breadth-First Search (BFS)",
    dfs: "Depth-First Search (DFS)",
    astar: "A* Search (A-Star)"
  };

  const getDelay = (multiplier) => {
    return 200 / multiplier; 
  };

  useEffect(() => {
    resetBoard();
  }, [isComparisonMode]);

  const resetBoard = () => {
    stopAnimation();
    setGrid(createInitialGrid());
    setGrid2(createInitialGrid()); 
    setVisitedCount1(0);
    setVisitedCount2(0);
    setPathLength1(0); 
    setPathLength2(0); 
    setTimeTaken1(0);
    setTimeTaken2(0);
    clearVisuals();
  };

  const clearVisuals = () => {
    const nodes = document.getElementsByClassName('node');
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].classList.remove('node-visited', 'node-shortest-path');
    }
  };

  const clearPathOnly = () => {
    clearVisuals();
    setVisitedCount1(0);
    setVisitedCount2(0);
    setPathLength1(0); 
    setPathLength2(0); 
    setTimeTaken1(0);
    setTimeTaken2(0);

    const resetGridData = (g) => g.map(row => row.map(node => ({
      ...node,
      isVisited: false,
      distance: Infinity,
      previousNode: null,
      heuristic: 0
    })));

    const newGrid1 = resetGridData(grid);
    setGrid(newGrid1);
    const newGrid2 = resetGridData(grid2);
    setGrid2(newGrid2);

    return { g1: newGrid1, g2: newGrid2 };
  };

  const stopAnimation = () => {
    timeouts.current.forEach((id) => clearTimeout(id));
    timeouts.current = [];
    setIsVisualizing(false);
  };

  const generateRandomMaze = () => {
    if (isVisualizing) return;
    resetBoard();
    
    setTimeout(() => {
        const wallMap = [];
        for(let r=0; r<20; r++) {
            const row = [];
            for(let c=0; c<50; c++) row.push(Math.random() < 0.3);
            wallMap.push(row);
        }
        setGrid(prev => applyWalls(prev, wallMap));
        setGrid2(prev => applyWalls(prev, wallMap));
    }, 100);
  };

  const applyWalls = (currentGrid, wallMap) => {
      return currentGrid.map((row, rIdx) => {
          return row.map((node, cIdx) => {
              if (node.isStart || node.isFinish) return node;
              return { ...node, isWall: wallMap[rIdx][cIdx] };
          });
      });
  };

  const visualizeAlgorithm = () => {
    if (isVisualizing) return;
    
    const { g1, g2 } = clearPathOnly();
    setIsVisualizing(true);
    
    runAlgorithmInstance(g1, algorithm1, 1, setVisitedCount1, setTimeTaken1);
    
    if (isComparisonMode) {
        runAlgorithmInstance(g2, algorithm2, 2, setVisitedCount2, setTimeTaken2);
    }
  };

  const runAlgorithmInstance = (gridData, algoName, gridId, setCountFunc, setTimeFunc) => {
    const startNode = gridData[10][5];
    const finishNode = gridData[10][45];
    
    let visitedNodesInOrder = [];

    switch(algoName) {
        case 'bfs': visitedNodesInOrder = bfs(gridData, startNode, finishNode); break;
        case 'dfs': visitedNodesInOrder = dfs(gridData, startNode, finishNode); break;
        case 'astar': visitedNodesInOrder = astar(gridData, startNode, finishNode); break;
        default: break;
    }

    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder, gridId, setCountFunc, setTimeFunc);
  };

  const animateAlgorithm = (visitedNodes, shortestPath, gridId, setCountFunc, setTimeFunc) => {
    const startTime = Date.now();

    for (let i = 0; i <= visitedNodes.length; i++) {
      if (i === visitedNodes.length) {
        const t1 = setTimeout(() => {
          animateShortestPath(shortestPath, gridId, setTimeFunc, startTime); 
        }, animationSpeed * i);
        timeouts.current.push(t1);
        return;
      }
      
      const t2 = setTimeout(() => {
        const node = visitedNodes[i];
        const domId = `node-${gridId}-${node.row}-${node.col}`;
        const nodeElement = document.getElementById(domId);
        
        if (nodeElement && !node.isStart && !node.isFinish) {
            nodeElement.className = 'node node-visited';
        }
        
        setCountFunc(i + 1);

        const currentTime = Date.now();
        const durationInSeconds = (currentTime - startTime) / 1000;
        setTimeFunc(durationInSeconds.toFixed(2));

      }, animationSpeed * i);
      
      timeouts.current.push(t2);
    }
  };

  const animateShortestPath = (nodes, gridId, setTimeFunc, startTime) => {
    if (gridId === 1) setPathLength1(nodes.length);
    else setPathLength2(nodes.length);

    for (let i = 0; i < nodes.length; i++) {
      const t = setTimeout(() => {
        const node = nodes[i];
        const domId = `node-${gridId}-${node.row}-${node.col}`;
        const nodeElement = document.getElementById(domId);
        
        if (nodeElement && !node.isStart && !node.isFinish) {
            nodeElement.className = 'node node-shortest-path';
        }

        const currentTime = Date.now();
        const durationInSeconds = (currentTime - startTime) / 1000;
        setTimeFunc(durationInSeconds.toFixed(2));

      }, 50 * i);
      timeouts.current.push(t);
    }
    
    if (gridId === 1) {
        const tFinal = setTimeout(() => {
             setIsVisualizing(false); 
             timeouts.current = [];
        }, 50 * nodes.length + 1000); 
        timeouts.current.push(tFinal);
    }
  };

  return (
    <div className="visualizer-wrapper" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      
      <div className="controls" style={{ 
          display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '15px 25px', backgroundColor: '#2d3748', 
          borderRadius: '12px', border: '1px solid #4a5568', alignItems: 'center', boxShadow: '0 10px 15px rgba(0,0,0,0.3)'
      }}>
        
        <div className="toggle-container" title="Algoritma Yarışı Modu">
            <span style={{color: 'white', fontSize: '0.9rem', fontWeight: 'bold'}}> VS Mode</span>
            <label className="toggle-switch">
                <input type="checkbox" checked={isComparisonMode} onChange={(e) => setIsComparisonMode(e.target.checked)} disabled={isVisualizing} />
                <span className="slider"></span>
            </label>
        </div>

        <div style={{display: 'flex', flexDirection: 'column'}}>
            <select value={algorithm1} onChange={(e) => setAlgorithm1(e.target.value)} disabled={isVisualizing}
                style={{ padding: '8px', borderRadius: '5px', backgroundColor: '#1a202c', color: 'white', border: '1px solid #4a5568' }}>
                <option value="bfs">BFS</option>
                <option value="dfs">DFS</option>
                <option value="astar">A* Star</option>
            </select>
        </div>

        {isComparisonMode && (
             <div style={{display: 'flex', flexDirection: 'column'}}>
                <select value={algorithm2} onChange={(e) => setAlgorithm2(e.target.value)} disabled={isVisualizing}
                    style={{ padding: '8px', borderRadius: '5px', backgroundColor: '#1a202c', color: 'white', border: '1px solid #4a5568' }}>
                    <option value="bfs">BFS</option>
                    <option value="dfs">DFS</option>
                    <option value="astar">A* Star</option>
                </select>
            </div>
        )}

        <div className="speed-control" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
             </svg>
             <input type="range" min="1" max="10" step="1" value={speedMultiplier} 
                onChange={(e) => {
                    const val = Number(e.target.value);
                    setSpeedMultiplier(val);
                    setAnimationSpeed(getDelay(val)); 
                }}
                disabled={isVisualizing} className="custom-slider" 
             />
             <span className="speed-text" style={{ color: '#a0aec0', fontWeight: 'bold', fontSize: '14px', minWidth: '30px', textAlign: 'right' }}>
                {speedMultiplier}x
             </span>
        </div>

        {isVisualizing ? (
            <button onClick={stopAnimation} style={{
                padding: '10px 24px', backgroundColor: '#EF4444', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px rgba(239, 68, 68, 0.3)', transition: 'all 0.2s'
            }}>Stop</button>
        ) : (
            <button onClick={visualizeAlgorithm} style={{
                padding: '10px 24px', backgroundColor: '#9B59B6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px rgba(155, 89, 182, 0.3)', transition: 'all 0.2s'
            }}>
                {isComparisonMode ? 'Start Comparison' : 'Start Visualize'}
            </button>
        )}

        <button onClick={generateRandomMaze} disabled={isVisualizing} style={{
            padding: '10px 24px', backgroundColor: '#8B5CF6', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)', marginLeft: '10px'
        }}>Generate Maze</button>

        <button onClick={clearPathOnly} disabled={isVisualizing} style={{
            padding: '10px 24px', backgroundColor: '#D35400', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px rgba(211, 84, 0, 0.3)', marginLeft: '10px'
        }}>Clean</button>

        <button onClick={resetBoard} disabled={isVisualizing} style={{
            padding: '10px 24px', backgroundColor: '#64748B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', marginLeft: '10px'
        }}>Reset</button>
      </div>

      <div className={isComparisonMode ? "grid-container-split" : ""}>
          
          <div className="grid-wrapper">
              {isComparisonMode && (
                  <div className="grid-title">
                      <span style={{color: '#63b3ed'}}>{algoDisplayNames[algorithm1]}</span>
                  </div>
              )}
              
              <div className="stats-box">
                  <div className="stat-item">
                      <span className="stat-label">VISITED</span>
                      <span className="stat-value visited">{visitedCount1}</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                      <span className="stat-label">PATH</span>
                      <span className="stat-value path">{pathLength1}</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="stat-item">
                      <span className="stat-label">TIME (s)</span>
                      <span className="stat-value time">{timeTaken1}</span>
                  </div>
              </div>

              <div className="grid-board">
                {grid.map((row, rowIdx) => (
                    <div key={rowIdx} className="row">
                    {row.map((node, nodeIdx) => (
                        <div key={nodeIdx} id={`node-1-${node.row}-${node.col}`} className={`node ${node.isStart ? 'node-start' : node.isFinish ? 'node-finish' : node.isWall ? 'node-wall' : ''}`}></div>
                    ))}
                    </div>
                ))}
              </div>
          </div>

          {isComparisonMode && (
              <div className="grid-wrapper">
                  <div className="grid-title">
                      <span style={{color: '#f6e05e'}}>{algoDisplayNames[algorithm2]}</span>
                  </div>

                  <div className="stats-box">
                    <div className="stat-item">
                        <span className="stat-label">VISITED</span>
                        <span className="stat-value visited">{visitedCount2}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-label">PATH</span>
                        <span className="stat-value path">{pathLength2}</span>
                    </div>
                    <div className="stat-divider"></div>
                    <div className="stat-item">
                        <span className="stat-label">TIME (s)</span>
                        <span className="stat-value time">{timeTaken2}</span>
                    </div>
                  </div>

                  <div className="grid-board">
                    {grid2.map((row, rowIdx) => (
                        <div key={rowIdx} className="row">
                        {row.map((node, nodeIdx) => (
                            <div key={nodeIdx} id={`node-2-${node.row}-${node.col}`} className={`node ${node.isStart ? 'node-start' : node.isFinish ? 'node-finish' : node.isWall ? 'node-wall' : ''}`}></div>
                        ))}
                        </div>
                    ))}
                  </div>
              </div>
          )}
      </div>
    </div>
  );
};

export default PathfindingVisualizer;