import React from "react";
import MaskedText from "./MaskedText";
import JsonViewer from "./JsonViewer";
import "./LiveDemo.css"

const LiveDemo = ({
  inputText,
  onInputChange,
  onSubmit,
  parsedResult,
  result,
  showJson,
  toggleJson
}) => {
  return (
    <section>
      <h2>⚡ Try It Yourself</h2>
      <div className="demo">
        <div className="input-container">
          <label htmlFor="textInput" className="input-label">
            Enter Text
          </label>
          <div className="textarea">
            <textarea
              id="textInput"
              value={inputText}
              onChange={onInputChange}
              placeholder="Type a German medical text here..."
            />
          </div>
          <button onClick={onSubmit}>Predict</button>
        </div>

        <div className="result-container">
          <label className="result-label">Predicted Output</label>
          <div className="masked-output">
            {parsedResult ? (
              <MaskedText parsedData={parsedResult} />
            ) : (
              <span style={{ color: "#999" }}>No prediction yet.</span>
            )}
          </div>
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
