import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "github-markdown-css/github-markdown-light.css";
import "./DeidMarkdown.css";

const DeidMarkdown = () => {
  const [language, setLanguage] = useState("en");
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    const fileMap: Record<string, string> = {
      en: "/docs/deid-en.md",
      de: "/docs/deid-de.md",
    };

    fetch(fileMap[language])
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text));
  }, [language]);

  return (
    <div className="cont" style={{ padding: "2rem" }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <label htmlFor="language-select" style={{ fontWeight: "bold", marginRight: "0.5rem" }}>
          🌐 Select Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            fontSize: "1rem",
            padding: "0.4rem 0.8rem",
            borderRadius: "6px",
            border: "1px solid #ccc",
            cursor: "pointer",
            backgroundColor: "#fff",
          }}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      <div className="markdown-body">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
};

export default DeidMarkdown;
