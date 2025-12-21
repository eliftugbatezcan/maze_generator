import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Algorithms from './components/Algorithms';
import Footer from './components/Footer';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import AlgorithmPage from './AlgorithmPage'; 
import './App.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartExploring = () => {
    navigate('/visualizer');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="app-container">
      <Header onLogoClick={handleGoHome} />
      
      <main>
        <Routes>
          
          <Route path="/" element={
            <>
              <Hero onStart={handleStartExploring} />
              <Algorithms />
            </>
          } />

          <Route path="/visualizer" element={
            <div className="visualizer-wrapper">
              <div className="container" style={{ padding: '2rem 0', width: '100%' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', color: 'white' }}>
                    <h2>Algorithm Visualizer</h2>
                    <button className="btn btn-secondary" onClick={handleGoHome}>
                        ← Go Back
                    </button>
                </div>

                <PathfindingVisualizer />
              </div>
            </div>
          } />

          <Route path="/algorithm/:id" element={<AlgorithmPage />} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;