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
import "./BiliGraphDisplay.css";
// --- Custom Tooltip for the OLD Chart ---
const CustomOldTooltip = ({ active, payload, label, risk }) => {
  if (active && payload && payload.length) {
    // Determine the name of the highlighted risk line
    const highlightedRiskName =
      risk === "Low"
        ? "Low Risk"
        : risk === "Medium"
        ? "Mod Risk"
        : "High Risk";

    // Find the data for the highlighted line and the patient value
    const highlightedData = payload.find(
      (item) => item.name === highlightedRiskName
    );
    // Look for the renamed scatter plot data

    const patientData = payload.find(
      (item) => item.name === "Patient Bilirubin"
    ); // <--- Updated Name Here

    // Filter payload to only include highlighted line and patient value
    const filteredPayload = payload.filter(
      (item) =>
        item.name === highlightedRiskName || item.name === "Patient Value"
    );

    // Don't render tooltip if only patient value exists without a corresponding line value at that point
    if (!highlightedData && patientData) {
      // Optional: Or you could choose to show only patient data here
      // return null;
    }

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Age: ${label} hours`}</p>
        {/* Display data for highlighted line first */}
        {highlightedData && (
          <p style={{ color: highlightedData.color }}>
            {`${highlightedData.name}: ${highlightedData.value?.toFixed(
              2
            )} mg/dL`}
          </p>
        )}
        {/* Display patient value if exists */}
        {patientData && (
          <p style={{ color: patientData.color, fontWeight: "bold" }}>
            {`${patientData.name}: ${patientData.value} mg/dL`}
          </p>
        )}

        {/* Alternative: Loop through filtered payload */}
        {/* {filteredPayload.map((pld, index) => (
          <p key={index} style={{ color: pld.color }}>
            {`${pld.name}: ${pld.value?.toFixed(2)} mg/dL`}
          </p>
        ))} */}
      </div>
    );
  }

  return null; // Return null if tooltip shouldn't be active
};

// --- Custom Tooltip for the NEW Chart ---
const CustomNewTooltip = ({ active, payload, label, gaKey_all }) => {
  if (active && payload && payload.length) {
    // Determine the name of the highlighted GA line
    const highlightedGaName = `GA ${gaKey_all?.split("_")[1]} wks`; // Use optional chaining

    // Find the data for the highlighted line and the patient value
    const highlightedData = payload.find(
      (item) => item.name === highlightedGaName
    );
    const patientData = payload.find((item) => item.name === "Patient Value");

    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          border: "1px solid #ccc",
        }}
      >
        <p className="label">{`Age: ${label} hours`}</p>
        {/* Display data for highlighted line first */}
        {highlightedData && (
          <p style={{ color: highlightedData.color }}>
            {`${highlightedData.name}: ${highlightedData.value?.toFixed(
              2
            )} mg/dL`}
          </p>
        )}
        {/* Display patient value if exists */}
        {patientData && (
          <p style={{ color: patientData.color, fontWeight: "bold" }}>
            {`${patientData.name}: ${patientData.value} mg/dL`}
          </p>
        )}
      </div>
    );
  }

  return null; // Return null if tooltip shouldn't be active
};

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
          strokeWidth={key === gaKey_all ? 1 : 1} // Make highlighted line thicker
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
            <Tooltip content={<CustomOldTooltip risk={risk} />} />
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
                strokeWidth={key === risk ? 1 : 1}
                dot={false}
                isAnimationActive={false} // Optional: disable animation
              />
            ))}
            {bilirubinPoint &&
              bilirubinPoint.length > 0 && ( // Only render if point exists
                <Scatter
                  name="Patient Bilirubin"
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
            <Tooltip content={<CustomNewTooltip gaKey_all={gaKey_all} />} />
            <Legend payload={newGraphLegendPayload} />
            {/* Render the lines */}
            {newGraphLines}
            {bilirubinPoint &&
              bilirubinPoint.length > 0 && ( // Only render if point exists
                <Scatter
                  name="Patient Bilirubin"
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
