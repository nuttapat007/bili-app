import React from "react";
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Scatter,
} from "recharts";

const BiliGraphDisplay = ({
  bilirubinRiskData_old,
  risk, // For highlighting old graph line
  bilirubinNewGraphData, // Pass the combined new data (risk/no-risk)
  gaKey_all, // For highlighting new graph line
  bilirubinPoint,
  riskStatusText, // Text for the overlay
  riskStatusColor, // Color for the overlay
}) => {
  const colorsNewGraph = [
    "#ff66b2", // GA_35
    "#cc6600", // GA_36
    "#00b2cc", // GA_37
    "#aa3377", // GA_38
    "#ff8000", // GA_39
    "#00665e", // GA_40
  ];

  const dashArrayNewGraph = (key) =>
    ["GA_35", "GA_37", "GA_39"].includes(key) ? "6 6" : "0";

  // Check if bilirubinNewGraphData is valid before mapping
  const newGraphLegendPayload = bilirubinNewGraphData
    ? Object.entries(bilirubinNewGraphData).map(([key, _], index) => ({
        id: key,
        value: `GA ${key.split("_")[1]} wks`,
        type: "line",
        color: colorsNewGraph[index % colorsNewGraph.length], // Use modulo for safety
        inactive: key !== gaKey_all,
      }))
    : [];

  const newGraphLines = bilirubinNewGraphData
    ? Object.entries(bilirubinNewGraphData).map(([key, data], index) => (
        <Line
          key={key}
          name={`GA ${key.split("_")[1]} wks`}
          type="monotone"
          data={data}
          dataKey="bilirubin"
          stroke={colorsNewGraph[index % colorsNewGraph.length]} // Use modulo for safety
          strokeDasharray={dashArrayNewGraph(key)}
          strokeOpacity={key === gaKey_all ? 1 : 0.1}
          strokeWidth={key === gaKey_all ? 2 : 1} // Make highlighted line thicker
          dot={false}
          isAnimationActive={false} // Optional: disable animation for faster updates
        />
      ))
    : null; // Render nothing if data is not ready

  return (
    <>
      {/* Old Graph */}
      <div className="bili-graph">
        <strong className="center-text">Old version (AAP 2004)</strong>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart margin={{ top: 5, right: 30, left: 5, bottom: 20 }}>
            {" "}
            {/* Added margins */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="age_h"
              type="number"
              domain={[0, 168]} // Adjusted domain to match ticks
              ticks={[
                0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168,
              ]}
              label={{
                value: "Age (hours)",
                position: "insideBottom",
                offset: -15,
              }} // Adjusted offset
            />
            <YAxis
              type="number"
              domain={[0, 22]} // Adjusted domain slightly
              ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]}
              label={{
                value: "Bilirubin (mg/dL)",
                angle: -90,
                position: "insideLeft",
                offset: -5,
              }}
            />
            <Tooltip />
            <Legend />
            {Object.entries(bilirubinRiskData_old).map(([key, data]) => (
              <Line
                key={key}
                name={
                  key === "Low"
                    ? "Low Risk"
                    : key === "Medium"
                    ? "Mod Risk"
                    : "High Risk"
                }
                type="monotone"
                data={bilirubinRiskData_old[key]}
                dataKey="bilirubin"
                stroke={key === risk ? "#8884d8" : "#8884d84D"}
                strokeWidth={key === risk ? 2 : 1} // Make highlighted line thicker
                dot={false}
                isAnimationActive={false} // Optional: disable animation
              />
            ))}
            {bilirubinPoint &&
              bilirubinPoint.length > 0 && ( // Only render if point exists
                <Scatter
                  name="Patient Value"
                  data={bilirubinPoint}
                  dataKey="bilirubin"
                  fill="red"
                  shape="circle"
                  r={8} // Slightly smaller radius
                />
              )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* New Graph */}
      <div className="bili-graph" style={{ position: "relative" }}>
        <strong className="center-text">New version (AAP 2022)</strong>

        {/* Overlay text - Only show if calculation has run */}
        {riskStatusText && (
          <div
            style={{
              position: "absolute",
              top: "50px", // Adjusted position
              right: "1rem",
              fontSize: "0.8rem", // Increased size slightly
              fontWeight: "bold",
              color: "black", // Set color to black for contrast
              backgroundColor:
                riskStatusColor === "red"
                  ? "rgba(255, 182, 193, 0.8)"
                  : "rgba(144, 238, 144, 0.8)", // Light red/green with transparency
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              zIndex: 10, // Ensure it's above graph lines
            }}
          >
            {riskStatusText}
          </div>
        )}

        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart margin={{ top: 5, right: 30, left: 5, bottom: 20 }}>
            {" "}
            {/* Added margins */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="age_h"
              type="number"
              domain={[0, 168]} // Adjusted domain to match ticks
              ticks={[
                0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168,
              ]}
              label={{
                value: "Age (hours)",
                position: "insideBottom",
                offset: -15,
              }} // Adjusted offset
            />
            <YAxis
              type="number"
              domain={[4, 22]}
              ticks={[4, 6, 8, 10, 12, 14, 16, 18, 20, 22]}
              label={{
                value: "Bilirubin (mg/dL)",
                angle: -90,
                position: "insideLeft",
                offset: -5,
              }}
            />
            <Tooltip />
            <Legend payload={newGraphLegendPayload} />
            {/* Render the lines */}
            {newGraphLines}
            {bilirubinPoint &&
              bilirubinPoint.length > 0 && ( // Only render if point exists
                <Scatter
                  name="Patient Value"
                  data={bilirubinPoint}
                  dataKey="bilirubin"
                  fill="red"
                  shape="circle"
                  r={8} // Slightly smaller radius
                />
              )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default BiliGraphDisplay;
