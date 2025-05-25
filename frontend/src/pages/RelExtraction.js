import React, { useState, useEffect } from "react";
import axios from "axios";
import BackButton from "../components/BackButton";
import ModelDetails from "../components/ModelDetails";
import EntityList from "../components/EntityList";
import MetricsTable from "../components/MetricsTable";
import JsonViewer from "../components/JsonViewer";

import relExampleData from "../data/relExampleData";
import "./Deid.css";

import ExampleDemo from "../components/ExampleDemo";
import LiveDemo from "../components/LiveDemo";
import relModelDetails from "../data/relModelDetails";
import { v4 as uuidv4 } from "uuid"; // üstte

const Assertion = () => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [showJson, setShowJson] = useState(false);
  const [parsedResult, setParsedResult] = useState(null);

  const [selectedDemo, setSelectedDemo] = useState(0);
  const [inputDemoText, setInputDemoText] = useState("");
  const [parsedDemoResult, setParsedDemoResult] = useState([]);
  const [parsedDemoUrl, setparsedDemoUrl] = useState("");
  const [parsedUrl, setParsedUrl] = useState("");
  const [parsedDemoEntities, setParsedDemoEntities] = useState([]);
  const [activeDemo, setActiveDemo] = useState(0);

  const handleDemoSelection = (demo) => {
    setSelectedDemo(demo);
    const demoText = relExampleData[demo].text;
    const demoEntities = relExampleData[demo].entities;
    const demoUrl = relExampleData[demo].data_svg;
    console.log("demoUrl", demoUrl);
    setInputDemoText(demoText);
    setParsedDemoResult(demoEntities);

    setparsedDemoUrl(demoUrl);
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
        "https://backend.redwater-2caf4374.switzerlandnorth.azurecontainerapps.io/predict",
        {
          user_id: userId,
          model: "relation",
          text: [inputText],
        }
      );
      const predictionOutput = res.data.data.output[0];
      const url = res.data.data_svg;
      console.log(predictionOutput);
      setResult(predictionOutput);
      setParsedResult(predictionOutput);

      setParsedUrl(url);
    } catch (error) {
      console.error(error.response.data.detail);
      alert("Backend'e erişilemedi.");
    }
  };

  return (
    <div className="deid-container">
      <h1>Clinical Relation Extraction Model</h1>
      <ModelDetails
        title={relModelDetails[0].title}
        description={relModelDetails[0].description}
        methods={relModelDetails[0].methods}
        users={relModelDetails[0].users}
      />
      <EntityList model="rel" />
      <MetricsTable model="rel" />

      <ExampleDemo
        modelType="rel" // veya "ner", "summarization", vb.
        parsedDemoUrl={parsedDemoUrl}
        result={parsedDemoEntities}
        activeDemo={activeDemo}
        inputText={inputDemoText}
        parsedResult={parsedDemoUrl}
        entities={parsedDemoEntities}
        showJson={showJson}
        toggleJson={() => setShowJson(!showJson)}
        onDemoChange={handleDemoSelection}
      />

      <LiveDemo
        modelType="rel" // veya "ner", "summarization", vb.
        parsedUrl={parsedUrl}
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
