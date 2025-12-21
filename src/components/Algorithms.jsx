import React from 'react';
import { Link } from 'react-router-dom';

const Algorithms = () => {
  return (
    <section className="algorithms" id="algorithms-section">
      <div className="container">
        <div className="section-header">
          <h2>Meet the Algorithms</h2>
          <p className="section-desc">Visually understand maze-solving logic and reinforce your theoretical knowledge with practice.</p>
        </div>
        
        <div className="cards-grid">
          
          <div className="card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"></path><path d="M12 2v20"></path><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle></svg>
            </div>
            <h3>Breadth-First Search (BFS)</h3>
            <p>Expands equally in all directions like waves. Visits nodes closest to the start first and usually guarantees finding the shortest path.</p>
            
            <Link 
                to="/algorithm/bfs" 
                className="btn-link"
                style={{ display: 'inline-block', marginTop: '1rem', color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}
            >
                Learn More →
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="13 2 13 9 20 9"></polyline><polyline points="13 22 13 15 6 15"></polyline><line x1="13" y1="2" x2="13" y2="22"></line><line x1="20" y1="9" x2="20" y2="2"></line><line x1="6" y1="15" x2="6" y2="22"></line></svg>
            </div>
            <h3>Depth-First Search (DFS)</h3>
            <p>Follows a path to the end and backtracks at dead ends. Reaches the deepest points quickly but does not guarantee the shortest path.</p>
            
            <Link 
                to="/algorithm/dfs" 
                className="btn-link"
                style={{ display: 'inline-block', marginTop: '1rem', color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}
            >
                Learn More→
            </Link>
          </div>

          <div className="card">
            <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            </div>
            <h3>A* Search (A-Star)</h3>
            <p>Uses heuristics to guarantee the shortest path much faster than BFS. The gold standard in pathfinding.</p>
            
            <Link 
                to="/algorithm/astar" 
                className="btn-link"
                style={{ display: 'inline-block', marginTop: '1rem', color: '#63b3ed', fontWeight: 'bold', textDecoration: 'none' }}
            >
                Learn More →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Algorithms;