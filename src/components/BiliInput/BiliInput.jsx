import React from "react";

const BiliInput = ({
  ga,
  setGA,
  dob,
  setDob,
  motherBloodGroup,
  setMotherBloodGroup,
  fatherBloodGroup,
  setFatherBloodGroup,
  totalBilirubin,
  setTotalBilirubin,
  gender,
  setGender,
  poorApgarOrSepsis,
  setPoorApgarOrSepsis,
  generateGraphData,
}) => {
  return (
    <div className="bili-input">
      <h1 className="app-text">Bili App👶</h1>
      <div className="input_all">
        {/* Gestational Age Input */}
        <div className="ga_input">
          <label className="block text-sm font-medium">Gestational Age</label>
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

        {/* Date of Birth Input */}
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

        {/* Mother's Blood Group Input */}
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

        {/* Father's Blood Group Input */}
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

        {/* Total Bilirubin Input */}
        <div className="bilirubin_input">
          <label className="block text-sm font-medium">
            Total Bilirubin (mg/dL)
          </label>
          <input
            type="number"
            step="0.1" // Allow decimal input
            className="border p-2 rounded w-full"
            value={totalBilirubin}
            // Ensure value is treated as a number, handle empty string
            onChange={(e) =>
              setTotalBilirubin(
                e.target.value === "" ? "" : parseFloat(e.target.value)
              )
            }
          />
        </div>

        {/* Gender Input */}
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

        {/* Sepsis/APGAR Input */}
        <div className="sepsis_input">
          <label className="block text-sm font-medium">
            Poor APGAR or Sepsis&nbsp;&nbsp;
          </label>
          <select
            className="border p-2 rounded w-full"
            value={poorApgarOrSepsis ? "Yes" : "No"}
            onChange={(e) => setPoorApgarOrSepsis(e.target.value === "Yes")}
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Calculate Button */}
        <button className="generate-btn" onClick={generateGraphData}>
          Calculate
        </button>
      </div>
    </div>
  );
};

export default BiliInput;
