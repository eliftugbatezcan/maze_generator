import React from 'react';
import './Hero.css';

const Hero = ({ onStart }) => {

  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text">
          <div className="badge">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10v6"></path><path d="M12 2v20"></path><path d="M12 12L2 22"></path><path d="M12 12l10 10"></path></svg>
            Interactive Algorithm Education
          </div>
          <h1>Master Algorithms Through Maze Exploration</h1>
          <p className="lead-text">Explore Breadth-First Search and Depth-First Search algorithms with interactive simulations. Find the shortest path or dive into the depths.</p>
          <div className="hero-buttons">
            <button onClick={onStart} className="btn btn-primary btn-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              Start Exploring
            </button>
            <a href="#algorithms-section" className="btn btn-secondary btn-lg">Learn More</a>
          </div>
        </div>
        
       <div className="hero-image">
  <img 
    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
    alt="Maze Algorithm Visualization" 
    className="hero-img-real"
  />
  <div className="image-glow"></div> 
</div>
      </div>
    </section>
  );
};

export default Hero;