export const physicsConcepts = [
  {
    id: "electric-current",
    name: "Electric Current",
    prerequisites: [],
  },
  {
    id: "potential-difference",
    name: "Potential Difference",
    prerequisites: ["electric-current"],
  },
  {
    id: "resistance",
    name: "Resistance",
    prerequisites: ["electric-current", "potential-difference"],
  },
  {
    id: "ohms-law",
    name: "Ohm's Law",
    prerequisites: ["resistance"],
  },
  {
    id: "series-parallel",
    name: "Series and Parallel Circuits",
    prerequisites: ["resistance", "ohms-law"],
  },
  {
    id: "electrical-power",
    name: "Electrical Power",
    prerequisites: ["ohms-law"],
  },
];