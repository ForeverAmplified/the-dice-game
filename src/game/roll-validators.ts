import { type DieValue } from '../components/Die';

type ValidPairKey = "1,2" | "2,3" | "3,4" | "4,5" | "5,6" | "1,6";

export function isPairSequence(dice: DieValue[]) {
  const [a, b] = [...dice].sort((x, y) => x - y);

  // Normal consecutive pair
  if (b === a + 1) {
    return true;
  }

  // Wrap-around pair: 6,1
  return a === 1 && b === 6;
}

export function getValidPairs(dice: DieValue[]): DieValue[][] | null {
  const [a, b] = [...dice].sort((x, y) => x - y);

  if (!isPairSequence(dice)) {
    return null; // Game over
  }

  const key = `${a},${b}` as ValidPairKey;

  // The two possible pairs that complete the 4-number sequence
  const validPairs: Record<ValidPairKey, DieValue[][]> = {
    "1,2": [[3, 4], [5, 6]],
    "2,3": [[4, 5], [1, 6]],
    "3,4": [[5, 6], [1, 2]],
    "4,5": [[1, 6], [2, 3]],
    "5,6": [[1, 2], [3, 4]],
    "1,6": [[2, 3], [4, 5]]
  };

  return validPairs[key];
}

export function completesSequence(dice: DieValue[], validPairs: DieValue[][]) {
  const [a, b] = [...dice].sort((x, y) => x - y);

  return validPairs.some(([x, y]) => a === x && b === y);
}
