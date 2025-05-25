import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import ModelDetails from "../components/ModelDetails";
import EntityList from "../components/EntityList";
import MetricsTable from "../components/MetricsTable";
import JsonViewer from "../components/JsonViewer";
import MaskedText from "../components/MaskedText";
import { parseMaskedText } from "../utils/renderMaskedText";
import assExampleData from "../data/assExampleData";
import "./Deid.css";

import ExampleDemo from "../components/ExampleDemo";
import LiveDemo from "../components/LiveDemo";
import assertionModelDetails from "../data/assModelDetails";
import { v4 as uuidv4 } from "uuid"; // üstte

const Assertion = () => {
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
    const demoText = assExampleData[demo].text;
    const demoEntities = assExampleData[demo].entities;
    setInputDemoText(demoText);
    setParsedDemoResult(parseMaskedText(demoText, demoEntities, "assertion"));
    setParsedDemoEntities(demoEntities);
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
        "https://backend.redwater-2caf4374.switzerlandnorth.azurecontainerapps.io/predict/",
        {
          user_id: userId,
          model: "assertion",
          text: [inputText],
        }
      );
      const predictionOutput = res.data.data.output[0];
      console.log(predictionOutput);
      setResult(predictionOutput);
      setParsedResult(
        parseMaskedText(inputText, predictionOutput, "assertion")
      );
    } catch (error) {
      console.error(error.response.data.detail);
      alert("Backend'e erişilemedi.");
    }
  };

  return (
    <div className="deid-container">
      <h1>Clinical Assertion Status Model</h1>
      <ModelDetails
        title={assertionModelDetails[0].title}
        description={assertionModelDetails[0].description}
        methods={assertionModelDetails[0].methods}
        users={assertionModelDetails[0].users}
      />
      <EntityList model="ass" />
      <MetricsTable model="ass" />

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
        modelType="ner" // veya "ner", "summarization", vb.
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

export default Assertion;
