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
import deidModelDetails from "../data/deidModelDetails";
import { v4 as uuidv4 } from "uuid"; // üstte

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
    // user_id üret veya al
    let userId = localStorage.getItem("user_id");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("user_id", userId);
    }
    console.log(inputText);
    console.log(userId);
    console.log({
      user_id: userId,
      model: "deid",
      text: [inputText],
    });
    try {
      const res = await axios.post(
        "https://backend.redwater-2caf4374.switzerlandnorth.azurecontainerapps.io/predict/",
        {
          user_id: userId,
          model: "deid",
          text: [inputText],
        }
      );
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
      <h1>Protecting Sensitive Medical Data with Privacy-First AI</h1>
      <ModelDetails
        title={deidModelDetails[0].title}
        description={deidModelDetails[0].description}
        methods={deidModelDetails[0].methods}
        users={deidModelDetails[0].users}
      />
      <EntityList model="deid" />
      <MetricsTable model="deid" />

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

export default Deid;
