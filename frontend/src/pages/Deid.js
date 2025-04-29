import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import "./Deid.css";

function Deid() {
    const [inputText, setInputText] = useState('');
    const [prediction, setPrediction] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const handlePredict = async () => {
      if (!inputText.trim()) return;
      setLoading(true);
      setError('');
      setPrediction('');
  
      try {
        const response = await fetch('http://localhost:8000/predict', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: inputText }),
        });
  
        const data = await response.json();
        setPrediction(data.predicted_text);
      } catch (err) {
        setError('Prediction failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };



  const handleGoBack = () => {
    navigate("/#projects");
  };

  return (
    <div className="deid-page">
      <button className="floating-back-button" onClick={handleGoBack}>
        ← Back
      </button>

 {/* Model Açıklamaları Bölümü */}
 <section className="model-info">
        <h2>Anonyx</h2>
        <p>This model was trained to detect and mask sensitive information from clinical and personal texts.</p>
        <ul>
          <li>🧠 <strong>Technologies:</strong> Python, FastAPI, Hugging Face Transformers, PyTorch, Docker</li>
          <li>📊 <strong>Metrics:</strong> Precision: 0.94, Recall: 0.92, F1-Score: 0.93</li>
          <li>🏷️ <strong>Detected Labels:</strong> NAME, DATE, LOCATION, ORGANIZATION, EMAIL, PHONE</li>
        </ul>
      </section>

      
{/* Örnek Predict Bölümü */}
<section className="live-demo">
        <h2>Live Demo</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to de-identify..."
          rows="5"
        ></textarea>
        <button onClick={handlePredict} disabled={loading}>
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {error && <p className="error-message">{error}</p>}

        {prediction && (
          <div className="prediction-result">
            <h3>De-identified Text:</h3>
            <p>{prediction}</p>
          </div>
        )}
      </section>

      {/* Önceden Verilmiş 2 Predict Örneği */}
      <section className="example-predictions">
        <h2>Example Predictions</h2>
        <div className="example">
          <p><strong>Input:</strong> "John Doe visited New York on 12/12/2020."</p>
          <p><strong>Output:</strong> "[NAME] visited [LOCATION] on [DATE]."</p>
        </div>
        <div className="example">
          <p><strong>Input:</strong> "Contact me at john.doe@example.com or (123) 456-7890."</p>
          <p><strong>Output:</strong> "Contact me at [EMAIL] or [PHONE]."</p>
        </div>
      </section>
    </div>
  );
}

export default Deid;
