import React from "react";
import MaskedText from "./MaskedText";
import ClassificationChart from "./ClassificationChart";
import JsonViewer from "./JsonViewer";
import "./LiveDemo.css";
import { exportToJson } from "../utils/exportUtils";

const LiveDemo = ({
  parsedUrl,
  inputText,
  onInputChange,
  onSubmit,
  parsedResult,
  result,
  showJson,
  toggleJson,
  modelType,
}) => {
  const renderPrediction = () => {
    switch (modelType) {
      case "ner":
        return parsedResult ? (
          <MaskedText parsedData={parsedResult} />
        ) : (
          <span style={{ color: "#999" }}>No prediction yet.</span>
        );

      case "cls":
        return parsedResult ? (
          <ClassificationChart result={parsedResult} />
        ) : (
          <span style={{ color: "#999" }}>No prediction yet.</span>
        );

      case "rel":
        return parsedResult ? (
          <img src={parsedUrl} alt="" />
        ) : (
          <span style={{ color: "#999" }}>No prediction yet.</span>
        );

      default:
        return <span>No prediction yet.</span>;
    }
  };

  return (
    <section>
      <h2>⚡ Try It Yourself</h2>
      <div className="demo">
        {/* Input */}
        <div className="input-container">
          <label htmlFor="textInput" className="input-label">
            Enter Text
          </label>
          <div className="textarea">
            <textarea
              id="textInput"
              value={inputText}
              onChange={onInputChange}
              placeholder="Type your medical text here..."
            />
          </div>
          <button onClick={onSubmit}>Predict</button>
        </div>

        {/* Output */}
        <div className="result-container">
          <label className="result-label">Predicted Output</label>
          <div className="masked-output">{renderPrediction()}</div>

          {result && (
            <div className="export-buttons">
              <button
                onClick={() =>
                  exportToJson(
                    { input: inputText, output: result },
                    "prediction.json"
                  )
                }
              >
                📥 Export JSON
              </button>
            </div>
          )}

          <JsonViewer
            data={result}
            show={showJson}
            toggle={toggleJson}
            copyData={result}
          />
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
