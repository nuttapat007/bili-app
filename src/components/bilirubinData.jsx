import React, { useState, useEffect, useCallback } from "react";
import "./BilirubinGraph.css"; // Keep your main CSS import

// Import the child components
import BiliInput from "./BiliInput";
import BiliInfo from "./BiliInfo";
import BiliGraphDisplay from "./BiliGraphDisplay";

// --- Import Data Definitions ---
import {
  bilirubinRiskData_old,
  bilirubinRiskData_new_norisk,
  bilirubinRiskData_new_risk,
} from "./bilirubinData"; // Assuming bilirubinData.js is in the same folder
// --- End Data Definitions ---

const BilirubinGraph = () => {
  // --- State Definitions ---
  const [ga, setGA] = useState(37);
  const [dob, setDob] = useState("");
  const [totalBilirubin, setTotalBilirubin] = useState(0); // Start with 0 or ''
  const [gender, setGender] = useState("Male");
  const [motherBloodGroup, setMotherBloodGroup] = useState("Unknown");
  const [fatherBloodGroup, setFatherBloodGroup] = useState("Unknown");
  const [poorApgarOrSepsis, setPoorApgarOrSepsis] = useState(false);
  const [risk, setRisk] = useState("Low"); // Risk for OLD guidelines
  const [age_h, setAge_h] = useState(0);
  const [bilirubinPoint, setBilirubinPoint] = useState([]);
  const [threshold, setThreshold] = useState(null); // Old threshold
  const [threshold_new, setThreshold_new] = useState(null); // New threshold
  const [risk_fact, setRisk_fact] = useState(false); // Neurotoxicity risk factor for NEW guidelines
  const [riskStatusText, setRiskStatusText] = useState(""); // Text for new graph overlay
  const [riskStatusColor, setRiskStatusColor] = useState("green"); // Color for new graph overlay
  // --- End State Definitions ---

  // --- Derived Values & Effects ---
  // Calculate ABO incompatibility
  const ABO_incomp =
    motherBloodGroup === "O" && ["A", "B", "AB"].includes(fatherBloodGroup);

  // Update risk_fact (for new guidelines) whenever dependencies change
  useEffect(() => {
    // Per 2022 AAP Guidelines: Risk factors for neurotoxicity
    const hasRiskFactor =
      ga < 38 || // Gestational age < 38 weeks is itself a risk factor
      // albumin < 3.0 g/dL (Not collected here)
      ABO_incomp || // Isoimmune hemolytic disease
      // G6PD deficiency (Not collected here)
      poorApgarOrSepsis || // Sepsis
      // Temperature instability (Not collected here)
      // Significant lethargy (Not collected here)
      false; // Placeholder for other factors if added
    setRisk_fact(hasRiskFactor);

    setRiskStatusText(
      hasRiskFactor ? "At Risk (Neurotoxicity)" : "Not At Risk (Neurotoxicity)"
    );
    setRiskStatusColor(hasRiskFactor ? "red" : "green");
  }, [ga, ABO_incomp, poorApgarOrSepsis]);

  // Update risk level (for old guidelines) whenever GA or risk factors change
  useEffect(() => {
    const weeks = Math.floor(ga);
    // Old guideline risk factors were slightly different (included Male gender)
    const old_risk_factors =
      poorApgarOrSepsis || ABO_incomp || gender === "Male";

    if (weeks >= 38 && !old_risk_factors) {
      setRisk("Low");
    } else if (
      (weeks >= 38 && old_risk_factors) ||
      (weeks >= 35 && weeks < 38 && !old_risk_factors)
    ) {
      setRisk("Medium");
    } else if (weeks >= 35 && weeks < 38 && old_risk_factors) {
      setRisk("High");
    } else {
      // Handle GA < 35 if needed, maybe default to High or disable calculation
      setRisk("High"); // Default assumption or adjust as per guideline scope
    }
  }, [ga, gender, poorApgarOrSepsis, ABO_incomp]);

  // Determine which dataset and GA key to use for the NEW graph
  const bilirubinNewGraphData = risk_fact
    ? bilirubinRiskData_new_risk
    : bilirubinRiskData_new_norisk;
  let gaKey_all = `GA_${Math.max(35, Math.min(40, Math.floor(ga)))}`; // Clamp GA between 35 and 40

  // Specific adjustment for >=38 weeks AT RISK (uses GA_38 curve per 2022 guideline fig 3)
  if (risk_fact && Math.floor(ga) >= 38) {
    gaKey_all = "GA_38";
  }

  // --- Calculation Functions ---
  // Calculate age in hours (using useCallback to prevent recreation unless dob changes)
  const calculateAgeInHours = useCallback(() => {
    if (!dob) return 0; // Return 0 if dob is not set
    try {
      const birthTime = new Date(dob).getTime();
      const currentTime = new Date().getTime();

      // Basic validation: ensure birthTime is not in the future or invalid
      if (isNaN(birthTime) || birthTime > currentTime) {
        console.error("Invalid Date of Birth");
        return 0;
      }

      const ageInMs = currentTime - birthTime;
      const ageInHours = Math.floor(ageInMs / (1000 * 60 * 60));
      return ageInHours >= 0 ? ageInHours : 0; // Ensure age is not negative
    } catch (error) {
      console.error("Error calculating age:", error);
      return 0; // Return 0 on error
    }
  }, [dob]); // Dependency array includes dob

  // Interpolation function (Helper)
  const interpolateThreshold = (data, currentAge) => {
    if (!data || data.length === 0 || currentAge < 0) return null;

    // Handle age before the first data point
    if (currentAge <= data[0].age_h) {
      return data[0].bilirubin;
    }

    // Handle age after the last data point
    if (currentAge >= data[data.length - 1].age_h) {
      return data[data.length - 1].bilirubin;
    }

    // Find the segment for interpolation
    for (let i = 0; i < data.length - 1; i++) {
      const curr = data[i];
      const next = data[i + 1];
      if (curr.age_h <= currentAge && currentAge <= next.age_h) {
        // Avoid division by zero if age points are identical
        if (next.age_h === curr.age_h) {
          return curr.bilirubin; // or average, or next.bilirubin
        }
        const slope =
          (next.bilirubin - curr.bilirubin) / (next.age_h - curr.age_h);
        return curr.bilirubin + slope * (currentAge - curr.age_h);
      }
    }
    return null; // Should not be reached if data is sorted and covers the range
  };

  // Generate Graph Data and Calculate Thresholds
  const generateGraphData = () => {
    const calculatedAge = calculateAgeInHours();
    setAge_h(calculatedAge); // Update age state

    // Ensure totalBilirubin is a valid number for plotting
    const plotBilirubin =
      typeof totalBilirubin === "number" && !isNaN(totalBilirubin)
        ? totalBilirubin
        : 0;
    setBilirubinPoint([{ age_h: calculatedAge, bilirubin: plotBilirubin }]);

    // Calculate OLD threshold
    const thresholdData_old = bilirubinRiskData_old[risk];
    const interpolatedThreshold_old = interpolateThreshold(
      thresholdData_old,
      calculatedAge
    );
    setThreshold(interpolatedThreshold_old);

    // Calculate NEW threshold
    const thresholdData_new = bilirubinNewGraphData[gaKey_all];
    const interpolatedThreshold_new = interpolateThreshold(
      thresholdData_new,
      calculatedAge
    );
    setThreshold_new(interpolatedThreshold_new);
  };
  // --- End Calculation Functions ---

  // --- Render ---
  return (
    <div className="bili-container">
      <div className="bili-wrapper">
        <div className="bili-top">
          {/* Pass state and setters to BiliInput */}
          <BiliInput
            ga={ga}
            setGA={setGA}
            dob={dob}
            setDob={setDob}
            motherBloodGroup={motherBloodGroup}
            setMotherBloodGroup={setMotherBloodGroup}
            fatherBloodGroup={fatherBloodGroup}
            setFatherBloodGroup={setFatherBloodGroup}
            totalBilirubin={totalBilirubin}
            setTotalBilirubin={setTotalBilirubin}
            gender={gender}
            setGender={setGender}
            poorApgarOrSepsis={poorApgarOrSepsis}
            setPoorApgarOrSepsis={setPoorApgarOrSepsis}
            generateGraphData={generateGraphData}
          />
          {/* Pass display data to BiliInfo */}
          <BiliInfo
            ga={ga}
            gender={gender}
            age_h={age_h}
            totalBilirubin={totalBilirubin}
            threshold={threshold}
            threshold_new={threshold_new}
            // risk_fact={risk_fact} // Pass if BiliInfo needs it directly
          />
        </div>
        {/* Pass graph data and config to BiliGraphDisplay */}
        <div className="bili-bottom">
          {" "}
          {/* Added a bottom wrapper for graphs */}
          <BiliGraphDisplay
            bilirubinRiskData_old={bilirubinRiskData_old}
            risk={risk} // For old graph line highlight
            bilirubinNewGraphData={bilirubinNewGraphData} // Pass the correct new data set
            gaKey_all={gaKey_all} // For new graph line highlight
            bilirubinPoint={bilirubinPoint}
            riskStatusText={riskStatusText} // For new graph overlay
            riskStatusColor={riskStatusColor} // For new graph overlay
          />
        </div>
      </div>
    </div>
  );
};

export default BilirubinGraph;
