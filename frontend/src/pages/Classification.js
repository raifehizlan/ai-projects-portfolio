import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import ModelDetails from "../components/ModelDetails";
import EntityList from "../components/EntityList";
import MetricsTable from "../components/MetricsTable";
import JsonViewer from "../components/JsonViewer";
import MaskedText from "../components/MaskedText";
import { parseMaskedText } from "../utils/renderMaskedText";
import clsExampleData from "../data/clsExampleData";
import "./Deid.css";

import ExampleDemo from "../components/ExampleDemo";
import LiveDemo from "../components/LiveDemo";
import clsModelDetails from "../data/clsModelDetails";
import { v4 as uuidv4 } from "uuid"; // üstte

const Classification = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [parsedResult, setParsedResult] = useState([]);

  const [selectedDemo, setSelectedDemo] = useState(0);
  const [inputDemoText, setInputDemoText] = useState("");
  const [parsedDemoResult, setParsedDemoResult] = useState([]); // cls output

  const [activeDemo, setActiveDemo] = useState(0);

  const handleDemoSelection = (demo) => {
    setSelectedDemo(demo);
    const demoText = clsExampleData[demo].text;
    const demoOutput = clsExampleData[demo].output;

    setInputDemoText(demoText);
    setParsedDemoResult({ text: demoText, output: demoOutput }); // cls için uygun format
    setActiveDemo(demo);
  };

  useEffect(() => {
    handleDemoSelection(0);
  }, []);

  const handleSubmit = async () => {
    // user_id üret veya al
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("user_id", userId);
    }
    try {
      const res = await axios.post(
        "https://backend.internal.redwater-2caf4374.switzerlandnorth.azurecontainerapps.io:8000/predict",
        {
          user_id: userId,
          model: "classification",
          text: [inputText],
        }
      );
      const predictionOutput = res.data.output;
      setResult(predictionOutput);
      setParsedResult({ text: inputText, output: predictionOutput });
    } catch (error) {
      console.error(error);
      alert("Backend'e erişilemedi.");
    }
  };

  return (
    <div className="deid-container">
      <h1>ADE Text Classification</h1>
      <ModelDetails
        title={clsModelDetails[0].title}
        description={clsModelDetails[0].description}
        methods={clsModelDetails[0].methods}
        users={clsModelDetails[0].users}
      />
      <EntityList model="cls" />
      <MetricsTable model="cls" />

      <ExampleDemo
        modelType="cls"
        activeDemo={activeDemo}
        inputText={inputDemoText}
        parsedResult={parsedDemoResult}
        showJson={showJson}
        toggleJson={() => setShowJson(!showJson)}
        onDemoChange={handleDemoSelection}
      />

      <LiveDemo
        modelType="cls"
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

export default Classification;
