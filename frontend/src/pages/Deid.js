import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import ModelDetails from "../components/ModelDetails";
import EntityList from "../components/EntityList";
import MetricsTable from "../components/MetricsTable";
import JsonViewer from "../components/JsonViewer";
import MaskedText from "../components/MaskedText";
import { parseMaskedText } from "../utils/renderMaskedText";
import deidExampleData from "../data/deidExampleData";
import "./Deid.css";

import ExampleDemo from "../components/ExampleDemo";
import LiveDemo from "../components/LiveDemo";

const Deid = () => {
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
    const demoText = deidExampleData[demo].text;
    const demoEntities = deidExampleData[demo].entities;
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
      const res = await axios.post("http://localhost:8000/predict", {
        text: [inputText],
        masked: true,
        faked: true,
      });
      const predictionOutput = res.data.output[0];
      setResult(predictionOutput);
      setParsedResult(parseMaskedText(inputText, predictionOutput.entities));
    } catch (error) {
      console.error(error);
      alert("Backend'e erişilemedi.");
    }
  };

  return (
    <div className="deid-container">
      <BackButton />
      <h1>Protecting Sensitive Medical Data with Privacy-First AI</h1>
      <ModelDetails />
      <EntityList />
      <MetricsTable />

      <ExampleDemo
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

export default Deid;
