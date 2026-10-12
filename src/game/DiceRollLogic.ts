import { type DieValue } from "../components/Die.tsx";

type DiePair = {
  die1: DieValue;
  die2: DieValue;
}

export class Dice {
  static roll(sides = 6): DieValue {
    const max = 2 ** 32;
    const limit = max - (max % sides);
    const random = new Uint32Array(1);

    do {
      crypto.getRandomValues(random);
    } while (random[0] >= limit);

    return ((random[0] % sides) + 1) as DieValue;
  }

  static rollPair(sides = 6): DiePair {
    const die1 = Dice.roll(sides);
    const die2 = Dice.roll(sides);

    return {
      die1,
      die2,
    };
  }
}
