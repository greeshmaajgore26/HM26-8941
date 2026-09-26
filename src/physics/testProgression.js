import { studentMastery } from "./studentMastery";
import { getNextConcept } from "./progression";

const nextConcept = getNextConcept(studentMastery);

console.log("Next concept:", nextConcept);
