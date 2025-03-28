import React from "react";
import "./BiliInfo.css";

const BiliInfo = ({
  ga,
  gender,
  age_h,
  totalBilirubin,
  threshold,
  threshold_new,
}) => {
  // Handle cases where calculations haven't run yet
  const displayThreshold =
    threshold !== null ? threshold.toFixed(2) + " mg/dL" : "N/A";
  const displayThresholdNew =
    threshold_new !== null ? threshold_new.toFixed(2) + " mg/dL" : "N/A";
  const needsPhototherapy = threshold !== null && totalBilirubin > threshold;

  return (
    <div className="bili-info">
      <h2 className="center-text">Patient Info👨🏻‍⚕️</h2>
      <div className="display_upper_text">
        <p>
          {Math.floor(ga) >= 37 ? "Term" : "Preterm"} {gender.toLowerCase()}{" "}
          newborn GA {Math.floor(ga)}+{Math.round((ga % 1) * 7)} wk
        </p>
        <p>
          <strong>Age:</strong>{" "}
          {age_h > 0 ? `${age_h} hours` : "Not calculated"}
        </p>
        <p>
          <strong>Total Bilirubin:</strong> {totalBilirubin} mg/dL
        </p>
        <p>
          <strong>Phototherapy Threshold (old):</strong> {displayThreshold}
        </p>
        <p>
          <strong>Phototherapy Threshold (new, 2022):</strong>{" "}
          {displayThresholdNew}
        </p>
      </div>

      <p className="phototherapy-text">
        <strong className="phototherapy-label">
          Phototherapy (based on old)?
        </strong>{" "}
        {threshold !== null ? ( // Only show Yes/No if threshold is calculated
          <span
            style={{
              color: needsPhototherapy ? "red" : "green",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
          >
            {needsPhototherapy ? "Yes" : "No"}
          </span>
        ) : (
          <span style={{ fontSize: "1rem", color: "grey" }}>N/A</span>
        )}
      </p>
      {/* Optional: Add phototherapy decision based on new threshold */}
      {/* <p className="phototherapy-text">
        <strong className="phototherapy-label">Phototherapy (based on new)?</strong>{" "}
         {threshold_new !== null ? (
           <span style={{ color: totalBilirubin > threshold_new ? "red" : "green", fontWeight: "bold", fontSize: "1.5rem" }}>
             {totalBilirubin > threshold_new ? "Yes" : "No"}
           </span>
         ) : (
            <span style={{ fontSize: '1rem', color: 'grey' }}>N/A</span>
         )}
       </p> */}
    </div>
  );
};

export default BiliInfo;
