import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { algorithmsData } from './data';
import './AlgorithmPage.css';

const AlgorithmPage = () => {
  const { id } = useParams();
  const data = algorithmsData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!data) {
    return (
      <div className="not-found">
        <h2>Algorithm not found!</h2>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }

  const { title, subtitle, description, whyUse, disadvantage, codeSnippet, realWorld, howItWorks } = data;

  return (
    <div className="algo-page">
      <div className="algo-nav">
        <Link to="/" className="btn-back">← Go Back</Link>
      </div>

      <main className="algo-container">
        <header className="algo-header">
          <h1>{title}</h1>
          <p className="subtitle">{subtitle}</p>
        </header>

        <div className="algo-content">
          <section className="algo-left">
            <article className="algo-section">
              <h3>How it Works</h3>
              <p className="algo-desc">{description}</p>
            </article>

            {whyUse?.length > 0 && (
              <div className="info-box success">
                <h3>Why this Algorithm?</h3>
                <ul>
                  {whyUse.map((item, index) => (
                    <li key={index}>✓ {item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="info-box danger">
              <h3>Limitations</h3>
              <p>{disadvantage}</p>
            </div>
          </section>

          <section className="algo-right">
            <div className="code-block-wrapper">
              <div className="code-header">
                <span className="lang-tag">JavaScript</span>
                <button 
                  className="btn-copy" 
                  onClick={() => navigator.clipboard.writeText(codeSnippet)}
                >
                  Copy
                </button>
              </div>
              <pre className="code-block">
                <code>{codeSnippet}</code>
              </pre>
            </div>

            <div className="real-world-box">
              <h4>Real World Application:</h4>
              <blockquote>"{realWorld}"</blockquote>
            </div>

            {howItWorks?.length > 0 && (
              <div className="algo-steps">
                <h3>Step-by-Step Process</h3>
                <ul>
                  {howItWorks.map((step, index) => (
                    <li key={index}>
                      <span className="step-num">{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>

        <footer className="algo-footer">
          <Link to="/visualizer" className="btn-action">
            Try in the Visualizer
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default AlgorithmPage;