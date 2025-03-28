import React, { useState } from "react";
import "./BilirubinGraph.css";
// Import the new components
import BiliInput from "./BiliInput/BiliInput";
import BiliInfo from "./BiliInfo/BiliInfo";
import BiliGraphDisplay from "./BiliGraphDisplay/BiliGraphDisplay";

// --- Import Data Definitions ---
import {
  bilirubinRiskData_old,
  bilirubinRiskData_new_norisk,
  bilirubinRiskData_new_risk,
} from "./bilirubinData"; // Assuming bilirubinData.js is in the same folder
// --- End Data Definitions ---

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
