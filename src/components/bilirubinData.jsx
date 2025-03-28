// bilirubinData.js

// Data based on AAP 2004 Guidelines (Figure 2)
// Phototherapy thresholds for infants >= 35 weeks gestation
export const bilirubinRiskData_old = {
  High: [
    { age_h: 0, bilirubin: 4 }, // Note: Guideline starts plot ~12h, extrapolated 0 for continuity
    { age_h: 12, bilirubin: 6 },
    { age_h: 24, bilirubin: 8 },
    { age_h: 36, bilirubin: 9.5 }, // Adjusted slightly based on visual chart reading
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
    { age_h: 168, bilirubin: 15 }, // Approx > 7 days
  ],
  Medium: [
    { age_h: 0, bilirubin: 5 }, // Extrapolated
    { age_h: 12, bilirubin: 8 },
    { age_h: 24, bilirubin: 10 },
    { age_h: 36, bilirubin: 12 },
    { age_h: 48, bilirubin: 13 },
    { age_h: 60, bilirubin: 14 },
    { age_h: 72, bilirubin: 15 },
    { age_h: 84, bilirubin: 16 },
    { age_h: 96, bilirubin: 17 },
    { age_h: 108, bilirubin: 17.5 }, // Adjusted
    { age_h: 120, bilirubin: 18 },
    { age_h: 132, bilirubin: 18 },
    { age_h: 144, bilirubin: 18 },
    { age_h: 156, bilirubin: 18 },
    { age_h: 168, bilirubin: 18 }, // Approx > 7 days
  ],
  Low: [
    { age_h: 0, bilirubin: 7 }, // Extrapolated
    { age_h: 12, bilirubin: 9.5 }, // Adjusted
    { age_h: 24, bilirubin: 12 },
    { age_h: 36, bilirubin: 14 },
    { age_h: 48, bilirubin: 15 },
    { age_h: 60, bilirubin: 16.5 }, // Adjusted
    { age_h: 72, bilirubin: 18 },
    { age_h: 84, bilirubin: 19 },
    { age_h: 96, bilirubin: 20 },
    { age_h: 108, bilirubin: 20.5 }, // Adjusted
    { age_h: 120, bilirubin: 21 },
    { age_h: 132, bilirubin: 21 },
    { age_h: 144, bilirubin: 21 },
    { age_h: 156, bilirubin: 21 },
    { age_h: 168, bilirubin: 21 }, // Approx > 7 days
  ],
};

// Data based on AAP 2022 Guidelines (Figure 2)
// Phototherapy thresholds for infants >= 35 weeks gestation WITHOUT neurotoxicity risk factors
export const bilirubinRiskData_new_norisk = {
  GA_35: [
    { age_h: 0, bilirubin: 6.5 }, // Extrapolated/estimated start
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
    { age_h: 0, bilirubin: 7 }, // Extrapolated/estimated start
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
    { age_h: 0, bilirubin: 7.5 }, // Extrapolated/estimated start
    { age_h: 12, bilirubin: 9.5 },
    { age_h: 24, bilirubin: 11.5 },
    { age_h: 36, bilirubin: 13.5 },
    { age_h: 48, bilirubin: 15.4 },
    { age_h: 60, bilirubin: 17 },
    { age_h: 72, bilirubin: 18.0 },
    { age_h: 84, bilirubin: 19.2 },
    { age_h: 96, bilirubin: 20.0 },
    { age_h: 108, bilirubin: 20.0 },
    { age_h: 120, bilirubin: 20.1 },
    { age_h: 132, bilirubin: 20.1 },
    { age_h: 144, bilirubin: 20.1 },
    { age_h: 156, bilirubin: 20.2 },
    { age_h: 168, bilirubin: 20.2 },
  ],
  GA_38: [
    { age_h: 0, bilirubin: 8 }, // Extrapolated/estimated start
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
    { age_h: 0, bilirubin: 8.5 }, // Extrapolated/estimated start
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
    // Includes >= 40 weeks
    { age_h: 0, bilirubin: 9 }, // Extrapolated/estimated start
    { age_h: 12, bilirubin: 11 },
    { age_h: 24, bilirubin: 13.2 },
    { age_h: 36, bilirubin: 15.2 },
    { age_h: 48, bilirubin: 17 },
    { age_h: 60, bilirubin: 18.5 },
    { age_h: 72, bilirubin: 19.8 },
    { age_h: 84, bilirubin: 21 },
    { age_h: 96, bilirubin: 21.8 }, // Note: Chart seems to plateau near 22
    { age_h: 108, bilirubin: 22.0 }, // Adjusted slightly based on visual plateau
    { age_h: 120, bilirubin: 22.0 },
    { age_h: 132, bilirubin: 22.0 },
    { age_h: 144, bilirubin: 22.0 },
    { age_h: 156, bilirubin: 22.0 },
    { age_h: 168, bilirubin: 22.0 },
  ],
};

