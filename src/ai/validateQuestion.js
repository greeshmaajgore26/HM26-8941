export function validateQuestion(original, generated) {
  const errors = [];

  // Check locked variables
  if (
    generated.lockedVariables?.resistance !==
    original.lockedVariables.resistance
  ) {
    errors.push("Resistance value changed");
  }

  if (
    generated.lockedVariables?.current !==
    original.lockedVariables.current
  ) {
    errors.push("Current value changed");
  }

  // Check formula
  if (generated.formula !== original.formula) {
    errors.push("Formula changed");
  }

  // Check correct answer
  if (generated.correctAnswer !== original.correctAnswer) {
    errors.push("Correct answer changed");
  }

  // Check answer unit
  if (generated.answerUnit !== original.answerUnit) {
    errors.push("Answer unit changed");
  }

  // Check operation
  if (generated.operation !== original.operation) {
    errors.push("Operation changed");
  }

  // Check concept
  if (generated.concept !== original.concept) {
    errors.push("Concept changed");
  }

  // Check difficulty
  if (generated.difficulty !== original.difficulty) {
    errors.push("Difficulty changed");
  }

  // Check learning objective
  if (generated.learningObjective !== original.learningObjective) {
    errors.push("Learning objective changed");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}