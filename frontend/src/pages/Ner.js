import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import ModelDetails from "../components/ModelDetails";
import EntityList from "../components/EntityList";
import MetricsTable from "../components/MetricsTable";
import JsonViewer from "../components/JsonViewer";
import MaskedText from "../components/MaskedText";
import { parseMaskedText } from "../utils/renderMaskedText";
import nerExampleData from "../data/nerExampleData";
import "./Deid.css";

import ExampleDemo from "../components/ExampleDemo";
import LiveDemo from "../components/LiveDemo";
import nerModelDetails from "../data/nerModelDetails";

const Ner = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);

  const [selectedDemo, setSelectedDemo] = useState(0);
  const [inputDemoText, setInputDemoText] = useState("");
  const [parsedDemoResult, setParsedDemoResult] = useState([]);
  const [parsedDemoEntities, setParsedDemoEntities] = useState([]);
  const [activeDemo, setActiveDemo] = useState(0);

  const handleDemoSelection = (demo) => {
    setSelectedDemo(demo);
    const demoText = nerExampleData[demo].text;
    const demoEntities = nerExampleData[demo].entities;
    setInputDemoText(demoText);
    setParsedDemoResult(parseMaskedText(demoText, demoEntities));
    setParsedDemoEntities(demoEntities);
    setActiveDemo(demo);
  };

  useEffect(() => {
    handleDemoSelection(0);
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8080/predict", {
        text: [inputText],
      });
      const predictionOutput = res.data.output[0];
      setResult(predictionOutput);
      setParsedResult(parseMaskedText(inputText, predictionOutput));
    } catch (error) {
      console.error(error);
      alert("Backend'e erişilemedi.");
    }
  };

  return (
    <div className="deid-container">
      <h1>Clinical Named Entity Recognition Model for Medication Extraction</h1>
      <ModelDetails
        title={nerModelDetails[0].title}
        description={nerModelDetails[0].description}
        methods={nerModelDetails[0].methods}
        users={nerModelDetails[0].users}
      />
      <EntityList model="ner" />
      <MetricsTable model="ner" />

      <ExampleDemo
        modelType="ner" // veya "ner", "summarization", vb.
        result={parsedDemoEntities}
        activeDemo={activeDemo}
        inputText={inputDemoText}
        parsedResult={parsedDemoResult}
        entities={parsedDemoEntities}
        showJson={showJson}
        toggleJson={() => setShowJson(!showJson)}
        onDemoChange={handleDemoSelection}
      />

      <LiveDemo
        inputText={inputText}
        onInputChange={(e) => setInputText(e.target.value)}
        onSubmit={handleSubmit}
        parsedResult={parsedResult}
        result={result}
        showJson={showJson}
        toggleJson={() => setShowJson(!showJson)}
      />
    </div>
  );
};

export default Ner;
