import React, { useState } from "react";
import "./BilirubinGraph.css";
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

const BilirubinGraph = () => {
  const [ga, setGA] = useState(37);
  const [dob, setDob] = useState("");
  const [totalBilirubin, setTotalBilirubin] = useState(0);
  const [gender, setGender] = useState("Male");
  const [age_h, setAge_h] = useState(0);
  const [motherBloodGroup, setMotherBloodGroup] = useState("Unknown");
  const [fatherBloodGroup, setFatherBloodGroup] = useState("Unknown");
  const [poorApgarOrSepsis, setPoorApgarOrSepsis] = useState(false);
  const ABO_incomp =
    motherBloodGroup === "O" && ["A", "B", "AB"].includes(fatherBloodGroup);
  const risk_fact = poorApgarOrSepsis || ABO_incomp || gender === "Male";
  const [risk, setRisk] = useState("Low");
  // Automatically calculate risk based on GA and risk factors
  React.useEffect(() => {
    const weeks = Math.floor(ga);
    if (weeks >= 38 && !risk_fact) {
      setRisk("Low");
    } else if (
      (weeks >= 38 && risk_fact) ||
      (weeks >= 35 && weeks < 38 && !risk_fact)
    ) {
      setRisk("Medium");
    } else if (weeks >= 35 && weeks < 38 && risk_fact) {
      setRisk("High");
    }
  }, [ga, risk_fact]);

  // Function to calculate age in hours
  const calculateAgeInHours = (dob) => {
    if (!dob) return;
    const birthTime = new Date(dob).getTime();
    const currentTime = new Date().getTime();
    const ageInMs = currentTime - birthTime;
    const ageInHours = Math.floor(ageInMs / (1000 * 60 * 60));
    setAge_h(ageInHours);
  };

  // Separate data for each risk level
  const bilirubinRiskData_old = {
    High: [
      { age_h: 0, bilirubin: 4 },
      { age_h: 12, bilirubin: 6 },
      { age_h: 24, bilirubin: 8 },
      { age_h: 36, bilirubin: 9 },
      { age_h: 48, bilirubin: 11 },
      { age_h: 60, bilirubin: 12 },
      { age_h: 72, bilirubin: 13 },
      { age_h: 84, bilirubin: 14 },
      { age_h: 96, bilirubin: 14.5 },
      { age_h: 108, bilirubin: 15 },
      { age_h: 120, bilirubin: 15 },
      { age_h: 132, bilirubin: 15 },
      { age_h: 144, bilirubin: 15 },
      { age_h: 156, bilirubin: 15 },
      { age_h: 168, bilirubin: 15 },
    ],
    Medium: [
      { age_h: 0, bilirubin: 5 },
      { age_h: 12, bilirubin: 8 },
      { age_h: 24, bilirubin: 10 },
      { age_h: 36, bilirubin: 12 },
      { age_h: 48, bilirubin: 13 },
      { age_h: 60, bilirubin: 14 },
      { age_h: 72, bilirubin: 15 },
      { age_h: 84, bilirubin: 16 },
      { age_h: 96, bilirubin: 17 },
      { age_h: 108, bilirubin: 18 },
      { age_h: 120, bilirubin: 18 },
      { age_h: 132, bilirubin: 18 },
      { age_h: 144, bilirubin: 18 },
      { age_h: 156, bilirubin: 18 },
      { age_h: 168, bilirubin: 18 },
    ],
    Low: [
      { age_h: 0, bilirubin: 7 },
      { age_h: 12, bilirubin: 9 },
      { age_h: 24, bilirubin: 12 },
      { age_h: 36, bilirubin: 14 },
      { age_h: 48, bilirubin: 15 },
      { age_h: 60, bilirubin: 16 },
      { age_h: 72, bilirubin: 18 },
      { age_h: 84, bilirubin: 19 },
      { age_h: 96, bilirubin: 20 },
      { age_h: 108, bilirubin: 20 },
      { age_h: 120, bilirubin: 21 },
      { age_h: 132, bilirubin: 21 },
      { age_h: 144, bilirubin: 21 },
      { age_h: 156, bilirubin: 21 },
      { age_h: 168, bilirubin: 21 },
    ],
  };

  const bilirubinRiskData_new_norisk = {
    GA_35: [
      { age_h: 0, bilirubin: 6.5 },
      { age_h: 12, bilirubin: 8.5 },
      { age_h: 24, bilirubin: 10.5 },
      { age_h: 36, bilirubin: 12.5 },
      { age_h: 48, bilirubin: 14 },
      { age_h: 60, bilirubin: 15.5 },
      { age_h: 72, bilirubin: 16.8 },
      { age_h: 84, bilirubin: 17.8 },
      { age_h: 96, bilirubin: 18.5 },
      { age_h: 108, bilirubin: 18.5 },
      { age_h: 120, bilirubin: 18.7 },
      { age_h: 132, bilirubin: 18.8 },
      { age_h: 144, bilirubin: 18.8 },
      { age_h: 156, bilirubin: 18.9 },
      { age_h: 168, bilirubin: 19 },
    ],
    GA_36: [
      { age_h: 0, bilirubin: 7 },
      { age_h: 12, bilirubin: 9 },
      { age_h: 24, bilirubin: 11 },
      { age_h: 36, bilirubin: 13 },
      { age_h: 48, bilirubin: 14.7 },
      { age_h: 60, bilirubin: 16.2 },
      { age_h: 72, bilirubin: 17.5 },
      { age_h: 84, bilirubin: 18.5 },
      { age_h: 96, bilirubin: 19.3 },
      { age_h: 108, bilirubin: 19.4 },
      { age_h: 120, bilirubin: 19.5 },
      { age_h: 132, bilirubin: 19.6 },
      { age_h: 144, bilirubin: 19.7 },
      { age_h: 156, bilirubin: 19.7 },
      { age_h: 168, bilirubin: 19.8 },
    ],
    GA_37: [
      { age_h: 0, bilirubin: 7.5 },
      { age_h: 12, bilirubin: 9.5 },
      { age_h: 24, bilirubin: 11.5 },
      { age_h: 36, bilirubin: 13.5 },
      { age_h: 48, bilirubin: 15.4 },
      { age_h: 60, bilirubin: 17 },
      { age_h: 72, bilirubin: 18 },
      { age_h: 84, bilirubin: 19.2 },
      { age_h: 96, bilirubin: 20 },
      { age_h: 108, bilirubin: 20 },
      { age_h: 120, bilirubin: 20.1 },
      { age_h: 132, bilirubin: 20.1 },
      { age_h: 144, bilirubin: 20.1 },
      { age_h: 156, bilirubin: 20.2 },
      { age_h: 168, bilirubin: 20.2 },
    ],
    GA_38: [
      { age_h: 0, bilirubin: 8 },
      { age_h: 12, bilirubin: 10 },
      { age_h: 24, bilirubin: 12.2 },
      { age_h: 36, bilirubin: 14.2 },
      { age_h: 48, bilirubin: 16 },
      { age_h: 60, bilirubin: 17.5 },
      { age_h: 72, bilirubin: 18.8 },
      { age_h: 84, bilirubin: 19.8 },
      { age_h: 96, bilirubin: 20.7 },
      { age_h: 108, bilirubin: 20.8 },
      { age_h: 120, bilirubin: 20.9 },
      { age_h: 132, bilirubin: 21 },
      { age_h: 144, bilirubin: 21 },
      { age_h: 156, bilirubin: 21 },
      { age_h: 168, bilirubin: 21 },
    ],
    GA_39: [
      { age_h: 0, bilirubin: 8.5 },
      { age_h: 12, bilirubin: 10.5 },
      { age_h: 24, bilirubin: 12.8 },
      { age_h: 36, bilirubin: 14.8 },
      { age_h: 48, bilirubin: 16.6 },
      { age_h: 60, bilirubin: 18.1 },
      { age_h: 72, bilirubin: 19.4 },
      { age_h: 84, bilirubin: 20.5 },
      { age_h: 96, bilirubin: 21.5 },
      { age_h: 108, bilirubin: 21.6 },
      { age_h: 120, bilirubin: 21.7 },
      { age_h: 132, bilirubin: 21.8 },
      { age_h: 144, bilirubin: 21.9 },
      { age_h: 156, bilirubin: 21.9 },
      { age_h: 168, bilirubin: 21.9 },
    ],
    GA_40: [
      { age_h: 0, bilirubin: 9 },
      { age_h: 12, bilirubin: 11 },
      { age_h: 24, bilirubin: 13.2 },
      { age_h: 36, bilirubin: 15.2 },
      { age_h: 48, bilirubin: 17 },
      { age_h: 60, bilirubin: 18.5 },
      { age_h: 72, bilirubin: 19.8 },
      { age_h: 84, bilirubin: 21 },
      { age_h: 96, bilirubin: 21.8 },
      { age_h: 108, bilirubin: 21.8 },
      { age_h: 120, bilirubin: 21.8 },
      { age_h: 132, bilirubin: 21.9 },
      { age_h: 144, bilirubin: 21.9 },
      { age_h: 156, bilirubin: 21.9 },
      { age_h: 168, bilirubin: 21.9 },
    ],
  };

  const bilirubinRiskData_new_risk = {
    GA_35: [
      { age_h: 0, bilirubin: 4.5 },
      { age_h: 12, bilirubin: 7 },
      { age_h: 24, bilirubin: 9 },
      { age_h: 36, bilirubin: 10.5 },
      { age_h: 48, bilirubin: 12.1 },
      { age_h: 60, bilirubin: 13.5 },
      { age_h: 72, bilirubin: 14.5 },
      { age_h: 84, bilirubin: 15.5 },
      { age_h: 96, bilirubin: 16.0 },
      { age_h: 108, bilirubin: 16.1 },
      { age_h: 120, bilirubin: 16.2 },
      { age_h: 132, bilirubin: 16.3 },
      { age_h: 144, bilirubin: 16.4 },
      { age_h: 156, bilirubin: 16.5 },
      { age_h: 168, bilirubin: 16.5 },
    ],
    GA_36: [
      { age_h: 0, bilirubin: 5.5 },
      { age_h: 12, bilirubin: 7.5 },
      { age_h: 24, bilirubin: 9.5 },
      { age_h: 36, bilirubin: 11.2 },
      { age_h: 48, bilirubin: 12.8 },
      { age_h: 60, bilirubin: 14.2 },
      { age_h: 72, bilirubin: 15.4 },
      { age_h: 84, bilirubin: 16.4 },
      { age_h: 96, bilirubin: 17 },
      { age_h: 108, bilirubin: 17.1 },
      { age_h: 120, bilirubin: 17.2 },
      { age_h: 132, bilirubin: 17.3 },
      { age_h: 144, bilirubin: 17.4 },
      { age_h: 156, bilirubin: 17.4 },
      { age_h: 168, bilirubin: 17.5 },
    ],
    GA_37: [
      { age_h: 0, bilirubin: 6 },
      { age_h: 12, bilirubin: 8 },
      { age_h: 24, bilirubin: 10 },
      { age_h: 36, bilirubin: 12 },
      { age_h: 48, bilirubin: 13.5 },
      { age_h: 60, bilirubin: 15 },
      { age_h: 72, bilirubin: 16 },
      { age_h: 84, bilirubin: 17 },
      { age_h: 96, bilirubin: 17.8 },
      { age_h: 108, bilirubin: 17.9 },
      { age_h: 120, bilirubin: 18 },
      { age_h: 132, bilirubin: 18 },
      { age_h: 144, bilirubin: 18.1 },
      { age_h: 156, bilirubin: 18.2 },
      { age_h: 168, bilirubin: 18.2 },
    ],
    GA_38: [
      { age_h: 0, bilirubin: 6.4 },
      { age_h: 12, bilirubin: 8.5 },
      { age_h: 24, bilirubin: 10.5 },
      { age_h: 36, bilirubin: 12.4 },
      { age_h: 48, bilirubin: 14 },
      { age_h: 60, bilirubin: 15.4 },
      { age_h: 72, bilirubin: 16.5 },
      { age_h: 84, bilirubin: 17.5 },
      { age_h: 96, bilirubin: 18.2 },
      { age_h: 108, bilirubin: 18.2 },
      { age_h: 120, bilirubin: 18.2 },
      { age_h: 132, bilirubin: 18.2 },
      { age_h: 144, bilirubin: 18.2 },
      { age_h: 156, bilirubin: 18.2 },
      { age_h: 168, bilirubin: 18.2 },
    ],
  };

  const [bilirubinPoint, setBilirubinPoint] = useState([]);
  const [showLine, setShowLine] = useState(true);
  const [threshold, setThreshold] = useState(null);
  const [threshold_new, setThreshold_new] = useState(null);

  const bilirubinNewGraphData = risk_fact
    ? bilirubinRiskData_new_risk // <-- this is your at-risk data
    : bilirubinRiskData_new_norisk; // <-- this is your renamed no-risk data

  const generateGraphData = () => {
    calculateAgeInHours(dob);
    setBilirubinPoint([{ age_h: age_h, bilirubin: totalBilirubin }]);
    // Calculate threshold from graph data
    const thresholdData_old = bilirubinRiskData_old[risk];
    let interpolatedThreshold = null;
    if (thresholdData_old) {
      for (let i = 0; i < thresholdData_old.length - 1; i++) {
        const curr = thresholdData_old[i];
        const next = thresholdData_old[i + 1];
        if (curr.age_h <= age_h && age_h <= next.age_h) {
          const slope =
            (next.bilirubin - curr.bilirubin) / (next.age_h - curr.age_h);
          interpolatedThreshold = curr.bilirubin + slope * (age_h - curr.age_h);
          break;
        }
      }
      if (
        interpolatedThreshold === null &&
        age_h <= thresholdData_old[0].age_h
      ) {
        interpolatedThreshold = thresholdData_old[0].bilirubin;
      }
      if (
        interpolatedThreshold === null &&
        age_h >= thresholdData_old[thresholdData_old.length - 1].age_h
      ) {
        interpolatedThreshold =
          thresholdData_old[thresholdData_old.length - 1].bilirubin;
      }
    }
    setThreshold(interpolatedThreshold);
    //

    const thresholdData_new = bilirubinNewGraphData[gaKey_all];
    let interpolatedThreshold_new = null;

    if (thresholdData_new) {
      for (let i = 0; i < thresholdData_new.length - 1; i++) {
        const curr = thresholdData_new[i];
        const next = thresholdData_new[i + 1];
        if (curr.age_h <= age_h && age_h <= next.age_h) {
          const slope =
            (next.bilirubin - curr.bilirubin) / (next.age_h - curr.age_h);
          interpolatedThreshold_new =
            curr.bilirubin + slope * (age_h - curr.age_h);
          break;
        }
      }

      if (
        interpolatedThreshold_new === null &&
        age_h <= thresholdData_new[0].age_h
      ) {
        interpolatedThreshold_new = thresholdData_new[0].bilirubin;
      }

      if (
        interpolatedThreshold_new === null &&
        age_h >= thresholdData_new[thresholdData_new.length - 1].age_h
      ) {
        interpolatedThreshold_new =
          thresholdData_new[thresholdData_new.length - 1].bilirubin;
      }
    }

    setThreshold_new(interpolatedThreshold_new);
  };

  const riskStatusText = risk_fact
    ? "At Risk for neurotoxicity"
    : "Not At Risk for neurotoxicity";
  const riskStatusColor = risk_fact ? "red" : "green";
  const gaKey_all =
    risk_fact && Math.floor(ga) >= 38 ? "GA_38" : `GA_${Math.floor(ga)}`;

  return (
    <div className="bili-container">
      <div className="bili-wrapper">
        <div className="bili-top">
          <div className="bili-input">
            <h1 className="app-text">Bili App👶</h1>
            <div className="input_all">
              <div className="ga_input">
                <label className="block text-sm font-medium">
                  Gestational Age
                </label>
                <div className="flex gap-2">
                  <select
                    className="border p-2 rounded w-full"
                    value={Math.floor(ga)}
                    onChange={(e) => setGA(parseInt(e.target.value) + (ga % 1))}
                  >
                    {[35, 36, 37, 38, 39, 40].map((week) => (
                      <option key={week} value={week}>
                        {week === 40 ? "40 weeks or more" : `${week} weeks`}
                      </option>
                    ))}
                  </select>
                  <select
                    className="border p-2 rounded w-full"
                    value={Math.round((ga % 1) * 7)}
                    onChange={(e) =>
                      setGA(Math.floor(ga) + parseInt(e.target.value) / 7)
                    }
                  >
                    {[...Array(7)].map((_, i) => (
                      <option key={i} value={i}>
                        {i} days
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="dob_input">
                <label className="block text-sm font-medium">
                  Date and Time of Birth
                </label>
                <input
                  type="datetime-local"
                  className="border p-2 rounded w-full"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
              <div className="blood_group_input">
                <label className="block text-sm font-medium">
                  Mother's blood group&nbsp;&nbsp;
                </label>
                <select
                  className="border p-2 rounded w-full"
                  value={motherBloodGroup}
                  onChange={(e) => setMotherBloodGroup(e.target.value)}
                >
                  <option value="Unknown">Unknown</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <div className="blood_group_input">
                <label className="block text-sm font-medium">
                  Father's blood group&nbsp;&nbsp;
                </label>
                <select
                  className="border p-2 rounded w-full"
                  value={fatherBloodGroup}
                  onChange={(e) => setFatherBloodGroup(e.target.value)}
                >
                  <option value="Unknown">Unknown</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="AB">AB</option>
                  <option value="O">O</option>
                </select>
              </div>
              <div className="bilirubin_input">
                <label className="block text-sm font-medium">
                  Total Bilirubin (mg/dL)
                </label>
                <input
                  type="number"
                  className="border p-2 rounded w-full"
                  value={totalBilirubin}
                  onChange={(e) => setTotalBilirubin(e.target.value)}
                />
              </div>
              <div className="gender_input">
                <label className="block text-sm font-medium">
                  Gender&nbsp;&nbsp;
                </label>
                <select
                  className="border p-2 rounded w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="sepsis_input">
                <label className="block text-sm font-medium">
                  Poor APGAR or Sepsis&nbsp;&nbsp;
                </label>
                <select
                  className="border p-2 rounded w-full"
                  value={poorApgarOrSepsis ? "Yes" : "No"}
                  onChange={(e) =>
                    setPoorApgarOrSepsis(e.target.value === "Yes")
                  }
                >
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <button className="generate-btn" onClick={generateGraphData}>
                Calculate
              </button>
            </div>
          </div>
          <div className="bili-info">
            {/* Info Panel */}
            <h2 className="center-text">Patient Info👨🏻‍⚕️</h2>
            <div className="display_upper_text">
              <p>
                {Math.floor(ga) >= 37 ? "Term" : "Preterm"}{" "}
                {gender.toLowerCase()} newborn GA {Math.floor(ga)}+
                {Math.round((ga % 1) * 7)} wk
              </p>

              <p>
                <strong>Age:</strong> {age_h} hours
              </p>
              <p>
                <strong>Total Bilirubin:</strong> {totalBilirubin} mg/dL
              </p>
              <p>
                <strong>Phototherapy Threshold(old):</strong>{" "}
                {threshold !== null ? threshold.toFixed(2) + " mg/dL" : "N/A"}
              </p>
              <p>
                <strong>Phototherapy Threshold(new):</strong>{" "}
                {threshold_new !== null
                  ? threshold_new.toFixed(2) + " mg/dL"
                  : "N/A"}
              </p>
            </div>

            <p className="phototherapy-text">
              <strong className="phototherapy-label">Phototherapy?</strong>{" "}
              <span
                style={{
                  color: totalBilirubin > threshold ? "red" : "green",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                {totalBilirubin > threshold ? "Yes" : "No"}
              </span>
            </p>
          </div>
        </div>
        <div className="bili-graph">
          <strong className="center-text">Old version</strong>
          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age_h"
                type="number"
                domain={[0, 180]}
                ticks={[
                  0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156,
                  168,
                ]}
                label={{
                  value: "Age (hours)",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                type="number"
                domain={[0, 20]}
                ticks={[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20]}
                label={{
                  value: "Bilirubin (mg/dL)",
                  angle: -90,
                  position: "insideLeft",
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
                />
              ))}
              <Scatter
                name="Patient Value"
                data={bilirubinPoint}
                dataKey="bilirubin"
                fill="red"
                shape="circle"
                r={10}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="bili-graph" style={{ position: "relative" }}>
          <strong className="center-text">New version (2022)</strong>

          {/* Overlay text */}
          <div
            style={{
              position: "absolute",
              top: "200px",
              right: "1rem",
              fontSize: "0.7rem",
              fontWeight: "bold",
              color: riskStatusColor,
              backgroundColor: "#fff",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            {riskStatusText}
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <ComposedChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="age_h"
                type="number"
                domain={[0, 180]}
                ticks={[
                  0, 12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156,
                  168,
                ]}
                label={{
                  value: "Age (hours)",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                type="number"
                domain={[4, 22]}
                ticks={[4, 6, 8, 10, 12, 14, 16, 18, 20, 22]}
                label={{
                  value: "Bilirubin (mg/dL)",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend
                payload={Object.entries(bilirubinNewGraphData).map(
                  ([key, _], index) => ({
                    id: key,
                    value: `GA ${key.split("_")[1]} wks`,
                    type: "line",
                    color: [
                      "#ff66b2",
                      "#cc6600",
                      "#00b2cc",
                      "#aa3377",
                      "#ff8000",
                      "#00665e",
                    ][index],
                    inactive: key !== gaKey_all,
                  })
                )}
              />

              {Object.entries(bilirubinNewGraphData).map(
                ([key, data], index) => (
                  <Line
                    key={key}
                    name={`GA ${key.split("_")[1]} wks`}
                    type="monotone"
                    data={data}
                    dataKey="bilirubin"
                    stroke={
                      [
                        "#ff66b2", // GA_35
                        "#cc6600", // GA_36
                        "#00b2cc", // GA_37
                        "#aa3377", // GA_38
                        "#ff8000", // GA_39
                        "#00665e", // GA_40
                      ][index]
                    }
                    strokeDasharray={
                      ["GA_35", "GA_37", "GA_39"].includes(key) ? "6 6" : "0"
                    }
                    strokeOpacity={key === gaKey_all ? 1 : 0.1}
                    strokeWidth={1}
                    dot={false}
                  />
                )
              )}
              <Scatter
                name="Patient Value"
                data={bilirubinPoint}
                dataKey="bilirubin"
                fill="red"
                shape="circle"
                r={10}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BilirubinGraph;
