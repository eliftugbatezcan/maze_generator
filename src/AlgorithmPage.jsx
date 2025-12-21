import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { algorithmsData } from './data';
import './AlgorithmPage.css'; 

const AlgorithmPage = () => {
  const { id } = useParams();
  const data = algorithmsData[id];

  if (!data) return <div className="not-found">Algorithm not found!</div>;

  return (
    <div className="algo-page">
      
      <div className="algo-nav">
        <Link to="/" className="btn-back">← Go Back</Link>
      </div>

      <div className="algo-container">
        
        <div className="algo-header">
          <h1>{data.title}</h1>
          <h2>{data.subtitle}</h2>
        </div>

        <div className="algo-content">
          
          <div className="algo-left">
            <div className="algo-section">
              <h3> How it Works</h3>
              <p className="algo-desc">{data.description}</p>
            </div>

            <div className="info-box success">
              <h3> Why this Algorithm?</h3>
              <ul>
                {data.whyUse && data.whyUse.map((item, index) => (
                  <li key={index}>✓ {item}</li>
                ))}
              </ul>
            </div>

             <div className="info-box danger">
              <h3>Limitations</h3>
              <p>{data.disadvantage}</p>
            </div>
          </div>

          <div className="algo-right">
            
            <div className="code-block-wrapper">
              <span className="lang-tag">JavaScript</span>
              <pre className="code-block">
                <code>{data.codeSnippet}</code>
              </pre>
            </div>
            
             <div className="real-world-box">
                <h4>Real World Application:</h4>
                <p>"{data.realWorld}"</p>
             </div>

            <div className="algo-steps">
              <h3>Step-by-Step Process</h3>
              <ul>
                {data.howItWorks.map((step, index) => (
                  <li key={index}>
                    <span className="step-num">{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        <div className="algo-footer">
            <Link to="/visualizer" className="btn-action">
              Try in the Visualizer
            </Link>
        </div>

      </div>
    </div>
  );
};

export default AlgorithmPage;