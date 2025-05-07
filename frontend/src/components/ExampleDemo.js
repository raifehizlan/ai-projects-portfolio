import React from "react";
import MaskedText from "./MaskedText";
import JsonViewer from "./JsonViewer";
import ClassificationChart from "./ClassificationChart"; // Text classification için
import "./ExampleDemo.css";

const ExampleDemo = ({
  modelType, // e.g., "ner", "classification",
  // "summarization"
  parsedDemoUrl,
  result,
  activeDemo,
  inputText,
  parsedResult,
  entities,
  showJson,
  toggleJson,
  onDemoChange,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
  };
  console.log("parsedResult", parsedResult);
  const renderPredictionResult = () => {
    switch (modelType) {
      case "ner":
        return (
          <>
            <div className="masked-output">
              <MaskedText parsedData={parsedResult} />
            </div>
            <JsonViewer
              data={result}
              show={showJson}
              toggle={toggleJson}
              copyData={entities}
            />
          </>
        );

      case "cls":
        return (
          <>
            <div className="masked-output">
              <ClassificationChart result={parsedResult} />{" "}
            </div>
            <JsonViewer
              data={parsedResult.output}
              show={showJson}
              toggle={toggleJson}
              copyData={parsedResult.output}
            />
          </>
        );

      case "rel":
        return (
          <>
            <div className="masked-output">
              <img src={parsedDemoUrl} title="Relation SVG" />
            </div>
            <JsonViewer
              data={entities}
              show={showJson}
              toggle={toggleJson}
              copyData={entities}
            />
          </>
        );

      default:
        return <p>Unknown model type</p>;
    }
  };

  return (
    <section className="examples">
      <h2>Sample Input & Predicted Output</h2>
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

        <div className="result-container">
          <label className="result-label">Predict Result</label>
          {renderPredictionResult()}
        </div>
      </div>
    </section>
  );
};

export default ExampleDemo;
