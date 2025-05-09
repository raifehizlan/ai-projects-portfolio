import React from "react";
import "./JsonViewer.css";

const JsonViewer = ({ data, show, toggle, copyData }) => (
  <>
    <button className="toggle-result" onClick={toggle}>
      {show ? "Hide JSON" : "Show JSON"}
    </button>

    <div className={`prediction-result ${show ? "show" : ""}`}>
      {data ? (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button
            className="copy-button"
            onClick={() =>
              navigator.clipboard.writeText(JSON.stringify(copyData, null, 2))
            }
          >
            Copy
          </button>
        </>
      ) : (
        <span style={{ color: "#999" }}>No data to display</span>
      )}
    </div>
  </>
);

export default JsonViewer;
