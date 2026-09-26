const themes = {
  football: {
    name: "Football",
    story:
      "During football training, a sensor in a player's equipment has an electrical resistance of 5 ohms and a current of 2 amperes."
  },

  marine: {
    name: "Marine Science",
    story:
      "A marine research sensor placed underwater has an electrical resistance of 5 ohms and a current of 2 amperes."
  },

  finance: {
    name: "Finance",
    story:
      "A financial monitoring device uses an electrical circuit with a resistance of 5 ohms and a current of 2 amperes."
  }
};

export function rethemeQuestion(canonicalQuestion, theme) {
  const selectedTheme = themes[theme];

  if (!selectedTheme) {
    throw new Error("Unknown theme");
  }

  return {
    ...canonicalQuestion,

    theme: selectedTheme.name,

    narrative: selectedTheme.story,

    question:
      `${selectedTheme.story} ` +
      `Using Ohm's Law, calculate the voltage across the circuit.`
  };
}