// Data based on AAP 2022 Guidelines (Figure 3)
// Phototherapy thresholds for infants >= 35 weeks gestation WITH neurotoxicity risk factors
export const bilirubinRiskData_new_risk = {
  GA_35: [
    { age_h: 0, bilirubin: 4.5 }, // Extrapolated/estimated start
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
    { age_h: 0, bilirubin: 5.5 }, // Extrapolated/estimated start
    { age_h: 12, bilirubin: 7.5 },
    { age_h: 24, bilirubin: 9.5 },
    { age_h: 36, bilirubin: 11.2 },
    { age_h: 48, bilirubin: 12.8 },
    { age_h: 60, bilirubin: 14.2 },
    { age_h: 72, bilirubin: 15.4 },
    { age_h: 84, bilirubin: 16.4 },
    { age_h: 96, bilirubin: 17.0 },
    { age_h: 108, bilirubin: 17.1 },
    { age_h: 120, bilirubin: 17.2 },
    { age_h: 132, bilirubin: 17.3 },
    { age_h: 144, bilirubin: 17.4 },
    { age_h: 156, bilirubin: 17.4 },
    { age_h: 168, bilirubin: 17.5 },
  ],
  GA_37: [
    { age_h: 0, bilirubin: 6.0 }, // Extrapolated/estimated start
    { age_h: 12, bilirubin: 8.0 },
    { age_h: 24, bilirubin: 10.0 },
    { age_h: 36, bilirubin: 12.0 },
    { age_h: 48, bilirubin: 13.5 },
    { age_h: 60, bilirubin: 15.0 },
    { age_h: 72, bilirubin: 16.0 },
    { age_h: 84, bilirubin: 17.0 },
    { age_h: 96, bilirubin: 17.8 },
    { age_h: 108, bilirubin: 17.9 },
    { age_h: 120, bilirubin: 18.0 },
    { age_h: 132, bilirubin: 18.0 },
    { age_h: 144, bilirubin: 18.1 },
    { age_h: 156, bilirubin: 18.2 },
    { age_h: 168, bilirubin: 18.2 },
  ],
  GA_38: [
    // Includes >= 38 weeks WITH risk factors
    { age_h: 0, bilirubin: 6.4 }, // Extrapolated/estimated start
    { age_h: 12, bilirubin: 8.5 },
    { age_h: 24, bilirubin: 10.5 },
    { age_h: 36, bilirubin: 12.4 },
    { age_h: 48, bilirubin: 14.0 },
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
  // For GA 39 and 40 WITH risk factors, the 2022 guideline uses the GA 38 WITH risk factors curve (Figure 3)
  GA_39: [
    // Same as GA_38 with risk
    { age_h: 0, bilirubin: 6.4 },
    { age_h: 12, bilirubin: 8.5 },
    { age_h: 24, bilirubin: 10.5 },
    { age_h: 36, bilirubin: 12.4 },
    { age_h: 48, bilirubin: 14.0 },
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
  GA_40: [
    // Same as GA_38 with risk
    { age_h: 0, bilirubin: 6.4 },
    { age_h: 12, bilirubin: 8.5 },
    { age_h: 24, bilirubin: 10.5 },
    { age_h: 36, bilirubin: 12.4 },
    { age_h: 48, bilirubin: 14.0 },
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

// Note: The data points are based on visual approximations from the AAP guideline figures.
// Small discrepancies may exist compared to precise values if available elsewhere.
// Initial values (age_h: 0) are extrapolated estimates as the charts often start later.
