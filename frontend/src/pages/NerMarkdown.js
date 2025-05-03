import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-light.css";

const NerMarkdown = () => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/docs/deid-en.md")
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <div className="markdown-body" style={{ padding: "2rem" }}>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
};

export default NerMarkdown;
