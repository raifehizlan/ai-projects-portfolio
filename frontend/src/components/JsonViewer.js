import React from "react";
import "./JsonViewer.css"
const JsonViewer = ({ data, show, toggle, copyData }) => (
  <>
    <button className="toggle-result" onClick={toggle}>
      {show ? 'Hide JSON' : 'Show JSON'}
    </button>
    {show && data && (
      <div className="prediction-result show">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(JSON.stringify(copyData, null, 2))}>
          Copy
        </button>
      </div>
    )}
  </>
);

export default JsonViewer;
