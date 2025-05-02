import React from "react";
import MaskedText from "./MaskedText";
import JsonViewer from "./JsonViewer";
import "./ExampleDemo.css";

const ExampleDemo = ({
  activeDemo,
  inputText,
  parsedResult,
  entities,
  showJson,
  toggleJson,
  onDemoChange
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
  };

  return (
    <section className="examples">
      <h2>Sample Input & Predicted Entities</h2>
      <div className="examplesDemo">
        <button
          className={`examplesDemoButton ${activeDemo === 0 ? "active" : ""}`}
          onClick={() => onDemoChange(0)}
        >
          Sample Text 1
        </button>
        <button
          className={`examplesDemoButton ${activeDemo === 1 ? "active" : ""}`}
          onClick={() => onDemoChange(1)}
        >
          Sample Text 2
        </button>
      </div>
      <div className="demo">
        {/* Sol Panel */}
        <div className="input-container">
          <label className="result-label">Original Text</label>
          <div className="masked-output">
            <span
              onClick={handleCopy}
              className="copy-icon"
              role="button"
              tabIndex="0"
              title="Copy to clipboard"
            >
              📋
            </span>
            <p>{inputText}</p>
          </div>
        </div>

        {/* Sağ Panel */}
        <div className="result-container">
          <label className="result-label">Anonymized Output</label>
          <div className="masked-output">
            <MaskedText parsedData={parsedResult} />
          </div>
          <JsonViewer
            data={parsedResult}
            show={showJson}
            toggle={toggleJson}
            copyData={entities}
          />
        </div>
      </div>
    </section>
  );
};

export default ExampleDemo;
