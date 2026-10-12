import { type DieValue } from "../components/Die.tsx";
export function isPairSequence(dice: DieValue[]) {
  console.log("isPairSequence", [...dice]);
  const [a, b] = [...dice].sort((x, y) => x - y);

  // Normal consecutive pair
  if (b === a + 1) {
    return true;
  }

  // Wrap-around pair: 6,1
  return a === 1 && b === 6;
}

export function getRequiredPairs(dice: DieValue[]) {
  const [a, b] = [...dice].sort((x, y) => x - y);

  if (!isPairSequence(dice)) {
    return null; // Game over
  }

  // The two possible pairs that complete a 4-number sequence
  const requirements = {
    "1,2": [[3, 4], [5, 6]],
    "2,3": [[4, 5], [1, 6]],
    "3,4": [[5, 6], [1, 2]],
    "4,5": [[1, 6], [2, 3]],
    "5,6": [[1, 2], [3, 4]],
    "1,6": [[2, 3], [4, 5]]
  };

  return requirements[`${a},${b}`];
}

export function completesSequence(dice: DieValue[], requiredPairs: DieValue[][]) {
  const [a, b] = [...dice].sort((x, y) => x - y);

  return requiredPairs.some(([x, y]) => a === x && b === y);
}
