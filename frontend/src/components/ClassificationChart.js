import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from "recharts";

const ClassificationChart = ({ result }) => {
  if (
    !result ||
    !result.output ||
    !Array.isArray(result.output) ||
    !result.output[0]?.classes
  ) {
    return <div>No data available.</div>;
  }

  const classData = result.output[0].classes;

  const parsedData = classData.map((item) => ({
    label: item.label,
    score: +(item.score * 100).toFixed(2),
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={parsedData}
          margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
          <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
          <Bar dataKey="score" fill="#3b82f6">
            <LabelList dataKey="score" position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClassificationChart;
